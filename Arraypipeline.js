const sin = Math.sin;
const cos = Math.cos;
const theta = Math.PI/4;
const zoom = 2;
const offset = [1, -3];

const pipeline = [
    function rotate(p) {
        return {
            x: p.x * cos(theta) - p.y * sin(theta),
            y: p.x * sin(theta) + p.y * cos(theta),
        };
    },
    function scale(p) {
        return { x: p.x * zoom, y: p.y * zoom };
    },
    function translate(p) {
        return { x: p.x + offset[0], y: p.y + offset[1] };
    },
];

// pipeline is now an array of functions for a specific 2D transform
// we can now transform a point:

const p = { x: 1, y: 1 };
let p2 = p;
for(let i=0; i<pipeline.length; i++) {
    p2 = pipeline[i](p2);
}

// p2 is now p1 rotated 45 degrees (pi/4 radians) around the origin,
// moved 2 units farther from the origin, and translated 1 unit to the
// right and 3 units down