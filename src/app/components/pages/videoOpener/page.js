"use client"
import { useSearchParams } from "next/navigation"
import VideoCards from "../listItems/vidoeCards";
import "./page.css";
export default function VideoOpener() {
    let parameters = useSearchParams();
    let videoID = parameters.get("id");
    return (<>
        <iframe src={"https://www.youtube.com/embed/" + videoID} />
        <div className="cardsContainer">
            <VideoCards currentID={videoID}></VideoCards>
        </div>
    </>)
}