import { useEffect, useRef } from "react"
import * as d3 from "d3"

type dataPoint = {
  name: string,
  value: number
}

type BarChartProps = {
  data: dataPoint[]
  width?: number
  height?: number
}

export default function BarChart1({data, width = 500, height = 500}: BarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove() // clear previous renders

    const margin = { top: 20, right: 20, bottom: 50, left: 50 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    const xScale = d3.scaleBand()
                    .domain(data.map(d => d.name))
                    .range([0, chartWidth])
                    .padding(0.1)

    const yScale = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.value) as number])
                    .nice()
                    .range([chartHeight, 0])

    const chart = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // Bars
    chart.selectAll("rect").data(data)
          .enter()
          .append("rect")
          .attr("x", d => xScale(d.name) as unknown as string )
          .attr("y", d => yScale(d.value))
          .attr("width", xScale.bandwidth())
          .attr("height", d => chartHeight - yScale(d.value))
          .attr("fill", "pink")

    // Axes - x-axis
    chart.append("g")
      .call(d3.axisBottom(xScale))
      .attr("transform", `translate(0, ${chartHeight})`)
      .attr("color", "black")

    // Axes - y-axis
    chart.append("g").call(d3.axisLeft(yScale)).attr("color", "black")

  }, [data])

  return (
    <div style={{ minWidth:"500px", maxWidth:"800px", width: "100%", height: "auto" }}>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ width: "100%", height: "auto" }}
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
    </div>
  )
}
