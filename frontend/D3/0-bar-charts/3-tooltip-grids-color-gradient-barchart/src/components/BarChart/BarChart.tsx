import { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./BarChart.css";

type DataPoint = {
  name: string;
  value: number;
};

type BarChartProps = {
  data: DataPoint[];
  width?: number;
  height?: number;
};

export default function BarChart({data, width = 500, height = 300} : BarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // clear previous renders

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Tooltip
    const tooltip = d3
      .select(containerRef.current)
      .append("div")
      .attr("class", "tooltip-card")

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

    // Gradient
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#4facfe");
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#00f2fe");

    // create a group element for the charts
    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Grid-lines for x-axis using the y-axis ticks
    chart
      .append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-chartWidth)
          .tickFormat(() => "")
      )
      .selectAll("line")
      .attr("stroke", "#e0e0e0");

    // Grid-lines for y-axis using the x-axis ticks
    chart
      .append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(chartHeight)
          .tickFormat(() => "")
      )
      .selectAll("line")
      .attr("stroke", "#e0e0e0");

    // Bars
    chart
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.name) as unknown as string )
      .attr("y", chartHeight)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      // .attr("fill", "pink")
      .attr("fill", "url(#bar-gradient)")
      .on("mouseenter", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.name}</strong>: ${d.value}`)
          .style("left", `${event.offsetX + 10}px`)
          .style("top", `${event.offsetY - 30}px`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.offsetX + 10}px`)
          .style("top", `${event.offsetY - 30}px`);
      })
      .on("mouseleave", () => {
        tooltip.style("opacity", 0);
      })
      .transition()
      .duration(800)
      .delay((_, i) => i * 300) // where _ = d, but since we're not using it, we replace it with _
      .attr("y", (d) => yScale(d.value) )
      .attr("height", (d) => chartHeight - yScale(d.value))

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
    <div ref={containerRef} style={{ minWidth:"500px", maxWidth:"800px", width: "100%", height: "auto" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
