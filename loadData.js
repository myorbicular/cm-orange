let btnGet = document.querySelector('#myBtn');

let myMap = []

btnGet.addEventListener('click', () => {
//let getProducts = () => {
    let url = 'http://localhost:5500/products.txt'
    fetch(url)
    .then(response => response.text())
    .then((data) => {
        let data_header = data.split('\n')[0].split('~');
        
        //let data_body = data.split('\n').slice(1, 2)
        let data_body = data.split('\n').slice(1,10)

        data_body.forEach((value, index, array) => {
            let body_line = value.split('~')
            let myObj = {}
            body_line.forEach((value, index, array) => {
                let column = data_header[index];
                myObj[column] = value
            })
            myMap.push(myObj)              
        })
        //console.log(data_header)
        buildTable(data_header, myMap)
    })
});

//getProducts();
//console.log('ramesh')
//https://www.fwait.com/how-to-create-table-from-an-array-of-objects-in-javascript/

      /*
                                let result = myMap.map(person => ({
                                    value: person.Ingredient,
                                    text: person.Trade_Name
                                }));
                                console.log(result)
                                */