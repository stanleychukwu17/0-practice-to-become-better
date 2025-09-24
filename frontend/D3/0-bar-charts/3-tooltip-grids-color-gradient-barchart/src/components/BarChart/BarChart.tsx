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
  const gradientColor = useRef({starting:'#4facfe', ending:'#00f2fe'})

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // clear previous renders and animation

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

    // Tooltip
    const tooltip = d3
      .select(containerRef.current)
      .append("div")
      .attr("class", "tooltip-card")
      .style("opacity", 0);

    // Gradient: from top to bottom
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
      .attr("stop-color", gradientColor.current.starting);
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", gradientColor.current.ending);
    
    // Gradient: from left to right
    defs.append("linearGradient")
      .attr("id", "bar-gradient2")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "100%").attr("y2", "0%")
      .selectAll("stop")
      .data([gradientColor.current.starting, gradientColor.current.ending])
      .enter().append("stop")
      .attr("offset", (_d, i) => `${i * 100}%`)
      .attr("stop-color", (d) => d);
    
    // Gradient: from top-left to bottom-right
    defs.append("linearGradient")
      .attr("id", "bar-gradient3")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "100%").attr("y2", "100%")
      .selectAll("stop")
      .data([gradientColor.current.starting, gradientColor.current.ending])
      .enter().append("stop")
      .attr("offset", (_d, i) => `${i * 100}%`)
      .attr("stop-color", (d) => d);

    // create a group element for the charts
    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Grid-lines for x-axis using the y-axis ticks
    chart
      .append("g")
      .attr("class", "x-grid")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-chartWidth) // tickSize is the length of the tick, see general_note.md for more
          .tickFormat(() => "")
      )
      .selectAll("line")
      .attr("stroke", "#e0e0e0");

    /* Another way to create grid-lines
      const xGridLine = chart.append("g").attr("class", "x-grid")
      xGridLine.call(
          d3
            .axisLeft(yScale)
            .tickSize(-chartWidth)
            .tickFormat(() => "")
        )
      xGridLine.selectAll("line").attr("stroke", "#e0e0e0")  
    */

    // Grid-lines for y-axis using the x-axis ticks
    chart
      .append("g")
      .attr("class", "y-grid")
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(chartHeight) // tickSize is the length of the tick, see general_note.md for more
          .tickFormat(() => "")
      )
      .selectAll("line")
      .attr("stroke", "#e0e0e0");

    // Bars
    chart
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => xScale(d.name) as unknown as string )
      .attr("y", chartHeight)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("fill", "url(#bar-gradient)")
      //@ts-expect-error - the callback function below is valid
      // if we used .enter().append("rect") instead of .join("rect"), there will be no errors
      .on("mouseenter", function (this: SVGElement, event, d) {
        // display the tooltip and its content
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.name}</strong>: ${d.value}`)
          .style("left", `${event.offsetX + 10}px`)
          .style("top", `${event.offsetY - 30}px`);
        
        // change the bar color
        d3.select(this).attr("fill", gradientColor.current.ending);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.offsetX + 10}px`)
          .style("top", `${event.offsetY - 30}px`);
      })
      //@ts-expect-error - the callback function below is valid
      .on("mouseleave", function(this: SVGElement) {
        // hides the tooltip
        tooltip.style("opacity", 0);

        // takes the color back to the gradient
        d3.select(this).attr("fill", "url(#bar-gradient)")
      })
      .transition()
      .duration(800)
      // below: _ = d, but since we're not using it, we replace it with _ ; i = index;
      // i * 300 = delay in ms; teacher did i * 100; but i prefer 300 
      .delay((_, i) => i * 300)
      .ease(d3.easeCubicInOut)
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
