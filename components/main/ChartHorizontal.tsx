"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
const chartData = [
  { category: "Fitness", value: 45000 },
  { category: "Gaming", value: 22000 },
  { category: "Makeup", value: 54000 },
  { category: "Comedy", value: 33000 },
  { category: "Lifestyle", value: 32000 },
  { category: "Travel", value: 48000 },
  { category: "Professional", value: 34000 },
]


const chartConfig = {
  value: {
    label: "Viewers",
    color: "#737373",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

export function ChartHorizontal() {
    const [max, setMax] = useState<number>(-1);

useEffect(()=>{
    let max = -1;
    Object.values(chartData).map((i: any, index: number)=>{
        if(i.value>max) {
            setMax(i.value);
            max = i.value;
        }
    })
},[])

  return (
    <Card className="bg-[#1e1e1e] text-white border-0 h-full w-full flex py-0! gap-0!">
      <CardHeader>
        <CardTitle className="text-lg mt-3">Most watched category</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-full flex py-1">
          <BarChart
          className="h-full"
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
              bottom: 10,
            }}
          >
            <YAxis dataKey="category" type="category" tickLine={false} tickMargin={10} axisLine={false} hide />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="value" layout="vertical" fill="var(--color-value)" radius={4}>
              <LabelList
                dataKey="category"
                position="insideLeft"
                offset={8}
                className="fill-[white]"
                fontSize={12}
              />
              {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.value === max ? "#e85414" : "var(--color-value)"}
                          />
                        ))}
              <LabelList
                dataKey="value"
                position="right"
                offset={8}
                className="fill-[white]"
                fontSize={12}
                formatter={(value: number) => `${(value / 1000).toFixed(0)}K`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
