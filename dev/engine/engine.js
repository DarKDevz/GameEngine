"use strict";
var engine;
class Engine {
    constructor() {
        this.scene = [];
        this.activeScene;
        this.files = {};
        this.uuidList = {};
        this.hasUUID = false;
        this.assignedUUID = "";
        this.cameraPos = { x: 0, y: 0 };
        this.world = new b2World(new b2Vec2(0, 100) //gravity
        , true); // wheter to doSleep enabled to true because otherwise it will fuck over performance
        this.componentList = Engine.componentList;
        window.keyPressed = this.keyPress.bind(this);
        // this.body = new p2.Body({ mass: 1 });
        // this.world.addBody(this.body);
    }
    keyPress(key) {
        this.getActiveScene().keyPress(key);
    }
    loadFromObject(obj, autoDraw = false) {
        ScenesfromObject(obj);
        if (autoDraw) {
            this.Initiate();
        }
    }
    Initiate() {
        window.draw = this.draw.bind(this);
    }
    setup() { }
    draw() {
        push();
        background(150, 230, 240);
        let scene = this.getActiveScene();
        //Update
        player.update();
        //Early Update
        scene.earlyUpdate();
        player.camera();
        player.checkCollisions();
        scene.display();
        player.display();
        //Late Update
        scene.lateUpdate();
        pop();
        push();
        text("FPS: " + round(frameRate() / 10) * 10, 50, 50);
        pop();
    }
    addObj(box, doId = false) {
        box.init();
        console.log(box.init);
        box.typeId = doId ? box.typeId : undefined;
        this.getActiveScene().boxes.push(box);
    }
    addScriptByName(name, vals, obj) {
        let params = {
            fileUUID: this.getByReference('name', name).UUID,
            vals: vals,
        };
        obj.components.push(new engine.componentList['gameScript'](Object.assign(Object.assign({}, params), { obj: obj })));
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
            return false;
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
        return this.scene[this.activeScene];
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
        while (this.uuidList[UUID]) {
            stack++;
            UUID = "0x" + (Math.random() * 99999999999999999).toString(16);
            if (stack >= 99999999) {
                throw new Error("Stack exceeded! Math.random is broken or uuid list is filled");
            }
        }
        return UUID;
    }
}
Engine.removeListeners = [];
