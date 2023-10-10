class GameObject extends GameEvents{
    constructor(x: number, y: number, tag?: string) {
        super()
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
        for(let component of this.components) {
            component.update()
        }
    }
    resize(ww: number,wh: number) {
    }
    keyPress(event: Event) {

    }
    getCollisionType():collisionTypes {
        return 'Circle'
    }
    /**
     * @type Array
     * @returns a Collision Vector
     */
    getCollisionVectors(): any[] {
        return [{x:this.x,y:this.y}, 2]
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
    getParameters(): any[] {
        return [this.x,this.y];
    }
    getEditableArray():EditableObject[] {
        return [{
            name:"x",
            set:(num:number)=>{
                this.x = num;
                this?.updateShape?.();
            },
            get:()=>{
                return this.x
            },
            value:this.x
        },{
            name:"y",
            set:(num:number)=>{
                this.y = num;
                this?.updateShape?.();
            },
            get:()=>{
                return this.y
            },
            value:this.x
        }]
    }
    getValues(): any[] {
        return [this.x, this.y];
    }
    parameterNames() {
        return ["x", "y"];
    }
    collision(obj: CollidableObject, trigger = false) {
       let collides = HandleCollision(obj,this)
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
            this.body = undefined;
        }
    }
    addScriptByName(name: string, vals: Object): void {
        engine.addScriptByName(name, vals, this);
    }
}
var Categories = {
    DEFAULT: 0b1,
    BOX: 0b10,
    ENEMY: 0b100,
    PLATFORM: 0b1000,
    PLAYER: 0b10000
}
