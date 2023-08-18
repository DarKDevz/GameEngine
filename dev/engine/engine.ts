var engine: Engine;
class Engine extends GameEvents{
    static removeListeners: Function[];
    static componentList: { [x: string]: Component };
    static fileTypeList: { [x: string]: string };
    constructor() {
        super()
        this.physics = engine?.physics ? true : false;
        this.scene = [];
        this.zoom = 1;
        this.currentScene;
        this.files = {};
        this.uuidList = {};
        this.usedUUID = [];
        this.hasUUID = false;
        this.assignedUUID = "";
        this.camera = engine?.camera ? engine.camera : new Camera(0, 0);
        this.gui = createGraphics(windowWidth, windowHeight);
        this.guiObjects = Object.assign({}, engine?.guiObjects)
        this.mobile = navigator.userAgent.includes("Mobile");
        if (this.mobile) {
            //Default mouseButton to be left
            mouseButton = 'left'
        }
        this.world = new b2World(new b2Vec2(0, 100)    //gravity
            , true); // wheter to doSleep enabled to true because otherwise it will fuck over performance
        this.componentList = Engine.componentList
        window.keyPressed = this.keyPress.bind(this);
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
    mouseScreen(): { x: number, y: number } {
        if (this.mobile) {
            let foundNonUsed
            for (let touch of touches) {
                if (!touch?.used) {
                    foundNonUsed = touch;
                }
            }
            if (foundNonUsed) {
                mouseIsPressed = true;
                mouseX = foundNonUsed.x;
                mouseY = foundNonUsed.y;
            } else {
                mouseIsPressed = false;
            }
        }
        let mult = 1 / this.camera.zoom
        return {
            x: (mouseX * mult + this.cameraPos.x - (width / 2 * mult)),
            y: (mouseY * mult + this.cameraPos.y - (height / 2 * mult))
        };
    }
    get activeScene() {
        return this.getActiveScene();
    }
    get cameraPos() {
        return this.camera.currentPos
    }
    set cameraPos(obj) {
        this.camera.isLocked ? 0 :
            this.camera.follow(obj);
    }
    keyPress(key: Event) {
        this.getActiveScene()?.keyPress(key);
    }
    loadFromObject(obj: Object, autoEvents = false) {
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
        canvas.oncontextmenu = function (e) {
            e.preventDefault();
        }
    }
    draw() {
        this.gui.clear()
        push()
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
        pop()
        this.gui.fill(0);
        this.gui.text("FPS: " + round(frameRate() / 10) * 10, 50, 50);
        image(this.gui, 0, 0, width, height);
    }
    addObj(box: GameObject, doId = false) {
        box.init()
        console.log(box.init);
        box.typeId = doId ? box.typeId : undefined;
        this.getActiveScene()?.boxes.push(box);
    }
    addScriptByName(name: string, vals: Object, obj: GameObject) {
        let params = {
            fileUUID: this.getByReference('name', name).UUID,
            vals: vals,
        };
        obj.components.push(new engine.componentList['gameScript']({
            ...params,
            obj: obj,
        }));
    }
    deleteGameFile(id: string, value: string | boolean = false) {
        delete this.files[this.getByReference(id, value).UUID]
    }
    getByReference(id: string, value: string | boolean = false): gameFile {
        if (this.files[id]) {
            return this.files[id];
        } else {
            for (let fileUUID in this.files) {
                let file = this.files[fileUUID];
                if (!value) {
                    for (let type in file.references) {
                        let reference = file.references[type];
                        if (reference == id) return file;
                    }
                }
                if (file.references[id] === value) return file;
            }
        }
    }
    customFileUUID(fileType: string) {
        if (this.hasUUID) {
            this.hasUUID = false;
            return this.assignedUUID;
        }
        let fileName = fileType.slice(1)
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
    assignUUID(UUID: string) {
        this.hasUUID = true;
        this.assignedUUID = UUID;
    }
    getfromUUID(UUID: string) {
        return this.uuidList[UUID];
    }
    getActiveScene() {
        return this.scene[this.currentScene];
    }
    changeUUID(ogUUId: string, newUUID: string) {
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
    touchStarted() {
        for (let uuid in this.guiObjects) {
            let GUIElement = this.guiObjects[uuid];
            GUIElement.touchStarted();
        }
    }
    touchEnded() {
        for (let uuid in this.guiObjects) {
            let GUIElement = this.guiObjects[uuid];
            GUIElement.touchEnded();
        }
    }
    updateGui(display: boolean = true) {
        for (let uuid in this.guiObjects) {
            let GUIElement = this.guiObjects[uuid];
            GUIElement.update();
            if (display) GUIElement.display();
        }
    }
}
class Camera {
    constructor(x: number, y: number, zoom = 1) {
        this.target = { x: x, y: y }
        this.currentPos = { x: x, y: y };
        this.zoom = zoom;
        this.isLocked = false
    }
    lookAt(x: number, y: number) {
        this.target = { x: x, y: y }
    }
    follow(obj: { x: number, y: number }) {
        this.target = obj;
    }
    setZoom(number: number) {
        this.zoom = number
    }
    updateCameraPos(): { x: number, y: number } {
        this.currentPos = {
            x: this.target.x,
            y: this.target.y
        }
        return this.target;
    }
}
Engine.removeListeners = [];