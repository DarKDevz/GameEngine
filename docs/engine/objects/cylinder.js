class Cylinder extends GameObject3D {
  constructor(x, y, z, height, radius) {
    super(x, y, z);
    this.height = height;
    this.radius = radius;
  }
  draw() {
    push();
    this.material.apply();
    translate(this.x, this.y, this.z);
    rotateX(this.rot.x);
    rotateY(this.rot.y);
    rotateZ(this.rot.z);
    cylinder(this.height, this.radius);
    pop();
  }
  rayIntersection(rPos, rDir) {
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
    let a = rayDir.x * rayDir.x + rayDir.z * rayDir.z;
    let b = 2 * (relativePos.x * rayDir.x + relativePos.z * rayDir.z);
    let c = relativePos.x * relativePos.x + relativePos.z * relativePos.z - this.radius * this.radius;
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      return false;
    } else {
      let t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      let t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      let point1 = relativePos.copy().add(rayDir.copy().mult(t1));
      let point2 = relativePos.copy().add(rayDir.copy().mult(t2));
      return abs(point1.y) < this.height / 2 || abs(point2.y) < this.height / 2 || abs(point1.y + point2.y) < this.height;
    }
    return false;
  }
  getCollisionVectors() {
    return [{ x: this.x, y: this.y, z: this.z }, { x: this.height, y: this.radius }, this.rot];
  }
  getEditableArray() {
    return [
      ...super.getEditableArray(),
      {
        name: "radius",
        set: (val) => {
          this.radius = val;
        },
        get: () => {
          return this.radius;
        },
        value: this.radius
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
    return "Cylinder";
  }
  getParameters() {
    return super.getParameters().concat(this.height, this.radius, this.rot.x, this.rot.y, this.rot.z);
  }
  parameterNames() {
    return super.parameterNames().concat("height", "radius", "rx", "ry", "rz");
  }
}
