let wrapperContainer = document.querySelector(".wrapper-container");
let searchInput = document.querySelector(".search");
let selectInput = document.querySelector(".form-select");
let form = document.querySelector(".form");
let createFilmBtn = document.querySelector(".create-film-btn");
let filtredArrayGenres = [];
let inputImg = document.querySelector(".add-films-img");
let inputTitle = document.querySelector(".add-films-title");
let inputSubtitle = document.querySelector(".add-films-subtitle");

createFilmBtn.addEventListener("click", () => {
  wrapperContainer.innerHTML = "";
  let obj = {
    id: new Date(),
    title: inputTitle.value,
    poster: inputImg.value,
    overview: inputSubtitle.value,
    release_date: new Date(),
    genres: ["Adventure","Horror","Fantasy"],
  }
  films.unshift(obj);
  AddContentToPage(films);
})

searchInput.addEventListener("input", () => {
  let searchArray = [];
  wrapperContainer.innerHTML = "";
  films.forEach((film) => {
    if (film.title.toLowerCase().includes(searchInput.value)) {
      searchArray.push(film);
    }
  });
  AddContentToPage(searchArray);
});


function selectGenresRender(array) {
  array.forEach((element) => {
    element.genres.forEach((genre) => {
      if (!filtredArrayGenres.includes(genre)) {
        filtredArrayGenres.push(genre);
      }
    });
  });
  filtredArrayGenres.forEach((element) => {
    let option = document.createElement("option");
    option.value = element;
    option.textContent = element;
    selectInput.appendChild(option);
  });
}
selectGenresRender(films);

form.addEventListener("change", (evt) => {
  let filtredGenresNew = [];
  wrapperContainer.innerHTML = "";
  if (evt.target.value === "all") {
    filtredGenresNew = films;
  }else{
    films.forEach((film) => {
      film.genres.forEach((genre) => {
        if (evt.target.value === genre) {
          filtredGenresNew.push(film);
        }
      });
    });
  }
  searchInput.addEventListener("input", () => {
    let searchArray = [];
    wrapperContainer.innerHTML = "";
    filtredGenresNew.forEach((film) => {
      if (film.title.toLowerCase().includes(searchInput.value)) {
        searchArray.push(film);
      }
    });
    AddContentToPage(searchArray);
  });

  AddContentToPage(filtredGenresNew);
});
function AddContentToPage(array) {
  let documentFragment = document.createDocumentFragment();
  return array.forEach((element) => {
    let listGenre = document.createElement("ul");
    listGenre.setAttribute("class", "list-group");
    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card");
    let imgCard = document.createElement("img");
    imgCard.setAttribute("class", "card-img-top");
    imgCard.src = element.poster;
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    let cardTitle = document.createElement("div");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.innerHTML = element.title;
    let cardText = document.createElement("div");
    cardText.setAttribute("class", "card-text");
    cardText.innerHTML = element.overview;
    element.genres.forEach((genre) => {
      let li = document.createElement("li");
      li.setAttribute("class", "list-group-item");
      li.innerHTML = genre;
      li.addEventListener("click", () => {
        li.classList.toggle("active");
      });
      listGenre.appendChild(li);
    });
    cardDiv.appendChild(imgCard);
    cardDiv.appendChild(cardBody);
    cardDiv.appendChild(listGenre);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    documentFragment.appendChild(cardDiv);
    wrapperContainer.appendChild(documentFragment);
  });
}
AddContentToPage(films);
