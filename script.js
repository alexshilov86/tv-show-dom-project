//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  for (let episode of episodeList) {
    rootElem.appendChild(makeEpisode(episode));  
  }

  //rootElem.appendChild(makeEpisode(episodeList[0]));
  //rootElem.appendChild(makeEpisode(episodeList[1]));
  //rootElem.appendChild(makeEpisode(episodeList[2]));
  //makeEpisode(rootElem, episodeList[0]);
}

function makeEpisode(episode) {
    let episodeElement = document.createElement('div');
    episodeElement.className = "episodeclass";
    //заголовок;
    let TitleEpisode = document.createElement('p');
    let TitleEpisodeRef = document.createElement('a');
    TitleEpisodeRef.innerHTML = `${episode.name} - ${formatEpisodeNumber(episode.season, episode.number)}!`;
    TitleEpisodeRef.href = episode.url;
    TitleEpisode.className = "titleepisodeClass";
    TitleEpisode.appendChild(TitleEpisodeRef);
    episodeElement.appendChild(TitleEpisode);
    //картинка
    let imageEpisode = new Image(280, 200);
    imageEpisode.src = episode.image.original;
    imageEpisode.className = "imageEpisodeClass";
    episodeElement.appendChild(imageEpisode);
    //описание
    let summaryEpisode = document.createElement('p');
    summaryEpisode.innerHTML = episode.summary;
    summaryEpisode.className = "summaryEpisodeClass";
    episodeElement.appendChild(summaryEpisode);
    return episodeElement;
}

function formatEpisodeNumber(season, episodeNumber) {
  let seasonFormat = season<10 ? `0${season}` : `${season}`;
  let episodeFormat = episodeNumber<10 ? `0${episodeNumber}` : `${episodeNumber}`;
  return `S${seasonFormat}E${episodeFormat}`;
}
window.onload = setup;
