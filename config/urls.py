from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("charts.urls")),  # ✅ charts 앱의 루트 연결
]

# ✅ 정적 파일 경로 추가
if settings.DEBUG:
    # 일반 static 파일(css/js 등)
    urlpatterns += static(
        settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0]
    )

    # ✅ 추가: /data/ 폴더 서빙 (jungbu.json 등)
    urlpatterns += static("/data/", document_root=settings.DATA_DIR)
