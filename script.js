let allEpisodes = getAllEpisodes();
let input = document.getElementById("search");
let parent = document.querySelector("#episodeContainer");

function setup() {
 fetch("https://api.tvmaze.com/shows/5/episodes")
 .then(function (response) {
return response.json();
 })
 .then((data) => {
  makePageForEpisodes(data);
  createDropdown(data);
  console.log(data);
})
.catch((error) => console.log(error));
}



function makePageForEpisodes(episodeList) {
  for (let i = 0; i < episodeList.length; i++) {
    let card = createCard(episodeList[i]);
    parent.appendChild(card);
  }
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
title.innerText = `${episode.name} - ${formatEpisodeNum(episode.season, episode.number)}`;
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
return `S${season.toString().padStart(2, "0")}E${number.toString().padStart(2, "0")}`
}


// ------------- Search --------------------- only display episode that contain term.
 
input.addEventListener("keyup", function (e) {
  
  const term = e.target.value.toLowerCase();
  let episodes = document.querySelectorAll(".card");

  let newArrayOfEpisodes = Array.from(episodes);
  newArrayOfEpisodes.forEach(function(episode) {
    if (episode.innerText.toLowerCase().includes(term)) {
      episode.style.display = "block";
    } else {
      episode.style.display = "none";
    }
  });
  let filteredListOfEpisodes = newArrayOfEpisodes.filter((item) => item.style.display === "block");
  displayNumOfEpisodes(filteredListOfEpisodes);
});

function displayNumOfEpisodes (episodesDisplayed) {
let episodeNumDisplay = document.getElementById("numOfEpisodesDisplay");
episodeNumDisplay.innerText = `Displaying ${episodesDisplayed.length}/${allEpisodes.length} episodes`;
}

// ------------ Episode Selector -----------
let select = document.querySelector("#episodeList");


function createDropdown (allEpisodes) {
  for (let i = 0; i < allEpisodes.length; i++) {
        let optionTitle = document.createElement("option");
        select.appendChild(optionTitle); 
        optionTitle.innerText = `${formatEpisodeNum(allEpisodes[i].season, allEpisodes[i].number)} - ${allEpisodes[i].name}`;
       }
       selectAllEpisodes ()
}
    select.addEventListener("change", function (event) {
    let episodeOption = event.target.value;
    episodeOption = episodeOption.slice(0, 6);
    console.log(episodeOption);
    let episodes = document.querySelectorAll(".card");    

    Array.from(episodes).forEach(function(card) {
       if (!card.innerText.includes(episodeOption)) {
          card.style.display = "none";
        } else if (card.innerText.includes(episodeOption)) {
          card.style.display = "block";
        } 
    });
});

// let select = document.querySelector("#episodeList");
// //display list of elements when user clicks
// select.addEventListener("click", function () {
//   for (let i = 0; i < allEpisodes.length; i++) {
//     let createOption = document.createElement("option");

//     select.appendChild(createOption);
//     Option.value = `S0${allEpisodes[i].season}E0${allEpisodes[i].number} - ${allEpisodes[i].name}`;
//     createOption.innerText = Option.value;
//     // let episodeOption = document.querySelectorAll("#episodeList > option");
//    }
// })

// function selectAllEpisodes () {
  //   let optionTitle = document.createElement("option");
  //   select.appendChild(optionTitle); 
  //   optionTitle.innerText = "Select All episodes"
  // }

window.onload = setup;
