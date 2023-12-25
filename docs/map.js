window.topDiv = undefined;
window.windowResized = function () {
    engine.resize(widthDiv.clientWidth, heightDiv.clientHeight);
    //UI Resize
    editor.onResize();
};
window.preload = async function () {
            await waitForEngine()
    engine = new Engine();
    player = new Player();
    engine.physics = false;
    const response = await fetch("./examples/platformer.json");
    const data = await response.json();
    window.loaded = false;
    engine.loadFromObject(data);
    textFont(loadFont(defaultFont))
};
window.setup = function () {
    //Initialize Game things
    window.widthDiv =  document.getElementById('rightHolder').parentNode;
    window.heightDiv = document.getElementById('topDiv');
    let interval = setInterval(()=>{
        if(heightDiv.clientHeight!==0) {
        console.log(widthDiv.clientWidth, heightDiv.clientHeight);
        createCanvas(widthDiv.clientWidth, heightDiv.clientHeight, WEBGL);
        noSmooth();
        //Initialize Editor things
        editor = new Editor();
        editor.onSetup();
        Object.defineProperty(engine.camera,"zoom",{set:()=>{},get:()=>{return engine.editorZoom}})
        PanelsInit();
        engine.cameraPos = editor.cameraPos;
        engine.camera.isLocked = true;
        windowResized();
        heightDiv.insertBefore(canvas,heightDiv.firstChild)
        canvas.style.zIndex = -1;
        canvas.style.position = 'absolute';
        document.getElementById('rightHolder').addEventListener('sl-reposition', event => {
            engine.resize(widthDiv.clientWidth, heightDiv.clientHeight)
          });
          document.getElementById('leftDiv').parentNode.addEventListener('sl-reposition', event => {
            engine.resize(widthDiv.clientWidth, heightDiv.clientHeight)
            ContentBrowserPanel.Holder.size(widthDiv.clientWidth);
          });
        clearInterval(interval)
        }
    },500)
};
window.draw = function () {
    //engine.load();
    if(!window?.engine?.getActiveScene()) return;
    if(editor) {
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
    if (webglVersion !== "p2d") {
        drawingContext.disable(drawingContext.DEPTH_TEST);
        image(engine.gui, -width / 2, -height / 2, width, height);
        drawingContext.enable(drawingContext.DEPTH_TEST);
    }
    else {
        image(engine.gui, 0, 0, width, height);
    }
}
};
