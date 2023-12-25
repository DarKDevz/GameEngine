var engine: Engine;
import('/engine/test/rapier2d.test.js').then((obj) => {
    obj.init().then(() => {
        window.RAPIER = obj;
    });
});
class Engine extends GameEvents {
    static removeListeners: Function[];
    static componentList: { [x: string]: Component };
    static fileTypeList: { [x: string]: string };
    loading: boolean;
    constructor() {
        super()
        this.globalDefine(true);
        this.physics = engine?.physics ? true : false;
        this.scene = [];
        this.currentScene;
        this.files = {};
        let temp = {};
        let context = this;
        this.uuidList = new Proxy(temp, {
            set(target, key: string, value) {
                target[key] = value;
                context.eventListener[key]?.onload(value);
                return true;
            },
            get(target, key, receiver) {
                return target[key];
            }
        });
        this.usedUUID = [];
        this.hasUUID = false;
        this.assignedUUID = "";
        this.camera = engine?.camera ? engine.camera : new Camera(0, 0);
        this.editorZoom = this.camera.zoom;
        this.gui = createGraphics(windowWidth, windowHeight);
        this.guiObjects = Object.assign({}, engine?.guiObjects)
        this.mobile = navigator.userAgent.includes("Mobile");
        if (this.mobile) {
            //Default mouseButton to be left
            mouseButton = 'left'
        }
        this.world = new RAPIER.World({
            x: 0.0,
            y: 9.81,
          });
          //Prevents weird glitches
          this.world.step() // wheter to doSleep enabled to true because otherwise it will fuck over performance
        this.componentList = Engine.componentList
        this.eventListener = {}
        this.collisionWorker;
        this.allCollisions = {}
        if (engine?.collisionWorker) {
            engine.collisionWorker.terminate()
        }
        this.collisionWorker ??= new Worker("engine/objects/collisionChecker.js")
        this.collisionWorker.addEventListener('message', (e) => {
            if (e.data.type === "cache") {
                this.allCollisions = e.data.value
            }
        })
        setTimeout(() => { this.tryFirstLoad() }, 500)
        this.is3D;
        // this.body = new p2.Body({ mass: 1 });
        // this.world.addBody(this.body);
    }
    tryFirstLoad() {
        if (window?.canvas?.width) {
            this.resize(width, height);
        } else {
            setTimeout(() => { this.tryFirstLoad() }, 500)
        }
    }
    checkCache(obj1: any, obj2: any): boolean | undefined {
        let uuid1 = obj1?.uuid ? obj1.uuid : obj1
        let uuid2 = obj2?.uuid ? obj2.uuid : obj2
        if (this.allCollisions.hasOwnProperty(uuid1) && this.allCollisions.hasOwnProperty(uuid2)) {
            if (this.allCollisions[uuid1].hasOwnProperty(uuid2) && this.allCollisions[uuid2].hasOwnProperty(uuid1)) {
                return this.allCollisions[uuid1][uuid2] && this.allCollisions[uuid2][uuid1]
            }
        }
        return undefined;
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
        //WebGL variant(Includes mouseZ)
        let DPoint: DOMPoint;
        let matrix: DOMMatrix;
        if (webglVersion === "webgl2") {
            let defaultEyeZ = height / 2 / Math.tan(p5.instance._renderer._curCamera.cameraFOV / 2);
            //offZ1*=2
            var ratio = (p5.instance._renderer._curCamera.eyeZ) / defaultEyeZ;
            //Removes all Z's that are from camera and scale the object correctly
            matrix = new DOMMatrix(p5.instance._renderer.uMVMatrix.mat4);
            DPoint = new DOMPoint((mouseX - width / 2) * ratio, (mouseY - height / 2) * ratio, -p5.instance._renderer._curCamera.eyeZ);
        }
        else {
            matrix = drawingContext.getTransform();
            DPoint = new DOMPoint(mouseX * pixelDensity(), mouseY * pixelDensity());
        }
        return matrix.inverse().transformPoint(DPoint);
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
    /*all events are here */
    deviceMoved(e: Event) {
        this.activeScene?.deviceMoved(e, Boolean(window?.editor));
    }
    deviceTurned(e: Event) {
        this.activeScene?.deviceTurned(e, Boolean(window?.editor));
    }
    deviceShaken(e: Event) {
        this.activeScene?.deviceShaken(e, Boolean(window?.editor));
    }
    doubleClicked(e: Event) {
        this.activeScene?.doubleClicked(e, Boolean(window?.editor));
    }
    mousePressed(e: Event) {
        this.activeScene?.mousePressed(e, Boolean(window?.editor));
    }
    mouseReleased(e: Event) {
        this.activeScene?.mouseReleased(e, Boolean(window?.editor));
    }
    mouseMoved(e: Event) {
        this.activeScene?.mouseMoved(e, Boolean(window?.editor));
    }
    mouseDragged(e: Event) {
        this.activeScene?.mouseDragged(e, Boolean(window?.editor));
    }
    mouseClicked(e: Event) {
        this.activeScene?.mouseClicked(e, Boolean(window?.editor));
    }
    mouseWheel(e: WheelEvent) {
        if (Boolean(window?.editor) && !overUI) {
            if (abs(e.deltaY) > abs(e.deltaX)) {
                engine.editorZoom -= constrain(e.deltaY, -8, 8) * .035 * engine.editorZoom;
                engine.editorZoom = constrain(engine.editorZoom, 0.01, 5);
            } else {
                editor.cameraPos.x += (e.deltaX) / engine.editorZoom;
            }
            e.preventDefault()
        }
        this.activeScene?.mouseWheel(e, Boolean(window?.editor));
    }
    touchMoved(e: Event) {
        this.activeScene?.touchMoved(e, Boolean(window?.editor));
    }
    keyPressed(e: Event) {
        this.activeScene?.keyPressed(e, Boolean(window?.editor));
    }
    keyReleased(e: Event) {
        this.activeScene?.keyReleased(e, Boolean(window?.editor));
    }
    keyTyped(e: Event) {
        this.activeScene?.keyTyped(e, Boolean(window?.editor));
    }
    loadFromObject(obj: ImportInterface, autoEvents = false) {
        ScenesfromObject(obj);
        if (autoEvents) {
            this.Initiate();
        }
    }
    Initiate() {
        window.draw ??= this.draw.bind(this);
        //This fixes webkit bug with ios
        window.windowResized ??= () => { this.mobile ? setTimeout(() => this.resize(), 200) : this.resize() };
    }
    setup() {
        document.oncontextmenu = function (e) {
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
        if (webglVersion !== "p2d") {
            drawingContext.disable(drawingContext.DEPTH_TEST)
            image(this.gui, -width / 2, -height / 2, width, height);
            drawingContext.enable(drawingContext.DEPTH_TEST)

        } else {
            image(this.gui, 0, 0, width, height);
        }
    }
    onload(uuid: UUID, func: (arg0: GameObject) => void) {
        this.eventListener[uuid] = Object.assign({ onload: func }, this.eventListener[uuid])
        if (this.uuidList[uuid]) {
            func(this.uuidList[uuid])
        }
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
        //Remove references
        //Set script to none
        let file = this.files[this.getByReference(id, value).UUID]
        let whoUses = file.whoUses
        if (file.type === ".js") {
            file.data = "";
            for (let ObjId in whoUses) {
                let script = whoUses[ObjId];
                script.loadFile(file);
            }
        }
        for (let i in whoUses) {
            for (let compInd in whoUses[i].ownObject.components) {
                let comp = whoUses[i].ownObject.components[compInd]
                if (whoUses[i] === comp) {
                    whoUses[i].ownObject.components.splice(compInd, 1)
                }
            }
        }
        delete this.files[this.getByReference(id, value).UUID];
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
    touchStarted(e) {
        for (let uuid in this.guiObjects) {
            let GUIElement = this.guiObjects[uuid];
            GUIElement.touchStarted();
        }
        this.updateGui(false)
        this.activeScene?.touchStarted(e, Boolean(window?.editor));
        if (e.srcElement === canvas) return false;
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
            fullscreen(true)
        }
        this.activeScene?.touchEnded(e, Boolean(window?.editor));
        if (e.srcElement === canvas) return false;
    }
    updateGui(display: boolean = true, forceDraw: boolean = false, update: boolean = true) {
        for (let uuid in this.guiObjects) {
            let GUIElement = this.guiObjects[uuid];
            if (GUIElement.mobileOnly) {
                if (engine.mobile) {
                    if (update) GUIElement.update();
                    if (display) GUIElement.display();
                } else if (forceDraw) {
                    if (update) GUIElement.update();
                    if (display) GUIElement.display();
                }
            }
            if (!GUIElement.mobileOnly) {
                if (update) GUIElement.update();
                if (display) GUIElement.display();
            }
        }
    }
    customDraw(doDraw: boolean) {
        if (doDraw) {
            this.activeScene?.customDraw(true);
            this.updateGui(true, true, false);
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
