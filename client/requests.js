const BASE_API_URL = "http://localhost:8001";
const xhr = new XMLHttpRequest();

const fetchCars = () => {
  xhr.open("GET", `${BASE_API_URL}/getCars`, false);
  xhr.send();
  if (xhr.status == 200) {
    return JSON.parse(xhr.response);
  } else {
    return "Could not get cars";
  }
};

const fetchSellCar = (data) => {
  xhr.open("POST", `${BASE_API_URL}/sellCar`, true);
  xhr.onload = () => {
    if (xhr.status == 200) {
      console.log("success");
    } else {
      console.log("failed");
    }
  };
  xhr.setRequestHeader("Content-type", "application/json");
  const parsedData = JSON.stringify(data);
  xhr.send(parsedData);
};

const fetchSaveCar = (data) => {
  xhr.open("POST", `${BASE_API_URL}/saveCar`);
  xhr.onload = () => {
    if (xhr.status == 200) {
      console.log("success");
    } else {
      console.log("failed");
    }
  };
  xhr.setRequestHeader("Content-type", "application/json");
  const parsedData = JSON.stringify(data);
  xhr.send(parsedData);
};
