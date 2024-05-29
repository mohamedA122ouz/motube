export default function updateByTime(stateFunciton,text) {
    return new Promise((accept, reject) => {
        let counter = 0;
        let t = "";
        let i = setInterval(() => {
            t += text[counter];
            stateFunciton(t);
            if ((text.length - 1) == counter) {
                clearInterval(i);
                accept();
            }
            counter++;
        }, 70);
    });
}