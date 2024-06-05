"use client"
import {useRouter, useSearchParams} from "next/navigation"
import ListItemPage from "../listItems/page";
import VideoCards from "../listItems/vidoeCards";

export default function videoOpener(){
    let router = useRouter();
    let parameters = useSearchParams();
    let videoID = parameters.get("id");
    return (<>
    <iframe src={"https://www.youtube.com/embed/"+videoID} />
    <VideoCards currentID={videoID}></VideoCards>
    </>)
}