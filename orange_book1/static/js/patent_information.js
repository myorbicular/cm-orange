let fetchData = (req_url) => {
  let url = `https://api.allorigins.win/get?url=${encodeURIComponent(req_url)}`;
  //fetch(req_url,{mode:'no-cors'})
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let res_obj = data.contents;
      let table = $(res_obj).find("table");

      let tbl_style = {
        "font-size": "10px",
        color: "#333333",
        "border-width": "1px",
        "border-color": "#666666",
        "border-collapse": "collapse",
      };

      let tbl_th_style = {
        "border-width": "1px",
        padding: "6px",
        "border-style": "solid",
        "border-color": "#666666",
        "background-color": "#0c499c",
        color: "#fff",
      };

      let tbl_td_style = {
        "border-width": "1px",
        padding: "8px",
        "border-style": "solid",
        "border-color": "#666666",
        "background-color": "#ffffff",
      };

      let loadTable = "#loadData";
      $(loadTable).html(table);
      $(loadTable).css(tbl_style);
      $(`${loadTable} thead`).find("th").css(tbl_th_style);
      $(`${loadTable} tbody`).find("td").css(tbl_td_style);
      $(`${loadTable} tfoot`).find("th").css(tbl_th_style);
      $(`${loadTable} table`).DataTable();

      $("a").click(function (event) {
        event.preventDefault();
        let oldUrl = event.target.href;
        let url = new URL(oldUrl);
        //url.hostname = "example.com";
        let new_url = `https://www.accessdata.fda.gov/scripts/cder/ob/results_product.cfm${url.search}`;
        window.open(new_url, "_blank");
      });
    });
};
