// You can edit ALL of the code here
// function setup() {
//   const allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
// }

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

function setup() {
  const allEpisodes = getAllEpisodes();
  // removePtag (allEpisodes);
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {

  let parent = document.querySelector("#episodeContainer");
  for (let i = 0; i < episodeList.length; i++) {
    //pour chaque episode
    let episode = document.createElement("div"); //cree un element div
    let title = document.createElement("p");
    let image = document.createElement("img");
    let summary = document.createElement("p");

    image.setAttribute('src', episodeList[i].image.medium);

    parent.appendChild(episode);
    episode.appendChild(title);
    episode.appendChild(image);
    episode.appendChild(summary);

    episode.style.textAlign = "center";
    title.style.margin = "0 30px 40px 30px";
    title.style.fontSize = "x-large";
    // image.style.width = "100%";
    // image.style.height = auto;

    summary.style.margin = "30px 30px 20px 30px";
    summary.style.textAlign = "justify";

    title.textContent = `${episodeList[i].name} - S0${episodeList[i].season}E0${episodeList[i].number}`;
    summary.textContent = `${episodeList[i].summary}`;
    
  }
}


window.onload = setup;





