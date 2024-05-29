import "./btnMix.css";
export default function MyButton({Text,onclick}){
    return <button onClick={onclick}>{Text}</button>;
}