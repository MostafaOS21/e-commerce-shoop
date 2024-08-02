import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CloudUpload, Plus, X } from "lucide-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { getAssetsUrl, wrapFileName } from "@/lib/utils";
import { baseApi } from "@/lib/baseApi";
import { ApiResponse } from "@/types/api";

interface AddImageUploadDialogProps {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}

const AddImageUploadDialog = ({
  images,
  setImages,
}: AddImageUploadDialogProps) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [isUploading, setIsUploading] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const closeModal = () => {
    closeBtnRef.current?.click();
  };

  const onSaveChanges = async () => {
    if (acceptedFiles.length) {
      try {
        setIsUploading(true);

        const file = acceptedFiles[0];
        const formData = new FormData();

        formData.append("image", file);

        const res = await baseApi.post(
          "/dashboard/product/upload-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data: ApiResponse<string> = await res.data;

        setImages((prev) => [...prev, getAssetsUrl(data.data)]);

        closeModal();
      } catch (error) {
        console.log(error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-5 flex-wrap">
      {images.length > 0 && (
        <ul className="flex items-center gap-5 flex-wrap">
          {images.map((src, index) => (
            <li key={index} className="h-24 w-32 relative ">
              <Button
                className="absolute grid place-content-center h-fit p-2 right-0 shadow-lg rounded-full"
                variant={"destructive"}
                onClick={() => {
                  setImages((prev) => prev.filter((_, i) => i !== index));
                }}
              >
                <X size={16} />
              </Button>

              <Image
                src={src}
                width={100}
                height={100}
                alt={`Product image ${index}#`}
                className="rounded-md object-cover w-full h-full"
              />
            </li>
          ))}
        </ul>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-dashed h-24 w-32 flex flex-col gap-2"
            disabled={images.length === 10}
          >
            <Plus size={16} />
            Add Image
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Product Image</DialogTitle>
            <DialogDescription>
              Choose an image and color for your product.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {/* Uploader */}
            <Button
              asChild
              className="cursor-pointer relative border-2 h-[230px] border-dashed flex flex-col gap-5"
              variant={"ghost"}
              disabled={isUploading}
            >
              <div {...getRootProps({ className: "dropzone" })}>
                <CloudUpload size={32} className="mx-auto" />
                <input
                  {...getInputProps()}
                  multiple={false}
                  accept=".jpg, .jpeg, .png"
                />
                <p>
                  {acceptedFiles.length > 0
                    ? wrapFileName(acceptedFiles[0].name)
                    : "Drag 'n' drop some files here, or click to select"}
                </p>
              </div>
            </Button>

            {/* Show Uploaded Images */}
            <ul className="flex items-center gap-3"></ul>

            {/* Current color */}

            {/* <div className="flex items-center gap-2">
              <Button variant={"outline"} asChild>
                <div className="flex w-full items-center !justify-start gap-3 cursor-pointer relative">
                  <input
                    type="color"
                    disabled={!currentColor}
                    className={`size-7 ${!currentColor && "hidden"}`}
                    value={currentColor}
                  />
                  <p>{currentColor ? currentColor : "Primary image color"}</p>

                  <input
                    type="color"
                    className="absolute left-0 top-0 w-full h-full opacity-0"
                    onChange={(e) => setCurrentColor(e.target.value)}
                  />
                </div>
              </Button>

              <Button variant={"secondary"} onClick={() => setCurrentColor("")}>
                Reset
              </Button>
            </div> */}
          </div>

          <DialogFooter className="grid grid-cols-2 gap-4 w-full">
            <DialogClose asChild>
              <Button
                ref={closeBtnRef}
                variant={"outline"}
                disabled={isUploading}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              onClick={onSaveChanges}
              disabled={
                acceptedFiles.length === 0 ||
                images.length === 10 ||
                isUploading
              }
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddImageUploadDialog;
