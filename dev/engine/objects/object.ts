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
        this.models = [];
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
        this.sprites = [];
        this.shown = {};
        this.collisionType = 'Sphere'; // Assuming collision type for 3D objects is a sphere
        this.imageInitialized = false;
        this.alwaysDraw = false;
        this.is3D = true;
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
        return [this.x,this.y,this.z]
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
    rayIntersection(rayPos, rayDir) {
        const sphereCenter = { x: this.x, y: this.y, z: this.z };
        const sphereRadius = 2;
    
        const oc = {
            x: rayPos.x - sphereCenter.x,
            y: rayPos.y - sphereCenter.y,
            z: rayPos.z - sphereCenter.z
        };
    
        const a = rayDir.x * rayDir.x + rayDir.y * rayDir.y + rayDir.z * rayDir.z;
        const b = 2 * (oc.x * rayDir.x + oc.y * rayDir.y + oc.z * rayDir.z);
        const c = oc.x * oc.x + oc.y * oc.y + oc.z * oc.z - sphereRadius * sphereRadius;
    
        const discriminant = b * b - 4 * a * c;
    
        if (discriminant < 0) {
            // No intersection
            return false;
        } else {
            // Calculate the two possible solutions for t
            const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    
            // Check if either t1 or t2 is positive (intersection along the ray)
            if (t1 >= 0 || t2 >= 0) {
                // Ray intersects the sphere
                return Boolean(Math.min(t1, t2));
            } else {
                // Ray points away from the sphere
                return false;
            }
        }
    } 
}
