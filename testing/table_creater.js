let rowCreator = (item) => {
    let row = Object.values(item)
    return `<tr>${row.map(td => `<td>${td}</td>`).join("")}</tr>`;
}

let buildTable = (data) => {
    let thead = myTable.createTHead();
    let tbody = myTable.createTBody();
    thead.classList.add("table-primary");

    thead.innerHTML = Object.keys(data[0]).map(item => {
        return `<th>${item}</th>`
    }).join("")

    tbody.innerHTML = data.map(rowCreator).join("")
}