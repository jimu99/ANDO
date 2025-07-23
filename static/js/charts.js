document.addEventListener("DOMContentLoaded", function () {
    const totalData = JSON.parse(document.getElementById("total-data").textContent);
    const jungbuData = JSON.parse(document.getElementById("jungbu-data").textContent);
    const donutData = JSON.parse(document.getElementById("donut-data").textContent);

    const grayPalette = ["#4b4b4b", "#6e6e6e", "#909090", "#b3b3b3", "#d6d6d6"];
    const yellow = "#FFD700";
    const lightGray = "#645a10ff";

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    };

    new Chart(document.getElementById('totalChart'), {
        type: 'pie',
        data: {
            labels: totalData.labels,
            datasets: [{
                data: totalData.values,
                backgroundColor: grayPalette
            }]
        },
        options: chartOptions
    });

    new Chart(document.getElementById('jungbuChart'), {
        type: 'pie',
        data: {
            labels: jungbuData.labels,
            datasets: [{
                data: jungbuData.values,
                backgroundColor: grayPalette
            }]
        },
        options: chartOptions
    });

    new Chart(document.getElementById('livingChart'), {
        type: 'pie',
        data: {
            labels: donutData.map(d => d.label),
            datasets: [{
                data: donutData.map(d => d.value),
                backgroundColor: donutData.map(d => 
                    (d.label === "경작지" || d.label === "하천변") ? yellow : lightGray
                )
            }]
        },
        options: chartOptions
    });
});