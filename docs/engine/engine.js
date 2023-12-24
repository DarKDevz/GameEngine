var engine;
import("https://cdn.skypack.dev/@dimforge/rapier2d-compat").then((obj) => {
  obj.init().then(() => {
    window.RAPIER = obj;
  });
});
class Engine extends GameEvents {
  static removeListeners;
  static componentList;
  static fileTypeList;
  loading;
  constructor() {
    super();
    this.globalDefine(true);
    this.physics = engine?.physics ? true : false;
    this.scene = [];
    this.currentScene;
    this.files = {};
    let temp = {};
    let context = this;
    this.uuidList = new Proxy(temp, {
      set(target, key, value) {
        target[key] = value;
        context.eventListener[key]?.onload(value);
        return true;
      },
      get(target, key, receiver) {
        return target[key];
      }
    });
    this.usedUUID = [];
    this.hasUUID = false;
    this.assignedUUID = "";
    this.camera = engine?.camera ? engine.camera : new Camera(0, 0);
    this.editorZoom = this.camera.zoom;
    this.gui = createGraphics(windowWidth, windowHeight);
    this.guiObjects = Object.assign({}, engine?.guiObjects);
    this.mobile = navigator.userAgent.includes("Mobile");
    if (this.mobile) {
      mouseButton = "left";
    }
    this.world = new RAPIER.World({
      x: 0,
      y: 9.81
    });
    this.world.step();
    this.componentList = Engine.componentList;
    this.eventListener = {};
    this.collisionWorker;
    this.allCollisions = {};
    if (engine?.collisionWorker) {
      engine.collisionWorker.terminate();
    }
    this.collisionWorker ??= new Worker("engine/objects/collisionChecker.js");
    this.collisionWorker.addEventListener("message", (e) => {
      if (e.data.type === "cache") {
        this.allCollisions = e.data.value;
      }
    });
    setTimeout(() => {
      this.tryFirstLoad();
    }, 500);
  }
  tryFirstLoad() {
    if (window?.canvas?.width) {
      this.resize(width, height);
    } else {
      setTimeout(() => {
        this.tryFirstLoad();
      }, 500);
    }
  }
  checkCache(obj1, obj2) {
    let uuid1 = obj1?.uuid ? obj1.uuid : obj1;
    let uuid2 = obj2?.uuid ? obj2.uuid : obj2;
    if (this.allCollisions.hasOwnProperty(uuid1) && this.allCollisions.hasOwnProperty(uuid2)) {
      if (this.allCollisions[uuid1].hasOwnProperty(uuid2) && this.allCollisions[uuid2].hasOwnProperty(uuid1)) {
        return this.allCollisions[uuid1][uuid2] && this.allCollisions[uuid2][uuid1];
      }
    }
    return void 0;
  }
  resize(ww = windowWidth, wh = windowHeight) {
    resizeCanvas(ww, wh);
    engine.gui.resizeCanvas(ww, wh);
    this.getActiveScene()?.resize(ww, wh);
    for (let uuid in this.guiObjects) {
      let GUIElement = this.guiObjects[uuid];
      GUIElement?.resize(ww, wh);
    }
  }
  mouseScreen() {
    if (this.mobile) {
      let foundNonUsed;
      for (let touch of touches) {
        if (!touch?.used) {
          foundNonUsed = touch;
        }
      }
      if (foundNonUsed) {
        mouseIsPressed = true;
        mouseX = foundNonUsed.x;
        mouseY = foundNonUsed.y;
      } else {
        mouseIsPressed = false;
      }
    }
    let DPoint;
    let matrix;
    if (webglVersion === "webgl2") {
      let defaultEyeZ = height / 2 / Math.tan(p5.instance._renderer._curCamera.cameraFOV / 2);
      var ratio = p5.instance._renderer._curCamera.eyeZ / defaultEyeZ;
      matrix = new DOMMatrix(p5.instance._renderer.uMVMatrix.mat4);
      DPoint = new DOMPoint((mouseX - width / 2) * ratio, (mouseY - height / 2) * ratio, -p5.instance._renderer._curCamera.eyeZ);
    } else {
      matrix = drawingContext.getTransform();
      DPoint = new DOMPoint(mouseX * pixelDensity(), mouseY * pixelDensity());
    }
    return matrix.inverse().transformPoint(DPoint);
  }
  get activeScene() {
    return this.getActiveScene();
  }
  get cameraPos() {
    return this.camera.currentPos;
  }
  set cameraPos(obj) {
    this.camera.isLocked ? 0 : this.camera.follow(obj);
  }
  /*all events are here */
  deviceMoved(e) {
    this.activeScene?.deviceMoved(e, Boolean(window?.editor));
  }
  deviceTurned(e) {
    this.activeScene?.deviceTurned(e, Boolean(window?.editor));
  }
  deviceShaken(e) {
    this.activeScene?.deviceShaken(e, Boolean(window?.editor));
  }
  doubleClicked(e) {
    this.activeScene?.doubleClicked(e, Boolean(window?.editor));
  }
  mousePressed(e) {
    this.activeScene?.mousePressed(e, Boolean(window?.editor));
  }
  mouseReleased(e) {
    this.activeScene?.mouseReleased(e, Boolean(window?.editor));
  }
  mouseMoved(e) {
    this.activeScene?.mouseMoved(e, Boolean(window?.editor));
  }
  mouseDragged(e) {
    this.activeScene?.mouseDragged(e, Boolean(window?.editor));
  }
  mouseClicked(e) {
    this.activeScene?.mouseClicked(e, Boolean(window?.editor));
  }
  mouseWheel(e) {
    if (Boolean(window?.editor) && !overUI) {
      if (abs(e.deltaY) > abs(e.deltaX)) {
        engine.editorZoom -= constrain(e.deltaY, -8, 8) * 0.035 * engine.editorZoom;
        engine.editorZoom = constrain(engine.editorZoom, 0.01, 5);
      } else {
        editor.cameraPos.x += e.deltaX / engine.editorZoom;
      }
      e.preventDefault();
    }
    this.activeScene?.mouseWheel(e, Boolean(window?.editor));
  }
  touchMoved(e) {
    this.activeScene?.touchMoved(e, Boolean(window?.editor));
  }
  keyPressed(e) {
    this.activeScene?.keyPressed(e, Boolean(window?.editor));
  }
  keyReleased(e) {
    this.activeScene?.keyReleased(e, Boolean(window?.editor));
  }
  keyTyped(e) {
    this.activeScene?.keyTyped(e, Boolean(window?.editor));
  }
  loadFromObject(obj, autoEvents = false) {
    ScenesfromObject(obj);
    if (autoEvents) {
      this.Initiate();
    }
  }
  Initiate() {
    window.draw ??= this.draw.bind(this);
    window.windowResized ??= () => {
      this.mobile ? setTimeout(() => this.resize(), 200) : this.resize();
    };
  }
  setup() {
    document.oncontextmenu = function(e) {
      e.preventDefault();
    };
  }
  draw() {
    this.gui.clear();
    push();
    background(150, 230, 240);
    player.update();
    this.activeScene?.earlyUpdate();
    player.camera();
    player.checkCollisions();
    this.activeScene?.display();
    player.display();
    this.activeScene?.lateUpdate();
    pop();
    this.gui.fill(0);
    this.gui.text("FPS: " + round(frameRate() / 10) * 10, 50, 50);
    if (webglVersion !== "p2d") {
      drawingContext.disable(drawingContext.DEPTH_TEST);
      image(this.gui, -width / 2, -height / 2, width, height);
      drawingContext.enable(drawingContext.DEPTH_TEST);
    } else {
      image(this.gui, 0, 0, width, height);
    }
  }
  onload(uuid, func) {
    this.eventListener[uuid] = Object.assign({ onload: func }, this.eventListener[uuid]);
    if (this.uuidList[uuid]) {
      func(this.uuidList[uuid]);
    }
  }
  addObj(box, doId = false) {
    box.init();
    console.log(box.init);
    box.typeId = doId ? box.typeId : void 0;
    this.getActiveScene()?.boxes.push(box);
  }
  addScriptByName(name, vals, obj) {
    let params = {
      fileUUID: this.getByReference("name", name).UUID,
      vals
    };
    obj.components.push(new engine.componentList["gameScript"]({
      ...params,
      obj
    }));
  }
  deleteGameFile(id, value = false) {
    let file = this.files[this.getByReference(id, value).UUID];
    let whoUses = file.whoUses;
    if (file.type === ".js") {
      file.data = "";
      for (let ObjId in whoUses) {
        let script = whoUses[ObjId];
        script.loadFile(file);
      }
    }
    for (let i in whoUses) {
      for (let compInd in whoUses[i].ownObject.components) {
        let comp = whoUses[i].ownObject.components[compInd];
        if (whoUses[i] === comp) {
          whoUses[i].ownObject.components.splice(compInd, 1);
        }
      }
    }
    delete this.files[this.getByReference(id, value).UUID];
  }
  getByReference(id, value = false) {
    if (this.files[id]) {
      return this.files[id];
    } else {
      for (let fileUUID in this.files) {
        let file = this.files[fileUUID];
        if (!value) {
          for (let type in file.references) {
            let reference = file.references[type];
            if (reference == id)
              return file;
          }
        }
        if (file.references[id] === value)
          return file;
      }
    }
  }
  customFileUUID(fileType) {
    if (this.hasUUID) {
      this.hasUUID = false;
      return this.assignedUUID;
    }
    let fileName = fileType.slice(1);
    var UUID = fileName + "file";
    let stack = -1;
    while (this.files[UUID]) {
      stack++;
      UUID = fileName + "file" + stack;
      if (stack >= 99999999) {
        throw new Error("Stack exceeded! Math.random is broken or uuid list is filled");
      }
    }
    return UUID;
  }
  assignUUID(UUID) {
    this.hasUUID = true;
    this.assignedUUID = UUID;
  }
  getfromUUID(UUID) {
    return this.uuidList[UUID];
  }
  getActiveScene() {
    return this.scene[this.currentScene];
  }
  changeUUID(ogUUId, newUUID) {
    let ogVal = this.uuidList[ogUUId];
    delete this.uuidList[ogUUId];
    this.uuidList[newUUID] = ogVal;
    return this.uuidList[newUUID];
  }
  generateUUID() {
    if (this.hasUUID) {
      this.hasUUID = false;
      return this.assignedUUID;
    }
    var UUID = "0x" + (Math.random() * 1e17).toString(16);
    let stack = 0;
    while (this.uuidList[UUID] || this.usedUUID.includes(UUID)) {
      stack++;
      UUID = "0x" + (Math.random() * 1e17).toString(16);
      if (stack >= 99999999) {
        throw new Error("Stack exceeded! Math.random is broken or uuid list is filled");
      }
    }
    this.usedUUID.push(UUID);
    return UUID;
  }
  touchStarted(e) {
    for (let uuid in this.guiObjects) {
      let GUIElement = this.guiObjects[uuid];
      GUIElement.touchStarted();
    }
    this.updateGui(false);
    this.activeScene?.touchStarted(e, Boolean(window?.editor));
    if (e.srcElement === canvas)
      return false;
  }
  touchEnded(e) {
    for (let uuid in this.guiObjects) {
      let GUIElement = this.guiObjects[uuid];
      GUIElement.touchEnded();
    }
    for (let touch of touches) {
      touch.used = void 0;
    }
    if (!fullscreen()) {
      fullscreen(true);
    }
    this.activeScene?.touchEnded(e, Boolean(window?.editor));
    if (e.srcElement === canvas)
      return false;
  }
  updateGui(display = true, forceDraw = false, update = true) {
    for (let uuid in this.guiObjects) {
      let GUIElement = this.guiObjects[uuid];
      if (GUIElement.mobileOnly) {
        if (engine.mobile) {
          if (update)
            GUIElement.update();
          if (display)
            GUIElement.display();
        } else if (forceDraw) {
          if (update)
            GUIElement.update();
          if (display)
            GUIElement.display();
        }
      }
      if (!GUIElement.mobileOnly) {
        if (update)
          GUIElement.update();
        if (display)
          GUIElement.display();
      }
    }
  }
  customDraw(doDraw) {
    if (doDraw) {
      this.activeScene?.customDraw(true);
      this.updateGui(true, true, false);
    }
  }
}
class Camera {
  constructor(x, y, zoom = 1) {
    this.target = { x, y };
    this.currentPos = { x, y };
    this.zoom = zoom;
    this.isLocked = false;
  }
  lookAt(x, y) {
    this.target = { x, y };
  }
  follow(obj) {
    this.target = obj;
  }
  setZoom(number) {
    this.zoom = number;
  }
  updateCameraPos() {
    this.currentPos = {
      x: this.target.x,
      y: this.target.y
    };
    return this.target;
  }
}
Engine.removeListeners = [];
