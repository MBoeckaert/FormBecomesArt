{
    const canvas = document.querySelector(`canvas`);
    canvas.width = 750;
    canvas.height = 500;
    const c = canvas.getContext(`2d`);      // c stands for context

    //create random rgb color
    const randomColor = () => {
        const randomMax255 = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        const r = randomMax255(0, 255);
        const g = randomMax255(0, 255);
        const b = randomMax255(0, 255);
        return `rgb(${r},${g},${b})`;
    }

    //create Circles
    const circle = (e) => {
        for (let i = 0; i < e; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            c.beginPath();
            c.arc(x, y, 12, 0, Math.PI * 2, false);
            c.strokeStyle = randomColor();
            c.stroke();
        }
    }

    const init = () => {
        console.log(randomColor());
        circle(100);
    };
    init();
}