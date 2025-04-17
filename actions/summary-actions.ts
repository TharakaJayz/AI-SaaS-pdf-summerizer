"use server";

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteSummaryAction({ summaryId }: { summaryId: string }) {
  try {
    const user = await currentUser();
    if (!user?.id) throw new Error("User not found");
    const sql = await getDbConnection();

    const result = await sql`
        DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id =${user.id} RETURNING id;
        `;
    if (result.length > 0) {
      revalidatePath("/dashboard");
      return { success: true };
    }
    return { success: false };

    // delete from DB
    //revalidatePath
  } catch (error) {
    console.log("deleteSummary error ==>",error)
    return {
      success: false
    };
  }
}
