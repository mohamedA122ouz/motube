"use client"
import styles from "./page.module.css";
import Footer from "./components/elements/footer";
import Input from "./components/elements/input";
import { useRef, useState } from "react";
import Title from "./components/elements/Title";
import Links from "./components/elements/links";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  let ref = useRef(() => null);
  let [results, update] = useState(() => null);
  async function navigate() {
    router.push(`./components/pages/listItems?data=${ref.current.value}`);
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
