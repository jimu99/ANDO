document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("map");

  const options = {
    center: new kakao.maps.LatLng(36.5665, 127.9780),
    level: 13
  };

  const map = new kakao.maps.Map(container, options);

  // ✅ 중요: fetch 경로를 /data/...로 변경
  fetch("/data/jungbu.json")
    .then((res) => res.json())
    .then((data) => {
      const linePath = data.map((p) =>
        new kakao.maps.LatLng(p.lat, p.lon)  // ✅ key명 확인 완료
      );

      const polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeStyle: "solid"
      });

      polyline.setMap(map);
    })
    .catch((err) => console.error("🚨 중부선 데이터 로드 실패:", err));
});
