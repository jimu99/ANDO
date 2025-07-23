from django.shortcuts import render
import os
import pandas as pd
import json


def full_chart_view(request):
    # ✅ 1. 전체 종 분포 데이터
    csv_path = os.path.join("data", "waterdeer_percent.csv")
    df = pd.read_csv(csv_path, encoding="euc-kr")

    total_counts = df["종명"].value_counts()
    total_data = {
        "labels": total_counts.index.tolist(),
        "values": total_counts.values.tolist(),
    }

    # ✅ 2. 중부선 필터링
    include_keywords = ["중부선", "중부고속도로", "35"]
    exclude_keywords = ["제2", "중부내륙", "제2중부", "내륙", "중앙"]

    def is_real_jungbu(name):
        name = str(name)
        return any(k in name for k in include_keywords) and not any(
            e in name for e in exclude_keywords
        )

    filtered_df = df[df["도로명"].apply(is_real_jungbu)]
    jungbu_counts = filtered_df["종명"].value_counts()
    jungbu_data = {
        "labels": jungbu_counts.index.tolist(),
        "values": jungbu_counts.values.tolist(),
    }

    # ✅ 3. 고라니 서식지 도넛 데이터
    living_df = pd.read_csv("data/gorani_living_type.csv")
    top5 = living_df[living_df["type"] != "산림"]["type"].value_counts().nlargest(5)

    donut_data = []
    for type_, count in top5.items():
        color = "#FFD700" if type_ in ["경작지", "하천변"] else "#C0C0C0"
        donut_data.append({"label": type_, "value": count, "color": color})

    # ✅ 4. 템플릿으로 전부 전달
    return render(
        request,
        "main.html",
        {
            "total_data": json.dumps(total_data, ensure_ascii=False),
            "jungbu_data": json.dumps(jungbu_data, ensure_ascii=False),
            "donut_data": json.dumps(donut_data, ensure_ascii=False),
        },
    )
