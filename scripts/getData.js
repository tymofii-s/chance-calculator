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

function getData() {
    const testData = [];
    for (let i = 1; i <= testCount; i++) {
        const variants = parseInt(document.getElementById(`variants${i}`).value);
        if (!isNaN(variants) && variants >= 2) {
            testData.push(variants);
        }
    }

    drawChart(  calculateChances(testData)  );
}