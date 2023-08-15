var loadInterval;
function changeMapData(data) {
    window.loaded = true;
    MapData.data = data;
    window.sessionStorage.setItem("map",MapData.data);
}
function doReload() {
    console.error("works");
    preload();
}
function checkLoad() {
    if(window.loaded) {
        clearInterval(loadInterval);
        engine = new Engine();
        player = new Player();
        JsonMap(MapData);
    }else if(window.editorData) {
        changeMapData(window.editorData)
    }else if(sessionStorage.getItem("map")) {
        changeMapData(sessionStorage.getItem("map"));
    }
}
function preload() {
    window.loaded = false;
    clearInterval(loadInterval);
    loadInterval = setInterval(checkLoad,200);
}
function setup() {
    //Initialize Game things
    createCanvas(windowWidth, windowHeight);
    //Remove right click default behaviour
	canvas.oncontextmenu = function (e) {
		e.preventDefault();
	}
    noSmooth();
    
}
function draw() {
    //Make Sure it's loaded correctly
    if(!window.loaded) return;
    if(!window?.player?.update) return; 
    if(!window?.engine?.getActiveScene) return; 
    clear();
    background(150, 230, 240);
    /*-------------PLAYER AND LEVEL DRAWING-----------------*/
    player.update();
    //Early Update
    engine.getActiveScene().earlyUpdate();
    player.camera();
    player.checkCollisions();
    engine.getActiveScene().display();
    engine.getActiveScene().customDraw(false);
    player.display();
    //Late Update
    engine.getActiveScene().lateUpdate();
    /*-------------PLAYER AND LEVEL DRAWING-----------------*/
}
