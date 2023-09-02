var engine;
class Engine extends GameEvents {
    static removeListeners;
    static componentList;
    static fileTypeList;
    loading;
    constructor() {
        super();
        this.globalDefine(true);
        this.physics = engine?.physics ? true : false;
        this.scene = [];
        this.currentScene;
        this.files = {};
        let temp = {};
        let context = this;
        this.uuidList = new Proxy(temp, {
            set(target, key, value) {
                target[key] = value;
                context.eventListener[key]?.onload(value);
                return true;
            },
            get(target, key, receiver) {
                return target[key];
            }
        });
        ;
        this.usedUUID = [];
        this.hasUUID = false;
        this.assignedUUID = "";
        this.camera = engine?.camera ? engine.camera : new Camera(0, 0);
        this.gui = createGraphics(windowWidth, windowHeight);
        this.guiObjects = Object.assign({}, engine?.guiObjects);
        this.mobile = navigator.userAgent.includes("Mobile");
        if (this.mobile) {
            //Default mouseButton to be left
            mouseButton = 'left';
        }
        this.world = new b2World(new b2Vec2(0, 100) //gravity
        , true); // wheter to doSleep enabled to true because otherwise it will fuck over performance
        this.componentList = Engine.componentList;
        this.eventListener = {};
        // this.body = new p2.Body({ mass: 1 });
        // this.world.addBody(this.body);
    }
    resize(ww = windowWidth, wh = windowHeight) {
        resizeCanvas(ww, wh);
        engine.gui.resizeCanvas(ww, wh);
        this.getActiveScene()?.resize(ww, wh);
        for (let uuid in this.guiObjects) {
            let GUIElement = this.guiObjects[uuid];
            GUIElement?.resize(ww, wh);
        }
    }
    mouseScreen() {
        if (this.mobile) {
            let foundNonUsed;
            for (let touch of touches) {
                if (!touch?.used) {
                    foundNonUsed = touch;
                }
            }
            if (foundNonUsed) {
                mouseIsPressed = true;
                mouseX = foundNonUsed.x;
                mouseY = foundNonUsed.y;
            }
            else {
                mouseIsPressed = false;
            }
        }
        let mult = 1 / this.camera.zoom;
        return {
            x: (mouseX * mult + this.cameraPos.x - (width / 2 * mult)),
            y: (mouseY * mult + this.cameraPos.y - (height / 2 * mult))
        };
    }
    check(position) {
        let pos = p5.instance._renderer.uMVMatrix.multiplyVec4(position[0], position[1], 0, 1);
        //console.log(glPosition);
        return (abs(pos[0]) <= width / 2 && abs(pos[1]) <= height / 2 && pos[2] < 0);
    }
    checkList(positions) {
        for (let pos of positions) {
            if (this.check(pos)) {
                return true;
            }
        }
        return false;
    }
    checkRect(position, size) {
        let list = [
            [position.x, position.y],
            [position.x + size.x, position.y],
            [position.x + size.x, position.y + size.y],
            [position.x, position.y + size.y]
        ];
        return this.checkList(list);
    }
    checkCircle(position, size) {
        let list = [
            [position.x + size, position.y + size],
            [position.x + size, position.y - size],
            [position.x - size, position.y - size],
            [position.x - size, position.y + size]
        ];
        return this.checkList(list);
    }
    get activeScene() {
        return this.getActiveScene();
    }
    get cameraPos() {
        return this.camera.currentPos;
    }
    set cameraPos(obj) {
        this.camera.isLocked ? 0 :
            this.camera.follow(obj);
    }
    /*all events are here */
    deviceMoved(e) {
        this.activeScene?.deviceMoved(e, Boolean(window?.editor));
    }
    deviceTurned(e) {
        this.activeScene?.deviceTurned(e, Boolean(window?.editor));
    }
    deviceShaken(e) {
        this.activeScene?.deviceShaken(e, Boolean(window?.editor));
    }
    doubleClicked(e) {
        this.activeScene?.doubleClicked(e, Boolean(window?.editor));
    }
    mousePressed(e) {
        this.activeScene?.mousePressed(e, Boolean(window?.editor));
    }
    mouseReleased(e) {
        this.activeScene?.mouseReleased(e, Boolean(window?.editor));
    }
    mouseMoved(e) {
        this.activeScene?.mouseMoved(e, Boolean(window?.editor));
    }
    mouseDragged(e) {
        this.activeScene?.mouseDragged(e, Boolean(window?.editor));
    }
    mouseClicked(e) {
        this.activeScene?.mouseClicked(e, Boolean(window?.editor));
    }
    mouseWheel(e) {
        if (Boolean(window?.editor) && !overUI) {
            if (abs(e.deltaY) > abs(e.deltaX)) {
                engine.camera.zoom -= constrain(e.deltaY, -8, 8) * .035 * engine.camera.zoom;
                engine.camera.zoom = constrain(engine.camera.zoom, 0.01, 5);
            }
            else {
                editor.cameraPos.x += (e.deltaX) / engine.camera.zoom;
            }
            e.preventDefault();
        }
        this.activeScene?.mouseWheel(e, Boolean(window?.editor));
    }
    touchMoved(e) {
        this.activeScene?.touchMoved(e, Boolean(window?.editor));
    }
    keyPressed(e) {
        this.activeScene?.keyPressed(e, Boolean(window?.editor));
    }
    keyReleased(e) {
        this.activeScene?.keyReleased(e, Boolean(window?.editor));
    }
    keyTyped(e) {
        this.activeScene?.keyTyped(e, Boolean(window?.editor));
    }
    loadFromObject(obj, autoEvents = false) {
        ScenesfromObject(obj);
        if (autoEvents) {
            this.Initiate();
        }
    }
    Initiate() {
        window.draw ??= this.draw.bind(this);
        window.windowResized ??= () => this.resize();
    }
    setup() {
        document.oncontextmenu = function (e) {
            e.preventDefault();
        };
    }
    draw() {
        this.gui.clear();
        push();
        background(150, 230, 240);
        //Update
        player.update();
        //Early Update
        this.activeScene?.earlyUpdate();
        player.camera();
        player.checkCollisions();
        this.activeScene?.display();
        player.display();
        //Late Update
        this.activeScene?.lateUpdate();
        pop();
        this.gui.fill(0);
        this.gui.text("FPS: " + round(frameRate() / 10) * 10, 50, 50);
        if (webglVersion !== "p2d") {
            image(this.gui, -width / 2, -height / 2, width, height);
        }
        else {
            image(this.gui, 0, 0, width, height);
        }
    }
    onload(uuid, func) {
        this.eventListener[uuid] = Object.assign({ onload: func }, this.eventListener[uuid]);
        if (this.uuidList[uuid]) {
            func(this.uuidList[uuid]);
        }
    }
    addObj(box, doId = false) {
        box.init();
        console.log(box.init);
        box.typeId = doId ? box.typeId : undefined;
        this.getActiveScene()?.boxes.push(box);
    }
    addScriptByName(name, vals, obj) {
        let params = {
            fileUUID: this.getByReference('name', name).UUID,
            vals: vals,
        };
        obj.components.push(new engine.componentList['gameScript']({
            ...params,
            obj: obj,
        }));
    }
    deleteGameFile(id, value = false) {
        delete this.files[this.getByReference(id, value).UUID];
    }
    getByReference(id, value = false) {
        if (this.files[id]) {
            return this.files[id];
        }
        else {
            for (let fileUUID in this.files) {
                let file = this.files[fileUUID];
                if (!value) {
                    for (let type in file.references) {
                        let reference = file.references[type];
                        if (reference == id)
                            return file;
                    }
                }
                if (file.references[id] === value)
                    return file;
            }
        }
    }
    customFileUUID(fileType) {
        if (this.hasUUID) {
            this.hasUUID = false;
            return this.assignedUUID;
        }
        let fileName = fileType.slice(1);
        var UUID = fileName + "file";
        let stack = -1;
        while (this.files[UUID]) {
            stack++;
            UUID = fileName + "file" + stack;
            if (stack >= 99999999) {
                throw new Error("Stack exceeded! Math.random is broken or uuid list is filled");
            }
        }
        return UUID;
    }
    assignUUID(UUID) {
        this.hasUUID = true;
        this.assignedUUID = UUID;
    }
    getfromUUID(UUID) {
        return this.uuidList[UUID];
    }
    getActiveScene() {
        return this.scene[this.currentScene];
    }
    changeUUID(ogUUId, newUUID) {
        let ogVal = this.uuidList[ogUUId];
        delete this.uuidList[ogUUId];
        this.uuidList[newUUID] = ogVal;
        return this.uuidList[newUUID];
    }
    generateUUID() {
        if (this.hasUUID) {
            this.hasUUID = false;
            return this.assignedUUID;
        }
        var UUID = "0x" + (Math.random() * 99999999999999999).toString(16);
        let stack = 0;
        while (this.uuidList[UUID] || this.usedUUID.includes(UUID)) {
            stack++;
            UUID = "0x" + (Math.random() * 99999999999999999).toString(16);
            if (stack >= 99999999) {
                throw new Error("Stack exceeded! Math.random is broken or uuid list is filled");
            }
        }
        this.usedUUID.push(UUID);
        return UUID;
    }
    touchStarted(e) {
        for (let uuid in this.guiObjects) {
            let GUIElement = this.guiObjects[uuid];
            GUIElement.touchStarted();
        }
        this.updateGui(false);
        this.activeScene?.touchStarted(e, Boolean(window?.editor));
        if (e.srcElement === canvas)
            return false;
    }
    touchEnded(e) {
        for (let uuid in this.guiObjects) {
            let GUIElement = this.guiObjects[uuid];
            GUIElement.touchEnded();
        }
        for (let touch of touches) {
            touch.used = undefined;
        }
        if (!fullscreen()) {
            fullscreen(true);
        }
        this.activeScene?.touchEnded(e, Boolean(window?.editor));
        if (e.srcElement === canvas)
            return false;
    }
    updateGui(display = true, forceDraw = false, update = true) {
        for (let uuid in this.guiObjects) {
            let GUIElement = this.guiObjects[uuid];
            if (GUIElement.mobileOnly) {
                if (engine.mobile) {
                    if (update)
                        GUIElement.update();
                    if (display)
                        GUIElement.display();
                }
                else if (forceDraw) {
                    if (update)
                        GUIElement.update();
                    if (display)
                        GUIElement.display();
                }
            }
            if (!GUIElement.mobileOnly) {
                if (update)
                    GUIElement.update();
                if (display)
                    GUIElement.display();
            }
        }
    }
    customDraw(doDraw) {
        if (doDraw) {
            this.activeScene?.customDraw(true);
            this.updateGui(true, true, false);
        }
    }
}
class Camera {
    constructor(x, y, zoom = 1) {
        this.target = { x: x, y: y };
        this.currentPos = { x: x, y: y };
        this.zoom = zoom;
        this.isLocked = false;
    }
    lookAt(x, y) {
        this.target = { x: x, y: y };
    }
    follow(obj) {
        this.target = obj;
    }
    setZoom(number) {
        this.zoom = number;
    }
    updateCameraPos() {
        this.currentPos = {
            x: this.target.x,
            y: this.target.y
        };
        return this.target;
    }
}
Engine.removeListeners = [];
