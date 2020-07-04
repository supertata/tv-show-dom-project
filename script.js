let allEpisodes = getAllEpisodes();
let allShows = getAllShows();
let input = document.getElementById("search");
let parent = document.querySelector("#episodeContainer");
let episodeSelector = document.querySelector("#episodeList");
let showSelector = document.querySelector("#showList");

function setup() {
  fetch("https://api.tvmaze.com/shows/5/episodes")
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      makePageForEpisodes(data);
      // console.log(data);
    })
    .catch((error) => console.log(error));
}

function makePageForEpisodes(episodeList) {
  for (let i = 0; i < episodeList.length; i++) {
    let card = createCard(episodeList[i]);
    parent.appendChild(card);
  }
  createDropdown(episodeList);
  createShowDropdown(allShows);
  displayNumOfEpisodes(allEpisodes);
}

function createCard(episode) {
  card = document.createElement("div");
  card.className = "card";
  card.style.textAlign = "center";
  card.appendChild(createTitle(episode));
  card.appendChild(createImage(episode.image.medium));
  card.appendChild(createSummary(episode.summary));
  return card;
}

function createTitle(episode) {
  let title = document.createElement("h1");
  title.style.margin = "0 30px 40px 30px";
  title.style.fontSize = "x-large";
  title.innerText = `${episode.name} - ${formatEpisodeNum(
    episode.season,
    episode.number
  )}`;
  return title;
}

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

function formatEpisodeNum(season, number) {
  return `S${season.toString().padStart(2, "0")}E${number
    .toString()
    .padStart(2, "0")}`;
}

// ------------- Search --------------------- only display episodes that contain term.

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
  displayNumOfEpisodes(filteredListOfEpisodes);
});

// ------------ Display number of episodes --------------

function displayNumOfEpisodes(episodesDisplayed) {
  let episodeNumDisplay = document.getElementById("numOfEpisodesDisplay"); //display element
  episodeNumDisplay.innerText = `Displaying ${episodesDisplayed.length}/${allEpisodes.length} episodes`;
}

// ------------- Create Episode Dropdown on onload ------------

function createDropdown(allEpisodes) {
  episodeSelector.innerHTML = '';

  for (let i = 0; i < allEpisodes.length; i++) {
    let optionTitle = document.createElement("option");
    episodeSelector.appendChild(optionTitle);
    optionTitle.innerText = `${formatEpisodeNum(
      allEpisodes[i].season,
      allEpisodes[i].number
    )} - ${allEpisodes[i].name}`;
  }
}

// ------------- Create Show Dropdown on onload ------------

function createShowDropdown() {
  allShows.forEach((episode) => {
    let optionTitle = document.createElement("option");
    showSelector.appendChild(optionTitle);
    // optionTitle.innerText = `${episode.id}${episode.name}`;
    optionTitle.innerText = `${episode.name}`;
  });
}

// ------------ Episode Selector -----------------

episodeSelector.addEventListener("change", function (event) {  
 
  let episodeOption = event.target.value;
  episodeOption = episodeOption.slice(0, 6);
  let episodes = document.querySelectorAll(".card");

  let newArrayOfEpisodes = Array.from(episodes);
  newArrayOfEpisodes.forEach(function (card) {
    if (!card.innerText.includes(episodeOption)) {
      card.style.display = "none";
    } else if (card.innerText.includes(episodeOption)) {
      card.style.display = "block";
    }
  });
  let filteredListOfEpisodes = newArrayOfEpisodes.filter(
    (item) => item.style.display === "block"
  );
  displayNumOfEpisodes(filteredListOfEpisodes);
});

// ------------- TV Show ID Not in use at the moment --------------

function getTVShowID () {

  
  let episodeID = allShows.forEach((episode) => {
  console.log(episode.id, episode.name)
  return episodeID 
})
}

//------------------TV Show Selector Not fully working ----------------------------

// function selectShowsToGetEpisodes () {
  showSelector.addEventListener("change", function (event) {
    parent.innerHTML = '';
    let showSelected = event.target.value; //name of TV Show
    
    console.log(showSelected);
    const selectedShow = getAllShows().filter((item) => {
    return (
      item.name === showSelected);
  });

  let showID = selectedShow[0].id;
  if (showID == "none") {
    setup();
  } else {
  fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
  .then(function (response) {
    return response.json();
  })
   .then((results) => {
     console.log(results);
     makePageForEpisodes(results);
     createDropdown(results);
   })
   .catch((error) => console.log(error));
  }
  
  });

// ----------------- Show all Episodes button ------------------------

let allEpisodesButton = document.getElementById("showAllEpisodes");

allEpisodesButton.addEventListener("click", setup);

window.onload = setup;
