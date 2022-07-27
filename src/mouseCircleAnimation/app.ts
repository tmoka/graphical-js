import p5 from "p5";

const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
        p.strokeWeight(10);
        p.stroke(240);
        p.noFill();
        p.circle(p.mouseX, p.mouseY, 50);
    };
};

new p5(sketch);