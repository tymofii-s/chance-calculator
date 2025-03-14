let testCount = 0;
let chart;

function addTest() {
    testCount++;
    const container = document.getElementById("testContainer");
    const div = document.createElement("div");
    div.classList.add("input-group");
    div.innerHTML = `
        <label>Завдання ${testCount}: </label>
        <input type="number" min="2" value="4" id="variants${testCount}" placeholder="К-ть варіантів">
    `;
    container.appendChild(div);

    document.getElementById("countOfTasks").textContent = testCount
}

function calculate() {
    const testData = [];
    for (let i = 1; i <= testCount; i++) {
        const variants = parseInt(document.getElementById(`variants${i}`).value);
        if (!isNaN(variants) && variants >= 2) {
            testData.push(1 / variants);
        }
    }

    drawChart(testData);
}

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
}