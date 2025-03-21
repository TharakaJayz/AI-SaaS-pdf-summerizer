import DemoSection from "@/components/home/demo-section";
import HeroSection from "@/components/home/hero-section";
import BgGradient from "@/components/ui/common/bg-gradient";
import HowItWorksSection from "@/components/ui/common/how-its-works";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
      </div>
      {/*
     
      <PricingSection />
      <CTASection /> */}
    </div>
  );
}
