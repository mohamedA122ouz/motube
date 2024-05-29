import { useRef, useState } from "react";
import Form from "./form";
import Links from "./links";
import MyButton from "./myButton";

export default function BAR (){
    let [downloadFlag,showDownload] = useState(()=>false);
    let [openFlag,showOpen] = useState(()=>false);
    let url = useRef(()=>null);
    function openfunc() {
        var URLButtonText = url.current.value;
        let checker = [];
        'https://www.youtube.com/'
        checker = URLButtonText.split('/')
        if (checker[2] == 'www.youtube.com') {
            var videoCode2 = [];
            videoCode2 = URLButtonText.split('&');
            var videoCode = [];
            videoCode = videoCode2[0].split('=');
            openiframe("openIframe", videoCode[1]);
        }
        else if (checker[2] == "youtu.be") {
            openiframe("openIframe", checker[3]);
        }
    }
    return <>
    <Links showDownload={()=>showDownload(e=>!e)} showOpen={()=>showOpen(e=>!e)}></Links>
    {/* <Form></Form> */}
    {(openFlag||downloadFlag) && <input type="text" ref={url} title="Enter Youtube Video URL" placeholder="Enter Url" style={{marginTop: "20px"}} required />}
    <br/>
        {downloadFlag&&<MyButton Text={"Download"}/>}
        {openFlag&&<MyButton onclick={()=>openfunc()} id="obt" Text={"OPEN"} />}
    </>;
}