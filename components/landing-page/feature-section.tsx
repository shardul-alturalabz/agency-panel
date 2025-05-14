import type React from "react"
import { Flame, DollarSign, BarChart3, AlertCircle } from "lucide-react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex flex-col items-center md:items-start">
        <div className="bg-white rounded-full p-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center text-orange-500">{icon}</div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-300 text-center md:text-left">{description}</p>
      </div>
    </div>
  )
}

export default function FeatureSection() {
  const features = [
    {
      icon: <Flame size={28} />,
      title: "Massive reach",
      description: "Your creators get prime visibility & enhanced engagement tools",
    },
    {
      icon: <DollarSign size={28} />,
      title: "Higher revenue potential",
      description: "Higher revenue potential through gifts, bonuses & premium placements",
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Data and insight",
      description: "Optimize creator engagement & earnings with advanced analytics",
    },
    {
      icon: <AlertCircle size={28} />,
      title: "Priority support and perks",
      description: "Enjoy dedicated support, early updates, and premium placements",
    },
  ]

  return (
    <div className="w-full bg-gradient-to-br from-black to-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">WHY CHOOSE US?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </div>
  )
}
