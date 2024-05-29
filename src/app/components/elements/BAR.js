import { useState } from "react";
import Form from "./form";
import Links from "./links";
import MyButton from "./myButton";

export default function BAR (){
    let [downloadFlag,showDownload] = useState(()=>false);
    let [openFlag,showOpen] = useState(()=>false);
    return <>
    <Links showDownload={()=>showDownload(e=>!e)} showOpen={()=>showOpen(e=>!e)}></Links>
    <Form></Form>
    </>;
}