class Box extends GameObject {
  constructor(x, y, w, h) {
    super(x, y, "Box");
    this.width = w;
    this.height = h;
    this.clr = 0;
    this.oldX;
    this.oldY;
    this.typeId = 0;
    this.isCollidable = true;
    this.collisionType = "Rect";
  }
  getCollisionType() {
    return "Rect";
  }
  set width(val) {
    this.w = val;
    this.updateShape();
  }
  get width() {
    return this.w;
  }
  set height(val) {
    this.h = val;
    this.updateShape();
  }
  get height() {
    return this.h;
  }
  get hh() {
    return this.height / 2;
  }
  get hw() {
    return this.width / 2;
  }
  set posX(value) {
    this.x = value;
  }
  get posX() {
    return this.x;
  }
  set posY(value) {
    this.y = value;
  }
  get posY() {
    return this.y;
  }
  updateShape() {
    if (this?.fixture?.GetShape()) {
      this?.fixture?.GetShape()?.SetAsBox(
        this.hw,
        this.hh
        //half height
      );
      this?.fixture?.GetShape()?.SetRadius?.(
        (this.hw + this.hh) / 2
        //Sets Radius to average of both width and height
      );
    }
    this.updatePosition();
  }
  init() {
    if (this?.width && this?.height) {
      if (!this.body) {
        let rigidBody = RAPIER.RigidBodyDesc.dynamic();
        rigidBody.setTranslation((this.x + this.hw) / 50, (this.y + this.hh) / 50);
        rigidBody.lockTranslations();
        rigidBody.lockRotations();
        rigidBody.gravityScale = 0;
        this.body = engine.world.createRigidBody(rigidBody);
        let colliderDesc = RAPIER.ColliderDesc.cuboid(this.width / 100, this.height / 100);
        engine.world.createCollider(colliderDesc, this.body);
      }
    }
  }
  getCollisionVectors() {
    return [{ x: this.x, y: this.y }, { x: this.width, y: this.height }];
  }
  parameterNames() {
    return super.parameterNames().concat(["width", "height"]);
  }
  draw() {
    fill(this.clr);
    rect(this.x, this.y, this.width, this.height);
  }
  display(OnlyDraw, noDraw = false) {
    if (!noDraw) {
      this.draw();
    }
    if (!OnlyDraw)
      this.update();
  }
  collision(obj) {
    let collides = HandleCollision(this, obj);
    if (collides) {
      this.onCollide(obj);
    }
    return collides;
  }
  customDraw() {
    super.customDraw();
    stroke(0, 0, 255);
    line(this.x + this.hw, this.y + this.hh, this.x + this.hw - 30, this.y + this.hh);
    stroke(255, 0, 0);
    line(this.x + this.hw, this.y + this.hh, this.x + this.hw, this.y + this.hh - 30);
    stroke(0);
  }
  offSet(x, y) {
    super.offSet(x, y);
    this.updatePosition();
  }
  updatePosition() {
    this.body?.setTranslation({
      x: (this.x + this.hw) / 50,
      y: (this.y + this.hh) / 50
    });
  }
  update() {
    if (this.x !== this.oldX || this.y !== this.oldY) {
      this.oldX = this.x;
      this.oldY = this.y;
      if (this.body) {
        this.body.setTranslation({
          x: (this.x + this.hw) / 50,
          y: (this.y + this.hh) / 50
        });
        this.body.collider(0).setShape(new RAPIER.Cuboid(
          this.hw / 50,
          this.hh / 50
          //half height)
        ));
      }
    }
  }
  onCollide(obj) {
  }
  getParameters() {
    return super.getParameters().concat(this.width, this.height);
  }
  getEditableArray() {
    return [...super.getEditableArray(), {
      name: "width",
      set: (val) => {
        this.width = val;
      },
      get: () => {
        return this.width;
      },
      value: this.width
    }, {
      name: "height",
      set: (val) => {
        this.height = val;
      },
      get: () => {
        return this.height;
      },
      value: this.height
    }];
  }
}
class Box3D extends GameObject3D {
  constructor(x, y, z, width, height, depth, rx = 0, ry = 0, rz = 0) {
    super(x, y, z, "Box3D");
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.rot = { x: rx, y: ry, z: rz };
    this.alwaysDraw = false;
    this.clr = 0;
    this.typeId = "Box3D";
    this.collisionType = "Box3D";
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
    rayPos.add(this.x, this.y, this.z);
    rayDir = matrix.multiplyDirection(rDir);
    const aabbMin = {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      z: this.z - this.depth / 2
    };
    const aabbMax = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
      z: this.z + this.depth / 2
    };
    let tmin = Number.NEGATIVE_INFINITY;
    let tmax = Number.POSITIVE_INFINITY;
    for (let i of ["x", "y", "z"]) {
      if (rayDir[i] === 0) {
        if (rayPos[i] < aabbMin[i] || rayPos[i] > aabbMax[i]) {
          return null;
        }
      } else {
        let t1 = (aabbMin[i] - rayPos[i]) / rayDir[i];
        let t2 = (aabbMax[i] - rayPos[i]) / rayDir[i];
        if (t1 > t2) {
          [t1, t2] = [t2, t1];
        }
        tmin = Math.max(tmin, t1);
        tmax = Math.min(tmax, t2);
        if (tmin > tmax) {
          return null;
        }
      }
    }
    return { tmin, tmax };
  }
  getCollisionVectors() {
    return [{ x: this.x, y: this.y, z: this.z }, { x: this.width, y: this.height, z: this.depth }, this.rot];
  }
  getEditableArray() {
    return [
      ...super.getEditableArray(),
      {
        name: "width",
        set: (val) => {
          this.width = val;
        },
        get: () => {
          return this.width;
        },
        value: this.width
      },
      {
        name: "height",
        set: (val) => {
          this.height = val;
        },
        get: () => {
          return this.height;
        },
        value: this.height
      },
      {
        name: "depth",
        set: (val) => {
          this.depth = val;
        },
        get: () => {
          return this.depth;
        },
        value: this.depth
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
  getCollisionType() {
    return "Box3D";
  }
  getParameters() {
    return super.getParameters().concat(this.width, this.height, this.depth, this.rot.x, this.rot.y, this.rot.z);
  }
  parameterNames() {
    return super.parameterNames().concat("width", "height", "depth", "rx", "ry", "rz");
  }
  draw() {
    push();
    fill(this.clr);
    translate(this.x, this.y, this.z);
    rotateX(this.rot.x);
    rotateY(this.rot.y);
    rotateZ(this.rot.z);
    box(this.width, this.height, this.depth);
    pop();
  }
}
class Plane extends Box3D {
  constructor(x, y, z, width, height, rx = 0, ry = 0, rz = 0) {
    super(x, y, z, width, height, 1, rx, ry, rz);
    this.tag = "Plane";
  }
  getParameters() {
    return GameObject3D.prototype.getParameters().concat(this.width, this.height, this.rot.x, this.rot.y, this.rot.z);
  }
  parameterNames() {
    return super.parameterNames().concat("width", "height", "rx", "ry", "rz");
  }
  getEditableArray() {
    let _ = super.getEditableArray();
    _.splice(5, 1);
    return _;
  }
}
