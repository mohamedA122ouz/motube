"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Footer from "./components/elements/footer";
import Input from "./components/elements/input";
import { useRef, useState } from "react";
import Title from "./components/elements/Title";
import Links from "./components/elements/links";
import MyButton from "./components/elements/myButton";
import Form from "./components/elements/form";
import BAR from "./components/elements/BAR";
import getdata,{dtOutput} from "./components/func/dataHandler";
import VideoCard from "./components/elements/videoCard";
export default function Home() {
  let ref = useRef(()=>null);
  let [results,update] = useState(()=>null);
  async function callData(){
    let url = `https://youtube-6rrj.onrender.com/search?q=${ref.current.value}`;
    let data = await getdata(url);
    data = await dtOutput(data);
    console.log(data);
    update(data);
    // data = null;
    console.log(results);
    return false;
  }
  return (
    <main className={styles.main}>
      <Title TitleText={"MOTUBE"} editableTitle={"YOUTUBE"} ></Title>
      <Input onSubmit={callData} placeholder={"Search Youtube"} ref={ref} />
      <BAR/>
      {(function (){
        if(results){
          for(let i = 0;i<results.videoID;i++){
            <VideoCard index={i} thumbnail={results.thumbnails[i].defualt} vindex ={i} videoTitle ={results.videoTitle[i]} date ={results.duration[i]} channel ={results.channelTitle[i]} imgTh ={results.channelImg[i]} imgThName ={results.channelTitle[i]} />
          }
        }
      })()}
      <Footer />
    </main>
  );
}
