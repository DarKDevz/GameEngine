class GameEvents {
    constructor() {
    }
    globalDefine(hardDefined = false) {
        let entryPoints = [
            'deviceMoved',
            'deviceTurned',
            'deviceShaken',
            'doubleClicked',
            'mousePressed',
            'mouseReleased',
            'mouseMoved',
            'mouseDragged',
            'mouseClicked',
            'mouseWheel',
            'touchStarted',
            'touchMoved',
            'touchEnded',
            'keyPressed',
            'keyReleased',
            'keyTyped',
        ];
        for (let i of entryPoints) {
            window[i] ??= this[i].bind(this);
            if (hardDefined) {
                window[i] = this[i].bind(this);
            }
        }
    }
    deviceMoved(...args) { }
    deviceTurned(...args) { }
    deviceShaken(...args) { }
    doubleClicked(...args) { }
    mousePressed(...args) { }
    mouseReleased(...args) { }
    mouseMoved(...args) { }
    mouseDragged(...args) { }
    mouseClicked(...args) { }
    mouseWheel(...args) { }
    touchStarted(...args) { }
    touchMoved(...args) { }
    touchEnded(...args) { }
    keyPressed(...args) { }
    keyReleased(...args) { }
    keyTyped(...args) { }
}
var overUI = false;
function OpenDialog(MainDiv, OnExit = () => { }, headerText = createDiv("Dialog Window")) {
    let Holder = createDiv();
    let window = createDiv();
    window.parent(Holder);
    window.style("display: flex");
    let ExitButton = createButton("X");
    ExitButton.style("cursor:pointer;");
    ExitButton.mousePressed(() => {
        setTimeout(() => { overUI = false; }, 500);
        Holder.remove();
        OnExit();
    });
    Holder.style("width:fit-content");
    Holder.style("overflow:auto");
    Holder.style("max-height:" + height / 2);
    Holder.style(" background-color: rgba(0, 0, 0, 0.25);");
    ExitButton.parent(window);
    headerText.parent(window);
    MainDiv.parent(Holder);
    let offsets = Holder.size();
    Holder.position((width - offsets.width) / 2, (height - offsets.height) / 2);
    Holder.mouseOver(() => overUI = true);
    Holder.mouseOut(() => overUI = false);
}
function safeOverride(obj, name, _get, _set) {
    if (obj[name]) {
        console.error("Overriding Existing value from location", name);
    }
    Object.defineProperty(obj, name, {
        get: _get,
        set: _set
    });
}
function Import(obj, location, target = false) {
    if (!target) {
        for (let name of Object.keys(obj)) {
            safeOverride(location, name, () => { return obj[name]; }, (_) => { return obj[name] = _; });
        }
    }
    else {
        if (typeof target === 'string') {
            if (!obj[target])
                return;
            safeOverride(location, target, () => { return obj[target]; }, (_) => { return obj[target] = _; });
        }
        else if (target instanceof Array) {
            for (let name of target) {
                if (obj[name]) {
                    safeOverride(location, name, () => { return obj[name]; }, (_) => { return obj[name] = _; });
                }
            }
        }
    }
}
function Export(obj, target, location = window) {
    if (!target) {
        if (obj.name) {
            target = obj.name;
        }
        else {
            throw new Error("Cannot export variable without target and without name");
        }
    }
    location[target] = obj;
}
function parseStringNum(str, ogVal = str, onlyPositive = false) {
    if (typeof str !== 'string') {
        str = String(str);
    }
    if (str.length === 0 && typeof ogVal !== 'number') {
        return 0;
    }
    if (!isNaN(parseFloat(str)) && isFinite(str)) {
        let value = parseFloat(str);
        return onlyPositive ? (Math.abs(value) !== 0 ? Math.abs(value) : 1) : value;
    }
    return ogVal;
}
function DrawAll() {
    for (let i of engine.world.colliders.getAll()) {
        let position = i.translation();
        position.x *= 50;
        position.y *= 50;
        switch (i._shape.type) {
          case 0:
            circle(position.x, position.y, i._shape.radius * 100);
            break;
          case 1:
            let size = i._shape.halfExtents;
            push();
            translate(position.x, position.y); /* Translate to the center of the rectangle*/
            rotate(i.rotation());
            rectMode(CENTER);
            rect(0, 0, size.x * 100, size.y * 100); /* Draw the rectangle at the translated position (0, 0)*/
            pop();
            break;
          case 2:
            let radius = i._shape.radius * 50;
            let hh = i._shape.halfHeight * 50;
            push(); /* Draw the left ellipse*/
            translate(position.x, position.y); /* Translate to the center of the rectangle*/
            rotate(i.rotation());
            rectMode(CENTER);
            circle(0, hh, radius * 2);
            circle(0, -hh, radius * 2);
            line(radius, hh, radius, -hh);
            line(-radius, hh, -radius, -hh);
            noStroke();
            rect(0, 0, radius * 2, hh * 2);
            pop();
            break;
            case 3:
                push();
                translate(position.x, position.y);
                rotate(i.rotation());
                line(i._shape.a.x * 50, i._shape.a.y * 50, i._shape.b.x * 50, i._shape.b.y * 50);
                pop();
                break;
              case 4:
                push();
                noFill();
                beginShape();
                for (let y = 0; y < i._shape.vertices.length; y += 2) {
                  let x = i._shape.vertices[y] * 50;
                  let y1 = i._shape.vertices[y + 1] * 50;
                  vertex(x, y1);
                }
                endShape();
                pop();
                break;
        }
      }
    
}
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;
    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};
Object.defineProperty(Array.prototype, "equals", {
    enumerable: false,
});
function deepReadCheck(obj1, obj2) {
    //Returns 1 if the same, 0 if value has changed, -1 if different lengths
    let read = JSON.stringify;
    if (read(obj1) === read(obj2)) {
        //all values are the same
        return 1;
    }
    else {
        if (read(Object.getOwnPropertyNames(obj1)) === read(Object.getOwnPropertyNames(obj2))) {
            return 0;
        }
        else {
            return -1;
        }
    }
}
