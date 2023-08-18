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
class GUIElement extends GameObject {
    size;
    constructor(x, y) {
        super(x, y);
        this.position = createVector(x, y);
        this.size = 5;
        this.mobileOnly = true;
        this.add();
    }
    collidesPoint(coords) {
        let dist = coords.dist(this.position);
        return dist < this.size;
    }
    getValuesName() {
        return ["Mobile Button", "GUI Size"];
    }
    getValues() {
        return [this.mobileOnly, this.size];
    }
    getActualValuesName() {
        return ["mobileOnly", "size"];
    }
    resize(ww, wh) {
    }
    add() {
        if (this.id !== undefined) {
            this.remove();
        }
        engine.guiObjects[this.uuid] = this;
    }
    remove() {
        engine.guiObjects[this.uuid] = undefined;
        engine.uuidList[this.uuid] = undefined;
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
    pressed;
    constructor(x, y, radius, pressed, notPressed) {
        super(x, y);
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
    stickSize;
    position;
    stickPosition;
    isDragging;
    dir;
    constructor(x, y, size, stickSize, direction) {
        super(x, y);
        this.size = size;
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
        engine.gui.ellipse(this.position.x, this.position.y, this.size);
        // Stick
        engine.gui.fill(150, 50);
        engine.gui.ellipse(this.stickPosition.x, this.stickPosition.y, this.stickSize);
        engine.gui.fill(0);
    }
    getValues() {
        return super.getValues().concat(this.stickSize);
    }
    getActualValuesName() {
        return super.getActualValuesName().concat("stickSize");
    }
    getValuesName() {
        return super.getValuesName().concat("Size of stick");
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
