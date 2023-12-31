class GameObject extends GameEvents {
  constructor(x, y, tag) {
    super();
    this.x = x;
    this.y = y;
    this.z = 0;
    this.width = 1;
    this.height = 1;
    this.isCollidable = false;
    this.tag = tag;
    this.scene = "Not set";
    this.components = [];
    this.overrides = {};
    this.savedFuncs = {};
    this.newOverrides = {};
    this.uuid = engine.generateUUID();
    this.sprites = [];
    this.shown = {};
    this.collisionType = "Circle";
    this.imageInitialized = false;
    this.alwaysDraw = false;
    this.is3D = false;
    engine.uuidList[this.uuid] = this;
  }
  updateComponents() {
    for (let component of this.components) {
      component.update();
    }
  }
  resize(ww, wh) {
  }
  keyPress(event) {
  }
  getCollisionType() {
    return "Circle";
  }
  /**
   * @type Array
   * @returns a Collision Vector
   */
  getCollisionVectors() {
    return [{ x: this.x, y: this.y }, 2];
  }
  jsonComponents() {
    let ret = [];
    for (let comp of this.components) {
      ret.push(comp.toJson());
    }
    return ret;
  }
  display(OnlyDraw, noDraw = false) {
    if (!noDraw) {
      this.draw();
    }
    if (!OnlyDraw)
      this.update();
  }
  draw() {
    throw new Error("Method not implemented.");
  }
  init() {
  }
  getClassName() {
    return "GameObject";
  }
  offSet(x, y, w, h) {
    this.x = x;
    this.y = y;
  }
  getParameters() {
    return [this.x, this.y];
  }
  getEditableArray() {
    return [{
      name: "x",
      set: (num) => {
        this.x = num;
        this?.updateShape?.();
      },
      get: () => {
        return this.x;
      },
      value: this.x
    }, {
      name: "y",
      set: (num) => {
        this.y = num;
        this?.updateShape?.();
      },
      get: () => {
        return this.y;
      },
      value: this.y
    }];
  }
  /*     getValues(): any[] {
          return [this.x, this.y];
      } */
  parameterNames() {
    return ["x", "y"];
  }
  collision(obj, trigger = false) {
    let collides = HandleCollision(obj, this);
    if (collides && trigger)
      this.onCollide(obj);
    return collides;
  }
  onCollide(obj) {
  }
  update() {
  }
  earlyUpdate() {
  }
  lateUpdate() {
  }
  customDraw() {
    point(this.x, this.y);
  }
  delete() {
    delete engine.uuidList[this.uuid];
    this.removeBody();
  }
  removeBody() {
    if (this.body) {
      engine.world.removeRigidBody(this.body);
      this.body = void 0;
    }
  }
  addScriptByName(name, vals) {
    engine.addScriptByName(name, vals, this);
  }
}
class GameObject3D extends GameObject {
  constructor(x, y, z, tag) {
    super(x, y, tag);
    this.z = z;
    this.depth = 1;
    this.scene = "Not set";
    this.components = [];
    this.overrides = {};
    this.savedFuncs = {};
    this.newOverrides = {};
    this.uuid = engine.generateUUID();
    this.sprites = [];
    this.shown = {};
    this.collisionType = "Sphere";
    this.imageInitialized = false;
    this.alwaysDraw = false;
    this.is3D = true;
    engine.uuidList[this.uuid] = this;
  }
  offSet(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  getCollisionType() {
    return "Sphere";
  }
  getCollisionVectors() {
    return [{ x: this.x, y: this.y, z: this.z }, 2];
  }
  display(OnlyDraw, noDraw = false) {
    if (!noDraw)
      this.draw();
    if (!OnlyDraw)
      this.update();
  }
  draw() {
    throw new Error("Method not implemented.");
  }
  getParameters() {
    [this.x, this.y, this.z];
  }
  parameterNames() {
    ["x", "y", "z"];
  }
  getEditableArray() {
    return [{
      name: "x",
      set: (num) => {
        this.x = num;
        this?.updateShape?.();
      },
      get: () => {
        return this.x;
      },
      value: this.x
    }, {
      name: "y",
      set: (num) => {
        this.y = num;
        this?.updateShape?.();
      },
      get: () => {
        return this.y;
      },
      value: this.y
    }, {
      name: "z",
      set: (num) => {
        this.z = num;
        this?.updateShape?.();
      },
      get: () => {
        return this.z;
      },
      value: this.z
    }];
  }
}
