"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGeminai } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNamesAsTitle } from "@/utils/format-utills";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummeryInterface {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfSummery(uploadResponse: {
  userId: string;
  file: { url: string; name: string };
}) {
  if (!uploadResponse) {
    return {
      success: false,
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
      success: false,
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
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGeminai(pdfText);
        } catch (geminaiError) {
          console.error(
            "Gemini API failed after OpenAi quote exceeded",
            geminaiError
          );
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Filed to generate summary",
        data: null,
      };
    }

    const formattedFileName = formatFileNamesAsTitle(fileName);

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        summary,
        title: formattedFileName,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummeryInterface) {
  try {
    const sql = await getDbConnection();
    const res = await sql`
    INSERT INTO pdf_summaries (
      user_id,
      original_file_url,
      summary_text,
      title,
      file_name
  ) VALUES (
      ${userId},
      ${fileUrl},
      ${summary},
      ${title},
      ${fileName}
  ) RETURNING 
    id,
    user_id,
    original_file_url,
    summary_text,
    status,
    title,
    file_name,
    created_at,
    updated_at
     `;

    // console.log("Record ==>>", res[0]);
    return res[0];
  } catch (error) {
    console.log("Error saving pdf summary", error);
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  fileName,
  title,
  summary,
}: PdfSummeryInterface) {
  // user logged in

  // save pdf summary

  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    console.log("savedSummary to send", savedSummary);
    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary,please try again...",
      };
    }

    // revalidate cache
    revalidatePath(`/summeries/${savedSummary.id}`);

    return {
      success: true,
      message: "PDF summary saved successfully",
      data: {
        id: savedSummary.id,
      },
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error sacing PDF summary",
    };
  }
}
