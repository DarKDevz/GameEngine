// var engine.scene = [];
// var engine.activeScene;
//var engine = new Engine();
//import p2 = require("../engine/collision/p2");
//import World = require("../engine/collision/p2");
//import World = require("../engine/collision/p2");
//Support for Older Projects
//All needed libraries
//To know which library you need look
//into Box2D Flash documentation
//go into indexes and search for what package you need
Import(Box2D.Dynamics, this);
Import(Box2D.Dynamics.Joints, this, "b2MouseJointDef");
Import(Box2D.Collision.Shapes, this);
Import(Box2D.Collision, this, "b2AABB");
Import(Box2D.Common.Math, this, "b2Vec2");
function getCurrentBoxes() {
    return engine.getActiveScene().boxes;
}
function deleteUser(obj) {
    if (!obj)
        return;
    for (let listeners of Engine.removeListeners) {
        if (typeof listeners === "function") {
            listeners(obj);
        }
    }
    if (!obj.components)
        return;
    let components = obj.components;
    for (let component of components) {
        //Don't remove files that aren't used
        component.deleteUser(false);
    }
}
function reloadcurrent() {
    for (let scene of engine.scene) {
        for (let boxesId = scene.boxes.length; boxesId >= 0; boxesId--) {
            if (typeof scene.boxes[boxesId] === "object") {
                if (engine.uuidList[scene.boxes[boxesId].uuid] === undefined) {
                    scene.boxes.splice(boxesId, 1);
                }
            }
        }
    }
}
function removeObject(objId) {
    if (typeof objId === "string" && objId.startsWith("0x")) {
        //it's passing an UUID, delete accordingly
        let obj = engine.uuidList[objId];
        if (!obj)
            return;
        deleteUser(obj);
        obj.delete();
        let sceneId = engine.getActiveScene().boxes.indexOf(obj);
        //delete engine.uuidList[objId];
        reloadcurrent();
    }
    else if (typeof objId === "object") {
        deleteUser(objId);
        if (!objId)
            return;
        let sceneId = engine.getActiveScene().boxes.indexOf(objId);
        objId.delete();
        //delete engine.uuidList[objId.uuid];
        reloadcurrent();
    }
    else {
        let obj = engine.getActiveScene().boxes[objId];
        if (!obj)
            return;
        deleteUser(obj);
        engine.uuidList[obj.uuid].delete();
        reloadcurrent();
    }
}
function addObj(ind, arr, sceneId) {
    const objectMap = {
        0: Box,
        1: End,
        2: movingPlatform,
        3: TextObject,
        4: Enemy,
        5: Interactive
    };
    let obj = new (objectMap[ind])(...arr);
    obj.scene = sceneId;
    return obj;
}
function ScenesfromObject(levelsObject) {
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
                else {
                    addGameFile(file[UUID]);
                }
            }
        }
        delete newLevels.file;
    }
    if (newLevels.version) {
        console.log(`%cEngine Version:${newLevels.version}`, "color:purple");
        delete newLevels.version;
    }
    for (let level_id in newLevels) {
        //console.log(level_id);
        if (!level_id.includes("l") && !level_id.includes('c')) {
            let newLevel = newLevels[level_id];
            let t_boxes = [];
            for (let object of newLevel) {
                let _objInd = object.shift();
                t_boxes.push(addObj(_objInd, object, level_id));
            }
            t_levels[level_id] = t_boxes;
            if (!newLevels[level_id + "l"]) {
                addLevel(t_boxes, createVector(400, -10));
            }
        }
        else if (level_id.includes("l")) {
            let extras = newLevels[level_id];
            //console.log(newLevels[level_id]);
            addLevel(t_levels[extras[0]], createVector(extras[1], extras[2]), extras[3]);
        }
        else {
            for (let ObjwithComponents of newLevels[level_id]) {
                //console.log(_components);
                for (let BoxId in ObjwithComponents) {
                    let components = ObjwithComponents[BoxId];
                    if (BoxId === "UUID") {
                        for (let box in components) {
                            let ogUUID = engine.scene[level_id.slice(0, -1)].boxes[box].uuid;
                            engine.changeUUID(ogUUID, components[box]);
                        }
                        //console.warn("UUID found:",engine.scene[level_id.slice(0, -1)].boxes);
                    }
                    else if (BoxId === "file") {
                        console.warn(components);
                    }
                    else {
                        let _componentList = [];
                        for (let component of components) {
                            var level = engine.scene[level_id.slice(0, -1)];
                            var box = level.boxes[BoxId];
                            //box.scene = level.ind;
                            var componentConstructor = Engine.componentList[component.name];
                            var paramObj = { obj: box };
                            for (let _param in component.params) {
                                paramObj[_param] = component.params[_param];
                            }
                            //paramObj.fn = component.params.fn
                            var newComponent = new componentConstructor({ ...paramObj });
                            _componentList.push(newComponent);
                            if (newComponent.fileType === ".img") {
                                newComponent.reloadImage();
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
}
function JsonMap(file) {
    if (!(engine instanceof Engine)) {
        console.error("engine hasn't been initialized in setup()");
    }
    engine = new Engine();
    if (typeof file.data === "object") {
        ScenesfromObject(file.data);
    }
    else {
        ScenesfromObject(JSON.parse(file.data));
    }
}
class Level {
    constructor(arr, pos, maxPos) {
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
        });
        this.ind = engine.scene.length;
        this.pos = pos;
        this.maxPos = maxPos;
    }
    resize(ww, wh) {
        for (let t_box of this.boxes) {
            t_box.resize(ww, wh);
        }
    }
    addObj(box) {
        box.init();
        this.boxes = [...this.boxes, box];
    }
    customDraw(shouldRun = true) {
        if (!shouldRun)
            return 1;
        stroke(0, 0, 255);
        line(this.pos.x, this.pos.y, this.pos.x + 25, this.pos.y);
        stroke(0, 255, 0);
        line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + 25);
        stroke(255, 0, 0);
        line(engine.cameraPos.x, this.maxPos, engine.cameraPos.x + width, this.maxPos);
        stroke(0);
    }
    display(OnlyDraw = false) {
        translate(width / 2, height / 2);
        let camera = engine.camera;
        let cameraPos = camera.updateCameraPos();
        scale(camera.zoom);
        translate(-cameraPos.x, -cameraPos.y);
        //Call without drawing
        //Do Update First Only if you can
        let mult = 1 / camera.zoom;
        let collisionVectors = [
            { x: (cameraPos.x - (width / 2 * mult)), y: (cameraPos.y - (height / 2 * mult)) },
            { x: width * mult, y: height * mult }
        ];
        if (!OnlyDraw) {
            for (let t_box of this.boxes) {
                t_box.display(false, true);
            }
        }
        //Draw
        let zIndexed = {};
        let drawable = [];
        for (let t_box of this.boxes) {
            if (t_box.z < 0) {
                console.error("Z Index shouldn't be negative!");
                console.trace();
            }
            let ObjectVectors = t_box.getCollisionVectors();
            let collides = HandleCollision('Rect', t_box.getCollisionType() + 'Vector', ...collisionVectors, ...ObjectVectors);
            if (collides) {
                drawable.push(t_box);
            }
        }
        let sorted = [...drawable].sort((a, b) => {
            return a.z - b.z;
        });
        fill(125);
        if (window?.editor) {
            DrawAll();
        }
        for (let t_box of sorted) {
            t_box.display(OnlyDraw, false);
        }
        if (engine.physics) {
            engine.world.Step(1 / 60, 10, 10);
            //engine.world.DrawDebugData();
            engine.world.ClearForces();
        }
        translate(cameraPos.x, cameraPos.y);
        if (engine.errorText) {
            fill(0);
            textSize(16);
            text(engine.errorText, 50 - width / 2, 50 - height / 2);
        }
        translate(-cameraPos.x, -cameraPos.y);
    }
    keyPress(event, shouldRun = true) {
        if (!shouldRun)
            return;
        for (let t_box of this.boxes) {
            t_box.keyPress(event);
        }
    }
    lateUpdate(shouldRun = true) {
        if (!shouldRun)
            return 1;
        for (let t_box of this.boxes) {
            t_box.lateUpdate();
        }
    }
    earlyUpdate(shouldRun = true) {
        if (!shouldRun)
            return 1;
        for (let uuid in engine.guiObjects) {
            let GUIElement = engine.guiObjects[uuid];
            GUIElement.update();
            GUIElement.display();
        }
        for (let t_box of this.boxes) {
            t_box.earlyUpdate();
        }
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
        return ["ind", "posX", "posY", "maxPos"];
    }
    getLevelValues() {
        return [this.ind, this.posX, this.posY, this.maxPos];
    }
    getLevelValueNames() {
        return ["level Index", "starting Position x", "starting Position y", "Max Y Pos"];
    }
    loadLevel() {
        player.pos = this.pos.copy();
        player.cameraPos.x = this.pos.x;
        player.cameraPos.y = this.pos.y;
        player.grounded = false;
        player.groundedId = null;
        player.colliding = false;
        player.collidedId = null;
        player.vel = createVector(0, 0);
        if (engine.activeScene !== undefined) {
            for (let box of engine.getActiveScene().boxes) {
                box.removeBody();
            }
        }
        engine.activeScene = this.ind;
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
            console.log(this.boxes.indexOf(t_box));
            let _newComponents = [];
            for (let _component of _components) {
                _newComponents.push(_component.toJson());
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
            return box.typeId !== undefined;
        });
        window?.editor?.updateLevels?.();
        const boxVals = this.boxes.map((t_box) => [t_box.typeId, ...t_box.getValues()]);
        return boxVals;
    }
    addSceneBtn(leftDiv, openerState) {
        let sceneBtn = createDiv();
        let headerText = createDiv();
        headerText.parent(sceneBtn);
        headerText.style("width: fit-content;");
        let inputField = createDiv();
        inputField.parent(sceneBtn);
        openerState[this.ind] ??= { value: false };
        headerText.doubleClicked(() => {
            if (engine.activeScene !== this.ind) {
                this.loadLevel();
                editor.setCameraPos(this.pos);
            }
        });
        accordionMenu(headerText, inputField, "Scene: " + this.ind, openerState[this.ind]);
        for (let box of this.boxes) {
            let _box = createDiv(box.constructor.name);
            _box.style("cursor: pointer; width: fit-content;");
            _box.mousePressed(() => {
                if (engine.activeScene === this.ind) {
                    editor.setSelection([box.uuid]);
                    editor.setCameraPos(box);
                }
            });
            _box.doubleClicked(() => {
                if (engine.activeScene !== this.ind) {
                    this.loadLevel();
                    setTimeout(() => {
                        editor.setSelection([box.uuid]);
                        editor.setCameraPos(box);
                    }, 500);
                }
            });
            _box.parent(inputField);
        }
        sceneBtn.parent(leftDiv);
        sceneHolder.push(sceneBtn);
    }
}
function MapJson() {
    let mapData = {};
    mapData = {};
    let fileList = [];
    for (let fileId in engine.files) {
        let file = engine.files[fileId];
        let obj = {};
        obj[fileId] = { data: file.data.replaceAll('"', "'"), type: file.type, references: file.references };
        fileList.push(obj);
    }
    mapData["version"] = 1.2;
    mapData["file"] = fileList;
    for (let level of engine.scene) {
        mapData[level.ind] = level.toJSON();
    }
    for (let level of engine.scene) {
        mapData[level.ind + "l"] = level.extrasJson();
    }
    for (let level of engine.scene) {
        let components = level.componentsJson();
        if (components) {
            mapData[level.ind + "c"] = components;
        }
    }
    engine.getActiveScene().loadLevel;
    return JSON.stringify(mapData);
}
function addLevel(arr, pos, maxPos = 500) {
    let _level = new Level(arr, pos, maxPos);
    engine.scene.push(_level);
    return _level;
}
