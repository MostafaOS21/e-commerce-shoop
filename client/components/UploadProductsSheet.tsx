"use client";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { CloudUpload } from "lucide-react";
import clsx from "clsx";

export default function UploadProductsSheet() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  return (
    <div
      {...getRootProps({
        className: clsx(
          "dropzone",
          "flex flex-col items-center gap-3 w-[250px] text-center"
        ),
      })}
    >
      <input {...getInputProps()} multiple={false} accept=".csv" />
      <Button className="btn-icon-container">
        <CloudUpload size={20} /> Start Uploading
      </Button>

      <p className="text-sm">
        Start uploading by clicking the button. only CSV files are allowed.
      </p>
    </div>
  );
}
