import { useCallback, useEffect, useState } from "react";
import styles from "./Title.css";
export default function Title({ editableTitle,TitleText, colorArray }) {
    let availableColors = colorArray || ["#3F7EE8", "#DE4032", "#EEB205", "#319F4F"];
    let [data, updater] = useState(() => TitleText || "Youtbe");
    function updateByTime(text) {
        return new Promise((accept, reject) => {
            let counter = 0;
            let t = "";
            let i = setInterval(() => {
                t += text[counter];
                updater(t);
                if ((text.length - 1)== counter) {
                    clearInterval(i);
                    accept();
                }
                counter++;
            }, 60);
        })
    }
    useEffect(()=>{
        setTimeout(()=>{
            updateByTime(editableTitle);
        },500);
    },[]);
    return <h1 className={styles.label}>
        {data.split('').map((el, i) => {
            return <span key={"spanTitle"+i}style={{ color: availableColors[i % availableColors.length] }}>{el}</span>;
        })}
    </h1>

}