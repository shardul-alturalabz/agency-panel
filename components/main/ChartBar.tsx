"use client"

import { Bar, BarChart, Cell, LabelList, XAxis } from "recharts"

import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 195, mobile: 160 },
  { month: "August", desktop: 225, mobile: 170 },
  { month: "September", desktop: 180, mobile: 110 },
  { month: "October", desktop: 250, mobile: 190 },
  { month: "November", desktop: 230, mobile: 150 },
  { month: "December", desktop: 260, mobile: 210 },
];


const chartConfig = {
  mobile: {
    label: "Mobile",
    color: "grey",
  },
} satisfies ChartConfig

export function ChartBar() {
  return (
    <ChartContainer config={chartConfig} className="w-full h-[84%]">
      <BarChart accessibilityLayer data={chartData} margin={{ top: 30, right: 10, left: 10, bottom: 10 }}>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Bar dataKey="mobile" radius={4}>
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === chartData.length - 1 ? "#e85414" : "var(--color-mobile)"}
            />
          ))}
          <LabelList dataKey="mobile" position="top" style={{ fill: "white", fontWeight: "bold" }} />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
