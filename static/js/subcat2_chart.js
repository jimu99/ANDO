function renderSubcat2() {

  console.log("차트 로딩됨 ✅");
  const container = document.getElementById("subchart-area");
  container.innerHTML = `
    <h1 style="text-align:center; font-size: 22px; font-weight: bold; margin-top: 30px;">📊 컬럼 선정 배경</h1>

    <div class="charts-container">
      <div class="chart-box">
        <h2>로드킬 상위종</h2>
        <div id="species-chart"></div>
      </div>
      <div class="chart-box">
        <h2>서식지 유형</h2>
        <div id="habitat-chart"></div>
      </div>
    </div>
  `;

  const chartData = [
    {
      id: "species-chart",
      data: [
        { label: "고라니", value: 3459 },
        { label: "고양이", value: 383 },
        { label: "멧돼지", value: 300 },
        { label: "너구리", value: 274 },
        { label: "개", value: 178 }
      ],
      colorMap: {
        "고라니": "#FF0000",
        "고양이": "#d3d3d3",
        "멧돼지": "#d3d3d3",
        "너구리": "#d3d3d3",
        "개": "#d3d3d3"
      }
    },
    {
      id: "habitat-chart",
      data: [
        { label: "경작지", value: 600 },
        { label: "하천변", value: 141 },
        { label: "해안", value: 49 },
        { label: "습지", value: 26 },
        { label: "나지", value: 10 }
      ],
      colorMap: {
        "경작지": "#d4a373",
        "하천변": "#9ec9f5",
        "해안": "#d3d3d3",
        "습지": "#d3d3d3",
        "나지": "#d3d3d3"
      }
    }
  ];

  chartData.forEach(({ id, data, colorMap }) => {
    const width = 180;
    const height = 180;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#" + id)
      .append("svg")
      .attr("width", width + 180)
      .attr("height", height + 180)
      .append("g")
      .attr("transform", `translate(${(width / 2) + 50}, ${(height / 2) + 20})`);

    const pie = d3.pie().value(d => d.value);
    const data_ready = pie(data);

    const arc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.9);

    const outerArc = d3.arc()
      .innerRadius(radius * 1.0)
      .outerRadius(radius * 1.0);

    svg
      .selectAll('path')
      .data(data_ready)
      .join('path')
      .attr("fill", d => colorMap[d.data.label])
      .attr("stroke", "#fff")
      .style("stroke-width", "2px")
      .transition()
      .duration(2000)
      .ease(d3.easeCubicInOut)
      .attrTween("d", function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(interpolate(t));
        };
      });

    svg
svg
  .selectAll('polyline')
  .data(data_ready)
  .join('polyline')
  .attr("points", d => {
    const posA = arc.centroid(d);
    const posB = outerArc.centroid(d);
    const posC = [...posB];
    const angle = (d.startAngle + d.endAngle) / 2;
    const isRight = angle < Math.PI;

    // 선 끝 지점을 위로 + 텍스트 위쪽에 닿게 (dy 보정)
    posC[0] = isRight ? radius * 1.15 : -radius * 1.15;
    posC[1] -= 10; // 👈 이 줄이 핵심! y축을 위로 올려서 겹침 방지

    return [posA, posB, posC];
  })
  .style("fill", "none")
  .style("stroke", "#333")
  .style("stroke-width", 1.2);


    svg
      .selectAll('text')
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

    svg.selectAll("text").each(function (d) {
      const total = d3.sum(data, d => d.value);
      const percent = ((d.data.value / total) * 100).toFixed(1) + "%";
      const textEl = d3.select(this);
      textEl.text(null);
      textEl.append("tspan").attr("x", 0).attr("dy", 0).text(d.data.label);
      textEl.append("tspan").attr("x", 0).attr("dy", "1.2em").text(percent);
    });
  });
}
