var oldScroll = 0;
var content = {};
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
  setSelection(newArr) {
    this.editor.setSelection(newArr);
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
    editor.editor.setSelection([]);
    editor.editor.deleteInfoDivs();
  }
  onSetup() {
    if (button)
      return;
    document.body.ondragover = (event) => {
      event.preventDefault();
    };
    document.body.ondrop = (event) => {
      event.preventDefault();
      if (event.dataTransfer.files[0].type === "application/json") {
        event.dataTransfer.files[0].text().then(
          (data) => {
            engine = new Engine();
            LoadMap({ data });
            editor.init();
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
        editor.init();
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
      editor.editor.creatingNew = !editor.editor.creatingNew;
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
      editor.init();
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
    levelButton.mousePressed(editor.levelScreen.bind(editor));
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
  fromReference(id) {
    let _ = select(id.includes("#") ? id : "#" + id);
    this.uiElement(_);
    return _;
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
  openSceneContext(id) {
    if (this.fromReference("#objectContext").elt.style.display === "block")
      return;
    let sceneContext = this.fromReference("#sceneContext");
    this.sceneContext = id;
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
}
content.changeName = function(_file, newName) {
  let file = engine.files[_file.UUID];
  if (newName) {
    if (engine.getByReference("name", newName)) {
      alert("already used name");
      content.changeName(_file);
    } else {
      file.editReference("name", newName);
      editor.updates.browser = true;
      editor.updates.menu = true;
    }
  } else {
    content.currentFile = _file;
    content.nameInput.value(newName ? newName : _file.name);
    content.renameWindow.show();
  }
};
function readTypeAndName() {
  for (let nameOfFile in ContentBrowserPanel.files) {
    let _file = ContentBrowserPanel.files[nameOfFile];
    let typeOfFile = _file.type;
    Engine.componentList[Engine.fileTypeList[typeOfFile]].prototype.ContentBrowser(_file, ContentBrowserPanel);
  }
  ContentBrowserPanel.Main.elt.scrollTop = oldScroll;
}
function showEditMenu() {
}
function showBrowserPanel() {
  if (ContentBrowserPanel.HUD.elt.style.display === "none") {
    ContentBrowserPanel.Holder.elt.style.maxHeight = "";
    ContentBrowserPanel.Main.elt.style.maxHeight = "calc(100%)";
    ContentBrowserPanel.HUD.elt.style.display = "flex";
  } else {
    ContentBrowserPanel.HUD.hide();
  }
}
content.removeOldContent = function() {
  oldScroll = ContentBrowserPanel.Main.elt.scrollTop;
  for (let i of ContentBrowserPanel.Divs) {
    i.remove();
  }
  ContentBrowserPanel.Divs = [];
};
function PanelsInit() {
  content.renameWindow = editor.fromReference("#renameFile");
  content.nameInput = editor.fromReference("#newName");
  content.submitName = editor.fromReference("#submitName");
  content.cancelRename = editor.fromReference("#cancelName");
  content.submitName.mousePressed(() => {
    content.changeName(content.currentFile, content.nameInput.value());
    content.renameWindow.hide();
  });
  content.cancelRename.mousePressed(() => {
    content.renameWindow.hide();
  });
}
async function createZip() {
  var zip = new JSZip();
  let createSketchFile = function() {
    return `
        globalThis.setup = async function () {
                const response = await fetch("./examples/platformer.json");
                const data = await response.json();
                await waitForEngine()
                window.RAPIER = obj;
                engine = new Engine();
                
                engine.loadFromObject(data, true);
                createCanvas(windowWidth, windowHeight);
                noSmooth();
                //Remove right click default behaviour
                document.oncontextmenu = function (e) {
                    e.preventDefault();
                };
                engine.setup();
    };
        `;
  };
  let createMapFile = function() {
    return SaveMap();
  };
  var scriptTags = [
    { path: "libs/p5.min.js" },
    { path: "libs/p5.camera.js" },
    { path: "libs/rapier2d.js" },
    { path: "rapier_wasm2d_bg.wasm" },
    { path: "engine/utils.js" },
    { path: "engine/engine.js" },
    { path: "engine/collision/p5.collide.js" },
    { path: "engine/collision/handler.js" },
    { path: "engine/objects/collision.js" },
    { path: "engine/components/component.js" },
    { path: "engine/components/scriptComponent.js" },
    { path: "engine/objects/object.js" },
    { path: "engine/objects/box.js" },
    { path: "engine/objects/player.js" },
    { path: "engine/objects/end.js" },
    { path: "engine/objects/text.js" },
    { path: "engine/objects/enemyBox.js" },
    { path: "engine/objects/interactive.js" },
    { path: "engine/objects/bullet.js" },
    { path: "engine/objects/movingPlatform.js" },
    { path: "loader/level.js" },
    { path: "loader/support.js" },
    { path: "index.html" },
    { path: "engine/objects/collisionChecker.js" },
    { path: "sketch.js", makeFile: createSketchFile },
    { path: "export.json", makeFile: createMapFile }
  ];
  const regex = /<!-- .*<\/script>/gms;
  await Promise.all(scriptTags.map(async function(scriptInfo) {
    var scriptContent;
    if (scriptInfo.makeFile) {
      scriptContent = scriptInfo.makeFile();
    } else if (scriptInfo.path) {
      var response = await fetch(scriptInfo.path);
      scriptContent = await response.text();
      if (scriptInfo.path.endsWith(".html")) {
        scriptContent = scriptContent.replace(regex, "");
      }
    }
    zip.file(scriptInfo.path, scriptContent);
  }));
  let content2 = await zip.generateAsync({ type: "blob" });
  if (window?.showSaveFilePicker) {
    let file = await showSaveFilePicker({
      suggestedName: "project.zip",
      types: [{
        description: "Zip File",
        accept: { "text/blob": [".zip"] }
      }]
    });
    file = await file.createWritable();
    file.write(content2);
    file.close();
  } else {
    downloadFile(content2, "export.zip");
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
function addEditableModel(name, set, parentName = "sideMenu", additionalDivs = [], replaceButton, opener) {
  let divHolder = createDiv();
  let headerText = createSpan("Model Component").parent(divHolder);
  let inputField = createDiv();
  inputField.child(...additionalDivs);
  let inp = replaceButton;
  inp.elt.title = "Model Editor";
  accordionMenu(headerText, inputField, "Model Component", opener);
  inp.mousePressed(() => {
    let popup = window.open("fileInput.html", "_blank", "width=400,height=400");
    window.modelFile = (text) => {
      console.log(text);
      let val = set(text);
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
var classes3D = {
  Box3D
};
