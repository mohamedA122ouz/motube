import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Title.css";
import typingEffect from "../func/typingEffect.js";
async function get(url) {
    return (await fetch(url)).json();
}
async function getData() {
    let data = await get("https://api.adviceslip.com/advice");
    console.log(data);
    return data;
}
let screenX;
export default function Title({ addedClass, editableTitle, TitleText, colorArray }) {
    let availableColors = colorArray || ["#3F7EE8", "#DE4032", "#EEB205", "#319F4F"];
    let [data, updater] = useState(() => TitleText || "Youtbe");
    let forbiddedWords = ["dick", "fuck", "shit"];
    let bestTextRem = screenX * (5 / 1280);
    const quickMsg = useMemo(() => { return { working: false, mouseWentOut: true } }, []);
    useEffect(() => {
        screenX = 1280;
        message("YOUTUBE").then(
            () => {
                quickMsg.working = true;
                quickMessage("DISCLAIMER!! The advices shown is random and may not necessary useful").then(() => quickMsg.working = false);
            }
        );
    }, []);
    useEffect(() => {
        screenX = window.innerWidth;
    }, [data]);
    function updateByTime(text) {
        return typingEffect(updater, text);
    }
    function message(text) {
        console.log("text");
        if (text) {
            if (text.toLowerCase().includes("sex")) {
                getData().then(result => quickMessage(result.slip.advice));
                return;
            }
            forbiddedWords.forEach(el => {
                if (text.toLowerCase().includes(el)) {
                    let i = el.split("");
                    i[2] = "*";
                    i = i.join("");
                    text = text.replace(new RegExp(el, "ig"), i);
                }
            })
            return updateByTime(text);
        }
    }
    async function quickMessage(text) {
        await message(text);
        await new Promise((ac, rj) => setTimeout(() => ac(), 5000));
        await message(editableTitle);
        quickMsg.working = false;
    }

    return <h1 className={"label " + addedClass} onTouchStart={() => { if (!quickMsg.working) { getData().then(result => quickMessage(result.slip.advice));; quickMsg.working = true; } }} onMouseLeave={() => { quickMsg.mouseWentOut = true; }} onMouseOver={() => { if (!quickMsg.working && quickMsg.mouseWentOut) { getData().then(result => quickMessage(result.slip.advice));; quickMsg.working = true; quickMsg.mouseWentOut = false; } }}>
        {data.split('').map((el, i) => {
            return <span key={"spanTitle" + i} className={(data.length >= 50 ? "longText" : data.length >= 20 ? "mediumText" : "")} style={{ position: "relative", color: availableColors[i % availableColors.length] }}>{el}</span>;
        })}
    </h1>

}