function getCurrentBoxes() {
    return engine.getActiveScene().boxes
}
function deleteUser(obj: GameObject) {
    if (!obj) return;
    for (let listeners of Engine.removeListeners) {
        if (typeof listeners === "function") {
            listeners(obj);
        }
    }
    if (!obj.components) return;
    let components = obj.components;
    for (let component of components) {
        //Don't remove files that aren't used
        component.deleteUser(false);
    }
}
function cleanScene() {
    let test = {}
    for (let scene of engine.scene) {
        test[scene.ind] = {}
        for (let boxesId = scene.boxes.length; boxesId >= 0; boxesId--) {
            if (typeof scene.boxes[boxesId] === "object") {
                if (test[scene.ind][scene.boxes[boxesId].uuid]) {
                    scene.boxes.splice(boxesId, 1);
                }
                test[scene.ind][scene.boxes[boxesId].uuid] ??= scene.boxes[boxesId]
                if (engine.uuidList[scene.boxes[boxesId].uuid] === undefined) {
                    scene.boxes.splice(boxesId, 1);
                }
            }
        }
    }
    /**
     * Gets all collision types and vectors and put them in the collision worker
     */
    let allCollision = {};
    engine.activeScene.boxes.forEach((b) => {
        allCollision[b.uuid] = ([b.getCollisionType(), b.getCollisionVectors()])
    })
    if (player?.getCollisionType) {
        allCollision['Player'] = [player.getCollisionType(), player.getCollisionVectors()];
    }
    engine.collisionWorker.postMessage({ type: "update", value: allCollision })
    engine.collisionWorker.postMessage({ type: "getcache" })
}
function removeObject(objId: UUID | GameObject | number) {
    if (typeof objId === "string" && objId.startsWith("0x")) {
        //it's passing an UUID, delete accordingly
        let obj = engine.uuidList[objId];
        if (!obj) return;
        deleteUser(obj)
        obj.delete()
        //delete engine.uuidList[objId];
    } else if (typeof objId === "object") {
        let obj: GameObject = objId;
        deleteUser(obj);
        if (!obj) return;
        obj.delete()
        //delete engine.uuidList[objId.uuid];
    }
    else {
        let index: any = objId;
        let obj = engine.getActiveScene().boxes[index]
        if (!obj) return;
        deleteUser(obj)
        engine.uuidList[obj.uuid].delete();
    }
}

function addObj(ind: any, arr: any, sceneId?: string) {
    let objectMap = {
        0: Box,
        1: End,
        2: movingPlatform,
        3: TextObject,
        4: Enemy,
        5: Interactive
    };
    let obj;
    if (objectMap.hasOwnProperty(ind)) {
        obj = new (objectMap[ind])(...arr);
        //This can introuduce xss exploits
        //but we already allow code execution any way so who cares
    } else if (eval(ind)) {
        obj = new (eval(ind))(...arr);
    }
    obj.scene = sceneId;
    return obj;
}
function ScenesfromObject(levelsObject: ImportInterface) {
    engine.loading = true;
    engine.is3D = Boolean(levelsObject.is3D);
    engine.defaultPlayer = 'defaultPlayer' in levelsObject ? Boolean(levelsObject.defaultPlayer) : true;
    let t_levels = {};
    var newLevels = levelsObject;
    if (newLevels.file) {
        for (let file of newLevels.file) {
            for (let UUID in file) {
                engine.assignUUID(UUID);
                //console.warn(file[UUID])
                if (typeof file[UUID] === "object") {
                    file[UUID].references ??= {};
                    addGameFile(file[UUID].data, file[UUID].type, file[UUID].references);
                }
            }
        }
        delete newLevels.file;
    }
    if (newLevels.version) {
        console.log(`%cEngine Version:${newLevels.version}`, "color:purple")
        if (newLevels.version < 1.3) {
            delete newLevels.version;
            for (let level_id in newLevels) {
                //console.log(level_id);
                if (!level_id.includes("l") && !level_id.includes('c')) {
                    let newLevel = newLevels[level_id];
                    let t_boxes = [];
                    for (let object of newLevel) {
                        let _objInd = object.shift()
                        t_boxes.push(addObj(_objInd, object, level_id))
                    }
                    t_levels[level_id] = t_boxes;
                    if (!newLevels[level_id + "l"]) {
                        addLevel(t_boxes, createVector(400, -10));
                    }
                } else if (level_id.includes("l")) {
                    let extras = newLevels[level_id];
                    //console.log(newLevels[level_id]);
                    addLevel(t_levels[extras[0]], createVector(extras[1], extras[2]), extras[3]);
                } else {
                    for (let ObjwithComponents of newLevels[level_id]) {
                        //console.log(_components);
                        for (let BoxId in ObjwithComponents) {
                            let components = ObjwithComponents[BoxId];
                            if (BoxId === "UUID") {
                                for (let box in components) {
                                    let ogUUID = engine.scene[level_id.slice(0, -1)].boxes[box].uuid;
                                    engine.changeUUID(ogUUID, components[box])
                                }
                                //console.warn("UUID found:",engine.scene[level_id.slice(0, -1)].boxes);
                            } else if (BoxId === "file") {
                                console.warn(components);
                            } else {
                                let _componentList = [];
                                for (let component of components) {
                                    var level = engine.scene[level_id.slice(0, -1)];
                                    var box = level.boxes[BoxId];
                                    //box.scene = level.ind;
                                    var componentConstructor = Engine.componentList[component.name];
                                    var paramObj: { obj: any } = { obj: box }
                                    for (let _param in component.params) {
                                        paramObj[_param] = component.params[_param]
                                    }
                                    //paramObj.fn = component.params.fn
                                    var newComponent = new componentConstructor({ ...paramObj });
                                    _componentList.push(newComponent);
                                    if (newComponent.fileType === ".img") {
                                        newComponent.reloadImage()
                                    }
                                    //console.log(newComponent);
                                }
                                var box = level.boxes[BoxId];
                                box.components = _componentList;
                            }
                        }
                    }
                    //console.log(newLevels[level_id]);
                }
            }
            engine.scene[0].loadLevel();
            return;
        }
    }
    if (levelsObject.GUI.default) {
        engine.assignUUID("Joystick");
        let stick = new Joystick(height / 4.5, height - height / 4.5, height / 3, height / 6, {});
        stick.mobileOnly = true;
        stick.resize = (ww, wh) => {
            stick.position.x = wh / 4.5;
            stick.position.y = wh - wh / 4.5;
            stick.stickPosition.x = stick.position.x;
            stick.stickPosition.y = stick.position.y;
            stick.size = wh / 3;
            stick.stickSize = wh / 6;
        };
        engine.assignUUID("Button");
        let jumpBtn = new Button(width - height / 4.5, height - height / 4.5, height / 3, () => { }, () => { });
        jumpBtn.resize = (ww, wh) => {
            jumpBtn.position.x = ww - wh / 4.5;
            jumpBtn.position.y = wh - wh / 4.5;
            jumpBtn.size = wh / 3;
        };
        jumpBtn.mobileOnly = true;
    }
    textFont(loadFont("./libs/defaultFont.ttf"));
    for (let sceneInd in levelsObject.scenes) {
        let scene = levelsObject.scenes[sceneInd];
        let t_boxes = [];
        for (let ind in scene.Data) {
            let object = scene.Data[ind];
            let typeOfObj = object.shift();
            let obj = addObj(typeOfObj, object, sceneInd)
            let _componentList = [];
            if (scene?.componentData?.length === 1 && scene?.componentData[0][ind]) {
                let componentList = scene.componentData[0][ind];
                for (let component of componentList) {
                    var level = engine.scene[sceneInd];
                    //box.scene = level.ind;
                    var componentConstructor = Engine.componentList[component.name];
                    var paramObj: { obj: any } = { obj: obj }
                    for (let _param in component.params) {
                        paramObj[_param] = component.params[_param]
                    }
                    //paramObj.fn = component.params.fn
                    var newComponent = new componentConstructor({ ...paramObj });
                    _componentList.push(newComponent);
                    if (newComponent.fileType === ".img") {
                        newComponent.reloadImage()
                    }
                }
            }
            obj.components = _componentList;
            t_boxes.push(obj)
        }
        t_levels[sceneInd] = t_boxes;
        addLevel(t_boxes, createVector(scene.sceneData[1], scene.sceneData[2]), scene.sceneData[3]);
    }
    engine.finishedLoading();
    engine.scene[0].loadLevel();
    engine.loading = false;
}
function LoadMap(file: { data: any }) {
    if (!(engine instanceof Engine)) {
        console.error("engine hasn't been initialized in setup()")
    }
    if (typeof file.data === "object") {
        ScenesfromObject(file.data);
    } else {
        ScenesfromObject(JSON.parse(file.data))
    }
}
class Level extends GameEvents {
    constructor(arr: GameObject[], pos: Vec, maxPos: number) {
        super()
        let eventify = function (arr, callback) {
            arr.push = function (e) {
                let ret = Array.prototype.push.call(arr, e);
                callback(e);
                return ret;
            };
        };
        this.boxes = arr;
        eventify(this.boxes, (box) => {
            box.scene = this.ind.toString();
            //console.error(box.sprites);
            //if(box.sprites.length === 0)box.init();
        })
        this.ind = engine.scene.length;
        this.pos = pos;
        this.maxPos = maxPos;
    }
    resize(ww: number, wh: number) {
        for (let t_box of this.boxes) {
            t_box.resize(ww, wh);
        }
    }
    addObj(box: GameObject) {
        box.init();
        this.boxes = [...this.boxes, box];
        engine.uuidList[box.uuid] ??= box
        box.scene = "" + this.ind
    }
    customDraw(shouldRun = true) {
        if (!shouldRun) return 1;
        stroke(0, 0, 255);
        line(this.pos.x, this.pos.y, this.pos.x + 25, this.pos.y);
        stroke(0, 255, 0);
        line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + 25);
        stroke(0);
        let mult = 1 / engine.camera.zoom
        stroke(255, 0, 0);
        line((engine.cameraPos.x - (width / 2 * mult)), this.maxPos, width * mult, this.maxPos);
    }
    display(OnlyDraw = false) {
        if (webglVersion === "p2d") translate(width / 2, height / 2);
        let camera = engine.camera
        let cameraPos = camera.updateCameraPos()
        if (!engine.is3D) {
            scale(camera.zoom);
            translate(-cameraPos.x, -cameraPos.y)
        }
        //Call without drawing
        //Do Update First Only if you can
        let collisionVectors = []
        if (!OnlyDraw) {
            for (let t_box of this.boxes) {
                t_box.display(false, true);
            }
        }
        //Draw variables
        let zIndexed = {};
        let drawable = [];
        let matrix = webglVersion == "p2d" ? drawingContext.getTransform().inverse() : null;
        let pointFirst = new DOMPoint(0, 0);
        let pointSecond = new DOMPoint(width * pixelDensity(), height * pixelDensity());
        let sorted;
        if (webglVersion == "webgl2") {
            //Update plane collider
            /**
             * @todo Make it only update if needed aka camera matrix updated
             * @todo Add left right bottom top planes Right now it has only near far (Gets the job done)
             */
            updateColliders()
            for (let t_box of this.boxes) {
                var frustum = {
                    getCollisionType(): collisionTypes {
                        return 'Frustum';
                    },
                    getCollisionVectors() {
                        return [p5.instance._renderer];
                    }
                };
                let collides: boolean;
                //To remove useless frustum collision check
                if (t_box.alwaysDraw) {
                    collides = true
                }
                collides ??= HandleCollision(t_box, frustum);
                //Or if property alwaysDraw is set
                if (collides) {
                    drawable.push(t_box);
                }
                //No sorting in webgl
                //Does nothing
                sorted = drawable;
            }
        } else {
            collisionVectors = [matrix.transformPoint(pointFirst), matrix.transformPoint(pointSecond)];
            let s = collisionVectors[0]
            let b = collisionVectors[1];
            collisionVectors[1] = { x: b.x - collisionVectors[0].x, y: b.y - collisionVectors[0].y };
            for (let t_box of this.boxes) {
                var frustum = {
                    getCollisionType(): collisionTypes {
                        return 'Rect';
                    },
                    getCollisionVectors() {
                        return collisionVectors;
                    }
                };
                let collides: boolean;
                if (t_box.alwaysDraw) {
                    collides = true
                }
                collides ??= HandleCollision(t_box, frustum);
                //Or if property alwaysDraw is set
                if (collides) {
                    drawable.push(t_box);
                }
                sorted = [...drawable].sort((a, b) => {
                    return a.z - b.z;
                });
            }
        }
        fill(125);
        if (window?.editor) {
            DrawAll();
        }
        if (sorted) {
            for (let t_box of sorted) {
                t_box.display(OnlyDraw, false);
            }
        }
        if (engine.physics) {
            engine.world.step();
        }
        for (let t_box of this.boxes) {
            t_box.updateComponents()
        }
        translate(cameraPos.x, cameraPos.y)
        if (engine.errorText) {
            engine.gui.fill(0)
            engine.gui.textSize(16 * pixelDensity());
            engine.gui.text(engine.errorText, 50, 150)
        }
        translate(-cameraPos.x, -cameraPos.y)
        cleanScene();
    }
    lateUpdate(shouldRun = true) {
        if (shouldRun) {
            for (let t_box of this.boxes) {
                t_box.lateUpdate();
            }
        }
        cleanScene();
    }
    earlyUpdate(shouldRun = true) {
        if (!shouldRun) return 1;
        engine.updateGui()
        for (let t_box of this.boxes) {
            t_box.earlyUpdate();
        }
        cleanScene();

    }
    set posX(x) {
        this.pos.x = x;
    }
    get posX() {
        return this.pos.x;
    }
    set posY(y) {
        this.pos.y = y;
    }

    get posY() {
        return this.pos.y;
    }
    getActualLevelValues() {
        return ["ind", "posX", "posY", "maxPos"]
    }
    getLevelValues() {
        return [this.ind, this.posX, this.posY, this.maxPos]
    }
    getLevelValueNames() {
        return ["level Index", "starting Position x", "starting Position y", "Max Y Pos"]
    }
    loadLevel() {
        if (player && player.cameraPos) {
            player.pos = this.pos.copy();
            player.cameraPos.x = this.pos.x;
            player.cameraPos.y = this.pos.y;
            player.grounded = false;
            player.groundedId = null;
            player.colliding = false;
            player.collidedId = null;
            player.vel = createVector(0, 0);
        }
        gameParticle.stopAll()
        if (engine.currentScene !== undefined) {
            for (let box of engine.getActiveScene().boxes) {
                box.removeBody();
            }
        }
        engine.currentScene = this.ind;
        //Call init function of each;
        this.initiateBoxes();
        // let body = new p2.Body({mass:0,position:[0,-this.maxPos]})
        // body.addShape(new p2.Plane())
        // engine.world.addBody(body);
    }
    initiateBoxes() {
        //console.error(this.boxes);
        for (let t_box of this.boxes) {
            t_box.init();
            for (let component of t_box.components) {
                component.initialize()
            }
        }
    }
    reloadBoxes() {
        //boxes = this.boxes;
        console.error("reloadBoxes isn't needed, you can remove all fucntion calls that use this");
    }
    componentsJson() {
        let usableBoxes = this.boxes.filter((box) => box.typeId !== undefined);
        let finalObj = {};
        usableBoxes.map((t_box) => {
            let _components = t_box.components;
            console.log(this.boxes.indexOf(t_box))
            let _newComponents = [];
            for (let _component of _components) {
                _newComponents.push(_component.toJson())
            }
            if (_newComponents.length > 0) {
                finalObj[this.boxes.indexOf(t_box)] = _newComponents;
            }
        });
        if (Object.keys(finalObj).length > 0) {
            return [finalObj];
        }
    }
    extrasJson() {
        return this.getLevelValues();
    }
    toJSON() {
        this.boxes = this.boxes.filter((box) => {
            if (box.typeId == undefined) {
                box.delete();
            }
            return box.typeId !== undefined
        });
        window?.editor?.updateLevels?.();
        const boxVals = this.boxes.map((t_box) => [t_box.constructor.name, ...t_box.getParameters()]);

        return boxVals;
    }
    addSceneBtn(leftDiv: HTMLElement, openerState: any) {
        let sceneBtn = createDiv()
        let headerText = createDiv()
        headerText.parent(sceneBtn)
        headerText.style("width: fit-content;")
        let inputField = createDiv();
        inputField.parent(sceneBtn)
        openerState[this.ind] ??= { value: false };
        headerText.doubleClicked(() => {
            if (engine.currentScene !== this.ind) {
                this.loadLevel();
                editor.setCameraPos(this.pos)
            }
        })
        accordionMenu(headerText, inputField, "Scene: " + this.ind, openerState[this.ind]);

        sceneBtn.mouseReleased(() => {
            if (mouseButton === "right") {
                editor.openSceneContext(this.ind);
            }
        })
        /*drag and drop behaviour */
        headerText.elt.ondragover = (event) => {
            event.preventDefault();
        };
        headerText.elt.ondrop = (event) => {
            event.preventDefault()
            let objUUID = event.dataTransfer.getData("objUUID")
            if (objUUID === "") return;
            let obj = engine.getfromUUID(objUUID)
            console.log(obj, obj.scene);
            removeObject(objUUID);
            cleanScene();
            this.addObj(obj);
            editor.updates.level = true;
        }
        for (let box of this.boxes) {
            let isDragging = false;
            let _box = createDiv(box.constructor.name);
            _box.style("cursor: pointer; width: fit-content;")
            _box.mouseReleased(() => {
                if (isDragging) return
                switch (mouseButton) {
                    case "left":
                        if (engine.currentScene === this.ind) {
                            editor.setSelection([box.uuid]);
                            editor.setCameraPos(box);
                        }
                        return;
                    case "right":
                        editor.openContextMenu(box.uuid);
                        return;
                }
            });
            _box.doubleClicked(() => {
                if (engine.currentScene !== this.ind) {
                    this.loadLevel();
                    setTimeout(() => {
                        editor.setSelection([box.uuid])
                        editor.setCameraPos(box);
                    }, 500);
                }
            })
            _box.parent(inputField);
            _box.elt.draggable = "true";
            _box.elt.ondragstart = (event) => {
                event.dataTransfer.setData("objUUID", box.uuid);
                console.log(box);
                isDragging = true;
            };
            _box.elt.ondragend = (event) => {
                isDragging = false;
            };
        }
        sceneBtn.parent(leftDiv);
        sceneHolder.push(sceneBtn);
    }
    deviceMoved(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.deviceMoved(e);
        }
    }
    deviceTurned(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.deviceTurned(e);
        }
    }
    deviceShaken(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.deviceShaken(e);
        }
    }
    doubleClicked(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.doubleClicked(e);
        }
    }
    mousePressed(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.mousePressed(e);
        }
    }
    mouseReleased(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.mouseReleased(e);
        }
    }
    mouseMoved(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.mouseMoved(e);
        }
    }
    mouseDragged(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.mouseDragged(e);
        }
    }
    mouseClicked(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.mouseClicked(e);
        }
    }
    mouseWheel(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.mouseWheel(e);
        }
    }
    touchStarted(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.touchStarted(e);
        }
    }
    touchMoved(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.touchMoved(e);
        }
    }
    touchEnded(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.touchEnded(e);
        }
    }
    keyPressed(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.keyPressed(e);
        }
    }
    keyReleased(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.keyReleased(e);
        }
    }
    keyTyped(e: Event, noRun = false) {
        if (noRun) return;
        for (let box of this.boxes) {
            box.keyTyped(e);
        }
    }
}

function SaveMap() {
    let mapData: any;
    mapData = {};
    let fileList = []
    for (let fileId in engine.files) {
        let file = engine.files[fileId]
        let obj = {};
        obj[fileId] = { data: file.data.replaceAll('"', "'"), type: file.type, references: file.references };
        fileList.push(obj);
    }
    mapData.version = 1.4;
    //TODO
    mapData.is3D = engine.is3D;
    mapData.defaultPlayer = engine.defaultPlayer;
    mapData.file = fileList;
    mapData.scenes = {}
    for (let level of engine.scene) {
        mapData.scenes[level.ind] = {}
        mapData.scenes[level.ind]["Data"] = level.toJSON()
    }
    for (let level of engine.scene) {
        mapData.scenes[level.ind]["sceneData"] = level.extrasJson()
    }
    for (let level of engine.scene) {
        let components = level.componentsJson();
        if (components) {
            mapData.scenes[level.ind]["componentData"] = components
        }
    }
    mapData.GUI = {}
    //TODO: make window to disable default GUI
    //instead of this hack to remove it
    mapData.GUI.default = engine.uuidList.hasOwnProperty("Joystick");
    return JSON.stringify(mapData);
}
function addLevel(arr: GameObject[], pos: Vec, maxPos = 500) {
    let _level = new Level(arr, pos, maxPos);
    engine.scene.push(_level)
    return _level;
}