import "./links.css";
export default function Links({download,open}) {
    return <div id="openplace">
        <a href="#">Search&nbsp;On&nbsp;Youtube</a>
        <a href="#" onClick={download} style={{marginLeft: "10px"}}>Download&nbsp;Manager</a>
        <a href="#" onClick={open} style={{marginLeft: "10px"}}>open&nbsp;Video&nbsp;Location</a>
    </div>;
}