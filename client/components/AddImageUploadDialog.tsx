import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CloudUpload, Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useDropzone } from "react-dropzone";

interface AddImageUploadDialogProps {
  images: Record<string, string[]>;
  setImages: Dispatch<SetStateAction<Record<string, string[]>>>;
}

const AddImageUploadDialog = ({
  images,
  setImages,
}: AddImageUploadDialogProps) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [currentColor, setCurrentColor] = useState("");

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.type} - {file.size} bytes
    </li>
  ));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-dashed h-24 w-32 flex flex-col gap-2"
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
          >
            <div {...getRootProps({ className: "dropzone" })}>
              <CloudUpload size={32} className="mx-auto" />
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select</p>
            </div>
          </Button>

          {/* Show Uploaded Images */}

          {/* Current color */}

          <div className="flex items-center gap-2">
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
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddImageUploadDialog;
