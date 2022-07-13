

function makePageForShowsStart(showList) {
    //размещение серий из списка
    const rootElem = document.getElementById("root");
    rootElem.className = "showsStyle";
    rootElem.innerHTML = "";
    for (let show of showList) {
      rootElem.appendChild(makeShow(show));  
    }
    let searchEpisodes = document.getElementById("searchInputBlock");
    //searchEpisodes.innerHTML = "";
    searchEpisodes.className = "hiddenSearch";
    
  }

function makeShow(show) {//создает прямоугольник с одной серией (название, картинка, описание)
    let showElement = document.createElement('div');
    showElement.className = "showclass";
    showElement.id = show.id;
    //заголовок;
    let TitleShow = document.createElement('p');
    TitleShow.innerHTML = `${show.name}`;
    TitleShow.className = "titleshowClass";
    TitleShow.addEventListener('click', ()=>{
        let showid = show.id;
        makePageForSerial(showid);
    })
    showElement.appendChild(TitleShow);
    //картинка
    let containerShow = document.createElement("div");
    containerShow.className = "containerShow";
    let imageShow = new Image();
    if (show.image != null) {
      imageShow.src = show.image.medium;
    }
    
    imageShow.className = "imageShowClass";
    containerShow.appendChild(imageShow);
    
    //описание
    let summaryShow = document.createElement('p');
    summaryShow.innerHTML = show.summary;
    summaryShow.className = "summaryShow";
    containerShow.appendChild(summaryShow);

    //статистика
    let statisticShow = document.createElement('div');
    statisticShow.className = "statisticShow";
    let ratedShow = document.createElement("p");
    ratedShow.innerHTML = `rated: ${show.rating.average}`;
    let ganreShow = document.createElement("p");
    ganreShow.innerHTML = `Genres: ${show.genres.join(" | ")}`;
    let statusShow = document.createElement("p");
    statusShow.innerHTML = `Status: ${show.status}`;
    let runtimeShow = document.createElement("p");
    runtimeShow.innerHTML = `Runtime: ${show.runtime}`;

    statisticShow.appendChild(ratedShow);
    statisticShow.appendChild(ganreShow);
    statisticShow.appendChild(statusShow);
    statisticShow.appendChild(runtimeShow);
    containerShow.appendChild(statisticShow);

    showElement.appendChild(containerShow);

    return showElement;
}