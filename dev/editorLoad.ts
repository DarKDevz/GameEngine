var MapData = { data: "" };
function changeMapData(data) {
    window.loaded = true;
    MapData.data = data;
    localStorage.setItem("map", MapData.data);
}
function doReload() {
    console.error("works");
    //Clean up all intervals
    preload();
}
async function checkLoad() {
    if (window.loaded) {
        await waitForEngine()
        engine = new Engine();
        window.windowResized = () => { engine.resize(); };
        player = new Player();
        LoadMap(MapData);
        return;
    }
    else if (window.editorData) {
        changeMapData(window.editorData);
    }
    else if (localStorage.getItem("map")) {
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
    };
    window._InstanceDrawer = new InstanceDrawer(plane);
    let x = 20;
    for(let i = 0; i < 20; i++) {
        for(let j = 0; j < 20; j++) {
        window._InstanceDrawer.add([(x*i)+200, x*j, 15],[20, 43, 11],[i-j*5,i-j/2,i-j],[70, 130, 180,70])
        }
    }
    /*window.exampleShader = createShader(window.testVert, window.testFrag);
    let matrixArray = window.exampleShader.initializedInstancedAttribute('aWorldMatrix', 5);
    // transformations in reverse order.
    matrixArray[0].translate([-247, 291, 15]);
    matrixArray[0].scale(200, 430, 110);
    matrixArray[1].translate([631, -212, 8]);
    matrixArray[1].scale(420, 100, 360);
    matrixArray[2].translate([314, -50, 33]);
    matrixArray[2].scale(150, 490, 250);
    matrixArray[3].translate([219, 489, 27]);
    matrixArray[3].scale(110, 120, 480);
    matrixArray[4].translate([256, 205, 47]);
    matrixArray[4].scale(300, 450, 300);
    matrixArray[4].rotateX(PI/2);
    noStroke();
    let colorArray = window.exampleShader.initializedInstancedAttribute('aMaterialColor', 5);
    colorArray[0] = 178 / 255; // rgb(178, 34, 34)
    colorArray[1] = 34 / 255;
    colorArray[2] = 34 / 255;
    colorArray[3] = 1;
    colorArray[4] = 178 / 255; // rgb(178, 34, 34)
    colorArray[5] = 34 / 255;
    colorArray[6] = 34 / 255;
    colorArray[7] = 1;
    colorArray[8] = 0; // rgb(0, 128, 0)
    colorArray[9] = 128 / 255;
    colorArray[10] = 0;
    colorArray[11] = 1;
    colorArray[12] = 0; // rgb(0, 128, 0)
    colorArray[13] = 128 / 255;
    colorArray[14] = 0;
    colorArray[15] = 1;
    colorArray[16] = 70 / 255; // rgb(70, 130, 180)
    colorArray[17] = 130 / 255;
    colorArray[18] = 180 / 255;
    colorArray[19] = 50 / 255;
    colorArray[20] = 70 / 255; // rgb(70, 130, 180)
    exampleShader.setUniform('useTexture',true);
    //exampleShader.setUniform('uSamplerr',p5.instance._renderer._emptyTexture);
    */
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
    if (window.exampleInst) {
        window._InstanceDrawer.draw()
        // shader(window.exampleShader);
        // exampleShader.setUniform('uTexture',engine.activeScene.boxes[0].sprite);
        // plane(1,1);
        // resetShader();
    }
}
window.exampleInst = false;
