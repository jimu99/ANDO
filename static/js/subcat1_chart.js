function renderSubcat1() {
  const container = document.getElementById("subchart-area");

  container.innerHTML = `
    <h1 class="subcat1-title">하천·농경지·보호시설 인접 비율 시각화</h1>
    <div class="charts-container">
      <div class="chart-box">
        <h2 class="chart-title">하천점</h2>
        <div id="water-chart"></div>
      </div>
      <div class="chart-box">
        <h2 class="chart-title">농경지점</h2>
        <div id="agri-chart"></div>
      </div>
      <div class="chart-box">
        <h2 class="chart-title">보호시설점</h2>
        <div id="fence-eco-chart"></div>
      </div>
    </div>
  `;

  setTimeout(drawSubcat1Charts, 0);
}

function drawSubcat1Charts() {
  const chartData = [
    {
      id: "water-chart",
      color: ["#9ec9f5", "#e0e0e0"],
      data: [
        { label: "인접", value: 522 },
        { label: "비인접", value: 1668 }
      ]
    },
    {
      id: "agri-chart",
      color: ["#d4a373", "#e0e0e0"],
      data: [
        { label: "인접", value: 1602 },
        { label: "비인접", value: 588 }
      ]
    },
    {
      id: "fence-eco-chart",
      color: ["#a8ddb5", "#e0e0e0"],
      data: [
        { label: "인접", value: 1644 },
        { label: "비인접", value: 546 }
      ]
    }
  ];

  chartData.forEach(({ id, data, color }) => {
    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#" + id)
      .append("svg")
      .attr("width", width + 100)
      .attr("height", height + 60)
      .append("g")
      .attr("transform", `translate(${width / 2 + 50},${height / 2 + 20})`);

    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(color);

    const pie = d3.pie().value(d => d.value);
    const data_ready = pie(data);

    const arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius * 0.9);
    const outerArc = d3.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9);

    svg.selectAll('path')
      .data(data_ready)
      .join('path')
      .attr("fill", d => colorScale(d.data.label))
      .attr("stroke", "#fff")
      .style("stroke-width", "2px")
      .transition()
      .duration(2000)
      .ease(d3.easeCubicInOut)
      .attrTween("d", function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return t => arc(interpolate(t));
      });

    svg.selectAll('polyline')
      .data(data_ready)
      .join('polyline')
      .attr("points", d => {
        const posA = arc.centroid(d);
        const posB = outerArc.centroid(d);
        const posC = [...posB];
        posC[0] = (d.startAngle + d.endAngle) / 2 < Math.PI ? radius * 1.05 : -radius * 1.05;
        return [posA, posB, posC];
      })
      .style("fill", "none")
      .style("stroke", "#333")
      .style("stroke-width", 1.2);

    svg.selectAll('text')
      .data(data_ready)
      .join('text')
      .attr("transform", d => {
        const pos = outerArc.centroid(d);
        pos[0] = (d.startAngle + d.endAngle) / 2 < Math.PI ? radius * 1.1 : -radius * 1.1;
        return `translate(${pos})`;
      })
      .style("text-anchor", d => (d.startAngle + d.endAngle) / 2 < Math.PI ? "start" : "end")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#333")
      .style("opacity", 0)
      .transition()
      .delay(1800)
      .duration(800)
      .style("opacity", 1);

    svg.selectAll("text").each(function(d) {
      const percent = ((d.data.value / d3.sum(data, d => d.value)) * 100).toFixed(1) + "%";
      const textEl = d3.select(this);
      textEl.text(null);
      textEl.append("tspan").attr("x", 0).attr("dy", 0).text(d.data.label);
      textEl.append("tspan").attr("x", 0).attr("dy", "1.2em").text(percent);
    });
  });
}
