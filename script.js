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
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  
  for (i=0; i < episodeList.length; i++) {   //pour chaque episode
    let episode = document.createElement("div"); //cree un element div
    document.querySelector("#episodeContainer").appendChild(episode);  //append the div to the wrapper div
    // episode.textContent = `${episode[i].name}` //
    episode.textContent = `${episodeList[i].name} - S0${episodeList[i].season}0${episodeList[i].number}
    ${episodeList[i].summary}`;
}
}


window.onload = setup;

// episode.id = `episode${1 + i}`; //set the id of the episode divs from 0 to .length
    // let episodeImage = document.createElement("img"); //cree un element img
    // document.getElementById("#episodeContainer").appendChild(episodeImage); //append img to episode
    // episodeImage.src = episodeList[i].image.medium; //set the source of the img tag 




