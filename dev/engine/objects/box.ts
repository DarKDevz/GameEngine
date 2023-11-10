class Box extends GameObject {
    pos: any;
    size: any;
    constructor(x: number, y: number, w: number, h: number) {
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
    getCollisionType(): collisionTypes {
        return 'Rect';
    }
    set width(val: number) {
        this.w = val
        this.updateShape();
    }
    get width() {
        return this.w
    }
    set height(val: number) {
        this.h = val
        this.updateShape()

    }
    get height() {
        return this.h
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
        this.y = value
    }
    get posY() {
        return this.y
    }
    updateShape(): void {
        if (this?.fixture?.GetShape()) {
            this?.fixture?.GetShape()?.SetAsBox(
                this.hw //half width
                , this.hh //half height
            );
            this?.fixture?.GetShape()?.SetRadius?.(
                (this.hw + this.hh) / 2 //Sets Radius to average of both width and height
            );
        }
        this.updatePosition();
    }
    init(): void {
        if (this?.width && this?.height) {
            //Avoid making double physics body if initializing twice
            if (!this.body) {
				let rigidBody = RAPIER.RigidBodyDesc.dynamic()
				rigidBody.setTranslation(this.x/50,this.y/50);
				//this.body = new p2.Body({mass:0,position:[this.x,-this.y],fixedRotation : true})
				//this.body.addShape(new p2.Box({ width: this.width,height:this.height}));
				this.body = engine.world.createRigidBody(rigidBody)
				let colliderDesc = RAPIER.ColliderDesc.cuboid(this.width/100, this.height/100);
		
				engine.world.createCollider(colliderDesc,this.body);
            }
        }
    }
    getCollisionVectors(): (this | { x: number; y: number; })[] {
        return [{x:this.x,y:this.y}, { x: this.width, y: this.height }]
    }
    parameterNames(): string[] {
        return super.parameterNames().concat(["width", "height"]);
    }

    draw(): void {
        fill(this.clr);
        rect(this.x, this.y, this.width, this.height);
    }
    display(OnlyDraw: boolean, noDraw: boolean = false): void {
        if (!noDraw) { this.draw() }
        if (!OnlyDraw) this.update();
    }
    collision(obj: any): any {
        let collides = HandleCollision(this,obj);

        if (collides) {
            this.onCollide(obj);
        }

        return collides;
    }
    customDraw(): void {
        super.customDraw()
        stroke(0, 0, 255);
        line(this.x + this.hw, this.y + this.hh, this.x + this.hw - 30, this.y + this.hh);
        stroke(255, 0, 0);
        line(this.x + this.hw, this.y + this.hh, this.x + this.hw, this.y + this.hh - 30);
        stroke(0);
    }
    offSet(x: number, y: number): void {
        super.offSet(x, y);
        this.updatePosition();
    }
    updatePosition() {
        this.body?.setTranslation({
            x: (this.x + this.hw) / 50,
            y: (this.y + this.hh) / 50
        })
    }
    update() {
        if (this.x !== this.oldX || this.y !== this.oldY) {
            this.oldX = this.x;
            this.oldY = this.y;
            if (this.body) {
                this.body.setTranslation({
                    x: (this.x + this.hw) / 50,
                    y: (this.y + this.hh) / 50
                })
            this.body.collider(0).setShape(new RAPIER.Cuboid(                this.hw / 50 //half width
            , this.hh / 50 //half height)
            ));
            }
        }
    }
    onCollide(obj: Object): void { }
    getParameters(): any[] {
        return super.getParameters().concat(this.width, this.height)
    }
    getEditableArray(): EditableObject[] {
        return [...super.getEditableArray(),{
            name:"width",
            set:(val) => {
                this.width = val;
            },
            get:() => {
                return this.width
            },
            value:this.width
        },{
            name:"height",
            set:(val) =>{
                this.height = val;
            },
            get:() => {
                return this.height
            },
            value:this.height
        }]
    }
}


