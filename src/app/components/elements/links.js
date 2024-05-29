import "./links.css";
export default function Links({showDownload,showOpen}) {
    return <div id="openplace">
        <a href="#">Search&nbsp;On&nbsp;Youtube</a>
        <a href="#" onClick={showDownload} style={{marginLeft: "10px"}}>Download&nbsp;Manager</a>
        <a href="#" onClick={showOpen} style={{marginLeft: "10px"}}>open&nbsp;Video&nbsp;Location</a>
    </div>;
}