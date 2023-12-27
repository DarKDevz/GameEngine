var editor;
var lastWasPressed = false, overUI = false, Pressed = lastWasPressed, button = null, exampleButton = null, refreshButton = null, addButton = null, selectedObjects = [], lastScene = null, inputFile = null, visibleInputFile = null, saveButton = null, copyButton = null, removeButton = null, levelButton = null, gridSize = 1, lastUsedMouse = { x: false, y: false }, mouseDiff = { x: 0, y: 0 }, actionButtons = null, sideMenu = null, boxInfo = null, info = {}, lastInfo = {}, infoDivs = [], infoDivsHolder = [], infoIndexes = [], addSelect = null, id = null, openerState = {}, sceneHolder = [], ContentBrowserPanel = {
  set files(value) {
    engine.files = value;
  },
  get files() {
    return engine.files;
  },
  Divs: []
}, OldFiles = [];
class BaseEditor {
  constructor() {
    this.updates = {
      browser: false,
      menu: false,
      level: true
    };
    this.levelMode = false;
    this.cameraPos = createVector(0, 0);
    this.playingWindow;
    this.creatingNew = false;
    this.newObject;
    this.valChanged = new Event("ValueChanged");
    this.copiedObj = [];
    this.gridSize = 1;
    this.pasted = false;
    this.startPos = createVector(0, 0);
    this.tryOffset = {};
  }
  readFileAsDataURL(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result.toString());
      reader.readAsDataURL(file);
    });
  }
  deleteInfoDivs() {
    for (let t_info of infoDivs) {
      t_info.remove();
    }
  }
  openContextMenu(uuid) {
    let objContextMenu = this.fromReference("#objectContext");
    this.contextObj = uuid;
    objContextMenu.show();
    objContextMenu.elt.style.position = "absolute";
    objContextMenu.position(winMouseX, winMouseY);
  }
  openBrowserContext(_file) {
    let fileContext = this.fromReference("#fileContext");
    fileContext.show();
    fileContext.elt.style.position = "absolute";
    fileContext.position(winMouseX, winMouseY);
    this.contextObj = _file;
  }
  removeMapObject() {
    for (let selectedId in selectedObjects) {
      let objId = selectedObjects[selectedId];
      removeObject(objId);
      delete selectedObjects[selectedId];
    }
    engine.getActiveScene().boxes = getCurrentBoxes().filter((_) => {
      return _;
    });
    selectedObjects = selectedObjects.filter((_) => {
      return _;
    });
    this.deleteInfoDivs();
  }
  onSetup() {
    if (button)
      return;
    canvas.ondragover = (event) => {
      event.preventDefault();
    };
    canvas.ondrop = (event) => {
      event.preventDefault();
      if (event.dataTransfer.files[0].type === "application/json") {
        event.dataTransfer.files[0].text().then(
          (data) => {
            engine = new Engine();
            LoadMap({ data });
            engine.cameraPos = editor.cameraPos;
          }
        );
      }
    };
    button = this.fromReference("playButton");
    Engine.removeListeners.push((obj) => {
      editor.updates.level = true;
    });
    this.fromReference("leftDiv");
    let bottomDiv = this.fromReference("bottomDiv");
    bottomDiv.elt.ondrop = (event) => {
      this.makeFile(event);
    };
    bottomDiv.elt.ondragover = (event) => {
      event.preventDefault();
    };
    inputFile = createFileInput(
      (file) => {
        editor.updates.browser = true;
        editor.updates.menu = true;
        editor.updates.level = true;
        engine = new Engine();
        LoadMap(file);
        engine.cameraPos = editor.cameraPos;
      }
    );
    inputFile.elt.accept = ".js,.json";
    inputFile.style("display: none");
    visibleInputFile = this.fromReference("loadFile");
    visibleInputFile.mouseClicked((e) => {
      inputFile.elt.click(e);
    });
    this.uiElement(visibleInputFile);
    let addScene = this.fromReference("addScene");
    addScene.mouseReleased(() => {
      engine.scene.push(new Level([], createVector(40, 40), 400));
      editor.updates.level = true;
    });
    addButton = this.fromReference("addButton");
    addButton.mouseReleased(() => {
      this.creatingNew = !this.creatingNew;
    });
    addSelect = this.fromReference("addSelect");
    Object.keys(classes).forEach((element) => {
      addSelect.option(element);
    });
    saveButton = this.fromReference("saveFile");
    saveButton.mouseReleased(this.saveMap);
    this.uiElement(saveButton);
    let showScenePanel = this.fromReference("createScene");
    showScenePanel.mousePressed(() => {
      let sceneMaker = this.fromReference("#sceneMaker");
      sceneMaker.show();
    });
    exampleButton = this.fromReference("newButton");
    exampleButton.mouseReleased(() => {
      let emptyExample = {
        version: 1.3,
        file: [],
        GUI: { default: true },
        scenes: {
          "0": {
            Data: [[0, 100, 100, 500, 50]],
            sceneData: [0, 400, -10, 500]
          }
        },
        _font: { default: true, value: "" },
        is3D: this.fromReference("#is3D").checked(),
        defaultPlayer: this.fromReference("#defaultPlayer").checked()
      };
      engine = new Engine();
      ScenesfromObject(emptyExample);
      for (let func of Engine.removeListeners) {
        if (typeof func === "function") {
          func();
        }
      }
      engine.cameraPos = this.cameraPos;
      let sceneMaker = this.fromReference("#sceneMaker");
      sceneMaker.hide();
    });
    let closeButton = this.fromReference("closeButton");
    closeButton.mousePressed(() => {
      let sceneMaker = this.fromReference("#sceneMaker");
      sceneMaker.hide();
    });
    refreshButton = this.fromReference("refreshButton");
    refreshButton.mousePressed(() => {
      let file = { data: SaveMap() };
      editor.updates.browser = true;
      editor.updates.menu = true;
      editor.updates.level = true;
      engine = new Engine();
      LoadMap(file);
      engine.cameraPos = this.cameraPos;
    });
    sideMenu = createDiv();
    sideMenu.size(300);
    sideMenu.style("max-height:calc(100vh - 20px);overflow:auto;height:fit-content;background-color: rgba(0, 0, 0, 0.25);");
    sideMenu.position(windowWidth - sideMenu.size().width, 0);
    sideMenu.id("sideMenu");
    this.uiElement(sideMenu);
    let holdAll = document.getElementById("bottomDiv");
    ContentBrowserPanel.Holder = createDiv();
    ContentBrowserPanel.Holder.parent(holdAll);
    ContentBrowserPanel.Holder.size(window.widthDiv.clientWidth, holdAll.clientHeight);
    ContentBrowserPanel.Main = createDiv();
    ContentBrowserPanel.Main.parent(ContentBrowserPanel.Holder);
    let _ = createDiv();
    let cntentBtn = createDiv("ContentBrowserPanel");
    cntentBtn.parent(_);
    let _select = createSelect();
    _select.parent(_);
    let newList = Object.keys(Engine.fileTypeList);
    for (let name of newList) {
      _select.option(name);
    }
    _select.elt.title = "Select";
    let addFilebtn = createButton("add");
    addFilebtn.elt.title = "Add new component";
    addFilebtn.style("cursor:pointer");
    addFilebtn.mousePressed(() => {
      let file = addGameFile("", _select.value().toString(), {});
      content.changeName(file);
    });
    addFilebtn.parent(_);
    cntentBtn.mousePressed(showBrowserPanel.bind(this));
    cntentBtn.style("cursor: pointer; width: fit-content;");
    _.parent(ContentBrowserPanel.Main);
    ContentBrowserPanel.HUD = createDiv();
    ContentBrowserPanel.HUD.parent(ContentBrowserPanel.Main);
    ContentBrowserPanel.Holder.class("contentBrowser");
    ContentBrowserPanel.HUD.style("display: flex; align-items: center; flex-flow: row wrap; place-content: stretch space-around;     justify-content: flex-start; align-content: center; flex-direction: row; flex-wrap: wrap;");
    ContentBrowserPanel.Main.class("accordion-content");
    ContentBrowserPanel.Main.elt.style.maxHeight = "100%";
    ContentBrowserPanel.Main.maxHeight = "";
    ContentBrowserPanel.Main.style("position:relative;background-color: rgba(0, 0, 0, 0.25);overflow:auto;");
    this.uiElement(ContentBrowserPanel.Main);
    actionButtons = createDiv();
    actionButtons.id("actionMenu");
    actionButtons.parent("sideMenu");
    copyButton = createButton("Copy").class("allButtons");
    copyButton.mousePressed(this.copyObject.bind(this));
    copyButton.parent("actionMenu");
    copyButton.elt.title = "Copy Object(s)";
    this.uiElement(copyButton);
    removeButton = createButton("Remove").class("allButtons");
    removeButton.mousePressed(this.removeMapObject.bind(this));
    removeButton.parent("actionMenu");
    removeButton.elt.title = "Remove Object(s)";
    this.uiElement(removeButton);
    levelButton = createButton("Level").class("allButtons");
    levelButton.mousePressed(this.levelScreen.bind(this));
    levelButton.parent("actionMenu");
    levelButton.elt.title = "Show/Hide UI and Scene Variables";
    this.uiElement(levelButton);
    button.mousePressed(() => {
      if (this.playingWindow && !this.playingWindow.closed) {
        this.playingWindow.editorData = SaveMap();
        this.playingWindow.doReload();
      } else {
        this.playingWindow = window.open("editor.html");
        this.playingWindow.editorData = SaveMap();
      }
    });
    lastScene = engine.currentScene;
    this.cameraPos = createVector(0, 0);
    let fileContext = this.fromReference("#fileContext");
    fileContext.elt.addEventListener("mouseleave", () => {
      fileContext.hide();
    });
    fileContext.mouseReleased((e) => {
      switch (e.target.innerText) {
        case "Rename":
          if (this.contextObj)
            content.changeName(this.contextObj);
          fileContext.hide();
          break;
        case "Delete":
          if (this.contextObj?.UUID)
            engine.deleteGameFile(this.contextObj.UUID);
          fileContext.hide();
          break;
      }
    });
    let objContextMenu = this.fromReference("#objectContext");
    objContextMenu.elt.addEventListener("mouseleave", () => {
      objContextMenu.hide();
    });
    objContextMenu.mouseReleased((e) => {
      switch (e.target.innerText) {
        case "Copy":
          let copiedObj = {
            vals: engine.getfromUUID(this.contextObj).getParameters(),
            type: engine.getfromUUID(this.contextObj).typeId || engine.getfromUUID(this.contextObj).constructor.name,
            components: engine.getfromUUID(this.contextObj).jsonComponents()
          };
          this.copiedObjs = [copiedObj];
          objContextMenu.hide();
          break;
        case "Paste":
          let scene = engine.getfromUUID(this.contextObj)?.scene;
          if (scene && this.copiedObjs) {
            for (let copiedObj2 of this.copiedObjs) {
              if (copiedObj2.type === "" || copiedObj2.type === void 0) {
                console.warn("Empty type means not copyable");
                continue;
              }
              let _obj = addObj(copiedObj2.type, copiedObj2.vals, scene);
              for (let component of copiedObj2.components) {
                let componentClass = engine.componentList[component.name];
                _obj.components.push(new componentClass({ ...component.params, obj: _obj }));
              }
              if (engine.activeScene === engine.scene[scene])
                _obj.init();
              engine.scene[scene].boxes.push(_obj);
            }
            setTimeout(() => editor.updates.level = true, 500);
          }
          break;
        case "Delete":
          removeObject(this.contextObj);
          objContextMenu.hide();
          break;
      }
    });
    let sceneContext = this.fromReference("#sceneContext");
    sceneContext.elt.addEventListener("mouseleave", () => {
      sceneContext.hide();
    });
    sceneContext.mouseReleased((e) => {
      switch (e.target.innerText) {
        case "Paste":
          let scene = this.sceneContext;
          if (scene !== void 0 && this.copiedObjs) {
            for (let copiedObj of this.copiedObjs) {
              if (copiedObj.type === "" || copiedObj.type === void 0) {
                console.warn("Empty type means not copyable");
                continue;
              }
              let _obj = addObj(copiedObj.type, copiedObj.vals, "" + scene);
              for (let component of copiedObj.components) {
                let componentClass = engine.componentList[component.name];
                _obj.components.push(new componentClass({ ...component.params, obj: _obj }));
              }
              if (engine.activeScene === engine.scene[scene])
                _obj.init();
              engine.scene[scene].boxes.push(_obj);
            }
            setTimeout(() => editor.updates.level = true, 500);
          }
          break;
        case "Delete":
          this.removeScene(this.sceneContext);
          sceneContext.hide();
          break;
      }
    });
  }
  async makeFile(event) {
    event.preventDefault();
    if (!event?.dataTransfer?.files[0])
      return;
    let dragFile = event.dataTransfer.files[0];
    let newName = dragFile.name.split(".");
    newName.pop();
    newName = newName.join(".");
    let data;
    if (dragFile.type === "text/javascript") {
      data = await dragFile.text();
    } else if (dragFile.type.startsWith("image")) {
      data = await this.readFileAsDataURL(dragFile);
    } else {
      return;
    }
    let file = addGameFile(data, dragFile.type === "text/javascript" ? ".js" : ".img");
    content.changeName(file, newName);
    return file;
  }
  fromReference(id2) {
    let _ = select(id2.includes("#") ? id2 : "#" + id2);
    this.uiElement(_);
    return _;
  }
  updateLevels() {
    let leftDiv = document.getElementById("leftDiv");
    for (let oldScene of sceneHolder) {
      oldScene.remove();
    }
    for (let scene of engine.scene) {
      scene.addSceneBtn(leftDiv, openerState);
    }
  }
  removeScene(ind) {
    engine.scene.splice(ind, 1);
    for (let i = ind; i < engine.scene.length; i++) {
      engine.scene[i].ind = i;
      for (let obj of engine.scene[i].boxes) {
        obj.scene = "" + i;
      }
    }
    editor.updates.level = true;
    if (engine.currentScene < this.sceneContext)
      return;
    let file = { data: SaveMap() };
    editor.updates.browser = true;
    editor.updates.menu = true;
    engine = new Engine();
    LoadMap(file);
    engine.cameraPos = editor.cameraPos;
    editor.updates.level = true;
  }
  openSceneContext(id2) {
    if (this.fromReference("#objectContext").elt.style.display === "block")
      return;
    let sceneContext = this.fromReference("#sceneContext");
    this.sceneContext = id2;
    sceneContext.show();
    sceneContext.elt.style.position = "absolute";
    sceneContext.position(winMouseX, winMouseY);
  }
  saveMap() {
    let jsMap = createWriter("map.json");
    jsMap.write(SaveMap());
    jsMap.close();
  }
  onUpdate() {
  }
  onResize() {
    sideMenu.position(windowWidth - 300, 0);
  }
  uiElement(element) {
    element.mouseOver(() => overUI = true);
    element.mouseOut(() => overUI = false);
  }
  copyObject() {
    for (let _ = selectedObjects.length; _ >= 0; _--) {
      let objs = selectedObjects[_];
      if (!engine.getfromUUID(objs)) {
        selectedObjects.splice(_, 1);
      }
    }
    this.copiedObjs = [];
    for (let objId of selectedObjects) {
      let copiedObj = {
        vals: engine.getfromUUID(objId).getParameters(),
        type: engine.getfromUUID(objId).typeId,
        components: engine.getfromUUID(objId).jsonComponents()
      };
      this.copiedObjs.push(copiedObj);
    }
  }
  levelScreen() {
    this.levelMode = !this.levelMode;
    this.deleteInfoDivs();
    if (this.levelMode) {
      const activeScene = engine.getActiveScene();
      const levelValues = activeScene.getLevelValues();
      const levelValueNames = activeScene.getLevelValueNames();
      const actualLevelValues = activeScene.getActualLevelValues();
      for (let i = 0; i < levelValues.length; i++) {
        addMenuInput(
          levelValueNames[i],
          (val) => {
            const actValue = parseStringNum(val, activeScene[actualLevelValues[i]]);
            activeScene[actualLevelValues[i]] = actValue;
            levelValues[i] = actValue;
          },
          () => levelValues[i]
        );
      }
      addMenuInput(
        "Grid Size",
        (value) => {
          this.gridSize = parseStringNum(value, this.gridSize, true);
        },
        () => {
          return this.gridSize;
        }
      );
    } else {
      this.removeSelection();
      info = [];
    }
  }
  removeSelection() {
    selectedObjects = [];
    this.tryOffset = {};
    for (let t_info of infoDivs) {
      t_info.remove();
    }
  }
}
class Editor3D extends BaseEditor {
  constructor() {
    super();
  }
  onSetup() {
    super.onSetup();
  }
}
class Editor extends BaseEditor {
  constructor() {
    super();
    this.selectionBox = [];
    this.isCircle = false;
  }
  onSetup() {
    super.onSetup();
  }
  startSelect() {
    if (lastWasPressed !== "startedOverUi" && lastWasPressed != Pressed && Pressed && mouseButton === LEFT) {
      this.selectionBox.push(this.mouseCoords().array());
      this.startPos = this.mouseCoords();
    }
  }
  moveScreen() {
    let diffX = (mouseX - pmouseX) / engine.camera.zoom;
    let diffY = (mouseY - pmouseY) / engine.camera.zoom;
    mouseDiff = { x: diffX, y: diffY };
    if (selectedObjects.length !== 0) {
      this.moveObjects(mouseDiff);
    } else {
      this.cameraPos.x -= diffX;
      this.cameraPos.y -= diffY;
    }
  }
  moveObjects(frameDiff) {
    for (let uuid of selectedObjects) {
      let tempBox = engine.getfromUUID(uuid);
      if (tempBox) {
        tempBox.customDraw();
        let diff = {
          x: frameDiff.x,
          y: frameDiff.y
        };
        if (this.tryOffset[uuid]) {
          diff.x += this.tryOffset[uuid].x;
          diff.y += this.tryOffset[uuid].y;
        }
        let newPos = {
          x: Math.round(tempBox.x / this.gridSize) * this.gridSize,
          y: Math.round(tempBox.y / this.gridSize) * this.gridSize
        };
        let remainder = { x: diff.x % this.gridSize, y: diff.y % this.gridSize };
        this.tryOffset[uuid] = remainder;
        let newDiff = { x: diff.x - remainder.x, y: diff.y - remainder.y };
        newPos.x += newDiff.x;
        newPos.y += newDiff.y;
        tempBox.offSet(newPos.x, newPos.y, newDiff.x, newDiff.y);
      } else {
        selectedObjects.splice(uuid, 1);
      }
    }
  }
  setSelection(newArr) {
    selectedObjects = newArr;
  }
  setCameraPos(obj) {
    this.cameraPos.x = obj.x;
    this.cameraPos.y = obj.y;
  }
  DrawSelection() {
    fill(0, 0, 0, 25);
    if (this.creatingNew) {
      let distance = dist(this.selectionBox[0][0], this.selectionBox[0][1], this.selectionBox[1][0], this.selectionBox[1][1]);
      let objClass = classes[addSelect.value()];
      if (objClass.prototype.getCollisionType() === "Circle") {
        circle(this.selectionBox[0][0], this.selectionBox[0][1], distance * 2);
        this.isCircle = true;
        return;
      }
      this.isCircle = false;
    }
    rect(
      this.selectionBox[0][0],
      this.selectionBox[0][1],
      this.selectionBox[1][0] - this.selectionBox[0][0],
      this.selectionBox[1][1] - this.selectionBox[0][1]
    );
  }
  pressedLevelMode() {
    let coords = createVector(mouseX, mouseY);
    for (let UUID in engine.guiObjects) {
      let GUIElement = engine.guiObjects[UUID];
      if (GUIElement.collidesPoint(coords)) {
        selectedObjects = [UUID];
      }
    }
  }
  onUpdate() {
    if (mouseIsPressed && overUI) {
      lastWasPressed = "startedOverUi";
    }
    if (!overUI && lastWasPressed !== "startedOverUi") {
      lastWasPressed = Pressed;
      Pressed = mouseIsPressed && !this.levelMode;
    }
    if (this.selectionBox[1]) {
      this.DrawSelection();
    }
    this.startSelect();
    if (mouseIsPressed && !overUI && (mouseButton === CENTER || mouseButton === RIGHT)) {
      this.creatingNew = false;
      this.moveScreen();
    }
    if (!this.levelMode && lastWasPressed != Pressed && !mouseIsPressed && !overUI) {
      if (lastWasPressed === "startedOverUi") {
        lastWasPressed = false;
      } else {
        this.releaseSelectBox();
      }
    } else if (Pressed && this.selectionBox[0] && !this.selectionBox[2]) {
      this.mouseDown();
    }
    if (mouseIsPressed && lastWasPressed !== "startedOverUI" && this.levelMode) {
      this.pressedLevelMode();
    }
    if (lastScene != engine.currentScene) {
      this.removeSelection();
    }
    lastScene = engine.currentScene;
    for (let uuid of selectedObjects) {
      let tempBox = engine.getfromUUID(uuid);
      if (tempBox) {
        tempBox?.customDraw?.();
      } else {
        selectedObjects.splice(uuid, 1);
      }
    }
    if (selectedObjects.length != 0) {
      this.OpenEditMenu();
    }
    let newFile = Object.keys(engine.files);
    if (!newFile.equals(OldFiles) || editor.updates.browser) {
      editor.updates.browser = false;
      console.warn("added a file!/ changed");
      OldFiles = newFile;
      content.removeOldContent();
      readTypeAndName();
    }
    if (editor.updates.level && engine?.scene?.length > 0) {
      editor.updates.level = false;
      this.updateLevels();
    }
    if (keyIsDown(17) && keyIsDown(86)) {
      this.pasteObjects();
    } else {
      this.pasted = false;
    }
  }
  mouseCoords() {
    return createVector(round(engine.mouseScreen().x), round(engine.mouseScreen().y));
  }
  transformCoordinates(drawSelect) {
    const [x1, y1] = drawSelect[0];
    const [x2, y2] = drawSelect[1];
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);
    return {
      x,
      y,
      width,
      height,
      getCollisionType: () => {
        return "Rect";
      },
      getCollisionVectors: () => {
        return [{ x, y }, { x: width, y: height }];
      }
    };
  }
  mouseDown(selection = this.selectionBox, creatingNew = this.creatingNew) {
    if (!selection[0])
      return;
    selection[1] = this.mouseCoords().array();
    let drawSelect = selection;
    let rect1 = this.transformCoordinates(drawSelect);
    if (!rect1)
      return;
    if (creatingNew) {
      return this.newObject = rect1;
    }
    selectedObjects = [];
    this.tryOffset = {};
    let collisionRect = {
      getCollisionType: () => {
        return "Rect";
      },
      getCollisionVectors: () => {
        return [{ x: rect1.x, y: rect1.y }, { x: rect1.width, y: rect1.height }];
      }
    };
    for (let tempBox of engine.getActiveScene().boxes) {
      if (tempBox.collision) {
        let c = tempBox.collision(collisionRect, false) ? 1 : 0;
        if (c) {
          selectedObjects.push(tempBox.uuid);
        }
        tempBox.clr = c * 50;
      }
    }
    if (selectedObjects.length === 0) {
      this.removeSelection();
      info = [];
    }
  }
  releaseSelectBox() {
    if (this.creatingNew) {
      let objClass = classes[addSelect.value()];
      if (this.newObject.width || this.newObject.height) {
        let classParameters = [];
        if (!this.newObject.width) {
          this.newObject.width = 1;
        } else if (!this.newObject.height) {
          this.newObject.height = 1;
        }
        if (this.selectionBox[0] && this.selectionBox[1]) {
          this.newObject.radius = round(dist(this.selectionBox[0][0], this.selectionBox[0][1], this.selectionBox[1][0], this.selectionBox[1][1]));
          if (this.isCircle) {
            this.newObject.x = this.startPos.x;
            this.newObject.y = this.startPos.y;
          }
          for (let param of objClass.prototype.parameterNames()) {
            let resp = this.newObject[param];
            if (resp === void 0) {
              let paramResp = param !== "noMenu" ? prompt(param) : " ";
              classParameters.push(parseStringNum(paramResp));
            } else {
              classParameters.push(parseStringNum(resp));
            }
          }
          let obj = new objClass(...classParameters);
          obj.init();
          engine.getActiveScene().boxes.push(obj);
          selectedObjects.push(obj.uuid);
          obj.clr = 50;
          this.updateLevels();
        }
      } else {
        this.mouseDown([this.mouseCoords().array()], false);
        this.creatingNew = false;
      }
    }
    this.selectionBox = [];
  }
  copyObject() {
    for (let _ = selectedObjects.length; _ >= 0; _--) {
      let objs = selectedObjects[_];
      if (!engine.getfromUUID(objs)) {
        selectedObjects.splice(_, 1);
      }
    }
    this.copiedObjs = [];
    for (let objId of selectedObjects) {
      let copiedObj = {
        vals: engine.getfromUUID(objId).getParameters(),
        type: engine.getfromUUID(objId).typeId,
        components: engine.getfromUUID(objId).jsonComponents()
      };
      this.copiedObjs.push(copiedObj);
    }
  }
  pasteObjects() {
    if (this.pasted || overUI) {
      return;
    }
    let firstObjPos;
    for (let copiedObj of this.copiedObjs) {
      if (copiedObj.type === "" || copiedObj.type === void 0) {
        console.warn("Empty type means not copyable");
        continue;
      }
      let _obj = addObj(copiedObj.type, copiedObj.vals);
      for (let component of copiedObj.components) {
        let componentClass = engine.componentList[component.name];
        _obj.components.push(new componentClass({ ...component.params, obj: _obj }));
      }
      engine.addObj(_obj);
      _obj.clr = 50;
      let offsetPosX = this.mouseCoords().x;
      let offsetPosY = this.mouseCoords().y;
      if (!firstObjPos) {
        firstObjPos = [_obj.x, _obj.y];
      } else {
        offsetPosX -= firstObjPos[0] - _obj.x;
        offsetPosY -= firstObjPos[1] - _obj.y;
      }
      _obj.offSet(offsetPosX, offsetPosY);
      _obj.typeId = copiedObj.type;
      selectedObjects.push(_obj.uuid);
    }
    this.pasted = true;
  }
  countChildren(obj, stack = 0) {
    let count = 0;
    if (stack > 20) {
      return 1;
    }
    for (let index in obj) {
      let i = obj[index];
      if (typeof i !== "object") {
        count++;
      } else {
        stack++;
        count += this.countChildren(i, stack);
      }
    }
    return count;
  }
  OpenEditMenu() {
    lastInfo = JSON.parse(JSON.stringify(info));
    info = {};
    let lastIndexes = infoIndexes;
    infoIndexes = [];
    for (let objectId of selectedObjects) {
      let tempBox = engine.getfromUUID(objectId);
      if (tempBox) {
        info[tempBox.uuid] = tempBox.getEditableArray();
        for (let index in new Array(this.countChildren(tempBox.getEditableArray()))) {
          infoIndexes.push(objectId + "" + index);
        }
        if (tempBox.components) {
          for (let componentId in tempBox.components) {
            info[tempBox.uuid].push({ isComponent: true, componentId });
            infoIndexes.push("" + objectId + componentId);
          }
        }
        if (!tempBox?.noComponents) {
          info[tempBox.uuid].push({ addComponent: true });
        }
      }
    }
    let check = deepReadCheck(info, lastInfo);
    if (check > 0 && !editor.updates.menu) {
      return;
    }
    if (lastIndexes.length !== infoIndexes.length) {
      editor.updates.menu = true;
    }
    if (check === 0 && !editor.updates.menu) {
      for (let t_info of infoDivs) {
        t_info.elt.dispatchEvent(this.valChanged);
      }
      return;
    }
    editor.updates.menu = false;
    for (let t_info of infoDivs) {
      t_info.remove();
      infoDivs = [];
    }
    console.table(info);
    for (let uuid in info) {
      let edit = info[uuid];
      for (let editable of edit) {
        if (editable?.isComponent) {
          engine.getfromUUID(uuid)?.components[editable.componentId].MenuEdit?.("sideMenu");
        } else if (editable?.addComponent) {
          let divHolder = createDiv();
          let ComponentSelect = createSelect();
          for (const [key, value] of Object.entries(engine.componentList)) {
            if (value.prototype.isAddable)
              ComponentSelect.option(key);
          }
          ComponentSelect.style("cursor: pointer;");
          ComponentSelect.parent(divHolder);
          let addButton2 = createButton("Add");
          addButton2.elt.title = "Add component";
          divHolder.elt.ondrop = (event) => {
            if (event.dataTransfer.getData("UUID") === "")
              return;
            console.warn(event.dataTransfer.getData("UUID"));
            if (event.dataTransfer.files.length > 0) {
              this.makeFile(event).then((file) => {
                let className = Engine.fileTypeList[file.type];
                let component = new engine.componentList[className]({
                  obj: engine.getfromUUID(uuid),
                  fileUUID: file.UUID
                });
                engine.getfromUUID(uuid).components.push(component);
              });
            } else {
              let fileUUID = event.dataTransfer.getData("UUID");
              let file = engine.files[fileUUID];
              let className = Engine.fileTypeList[file.type];
              console.log(className);
              let component = new engine.componentList[className]({
                obj: engine.getfromUUID(uuid),
                fileUUID
              });
              engine.getfromUUID(uuid).components.push(component);
              console.warn(file);
            }
          };
          divHolder.elt.ondragover = (event) => {
            event.preventDefault();
          };
          addButton2.mousePressed(() => {
            let component = new engine.componentList[ComponentSelect.value()]({
              obj: engine.getfromUUID(uuid)
            });
            engine.getfromUUID(uuid).components.push(component);
          });
          addButton2.parent(divHolder);
          addButton2.style("cursor: pointer;");
          divHolder.parent("sideMenu");
          infoDivs.push(divHolder);
        } else {
          this.useEditObj(editable, "sideMenu", {});
        }
      }
    }
  }
  useEditObj(obj, parent = "sideMenu", opened) {
    let Holder;
    if (typeof obj.value === "object") {
      let divHolder = createDiv().parent(parent);
      let headerText = createDiv();
      Holder = accordionMenu(headerText, createDiv(), "", opened);
      headerText.parent(divHolder);
      Holder.parent(divHolder);
      infoDivs.push(headerText);
      opened[""] ??= { value: false };
      this.addNewEditObj(obj.value, Holder, opened[""], () => {
        obj.set(obj.value);
      });
    } else {
      addMenuInput(
        obj.name,
        (_) => {
          obj.set(parseStringNum(_));
          return obj.get();
        },
        () => {
          return obj.get();
        },
        parent
      );
    }
  }
  addNewEditObj(obj, parent = "sideMenu", opened, onUpdate = () => {
  }) {
    let Holder;
    for (let i in obj) {
      if (typeof obj[i] === "object") {
        let divHolder = createDiv().parent(parent);
        let headerText = createDiv();
        Holder = accordionMenu(headerText, createDiv(), i, opened);
        headerText.parent(divHolder);
        Holder.parent(divHolder);
        infoDivs.push(headerText);
        opened[i] ??= { value: false };
        this.addNewEditObj(obj[i], Holder, opened[i], onUpdate);
      } else {
        addMenuInput(
          obj[i],
          (_) => {
            obj[i] = parseStringNum(_);
            onUpdate();
            return obj[i];
          },
          () => {
            return obj[i].get();
          },
          parent
        );
      }
    }
  }
}
function accordionMenu(headerText, inputField, name, Opened = { value: false }) {
  let isExpanded = Opened.value;
  let byOpened = Opened.value;
  headerText.style("cursor: pointer");
  let UpdateExpansion = () => {
    if (isExpanded) {
      headerText.html("\u25BC" + name);
      inputField.show();
      if (!byOpened) {
        inputField.style("max-height", inputField.elt.scrollHeight + "px");
        setTimeout(() => {
          Opened.value = true;
          inputField.style("max-height", "none");
        }, 400);
      }
      inputField.style("margin-left", "1em");
    } else {
      headerText.html("\u25BA" + name);
      inputField.style("max-height", "0px");
      inputField.hide();
      setTimeout(() => {
        Opened.value = false;
        inputField.hide();
      }, 200);
    }
  };
  if (isExpanded) {
    inputField.style("max-height", "none");
  } else {
    inputField.hide();
  }
  UpdateExpansion();
  byOpened = false;
  headerText.mousePressed(() => {
    if (mouseButton === LEFT) {
      isExpanded = !isExpanded;
      UpdateExpansion();
    }
  });
  return inputField;
}
function addEditableScript(name, set, get, parentName = "sideMenu", additionalDiv = [], replaceButton, opener) {
  let divHolder = createDiv();
  let headerText = createSpan("Script Component").parent(divHolder);
  let _get = get;
  let inputField = createDiv();
  inputField.child(...additionalDiv);
  let inp;
  inp = replaceButton;
  inp.elt.title = "Script Editor";
  inp.mousePressed(() => {
    var popupWindow = window.open("popup.html", "Popup Window", "width=400,height=300");
    window.scriptData = function() {
      return [_get().toString(), window];
    };
    window.receivePopupText = (text) => {
      console.log(text);
      set(text);
      _get = () => text;
    };
  });
  inp.size(177, "fit-content");
  accordionMenu(headerText, inputField, "Script Component", opener);
  infoDivs.push(divHolder);
  infoDivs[infoDivs.length - 1].parent(parentName);
  inputField.parent(divHolder);
  return [inputField, divHolder];
}
function addEditableSprite(name, set, get, parentName = "sideMenu", additionalDivs = [], replaceButton, opener) {
  let divHolder = createDiv();
  let headerText = createSpan("Sprite Component").parent(divHolder);
  let _get = get;
  let inputField = createDiv();
  inputField.child(...additionalDivs);
  let inp = replaceButton;
  inp.elt.title = "Sprite Editor";
  accordionMenu(headerText, inputField, "Sprite Component", opener);
  inp.mousePressed(() => {
    let popup = window.open("fileInput.html", "_blank", "width=400,height=400");
    popup._ImageData = () => {
      return _get();
    };
    console.log(_get);
    window.jsonImage = (text) => {
      console.log(text);
      let val = set(text);
      _get = () => {
        val;
      };
    };
  });
  inp.size(177, "fit-content");
  let infoId = infoDivs.push(divHolder);
  infoDivs[infoId - 1].parent(parentName);
  inputField.parent(divHolder);
  return [inputField, divHolder];
}
function addMenuInput(name, set, get, par = "sideMenu") {
  const divHolder = createDiv().html("");
  const _span = createSpan(name + ": ").parent(divHolder);
  let inp;
  const valueType = typeof get();
  switch (valueType) {
    case "number":
      inp = createInput(get().toString()).style("opacity: 0.5;");
      inp.parent(divHolder).input(() => {
        const ogVal = get();
        const parsed = parseStringNum(inp.value(), ogVal);
        console.log(parsed);
        let newVal = parsed;
        set(newVal);
      });
      divHolder.elt.addEventListener("ValueChanged", () => {
        inp.value(get());
      });
      break;
    case "string":
      inp = createInput(get()).style("opacity: 0.5;");
      inp.parent(divHolder).input(() => {
        set(inp.value());
      });
      divHolder.elt.addEventListener("ValueChanged", () => {
        inp.value(get());
      });
      break;
    case "boolean":
      _span.remove();
      inp = createCheckbox(name, get());
      inp.parent(divHolder).changed(() => {
        set(inp.checked());
      });
      divHolder.elt.addEventListener("ValueChanged", () => {
        inp.checked(get());
      });
      break;
    default:
      console.error(valueType, "isn't a supported editable value");
      _span.remove();
      break;
  }
  if (inp) {
    infoDivs.push(divHolder);
    infoDivs[infoDivs.length - 1].parent(par);
  }
}
var classes = {
  Box,
  Text: TextObject,
  Platform: movingPlatform,
  End,
  Enemy,
  Interact: Interactive
};
