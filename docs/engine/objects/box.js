class Box extends GameObject {
    pos;
    size;
    constructor(x, y, w, h) {
        super(x, y, "Box");
        this.width = w;
        this.height = h;
        this.clr = 0;
        this.oldX;
        this.oldY;
        this.typeId = 0;
        this.isCollidable = true;
        this.collisionType = 'Rect';
    }
    getCollisionType() {
        return 'Rect';
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
            this?.fixture?.GetShape()?.SetAsBox(this.hw //half width
            , this.hh //half height
            );
            this?.fixture?.GetShape()?.SetRadius?.((this.hw + this.hh) / 2 //Sets Radius to average of both width and height
            );
        }
    }
    init() {
        if (this?.width && this?.height) {
            //Avoid making double physics body if initializing twice
            if (!this.body) {
                let bodyDef = new b2BodyDef;
                var fixDef = new b2FixtureDef;
                fixDef.density = 1.0;
                fixDef.friction = 0.5;
                fixDef.restitution = 0;
                bodyDef.type = b2Body.b2_staticBody;
                fixDef.shape = new b2PolygonShape;
                fixDef.shape.SetAsBox(this.hw //half width
                , this.hh //half height
                );
                bodyDef.position.x = this.x + this.hw;
                bodyDef.position.y = this.y + this.hh;
                this.body = engine.world.CreateBody(bodyDef);
                this.body.SetUserData(this);
                this.fixture = this.body.CreateFixture(fixDef);
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
        let type = obj.getCollisionType() + 'Vector';
        let ObjectVectors = obj.getCollisionVectors();
        let collides = HandleCollision(this.getCollisionType(), type, ...this.getCollisionVectors(), ...ObjectVectors);
        if (collides) {
            this.onCollide(obj);
        }
        return collides;
    }
    addScriptByName(name, vals) {
        engine.addScriptByName(name, vals, this);
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
        if (this.body) {
            this.body.SetPosition({
                x: this.x + this.hw,
                y: this.y + this.hh
            });
        }
    }
    updatePosition() {
        this?.body?.SetPosition?.({
            x: this.x + this.hw,
            y: this.y + this.hh
        });
    }
    update() {
        if (this.x !== this.oldX || this.y !== this.oldY) {
            this.oldX = this.x;
            this.oldY = this.y;
            if (this.body) {
                this.body.SetPosition({
                    x: this.x + this.hw,
                    y: this.y + this.hh
                });
                this?.fixture?.GetShape()?.SetAsBox?.(this.hw //half width
                , this.hh //half height
                );
            }
        }
    }
    onCollide(obj) { }
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
