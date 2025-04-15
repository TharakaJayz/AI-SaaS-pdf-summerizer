import BgGradient from "@/components/ui/common/bg-gradient";
import React from "react";

interface Props {}

const page = (props: Props) => {
  return <main className="min-h-screen">
    <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200"  />
    <div className="container mx-auto flex flex-col gap-4">
        <h1>Your Summaries</h1>
        <p>Transform your PDFs into concise,actionable insights</p>
    </div>
  </main>;
};

export default page;
