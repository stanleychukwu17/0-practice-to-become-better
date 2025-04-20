In this project we added: <br>
  ✅ Dynamic resizing using ResizeObserver <br>
  ✅ Hover tooltips <br>
  ✅ Grid-lines <br>
  ✅ Bar color gradients

<br>

# **1. ResizeObserver**:
<br>
we used resize observer to adjust the width of the svg whenever there is a layout change
on the parent of the svg <br>
see note on resize observer [here](./resize_observer.md) <br>
this is the code added:

```ts
  const svgParentRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svgHeight = 500
  const [dimensions, setDimensions] = useState({ width: 500, height: svgHeight });

  // useEffect used for adding the observer
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { width } = entry.contentRect;
      setDimensions({ width, height: svgHeight });
    });

    if (svgParentRef.current) {
      observer.observe(svgParentRef.current);
    }

    return () => observer.disconnect();
  }, []);
```

<br>

# **2. Tooltip**:
<br>
The tooltip is a small card that pops out anytime we hover on any of the rect, see the code:
<br>

```ts
  // Tooltip
  const tooltip = d3
    .select(containerRef.current)
    .append("div")
    .style("position", "absolute")
    .style("padding", "6px 10px")
    .style("background", "rgba(0,0,0,0.75)")
    .style("color", "#fff")
    .style("border-radius", "4px")
    .style("pointer-events", "none")
    .style("font-size", "13px")
    .style("opacity", 0);

  // but i prefer to style is css, i prefer something like this:
  const tooltip = d3.select(svgParentRef)
    .append("div")
    .attr("class", "chartBar_tooltip")
    // moved all of the inline-styling to the css file
```

<br>

# **3. Grid-line**:
<br>
Adding the grid-line is a bit straight forward, see the code:

```ts
  // create the chart group
  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // create a group for the grid-lines and use .call to add the grid-lines to the group
  chart
    .append("g")
    .attr("class", "x-grid")
    .call(
      d3
        .axisLeft(yScale)
        .tickSize(-chartWidth)
        .tickFormat(() => "")
    )
    .selectAll("line")
    .attr("stroke", "#e0e0e0");
```
so with the grid lines, you see that when we created the group for the grid-lines, we did:<br>

```ts
  d3.axisLeft(yScale)
    .tickSize(-chartWidth)
    .tickFormat(() => "")
```

**1. d3.axisLeft(yScale):**
  - d3.axisLeft() creates a left-oriented axis (i.e., a vertical axis)
  - It takes yScale as an argument, which means that the axis will be based on the provided yScale
  - This defines the positioning of the ticks and how the axis is scaled and drawn on the chart

**2. .tickSize(-chartWidth):**
  - Normally, tick lines are small marks on the axis. Maybe width of 4px
  - But now using chartWidth as the width of the ticks will make each tick line extend horizontally across the full width of the chart
  - So instead of just tiny ticks, you now get full-length horizontal lines — i.e: grid lines
  - Why negative (i.e -chartWidth)? Because .axisLeft means the axis is on the left side and by default tick lines <br> are drawn to the left and to draw grid lines into the chart, they need to go left to right, which is negative for D3 axes
  - for the following: <br>
    .axisLeft() & .axisTop(): you need to do {-value} to draw into the chart
    .axisBottom() & .axisRight(): you need to do {value}, to draw into the chart, not {-value}

**3. .tickFormat(() => ""):**
  - .tickFormat() is used to format the tick labels. By default, this function would display labels on the ticks. <br>
  - But returning an empty string removes the text labels (i.e., tick values like 0, 20, 40).
  - Result: just the grid lines, no numbers.

# **4. Bar Gradient**:
After we created the xScale and yScale, we added the following code:

```ts
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
```


# Brining it all together:


```ts
  // Bars
  chart
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.name)!)
    .attr("y", chartHeight)
    .attr("width", xScale.bandwidth())
    .attr("height", 0)
    .attr("fill", "url(#bar-gradient)") // using the gradient
    // using the tooltip
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
    // the animation
    .transition()
    .duration(800)
    .delay((_, i) => i * 100)
    .attr("y", (d) => yScale(d.value))
    .attr("height", (d) => chartHeight - yScale(d.value));
```