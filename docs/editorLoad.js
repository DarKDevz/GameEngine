var loadInterval;
function changeMapData(data) {
    window.loaded = true;
    MapData.data = data;
    localStorage.setItem("map", MapData.data);
}
function doReload() {
    console.error("works");
    preload();
}
function checkLoad() {
    if (window.loaded) {
        clearInterval(loadInterval);
        engine = new Engine();
        window.windowResized = () => { engine.resize(); };
        player = new Player();
        JsonMap(MapData);
        engine.cameraPos = player.cameraPos;
    }
    else if (window.editorData) {
        changeMapData(window.editorData);
    }
    else if (localStorage.getItem("map")) {
        changeMapData(localStorage.getItem("map"));
    }
}
function preload() {
    window.loaded = false;
    clearInterval(loadInterval);
    loadInterval = setInterval(checkLoad, 200);
}
function setup() {
    //Initialize Game things
    createCanvas(windowWidth, windowHeight);
    //Remove right click default behaviour
    canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };
    noSmooth();
}
function draw() {
    //Make Sure it's loaded correctly
    if (!window.loaded)
        return;
    if (!window?.player?.update)
        return;
    if (!window?.engine?.getActiveScene)
        return;
    engine.draw();
}
