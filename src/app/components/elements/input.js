import { forwardRef, useRef } from "react";
import styles from "./input.module.css";

const Input = forwardRef(function ({ placeholder, onInput, onSubmit, addedClass,value }, ref) {

    return <form onSubmit={(e) => { onSubmit(); e.preventDefault() }}> <input value={value} type="text" onInput={onInput} onSubmit={() => onSubmit()} ref={ref} className={styles.youtubeSearchBox + " " + addedClass} title="Enter any Text here To search Youtube with it" placeholder={placeholder} /></form>;
});
Input.displayName = "Input";
export default Input;