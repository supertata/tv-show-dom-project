let allEpisodes;
let allShows = getAllShows();
let input = document.getElementById("search");
let parent = document.querySelector("#episodeContainer");
let episodeSelector = document.querySelector("#episodeList");
let showSelector = document.querySelector("#showList");

//---------------- Set-up Page Display Shows---------------

function setup() {
  makePageForShows(allShows);
  displayNumOfShows(allShows.length, allShows.length);
}

function makePageForShows(allShows) {
  parent.innerHTML = "";
  sortNameAlphabetically(allShows);
  showSelector.style.display = "block";
  episodeSelector.style.display = "none";
  for (let i = 0; i < allShows.length; i++) {
    let card = createCardForShows(allShows[i]);
    parent.appendChild(card);
  }
  createShowDropdown(allShows);
}

function createCardForShows(show) {
  showCard = document.createElement("div");
  showCard.className = "card";
  showCard.style.textAlign = "center";
  showCard.id = show.id;
  showCard.appendChild(createTitleForShow(show));
  let showCardImage;
  if (show.image) {
    showCardImage = createImage(show.image.medium);
  } else {
    showCardImage = createImage(
      "https://cdn.hswstatic.com/gif/simpsons-31.jpg"
    );
  }
  showCard.append(
    showCardImage,
    createSummary(show.summary),
    createExtraInfoForShows(show)
  );
  return showCard;
}

function createTitleForShow(show) {
  let title = document.createElement("h1");
  title.className = "titles";
  title.innerText = `${show.name}`;
  return title;
}

function createExtraInfoForShows(show) {
  const extraInfoForShow = document.createElement("div");
  extraInfoForShow.className = "showExtraInfoCard";
  extraInfoForShow.innerHTML = `<p>Genres: ${show.genres}</p>
  <p>Status: ${show.status}</p>
  <p>Rating: ${show.rating.average}</p>
  <p>Runtime: ${show.runtime}</p>`;
  showCard.appendChild(extraInfoForShow);
  return extraInfoForShow;
}

// ------------- Create Show Dropdown on onload ------------

function sortNameAlphabetically(array) {
  array.sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });
}

function createShowDropdown(allShows) {
  createSelectAllShowsOption();
  allShows.forEach((show) => {
    let optionForShowTitle = document.createElement("option");
    showSelector.appendChild(optionForShowTitle);
    optionForShowTitle.innerText = `${show.name}`;
  });
}

function createSelectAllShowsOption() {
  let optionTitle = document.createElement("option");
  showSelector.appendChild(optionTitle);
  optionTitle.innerText = "Select All Shows";
}

//------------------TV Show Selector ----------------------------

showSelector.addEventListener("change", function (event) {
  parent.innerHTML = "";
  episodeSelector.style.display = "block";
  let showSelected = event.target.value;
  if (showSelected == "Select All Shows") {
    makePageForShows(allShows);
  } else {
    const selectedShow = getAllShows().filter((item) => {
      return item.name === showSelected;
    });

    let showID = selectedShow[0].id;
    fetchEpisodeData(showID);
  }
});

function fetchEpisodeData(showID) {
  fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
    .then(function (response) {
      return response.json();
    })
    .then((results) => {
      allEpisodes = results;
      makePageForEpisodes(results);
      createDropdown(results);
      displayNumOfEpisodes(results.length, results.length);
      //  hideShowSelector();
    })
    .catch((error) => console.log(error));
}

function hideShowSelector() {
  showSelector.style.display = "none";
}

//------------------Display Episode Page  -----------

function makePageForEpisodes(episodeList) {
  parent.innerHTML = "";
  for (let i = 0; i < episodeList.length; i++) {
    let card = createCardForEpisodes(episodeList[i]);
    parent.appendChild(card);
  }
  displayNumOfEpisodes(episodeList.length, allEpisodes.length);
}

function createCardForEpisodes(episode) {
  card = document.createElement("div");
  card.className = "card";
  card.style.textAlign = "center";
  card.appendChild(createTitleEpisode(episode));
  let episodeCardImage;
  if (episode.image) {
    episodeCardImage = createImage(episode.image.medium);
  } else {
    episodeCardImage = createImage(
      "https://cdn.hswstatic.com/gif/simpsons-31.jpg"
    );
  }
  card.appendChild(episodeCardImage);
  card.appendChild(createSummary(episode.summary));
  return card;
}

function createTitleEpisode(episode) {
  let title = document.createElement("h1");
  // title.style.margin = "0 30px 40px 30px";
  // title.style.fontSize = "x-large";
  title.className = "titles";
  title.innerText = `${episode.name} - ${formatEpisodeNum(
    episode.season,
    episode.number
  )}`;
  return title;
}

function formatEpisodeNum(season, number) {
  return `S${season.toString().padStart(2, "0")}E${number
    .toString()
    .padStart(2, "0")}`;
}

// ------------- create episode and show Page  ---------------

function createSummary(summary) {
  let summaryElement = document.createElement("p");
  summaryElement.style.margin = "30px 30px 20px 30px";
  summaryElement.style.textAlign = "justify";
  summaryElement.innerHTML = summary;
  return summaryElement;
}

function createImage(imageSrc) {
  let imageElement = document.createElement("img");
  imageElement.src = imageSrc;
  return imageElement;
}

// ------------- Create Episode Dropdown on onload ------------

function createDropdown(allEpisodes) {
  episodeSelector.innerHTML = "";
  createSelectAllEpisodesOption();
  for (let i = 0; i < allEpisodes.length; i++) {
    let optionTitle = document.createElement("option");
    episodeSelector.appendChild(optionTitle);
    optionTitle.innerText = `${formatEpisodeNum(
      allEpisodes[i].season,
      allEpisodes[i].number
    )} - ${allEpisodes[i].name}`;
    optionTitle.value = allEpisodes[i].id;
  }
}

function createSelectAllEpisodesOption() {
  let optionTitle = document.createElement("option");
  episodeSelector.appendChild(optionTitle);
  optionTitle.innerText = "Select All Episodes";
}

// ------------ Episode Selector -----------------

episodeSelector.addEventListener("change", function (event) {
  let episodeOption = event.target.value;
  if (episodeOption == "Select All Episodes") {
    makePageForEpisodes(allEpisodes);
  } else {
    let selectedEpisode = allEpisodes.filter(
      (episode) => episode.id == episodeOption
    );
    makePageForEpisodes(selectedEpisode);
  }
});

// ------------- Search bar  ---------------------

input.addEventListener("keyup", function (e) {
  const term = e.target.value.toLowerCase();
  let episodes = document.querySelectorAll(".card");
  let newArrayOfEpisodes = Array.from(episodes);
  newArrayOfEpisodes.forEach(function (episode) {
    if (episode.innerText.toLowerCase().includes(term)) {
      episode.style.display = "block";
    } else {
      episode.style.display = "none";
    }
  });
  let filteredListOfEpisodes = newArrayOfEpisodes.filter(
    (item) => item.style.display === "block"
  );
  if (newArrayOfEpisodes[0].id != "") {
    displayNumOfShows(filteredListOfEpisodes.length, newArrayOfEpisodes.length);
  } else {
    displayNumOfEpisodes(
      filteredListOfEpisodes.length,
      newArrayOfEpisodes.length
    );
  }
});

// ------------ Display number of episodes and shows --------------

function displayNumOfEpisodes(episodesDisplayed, allItems) {
  let episodeNumDisplay = document.getElementById("numOfEpisodesDisplay");
  episodeNumDisplay.innerText = `Displaying ${episodesDisplayed}/${allItems} episodes`;
}

function displayNumOfShows(showsDisplayed, allShows) {
  let episodeNumDisplay = document.getElementById("numOfEpisodesDisplay");
  episodeNumDisplay.innerText = `Displaying ${showsDisplayed}/${allShows} shows`;
}

//------------------- Show all shows button ------------------------

let allShowsButton = document.getElementById("showAllShows");

allShowsButton.addEventListener("click", setup);

window.onload = setup;
