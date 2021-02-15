{
    const canvas = document.querySelector(`canvas`);
    canvas.width = 750;
    canvas.height = 500;
    const c = canvas.getContext(`2d`); // c stands for context

    //create random rgb color
    const randomColor = () => {
        const randomMax255 = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        return randomMax255(0, 130);
    };

    //get the value from the dominant answer
    const option = document.querySelectorAll(`option`);
    const optionArray = Array.from(option);
    const getColor = () => {
        if (optionArray[0].value === `red`) {
            return `rgb(255, ${randomColor()}, ${randomColor()})`;
        } else if (optionArray[1].value === `green`) {
            return `rgb(${randomColor()}, 255, ${randomColor()})`;
        } else {
            return `rgb(${randomColor()}, ${randomColor()}, 255)`;
        }
    }
    console.log(getColor());

    let xValue = Math.random() * canvas.width;
    let yValue = Math.random() * canvas.height;
    // can use input slow/fast?
    //random forwards/backwards
    let dx = (Math.random() - 0.5) * 8;
    let dy = (Math.random() - 0.5) * 8;
    let radius = 30;

    const circle = () => {
        //draw circle
        c.beginPath();
        c.arc(xValue, yValue, radius, 0, Math.PI * 2, false);
        c.fillStyle = getColor();
        c.fill();
    }

    //move the ball
    const movingBall = () => {
        //animate creates a loop between movingBall and requestAnimationFrame
        requestAnimationFrame(movingBall);
        //'clear' after refresh
        c.clearRect(0, 0, canvas.width, canvas.height);
        circle();
        //xd & xy are ancronyms for x- & y-velocity. If the circle hits the wall let it return
        if (xValue + radius > canvas.width || xValue - radius < 0) {
            dx = -dx;
        }
        if (yValue + radius > canvas.height || yValue - radius < 0) {
            dy = -dy;
        }

        //make the circle move
        xValue += dx;
        yValue -= dy;

    };

    const init = () => {
        
        movingBall();
        //add eventlistener on submit button so you can get the color value
    };
    init();
}
