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
            value:this.y
        }]
    }
/*     getValues(): any[] {
        return [this.x, this.y];
    } */
    parameterNames() {
        return ["x", "y"];
    }
    collision(obj: CollidableObject, trigger = false) {
       let collides = HandleCollision(obj,this)
        if (collides && trigger) this.onCollide(obj);
        return collides;
    }
    onCollide(obj: Object) {
        
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
            engine.world.removeRigidBody(this.body)
            this.body = undefined;
        }
    }
    addScriptByName(name: string, vals: Object): void {
        engine.addScriptByName(name, vals, this);
    }
}
class GameObject3D extends GameObject {
    constructor(x: number, y: number, z: number, tag?: string) {
        super(x,y,tag);
        this.z = z;
        this.depth = 1; // Assuming depth property for 3D objects
        this.scene = "Not set";
        this.components = [];
        this.overrides = {};
        this.savedFuncs = {};
        this.newOverrides = {};
        this.uuid = engine.generateUUID();
        this.sprites = [];
        this.shown = {};
        this.collisionType = 'Sphere'; // Assuming collision type for 3D objects is a sphere
        this.imageInitialized = false;
        this.alwaysDraw = false;
        this.is3D = true;
        engine.uuidList[this.uuid] = this;
    }
    offSet(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    getCollisionType(): collisionTypes {
        return 'Sphere';
    }
    getCollisionVectors(): any[] {
        return [{ x: this.x, y: this.y, z: this.z }, 2]; // Example, adjust based on your needs
    }
    display(OnlyDraw: boolean, noDraw: boolean = false) {
        if (!noDraw) this.draw();
        if (!OnlyDraw) this.update();
    }
    draw() {
        throw new Error("Method not implemented.");
        // Implement your 3D drawing logic here
    }
    getParameters(): any[] {
        [this.x,this.y,this.z]
    }
    parameterNames(): string[] {
        ["x","y","z"]
    }

    getEditableArray(): EditableObject[] {
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
            value:this.y
        },{
            name:"z",
            set:(num:number)=>{
                this.z = num;
                this?.updateShape?.();
            },
            get:()=>{
                return this.z
            },
            value:this.z
        }]
    }
}
