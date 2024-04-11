function tryRun(funcCall, funcContext, funcArgs, funcName, onError) {
  let _;
  try {
    _ = funcCall.call(funcContext, ...funcArgs);
  } catch (e) {
    console.error(funcName + " has an error: " + e);
    console.error(funcCall);
    onError(e);
    return;
  }
  return _;
}
class gameScript extends Component {
  constructor({ obj, fn = "", vals = {}, fileUUID = "" }) {
    super("gameScript");
    this.fileType = ".js";
    this.ownObject = obj;
    let temp = {};
    this.vals = {
      set shown(value) {
        if (typeof value === "object" && Object.keys(value).length > 0) {
          for (let key in obj.shown) {
            if (value.hasOwnProperty(key)) {
              value[key] = replaceValues(obj.shown[key], value[key]);
            }
          }
        }
        obj.shown = Object.assign(obj.shown, value);
        let normalObject = removeNonNormal(value);
        if (typeof normalObject === "object") {
          for (let i in normalObject) {
            this.editableVals[i] = normalObject[i];
          }
        } else {
          this.editableVals[""] = normalObject;
        }
      },
      get shown() {
        return obj.shown;
      },
      editableVals: new Proxy(temp, {
        set(target, key, value) {
          if (key === "") {
            target = value;
          } else {
            target[key] = value;
          }
          return true;
        },
        get(target, key, receiver) {
          return target[key];
        }
      })
    };
    this.vals.shown = vals;
    this.id = engine.generateUUID();
    this.overrides = {};
    this.newOverrides = {};
    if (fileUUID !== "") {
      this.file = engine.files[fileUUID];
      this.fn = this.file.data;
      this.file.type = this.fileType;
      this.file.addUser(this, obj.uuid);
    } else {
      this.file = addGameFile(fn, this.fileType);
      this.fn = this.file.data;
      this.file.addUser(this, obj.uuid);
    }
    let scenesAreLoaded = false;
    let hasScene = false;
    let scene;
    for (scene in engine.scene) {
      if (scene.boxes) {
        if (scene.boxes.indexOf(engine.getfromUUID(this.ownObject.uuid)) > -1) {
          hasScene = true;
        } else {
          console.error("Not in scene:" + scene.ind);
        }
        scenesAreLoaded = true;
      }
    }
    if (!hasScene && scenesAreLoaded) {
      console.error("Isn't in any scene");
    }
  }
  updateValues() {
    for (let key in this.ownObject.shown) {
      if (this.vals.editableVals.hasOwnProperty(key)) {
        this.ownObject.shown[key] = replaceValues(this.vals.editableVals[key], this.ownObject.shown[key]);
      }
    }
  }
  evalValues() {
  }
  set fn(source) {
    this._src = source;
    this.ownObject.script = source;
    this.newOverrides = {};
    let _temp = {};
    let _Run = {
      shown: new Proxy(_temp, {
        set(target, key, value) {
          target[key] = value;
          let tValue = target;
          if (key === "valueDetected") {
            console.log("valueDetected is added or modified:", value);
          }
          target[key] = tValue[key];
          return true;
        }
      })
    };
    new Function(source).call(_Run);
    this.newOverrides = _Run;
    this.vals.shown = _temp;
    delete this.newOverrides.shown;
    this.overrides = this.newOverrides;
    for (let i in this.overrides) {
      if (this.ownObject[i] !== void 0 && this.ownObject.__proto__[i] !== void 0 && typeof this.overrides[i] === "function") {
        let script = this;
        let firstSet = this.ownObject[i] === this.ownObject.__proto__[i];
        let lastAccess = this.ownObject[i]?.ids;
        if (lastAccess?.includes(this.id)) {
        } else if (lastAccess === void 0 || firstSet) {
          this.ownObject[i] = function() {
            let shouldSkip = false;
            if (script.overrides[i] !== void 0) {
              let ret = tryRun(script.overrides[i], this, arguments, i, (error) => {
                engine.errorText = "script has an error, check console";
                script.overrides[i] = () => {
                };
              });
              if (this[i].skip) {
                ret = this[i].skip;
                this[i].skip = false;
              }
              if (ret !== void 0) {
                return ret;
              }
            } else {
              return tryRun(this.__proto__[i], this, arguments, i);
            }
            this.__proto__[i].call(this, ...arguments);
          }.bind(script.ownObject);
          this.ownObject[i].ids = [this.id];
        } else {
          let ogFunc = this.ownObject[i];
          this.ownObject[i] = function() {
            let shouldSkip = false;
            if (script.overrides[i] !== void 0) {
              let ret = tryRun(script.overrides[i], this, arguments, i, (error) => {
                engine.errorText = "script has an error, check console";
                script.overrides[i] = () => {
                };
              });
              if (ret !== void 0) {
                this[i].skip = ret;
              }
            } else {
              return tryRun(ogFunc, this, arguments, i);
            }
            ogFunc.call(this, ...arguments);
          }.bind(script.ownObject);
          this.ownObject[i].ids = [...ogFunc.ids, this.id];
        }
      } else if (typeof this.overrides[i] === "function") {
        this.ownObject[i] = this.overrides[i].bind(this.ownObject);
      } else {
        this.ownObject[i] = this.overrides[i];
      }
    }
  }
  get fn() {
    return this._src;
  }
  addNewEditObj(obj, parent = "sideMenu", opened) {
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
        this.addNewEditObj(obj[i], Holder, opened[i]);
      } else {
        addMenuInput(
          i,
          (_) => {
            obj[i] = parseStringNum(_);
            this.updateValues();
            return obj[i];
          },
          () => {
            return obj[i];
          },
          parent
        );
      }
    }
  }
  AddFileEdit(parent) {
    let buttonName = this.file.name;
    let inp = createButton(buttonName + this.file.type).parent(parent);
    inp.elt.ondrop = (event) => {
      console.warn(event.dataTransfer.getData("UUID"));
      let uuid = event.dataTransfer.getData("UUID");
      let file2 = engine.files[uuid];
      if (file2.type !== this.fileType)
        return;
      this.loadFile(file2);
      editor.updates.menu = true;
    };
    inp.elt.ondragover = (event) => {
      event.preventDefault();
    };
  }
  ContentBrowser(file2, Panel) {
    let typeOfFile = file2.type;
    let _file = file2;
    let _get = () => {
      return file2.data;
    };
    let set = (file3) => {
      for (let ObjId in _file.whoUses) {
        let script = _file.whoUses[ObjId];
        script.loadFile(file3);
      }
    };
    let buttonName = _file.name;
    buttonName = buttonName + typeOfFile;
    let isDragging = false;
    let inp = createButton(buttonName).parent(Panel.HUD);
    inp.elt.draggable = "true";
    inp.elt.ondragstart = (event) => {
      event.dataTransfer.setData("UUID", file2.UUID);
      console.log(file2);
      isDragging = true;
    };
    inp.elt.ondragend = () => {
      isDragging = false;
    };
    inp.mouseReleased(() => {
      if (isDragging)
        return;
      if (mouseButton === "right") {
        editor.openBrowserContext(_file);
      } else {
        var popupWindow = window.open("popup.html", "Popup Window", "width=400,height=300");
        window.scriptData = function() {
          return [_get().toString(), window];
        };
        window.receivePopupText = (text) => {
          _file.data = text;
          set(_file);
        };
      }
    });
    inp.size(140, 140);
    Panel.Divs.push(inp);
  }
  MenuEdit(parent) {
    if (!addEditableScript)
      return;
    let fileHolder = createDiv();
    this.AddFileEdit(fileHolder);
    Component.componentOpen[this.id] ??= { value: false };
    let shouldOpen = Component.componentOpen[this.id];
    let mainDiv = addEditableScript(
      "function",
      (val) => {
        let actValue = val;
        if (Object.keys(this.file.whoUses).length == 1) {
          this.file.data = actValue;
          this.loadFile(this.file);
        } else {
          this.loadFile(addGameFile(actValue, this.fileType));
        }
        return actValue;
      },
      () => this.fn,
      parent,
      [fileHolder],
      fileHolder,
      shouldOpen
    );
    this.addNewEditObj(this.vals.editableVals, mainDiv[0], shouldOpen);
  }
  deleteUser(shouldDelete = true) {
    this.file.removeUser(this.ownObject.uuid, shouldDelete);
  }
  loadFile(file2) {
    if (this.file.UUID !== file2.UUID) {
      this.deleteUser();
    }
    this.file = file2;
    this.file.addUser(this, this.ownObject.uuid);
    this.fn = this.file.data;
    editor.updates.menu = true;
    editor.updates.browser = true;
  }
  toJson() {
    return {
      name: this.componentName,
      params: {
        fileUUID: this.file.UUID,
        vals: this.vals.editableVals
      }
    };
  }
}
class gameGlobalScript extends Component {
  constructor({ fileUUID = "" }) {
    super("globalScript");
  }
  ContentBrowser(file2, Panel) {
    let typeOfFile = file2.type;
    let _file = file2;
    let _get = () => {
      return file2.data;
    };
    let buttonName = _file.name;
    buttonName = buttonName + typeOfFile;
    let isDragging = false;
    let inp = createButton(buttonName).parent(Panel.HUD);
    inp.mouseReleased(() => {
      if (isDragging)
        return;
      if (mouseButton === "right") {
        editor.openBrowserContext(_file);
      } else {
        var popupWindow = window.open("popup.html", "Popup Window", "width=400,height=300");
        window.scriptData = function() {
          return [_get().toString(), window];
        };
        window.receivePopupText = (text) => {
          if (_file.data == "" && !_file?.firstCompile) {
            _file.data = text;
            this.onCreateFile(_file);
          } else {
            engine.errorText = "Refresh Editor to have effect";
            setTimeout(() => {
              delete engine.errorText;
            }, 1e4);
            _file.data = text;
          }
          _file.firstCompile = true;
        };
      }
    });
    inp.size(140, 140);
    Panel.Divs.push(inp);
  }
  get isAddable() {
    return false;
  }
  onCreateFile(file) {
    eval(file.data);
  }
}
class gameModel extends Component {
  constructor({ obj, src = { imageb64: "" }, fileUUID = "" }) {
    super("gameModel");
    if (!obj.models) {
      debugger;
    }
    this.fileType = ".obj";
    obj.models.push(this);
    if (fileUUID !== "") {
      this.file = engine.files[fileUUID];
      this.file.type = ".obj";
      this.file.addUser(this, obj.uuid);
    } else {
      this.file = addGameFile("", ".obj");
      this.file.addUser(this, obj.uuid);
    }
    this.ownObject = obj;
    this.id = engine.generateUUID();
    this.sprite;
  }
  ContentBrowser(file2, Panel) {
    let isDragging = false;
    let buttonName = file2.name;
    let typeOfFile = file2.type;
    buttonName = buttonName + typeOfFile;
    let img = createButton(buttonName).parent(Panel.HUD);
    img.elt.draggable = "true";
    img.elt.ondragstart = (event) => {
      event.dataTransfer.setData("UUID", file2.UUID);
      console.log(file2);
      isDragging = true;
    };
    img.elt.ondragend = () => {
      isDragging = false;
    };
    img.mouseReleased(() => {
      if (isDragging)
        return;
      if (mouseButton === "right") {
        editor.openBrowserContext(file2);
      } else {
        let popup = window.open("fileInput.html", "_blank", "width=400,height=400");
        window.modelFile = (text) => {
          editor.updates.browser = true;
          file2.data = text;
          file2.customData = void 0;
          console.log(file2.whoUses);
          for (let uuid in file2.whoUses) {
            let _sprite = file2.whoUses[uuid];
            console.log(_sprite);
            _sprite.loadFile(file2);
            console.log(_sprite);
          }
        };
      }
    });
    img.size(140, 140);
    Panel.Divs.push(img);
  }
  MenuEdit(parent) {
    if (!addEditableModel)
      return;
    let divHolder = createDiv();
    let FileEdit = this.AddFileEdit();
    FileEdit.parent(divHolder);
    Component.componentOpen[this.id] ??= { value: false };
    let shouldOpen = Component.componentOpen[this.id];
    let mainDiv = addEditableModel("Object", (val) => {
      editor.updates.browser = true;
      let actValue = val;
      console.log(val);
      if (val) {
        this.loadFile(addGameFile(val, ".obj"));
      }
      return actValue;
    }, parent, [divHolder], divHolder, shouldOpen);
  }
  AddFileEdit() {
    let buttonName = this.file.name;
    let inp = createButton(buttonName + this.file.type);
    inp.elt.ondrop = (event) => {
      console.log(event);
      console.warn(event.dataTransfer.getData("UUID"));
      let uuid = event.dataTransfer.getData("UUID");
      let file2 = engine.files[uuid];
      if (file2.type !== ".obj")
        return;
      this.loadFile(file2);
    };
    inp.elt.ondragover = (event) => {
      event.preventDefault();
    };
    return inp;
  }
  deleteUser(shouldDelete = true) {
    this.file.removeUser(this.ownObject.uuid, shouldDelete);
  }
  loadFile(file2) {
    if (this.file.UUID !== file2.UUID) {
      this.deleteUser();
    }
    this.file = file2;
    this.file.addUser(this, this.ownObject.uuid);
    if (!this.file.customData) {
      this.file.customData = loadModel(this.file.data, () => {
      }, () => {
      }, ".obj");
    }
    this.setModel(this.file.customData);
    editor.updates.menu = true;
    editor.updates.browser = true;
  }
  getModel() {
    return this.model;
  }
  onCreateFile(file2) {
    let sprite = loadModel(file2.data, () => {
    }, () => {
    }, ".obj");
    file2.customData = sprite;
  }
  reloadModel() {
    var _sprite;
    if (this.file.customData !== void 0) {
      _sprite = this.file.customData;
    } else {
      _sprite = loadModel(this.file.data, () => {
      }, () => {
      }, ".obj");
    }
    this.setModel(_sprite);
  }
  setModel(model) {
    this.file.customData = model;
    this.model = model;
    if (typeof this.ownObject.model !== "object") {
      let _og = this.ownObject.model;
      this.ownObject.model = _og ? [_og] : [];
    }
    this.ownObject.model[this.ownObject.models.indexOf(this)] = model;
    if (this.ownObject.model.length === 1) {
      this.ownObject.model = model;
    }
  }
  getModel() {
    return this.ownObject.model;
  }
  toJson() {
    let _return = {
      name: this.componentName,
      params: {
        fileUUID: this.file.UUID
      }
    };
    return _return;
  }
}
class gameSprite extends Component {
  constructor({ obj, src = { imageb64: "" }, fileUUID = "" }) {
    super("gameSprite");
    if (!obj.sprites) {
      debugger;
    }
    this.fileType = ".img";
    obj.sprites.push(this);
    if (fileUUID !== "") {
      this.file = engine.files[fileUUID];
      this.file.type = ".img";
      this.file.addUser(this, obj.uuid);
    } else {
      this.file = addGameFile(src.imageb64, ".img");
      this.file.addUser(this, obj.uuid);
    }
    this.ownObject = obj;
    if (src.imageb64) {
      delete src.imageb64;
    }
    this._src = src;
    this.src = src;
    this.id = engine.generateUUID();
    this.sprite;
  }
  set src(value) {
    this._src = { ...value };
    this._src.imageb64 = void 0;
    if (this.ownObject.sprite) {
      this.reloadImage();
    }
  }
  get src() {
    return this._src;
  }
  ContentBrowser(file2, Panel) {
    let isDragging = false;
    let img = createImg(file2.data, "Not Loading").parent(Panel.HUD);
    img.elt.draggable = "true";
    img.elt.ondragstart = (event) => {
      event.dataTransfer.setData("UUID", file2.UUID);
      console.log(file2);
      isDragging = true;
    };
    img.elt.ondragend = () => {
      isDragging = false;
    };
    let _get = () => {
      return file2.data;
    };
    img.mouseReleased(() => {
      if (isDragging)
        return;
      if (mouseButton === "right") {
        editor.openBrowserContext(file2);
      } else {
        let popup = window.open("fileInput.html", "_blank", "width=400,height=400");
        popup._ImageData = () => {
          return _get();
        };
        window.jsonImage = (text) => {
          editor.updates.browser = true;
          file2.data = text;
          file2.customData = void 0;
          console.log(file2.whoUses);
          for (let uuid in file2.whoUses) {
            let _sprite = file2.whoUses[uuid];
            console.log(_sprite);
            _sprite.loadFile(file2);
            console.log(_sprite);
          }
          _get = () => {
            return text;
          };
        };
      }
    });
    img.size(140, 140);
    Panel.Divs.push(img);
  }
  MenuEdit(parent) {
    if (!addEditableSprite)
      return;
    let divHolder = createDiv();
    let FileEdit = this.AddFileEdit();
    FileEdit.parent(divHolder);
    Component.componentOpen[this.id] ??= { value: false };
    let shouldOpen = Component.componentOpen[this.id];
    let mainDiv = addEditableSprite(
      "Image",
      (val) => {
        editor.updates.browser = true;
        let actValue = val;
        console.log(val);
        this.src = actValue;
        if (val.imageb64) {
          this.loadFile(addGameFile(val.imageb64, ".img"));
        }
        return actValue;
      },
      () => this.file.data,
      parent,
      [divHolder],
      divHolder,
      shouldOpen
    );
  }
  AddFileEdit() {
    let buttonName = this.file.name;
    let inp = createButton(buttonName + this.file.type);
    inp.elt.ondrop = (event) => {
      console.log(event);
      console.warn(event.dataTransfer.getData("UUID"));
      let uuid = event.dataTransfer.getData("UUID");
      let file2 = engine.files[uuid];
      if (file2.type !== ".img")
        return;
      this.loadFile(file2);
    };
    inp.elt.ondragover = (event) => {
      event.preventDefault();
    };
    return inp;
  }
  deleteUser(shouldDelete = true) {
    this.file.removeUser(this.ownObject.uuid, shouldDelete);
  }
  loadFile(file2) {
    if (this.file.UUID !== file2.UUID) {
      this.deleteUser();
    }
    this.file = file2;
    this.file.addUser(this, this.ownObject.uuid);
    if (!this.file.customData) {
      this.file.customData = loadImage(this.file.data.toString());
    }
    this.setSprite(this.file.customData);
    editor.updates.menu = true;
    editor.updates.browser = true;
  }
  getSprite() {
    return this.sprite.get(...arguments);
  }
  onCreateFile(file2) {
    let sprite = loadImage(file2.data.toString());
    file2.customData = sprite;
  }
  reloadImage() {
    var _sprite;
    if (this.file.customData !== void 0) {
      _sprite = this.file.customData;
    } else {
      _sprite = loadImage(this.file.data.toString(), () => {
        for (let objId in this.file.whoUses) {
          engine.uuidList[objId].imageInitialized = true;
        }
      });
    }
    this.setSprite(_sprite);
  }
  setSprite(sprite) {
    this.file.customData = sprite;
    this.sprite = sprite;
    if (typeof this.ownObject.sprite !== "object") {
      let _og = this.ownObject.sprite;
      this.ownObject.sprite = _og ? [_og] : [];
    }
    this.ownObject.sprite[this.ownObject.sprites.indexOf(this)] = sprite;
    if (this.ownObject.sprite.length === 1) {
      this.ownObject.sprite = sprite;
    }
  }
  getImage() {
    return this.ownObject.sprite;
  }
  toJson() {
    let _return = {
      name: this.componentName,
      params: {
        src: { ...this._src },
        fileUUID: this.file.UUID
      }
    };
    return _return;
  }
}
class gameParticle extends Component {
  static stopAll;
  static allIntervals;
  constructor({ obj, settings }) {
    super("gameParticle", obj);
    this.id = engine.generateUUID();
    this.settings = settings;
    if (!engine.loading && engine.activeScene.boxes.indexOf(obj) !== -1) {
      this.initialize();
    }
  }
  initialize() {
    if (this.manager) {
      this.manager.play();
    } else {
      this.manager ??= new ParticleRenderer(this.ownObject, this.settings);
    }
  }
  toJson() {
    return {
      name: this.componentName,
      params: {
        settings: this.manager.settings || this.settings
      }
    };
  }
  update() {
    this.manager?.update();
    this.manager?.display();
  }
  MenuEdit(parent) {
    Component.componentOpen[this.id] ??= { value: false };
    let shouldOpen = Component.componentOpen[this.id];
    let divHolder = createDiv();
    divHolder.parent(parent);
    let headerText = createDiv();
    headerText.parent(divHolder);
    let inputField = createDiv();
    inputField.parent(divHolder);
    accordionMenu(headerText, inputField, "Particle Editor", shouldOpen);
    infoDivs.push(divHolder);
    this.addNewEditObj(this.manager?.settings ? this.manager.settings : this.settings, inputField, Component.componentOpen[this.id]);
  }
  updateValues() {
    this.manager.reloadLoops();
  }
  addNewEditObj(obj, parent = "sideMenu", opened) {
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
        this.addNewEditObj(obj[i], Holder, opened[i]);
      } else {
        addMenuInput(i, (_) => {
          obj[i] = parseStringNum(_);
          this.updateValues();
          return obj[i];
        }, () => {
          return obj[i];
        }, parent);
      }
    }
  }
}
gameParticle.stopAll = function() {
  for (let i of gameParticle.allIntervals) {
    clearInterval(i);
  }
  gameParticle.allIntervals = [];
};
gameParticle.allIntervals = [];
class Particle {
  constructor(settings, graphics) {
    this.lifeTime = settings.lifeTime;
    this.graphics = graphics;
    this.dir = createVector(random(...settings.rDirX), random(...settings.rDirY));
    this.pos = createVector(settings.pos.x, settings.pos.y);
    this.gX = settings.gDir[0];
    this.gY = settings.gDir[1];
    this.velocity = settings.velocity;
    this.toBeRemoved = false;
    this.creation = frameCount;
    this.dir.setMag(settings.velocity);
    this.dir.x += this.gX * this.velocity;
    this.dir.y += this.gY * this.velocity;
    this.shape = settings.shape;
    if (this.shape === "line") {
      this.size = settings.size;
      this.display = this.lineDisplay;
      this.sinDir = sin(this.dir.heading());
      this.cosDir = cos(this.dir.heading());
    } else if (this.shape === "circle") {
      this.size = settings.size;
      this.display = this.circleDisplay;
    }
    this.color = settings.color;
  }
  update() {
    if (frameCount - this.creation > this.lifeTime) {
      this.toBeRemoved = true;
    } else {
      this.dir.x += this.gX * this.velocity;
      this.dir.y += this.gY * this.velocity;
      this.sinDir = sin(this.dir.heading());
      this.cosDir = cos(this.dir.heading());
      this.pos.x += this.dir.x;
      this.pos.y += this.dir.y;
    }
  }
  lineDisplay() {
    this.graphics.noStroke();
    this.graphics.fill(this.color);
    this.graphics.stroke(this.color);
    let endX = this.pos.x + this.size * this.cosDir;
    let endY = this.pos.y + this.size * this.sinDir;
    this.graphics.line(this.pos.x, this.pos.y, endX, endY);
  }
  circleDisplay() {
    this.graphics.noStroke();
    this.graphics.fill(this.color);
    this.graphics.circle(this.pos.x, this.pos.y, this.size);
  }
  display() {
  }
}
class ParticleRenderer {
  constructor(obj, settings) {
    this.settings = Object.assign({
      lifeTime: 255,
      rDirX: [-1, 1],
      rDirY: [-1, 1],
      gDir: [0, 0],
      velocity: 5,
      pos: { x: obj.w / 2, y: obj.h / 2 },
      timer: 1,
      howManyPer: 1,
      size: 50,
      color: "#FF0000",
      shape: "line",
      loop: true,
      autoPlay: true
    }, settings);
    this.particles = [];
    this.graphics = createGraphics(obj.w, obj.h);
    this.ownObject = obj;
    this.lastFrame = this.graphics.get();
    this.allIntervals = [];
    if (this.settings.autoPlay)
      this.addAll();
  }
  addAll() {
    if (this.allIntervals.length !== 0) {
      this.stop();
    }
    this.allIntervals = [
      setInterval(() => {
        for (let i = 0; i < this.settings.howManyPer; i++) {
          this.particles.push(new Particle(this.settings, this.graphics));
        }
        if (!this.settings.loop) {
          clearInterval(this.allIntervals[0]);
          this.onStop();
        }
      }, this.settings.timer),
      setInterval(
        this.asyncDisplay.bind(this),
        1e3 / 60
      ),
      setInterval(
        this.asyncUpdate.bind(this),
        1e3 / 60
      )
    ];
    gameParticle.allIntervals.push(...this.allIntervals);
  }
  onStop() {
  }
  onStep() {
  }
  play() {
    this.reloadLoops();
  }
  stop() {
    for (let index of this.allIntervals) {
      clearInterval(index);
      let _ = gameParticle.allIntervals.indexOf(index);
      if (_ !== -1) {
        gameParticle.allIntervals.splice(_, 1);
      }
    }
    this.allIntervals = [];
  }
  pause() {
    this.stop();
  }
  reloadLoops() {
    this.stop();
    this.addAll();
  }
  asyncUpdate() {
    for (let particle of this.particles) {
      particle.update();
    }
  }
  update() {
    if (this.ownObject.height !== this.graphics.height || this.ownObject.width !== this.graphics.width) {
      this.graphics.resizeCanvas(this.ownObject.height, this.ownObject.width);
    }
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let particle = this.particles[i];
      if (particle.toBeRemoved) {
        this.particles.splice(i, 1);
      }
    }
  }
  asyncDisplay() {
    this.graphics.clear();
    for (let particle of this.particles) {
      particle.display();
    }
    this.onStep();
  }
  display() {
    image(this.graphics, this.ownObject.x, this.ownObject.y);
  }
}
class gameFile extends Component {
  static addGameFile = function(data, type, references) {
    let fileexists;
    if (data !== "") {
      fileexists = checkifexists(data);
    }
    if (!fileexists) {
      let fUUID = engine.customFileUUID(type);
      fileexists = new gameFile(data, fUUID, type);
      fileexists.references = Object.assign({}, references);
    }
    return fileexists;
  };
  constructor(data, UUID, type) {
    super("gameFile");
    this.customData = void 0;
    this.references = {};
    this.UUID = UUID;
    this.type = type;
    let parsedImage = data.toString();
    this.data = parsedImage;
    engine.files[UUID] = this;
    this.whoUses = {};
    if (Engine.fileTypeList[type]) {
      Engine.componentList[Engine.fileTypeList[type]]?.prototype?.onCreateFile(this);
    }
  }
  get isAddable() {
    return false;
  }
  get name() {
    return this.references?.name ? this.references.name : this.UUID;
  }
  editReference(name, value) {
    this.references[name] = value;
    if (!value) {
      delete this.references[name];
    }
  }
  addReference(name, value) {
    this.references[name] = value;
  }
  removeUser(UUID, deleteIfEmpty = false) {
    delete this.whoUses[UUID];
    if (deleteIfEmpty) {
      if (Object.keys(this.whoUses).length == 0) {
        delete engine.files[this.UUID];
      }
    }
  }
  addUser(obj, UUID) {
    this.whoUses[UUID] = obj;
  }
  get File() {
    return this.data;
  }
  set File(value) {
    this.data = value;
  }
}
class gameSpritesheet {
  sWidth;
  sHeight;
  tWidth;
  tHeight;
  constructor(totWidth, totHeight, spriteWidth, spriteHeight) {
    this.sWidth = spriteWidth;
    this.sHeight = spriteHeight;
    this.tWidth = totWidth;
    this.tHeight = totHeight;
  }
  fromIndex(tileIndex) {
    let xindex = tileIndex % (this.tWidth / this.sWidth);
    let yindex = (tileIndex - xindex) / (this.tHeight / this.sHeight);
    return [xindex * this.sWidth, yindex * this.sHeight, this.sWidth, this.sHeight];
  }
}
class gameAnimation {
  spritesheet;
  start;
  end;
  time;
  loop;
  interval;
  yoyo;
  onStep;
  onStop;
  onLoop;
  animIndex;
  constructor(gameSpritesheet2, {
    start = 0,
    end = 0,
    time = 0.5,
    loop = false,
    yoyo = false,
    onStep = () => {
    },
    onStop = () => {
    },
    onLoop = () => {
    }
  }) {
    this.spritesheet = gameSpritesheet2;
    this.start = start;
    this.end = end;
    this.time = time;
    this.loop = loop;
    this.startInd();
    this.interval;
    this.yoyo = yoyo;
    this.onStep = onStep;
    this.onStop = onStop;
    this.onLoop = onLoop;
  }
  set frameRate(value) {
    this.time = value;
    this.pause();
    this.run();
    this.time;
  }
  get frameRate() {
    return this.time;
  }
  play() {
    this.startInd();
    clearInterval(this.interval);
    this.run();
  }
  run() {
    this.interval = setInterval(() => {
      this.onStep();
      this.animIndex += Math.sign(this.end - this.start);
      let surpassedEnd = this.animIndex >= this.end;
      surpassedEnd = this.end > this.start ? surpassedEnd : this.animIndex <= this.end;
      if (surpassedEnd) {
        if (!this.loop) {
          let canStop = this.stop();
          if (canStop)
            this.onStop();
        } else {
          this.reset();
          this.onLoop();
        }
      }
    }, this.time * 1e3);
  }
  startInd() {
    this.animIndex = this.start;
  }
  reverse() {
    let _ = this.start;
    this.start = this.end;
    this.end = _;
  }
  reset() {
    if (this.yoyo) {
      this.reverse();
    }
    this.startInd();
  }
  pause() {
    clearInterval(this.interval);
  }
  stop() {
    if (this.yoyo) {
      if (this.end > this.start) {
        this.reverse();
        return false;
      } else {
        clearInterval(this.interval);
      }
    } else {
      clearInterval(this.interval);
    }
    return true;
  }
}
addComponent("gameScript", gameScript, ".js");
addComponent("gameGlobalScript", gameGlobalScript, ".gjs");
addComponent("gameSprite", gameSprite, ".img");
addComponent("gameModel", gameModel, ".obj");
addComponent("gameFile", gameFile);
addComponent("gameParticle", gameParticle);
function checkifexists(data) {
  for (let file2 of Object.values(engine.files)) {
    if (file2.data === data)
      return file2;
  }
  return false;
}
function addGameFile(data, type, references) {
  let fileexists;
  if (data !== "") {
    fileexists = checkifexists(data);
  }
  if (!fileexists) {
    let fUUID = engine.customFileUUID(type);
    fileexists = new gameFile(data, fUUID, type);
    fileexists.references = Object.assign({}, references);
  }
  return fileexists;
}
