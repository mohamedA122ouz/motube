import Emotion from "./showLoading";

async function getdata(url, type, route) {
    // showloading();
    // Emotion.showLoading();
    let data = null;
    try {
        data = await fetch(url);
        if (data.status === 200) {
            data = await data.json();
        }
        else
            showError(data.status);
    } catch (ex) {
        console.log(ex);
        showError(0);
    }
    return data;
}
const customError = 0x45;
async function showError(status) {
    // await Emotion.stopLoadingemoji(Emotion.randomEmotion("sad"));
    if (status == 408) {
        await Emotion.stopLoadingemoji(Emotion.randomEmotion("transition"));
        document.querySelector("#videosContainer").innerHTML = "<h2 style='text-align:center;'>ERROR CODE: " + status + "<br> Response TimeOut ⏰</h2>";
    }else if(status === customError){
        await Emotion.stopLoadingemoji(Emotion.emojies.transition[0]);
        document.querySelector("#videosContainer").innerHTML = "<h2 style='text-align:center;'>😵‍💫No results found 🫗<br>(Contact the Admin to check whether it is an error😥)</h2>";
    }
    else if (status == 500) {
        await Emotion.stopLoadingemoji(Emotion.emojies.E[0]);
        document.querySelector("#videosContainer").innerHTML = "<h2 style='text-align:center;'>ERROR CODE: " + status + "<br> Server Error 🛠</h2>";
    }
    else if (status == 403) {
        await Emotion.stopLoadingemoji(Emotion.randomEmotion("frasted",Emotion.EXTREAM));
        document.querySelector("#videosContainer").innerHTML = "<h2 style='text-align:center;'>ERROR CODE: " + status + "&nbsp;&nbsp;Forbidden<br>Google Quota End For Today Try to <mark>click search on Youtube</mark> Above, sorry for that but it's my limitation</h2>";
    }
    else {
        if (status != 0 && status != 200){
            await Emotion.stopLoadingemoji(Emotion.THINKING);
            document.querySelector("#videosContainer").innerHTML = "<h2 style='text-align:center;'>ERROR CODE: " + status + "&nbsp;&nbsp;Some thing Went Wrong " + "</h2>";
        }
        else if (status == 200) {
            await Emotion.stopLoadingemoji(Emotion.emojies.E[1]);
            document.querySelector("#videosContainer").innerHTML = "<h2 style='text-align:center;'>Sorry😢 it's not you it is us 😔this site is broken right now😖 try again later🛠</h2>";
        }
        else{
            await Emotion.stopLoadingemoji(Emotion.randomEmotion("sad"));
            document.querySelector("#videosContainer").innerHTML = "<h2 style='text-align:center;'>Cannot Connect Server ✂🔗</h2>";
        }
    }
}
async function dtOutput(data) {
    console.log(data);
    let youtubeDt = {};
    if(data && data.items.length === 0){
        showError(customError);
    }
    else{
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
    }
    return youtubeDt;
}

export default getdata;
export {showError,dtOutput};