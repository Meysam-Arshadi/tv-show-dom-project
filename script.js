// Fetch APIs and Setup Function:

async function fetchAllShows() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows");
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

async function fetchSeasons(showId) {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${showId}/seasons`
  );
  const data = await response.json();
  return data;
}

async function fetchAllEpisodes(showId) {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/shows/${showId}/episodes`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

let allShows;

async function setup() {
  allShows = await fetchAllShows();
  // const allEpisodes = await fetchAllEpisodes();
  displayAllShows(allShows);
  allShowsDropMenu(allShows);
  // displayEpisodesWithSearchBox(allEpisodes);
}

window.onload = setup;

//Global Scopes:
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

// Display All Shows at the Landing Page:
function displayAllShows(shows) {
  list.innerHTML = "";
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

// Display All Shows Drop Down Menu:
let selectShowValue;
let seasonAPI;

function allShowsDropMenu(shows) {
  showOptions.value = "all";
  showOptions.innerHTML = "All shows";
  selectShow.appendChild(showOptions);

  shows.forEach((show) => {
    const eachShowOption = document.createElement("option");
    eachShowOption.value = show.id;
    eachShowOption.innerHTML = `${show.name}`;
    selectShow.appendChild(eachShowOption);
  });

  selectShow.addEventListener("change", async () => {
    selectShowValue = selectShow.value;
    if (selectShowValue === "all") {
      displayAllShows(allShows);
    } else {
      seasonAPI = await fetchSeasons(selectShowValue);
      console.log(seasonAPI);
      console.log(typeof seasonAPI);
      // displayAllShows(selectedResult);

      displaySeasonsOfSelectedShow(seasonAPI);
    }
  });
}

function displaySeasonsOfSelectedShow(seasons) {
  list.innerHTML = "";
  seasons.forEach((season) => {
    let seasonCard = document.createElement("li");
    let seasonNumber = document.createElement("h3");
    let seasonImage = document.createElement("img");

    seasonNumber.innerHTML = `S ${season.number}`;
    if (season.image !== null) {
      seasonImage.src = season.image.medium;
    } else {
      seasonImage.src = "";
    }

    seasonCard.appendChild(seasonNumber);
    seasonCard.appendChild(seasonImage);
    list.appendChild(seasonCard);
  });
}

// Display All Episodes of One Season:
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

// Display All Episodes with Search Box Function:

function displayEpisodesWithSearchBox(episodes) {
  //Callback functions
  episodeDropMenu(episodes);
  // displayEpisodes(episodes);

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

// Drop Down Menu and Search Bar:

function episodeDropMenu(episodes) {
  episodeOptions.value = "All";
  episodeOptions.innerHTML = "All episodes";
  selectEpisode.appendChild(episodeOptions);

  episodes.forEach((episode) => {
    let episodeCode = `S ${("0" + episode.season).slice(-2)} E ${(
      "0" + episode.number
    ).slice(-2)}`;
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
