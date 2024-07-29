"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "../SubmitButton";
import { baseApi } from "@/lib/baseApi";
import { useState } from "react";
import { ApiResponse } from "@/types/api";
import { IApiUser } from "@/types/user";
import { logIn } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { ToastAction } from "@radix-ui/react-toast";
import { ApiError } from "@/lib/api-error";
import { useToast } from "../ui/use-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "../ui/label";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export function AdminForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [passkey, setPasskey] = useState("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const formData = {
        email: values.email,
        passkey,
      };

      const res = await baseApi.post<ApiResponse<IApiUser>>(
        "/auth/admin",
        formData
      );
      const data = res.data.data;

      await logIn(data);

      router.push("/dashboard");
    } catch (error) {
      let err: any = ApiError.generate(error);

      if (err.status === 404) {
        err.action = (
          <ToastAction
            altText="Log in"
            onClick={() => router.push("/auth/sign-up")}
          >
            Log in
          </ToastAction>
        );
      }

      toast(err);
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"link"} className="text-sm !px-0">
          Click here.
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 relative z-20 bg-background p-5 rounded-md w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Label>Passkey</Label>
            <InputOTP
              maxLength={6}
              onChange={setPasskey}
              defaultValue={passkey}
            >
              <InputOTPGroup className="otp-container">
                <InputOTPSlot className="otp-slot" index={0} />
                <InputOTPSlot className="otp-slot" index={1} />
                <InputOTPSlot className="otp-slot" index={2} />
                <InputOTPSlot className="otp-slot" index={3} />
                <InputOTPSlot className="otp-slot" index={4} />
                <InputOTPSlot className="otp-slot" index={5} />
              </InputOTPGroup>
            </InputOTP>

            <div className="flex items-center gap-3">
              <AlertDialogCancel
                asChild
                className="w-full"
                disabled={isLoading}
              >
                <Button variant={"secondary"} type="reset">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <SubmitButton
                isLoading={isLoading}
                text="Log in"
                isDisabled={!passkey}
              />
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
