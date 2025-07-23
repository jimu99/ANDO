// ✅ 탭 전환 함수
function showTab(index) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
  });

  // ✅ 메인 카테고리 반전 스타일
  const mainTabs = document.querySelectorAll(".category-panel > ul > li");
  mainTabs.forEach((li, i) => {
    if (i !== 0) li.classList.toggle("active-tab", i === index);
    else li.classList.remove("active-tab"); // 메인은 무조건 제거
  });
}

// ✅ 서브카테고리 전환 함수
function showSubTab(name) {
  showTab(1); // 카테고리1 탭으로 이동

  // 메인 탭 비활성화 처리
  document.querySelectorAll(".category-panel > ul > li").forEach(li =>
    li.classList.remove("active-tab")
  );

  // 서브카테고리 하이라이트 초기화
  document.querySelectorAll(".submenu li").forEach(li =>
    li.classList.remove("active")
  );

  const nameToIndex = {
    subcat1: 0,
    subcat2: 1,
    subcat3: 2,
  };

  const target = nameToIndex[name];
  if (typeof target !== "undefined") {
    document.querySelectorAll(".submenu > li")[target].classList.add("active");
  }

  // 도넛 렌더링 함수 호출
  if (name === "subcat1") renderSubcat1();
  if (name === "subcat2") renderSubcat2();
  if (name === "subcat3") renderSubcat3();
}

// ✅ 드롭다운 펼치기
function toggleSubmenu(el) {
  const submenu = el.nextElementSibling;
  const parentLi = el;

  if (submenu && submenu.classList.contains("submenu")) {
    const isOpen = submenu.style.display === "block";
    submenu.style.display = isOpen ? "none" : "block";

    // 카테고리 1만 반전되도록
    if (!isOpen) {
      parentLi.classList.add("active-tab");
    } else {
      parentLi.classList.remove("active-tab");
    }

    // 다른 카테고리 초기화
    document.querySelectorAll(".category-panel > ul > li").forEach(li => {
      if (li !== parentLi && !li.classList.contains("submenu")) {
        li.classList.remove("active-tab");
      }
    });
  }
}
