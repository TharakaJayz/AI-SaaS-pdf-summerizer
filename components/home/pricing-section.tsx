import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

type PriceType = {
  name: string;
  price: string;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
};
const plans = [
  {
    id: "basic",
    name: "Basic",
    paymentLink: "",
    priceId: "",
    description: "For personal use",
    price: "9",
    items: ["5 PDF summaries per month", "Email support"],
  },

  {
    id: "pro",
    name: "Pro",
    description: "For professionals and teams",
    paymentLink: "",
    price: "19",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
  },
];

export function PricingCard({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PriceType) {
  return (
    <div className="relative w-full max-w-lg">
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8  border-[1px] border-gray-500/20 rounded-2xl",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">${price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
                <CheckIcon  size={18} />
                <span>{item}</span>
                </li>
          ))}
        </div>
        <div>
          <Link href={paymentLink}>Buy Now</Link>
        </div>
      </div>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section>
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div>
          <h2>Pricing</h2>
          <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
            {plans.map((plan) => (
              <PricingCard key={plan.id} {...plan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
