//let btnGet = document.querySelector('#myBtn');
let myTable = document.querySelector('#myTable');
//btnGet.addEventListener('click', () => {

let buildTable = (headers, employees) => {
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');

    table.classList.add("table", "table-bordered");
    headerRow.classList.add("table-primary");

    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    employees.forEach(emp => {
        let row = document.createElement('tr');

        Object.values(emp).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })
        table.appendChild(row);
    });
    myTable.appendChild(table);
}