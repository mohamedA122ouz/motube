"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import getdata, { dtOutput } from "../../func/dataHandler";
import Title from "../../elements/Title";
import Input from "../../elements/input";
import "./editedStyles.css";
import "./cardLoadingAnimation.css";
import VideoCard from "../../elements/videoCard";
import Footer from "../../elements/footer";
async function calldata(input) {
    let url = `https://youtube-6rrj.onrender.com/search?q=${encodeURI(input)}`;
    let data = await getdata(url);
    data = await dtOutput(data);
    console.log(data);
    return data;
}
export default function ListItemPage() {
    const router = useRouter();
    const urlData = useSearchParams();
    let data = urlData.get("data");
    let [youtubeDt,updater] = useState(null);
    useEffect(()=>{
        updater(null);
        calldata(urlData.get("data")).then(result=>{
            updater(result);
        });
    },[urlData.get("data")]);
    const ref = useRef(() => null);
    async function navigate() {
        router.push(`./listItems/?data=${ref.current.value}`);
        return false;
    }
    return <>
        <div className="header">
            <Title addedClass={"small"} editableTitle={" Youtube"} />
            <Input addedClass={"small"} placeholder={data} onSubmit={navigate} ref={ref} />
        </div>
        <div className="margin"></div>
        {
            (function lister(){
                let temp = [];
                if(youtubeDt === null){
                    for(let i =0;i<10;i++){
                        temp.push(<VideoCard loadingClass={"loading"} />);
                    }
                    return temp;
                }
                else{
                    for(let i in youtubeDt.videoTitle){
                        temp.push(<VideoCard index={i} thumbnail={youtubeDt.thumbnail[i]} vindex={i} videoTitle={youtubeDt.videoTitle[i]} date={youtubeDt.date[i]} duration={youtubeDt.duration[i]} channel={youtubeDt.channelTitle[i]} imgTh={youtubeDt.channelImg[i]} imgThName={youtubeDt.channelTitle[i]} />);
                    }
                    return temp;
                }
            })()
        }
        <Footer/>
    </>;
}