class Emotion {
    static interval = null;
    static emojies = {
        sad: ['😣', '😓', '😢', '😭'],
        happy: ['😁', '😄', '😉', '😊', '😎', '🤩'],
        waiting: [['🤨', '🤔', '😒', '🥱', '😪', '😴'], ['👶🏾', '🧒🏾', '👦🏾', '🧑🏾', '👨🏾', '🧓🏾', '👴🏾'], ['🕛', '🕧', '🕐', '🕜', '🕑', '🕝', '🕒', '🕞', '🕓', '🕟', '🕔', '🕠', '🕕', '🕡', '🕖', '🕢', '🕗', '🕣', '🕘', '🕤', '🕙', '🕥', '🕚', '🕦']],
        frasted: ['😐', '😑', '🙁', '☹', '😠', '😡', '🤬'],
        transition: ['😯'],
        E: ['💀','☠']
    };
    static #emojiElement = (emoji) => `<div style="font-size:32px;text-align:center;">${emoji}</div>`;
    static COOL = Emotion.emojies.happy[4];
    static STAR = Emotion.emojies.happy[5];
    static CRY = Emotion.emojies.sad[3];
    static THINKING = Emotion.emojies.waiting[0][1];
    static wink = Emotion.emojies.happy[2];
    static FRASTRATED = Emotion.emojies.frasted[5];
    static SLEEPY = Emotion.emojies.waiting[3];
    static SLEEPING = Emotion.emojies.waiting[5];
    static EXTREAM = 0x20;
    static HARD = 0x21;
    static MEDIUM = 0x22;
    static BASIC = 0x23;
    static FIRST = 0x24;
    static randomNumberInRange = (min, max) => parseInt(Math.random() * (max - min) + min);
    static feelingStrengthEmotion(emotion, feelingStrength) {
        let savedEmojie;
        if (emotion.includes("waiting")) {
            let num = parseInt(emotion);
            let numberLength = (num + "").length;
            try {
                savedEmojie = Emotion.emojies[emotion.substring(numberLength)];
                savedEmojie = savedEmojie[parseInt(emotion)];
                if (!savedEmojie)
                    throw "error";
            } catch {
                return Emotion.emojies.transition[0];
            }
        }
        else
            savedEmojie = Emotion.emojies[emotion]
        if (emotion !== "transition") {
            if (feelingStrength == this.EXTREAM) {
                return savedEmojie[savedEmojie.length - 1];
            } else if (feelingStrength == this.HARD) {
                return ((this.randomNumberInRange(0, 10)) % 2) ? savedEmojie[savedEmojie.length - 2] : savedEmojie[savedEmojie.length - 3];
            }
            else if (this.MEDIUM == feelingStrength) {
                let randomemojiIndex = this.randomNumberInRange(2, savedEmojie.length - 3);
                return savedEmojie[randomemojiIndex];
            }
            else if (this.BASIC === feelingStrength) {
                let randomemojiIndex = this.randomNumberInRange(0, 2);
                return savedEmojie[randomemojiIndex];
            }
            else if (this.FIRST === feelingStrength) {
                return savedEmojie[0];
            }
            else
                return savedEmojie[0];
        }
        return savedEmojie[0];
    }
    static randomEmotion(emotion) {
        let randomNum = this.randomNumberInRange(0, Emotion.emojies[emotion].length);
        return Emotion.emojies[emotion][randomNum];
    }
    static showLoading() {
        if(Emotion.interval === null){
            let container = document.querySelector("#videosContainer");
            container.style.display = "block";
            let counter = 0;
            let i = -1;
            let chooseRandom = Emotion.randomNumberInRange(0, this.emojies["waiting"].length);
            interval = setInterval(() => {
                i = (++i) % (this.emojies["waiting"][chooseRandom].length);
                container.innerHTML = Emotion.#emojiElement(this.emojies["waiting"][chooseRandom][i]);
                if (i === 0) {
                    counter++;
                }
                if (counter === 4 && i == (this.emojies["waiting"].length - 2)) {
                    container.innerHTML = this.#emojiElement(Emotion.FRASTRATED);
                }
                else if (counter === 4 && i == (this.emojies["waiting"].length - 1)) {
                    clearInterval(interval);
                    showloading();
                }
            }, 700);
        }
    }
    static stopLoadingemoji(emoji) {
        return new Promise((acc, rej) => {
            if (interval !== null) {
                let container = document.querySelector("#videosContainer");
                clearInterval(interval);
                interval = null;
                if (emoji) {
                    container.innerHTML = this.#emojiElement(emoji);
                }
            }
            setTimeout(() => {
                acc();
            }, 500);
        })
    }
}
export default Emotion;