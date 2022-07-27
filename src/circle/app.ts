import p5 from "p5";

const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
        p.circle(p.width/2, p.height/2, 50);
    };
};

new p5(sketch);