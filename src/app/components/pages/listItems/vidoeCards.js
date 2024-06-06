"use client"
import Link from "next/link";
import VideoCard from "../../elements/videoCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { calldata } from "../../func/dataHandler";
import "./videoCards.css";
export default function VideoCards({ currentID }) {
    const urlData = useSearchParams();
    let data = urlData.get("data");
    let [youtubeDt, updater] = useState(null);
    useEffect(() => {
        updater(null);
        calldata(urlData.get("data")).then(result => {
            updater(result);
        });
    }, [data]);
    return <>
        {
            (function lister() {
                let temp = [];
                if (youtubeDt === null) {
                    for (let i = 0; i < 10; i++) {
                        temp.push(<VideoCard key={i} loadingClass={"loading"} />);
                    }
                    return temp;
                }
                else {
                    for (let i in youtubeDt.videoTitle) {
                        if (decodeURI(currentID) != youtubeDt.videoID[i])
                            temp.push(<Link key={youtubeDt.videoID[i]} href={{ pathname: "./videoOpener/", query: { id: youtubeDt.videoID[i], data: data } }}><VideoCard index={i} thumbnail={youtubeDt.thumbnail[i]} vindex={i} videoTitle={youtubeDt.videoTitle[i]} date={youtubeDt.date[i]} duration={youtubeDt.duration[i]} channel={youtubeDt.channelTitle[i]} imgTh={youtubeDt.channelImg[i]} imgThName={youtubeDt.channelTitle[i]} /></Link>);
                    }
                    return temp;
                }
            })()
        }
    </>
}