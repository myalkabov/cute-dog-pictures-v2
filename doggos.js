const DOG_URL = "https://dog.ceo/api/breeds/image/random";
const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const LOADING_SRC = "../project3/thumb.png";

const doggos = document.querySelector(".doggos");
const select = document.querySelector(".breed-select");

fetch(BREEDS_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    for (const breed in data.message) {
      const option = document.createElement("option");
      option.value = breed;
      option.innerText = breed[0].toUpperCase() + breed.slice(1);
      select.appendChild(option);
    }
  });

select.addEventListener("change", function(event) {
  const img = document.createElement("img");
  img.src = LOADING_SRC;
  img.alt = "Loading thumb";
  doggos.appendChild(img);

  fetch(`https://dog.ceo/api/breed/${event.target.value}/images/random`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      img.src = data.message;
      img.alt = "Cute doggo";
    });
});

function addNewDoggo() {
  const promise = fetch(DOG_URL);
  const img = document.createElement("img");
  img.src = LOADING_SRC;
  img.alt = "Loading thumb";
  doggos.appendChild(img);

  promise
    .then(function(response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function(processedResponse) {
      img.src = processedResponse.message;
      img.alt = "Cute doggo";
    });
}

document.querySelector(".add-doggo").addEventListener("click", addNewDoggo);
