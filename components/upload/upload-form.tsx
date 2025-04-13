"use client";
import { z } from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generateReactHelpers } from "@uploadthing/react";
import { generatePdfSummery } from "@/actions/upload-actions";
import { useRef, useState } from "react";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 24MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
      toast("Error occurred while uploading", {
        description: err.message,
      });
    },
    onUploadBegin: (file) => {
      console.log("upload has begun for", file);
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("onSubmit", e);
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;
      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        console.log(
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file"
        );
        toast("Something went wrong", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file",
        });
        setIsLoading(false)
        return;
      }

      toast("Uploading PDF...", { description: "we are uploading your PDF!" });

      const resp = await startUpload([file]);
      if (!resp) {
        toast("Something went wrong", {
          description: "Please use a different file",
        });
        return;
      }

      toast("processing PDF", {
        description: "Hang tight, our AI is reading through your document!",
      });
      console.log("uploaded response", resp);
      const result = await generatePdfSummery(resp[0].serverData);
      const { data = null, message = null } = result || {};

      if (data) {
        toast("Saving PDF", {
          description: "Hang tight, We are saving your summary!",
        });

        formRef.current?.reset();
        if(data.summary){
          

          // save the summery to the database
        }
      }
      console.log("result", result);
    } catch (error) {
      console.error("Error occured", error);
      formRef.current?.reset();
      setIsLoading(false)
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} ref={formRef} isLoading ={isLoading} />
    </div>
  );
}
