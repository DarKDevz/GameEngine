var player;
let stick;
let jumpBtn;
class Player {
  shouldJump;
  constructor() {
    this.pos = createVector(400, -1e3);
    this.size = createVector(30, 70);
    this.vel = createVector(0, 0);
    this.old = createVector(0, 0);
    this.cameraPos = { x: this.pos.x, y: this.pos.y };
    this.godMode = false;
    this.grounded = false;
    this.colliding = false;
    this.collidedId = null;
    this.groundedId = null;
    this.shootingDelay = 300;
    this.lastShotTime = 0;
    this.collisionType = "Rect";
    this.savedX = 0;
    this.skipNext = false;
    this.dir = {
      "left": false,
      "right": false,
      "up": false,
      "down": false
    };
    this.shouldJump = false;
    engine.onload("Joystick", (obj) => {
      obj.dir = this.dir;
    });
    engine.onload("Button", (obj) => {
      obj.cb = [() => {
        this.shouldJump = true;
      }, () => {
        this.shouldJump = false;
      }];
    });
    if (engine.mobile)
      engine.camera.zoom = 0.7;
    let rigidBody = RAPIER.RigidBodyDesc.dynamic();
    rigidBody.setTranslation((this.pos.x + 15) / 50, (this.pos.y + 35) / 50);
    rigidBody.lockTranslations();
    rigidBody.lockRotations();
    rigidBody.gravityScale = 0;
    this.body = engine.world.createRigidBody(rigidBody);
    let colliderDesc = RAPIER.ColliderDesc.cuboid(this.size.x / 100, this.size.y / 100);
    engine.world.createCollider(colliderDesc, this.body);
    engine.cameraPos = this.cameraPos;
  }
  get x() {
    return this.pos.x;
  }
  get y() {
    return this.pos.y;
  }
  get width() {
    return this.size.x;
  }
  get height() {
    return this.size.y;
  }
  getCollisionType() {
    return "Rect";
  }
  getCollisionVectors() {
    return [{ x: this.pos.x, y: this.pos.y }, { x: this.size.x, y: this.size.y }];
  }
  display(shouldRun = true) {
    if (!shouldRun)
      return 1;
    fill(125);
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
  }
  update() {
    this.old = this.pos.copy();
    let overui = window["overUI"] !== void 0 ? overUI : false;
    let notDoingInput = document.activeElement === document.body || document.activeElement === window.canvas;
    if (notDoingInput) {
      if (mouseIsPressed && !overui) {
        this.shootTowards(mouseX, mouseY);
      }
      let right, left, up, down;
      this.dir["up"] = this.dir["up"] ? true : this.shouldJump;
      right = keyIsDown(68) || keyIsDown(39) || this.dir["right"];
      left = keyIsDown(65) || keyIsDown(37) || Math.abs(this.dir["left"] * 1);
      up = keyIsDown(87) || keyIsDown(38) || keyIsDown(32) || this.dir["up"];
      down = keyIsDown(91) || keyIsDown(16) || keyIsDown(40) || this.dir["down"];
      if (up && this.godMode) {
        this.vel.y = -7;
      }
      if (up && this.grounded) {
        this.grounded = false;
        this.vel.y = -7;
      }
      if (left) {
        this.vel.x -= 5 * left;
      }
      if (right) {
        this.vel.x += 5 * right;
      }
      if (left && down) {
        this.vel.x += 2 * down;
      }
      if (right && down) {
        this.vel.x -= 2 * down;
      }
      if (down) {
        let SizeY = this.size.y;
        this.size.y = lerp(this.size.y, 45, 0.5);
        this.pos.y += SizeY - this.size.y;
      } else if (this.size.y != 70) {
        let SizeY = this.size.y;
        this.size.y = lerp(this.size.y, 70, 0.5);
        this.pos.y += SizeY - this.size.y;
      }
    }
    if (this.grounded)
      this.vel.y = 0;
    else {
      this.vel.y += 0.1;
    }
    this.pos.y += 1 * this.vel.y;
    this.vel.x = this.vel.x * 0.7;
    if (this.vel.x < 1e-4 && this.vel.x > 0)
      this.vel.x = 0;
    else if (this.vel.x > -1e-4 && this.vel.x < 0)
      this.vel.x = 0;
    this.pos.x += 1 * this.vel.x;
    if (this.pos.y > engine.getActiveScene().maxPos) {
      this.playerDeath();
    }
    if (this.body) {
      this.body.setTranslation({ x: (this.pos.x + this.size.x / 2) / 50, y: (this.pos.y + this.size.y / 2) / 50 }, true);
      this.body.collider(0).setShape(new RAPIER.Cuboid(
        this.size.x / 100,
        this.size.y / 100
        //half height)
      ));
    }
    for (let i in engine.allCollisions.Player) {
      if (engine.uuidList[i]?.constructor.name !== "Bullet") {
        engine.uuidList[i]?.onCollide(this);
      }
    }
  }
  playerDeath() {
    this.pos = engine.getActiveScene().pos.copy();
    this.size = createVector(30, 70);
    this.vel = createVector(0, 0);
    this.old = createVector(0, 0);
  }
  collision(id) {
    let t_box = engine.getfromUUID(id);
    if (t_box && t_box.isCollidable)
      return t_box.collision(this);
  }
  posCenter() {
    return this.center(this.size, this.pos);
  }
  center(v, v1) {
    let t_v = v.copy().div(2).add(v1);
    return t_v;
  }
  yCollision(id) {
    let t_box = engine.getfromUUID(id);
    let bpos = createVector(t_box.x, t_box.y);
    let bsize = createVector(t_box.width, t_box.height);
    let t_center = this.center(bsize, bpos);
    let pos_center = this.posCenter();
    if (pos_center.y < t_center.y) {
      let distance = this.size.copy().div(2).y + bsize.copy().div(2).y - (t_center.y - pos_center.y);
      this.pos.y -= distance;
      this.grounded = true;
      this.groundedId = id;
    }
    if (pos_center.y > t_center.y) {
      this.vel.y = 0;
      let distance = this.size.copy().div(2).y + bsize.copy().div(2).y + (t_center.y - pos_center.y);
      this.pos.y += distance;
    }
  }
  xCollision(id) {
    let t_box = engine.getfromUUID(id);
    let bpos = createVector(t_box.x, t_box.y);
    let bsize = createVector(t_box.width, t_box.height);
    let t_center = this.center(bsize, bpos);
    let pos_center = this.posCenter();
    if (pos_center.x < t_center.x) {
      this.vel.x = 0;
      let distance = this.size.copy().div(2).x + bsize.copy().div(2).x - (t_center.x - pos_center.x);
      this.pos.x -= distance;
    }
    if (pos_center.x > t_center.x) {
      this.vel.x = 0;
      let distance = this.size.copy().div(2).x + bsize.copy().div(2).x + (t_center.x - pos_center.x);
      this.pos.x += distance;
    }
  }
  onCollide(id) {
    let t_box = engine.getfromUUID(id);
    if (!t_box)
      return;
    let bpos = createVector(t_box.oldX, t_box.oldY);
    let bsize = createVector(t_box.width, t_box.height);
    let tcenter = this.center(bsize, bpos);
    let pcenter = this.center(this.size, this.old);
    if (abs(pcenter.x - tcenter.x) > bsize.x / 2 + this.size.x / 2 - 1) {
      this.xCollision(id);
    } else {
      this.yCollision(id);
    }
  }
  shootTowards(mx, my) {
    let toMouse = createVector(-(width / 2 - mx), -(height / 2 - my));
    const direction = {
      x: cos(toMouse.heading()),
      y: sin(toMouse.heading())
    };
    const currentTime = Date.now();
    const timeSinceLastShot = currentTime - this.lastShotTime;
    if (timeSinceLastShot >= this.shootingDelay) {
      let bullet = new Bullet(this.posCenter().x, this.posCenter().y, direction.x, direction.y);
      engine.getActiveScene().boxes.push(bullet);
      this.lastShotTime = currentTime;
    }
  }
  checkCollisions() {
    let found = false;
    let groundExists = false;
    let wasColliding = this.grounded;
    if (wasColliding) {
      this.pos.y--;
    }
    for (let box of engine.getActiveScene().boxes) {
      let c = this.collision(box.uuid);
      if (c) {
        this.collidedId = box.uuid;
        this.onCollide(box.uuid);
      }
      if (!found) {
        found = c;
      }
      if (this.grounded && box.uuid == this.groundedId) {
        groundExists = true;
        this.pos.y++;
        this.grounded = this.collision(box.uuid);
        if (this.grounded)
          this.groundedId = box.uuid;
        this.pos.y--;
      }
    }
    if (wasColliding) {
      this.pos.y++;
    }
    if (!groundExists) {
      this.grounded = false;
    }
    this.colliding = found;
    return this.colliding;
  }
  camera() {
    let pos = this.posCenter();
    this.cameraPos.x = lerp(this.cameraPos.x, pos.x, 0.25);
    this.cameraPos.y = lerp(this.cameraPos.y, pos.y, 0.25);
    resetMatrix();
  }
}
