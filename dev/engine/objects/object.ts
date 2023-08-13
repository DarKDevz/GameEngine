class GameObject {
    constructor(x: number, y: number, tag?: string) {
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
        engine.uuidList[this.uuid] = this;
    }
    keyPress(event: Event) {

    }
    getCollisionType() {
        return 'Circle'
    }
    /**
     * @type Array
     * @returns a Collision Vector
     */
    getCollisionVectors(): any[] {
        return [this, 2]
    }
    jsonComponents() {
        let ret = [];
        for (let comp of this.components) {
            ret.push(comp.toJson());
        }
        return ret;
    }
    display(OnlyDraw: boolean, noDraw: boolean = false) {
        if (!noDraw) { this.draw() }
        if (!OnlyDraw) this.update();
    }
    draw() {
        throw new Error("Method not implemented.");
    }
    init() {

    }
    getClassName(): string {
        return "GameObject"
    }
    offSet(x: number, y: number, w?, h?) {
        this.x = x;
        this.y = y;
    }
    getValues(): any[] {
        return [this.x, this.y];
    }
    getValuesName() {
        return ["x", "y"];
    }
    getActualValuesName() {
        return ["x", "y"];
    }
    collision(obj: any, trigger = false) {
        var oX, oY, oW, oH;
        if (obj.pos !== undefined) {
            oX = obj.pos.x;
            oY = obj.pos.y;
        } else {
            oX = obj.x;
            oY = obj.y;
        }
        if (obj.size !== undefined) {
            oW = obj.size.x;
            oH = obj.size.y;
        } else {
            oW = obj.width;
            oH = obj.height;
        }
        let rect2 = {
            x: oX,
            y: oY,
            width: oW,
            height: oH,
        }
        let collides = collide(this, rect2);
        if (collides && trigger) this.onCollide(obj);
        return collides;
    }
    onCollide(obj: Object) {
        throw new Error("Method not implemented.");
    }
    update() {

    }
    earlyUpdate() {

    }
    lateUpdate() {

    }
    customDraw() {
        point(this.x, this.y)
    }
    delete() {
        delete engine.uuidList[this.uuid];
        this.removeBody()
    }
    removeBody() {
        if (this.body) {
            engine.world.DestroyBody(this.body)
        }
    }
}
var Categories = {
    DEFAULT: 0b1,
    BOX: 0b10,
    ENEMY: 0b100,
    PLATFORM: 0b1000,
    PLAYER: 0b10000
}
