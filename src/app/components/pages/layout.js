"use client"
import { useSearchParams,useRouter } from "next/navigation";
import Title from "../elements/Title";
import Input from "../elements/input";
import { useRef } from "react";
import Footer from "../elements/footer";

export default function Layout({ children }) {
    let router = useRouter();
    let params = useSearchParams();
    let data = params.get("data");
    let ref = useRef(() => null);
    async function navigate() {
        router.push(`./listItems/?data=${ref.current.value}`);
        return false;
    }
    return <>
        <div className="header">
            <Title addedClass={"small"} editableTitle={" Youtube"} />
            <Input addedClass={"small"} placeholder={data} onSubmit={navigate} ref={ref} />
        </div>
        <div className="margin"></div>
        {children}
        <Footer/>
    </>
}