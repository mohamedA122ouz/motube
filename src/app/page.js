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
import getdata, { dtOutput } from "./components/func/dataHandler";
import VideoCard from "./components/elements/videoCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
const inputData = {current:""};


export default function Home() {
  const router = useRouter();
  let ref = useRef(() => null);
  let [results, update] = useState(() => null);
  async function navigate() {
    router.push(`./components/pages/listItems?data=${ref.current.value}`);
  }
  function openfunc() {
    var URLButtonText = url.current.value;
    let checker = [];
    'https://www.youtube.com/'
    checker = URLButtonText.split('/')
    if (checker[2] == 'www.youtube.com') {
      var videoCode2 = [];
      videoCode2 = URLButtonText.split('&');
      var videoCode = [];
      videoCode = videoCode2[0].split('=');
      openiframe("openIframe", videoCode[1]);
    }
    else if (checker[2] == "youtu.be") {
      openiframe("openIframe", checker[3]);
    }
  }
  function download() {
    alert("SERVER ERROR");
  }
  function open() {
    console.log("waiting to add");
  }
  return (<>
    <main className={styles.main}>
      <div>
        <Title TitleText={"MOTUBE"} editableTitle={" YOUTUBE"} ></Title>
        <Input  onSubmit={navigate}  placeholder={"Search Youtube"} ref={ref} />
        <Links download={download} open={open} />
      </div>
    </main>
    <Footer />
  </>
  );
}
