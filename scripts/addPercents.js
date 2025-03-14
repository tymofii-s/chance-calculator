let globalData;
function addPercentsP(data) {
    globalData = data
    document.getElementById("percents").innerHTML = `
        100% прав. відп.: ${getNum(0)} <br>
        75% прав. відп.: ${getNum(1)} <br>
        50% прав. відп.: ${getNum(2)} <br>
        25% прав. відп.: ${getNum(3)} <br>
    `
}

function getNum(index) {
    let data = globalData

    return (data[index] * 100).toFixed(2)
}