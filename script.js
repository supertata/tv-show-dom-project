// const allEpisodes = getAllEpisodes();

let allEpisodes = getAllEpisodes();


function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  let parent = document.querySelector("#episodeContainer");
  for (let i = 0; i < episodeList.length; i++) {
    //for each episode
    let episode = document.createElement("div");
    let title = document.createElement("h1");
    let image = document.createElement("img");
    let summary = document.createElement("p");

    image.setAttribute("src", episodeList[i].image.medium);

    parent.appendChild(episode);
    episode.appendChild(title);
    episode.appendChild(image);
    episode.appendChild(summary);

    episode.className = "card";
    episode.style.textAlign = "center";
    title.style.margin = "0 30px 40px 30px";
    title.style.fontSize = "x-large";

    summary.style.margin = "30px 30px 20px 30px";
    summary.style.textAlign = "justify";

    //display title
    if (episodeList[i].number < 10) {
      title.innerText = `${episodeList[i].name} - S0${episodeList[i].season}0${episodeList[i].number}`;
    } else {
      title.innerText = `${episodeList[i].name} - S0${episodeList[i].season} ${episodeList[i].number}`;
    }

    //remove p and br tags
    let string = episodeList[i].summary;
    let replaced = string.replace(/(<p>)|(<br>)|(<\/p>)/gm, "");
    summary.innerText = replaced;

  }
}

// ------------- Search ---------------------

let input = document.getElementById("search");
input.addEventListener("keyup", function (e) {
  const term = e.target.value.toLowerCase();
  let displayNumOfEpisodes = document.getElementById("numOfEpisodeDisplayed");
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
  displayNumOfEpisodes.innerText = `Displaying ${filteredListOfEpisodes.length}/${newArrayOfEpisodes.length} episodes`;
});

window.onload = setup;