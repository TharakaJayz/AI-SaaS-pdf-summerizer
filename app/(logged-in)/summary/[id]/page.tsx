import SourceInfo from "@/components/summaries/source-info";
import SummaryHeader from "@/components/summaries/summary-header";
import SummaryViewer from "@/components/summaries/summary-viewer";
import BgGradient from "@/components/ui/common/bg-gradient";
import { getSummaryById } from "@/lib/summaries";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const page = async (props: Props) => {
  const params = await props.params;
  const id = params.id;
  const summary = await getSummaryById(id);
  if (!summary) {
    return notFound();
  }
  const { title, summary_text, file_name, word_count, created_at,original_file_url } = summary;
  const readingTime = Math.ceil((word_count || 0) / 200);
  console.log("summary", summary);
  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8  py-12 sm:py-14 lg:py-14 ">
          <div className="flex flex-col ">
            <SummaryHeader
              title={title}
              created_at={created_at}
              readingTime={readingTime} 
            />
            {file_name && <SourceInfo title={title} createdAt={created_at} originalFileUrl={original_file_url} summaryText={summary_text}   file_name={file_name} />}
            <div className="relative mt-4 sm:mt-8 lg:mt-10">
              <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto ">
                <div className="absolute inset-0 bg-linear-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground py-1 sm:py-1.5 rounded-full shadow-xs ">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
                  {word_count?.toLocaleString()} words
                </div>
                <div className="relative mt-8 sm:mt-6 flex justify-center">
                  <SummaryViewer summary={summary_text} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
