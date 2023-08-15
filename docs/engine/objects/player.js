var player;
let stick;
class Player {
    constructor() {
        this.pos = createVector(400, -1000);
        this.size = createVector(30, 70);
        this.vel = createVector(0, 0);
        this.old = createVector(0, 0);
        this.cameraPos = { x: this.pos.x, y: this.pos.y };
        this.godMode = false;
        this.grounded = false;
        this.colliding = false;
        this.collidedId = null;
        this.groundedId = null;
        this.shootingDelay = 300; // Delay between shots in milliseconds
        this.lastShotTime = 0; // Time of the last shot in milliseconds
        this.collisionType = 'Rect';
        this.savedX = 0;
        this.skipNext = false;
        this.dir = {
            "left": false,
            "right": false,
            "up": false,
            "down": false
        };
        if (navigator.userAgent.includes("Mobile")) {
            let baseSize = windowHeight / 3;
            let stickSize = windowHeight / 6;
            stick = new Joystick(baseSize / 1.5, windowHeight - baseSize / 1.5, baseSize, stickSize);
        }
        //Enable Running physics
        //world.gravity.y = 5;
    }
    buttonDirection(button, direction) {
        button.mousePressed(() => {
            mouseIsPressed = false;
            this.dir[direction] = true;
        });
        button.mouseReleased(() => {
            this.dir[direction] = false;
        });
        return button;
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
        return 'Rect';
    }
    getCollisionVectors() {
        return [this.pos, this.size];
    }
    display(shouldRun = true) {
        if (!shouldRun)
            return 1;
        fill(125);
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        //if(this.body) DrawAll()
        //DrawShape(this.body.GetFixtureList().GetShape(),this.body.m_xf)
        //this.phySprite.draw();
        //fill(125);
        //rect(this.pos.x, this.pos.x, this.size.x, this.size.y);
        //this.groundDetector.draw();
        //this.SideDetector.draw();
        if (!this.body) {
            if (navigator.userAgent.includes("Mobile")) {
                engine.camera.zoom = .7;
            }
            let bodyDef = new b2BodyDef;
            var fixDef = new b2FixtureDef;
            fixDef.density = 1.0;
            fixDef.friction = 0.5;
            fixDef.restitution = 0;
            bodyDef.type = b2Body.b2_dynamicBody;
            fixDef.shape = new b2PolygonShape;
            fixDef.shape.SetAsBox(this.size.x / 2 //half width
            , this.size.y / 2 //half height
            );
            bodyDef.position.x = this.posCenter().x;
            bodyDef.position.y = this.posCenter().y;
            //this.body = new p2.Body({mass:0,position:[this.x,-this.y],fixedRotation : true})
            //this.body.addShape(new p2.Box({ width: this.width,height:this.height}));
            this.body = engine.world.CreateBody(bodyDef);
            this.body.CreateFixture(fixDef);
            this.body.SetFixedRotation(true);
            //Continuous Collision Detection
            this.body.SetBullet(true);
            //User data for contact listener
            this.body.SetUserData(this);
            //Custom gravity scale i made
            this.body.gravityScale = new b2Vec2(0, 0);
            //We override this so we can use our own physics things
            engine.physics = true;
            engine.cameraPos = this.cameraPos;
        }
    }
    update() {
        this.old = this.pos.copy();
        //controlller
        let overui = window['overUI'] !== undefined ? overUI : false;
        let notDoingInput = document.activeElement === document.body || document.activeElement === window.canvas;
        stick?.display();
        if (notDoingInput) {
            /*figure out way to get only mousePos which isn't touching anything*/
            stick?.update(this.dir);
            if (mouseIsPressed && !overui) {
                //console.log(overui)
                if (!navigator.userAgent.includes("Mobile")) {
                    this.shootTowards(mouseX, mouseY);
                }
                else {
                    for (let touch of touches) {
                        if (!touch?.used) {
                            this.shootTowards(touch.x, touch.y);
                        }
                    }
                }
            }
            let right, left, up, down;
            right = keyIsDown(68) || keyIsDown(39) || this.dir["right"];
            left = keyIsDown(65) || keyIsDown(37) || Math.abs(this.dir["left"] * 1);
            up = keyIsDown(87) || keyIsDown(38) || this.dir["up"];
            down = keyIsDown(91) || keyIsDown(16) || keyIsDown(40) || this.dir["down"];
            //Space
            if (up && this.godMode) {
                this.vel.y = -7;
            }
            if (up && this.grounded) {
                this.grounded = false;
                this.vel.y = -7;
                //this.phySprite.vel.y = this.vel.y;
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
                this.size.y = lerp(this.size.y, 45, .5);
                this.pos.y += SizeY - this.size.y;
            }
            else if (this.size.y != 70) {
                let SizeY = this.size.y;
                this.size.y = lerp(this.size.y, 70, .5);
                ;
                this.pos.y += SizeY - this.size.y;
            }
        }
        //Y vel
        if (this.grounded)
            this.vel.y = 0;
        else {
            this.vel.y += .1;
        }
        this.pos.y += 1 * this.vel.y;
        //if(this.grounded && !this.colliding) this.grounded = false;
        //X vel
        this.vel.x = this.vel.x * .7;
        if (this.vel.x < 0.0001 && this.vel.x > 0)
            this.vel.x = 0;
        else if (this.vel.x > -0.0001 && this.vel.x < 0)
            this.vel.x = 0;
        this.pos.x += 1 * this.vel.x;
        if (this.pos.y > engine.getActiveScene().maxPos) {
            this.playerDeath();
        }
        if (this.body) {
            this.body.SetLinearVelocity({ x: this.vel.x, y: this.vel.y });
            this.body.SetPosition(this.posCenter());
            this.body.GetFixtureList().GetShape().SetAsBox(this.size.x / 2 //half width
            , this.size.y / 2 //half height
            );
        }
    }
    playerDeath() {
        this.pos = engine.getActiveScene().pos.copy();
        this.size = createVector(30, 70);
        //this.phySprite.pos = this.posCenter();
        this.vel = createVector(0, 0);
        //this.phySprite.vel = this.vel;
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
        //Y Collision
        if (pos_center.y < t_center.y) {
            let distance = (this.size.copy().div(2).y + bsize.copy().div(2).y) - (t_center.y - pos_center.y);
            this.pos.y -= distance;
            this.grounded = true;
            this.groundedId = id;
        }
        if (pos_center.y > t_center.y) {
            this.vel.y = 0;
            let distance = (this.size.copy().div(2).y + bsize.copy().div(2).y) + (t_center.y - pos_center.y);
            this.pos.y += distance + 1;
        }
    }
    xCollision(id) {
        let t_box = engine.getfromUUID(id);
        let bpos = createVector(t_box.x, t_box.y);
        let bsize = createVector(t_box.width, t_box.height);
        let t_center = this.center(bsize, bpos);
        let pos_center = this.posCenter();
        //X Collision
        if (pos_center.x < t_center.x) {
            this.vel.x = 0;
            let distance = (this.size.copy().div(2).x + bsize.copy().div(2).x) - (t_center.x - pos_center.x);
            this.pos.x -= distance + 2;
        }
        if (pos_center.x > t_center.x) {
            this.vel.x = 0;
            let distance = (this.size.copy().div(2).x + bsize.copy().div(2).x) + (t_center.x - pos_center.x);
            this.pos.x += distance + 2;
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
        if (abs(pcenter.x - tcenter.x) > (bsize.x / 2 + this.size.x / 2) - 1) {
            this.xCollision(id);
        }
        else {
            this.yCollision(id);
        }
    }
    shootTowards(mx, my) {
        let toMouse = createVector(-(width / 2 - mx), -(height / 2 - my));
        const direction = {
            x: cos(toMouse.heading()),
            y: sin(toMouse.heading())
        };
        //console.log(direction)
        const currentTime = Date.now();
        const timeSinceLastShot = currentTime - this.lastShotTime;
        if (timeSinceLastShot >= this.shootingDelay) {
            let bullet = new Bullet(this.posCenter().x, this.posCenter().y, direction.x, direction.y);
            engine.getActiveScene().boxes.push(bullet);
            this.lastShotTime = currentTime;
        }
    }
    checkCollisions() {
        //Platforming engine strips
        //Away all physics code because
        //It's way too complicated to implement an object that follows that
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
        //If ground was deleted
        if (!groundExists) {
            this.grounded = false;
        }
        this.colliding = found;
        return this.colliding;
    }
    camera() {
        let pos = this.posCenter();
        this.cameraPos.x = lerp(this.cameraPos.x, pos.x, .25);
        this.cameraPos.y = lerp(this.cameraPos.y, pos.y, .25);
        resetMatrix();
        //translate(-this.cameraPos.x, -this.cameraPos.y);
    }
}
class Joystick {
    baseSize;
    stickSize;
    position;
    stickPosition;
    isDragging;
    constructor(x, y, baseSize, stickSize) {
        this.baseSize = baseSize;
        this.stickSize = stickSize;
        this.position = createVector(x, y);
        this.stickPosition = this.position.copy();
        this.isDragging = false;
    }
    update(dir) {
        if (this.isDragging) {
            let minDist = Infinity;
            let closestTouch;
            for (let touch of touches) {
                const distance = this.position.dist(createVector(touch.x, touch.y));
                if (distance < minDist) {
                    minDist = distance;
                    closestTouch = touch;
                }
            }
            if (closestTouch) {
                this.stickPosition.x = closestTouch.x;
                this.stickPosition.y = closestTouch.y;
                closestTouch.used = true;
                // Constrain stick inside the base circle
                const distance = this.position.dist(this.stickPosition);
                if (distance > this.baseSize / 2) {
                    const direction = this.stickPosition.copy().sub(this.position);
                    direction.setMag(this.baseSize / 2);
                    this.stickPosition = this.position.copy().add(direction);
                }
                const direction = this.stickPosition.copy().sub(this.position);
                let parsedDir = (direction.copy().setMag(1));
                dir["right"] = parsedDir.x > .5 ? parsedDir.x : false;
                dir["left"] = parsedDir.x < -.5 ? parsedDir.x : false;
                dir["down"] = parsedDir.y > .5 ? parsedDir.y : false;
                dir["up"] = parsedDir.y < -.5 ? parsedDir.y : false;
                dir["dir"] = parsedDir;
            }
        }
        else {
            dir["right"] =
                dir["left"] =
                    dir["down"] =
                        dir["up"] = false;
        }
    }
    display() {
        // Base circle
        engine.gui.fill(200);
        engine.gui.ellipse(this.position.x, this.position.y, this.baseSize);
        // Stick
        engine.gui.fill(150);
        engine.gui.ellipse(this.stickPosition.x, this.stickPosition.y, this.stickSize);
        engine.gui.fill(0);
    }
    handlePress() {
        for (let touch of touches) {
            if (touch) {
                const distance = this.position.dist(createVector(touch.x, touch.y));
                if (distance < this.baseSize / 2) {
                    this.isDragging = true;
                    return;
                }
            }
        }
    }
    handleRelease() {
        for (let touch of touches) {
            if (touch) {
                const distance = this.position.dist(createVector(touch.x, touch.y));
                if (distance < this.baseSize / 1.25) {
                    this.isDragging = true;
                    return;
                }
            }
        }
        this.isDragging = false;
        this.stickPosition = this.position.copy();
    }
}
function touchStarted() {
    if (!stick)
        return;
    stick.handlePress();
    return false; // Prevent default
}
function touchEnded() {
    if (!stick)
        return;
    stick.handleRelease();
    for (let touch of touches) {
        touch.used = undefined;
    }
    return false; // Prevent default
}
