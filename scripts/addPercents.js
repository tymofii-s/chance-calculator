function addPercentsP(data) {
    alert(data)
    document.getElementById("percents").innerHTML = `
        100% прав. відп.: ${data[0] *100} <br>
        75% прав. відп.: ${data[1] *100} <br>
        50% прав. відп.: ${data[2] *100} <br>
        25% прав. відп.: ${data[3] *100} <br>
    `
}