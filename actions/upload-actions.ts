"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

export async function generatePdfSummery(uploadResponse: {
  userId: string;
  file: { url: string; name: string };
}) {
  if (!uploadResponse) {
    return {
      sucess: false,
      message: "File upload failed",
      data: null,
    };
  }

  console.log("type ANY uploadResponse", uploadResponse);

  const {
    userId,
    file: { url: pdfUrl, name: fileName }
  } = uploadResponse;
  if (!pdfUrl) {
    return {
      sucess: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);

    console.log("pdf text", pdfText);

    let summary ;
    try {
         summary = await generateSummaryFromOpenAI(pdfText);
         console.log("summary ==>>", summary);

        if(!summary){
            return {
                sucess: false,
                message: "Filed to generate summary",
                data: null,
              };
        }
    } catch (error) {
        console.log("generateSummaryFromOpenAI error", error);
    }
  } catch (error) {
    return {
      sucess: false,
      message: "File upload failed",
      data: null,
    };
  }
}
