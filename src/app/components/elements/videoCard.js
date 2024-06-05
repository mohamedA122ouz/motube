import "./videoCard.css";
export default function VideoCard({ index, thumbnail, vindex, videoTitle, duration, date, channel, imgTh, imgThName, onclick, loadingClass }) {
    return <div className={"details " + loadingClass} onClick={onclick}>
        <div className="thumbnail">
            <div style={{ display: "none" }} className={"listsign" + index}>
                <svg style={{ color: "white" }}
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-list listStyle" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </div>
            <div className={"v" + vindex + " duration"}>{duration}</div>
            <img src={thumbnail} alt={videoTitle} />
        </div>
        <div className="text">
            <span className="vTitle">
                {videoTitle}
            </span>
            <br />
            <span className="publishTime">{date}</span>
            <br />
            <div className="channelDetails">
                <img src={imgTh} alt={imgThName} />
                <span className="channelName">{channel}</span>
            </div>

        </div>
    </div>;
}