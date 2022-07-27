import p5 from "p5";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.pixelDensity(1);
    p.noLoop();
  };

  p.draw = () => {
    p.background(0);

    const w = 4;
    const h = (w * p.height) / p.width;

    const xmin = -w / 2;
    const ymin = -h / 2;

    const xmax = xmin + w;
    const ymax = ymin + h;

    const dx = (xmax - xmin) / p.width;
    const dy = (ymax - ymin) / p.height;

    p.loadPixels();

    const maxIterations = 100;

    let y = ymin;
    for (let j = 0; j < p.height; j++) {
      // Start x
      let x = xmin;
      for (let i = 0; i < p.width; i++) {
        // Now we test, as we iterate z = z^2 + cm does z tend towards infinity?
        let a = x;
        let b = y;
        let n = 0;
        while (n < maxIterations) {
          const aa = a * a;
          const bb = b * b;
          const twoab = 2.0 * a * b;
          a = aa - bb + x;
          b = twoab + y;
          // Infinty in our finite world is simple, let's just consider it 16
          if (p.dist(aa, bb, 0, 0) > 16) {
            break; // Bail
          }
          n++;
        }

        // We color each pixel based on how long it takes to get to infinity
        // If we never got there, let's pick the color black
        const pix = (i + j * p.width) * 4;
        const norm = p.map(n, 0, maxIterations, 0, 1);
        let bright = p.map(p.sqrt(norm), 0, 1, 0, 255);
        if (n == maxIterations) {
          bright = 0;
        } else {
          // Gosh, we could make fancy colors here if we wanted
          p.pixels[pix + 0] = bright;
          p.pixels[pix + 1] = bright;
          p.pixels[pix + 2] = bright;
          p.pixels[pix + 3] = 255;
        }
        x += dx;
      }
      y += dy;
    }
    p.updatePixels();
  };
};

new p5(sketch);
