import { getDbConnection } from "./db";

export async function getSummaries (userId:string) {

    const sql = await getDbConnection();
    const summeries = await sql`SELECT * from pdf_summaries where user_id = ${userId} ORDER BY created_at DESC`
    return summeries
}