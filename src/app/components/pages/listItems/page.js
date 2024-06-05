"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import getdata, { dtOutput } from "../../func/dataHandler";
import "./editedStyles.css";
import "./cardLoadingAnimation.css";
import VideoCards from "./vidoeCards";

export default function ListItemPage() {

    return <>
        <VideoCards />
    </>;
}