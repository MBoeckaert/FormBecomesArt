{
    //form
    const $form = document.querySelector(`.form-general`);
    //canvas
    const canvas = document.querySelector(`canvas`);
    canvas.width = 750;
    canvas.height = 500;
    const c = canvas.getContext(`2d`); // c stands for context

    const submitForm = (e) => {
        e.preventDefault();

        //create random rgb color
        const randomColor = () => {
            const randomMax255 = (min, max) => {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            return randomMax255(0, 255);
        };

        //get info from dominant color
        const $colors = $form.querySelector(`.colors`);
        const colorsInput = $colors.options[$colors.selectedIndex].textContent;
        console.log(colorsInput);
        const getColor = () => {
            if (colorsInput === `Red`) {
                return `rgb(255, ${randomColor()}, ${randomColor()})`;
            } else if (colorsInput === `Green`) {
                return `rgb(${randomColor()}, 255, ${randomColor()})`;
            } else {
                return `rgb(${randomColor()}, ${randomColor()}, 255)`;
            }
        }
        console.log(getColor());

        //get input slow/fast
        const checkedRadio = $form.querySelector(`input[name=speed]:checked`).value;
        console.log(checkedRadio);
        const ballSpeed = () => {
            if (checkedRadio === `slow`) {
                return 8;
            } else {
                return 32;
            }
        };

        //circle values
        let xValue = Math.random() * canvas.width;
        let yValue = Math.random() * canvas.height;
        //random forwards/backwards
        let dx = (Math.random() - 0.5) * ballSpeed();
        let dy = (Math.random() - 0.5) * ballSpeed();
        let radius = 30;

        //draw circle
        let circle = () => {
            c.beginPath();
            c.arc(xValue, yValue, radius, 0, Math.PI * 2, false);
            c.fillStyle = getColor();
            c.fill();
        }

        // for (let i = 0; i < 5; i++) {
        //     const circle = () => {
        //         c.beginPath();
        //         c.arc(xValue, yValue, radius, 0, Math.PI * 2, false);
        //         c.fillStyle = getColor();
        //         c.fill();
        //     }
        //     //const circles = circle();
        // }

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
        movingBall();
    };

    const init = () => {
        //submit form
        $form.addEventListener(`submit`, submitForm);
    };
    init();
}
