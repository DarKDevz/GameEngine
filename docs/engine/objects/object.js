class GameObject extends GameEvents {
  constructor(x, y, tag) {
    super();
    this.x = x;
    this.y = y;
    this.z = 0;
    this.clr = 0;
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
    this.material = new Material();
    this.material.set(fill, [() => this.clr], 0);
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
    return ["x", "y", "z"];
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
  rayShapeIntersection(rPos, rDir, shape) {
    let pos = createVector(this.x, this.y, this.z);
    let matrix = new p5.Matrix();
    matrix.rotateX(this.rot.x);
    matrix.rotateY(this.rot.y);
    matrix.rotateZ(this.rot.z);
    matrix.invert(matrix);
    let rayPos = createVector(rPos.x, rPos.y, rPos.z);
    let rayDir = createVector(rDir.x, rDir.y, rDir.z);
    rayPos.sub(pos);
    rayPos = matrix.multiplyPoint(rayPos);
    rayDir = matrix.multiplyDirection(rDir);
    let relativePos = rayPos.copy();
    rayPos.add(pos);
    for (let i of shape.faces) {
      if (rayTriangleIntersection(relativePos, rayDir, [shape.vertices[i[0]], shape.vertices[i[1]], shape.vertices[i[2]]])) {
        return true;
      }
    }
    return false;
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
    this.material.apply();
    translate(this.x, this.y, this.z);
    sphere(this.r);
    pop();
  }
}
class Ellipse extends GameObject3D {
  radius;
  rot;
  constructor(x, y, z, radiusX, radiusY, radiusZ, rx = 0, ry = 0, rz = 0) {
    super(x, y, z, "Ellipse");
    this.rot = { x: rx, y: ry, z: rz };
    this.radius = { x: radiusX, y: radiusY, z: radiusZ };
  }
  getCollisionType() {
    return "Ellipse";
  }
  getCollisionVectors() {
    return [{ x: this.x, y: this.y, z: this.z }, this.radius];
  }
  getEditableArray() {
    return [
      ...super.getEditableArray(),
      {
        name: "radiusX",
        set: (num) => {
          this.radius.x = num;
          this?.updateShape?.();
        },
        get: () => {
          return this.radius.x;
        },
        value: this.radius.x
      },
      {
        name: "radiusY",
        set: (num) => {
          this.radius.y = num;
          this?.updateShape?.();
        },
        get: () => {
          return this.radius.y;
        },
        value: this.radius.y
      },
      {
        name: "radiusZ",
        set: (num) => {
          this.radius.z = num;
          this?.updateShape?.();
        },
        get: () => {
          return this.radius.z;
        },
        value: this.radius.z
      },
      {
        name: "rx",
        set: (val) => {
          this.rot.x = val;
        },
        get: () => {
          return this.rot.x;
        },
        value: this.rot.x
      },
      {
        name: "ry",
        set: (val) => {
          this.rot.y = val;
        },
        get: () => {
          return this.rot.y;
        },
        value: this.rot.y
      },
      {
        name: "rz",
        set: (val) => {
          this.rot.z = val;
        },
        get: () => {
          return this.rot.z;
        },
        value: this.rot.z
      }
    ];
  }
  rayIntersection(rPos, rDir) {
    let matrix = new p5.Matrix();
    matrix.rotateX(this.rot.x);
    matrix.rotateY(this.rot.y);
    matrix.rotateZ(this.rot.z);
    matrix.invert(matrix);
    let rayPos = createVector(rPos.x, rPos.y, rPos.z);
    let rayDir = createVector(rDir.x, rDir.y, rDir.z);
    rayPos.sub(this.x, this.y, this.z);
    rayPos = matrix.multiplyPoint(rayPos);
    rayDir = matrix.multiplyDirection(rDir);
    let a = rayDir.x * rayDir.x / (this.radius.x * this.radius.x) + rayDir.y * rayDir.y / (this.radius.y * this.radius.y) + rayDir.z * rayDir.z / (this.radius.z * this.radius.z);
    let b = 2 * rayPos.x * rayDir.x / (this.radius.x * this.radius.x) + 2 * rayPos.y * rayDir.y / (this.radius.y * this.radius.y) + 2 * rayPos.z * rayDir.z / (this.radius.z * this.radius.z);
    let c = rayPos.x * rayPos.x / (this.radius.x * this.radius.x) + rayPos.y * rayPos.y / (this.radius.y * this.radius.y) + rayPos.z * rayPos.z / (this.radius.z * this.radius.z) - 1;
    let d = b * b - 4 * a * c;
    if (d < 0) {
      return false;
    } else {
      d = sqrt(d);
    }
    let hit = (-b + d) / (2 * a);
    let hit_ = (-b - d) / (2 * a);
    return true;
  }
  getParameters() {
    return [this.x, this.y, this.z, this.radius.x, this.radius.y, this.radius.z, this.rot.x, this.rot.y, this.rot.z];
  }
  parameterNames() {
    return ["x", "y", "z", "radiusX", "radiusY", "radiusZ", "rotationX", "rotationY", "rotationZ"];
  }
  draw() {
    push();
    this.material.apply();
    translate(this.x, this.y, this.z);
    rotateX(this.rot.x);
    rotateY(this.rot.y);
    rotateZ(this.rot.z);
    ellipsoid(this.radius.x, this.radius.y, this.radius.z);
    pop();
  }
}
