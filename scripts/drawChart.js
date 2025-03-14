function drawChart(data) {
    const ctx = document.getElementById("resultChart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["100% прав. відп.", "75% прав. відп.", "50% прав. відп.", "25% прав. відп."],
            datasets: [{
                label: 'Ймовірність правильної відповіді',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, max: 1 }
            }
        }
    });

    addPercentsP(data)
}