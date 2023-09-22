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
        this.collisionType = 'Circle';
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
        return 'Circle';
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
                value: this.x
            }];
    }
    getValues() {
        return [this.x, this.y];
    }
    parameterNames() {
        return ["x", "y"];
    }
    collision(obj, trigger = false) {
       let collides = HandleCollision(obj,this)
        if (collides && trigger)
            this.onCollide(obj);
        return collides;
    }
    onCollide(obj) {
        throw new Error("Method not implemented.");
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
            engine.world.DestroyBody(this.body);
        }
    }
    addScriptByName(name, vals) {
        engine.addScriptByName(name, vals, this);
    }
}
var Categories = {
    DEFAULT: 0b1,
    BOX: 0b10,
    ENEMY: 0b100,
    PLATFORM: 0b1000,
    PLAYER: 0b10000
};
