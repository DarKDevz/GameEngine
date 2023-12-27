class movingPlatform extends Box {
  constructor(x, y, w, h, x1, x2) {
    super(x, y, w, h);
    this.direction = "r";
    this.x1 = x1;
    this.x2 = x2;
    this.typeId = 2;
  }
  init() {
    if (!this)
      return;
    if (!this.height)
      return;
    if (!this.width)
      return;
    if (this.width && this.height) {
      if (!this.body) {
        let rigidBody = RAPIER.RigidBodyDesc.dynamic();
        rigidBody.setTranslation((this.x + this.hw) / 50, (this.y + this.hh) / 50);
        this.body = engine.world.createRigidBody(rigidBody);
        let colliderDesc = RAPIER.ColliderDesc.cuboid(this.width / 100, this.height / 100);
        engine.world.createCollider(colliderDesc, this.body);
      }
    }
    if (!player)
      this.earlyUpdate = () => {
      };
  }
  getClassName() {
    return "movingPlatform";
  }
  offSet(x, y, diffX = 0, diffY = 0) {
    this.x1 += diffX;
    this.x2 += diffX;
    super.offSet(x, y);
  }
  draw() {
    fill(this.clr);
    rect(this.x, this.y, this.width, this.height);
  }
  getParameters() {
    return super.getParameters().concat(this.x1, this.x2);
  }
  getEditableArray() {
    return [...super.getEditableArray(), {
      name: "Point A",
      set: (val) => {
        this.x1 = val;
      },
      get: () => {
        return this.x1;
      },
      value: this.x1
    }, {
      name: "Point B",
      set: (val) => {
        this.x2 = val;
      },
      get: () => {
        return this.x2;
      },
      value: this.x2
    }];
  }
  parameterNames() {
    return [...super.parameterNames(), "placeX1", "placeX2"];
  }
  earlyUpdate() {
    if (player.grounded && player.groundedId === this.uuid) {
      player.pos.x -= this.oldX - this.x;
    }
  }
  lateUpdate() {
    if (this.x + this.width < this.x2 && this.direction == "r") {
      this.x += 3;
    } else {
      this.direction = "l";
    }
    if (this.direction == "l") {
      this.x -= 3;
    }
    if (this.x < this.x1)
      this.direction = "r";
  }
  customDraw() {
    stroke(0, 0, 255);
    line(this.x + this.width / 2, this.y + this.height / 2, this.x1, this.y + this.height / 2);
    stroke(255, 0, 0);
    line(this.x + this.width / 2, this.y + this.height / 2, this.x2, this.y + this.height / 2);
    stroke(0);
  }
}
