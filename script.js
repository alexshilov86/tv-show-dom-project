//You can edit ALL of the code here
function setup() {
  makePageForSerial(179);
}

function makePageForSerial(serialId) {
  let url = `https://api.tvmaze.com/shows/${serialId}/episodes`;
  fetch(url)
    .then((response) => {return(response.json())})
    .then((data) => {
      let allEpisodes = data; 
      //вывод эпизодов из списка allEpisodes
      makePageForEpisodes(allEpisodes); //вывод серий на страницу
      makeSelectMenu(allEpisodes);      //создание меню для выбора
      makeLiveSearch(allEpisodes);      //создание поиска слов
    });
}

function makeLiveSearch(allEpisodes){
  //создание live search
  let searchEpisodes = document.getElementById("searchEpisodesInput");
  searchEpisodes.addEventListener("keyup", ()=>{
    let textToFind = searchEpisodes.value.toLowerCase();
    let findEpisodes = allEpisodes.filter((e) => {
       if (!e.summary) {return (e.name.toLowerCase().includes(textToFind))}
       else {return (e.name.toLowerCase().includes(textToFind) || e.summary.toLowerCase().includes(textToFind))}
       });
    let findStatElem = document.getElementById("findStat");
    findStatElem.innerHTML = `Displaying ${findEpisodes.length} / ${allEpisodes.length} episodes`;
    if (textToFind == "") findStatElem.innerHTML = "";
    makePageForEpisodes(findEpisodes);
  })
}

function makeSelectMenu(allEpisodes){
  //создание элемента select
  let selectEpisode = document.getElementById("selectepisode");
  for (let episode of allEpisodes) {
    let optionElement = document.createElement("option");
    optionElement.value = episode.id;
    optionElement.innerHTML= `${formatEpisodeNumber(episode.season, episode.number)} - ${episode.name}`;
    selectEpisode.appendChild(optionElement);
  }
  selectEpisode.onchange = ()=>{
    let showElement = document.getElementById(selectEpisode.value);
    showElement.scrollIntoView();
  };
}

function makePageForEpisodes(episodeList) {
  //размещение серий из списка
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  for (let episode of episodeList) {
    rootElem.appendChild(makeEpisode(episode));  
  }
}

function makeEpisode(episode) {
    let episodeElement = document.createElement('div');
    episodeElement.className = "episodeclass";
    episodeElement.id = episode.id;
    //заголовок;
    let TitleEpisode = document.createElement('p');
    let TitleEpisodeRef = document.createElement('a');
    TitleEpisodeRef.innerHTML = `${episode.name} - ${formatEpisodeNumber(episode.season, episode.number)}!`;
    TitleEpisodeRef.href = episode.url;
    TitleEpisode.className = "titleepisodeClass";
    TitleEpisode.appendChild(TitleEpisodeRef);
    episodeElement.appendChild(TitleEpisode);
    //картинка
    let imageEpisode = new Image(360, 200);
    if (episode.image != null) {
      imageEpisode.src = episode.image.original;
    }
    
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
  let seasonFormat = season<100 ? `0${season}` : `${season}`;
  let episodeFormat = episodeNumber<100 ? `0${episodeNumber}` : `${episodeNumber}`;
  return `S${seasonFormat}E${episodeFormat}`;
}
window.onload = setup;
