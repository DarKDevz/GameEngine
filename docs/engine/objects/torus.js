class Torus extends GameObject3D {
  constructor(x, y, z, tubeRadius, radius) {
    super(x, y, z);
    this.tubeRadius = tubeRadius;
    this.radius = radius;
  }
  draw() {
    push();
    this.material.apply();
    translate(this.x, this.y, this.z);
    rotateX(this.rot.x);
    rotateY(this.rot.y);
    rotateZ(this.rot.z);
    torus(this.radius, this.tubeRadius);
    pop();
  }
  rayIntersection(rPos, rDir) {
    beginGeometry();
    torus(this.radius, this.tubeRadius);
    let shape = endGeometry();
    return this.rayShapeIntersection(rPos, rDir, shape);
  }
  getCollisionVectors() {
    return [{ x: this.x, y: this.y, z: this.z }, { x: this.tubeRadius, y: this.radius }, this.rot];
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
        name: "tubeRadius",
        set: (val) => {
          this.tubeRadius = val;
        },
        get: () => {
          return this.tubeRadius;
        },
        value: this.tubeRadius
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
    return "Cone";
  }
  getParameters() {
    return super.getParameters().concat(this.tubeRadius, this.radius, this.rot.x, this.rot.y, this.rot.z);
  }
  parameterNames() {
    return super.parameterNames().concat("tubeRadius", "radius", "rx", "ry", "rz");
  }
}
