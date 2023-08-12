let searchBox = document.getElementById("search");
let container = document.getElementById("movie-list");
let loader = document.getElementById("loader");
let apiKey = "31f6d050";

async function loadMovies(searchInput, api) {
  let search = "bollywood";
  let apiKey = document.getElementById("api").value;
  const res = await fetch(
    `http://www.omdbapi.com/?i=tt3896198&page=1&apikey=${
      !api ? apiKey : api
    }&s=${!searchInput ? search : searchInput}`
  )
    .then(async (res) => {
      const data = await res.json();

      for (let i = 0; i < data.Search.length; i++) {
        makeCard(data.Search[i], i);
      }
    })
    .catch((err) => {
      //   alert(err);
      document.getElementById("loader").classList.remove("hide");
    });
}

function findMovies() {
  let search = searchBox.value;
  let apiKey = document.getElementById("api").value;
  document.getElementById("error").classList.add("hide");
  if (search.length > 0) {
    container.innerHTML = null;

    loadMovies(search, apiKey);
    if (container !== null)
      document.getElementById("loader").classList.add("hide");
  }
}
function makeCard(data, i) {
  const card = document.createElement("div");
  card.className = "movie-card";
  let myCard = `
      <div class="movie-card" id="movie-card">
        <img
          src="${
            data.Poster === "N/A"
              ? `https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg`
              : data.Poster
          }"
          alt="Poster"
        />
        <div class="name">
          <div class="index">${i + 1}</div>
          <div class="title">${data.Title}</div>
        </div>
      </div>`;
  card.innerHTML = myCard;
  container.appendChild(card);
}
