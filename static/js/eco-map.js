// js/eco-map.js

let ecoCircles = [];

function clearEcoCircles() {
  ecoCircles.forEach(c => c.setMap(null));
  ecoCircles = [];
}

function drawEcoCircles(map) {
  clearEcoCircles(); // 기존 마커 제거

  fetch("data/생태통로.csv")
    .then(res => res.text())
    .then(csvText => {
      const lines = csvText.trim().split("\n").slice(1); // 헤더 제외
      lines.forEach(line => {
const columns = line.split(",");
const x = parseFloat(columns.at(-2));  // 뒤에서 두 번째
const y = parseFloat(columns.at(-1));  // 마지막

if (!isNaN(x) && !isNaN(y)) {
  const circle = new kakao.maps.Circle({
    center: new kakao.maps.LatLng(y, x),
            radius: 300,
            strokeWeight: 2,
            strokeColor: "#2ecc71",
            strokeOpacity: 0.8,
            fillColor: "#2ecc71",
            fillOpacity: 0.4
          });
          circle.setMap(map);
        }
      });
    });
}
