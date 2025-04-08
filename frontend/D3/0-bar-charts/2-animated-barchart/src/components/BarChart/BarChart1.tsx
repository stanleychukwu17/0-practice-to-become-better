import { useRef, useEffect } from "react";
import * as d3 from "d3";

type DataPoint = {
  name: string;
  value: number;
};

type BarChartProps = {
  data: DataPoint[];
  width?: number;
  height?: number;
};

export default function BarChart1({data, width = 500, height = 300} : BarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // clear previous renders

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = d3
      .scaleBand<string>()
      .domain(data.map((d) => d.name)) // [A, B, C, D, E]
      .range([0, chartWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) as number]) // you can also do: .domain([0, d3.max(data, (d) => d.value) || 0])
      .nice()
      .range([chartHeight, 0]);

    // create a group element for the charts
    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Bars
    chart
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.name) as unknown as string )
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => chartHeight - yScale(d.value))
      .attr("fill", "pink")

    // X Axis
    chart
      .append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale))
      .attr("color", "black");

    // Y Axis
    chart.append("g").call(d3.axisLeft(yScale)).attr("color", "black");

  }, [data, height, width])

  return (
    <div style={{ minWidth:"500px", maxWidth:"800px", width: "100%", height: "auto" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
