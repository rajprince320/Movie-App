let searchBox = document.getElementById("search");
let container = document.getElementById("movie-list");
let loader = document.getElementById("loader");
let apiKey = "31f6d050";

async function loadMovies(searchInput, api) {
  check();
  let search = "indian";
  let apiKey = document.getElementById("api").value;
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${!api ? apiKey : api}&s=${
      !searchInput ? search : searchInput
    }`
  )
    .then(async (res) => {
      const data = await res.json();

      if (data.Response === "True") {
        for (let i = 0; i < data.Search.length; i++) {
          makeCard(data.Search[i], i);
        }
      } else {
        document.getElementById("loader").classList.remove("hide");
      }
    })
    .catch(() => {
      document.getElementById("error").classList.remove("hide");
    });
}
function check() {
  if (container !== null) {
    document.getElementById("loader").classList.add("hide");
  }
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
      <div class="movie-card" target="_blank" id="movie-card" onclick="location.href = 'https://www.imdb.com/title/${
        data.imdbID
      }'"
      }
      }" >
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
