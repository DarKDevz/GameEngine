
import * as test from "./examples/platformer.json" assert {type: "json"};

window.topDiv = undefined;
window.windowResized= function () {
    engine.resize(window.topDiv.clientWidth, window.topDiv.clientHeight);
    //UI Resize
    editor.onResize();
}
window.preload= function () {
    window.loaded = false;
    engine = new Engine();
    player = new Player();
	engine.loadFromObject(test.default)
}
window.setup= function () {
    //Initialize Game things
    window.topDiv = document.getElementById("topDiv")
    let cnv = createCanvas(window.topDiv.clientWidth, window.topDiv.clientHeight);
    cnv.parent(document.getElementById("topDiv"))
    noSmooth();
    //Initialize Editor things
    editor  = new Editor()
    editor.onSetup();
    PanelsInit()
    engine.cameraPos = editor.cameraPos;
    engine.camera.isLocked = true;
}
window.draw= function () {
    //engine.load();
    clear();
    background(150, 230, 240);
    /*-------------PLAYER AND LEVEL DRAWING-----------------*/
    //Early Update
    engine.getActiveScene().earlyUpdate(false);
    engine.getActiveScene().display(true);
    engine.getActiveScene().customDraw(editor.levelMode);
    //Late Update
    engine.getActiveScene().lateUpdate(false);
    /*-------------PLAYER AND LEVEL DRAWING-----------------*/
    //Editor things
    editor.onUpdate()
}
