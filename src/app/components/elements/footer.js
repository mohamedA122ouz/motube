import "./footer.css";

export default function Footer() {

    return (
        <footer>
            <div className="applicationInfo">
                <p>WebSite info</p>
                <p className="details">
                    Our platform presents a revolutionary
                    approach to video streaming, offering a specialized
                    search-driven interface that taps into YouTube’s vast
                    repository. It is meticulously designed to cater
                    to professionals seeking content without the interference
                    of personalized suggestions. By prioritizing search accuracy
                    over user history, we ensure a focused and efficient browsing experience,
                    free from the common pitfalls of engaging yet unrelated media.
                    This commitment to a purpose-driven search experience marks a significant
                    stride towards a more productive and goal-oriented online video consumption.
                </p>
            </div>
            <div>
                info about me
            </div>
            <div className="copyRight">&copy;{`2022 - ${new Date().getFullYear()} Mohamed@122ouz😎`}</div>
        </footer>);
}