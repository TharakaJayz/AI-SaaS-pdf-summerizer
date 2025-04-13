"use client";

import { RefObject } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  ref:RefObject<HTMLFormElement | null>
  isLoading:boolean;
}


const UploadFormInput = ({onSubmit,ref,isLoading}: UploadFormInputProps) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit} ref={ref}>
      <div className="flex justify-end items-center gap-1.5">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          className={cn(isLoading && 'opacity-50 cursor-not-allowed')}
          disabled={isLoading}
        />
        <Button disabled={isLoading}>{isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Processing...</>:"Upload your PDF"}</Button>
      </div>
    </form>
  );
}

export default UploadFormInput


