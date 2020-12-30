const myTable = document.querySelector("#myTable");
const tblBody = document.querySelector("#tbl-body");

let searchData = (event) => {
  event.preventDefault();
  let searchField = event.target.search.value;
  console.log(searchField);

  if (searchField === "") {
    tblBody.innerHTML = "";
    return;
  } else if (searchField.length > 3) {
    let url_parms = new URLSearchParams({
      start: 1,
      limit: 10,
      q: searchField,
    }).toString();

    let url = `${window.location.href}api/products?${url_parms}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        buildTbl(data);
        $(myTable).DataTable();
      });
    /*
                $(myTable).DataTable({
                    
                    "fnInitComplete": function(oSettings, json) {
                        alert( 'DataTables has finished its initialisation.' );
                    },
                    
                    dom: 'Bfrtip', //Bfrtip', //lBfrtip
                    buttons: ['pageLength','copy', 'csv']
                });
                
           
            //.then((data) => console.log(data));
            */
  }
};

let buildTbl = (data) => {
  tblBody.innerHTML = data
    .map((row) => {
      return `<tr>
                        <td class="text-center"><a class="" target="_blank"
                            href="${urlParms(row)}">${row["ingredient"]}</a>
                        </td>
                        <td>${row["df;route"]}</td>
                        <td>${row["trade_name"]}</td><td>${
        row["applicant"]
      }</td>
                        <td>${row["strength"]}</td><td>${row["appl_type"]}</td>
                        <td>${row["appl_no"]}</td><td>${row["product_no"]}</td>
                        <td>${row["te_code"]}</td><td>${
        row["approval_date"]
      }</td>
                        <td>${row["rld"]}</td><td>${row["rs"]}</td>
                        <td>${row["type"]}</td>
                        <td>${row["applicant_full_name"]}</td>
                    </tr>`;
    })
    .join("");
};

let urlParms = (parms) => {
  let url_parms = new URLSearchParams({
    Product_No: parms["product_no"],
    Appl_No: parms["appl_no"],
    Appl_Type: parms["appl_type"],
  }).toString();

  let url = `${window.location.href}product_details.html?${url_parms}`;
  return url;
};

/*
$(document).ready(function() {
        let url_parms = new URLSearchParams({
            start: 1,
            limit: 10,
            q: searchField,
        }).toString();

        let url = `${window.location.href}api/products?${url_parms}`;
        
        $('#myTable').DataTable({
            "processing": true,
            "serverSide": true,
            ajax: {
                url: url,
                dataFilter: function(data){
                    var json = jQuery.parseJSON( data );
                    json.recordsTotal = json.total;
                    json.recordsFiltered = json.total;
                    json.data = json.list;

                    return JSON.stringify( json ); // return JSON string
                }
            }
        });
    });
    */
