var MapData = { data: "" }
function changeMapData(data: string) {
    window.loaded = true;
    MapData.data = data;
    localStorage.setItem("map", MapData.data);
}
function doReload() {
    console.error("works");
    //Clean up all intervals
    preload();
}
function checkLoad() {
    if (window.loaded) {
        engine = new Engine();
        window.windowResized = () => { engine.resize() };
        player = new Player();
        JsonMap(MapData);
        return;
    } else if (window.editorData) {
        changeMapData(window.editorData)
    } else if (localStorage.getItem("map")) {
        changeMapData(localStorage.getItem("map"));
    }
    setTimeout(checkLoad, 200);
}
function preload() {
    window.loaded = false;
    setTimeout(checkLoad, 200);
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
