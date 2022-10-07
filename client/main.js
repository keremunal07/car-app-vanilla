//variables
let cars = fetchCars();
let filteredCars;
let plateFilter;
let categoryFilter;
let brandFilter;
let globalFilter;

// maintanable render table function
const renderCarsTable = (cars) => {
  const table = document.querySelector("#car-table tbody");
  let tableItems = "";
  const sortedCars = cars.sort((a, b) =>
    a.brand.toLowerCase() > b.brand.toLowerCase() ? 1 : -1
  );
  sortedCars.forEach((c) => {
    tableItems += `<tr>
          <td>${c.categories}</td>
          <td>${c.brand}</td>
          <td>${c.series}</td>
          <td>${c.year}</td>
          <td>${c.color}</td>
          <td>${c.km}</td>
          <td>${c.engineCapacity}</td>
          <td>${c.plate}</td>
          <td class='d-flex justify-content-center'>
              <button onClick="handleSellCar('${c.plate}')" class='btn btn-danger'>Sell Car</button> 
          </td>
      <tr />`;
  });

  table.innerHTML = tableItems;
};
// render first table on dom loaded
window.addEventListener("DOMContentLoaded", renderCarsTable(cars), false);

// refetching cars
const refetchCars = () => {
  cars = fetchCars();
  renderCarsTable(cars);
};

//handle car save
const saveCarForm = document.querySelector("#save-car-form");
saveCarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  fetchSaveCar(data);
  addCarModal.hide();
  setTimeout(() => {
    refetchCars();
    handleFilter();
  }, 200);
});

//handle car sell
const handleSellCar = (plate) => {
  fetchSellCar({ plate });
  setTimeout(() => {
    refetchCars();
    handleFilter();
  }, 200);
};

//handle modal
const addCarModal = new bootstrap.Modal(
  document.getElementById("addCarModal"),
  {
    keyboard: false,
  }
);

const handleAddCarModal = () => {
  addCarModal.show();
};

//FILTERS
//filter functions
const handleFilter = () => {
  filteredCars = cars.filter(
    (c) =>
      c.plate.includes(plateFilter ? plateFilter.toUpperCase() : "") &&
      c.brand
        .toLowerCase()
        .includes(brandFilter ? brandFilter.toLowerCase() : "") &&
      c.categories.includes(categoryFilter || "") &&
      (globalFilter
        ? Object.values(c).includes(globalFilter || "")
        : c.plate.includes(""))
  );

  renderCarsTable(filteredCars);
};

//on filter change handlers
const onPlateFilterChange = (value) => {
  plateFilter = value;
  handleFilter();
};

const onBrandFilterChange = (value) => {
  brandFilter = value;
  handleFilter();
};

const onCategoryFilterChange = (value) => {
  categoryFilter = value;
  handleFilter();
};

const onGlobalFilterChange = (value) => {
  globalFilter = value;
  console.log(value);
  handleFilter();
};

//filter listeners
const plateInput = document.getElementById("plateFilterInput");
const brandInput = document.getElementById("brandFilterInput");
const categoryInput = document.getElementById("categorySelector");
const globalInput = document.getElementById("globalFilterInput");

plateInput.addEventListener("input", (e) =>
  onPlateFilterChange(e.target.value)
);
brandInput.addEventListener("input", (e) =>
  onBrandFilterChange(e.target.value)
);
categoryInput.addEventListener("input", (e) =>
  onCategoryFilterChange(e.target.value)
);
//I also added a global search because I could not fully understand what is requested in the case.
globalInput.addEventListener("input", (e) =>
  onGlobalFilterChange(e.target.value)
);
