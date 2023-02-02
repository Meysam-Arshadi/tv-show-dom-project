//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
window.onload = setup;

// const rootElem = document.getElementById("root");

function makePageForEpisodes(episodeList) {
  episodeList.forEach((episode) => {
    let episodeCard = document.createElement("div");
    episodeCard.setAttribute("id", "episode-card");

    let episodeNumber = document.createElement("p");
    episodeNumber.innerHTML = `S0${episode.season}E0${episode.number}`;
    episodeNumber.setAttribute("id", "episode-number");

    let episodeTitle = document.createElement("h3");
    episodeTitle.innerHTML = `${episode.name}`;
    episodeTitle.setAttribute("id", "episode-title");

    let titleContainer = document.createElement("div");
    titleContainer.setAttribute("id", "title-container");
    titleContainer.appendChild(episodeNumber);
    titleContainer.appendChild(episodeTitle);
    episodeCard.appendChild(titleContainer);

    let episodeImage = document.createElement("img");
    episodeImage.src = episode.image.medium;
    episodeImage.setAttribute("id", "episode-img");
    episodeCard.appendChild(episodeImage);

    let episodeSummery = document.createElement("p");
    episodeSummery.innerHTML = episode.summary;
    episodeCard.appendChild(episodeSummery);

    document.querySelector("#root").appendChild(episodeCard);
  });
}
