"use client"
import Link from "next/link";
import VideoCard from "../../elements/videoCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./cardLoadingAnimation.css";
import { calldata } from "../../func/dataHandler";
import "./videoCards.css";
export default function VideoCards({ currentID }) {
    const urlData = useSearchParams();
    let data = urlData.get("data");
    let endPoint = urlData.get("endPoint")
    let [youtubeDt, updater] = useState(null);
    useEffect(() => {
        updater(null);
        calldata(urlData.get("data"), endPoint).then(result => {
            updater(result);
        });
    }, [data]);
    return <>
        {
            (function lister() {
                let temp = [];
                if (youtubeDt === null) {
                    for (let i = 0; i < 10; i++) {
                        temp.push(<VideoCard key={i} currentClass={"loading"} />);
                    }
                    return temp;
                }
                else {
                    for (let i in youtubeDt.videoTitle) {
                        if (decodeURI(currentID) != youtubeDt.videoID[i]) {
                            if (youtubeDt.videoID[i]) {
                                temp.push(<Link key={youtubeDt.videoID[i]} href={{ pathname: "./videoOpener/", query: { id: youtubeDt.videoID[i], data: data } }}><VideoCard index={i} thumbnail={youtubeDt.thumbnail[i]} vindex={i} videoTitle={youtubeDt.videoTitle[i]} date={youtubeDt.date[i]} duration={youtubeDt.duration[i]} channel={youtubeDt.channelTitle[i]} imgTh={youtubeDt.channelImg[i]} imgThName={youtubeDt.channelTitle[i]} /></Link>);
                            }
                            else {
                                temp.push(<Link key={"channel" + youtubeDt.date[i]} href={{ query: { data: youtubeDt.date[i], endPoint: "channel" } }}><VideoCard index={i} imageClass={"channel"} thumbnail={youtubeDt.thumbnail[i]} vindex={i} videoTitle={youtubeDt.videoTitle[i]} date={youtubeDt.date[i]} duration={youtubeDt.duration[i]} channel={youtubeDt.channelTitle[i]} imgTh={youtubeDt.channelImg[i]} imgThName={youtubeDt.channelTitle[i]} /></Link>);
                            }
                        }
                    }
                    if (!temp.length) {
                        temp.push(<><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Loudly%20Crying%20Face.webp" alt="Loudly Crying Face" width="" height="" style={{ marginLeft: "50%", transform: "translateX(-50%)" }} /><p>something went wrong</p></>)
                    }
                    return temp;
                }
            })()
        }
    </>
}