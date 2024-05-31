import { forwardRef, useRef } from "react";
import styles from "./input.module.css";

const Input = forwardRef(function ({placeholder,onInput,onSubmit},ref){

    return<form onSubmit={(e)=>{onSubmit();e.preventDefault()}}> <input type="text" onInput={onInput} onSubmit={()=>onSubmit()} ref={ref} className={styles.youtubeSearchBox} title="Enter any Text here To search Youtube with it" placeholder={placeholder} /></form>;   
});
export default Input;