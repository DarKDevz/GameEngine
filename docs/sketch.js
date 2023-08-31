let lowestFrameRate = 60;
globalThis.preload = async function () {
    engine = new Engine();
    player = new Player();
    const response = await fetch("./examples/platformer.json");
    const data = await response.json();
    engine.loadFromObject(data, true);
};
globalThis.setup = function () {
    createCanvas(windowWidth, windowHeight);
    noSmooth();
    //Remove right click default behaviour
    document.oncontextmenu = function (e) {
        e.preventDefault();
    };
    engine.setup();
};
