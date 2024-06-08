///////////////////////////////Convert section - processing//////////////////////////////////////////////////

const injected = 
///////////////////////////////Open Section - inhtml//////////////////////////////////////////////////


function dButton(showOrHide) {
    var URLButton = document.querySelector('.dbt');
    var OpenButton = document.querySelector('#obt');
    if (atGlobal.dbt && !atGlobal.obt) {
        if (showOrHide) {//download button hide
            URLButton.style.display = "none";
            atGlobal.connect = showOrHide;
        }
        else {//download button show
            if (atGlobal.index < 2) { atGlobal.index++ }
            OpenButton.style.display = "none";
            URLButton.style.display = "block";
            atGlobal.connect = showOrHide;
            if (atGlobal.index < 2) { mksure(1); }
        }
    }
    else if (!atGlobal.dbt && atGlobal.obt) {
        if (showOrHide) {//open button
            OpenButton.style.display = "none";
        }
        else {
            URLButton.style.display = "none";
            OpenButton.style.display = "block";
        }
    }
}

function downloadbutton() {
    var URLButtonText = "download?URL=" + document.querySelector('#URLText').value;
    // console.log(URLButtonText)
    // console.log(URLButtonText);
    if (URLButtonText != "") {
        var i = "index";
        download(URLButtonText, i);
    }

}
function downloadbutton2(i) {
    var URLButtonText = 'download?URL=https://www.youtube.com/watch?v=' + youtubeDt.videoID[i];
    // console.log(URLButtonText)
    var i = "index";
    download(URLButtonText, i);
}
///////////////////////////////Show Loading//////////////////////////////////////////////////
function showloading() {
    document.querySelector("#videosContainer").style.display = "block";
    document.querySelector("#videosContainer").innerHTML = '<div id="looding-icon"></div>';
}

///////////////////////////////Connect Server - processing//////////////////////////////////////////////////




///////////////////////////////Processing Data - processing//////////////////////////////////////////////////
async function dtOutput(data) {
    console.log(data);
    if(data.items.length === 0){
        showError(customError);
    }
    else if (type == "json" && route == "mainroute") {
        window.youtubeDt = new Object;
        youtubeDt.thumbnail = [];
        youtubeDt.videoID = [];
        youtubeDt.videoTitle = [];
        youtubeDt.channelTitle = [];
        youtubeDt.date = [];
        youtubeDt.time = [];
        youtubeDt.playListID = [];
        youtubeDt.duration = [];
        youtubeDt.channelImg = [];
        for (let i in data.items) {
            youtubeDt.fill = "done";
            youtubeDt.videoID[i] = data.items[i].id.videoId;
            //if i setup it correctly in css no need for it but it will help the reducing amount of data usage
            //in moile mode
            if ((innerWidth >= 960))
                //the big one
                youtubeDt.thumbnail[i] = data.items[i].snippet.thumbnails.medium.url;
            else {
                //the small one
                youtubeDt.thumbnail[i] = data.items[i].snippet.thumbnails.default.url;
            }
            youtubeDt.videoTitle[i] = data.items[i].snippet.title;
            youtubeDt.channelTitle[i] = data.items[i].snippet.channelTitle;
            try {
                youtubeDt.duration[i] = data.items[i].contentDetails.duration;
                // youtubeDt.date[i] = data.items[i].snippet.publishedAt.split('T')[0];
                // youtubeDt.time[i] = data.items[i].snippet.publishedAt.split('T')[1].replace("Z", "");
                youtubeDt.channelImg[i] = data.items[i].channelImg;
                throw "er";
            } catch {
                youtubeDt.date[i] = data.items[i].snippet.publishedAt;
                console.log("date");

            }
            youtubeDt.playListID[i] = data.items[i].id.playlistId;
            // console.log(youtubeDt.videoTitle[i]);
        }
        builder();
    }
}
function processDuration() {
    for (var i in youtubeDt.duration) {
        var ii = parseInt(i) + 1;
        let vDuration = document.querySelector(".v" + i);
        vDuration.textContent = youtubeDt.duration[i];
    }
}
///////////////////////////////Vidoeos Container - inhtml//////////////////////////////////////////////////
async function builder() {
    try {
        var listindex = 0;
        var totalHtml = "";
        var htmlitself = injected;
        for (let i in youtubeDt.videoTitle) {
            var holder = htmlitself;
            holder = holder.replace(new RegExp("{{videoTitle}}", "g"), youtubeDt.videoTitle[i]);
            if ((youtubeDt.videoID[i]) == undefined && youtubeDt.playListID[i] == undefined) {//channel
                holder = holder.replace("{{thumbnail}}", 'src="' + youtubeDt.thumbnail[i] + '" class = "channel"');
                holder = holder.replace("openiframe({{index}})", `openChannel('${youtubeDt.date[i]}')`);
            }
            else if ((youtubeDt.videoID[i]) == undefined && youtubeDt.playListID[i] != undefined) {//playlist
                holder = holder.replace("{{thumbnail}}", 'src="' + youtubeDt.thumbnail[i] + '" class="videoIcon"');
                atGlobal.list[listindex] = i
                listindex++;
            }
            else {//Videos and any thing else
                atGlobal.vArr[atGlobal.vIndex] = i;
                atGlobal.vIndex++;
                holder = holder.replace("{{thumbnail}}", 'src="' + youtubeDt.thumbnail[i] + '" class = "videoIcon Duration v"' + atGlobal.vIndex);
            }
            holder = holder.replace(new RegExp("{{vindex}}", 'g'), i);
            holder = holder.replace(new RegExp("{{index}}", 'g'), i);
            holder = holder.replace(new RegExp("{{date}}", "g"), youtubeDt.date[i]);
            holder = holder.replace(new RegExp("{{channel}}", "g"), youtubeDt.channelTitle[i]);
            holder = holder.replace(new RegExp("{{downloadLink}}", "g"), "");
            if(youtubeDt.channelImg[i]){
                holder = holder.replace(new RegExp("{{imgTh}}", "g"), youtubeDt.channelImg[i]);
                holder = holder.replace(new RegExp("{{imgThName}}", "g"), youtubeDt.channelTitle[i] + " image");
            }else{
                holder = holder.replace(new RegExp(`<img src="{{imgTh}}" alt="{{imgThName}}"/>`, "g"), "");
            }

            // console.log(window.youtubeDt.videoTitle[i]);
            totalHtml += holder;
        }
        window.totalHtml = new Object;
        window.totalHtml = totalHtml;
        await Emotion.stopLoadingemoji(Emotion.randomEmotion("happy"));
        document.querySelector("#videosContainer").innerHTML = window.totalHtml;
        for (var i in atGlobal.list) {
            let listsign = document.querySelector(".listsign" + atGlobal.list[i]);
            if (listsign != null) {
                listsign.style.cssText = `
            display:block;
            position:absolute;
            left:0;
            top:0;
            z-index:12;
            font-size:2vw;
            background-color:black;
            opacity:50%;
            height:20%;
                width:15%;
                padding:1%;
                border-radius:0 0 1vw 0;
                `;
            }
        }
        processDuration();
        // console.log(totalHtml);    
    } catch {
        showError(200);
    }
}
///////////////////////////////Open Iframe - inhtml//////////////////////////////////////////////////
function openiframe(i, vCode) {
    if (i >= 0) {
        if ((youtubeDt.videoID[i]) != undefined) {
            showloading();
            iframe = '<iframe id="waiting" src="https://www.youtube.com/embed/' + youtubeDt.videoID[i] + '"?rel="0" frameBorder="0" allowfullscreen></iframe>';
            document.querySelector("#videosContainer").innerHTML = iframe + '<br>' + ' <button style="display:block;"  class="down dbt"><span id="download">Download</span></button>' + "<hr>" + totalHtml;
            var redirect = document.createElement('a');
            redirect.href = "#openplace";
            redirect.click();
            redirect.remove();
            mksure(2, i);
        }
        else if (youtubeDt.playListID[i] != undefined) {
            var channel = "https://www.youtube.com/playlist?list=" + youtubeDt.playListID[i];
            var a = document.createElement('a');
            a.style.display = "none";
            a.href = channel;
            a.target = "_blank";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        else {
            var channel = "https://www.youtube.com/results?search_query=" + processInput(youtubeDt.channelTitle[i]);
            var a = document.createElement('a');
            a.style.display = "none"
            a.href = channel;
            a.target = "_blank";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
    else if (i == "openIframe" && vCode) {
        showloading();
        iframe = '<iframe id="waiting" style="display:block;" src="https://www.youtube.com/embed/' + vCode + '"?rel="0" frameBorder="0" allowfullscreen></iframe>';
        document.querySelector("#videosContainer").innerHTML = iframe + "<hr>";
    }
    processDuration("show");
}
///////////////////////////////Make Sure Server Connected//////////////////////////////////////////////////
function mksure(i, ii) {
    try {

        let waiting = fetch(atGlobal.IP());
        waiting.then(res => {
            if (res.status == 404) {
                window.outPut = true;
                if (i == 1) {
                    showbtnDown1();
                }
                else {
                    showbtnDown2(ii);
                }
            }
        });
    } catch {
        console.log("error");
    }
}
function showbtnDown1() {
    // console.log(atGlobal.connect);
    if (atGlobal.dbt && !atGlobal.obt && !atGlobal.connect) {
        btnDownload = document.querySelectorAll('.down');
        btnDownload[0].setAttribute('onclick', "downloadbutton()");
        btnDownload[0].setAttribute('style', 'opacity:100%;cursor:pointer;display:block;');
    }
    else if (atGlobal.connect) {
        btnDownload = document.querySelectorAll('.down');
        btnDownload[0].setAttribute('onclick', "downloadbutton()");
        btnDownload[0].setAttribute('style', 'opacity:100%;cursor:pointer;display:none;');
    }
    else if (!atGlobal.dbt && atGlobal.obt && !atGlobal.connect) {
        btnDownload = document.querySelectorAll('.down');
        btnDownload[0].setAttribute('onclick', "downloadbutton()");
        btnDownload[0].setAttribute('style', 'opacity:100%;cursor:pointer;display:none;');
    }
}
function showbtnDown2(ii) {
    btnDownload = document.querySelectorAll('.down');
    btnDownload[1].setAttribute('onclick', "downloadbutton2(" + ii + ")");
    btnDownload[1].setAttribute('style', 'opacity:100%;cursor:pointer;display:block;');

}
///////////////////////////////Download - processing//////////////////////////////////////////////////
function download(url, i) {
    // console.log(mksure(url));
    // window.location.href = 'http://192.168.1.2:4000/download?URL=' + url;
    let a = document.createElement('a');
    //console.log(atGlobal.IP() + url);
    a.href = atGlobal.IP() + url;
    a.target = '_blanck';
    a.click();
    a.remove();
}
///////////////////////////////////////////Dark Mode Switch//////////////////////////////////////////////////

//DarkMode Control System
function DMCS(where) {
    //check the last session darkmode if on or of
    //console.log(localStorage.D);
    if (localStorage.D == undefined)
        localStorage.setItem("D", false);
    if (where == 0) {
        let k = localStorage.getItem("D");
        if (k == 'true')
            atGlobal.onOROffDark = false;
        else
            atGlobal.onOROffDark = true;
    }
    //turning on or off the darkmode
    let dmode = document.querySelector('#dmode1');
    if (atGlobal.onOROffDark) {//this is (on) don't care with the name dmodeoff i badly named them 
        ball = document.querySelector('#ball');
        button = document.querySelector('#darkmode');
        ball.setAttribute('class', "dmodeBallOff");
        // console.log(atGlobal.onOROffDark);
        button.setAttribute('class', "dmodeOff");
        dmode.setAttribute('href', 'css/CFEWSFC-D.css');
        localStorage.setItem("D", false);
        atGlobal.onOROffDark = false;
    }
    else {//off
        ball = document.querySelector('#ball');
        button = document.querySelector('#darkmode');
        ball.setAttribute('class', "dmodeBallOn");
        // console.log(atGlobal.onOROffDark);
        button.setAttribute('class', "dmodeOn");
        dmode.setAttribute('href', 'css/CFEWSFC-L.css');
        localStorage.setItem("D", true);
        atGlobal.onOROffDark = true;
    }

}
////////////////////////////////Settings Icon - inhtml/////////////////////////////
let ul = document.querySelector('ul');
function showul() {
    ul.focus();
    button = document.querySelector('#darkmode');
    let el = document.querySelector('svg');
    el.style.transition = "250ms ease-out";
    if (atGlobal.showul) {
        button.setAttribute('style', 'cursor:pointer;')
        button.setAttribute('onclick', 'DMCS(1)');
        ul.setAttribute('style', 'opacity:100%;');
        atGlobal.showul = false;
        el.style.transform = "rotate(90deg)";
    }
    else {
        el.style.transform = "rotate(0deg)";
        ul.removeAttribute('style');
        button.removeAttribute('onclick');
        button.removeAttribute('style');
        atGlobal.showul = true;
    }
}

function hideul() {
    let ul = document.querySelector('ul');
    ul.setAttribute('style', 'opacity:0%;');
    atGlobal.showul = true;
}
function openChannel(url) {
    // getdata("https://youtube-6rrj.onrender.com/search?q="+url,"json","mainroute");
    getdata(`http://localhost:3002/get?q=${url}`, "json", "mainroute");
}
///////////////////////////////////////////MAIN FUNCTION//////////////////////////////////////////////////
var main = (function (event) {
    window.atGlobal = {
        Data: "Do You want to show these elements below ?",
        obt: true,
        dbt: true,
        sameBt: false,
        showURLBoxNow: true,
        //////////////////////////////
        URLBoxShownAlready: false,
        /////////server-address///////////
        IP: () => {
            let address = null;
            let add = window.origin;
            if (add.includes(":")) {
                address = add.replace(":5500", ":4000") + "/";
            }
            else
                console.error("No Download Server Found!");
            return address;
        },
        index: 0,
        connect: false,
        onOROffDark: false,
        showul: true,
        list: [],
        vIndex: 0,
        vArr: [],
        index2: 0,
        visitCount: 0,

    }
    DMCS(0);
    let path = window.location.href;
    path = path.substring(path.indexOf("watch?v=") + 8).trim();
    //openiframe("openIframe",path);
    console.log(path);
    console.log("This Site uses %cYoutube %cAPI!", "color:red;", "color:auto background:f2dd00;");
    document.querySelector("#youtubeSearchBox").focus();
    ul.addEventListener("blur", (event) => { if (atGlobal.showul) { atGlobal.showul = false; showul(); } });
    window.outPut = new Object;
    window.outPut = false;
    window.lastType = new Object;
    window.lastType = "none";
    youtubeDt = new Object;

    document.querySelector("#youtubeSearchBox").addEventListener("input",
        (event) => {
            if (document.querySelector("#youtubeSearchBox").value[0]) {
                let a = "أ".charCodeAt(0);
                let z = "ي".charCodeAt(0);

                let char = document.querySelector("#youtubeSearchBox").value[0];
                let searchBox = document.querySelector("#youtubeSearchBox").style;
                if (char.charCodeAt(0) >= a && char.charCodeAt(0) <= z) {
                    searchBox.direction = "rtl";
                }
                else
                    searchBox.direction = "ltr";
            }
        });
    document.querySelector('#youtubeSearchBox').addEventListener("keypress", getSearchcontent);
    function getSearchcontent(event) {
        var h1_1 = document.querySelector(".collapsed");
        if (h1_1 && (document.querySelector("#youtubeSearchBox").value == null || document.querySelector("#youtubeSearchBox").value == undefined)) {
            h1_1.animation = "800ms ease-out hideIcon forwards";
            h1_1.removeAttribute("class");
        }

        if (document.querySelector("#youtubeSearchBox").value != "") {
            window.lock = new Object;
            youtubeDt.fill = "null"
            // console.log(youtubeDt);
            lock = true;
            if (event.key == 'Enter') {
                var getSearchBox;
                var link = "https://www.youtube.com/results?search_query=";
                // console.log("YouTube: ");
                getSearchBox = document.querySelector('#youtubeSearchBox').value;
                // console.log(search);
                var processedSearch = (getSearchBox);
                var a = document.querySelector("#openplace > a");
                var h1 = document.querySelector(".lable").style;
                var searchBox = document.querySelector("#youtubeSearchBox").style;
                a.setAttribute("href", link + processedSearch);
                a.setAttribute("target", "_blank");
                // console.log(search);
                if (getSearchBox) {
                    searchBox.position = "relative";
                    h1.animation = "800ms ease-out hideIcon forwards";
                    h1.position = "relative";
                    h1.top = "0px";
                    document.querySelector("h1").setAttribute("class", "collapsed");
                }
                // console.log(processedSearch);
                var youtubeAPI = "https://youtube.googleapis.com/youtube/v3/search?videoDuration=any&q=" + processedSearch + "&key=AIzaSyB6MotaWQKv2-yljeI68UhM2X2x_iMRyB4&part=id,snippet";
                var youtubeAPI2 = "http://localhost:3002/search?q=" + processedSearch;
                var youtubeAPI6 = "http://192.168.1.5:3002/search?q=" + processedSearch;
                var youtubeAPI3 = "https://youtube-6rrj.onrender.com/search?q=" + processedSearch;
                var tryy = "data/data2.json";
                //getdata(youtubeAPI2, "json", "mainroute");
                //getdata(youtubeAPI6, "json", "mainroute");
                youtubeDt = {};
                getdata(youtubeAPI3, "json", "mainroute");
                // getdata(youtubeAPI, "json", "mainroute");
                // getdata(tryy, "json", "mainroute");
                // console.log(link);
            }
        }
    }
})();