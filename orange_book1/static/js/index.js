$(document).ready(function () {
  let urlParms = (parms) => {
    let url_parms = new URLSearchParams({
      product_no: parms["product_no"],
      appl_no: parms["appl_no"],
      appl_type: parms["appl_type"],
    }).toString();

    //let url = `${window.location.origin}product_details?${url_parms}`;
    let url = `/product_details?${url_parms}`;
    return url;
  };

  $("#myForm").submit((event) => {
    event.preventDefault();
    let searchField = event.target.search.value;
    //let url = `${window.location.origin}/api/products?q=${searchField}`;
    let url = `/api/products?q=${searchField}`;

    //https://datatables.net/manual/tech-notes/3
    //https://stackoverflow.com/questions/42462089/server-side-processing-with-datatables-and-flask
    //table = $('#myTable').DataTable()
    //table.destroy();

    $("#myTable").DataTable({
      destroy: true,
      processing: true,
      ajax: url,
      columns: [
        {
          data: "ingredient",
          render: (data, type, row, meta) => {
            if (type === "display") {
              data = `<a href="${urlParms(row)}" target="_blank">${data}</a>`;
            }
            return data;
          },
        },
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
      buttons: ["pageLength", "copy", "csv"],
    });
  });
});
