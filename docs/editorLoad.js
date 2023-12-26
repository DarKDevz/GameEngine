var MapData = { data: "" };
function changeMapData(data) {
  window.loaded = true;
  MapData.data = data;
  localStorage.setItem("map", MapData.data);
}
function doReload() {
  console.error("works");
  preload();
}
async function checkLoad() {
  if (window.loaded) {
    await waitForEngine();
    engine = new Engine();
    window.windowResized = () => {
      engine.resize();
    };
    player = new Player();
    LoadMap(MapData);
    return;
  } else if (window.editorData) {
    changeMapData(window.editorData);
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
  createCanvas(windowWidth, windowHeight, WEBGL);
  noSmooth();
  document.oncontextmenu = function(e) {
    e.preventDefault();
  };
  window._InstanceDrawer = new InstanceDrawer(plane);
  let x = 20;
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      window._InstanceDrawer.add([x * i + 200, x * j, 15], [20, 43, 11], [i - j * 5, i - j / 2, i - j], [70, 130, 180, 70]);
    }
  }
}
function draw() {
  if (!window.loaded)
    return;
  if (!window?.player?.update)
    return;
  if (!window?.engine?.getActiveScene)
    return;
  engine.draw();
  if (window.exampleInst) {
    window._InstanceDrawer.draw();
  }
}
window.exampleInst = false;
