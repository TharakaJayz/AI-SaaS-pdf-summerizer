import { ExternalLink, FileText } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import DownloadSummaryButton from "./download-button";

type Props = {
  file_name: string;
  originalFileUrl: string;
  title: string;
  summaryText: string;
  createdAt: string;
};

const SourceInfo = ({
  file_name,
  createdAt,
  originalFileUrl,
  summaryText,
  title,
}: Props) => {
  return (
    <div
      className="flex flex-col lg:flex-row items-center
    justify-between gap-4 text-sm text-muted-foreground"
    >
      <div className="flex items-center justify-center  gap-2">
        <FileText className="h-4 w-4 text-rose-400" />
        <span>Source: {file_name}</span>
      </div>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-rose-600 hover:text-rose-700
    hover:bg-rose-50"
          asChild
        >
          <a href={originalFileUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" />
            View Original
          </a>
        </Button>
        <DownloadSummaryButton title={title} createdAt={createdAt} fileName={file_name} summaryText={summaryText} />
      </div>
    </div>
  );
};

export default SourceInfo;
