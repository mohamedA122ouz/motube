"use client"
import { useSearchParams, useRouter } from "next/navigation";
import Title from "../elements/Title";
import Input from "../elements/input";
import { useEffect, useRef } from "react";
import Footer from "../elements/footer";

export default function Layout({ children }) {
    let router = useRouter();
    let params = useSearchParams();
    let data = params.get("data");
    let ref = useRef(() => null);
    let ref2 = useRef(() => null);
    let header = useRef(() => null);
    async function navigate() {
        router.push(`./listItems/?data=${ref.current.value}`);
        return false;
    }
    useEffect(() => {
        try {
            let iframe = document.querySelector("iframe");
            if(iframe === null)
                throw "no iframe";
            let Observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    iframe.style.position = "relative";
                    iframe.style.zIndex = "4";
                    iframe.style.top = "0vh";
                } else {
                    iframe.style.position = "fixed";
                    iframe.style.top = "0vh";
                }
            }, { threshold: 1, rootMargin: "100px" });
            Observer.observe(ref2.current);
        } catch {
            console.log("no Iframe yet");
        }
        let lastPosition = 0;
        document.addEventListener("scroll", (e) => {
            let deltaPosition = lastPosition - window.scrollY;
            if (deltaPosition < 0) {
                lastPosition = window.scrollY;
                header.current.style.position = "relative";
            } else {
                header.current.removeAttribute("style");
                lastPosition = window.scrollY;
                header.current.style.position = "fixed";
            }
            console.log(deltaPosition);
        });
    }, []);
    return <>
        <div className="header" ref={header}>
            <Title addedClass={"small"} editableTitle={" Youtube"} />
            <Input addedClass={"small"} placeholder={data} onSubmit={navigate} ref={ref} />
        </div>
        <div className="margin" ref={ref2}></div>
        {children}
        <Footer />
    </>
}