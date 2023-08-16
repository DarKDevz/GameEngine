class TextObject extends GameObject {
    constructor(x, y, text) {
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
        return "Text";
    }
    getValues() {
        return [...super.getValues(), this.t];
    }
    getValuesName() {
        return [...super.getValuesName(), "text"];
    }
    getActualValuesName() {
        return [...super.getActualValuesName(), "text"];
    }
    set text(v) {
        this.t = v;
        if (this.loaded)
            this.width = textWidth(this.t);
    }
    display() {
        fill(this.clr);
        text(this.t, this.x, this.y);
    }
}
class GUIElement {
    id;
    constructor() {
        this.id;
        this.add();
    }
    resize(ww, wh) {
    }
    add() {
        if (this.id !== undefined) {
            this.remove();
        }
        this.id = engine.generateUUID();
        engine.guiObjects[this.id] = this;
    }
    remove() {
        engine.guiObjects[this.id] = undefined;
    }
    setMousePressed() {
        if (engine.mobile) {
            let foundNonUsed;
            for (let touch of touches) {
                if (!touch?.used) {
                    foundNonUsed = touch;
                }
            }
            if (foundNonUsed) {
                mouseX = foundNonUsed.x;
                mouseY = foundNonUsed.y;
            }
            else {
                mouseIsPressed = false;
            }
        }
    }
    display(...args) { }
    update(...args) { }
}
class Button extends GUIElement {
    position;
    cb;
    size;
    pressed;
    constructor(x, y, radius, pressed, notPressed) {
        super();
        this.position = createVector(x, y);
        this.cb = [pressed, notPressed];
        this.size = radius;
        this.pressed = false;
    }
    update() {
        let minDist = Infinity;
        let closestTouch;
        for (let touch of touches) {
            const distance = this.position.dist(createVector(touch.x, touch.y));
            if (distance < minDist) {
                minDist = distance;
                closestTouch = touch;
            }
        }
        this.pressed = minDist < this.size / 2;
        if (closestTouch) {
            if (this.pressed) {
                this.cb[0]();
                closestTouch.used = true;
            }
        }
        if (!this.pressed) {
            this.cb[1]();
        }
        this.setMousePressed();
    }
    display() {
        engine.gui.fill(200, 50);
        if (this.pressed) {
            engine.gui.fill(150, 50);
        }
        engine.gui.circle(this.position.x, this.position.y, this.size);
    }
}
class Joystick extends GUIElement {
    baseSize;
    stickSize;
    position;
    stickPosition;
    isDragging;
    dir;
    constructor(x, y, baseSize, stickSize, direction) {
        super();
        this.baseSize = baseSize;
        this.stickSize = stickSize;
        this.position = createVector(x, y);
        this.stickPosition = this.position.copy();
        this.isDragging = false;
        this.dir = direction;
    }
    update() {
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
                this.dir["right"] = parsedDir.x > .5 ? parsedDir.x : false;
                this.dir["left"] = parsedDir.x < -.5 ? parsedDir.x : false;
                this.dir["down"] = parsedDir.y > .5 ? parsedDir.y : false;
                this.dir["up"] = parsedDir.y < -.5 ? parsedDir.y : false;
                this.dir["dir"] = parsedDir;
            }
        }
        else {
            this.dir["right"] =
                this.dir["left"] =
                    this.dir["down"] =
                        this.dir["up"] = false;
        }
        this.setMousePressed();
    }
    display() {
        // Base circle
        engine.gui.fill(200, 50);
        engine.gui.ellipse(this.position.x, this.position.y, this.baseSize);
        // Stick
        engine.gui.fill(150, 50);
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
    stick?.handlePress();
    engine.updateGui(false);
    if (engine.mobile) {
        fullscreen(true);
    }
    if (!stick)
        return;
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
