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

  let parent = document.querySelector("#episodeContainer");
  for (let i = 0; i < episodeList.length; i++) {
    //pour chaque episode
    let episode = document.createElement("div"); //cree un element div
    let title = document.createElement("h1");
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

    summary.style.margin = "30px 30px 20px 30px";
    summary.style.textAlign = "justify";
    summary.innerText = episodeList[i].summary;
    // let newVar = addAZero()
    // title.textContent = `${episodeList[i].name} - S0${episodeList[i].season}E${newVar}`;
    summary.textContent = `${episodeList[i].summary}`;
    
    addAZero(allEpisodes)
    function addAZero(episodeList) {
      for (let i=0; i < episodeList.length; i++) {
          let episodeNumber = (episodeList[i].number).toString()
        if (episodeNumber < 10) {
          episodeNumber = `0${episodeNumber}`;
          title.textContent = `${episodeList[i].name} - S0${episodeList[i].season}E${episodeList[i].episodeNumber}`;
        }
        return episodeNumber;
      }
      }
      
    
  }
}

window.onload = setup;
const allEpisodes = getAllEpisodes();


//function works in console 
//- remove p and br tags from summary property. 

function removePtag (episodeList) {
  for (i=0; i < episodeList.length; i++) {
  let string = (episodeList[i].summary);
  let replaced = string.replace(/(<p>)|(<br>)|(<\/p>)/gm,"");
  console.log(replaced)
}
}

// removePtag(allEpisodes)

//function works in console 
//- add a zera to episode number under 10


function addAZero(episodeList) {
for (let i=0; i < episodeList.length; i++) {
    let episodeNumber = (episodeList[i].number).toString()
  if (episodeNumber < 10) {
    episodeNumber = `0${episodeNumber}`;
  }
  return episodeNumber;
}
}

// addAZero(allEpisodes)



