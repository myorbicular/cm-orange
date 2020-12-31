let searchData = (event) => {
  event.preventDefault();
  let searchField = event.target.search.value;
  let url = `http://localhost:5000/api/products?q=${searchField}`;

  $("#myTable").DataTable({
    processing: true,
    //serverSide: true,
    //dataSrc: 'data',
    //dom: "Bfrtip",
    ajax: url,
    columns: [
      { data: "ingredient" },
      { data: "df;route" },
      { data: "trade_name" },
      { data: "applicant" },
      { data: "strength" },
      { data: "appl_type" },
      { data: "appl_no" },
      { data: "product_no" },
      { data: "te_code" },
      { data: "approval_date" },
      { data: "rld" },
      { data: "rs" },
      { data: "type" },
      { data: "applicant_full_name" },
    ],
    dom: "Bfrtip",
    buttons: ["copy", "csv", "excel", "pdf"],
  });
};

//https://stackoverflow.com/questions/36046139/datatables-dynamic-columns-from-ajax-data-source
/*
$(document).ready(function() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/echo/json/',
        data: {
            json: JSON.stringify(jsonData)
        },
        success: function(d) {
            $('#example').DataTable({
                dom: "Bfrtip",
                data: d.data,
                columns: d.columns
            });
        }
    });
});
*/
