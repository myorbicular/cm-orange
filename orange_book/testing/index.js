const local_api = `${window.location.href}api/products`;
const searchBox = document.querySelector("#txt-search");
const btnSearch = document.querySelector("#btn-search");

const myTable = document.querySelector("#myTable");
const tblBody = document.querySelector("#tbl-body");

let loadData = () => {
  fetch(local_api)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

let searchData = (event) => {
  event.preventDefault();
  //let searchField = e.target.value;
  let searchField = event.target.search.value;

  if (searchField === "") {
    tblBody.innerHTML = "";
    return;
  } else if (searchField.length > 3) {
    let regex = new RegExp(searchField, "i");
    tblBody.innerHTML = json_array
      .map((row) => {
        if (
          row["Ingredient"].search(regex) != -1 ||
          row["Trade_Name"].search(regex) != -1 ||
          row["Appl_No"].search(regex) != -1
          //row["DF;Route"].search(regex) != -1
          //row["Appl_No"].search(regex) != -1
        ) {
          return `<tr>
                    <td class="text-center"><a class="" target="_blank"
                        href="${urlParms(row)}">${row["Ingredient"]}</a>
                    </td>
                    <td>${row["DF;Route"]}</td>
                    <td>${row["Trade_Name"]}</td><td>${row["Applicant"]}</td>
                    <td>${row["Strength"]}</td><td>${row["Appl_Type"]}</td>
                    <td>${row["Appl_No"]}</td><td>${row["Product_No"]}</td>
                    <td>${row["TE_Code"]}</td><td>${row["Approval_Date"]}</td>
                    <td>${row["RLD"]}</td><td>${row["RS"]}</td>
                    <td>${row["Type"]}</td>
                    <td>${row["Applicant_Full_Name"]}</td>
                </tr>`;
        }
      })
      .join("");

    $(myTable).DataTable();
  }
};

let urlParms = (parms) => {
  let url_parms = new URLSearchParams({
    Product_No: parms["Product_No"],
    Appl_No: parms["Appl_No"],
    Appl_Type: parms["Appl_Type"],
  }).toString();

  let url = `${window.location.href}product_details.html?${url_parms}`;
  return url;
};

window.onload = function () {
  //loadData();
  console.log("local_api :", local_api);
};
