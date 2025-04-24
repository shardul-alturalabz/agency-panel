"use client"

import { LabelList, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

export default function ChartPie() {
  const data = [
    { name: "Segment 1", value: 45, fill: "#e85414" },
    { name: "Segment 2", value: 35, fill: "#FEBE24" },
    { name: "Segment 3", value: 20, fill: "#61C4C7" },
  ]

  const chartConfig = {
    value: { label: "Value" },
    segment1: { color: "hsl(var(--chart-1))" },
    segment2: { color: "hsl(var(--chart-2))" },
    segment3: { color: "hsl(var(--chart-3))" },
  }

  return (
    <div className="w-full h-full flex">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <PieChart>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={"90%"} label={false}>
            <LabelList
              dataKey="value"
              position="inside"
              fill="#ffffff"
              stroke="none"
              fontSize={18}
              fontWeight="bold"
              formatter={(value: number) => `${value}%`}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  )
}
