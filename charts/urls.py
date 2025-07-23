from django.urls import path
from .views import full_chart_view

urlpatterns = [
    path(
        "", full_chart_view, name="home"
    ),  # ✅ 추가: http://127.0.0.1:8000/ 접속 시 charts.html 렌더링
    path("charts/", full_chart_view, name="species_chart"),  # 기존 라우팅 유지
]
