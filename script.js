// Setup function:

async function fetchAllShows() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows");
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

async function fetchAllEpisodes() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows/82/episodes");
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

async function setup() {
  const allShows = await fetchAllShows();
  const allEpisodes = await fetchAllEpisodes();
  displayAllShows(allShows);
  allShowsDropMenu(allShows);
  displayEpisodesWithSearchBox(allEpisodes);
}

window.onload = setup;

//Global scope:
const header = document.querySelector("#header");
const list = document.querySelector("#main-list");

const selectShow = document.querySelector("#show-selector");
const showOptions = document.querySelector("#show-option");

const selectEpisode = document.querySelector("#episode-selector");
const episodeOptions = document.querySelector("#episode-option");

// const allOptions = document.querySelector("option");

const searchInput = document.querySelector("#search-box");

const countSpan = document.querySelector("#count-span");

let count = 0;

// Show all shows at the landing page:
function displayAllShows(shows) {
  shows.forEach((show) => {
    let showCard = document.createElement("li");
    let showTitle = document.createElement("h3");
    let showImage = document.createElement("img");

    showTitle.innerHTML = `${show.name}`;
    showImage.src = show.image.medium;

    showCard.appendChild(showTitle);
    showCard.appendChild(showImage);
    list.appendChild(showCard);
  });
}

// Show Drop Menu:
function allShowsDropMenu(shows) {
  showOptions.value = "All";
  showOptions.innerHTML = "All shows";
  selectShow.appendChild(showOptions);

  shows.forEach((show) => {
    const eachShowOption = document.createElement("option");
    eachShowOption.value = show.id;
    eachShowOption.innerHTML = `${show.name}`;
    selectShow.appendChild(eachShowOption);
  });

  selectShow.addEventListener("change", () => {
    let newArray = [];
    if (selectShow.value === "All") {
      newArray = shows;
    } else {
      newArray = selectShow.filter((show) =>
        selectShow.value.includes(show.id)
      );
    }

    list.innerHTML = "";
    // displayAllShows(newArray);
    // countSpan.innerHTML = `Displaying ${newArray.length}/${episodes.length} episodes`;
  });
}

// Display show From Drop Down Menu:

// function displayShowFromDropMenu(shows) {
//   //Callback functions
//   allShowsDropMenu(shows);

//   selectedShow.addEventListener("change", (show) => {
//         let showCard = document.createElement("li");
//         let showTitle = document.createElement("h3");
//         let showImage = document.createElement("img");
//         let showSummery = document.createElement("p");

//         showTitle.innerHTML = `${show.name}`;
//         showImage.src = show.image.medium;
//         showSummery.innerHTML = show.summary;

//         showCard.appendChild(showTitle);
//         showCard.appendChild(showImage);
//         showCard.appendChild(showSummery);
//         list.appendChild(showCard);

//       }
//       };

// Show all episodes of one show at the landing page:
function displayEpisodes(episodes) {
  episodes.forEach((episode) => {
    let episodeCard = document.createElement("li");
    let episodeNumber = document.createElement("h3");
    let episodeTitle = document.createElement("h3");
    let episodeImage = document.createElement("img");
    let episodeSummery = document.createElement("p");
    let episodeCode = `S ${("0" + episode.season).slice(-2)} - E ${(
      "0" + episode.number
    ).slice(-2)}`;

    episodeNumber.innerHTML = `${episodeCode}`;
    episodeTitle.innerHTML = `${episode.name}`;
    episodeImage.src = episode.image.medium;
    episodeSummery.innerHTML = episode.summary;

    episodeCard.appendChild(episodeNumber);
    episodeCard.appendChild(episodeTitle);
    episodeCard.appendChild(episodeImage);
    episodeCard.appendChild(episodeSummery);
    list.appendChild(episodeCard);
    count++;
  });
}

// Display episodes with search box function:

function displayEpisodesWithSearchBox(episodes) {
  //Callback functions
  episodeDropMenu(episodes);
  displayEpisodes(episodes);

  countSpan.innerHTML = `Displaying ${count} / ${episodes.length} episodes`;

  searchInput.addEventListener("input", (e) => {
    const inputValue = e.target.value.toLowerCase();
    list.innerHTML = "";
    let count = 0;

    episodes.forEach((episode) => {
      if (
        episode.name.toLowerCase().includes(inputValue) ||
        episode.summary.toLowerCase().includes(inputValue)
      ) {
        let episodeCard = document.createElement("li");
        let episodeNumber = document.createElement("h3");
        let episodeTitle = document.createElement("h3");
        let episodeImage = document.createElement("img");
        let episodeSummery = document.createElement("p");
        let episodeCode = `S ${("0" + episode.season).slice(-2)} - E ${(
          "0" + episode.number
        ).slice(-2)}`;

        episodeNumber.innerHTML = `${episodeCode}`;
        episodeTitle.innerHTML = `${episode.name}`;
        episodeImage.src = episode.image.medium;
        episodeSummery.innerHTML = episode.summary;

        episodeCard.appendChild(episodeNumber);
        episodeCard.appendChild(episodeTitle);
        episodeCard.appendChild(episodeImage);
        episodeCard.appendChild(episodeSummery);
        list.appendChild(episodeCard);

        count++;
      }
    });
    countSpan.innerHTML = `Displaying ${count} / ${episodes.length} episodes`;
  });
}

// Drop menu and search bar:
function episodeDropMenu(episodes) {
  episodeOptions.value = "All";
  episodeOptions.innerHTML = "All episodes";
  selectEpisode.appendChild(episodeOptions);

  episodes.forEach((episode) => {
    let episodeCode = `S ${("0" + episode.season).slice(-2)} E ${(
      "0" + episode.number
    ).slice(-2)}`;
    console.log(episodeCode);
    const eachOption = document.createElement("option");
    eachOption.value = episode.id;
    eachOption.innerHTML = `${episodeCode} - ${episode.name}`;
    selectEpisode.appendChild(eachOption);
  });

  selectEpisode.addEventListener("change", () => {
    let newArray = [];
    if (selectEpisode.value === "All") {
      newArray = episodes;
    } else {
      newArray = selectEpisode.filter((episode) =>
        selectEpisode.value.includes(episode.id)
      );
    }

    list.innerHTML = "";
    displayEpisodes(newArray);
    countSpan.innerHTML = `Displaying ${newArray.length}/${episodes.length} episodes`;
  });
}
