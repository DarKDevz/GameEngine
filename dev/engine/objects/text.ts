class TextObject extends GameObject {
    constructor(x: number, y: number, text: string) {
        super(x, y, "text");
        this.text = typeof text === "string" ? text:"";
        this.clr = 0;
        this.width = 0;
        this.height = 10;
        this.typeId = 3;
        this.loaded = false;
    }
    getCollisionType() {
        return 'Rect'
        }
    getCollisionVectors():any[]{
    return [{x:this.x,y:this.y},{x:this.width,y:this.height}]
}
    init() {
        this.loaded = true;
        this.width = textWidth(this.t);
    }
    getParameters(): any[] {
        return [...super.getParameters(),this.t]
    }
    getEditableArray(): EditableObject[] {
        return [...super.getEditableArray(),{
            name:"text",
            set:(val) => {
                this.text = val
            },
            get:()=> {
                return this.text;
            },
            value:this.text
        }]
    }
    getClassName() {
        return "Text"
    }
    parameterNames() {
        return [...super.parameterNames(), "text"]
    }
    set text(v: string) {
        this.t = v;
        if (this.loaded) this.width = textWidth(this.t);
    }
    get text() {
        return this.t
    }
    display() {
        fill(this.clr)
        text(this.t, this.x, this.y);
    }

}
class GUIElement extends GameObject {
    constructor(x: number,y: number) {
        super(x,y)
        this.position = createVector(x, y);
        this.size = 5;
        this.mobileOnly = true;
        this.add();
        this.noComponents = true;
    }
    collidesPoint(coords) {
        let dist = coords.dist(this.position)
        return dist < this.size;
    }
    getEditableArray(): EditableObject[] {
        return [{
            name:"x",
            set:(val)=> {
                this.position.x = val
            },
            get:()=>{
                return this.position.x
            },
            value: this.position.x
        },{
            name:"y",
            set:(val)=> {
                this.position.y = val
            },
            get:()=>{
                return this.position.y
            },
            value:this.position.y
        },{
            name:"isMobile",
            set:(val)=>{this.mobileOnly = val},
            get:()=>{return this.mobileOnly},
            value:this.mobileOnly
        },{
            name:"Size",
            set:(val)=>{this.size = val},
            get:()=>{return this.size},
            value:this.size
        }]
    }
    getParameters(): any[] {
        return [this.position.x,this.position.y];
    }
    parameterNames(): string[] {
        return ["x", "y"]
    }
    resize(ww, wh) {

    }
    add() {
        if (this.id !== undefined) {
            this.remove()
        }
        engine.guiObjects[this.uuid] = this;
    }
    remove() {
        engine.guiObjects[this.uuid] = undefined;
        engine.uuidList[this.uuid] = undefined;
    }
    setMousePressed() {
        if (engine.mobile) {
            let foundNonUsed
            for (let touch of touches) {
                if (!touch?.used) {
                    foundNonUsed = touch;
                }
            }
            if (foundNonUsed) {
                mouseX = foundNonUsed.x;
                mouseY = foundNonUsed.y;
            } else {
                mouseIsPressed = false;
            }
        }
    }
    display(...args: any) { }
    update(...args: any) { }
}
class Button extends GUIElement {
    constructor(x: number, y: number, radius: number, pressed: Function, notPressed: Function) {
        super(x,y)
        this.position = createVector(x, y)
        this.cb ??= [pressed, notPressed];
        this.size = radius
        this.pressed = false;
    }
    update() {
        let minDist = Infinity
        let closestTouch;
        for (let touch of touches) {
            const distance = this.position.dist(createVector(touch.x, touch.y));
            if (distance < minDist) {
                minDist = distance
                closestTouch = touch;
            }
        }
        this.pressed = minDist < this.size / 2
        if (closestTouch) {
            if (this.pressed) {
                this.cb[0]()
                closestTouch.used = true;
            }
        }
        if (!this.pressed) {
            this.cb[1]()
        }
        this.setMousePressed()
    }
    display() {
        engine.gui.fill(200, 50)
        if (this.pressed) {
            engine.gui.fill(150, 50)
        }
        engine.gui.circle(this.position.x, this.position.y, this.size)
    }
}
class Joystick extends GUIElement {
    declare size: number;
    constructor(x: number, y: number, size: number, stickSize: number, direction: { [x: string]: any; }) {
        super(x,y)
        this.size = size;
        this.stickSize = stickSize;
        this.position = createVector(x, y);
        this.stickPosition = this.position.copy();
        this.isDragging = false;
        this.dir ??= direction;
    }
    update() {
        if (this.isDragging) {
            let minDist = Infinity
            let closestTouch;
            for (let touch of touches) {
                const distance = this.position.dist(createVector(touch.x, touch.y));
                if (distance < minDist) {
                    minDist = distance
                    closestTouch = touch;
                }
            }
            if (closestTouch) {
                this.stickPosition.x = closestTouch.x;
                this.stickPosition.y = closestTouch.y;
                closestTouch.used = true;
                // Constrain stick inside the base circle
                const distance = this.position.dist(this.stickPosition);
                if (distance > this.size / 2) {
                    const direction = this.stickPosition.copy().sub(this.position);
                    direction.setMag(this.size / 2);
                    this.stickPosition = this.position.copy().add(direction);
                }
                const direction = this.stickPosition.copy().sub(this.position);
                let parsedDir = (direction.copy().setMag(1));
                this.dir["right"] = parsedDir.x > .5 ? parsedDir.x : false;
                this.dir["left"] = parsedDir.x < -.5 ? parsedDir.x : false;
                this.dir["down"] = parsedDir.y > .5 ? parsedDir.y : false;
                this.dir["up"] = parsedDir.y < -.5 ? parsedDir.y : false;
                this.dir["dir"] = parsedDir;
            }
        } else {
            this.dir["right"] =
                this.dir["left"] =
                this.dir["down"] =
                this.dir["up"] = false
        }
        this.setMousePressed()
    }
    display() {
        // Base circle
        engine.gui.fill(200, 50);
        engine.gui.ellipse(this.position.x, this.position.y, this.size);
        // Stick
        engine.gui.fill(150, 50);
        engine.gui.ellipse(this.stickPosition.x, this.stickPosition.y, this.stickSize);
        engine.gui.fill(0)
    }
    getEditableArray(): EditableObject[] {
        return super.getEditableArray().concat({
            name:"Size of stick",
            get:() => {
                return this.stickSize
            },
            set:(value)=>{
                this.stickSize = value
            },
            value:this.stickSize
        })   
    }
    getParameters(): any[] {
        return super.getParameters().concat(this.size,this.stickSize,this.dir);
    }
    parameterNames(): string[] {
        return super.parameterNames().concat("base Size","Size of stick","Direction")
    }
    touchStarted() {
        for (let touch of touches) {
            if (touch) {
                const distance = this.position.dist(createVector(touch.x, touch.y));
                if (distance < this.size / 2) {
                    this.isDragging = true;
                    return;
                }
            }
        }
    }

    touchEnded() {
        for (let touch of touches) {
            if (touch) {
                const distance = this.position.dist(createVector(touch.x, touch.y));
                if (distance < this.size / 1.25) {
                    this.isDragging = true;
                    return;
                }
            }
        }
        this.isDragging = false;
        this.stickPosition = this.position.copy();
    }
}