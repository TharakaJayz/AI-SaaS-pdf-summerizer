"use server";

import { generateSummaryFromGeminai } from "@/lib/geminiai";
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
    file: { url: pdfUrl, name: fileName },
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

    let summary;
    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log("summary ==>>", summary);
    } catch (error) {
      console.log("generateSummaryFromOpenAI error", error);
      if(error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED"){
        try {
          summary = await generateSummaryFromGeminai(pdfText);
        } catch (geminaiError) {
          console.error("Gemini API failed after OpenAi quote exceeded",geminaiError)
        }
      }
    }

      if (!summary) {
        return {
          sucess: false,
          message: "Filed to generate summary",
          data: null,
        };
      }

      return {
        success:true,
        message:"Summary generated successfully",
        data:{
          summary
        }
      }
   
  } catch (error) {
    return {
      sucess: false,
      message: "File upload failed",
      data: null,
    };
  }
}
