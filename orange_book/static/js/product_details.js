$(document).ready(function () {
  //let url = `${window.location.origin}/api/products/details${window.location.search}`;
  let url = `/api/products/details${window.location.search}`;

  $("#patent").DataTable({
    ajax: {
      url: url,
      dataSrc: "patent_obj",
    },
    columns: [
      { data: "appl_type" },
      { data: "appl_no" },
      { data: "product_no" },
      { data: "patent_no" },
      { data: "patent_expire_date_text" },
      { data: "drug_substance_flag" },
      { data: "drug_product_flag" },
      { data: "patent_use_code" },
      { data: "delist_flag" },
      { data: "submission_date" },
    ],
    dom: "Bfrtip",
    buttons: ["pageLength", "copy", "csv"],
  });

  $("#exclusivity").DataTable({
    ajax: {
      url: url,
      dataSrc: "excl_obj",
    },
    columns: [
      { data: "appl_type" },
      { data: "appl_no" },
      { data: "product_no" },
      { data: "exclusivity_code" },
      { data: "exclusivity_date" },
    ],
    dom: "Bfrtip",
    buttons: ["pageLength", "copy", "csv"],
  });
});
//https://stackoverflow.com/questions/38920678/jquery-datatable-get-json-data-from-ajax
//https://datatables.net/manual/ajax
