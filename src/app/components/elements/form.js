import { useRef } from "react";
import MyButton from "./myButton";

export default function Form() {
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
    return <form>
        <input type="text" ref={url} title="Enter Youtube Video URL" placeholder="Enter Url" style={{marginTop: "20px",display: "none"}} required />
        <MyButton Text={"Download"}/>
        <MyButton onclick={()=>openfunc()} id="obt" Text={"OPEN"} />
    </form>;
}