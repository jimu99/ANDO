document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("roadkillDonutChart");
  if (!container) return;

  const data = [
    { label: '중부선', value: 61 },
    { label: '중앙선', value: 47 },
    { label: '당진대전선', value: 43 },
    { label: '경부선', value: 33 },
    { label: '서해안선', value: 33 }
  ];

  const width = 300;
  const height = 300;
  const radius = Math.min(width, height) / 2;

  const svg = d3.select("#roadkillDonutChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.label))
    .range(["#FFD700", "#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC"]);

  const pie = d3.pie().value(d => d.value);
  const data_ready = pie(data);

  const arc = d3.arc()
    .innerRadius(radius * 0.6)
    .outerRadius(radius * 0.9);

  svg
    .selectAll('path')
    .data(data_ready)
    .join('path')
    .attr("fill", d => color(d.data.label))
    .attr("stroke", "#fff")
    .style("stroke-width", "2px")
    .transition()
    .duration(1000)
    .attrTween("d", function (d) {
      const i = d3.interpolate(d.startAngle, d.endAngle);
      return function (t) {
        d.endAngle = i(t);
        return arc(d);
      };
    });

  const texts = svg
    .selectAll('g.label')
    .data(data_ready)
    .join('g')
    .attr('class', 'label')
    .attr("transform", d => `translate(${arc.centroid(d)})`);

  texts.append("text")
    .text(d => d.data.label)
    .attr("y", -10)
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .style("fill", "#333");

  texts.append("text")
    .text(d => ((d.data.value / 355) * 100).toFixed(1) + "%")
    .attr("y", 10)
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .style("fill", "#333");
});
