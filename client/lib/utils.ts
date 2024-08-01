import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sliceText = (text: string = "", length: number = 15) => {
  return text.slice(0, length) + (text.length > length ? "..." : "");
};

// Wrap file name

export const wrapFileName = (fileName: string, length: number = 15) => {
  const [name, ext] = fileName.split(".");
  return `${sliceText(name, length)}.${ext}`;
};

// Get assets URL
export const getAssetsUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_BACKEND_UPLOADS_URL}/${path}`;
};
