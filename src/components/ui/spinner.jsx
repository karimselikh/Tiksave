
import React from "react";
import { cn } from "@/lib/utils";

const Spinner = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-spin rounded-full border-t-2 border-primary", className)}
      {...props}
    />
  );
};

export { Spinner };
