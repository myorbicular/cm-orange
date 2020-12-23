let data = [
  {
    id: "1",
    employee_name: "Tiger Nixon",
    employee_salary: "320800",
    employee_age: "61",
    profile_image: "default_profile.png",
  },
  {
    id: "2",
    employee_name: "Garrett Winters",
    employee_salary: "434343",
    employee_age: "63",
    profile_image: "default_profile.png",
  },
  {
    id: "3",
    employee_name: "Ashton Cox",
    employee_salary: "86000",
    employee_age: "66",
    profile_image: "default_profile.png",
  },
  {
    id: "4",
    employee_name: "Cedric Kelly",
    employee_salary: "433060",
    employee_age: "22",
    profile_image: "default_profile.png",
  },
  {
    id: "5",
    employee_name: "Airi Satou",
    employee_salary: "162700",
    employee_age: "33",
    profile_image: "default_profile.png",
  },
  {
    id: "6",
    employee_name: "Brielle Williamson",
    employee_salary: "372000",
    employee_age: "61",
    profile_image: "default_profile.png",
  },
  {
    id: "7",
    employee_name: "Herrod Chandler",
    employee_salary: "137500",
    employee_age: "59",
    profile_image: "default_profile.png",
  },
  {
    id: "8",
    employee_name: "Rhona Davidson",
    employee_salary: "327900",
    employee_age: "55",
    profile_image: "default_profile.png",
  },
  {
    id: "9",
    employee_name: "Colleen Hurst",
    employee_salary: "205500",
    employee_age: "39",
    profile_image: "default_profile.png",
  },
  {
    id: "10",
    employee_name: "Sonya Frost",
    employee_salary: "103600",
    employee_age: "23",
    profile_image: "default_profile.png",
  },
];

const url = "http://localhost:5500/orange/products.txt";

let json_array = [];
const searchBox = document.querySelector("#txt-search");
const tblBody = document.querySelector("#tbl-body");

let loadData = () => {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      let data_header = data.split("\n")[0].split("~");
      //let data_body = data.split('\n').slice(1)
      let data_body = data.split("\n").slice(1, 50);

      data_body.map((value, index, array) => {
        let body_line = value.split("~");
        let eachObj = {};
        body_line.map((value, index, array) => {
          eachObj[data_header[index]] = value;
        });
        json_array.push(eachObj);
      });
      //setTimeout(() => $(myTable).DataTable(), 1000);
    });
};

let rowCreator = (item, searchField) => {
  let regex = new RegExp(searchField, "i");
  let row = Object.values(item);

  if (item.Ingredient.search(regex) != -1) {
    return `<tr>${row.map((td) => `<td>${td}</td>`).join("")}</tr>`;
  }
};

searchBox.onkeyup = (e) => {
  let searchField = e.target.value;

  if (searchField === "") {
    tblBody.innerHTML = "";
    return;
  }

  let regex = new RegExp(searchField, "i");
  /*
    tblBody.innerHTML = json_array.map((value, index, array) => {
        if ((value.Ingredient.search(regex) != -1)) {
            return  `<tr><td>${value.Ingredient}</td><td>${value.Ingredient}</td></tr>`;
        }
    }).join("")
    */
  //tblBody.innerHTML = json_array.map(item=>rowCreator(item,searchField)).join("")

  tblBody.innerHTML = json_array
    .map((item) => {
      let row = Object.values(item);
      if (item.Ingredient.search(regex) != -1) {
        return `<tr>${row.map((td) => `<td>${td}</td>`).join("")}</tr>`;
      }
    })
    .join("");
};

window.onload = function () {
  loadData();
};
