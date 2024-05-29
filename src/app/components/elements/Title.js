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
export default function Title({ editableTitle, TitleText, colorArray }) {
    let availableColors = colorArray || ["#3F7EE8", "#DE4032", "#EEB205", "#319F4F"];
    let [data, updater] = useState(() => TitleText || "Youtbe");
    const quickMsg = useMemo(() => { return { working: false, mouseWentOut: true } }, []);
    useEffect(() => {
        message("YOUTUBE").then(
            ()=>{
                quickMessage("DISCLAIMER!! the advices shown is random and may be not true")
            }
        );
    }, []);

    function updateByTime(text) {
        return typingEffect(updater, text);
    }
    function message(text) {
        return updateByTime(text);
    }
    async function quickMessage(text) {
        await message(text);
        await new Promise((ac, rj) => setTimeout(() => ac(), 5000));
        await message(editableTitle);
        quickMsg.working = false;
    }

    return <h1 className="label" onTouchStart={() => { if (!quickMsg.working) {getData().then(result=>quickMessage(result.slip.advice));; quickMsg.working = true; } }} onMouseLeave={() => { quickMsg.mouseWentOut = true; }} onMouseOver={() => { if (!quickMsg.working && quickMsg.mouseWentOut) {getData().then(result=>quickMessage(result.slip.advice));; quickMsg.working = true; quickMsg.mouseWentOut = false; } }}>
        {data.split('').map((el, i) => {
            return <span key={"spanTitle" + i} style={{ color: availableColors[i % availableColors.length] }}>{el}</span>;
        })}
    </h1>

}