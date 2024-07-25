import React from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import clsx from "clsx";

const SubmitButton = ({
  text,
  isLoading,
  isDisabled,
  className,
}: {
  text: string;
  isLoading: boolean;
  isDisabled?: boolean;
  className?: string;
}) => {
  return (
    <Button
      type="submit"
      disabled={isLoading || isDisabled}
      className={clsx("btn-icon-container w-full", className)}
    >
      {isLoading ? (
        <>
          <LoaderCircle className="animate-spin" />
          <span className="ml-2">Loading...</span>
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButton;
