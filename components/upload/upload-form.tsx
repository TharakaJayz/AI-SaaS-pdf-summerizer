"use client";
import { z } from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generateReactHelpers } from "@uploadthing/react";
import { generatePdfSummery } from "@/actions/upload-actions";

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
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      console.log(
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      toast("Something went wrong", {
        description:
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid file",
      });
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
    const summary = await generatePdfSummery(resp[0].serverData);
    console.log("summary", summary);
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
