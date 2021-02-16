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
                return 4;
            } else {
                return 16;
            }
        };
        //create the circles using classes
        class Circle {
            constructor(x, y, dx, dy, radius) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.radius = radius;
                this.minRadius = radius;
                this.color = getColor();

                this.draw = () => {
                    c.beginPath();
                    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                    c.fillStyle = this.color;
                    c.fill();
                }
                this.update = () => {
                    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                        this.dx = -  this.dx;
                    }
                    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                        this.dy = - this.dy;
                    }

                    this.x += this.dx;
                    this.y += this.dy;

                    this.draw();
                };

            }
        }

        let newArray = [];

        //get the input from amount of balls
        const numberValue = document.querySelector(`input[name=pick-number]`).value;
        const createBalls = () => {
            newArray = [];
            for (let i = 0; i < numberValue; i++) {
                const radius = Math.random() * 10 + 1;
                //console.log(radius);
                const x = Math.random() * (canvas.width - radius * 2) + radius;
                const y = Math.random() * (canvas.height - radius * 2) + radius;
                const dx = (Math.random() - 0.5) * ballSpeed();
                const dy = (Math.random() - 0.5) * ballSpeed();
                newArray.push(new Circle(x, y, dx, dy, radius));
            }
            console.log(newArray);
        };

        createBalls()

        //animate the ball
        const movingBall = () => {
            //animate creates a loop between movingBall and requestAnimationFrame
            requestAnimationFrame(movingBall);
            //'clear' after refresh
            c.clearRect(0, 0, canvas.width, canvas.height);
            // circle();
            for (let i = 0; i < newArray.length; i++) {
                newArray[i].update();
            }

        };
        movingBall();

    }

    const init = () => {
        //submit form
        $form.addEventListener(`submit`, submitForm);
    };
    init();
}