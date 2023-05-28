const canvas = document.getElementById('dots'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [], // Array that contains the stars
    FPS = 60, // Frames per second
    x = 100; // Number of stars

// Push stars to array

for (let i = 0; i < x; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 1,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25
    });
}

let distances = []; // 2D array to hold distances

function calculateDistances() {
    for (let i = 0; i < stars.length; i++) {
        distances[i] = []; // initialize inner array
        for (let j = 0; j < stars.length; j++) {
            // If i < j, calculate and store distance. Otherwise, copy from the earlier calculated value.
            if (i < j) {
                distances[i][j] = distance(stars[i], stars[j]);
            } else {
                distances[i][j] = distances[j][i] || 0;
            }
        }
    }
}

// Draw the scene

function draw() {
    // set canvas w and h
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.globalCompositeOperation = 'lighter';
    ctx.beginPath();

    for (let i = 0, x = stars.length; i < x; i++) {
        let starI = stars[i];
        ctx.moveTo(starI.x, starI.y);
        for (let j = 0, x = stars.length; j < x; j++) {
            let starII = stars[j];
            if (distances[i][j] < 150) {
                ctx.lineTo(starII.x, starII.y);
            }
        }
    }
    ctx.lineWidth = 0.05;
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

function distance(point1, point2) {
    let xs = 0;
    let ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
}

// Update star locations

function update() {
    for (let i = 0, x = stars.length; i < x; i++) {
        let s = stars[i];

        s.x += s.vx / FPS;
        s.y += s.vy / FPS;

        if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
        if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
    }
}
// Update and draw

let lastTime = Date.now();
const frameTime = 1000 / FPS; // duration of a frame in milliseconds

function tick() {
    let now = Date.now();
    let elapsed = now - lastTime;

    // if enough time has elapsed, draw the next frame
    if (elapsed > frameTime) {
        lastTime = now - (elapsed % frameTime);
        calculateDistances();
        draw();
        update();
    }

    requestAnimationFrame(tick);
}

tick();

// load https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css onto the page after document loads
window.addEventListener('load', () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
});
