import { createUploadthing } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader:f({pdf:{maxFileSize:'32MB'}}).middleware(
        async ({req}) =>{
            
        }
    ).onUploadComplete(async ({metadata,file})=>{
        console.log("upload complete",metadata.userId)
        return {userId:metadata.userId,file}
    })
}
