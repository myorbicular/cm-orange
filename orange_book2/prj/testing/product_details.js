let fetchData = (url, tbl) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const elmId = tbl.getAttribute("id");
        setTimeout(() => buildTable(filtered_data, tbl), 100);
        $(tbl).before(`<p class="text-capitalize">${elmId} information</p>`);
        setTimeout(() => $(tbl).DataTable(), 100);
      }
    });
};

let rowCreator = (item) => {
  let row = Object.values(item);
  return `<tr>${row.map((td) => `<td>${td}</td>`).join("")}</tr>`;
};

let buildTable = (data, tbl) => {
  let thead = tbl.createTHead();
  let tbody = tbl.createTBody();

  thead.classList.add("table-primary");

  thead.innerHTML = Object.keys(data[0])
    .map((item) => {
      return `<th>${item}</th>`;
    })
    .join("");

  tbody.innerHTML = data.map(rowCreator).join("");
};

window.onload = function () {
  //const params = new URLSearchParams(window.location.search);
  let params = new URLSearchParams(document.location.search.substring(1));

  let url_parms = {
    product_no: params.get("Product_No"),
    appl_no: params.get("Appl_No"),
    appl_type: params.get("Appl_Type"),
  };

  console.log(window.location.href);
  /*
  //patent parms///
  const patent_url = `${window.location.href}api/products?${url_parms}`;
  const patent_tbl = document.querySelector("#patent");
  const patent_func = setTimeout(buildData(patent_url, patent_tbl), 200);

  //exclusivity parms///
  const excl_url = "./data/exclusivity.txt";
  const excl_tbl = document.querySelector("#exclusivity");
  const excl_func = setTimeout(buildData(excl_url, excl_tbl), 200);
  */
};
