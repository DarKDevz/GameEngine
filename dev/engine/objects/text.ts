class TextObject extends GameObject {
    constructor(x: number, y: number, text: string) {
        super(x, y, "text");
        this.text = text;
        this.clr = 0;
        this.width = 0;
        this.height = 10;
        this.typeId = 3;
        this.loaded = false;
    }
    init() {
        this.loaded = true;
        this.width = textWidth(this.t);
    }
    getClassName() {
        return "Text"
    }
    getValues() {
        return [...super.getValues(), this.t];
    }
    getValuesName() {
        return [...super.getValuesName(), "text"]
    }
    getActualValuesName() {
        return [...super.getActualValuesName(), "text"]
    }
    set text(v: string) {
        this.t = v;
        if (this.loaded) this.width = textWidth(this.t);
    }
    display() {
        fill(this.clr)
        text(this.t, this.x, this.y);
    }

}
class GUIElement {
    constructor() {}
    add(obj) {}
    display(...args:any) {}
    update(...args:any) {}
}
class Button extends GUIElement{
    position: Vec;
    cb: Function
    size: number;
    pressed: boolean
    constructor(x: number, y: number, radius: number, callback: Function) {
        super()
        this.add(this)
        this.position = createVector(x, y)
        this.cb = callback;
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
                this.cb()
                closestTouch.used = true;
            }
        }
    }
    display() {
        engine.gui.fill(200,50)
        if (this.pressed) {
            engine.gui.fill(150,50)
        }
        engine.gui.circle(this.position.x, this.position.y, this.size)
    }
}
class Joystick extends GUIElement{
    baseSize: any;
    stickSize: any;
    position: Vec;
    stickPosition: any;
    isDragging: boolean;
    constructor(x: number, y: number, baseSize: number, stickSize: number) {
        super()
        this.add(this)
        this.baseSize = baseSize;
        this.stickSize = stickSize;
        this.position = createVector(x, y);
        this.stickPosition = this.position.copy();
        this.isDragging = false;
    }

    update(dir: { [x: string]: any; }) {
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
        } else {
            dir["right"] =
                dir["left"] =
                dir["down"] =
                dir["up"] = false
        }
    }
    display() {
        // Base circle
        engine.gui.fill(200,50);
        engine.gui.ellipse(this.position.x, this.position.y, this.baseSize);
        // Stick
        engine.gui.fill(150,50);
        engine.gui.ellipse(this.stickPosition.x, this.stickPosition.y, this.stickSize);
        engine.gui.fill(0)
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
    if (!stick) return;
    stick.handlePress();
    return false; // Prevent default
}

function touchEnded() {
    if (!stick) return;
    stick.handleRelease();
    for (let touch of touches) {
        touch.used = undefined;
    }
    return false; // Prevent default
}