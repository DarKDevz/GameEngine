var loadInterval;
var MapData = { data: "" }
function changeMapData(data: string) {
    window.loaded = true;
    MapData.data = data;
    localStorage.setItem("map", MapData.data);
}
function doReload() {
    console.error("works");
    //Clean up all intervals
    let id = setTimeout(() => { }, 0)
    while (id--) {
        clearTimeout(id);
    }
    preload();
}
function checkLoad() {
    if (window.loaded) {
        clearInterval(loadInterval);
        engine = new Engine();
        window.windowResized = () => { engine.resize() };
        player = new Player();
        JsonMap(MapData);
    } else if (window.editorData) {
        changeMapData(window.editorData)
    } else if (localStorage.getItem("map")) {
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
    createCanvas(windowWidth, windowHeight, WEBGL);
    noSmooth();
    //Remove right click default behaviour
    document.oncontextmenu = function (e) {
        e.preventDefault();
    }
}
function draw() {
    //Make Sure it's loaded correctly
    if (!window.loaded) return;
    if (!window?.player?.update) return;
    if (!window?.engine?.getActiveScene) return;
    engine.draw()
}
