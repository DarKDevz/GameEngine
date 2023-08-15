import * as test from "./examples/platformer.json" assert { type: "json" };
let lowestFrameRate = 60;
let sceneObj = test.default;
globalThis.preload = function () {
    player = new Player();
    engine = new Engine();
    engine.loadFromObject(sceneObj, true);
};
globalThis.setup = function () {
    createCanvas(windowWidth, windowHeight);
    noSmooth();
    //Remove right click default behaviour
    canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };
    engine.setup();
};