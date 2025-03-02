"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  positive: {
    label: "Positive",
    color: "hsl(var(--chart-2))",
  },
  neutral: {
    label: "Neutral",
    color: "hsl(var(--chart-3))",
  },
  negative: {
    label: "Negative",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function AverageSentimentChart({
  positive,
  neutral,
  negative,
}: {
  positive: number;
  neutral: number;
  negative: number;
}) {
  const id = "pie-interactive";

  const plotData = [
    {
      type: "Positive",
      value: Math.round(positive * 1000) / 10,
      fill: "var(--color-positive)",
    },
    {
      type: "Neutral",
      value: Math.round(neutral * 1000) / 10,
      fill: "var(--color-neutral)",
    },
    {
      type: "Negative",
      value: Math.round(negative * 1000) / 10,
      fill: "var(--color-negative)",
    },
  ];

  const activeIndex = plotData.reduce((max_index, item, index) => {
    if (item.value > plotData[max_index].value) return index;
    return max_index;
  }, 0);

  return (
    <ChartContainer
      id={id}
      config={chartConfig}
      className="mx-auto aspect-square w-full max-w-[300px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={plotData}
          dataKey="value"
          nameKey="type"
          innerRadius={60}
          strokeWidth={5}
          activeIndex={activeIndex}
          activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
            <g>
              <Sector {...props} outerRadius={outerRadius + 10} />
              <Sector
                {...props}
                outerRadius={outerRadius + 25}
                innerRadius={outerRadius + 12}
              />
            </g>
          )}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {`${plotData[activeIndex].value.toLocaleString()}%`}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      {`${plotData[activeIndex].type}`}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
