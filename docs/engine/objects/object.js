class GameObject extends GameEvents {
  constructor(x, y, tag) {
    super();
    this.x = x;
    this.y = y;
    this.z = 0;
    this.rot = { x: 0, y: 0, z: 0 };
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
    this.models = [];
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
    this.sprites = [];
    this.shown = {};
    this.collisionType = "Sphere";
    this.imageInitialized = false;
    this.alwaysDraw = false;
    this.is3D = true;
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
    return [this.x, this.y, this.z];
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
  rayIntersection(rayPos, rayDir) {
    const sphereCenter = { x: this.x, y: this.y, z: this.z };
    const sphereRadius = 2;
    const oc = {
      x: rayPos.x - sphereCenter.x,
      y: rayPos.y - sphereCenter.y,
      z: rayPos.z - sphereCenter.z
    };
    const a = rayDir.x * rayDir.x + rayDir.y * rayDir.y + rayDir.z * rayDir.z;
    const b = 2 * (oc.x * rayDir.x + oc.y * rayDir.y + oc.z * rayDir.z);
    const c = oc.x * oc.x + oc.y * oc.y + oc.z * oc.z - sphereRadius * sphereRadius;
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      return false;
    } else {
      const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      if (t1 >= 0 || t2 >= 0) {
        return Boolean(Math.min(t1, t2));
      } else {
        return false;
      }
    }
  }
}
class Sphere extends GameObject3D {
  r;
  rot;
  constructor(x, y, z, radius, rx = 0, ry = 0, rz = 0) {
    super(x, y, z, "Sphere");
    this.rot = { x: rx, y: ry, z: rz };
    this.r = radius;
    this.clr = 0;
  }
  getCollisionVectors() {
    return [{ x: this.x, y: this.y, z: this.z }, this.r];
  }
  getEditableArray() {
    return [...super.getEditableArray(), {
      name: "radius",
      set: (num) => {
        this.r = num;
        this?.updateShape?.();
      },
      get: () => {
        return this.r;
      },
      value: this.r
    }];
  }
  rayIntersection(rayPos, rayDir) {
    const sphereCenter = { x: this.x, y: this.y, z: this.z };
    const sphereRadius = this.r;
    const oc = {
      x: rayPos.x - sphereCenter.x,
      y: rayPos.y - sphereCenter.y,
      z: rayPos.z - sphereCenter.z
    };
    const a = rayDir.x * rayDir.x + rayDir.y * rayDir.y + rayDir.z * rayDir.z;
    const b = 2 * (oc.x * rayDir.x + oc.y * rayDir.y + oc.z * rayDir.z);
    const c = oc.x * oc.x + oc.y * oc.y + oc.z * oc.z - sphereRadius * sphereRadius;
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      return false;
    } else {
      const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      if (t1 >= 0 || t2 >= 0) {
        return Boolean(Math.min(t1, t2));
      } else {
        return false;
      }
    }
  }
  getParameters() {
    return [this.x, this.y, this.z, this.r, this.rot.x, this.rot.y, this.rot.z];
  }
  parameterNames() {
    return ["x", "y", "z", "radius", "rotationX", "rotationY", "rotationZ"];
  }
  draw() {
    push();
    fill(this.clr);
    translate(this.x, this.y, this.z);
    sphere(this.r);
    pop();
  }
}
