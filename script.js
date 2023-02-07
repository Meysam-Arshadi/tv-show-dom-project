// Setup function:
function setup() {
  const allEpisodes = async function getAllEpisodesFromAPI() {
    try {
      let response = await fetch(
        "https://www.tvmaze.com/api#show-episode-list"
      );
      let data = await response.json();
      return data;
    } catch (err) {
      console.log("Error");
    }
  };
  displayEpisodesWithSearchBox(allEpisodes);
}

window.onload = setup;

//Global scope:
const header = document.querySelector("#header");

let list = document.createElement("ul");
document.querySelector("#root").appendChild(list);

const select = document.createElement("select");
header.appendChild(select);

const allOptions = document.createElement("option");

const searchInput = document.createElement("input");
searchInput.setAttribute("id", "search-box");
searchInput.type = "text";
searchInput.placeholder = "search";
header.appendChild(searchInput);

const countSpan = document.createElement("span");
countSpan.setAttribute("id", "count-span");
header.appendChild(countSpan);

let count = 0;

// Make Page For Episodes function:
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
  displayDropBox(episodes);
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

// Dropbox and search bar:

function displayDropBox(episodes) {
  allOptions.value = "All";
  allOptions.innerHTML = "All episodes";
  select.appendChild(allOptions);

  episodes.forEach((episode) => {
    let episodeCode = `S ${("0" + episode.season).slice(-2)} E ${(
      "0" + episode.number
    ).slice(-2)}`;

    const eachOption = document.createElement("option");
    eachOption.value = episode.id;
    eachOption.innerHTML = `${episodeCode} - ${episode.name}`;
    select.appendChild(eachOption);
  });

  select.addEventListener("change", () => {
    let newArray = [];
    if (select.value === "All") {
      newArray = episodes;
    } else {
      newArray = episodes.filter((episode) =>
        select.value.includes(episode.id)
      );
    }

    list.innerHTML = "";
    displayEpisodes(newArray);
    countSpan.innerHTML = `Displaying ${newArray.length}/${episodes.length} episodes`;
  });
}
