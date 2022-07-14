function setup() {
  let shows = getAllShows();
  makePageForShowsStart(shows); //заполнение rootshows
}


function makePageForShowsStart(showList) {
    //размещение серий из списка
    const rootElem = document.getElementById("rootshows");
    rootElem.innerHTML = "";
    for (let show of showList) {
      rootElem.appendChild(makeShow(show));  
    }
  }

function sortListByName(list) {
    let sortedList = list.map(e => e.name + e.id).sort();
    let ans = [];
    sortedList.forEach((e) => {ans.push(list.filter(a => (a.name + a.id == e))[0])
    })
    return ans;
  }

function makeShow(show) {//создает прямоугольник с одной серией (название, картинка, описание)
    let showElement = document.createElement('div');
    showElement.className = "showclass";
    showElement.id = show.id;
    //заголовок;
    let TitleShow = document.createElement('p');
    let titleShowRef = document.createElement("a");
    titleShowRef.href = `pageEpisodes.html?${show.id}`;
    titleShowRef.innerHTML = `${show.name}`;
    TitleShow.appendChild(titleShowRef);
    TitleShow.className = "titleshowClass";

    TitleShow.addEventListener('click', ()=>{
        //makePageForSerial(showid);
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
window.onload = setup;