window.topDiv = undefined;
window.windowResized = function () {
    engine.resize(window.topDiv.clientWidth, window.topDiv.clientHeight);
    //UI Resize
    editor.onResize();
};
window.preload = async function () {
    engine = new Engine();
    player = new Player();
    const response = await fetch("./examples/platformer.json");
    const data = await response.json();
    window.loaded = false;
    engine.loadFromObject(data);
};
window.setup = function () {
    //Initialize Game things
    window.topDiv = document.getElementById("topDiv");
    let cnv = createCanvas(window.topDiv.clientWidth, window.topDiv.clientHeight);
    cnv.parent(document.getElementById("topDiv"));
    noSmooth();
    //Initialize Editor things
    editor = new Editor();
    editor.onSetup();
    PanelsInit();
    engine.cameraPos = editor.cameraPos;
    engine.camera.isLocked = true;
    windowResized();
};
window.draw = function () {
    //engine.load();
    clear();
    engine.gui.clear();
    push();
    background(150, 230, 240);
    /*-------------PLAYER AND LEVEL DRAWING-----------------*/
    //Early Update
    engine.activeScene?.earlyUpdate(false);
    engine.activeScene?.display(true);
    engine.customDraw(editor.levelMode);
    //Late Update
    engine.activeScene?.lateUpdate(false);
    /*-------------PLAYER AND LEVEL DRAWING-----------------*/
    //Editor things
    editor.onUpdate();
    pop();
    image(engine.gui, 0, 0, width, height);
};
