window.onload = function () {
  const houseRadio = document.getElementById("house");
  const apartmentRadio = document.getElementById("apartment");

  houseRadio.addEventListener("change", function () {
    toggleAddress("house");
  });

  apartmentRadio.addEventListener("change", function () {
    toggleAddress("apartment");
  });
};

function toggleAddress(type) {
  const houseFields = document.getElementById("houseFields");
  const apartmentFields = document.getElementById("apartmentFields");

  if (type === "house") {
    houseFields.classList.remove("hidden");
    apartmentFields.classList.add("hidden");
  } else if (type === "apartment") {
    apartmentFields.classList.remove("hidden");
    houseFields.classList.add("hidden");
  }
}
