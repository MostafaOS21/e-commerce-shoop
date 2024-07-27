import React from "react";
import { Button } from "./button";
import { LoaderCircle } from "lucide-react";

const LoaderButton = () => {
  return (
    <Button className="btn-icon-container" disabled={true} variant={"ghost"}>
      <LoaderCircle className="animate-spin" /> Loading...
    </Button>
  );
};

export default LoaderButton;
