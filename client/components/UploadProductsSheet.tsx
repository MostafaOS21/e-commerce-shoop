"use client";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { CloudUpload } from "lucide-react";
import clsx from "clsx";
import { useCallback } from "react";
import Papa from "papaparse";
import { useToast } from "./ui/use-toast";

interface UploadProductsSheetProps {
  setTableData: React.Dispatch<React.SetStateAction<string[][]>>;
  tableData: string[][];
}

export default function UploadProductsSheet({
  setTableData,
  tableData,
}: UploadProductsSheetProps) {
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    Papa.parse(file, {
      complete: (result) => {
        if (result.data.length === 0) {
          return toast({
            description: "No data found in the file",
          });
        }

        setTableData(result.data as string[][]);
      },
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
