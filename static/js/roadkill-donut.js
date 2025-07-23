document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("roadkillDonutChart");
  if (!ctx) return;

  // 원본 데이터
  const rawData = [
    { label: "중부선", value: 66 },
    { label: "중앙선", value: 22 },
    { label: "서산영덕선(대전당진)", value: 19 },
    { label: "서해안선", value: 19 },
    { label: "경부선", value: 18 },
    { label: "호남지선", value: 14 },
    { label: "광주대구선", value: 11 },
    { label: "남해선", value: 6 },
    { label: "동해선", value: 6 },
    { label: "영동선", value: 6 },
    { label: "호남선", value: 6 },
    { label: "남해1지선", value: 5 },
    { label: "수도권제1순환선", value: 4 },
    { label: "무안광주선", value: 3 },
    { label: "서산영덕선(청주상주)", value: 3 },
    { label: "중부내륙선", value: 3 }
  ];

  // 상위 N개 + 기타 묶기
  const topN = 8;
  const sorted = rawData.sort((a, b) => b.value - a.value);
  const top = sorted.slice(0, topN);
  const rest = sorted.slice(topN);
  const otherSum = rest.reduce((sum, d) => sum + d.value, 0);
  const finalData = [...top, { label: "기타", value: otherSum }];

  const chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: finalData.map(d => d.label),
      datasets: [{
        data: finalData.map(d => d.value),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#8B5CF6", "#CCCCCC"
        ],
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "right" },
        title: {
          display: true,
          text: "노선별 로드킬 발생 분포 (상위 4개 + 기타)"
        }
      }
    }
  });
});
