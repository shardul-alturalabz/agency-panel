import type React from "react";
import { Flame, DollarSign, BarChart3, AlertCircle } from "lucide-react";
import Image from "next/image";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-xl bg-[#1C1C1E]/80 backdrop-blur-md p-6 transition-all hover:scale-[1.02] hover:shadow-lg border border-white/10">
      <div className="flex flex-col items-start">
        <div className="bg-white/90 rounded-full p-3 mb-4 shadow-sm">
          <div className="w-10 h-10 flex items-center justify-center text-orange-500">
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function FeatureSection() {
  const features = [
    {
      icon: <Flame size={24} />,
      title: "Massive reach",
      description:
        "Your creators get prime visibility & enhanced engagement tools",
    },
    {
      icon: <DollarSign size={24} />,
      title: "Higher revenue potential",
      description:
        "Higher revenue potential through gifts, bonuses & premium placements",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Data and insight",
      description:
        "Optimize creator engagement & earnings with advanced analytics",
    },
    {
      icon: <AlertCircle size={24} />,
      title: "Priority support and perks",
      description:
        "Enjoy dedicated support, early updates, and premium placements",
    },
  ];

  return (
    <div className="relative w-full py-20 bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/Why choose us_bg image.png"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-center text-white text-3xl font-bold mb-14 tracking-tight">
          WHY CHOOSE US?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
