"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Footer from "./components/elements/footer";
import Input from "./components/elements/input";
import { useRef } from "react";
import Title from "./components/elements/Title";
import Links from "./components/elements/links";
import MyButton from "./components/elements/myButton";
import Form from "./components/elements/form";
import BAR from "./components/elements/BAR";

export default function Home() {
  let ref = useRef(()=>null);

  return (
    <main className={styles.main}>
      <Title TitleText={"MOTUBE"} editableTitle={"YOUTUBE"} ></Title>
      <Input placeholder={"Search Youtube"} ref={ref} />
      <BAR/>
      <Footer />
    </main>
  );
}
