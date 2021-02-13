{
    const canvas = document.querySelector(`canvas`);
    canvas.width = 750;
    canvas.height = 500;
    const c = canvas.getContext(`2d`);

    //this refers to the object that is executing the current function
    //this in method refers to the object
    //this in function refers to the window
    function Circle(x, y, dx, dy, radius) {
        //check here
        this.xValue = x;
        this.yValue = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;

        this.draw = function () {
            //draw circle
            c.beginPath();
            c.arc(this.xValue, this.yValue, radius, 0, Math.PI * 2, false);
            c.strokeStyle = `blue`;
            c.stroke();
            c.fill();
        }

        this.update = function () {
            //if the circle hits the wall let it return
            if (this.xValue + this.radius > canvas.width || this.xValue - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.yValue + this.radius > canvas.height || this.yValue - this.radius < 0) {
                this.dy = -this.dy;
            }

            //start animation, dx is for movement speed
            this.xValue += dx;
            this.yValue += dy;

            this.draw();
        }
    }

    const circleArray = [];

    for (let i = 0; i < 100; i++) {
        const radius = 30;
        //place circle random on screen
        let xValue = Math.random() * (canvas.width - radius * 2) + radius;
        let yValue = Math.random() * (canvas.width - radius * 2) + radius;
        //xd & xy are ancronyms for x- & y-velocity. 
        // Math.random() - 0.5 = make it move forward or backward and 8 is the speed
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);

        circleArray.push(new Circle(xValue, yValue, dx, dy, radius));
        //include this to the form, so user can choose speed (slow, medium and fast)
    }

    const animate = () => {
        requestAnimationFrame(animate);
        //clear after 'refresh'
        c.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < circleArray.length; i++) {
            circleArray[i].update();
        }
    };

    const init = () => {
        animate();
    };
    init();
}