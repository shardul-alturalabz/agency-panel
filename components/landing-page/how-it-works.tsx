"use client";

import { Check } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      title: "Apply Online",
      description: "Fill out the form and get in touch with us",
    },
    {
      title: "Get Onboarded",
      description: "Get access to talent dashboards",
    },
    {
      title: "Onboard your talent",
      description: "Add your creators to Salsa's app and have them stream",
    },
    {
      title: "Grow & Earn",
      description: "Track engagement & optimize revenue",
    },
  ];

  return (
    <section className="relative bg-black text-white py-20 px-4 min-h-[600px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
        style={{
          backgroundImage: "url('/assets/Why%20choose%20us_bg%20image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center w-full">
        <h2 className="text-4xl font-bold mb-16">HOW IT WORKS?</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <div className="bg-green-300 rounded-full p-3 mb-6 z-10">
                <Check className="w-6 h-6 text-green-900" />
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+20px)] w-[calc(100%-40px)] h-[2px] bg-gray-600"></div>
              )}

              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <Link
            href="#"
            className="text-white hover:text-gray-300 transition underline"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
