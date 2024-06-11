"use client"
import { useSearchParams } from "next/navigation"
import VideoCards from "../listItems/vidoeCards";
import "./page.css";
import { Suspense, useEffect, useRef } from "react";
export default function VideoOpener() {
    let parameters = useSearchParams();
    let ref = useRef(() => null);
    let ref2 = useRef(() => null);
    useEffect(() => {
        try {
            let iframe = ref.current;
            let frameDetails = ref2.current;
            let Observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    iframe.style.position = "relative";
                    iframe.style.zIndex = "4";
                    iframe.style.top = "0vh";
                } else {
                    iframe.style.position = "fixed";
                    iframe.style.top = "0vh";
                }
            }, { threshold: 1, rootMargin: "250px" });
            Observer.observe(frameDetails);
        } catch {
            console.log("no Iframe yet");
        }
    });
    let videoID = parameters.get("id");
    return (<Suspense fallback={<div>Loading...</div>}>
        <div ref={ref2} className="frameDetails">
            <iframe ref={ref} key="fixed" src={"https://www.youtube.com/embed/" + videoID + `?rel="0"`} frameBorder="0" allowFullScreen={true} />
            <img></img>
            <p>here is video details</p>
        </div>
        <div className="cardsContainer">
            <VideoCards currentID={videoID}></VideoCards>
        </div>
    </Suspense>)
}