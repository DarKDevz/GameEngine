var editor;
var forceMenuUpdate = false, forceBrowserUpdate = false, lastWasPressed = false, overUI = false, Pressed = lastWasPressed, button = null, exampleButton = null, refreshButton = null, addButton = null, selectedObjects = [], lastScene = null, inputFile = null, visibleInputFile = null, saveButton = null, copyButton = null, removeButton = null, levelButton = null, gridSize = 1, lastUsedMouse = { x: false, y: false }, mouseDiff = { x: 0, y: 0 }, actionButtons = null, sideMenu = null, boxInfo = null, info = [], lastInfo = [], infoDivs = [], infoDivsHolder = [], infoIndexes = [], addSelect = null, id = null, openerState = {}, shouldUpdateLevels = true, sceneHolder = [], ContentBrowserPanel = {
    set files(value) { engine.files = value; },
    get files() { return engine.files; },
    Divs: [],
}, OldFiles = [];
class Editor {
    constructor() {
        this.levelMode = false;
        this.cameraPos = createVector(0, 0);
        this.playingWindow;
        this.creatingNew = false;
        this.newObject;
        this.valChanged = new Event("ValueChanged");
        this.copiedObj = [];
        this.selectionBox = [];
        this.gridSize = 1;
        this.pasted = false;
        this.startPos = createVector(0, 0);
        this.isCircle = false;
        this.tryOffset = {};
    }
    fromReference(id) {
        let _ = select("#" + id);
        this.uiElement(_);
        return _;
    }
    startSelect() {
        if (lastWasPressed != Pressed && Pressed && mouseButton === LEFT) {
            this.selectionBox.push(this.mouseCoords().array());
            this.startPos = this.mouseCoords();
        }
    }
    moveScreen() {
        let diffX = (mouseX - pmouseX) / engine.camera.zoom;
        let diffY = (mouseY - pmouseY) / engine.camera.zoom;
        mouseDiff = { x: diffX, y: diffY };
        if (selectedObjects.length !== 0) {
            this.moveObjects(mouseDiff);
        }
        else {
            this.cameraPos.x -= diffX;
            this.cameraPos.y -= diffY;
        }
    }
    moveObjects(frameDiff) {
        for (let uuid of selectedObjects) {
            let tempBox = engine.getfromUUID(uuid);
            if (tempBox) {
                tempBox.customDraw();
                let diff = {
                    x: frameDiff.x,
                    y: frameDiff.y
                };
                if (this.tryOffset[uuid]) {
                    diff.x += this.tryOffset[uuid].x;
                    diff.y += this.tryOffset[uuid].y;
                }
                let newPos = {
                    x: Math.round(tempBox.x / this.gridSize) * this.gridSize,
                    y: Math.round(tempBox.y / this.gridSize) * this.gridSize
                };
                let remainder = { x: diff.x % this.gridSize, y: diff.y % this.gridSize };
                this.tryOffset[uuid] = remainder;
                let newDiff = { x: diff.x - remainder.x, y: diff.y - remainder.y };
                newPos.x += newDiff.x;
                newPos.y += newDiff.y;
                tempBox.offSet(newPos.x, newPos.y, newDiff.x, newDiff.y);
            }
            else {
                selectedObjects.splice(uuid, 1);
            }
        }
    }
    setSelection(newArr) {
        selectedObjects = newArr;
    }
    setCameraPos(obj) {
        this.cameraPos.x = obj.x;
        this.cameraPos.y = obj.y;
    }
    updateLevels() {
        //console.log(engine.scene);
        let leftDiv = document.getElementById("leftDiv");
        for (let oldScene of sceneHolder) {
            oldScene.remove();
        }
        for (let scene of engine.scene) {
            scene.addSceneBtn(leftDiv, openerState);
        }
    }
    removeSelection() {
        selectedObjects = [];
        this.tryOffset = {};
        for (let t_info of infoDivs) {
            t_info.remove();
        }
    }
    DrawSelection() {
        fill(0, 0, 0, 25);
        if (this.creatingNew) {
            let distance = (dist(this.selectionBox[0][0], this.selectionBox[0][1], this.selectionBox[1][0], this.selectionBox[1][1]));
            let objClass = classes[addSelect.value()];
            if (objClass.prototype.getCollisionType() === 'Circle') {
                circle(this.selectionBox[0][0], this.selectionBox[0][1], distance * 2);
                this.isCircle = true;
                return;
            }
            this.isCircle = false;
        }
        rect(this.selectionBox[0][0], this.selectionBox[0][1], this.selectionBox[1][0] - this.selectionBox[0][0], this.selectionBox[1][1] - this.selectionBox[0][1]);
    }
    onUpdate() {
        if (!overUI) {
            lastWasPressed = Pressed;
            Pressed = mouseIsPressed && !this.levelMode;
        }
        if (this.selectionBox[1]) {
            this.DrawSelection();
        }
        /*------------------this.selectionBox Stuff---------------------*/
        this.startSelect();
        if (mouseIsPressed && !overUI && !this.creatingNew && (mouseButton === CENTER || mouseButton === RIGHT)) {
            this.moveScreen();
        }
        if (!this.levelMode && lastWasPressed != Pressed && !mouseIsPressed && !overUI) {
            this.releaseSelectBox();
        }
        else if (Pressed && this.selectionBox[0] && !this.selectionBox[2]) {
            this.mouseDown();
        }
        //If switching scenes remove selected
        if (lastScene != engine.activeScene) {
            this.removeSelection();
        }
        lastScene = engine.activeScene;
        for (let uuid of selectedObjects) {
            let tempBox = engine.getfromUUID(uuid);
            if (tempBox) {
                tempBox?.customDraw?.();
            }
            else {
                selectedObjects.splice(uuid, 1);
            }
        }
        //Disallow selecting if Playing
        //if(Playing  && !Paused) this.selectionBox = [];
        if (selectedObjects.length != 0) {
            this.OpenEditMenu();
        }
        let newFile = Object.keys(engine.files);
        if (!newFile.equals(OldFiles) || forceBrowserUpdate) {
            forceBrowserUpdate = false;
            console.warn("added a file!/ changed");
            OldFiles = newFile;
            content.removeOldContent();
            readTypeAndName();
        }
        if (shouldUpdateLevels) {
            shouldUpdateLevels = false;
            this.updateLevels();
        }
        if (keyIsDown(17) && keyIsDown(86)) {
            this.pasteObjects();
        }
        else {
            this.pasted = false;
        }
    }
    mouseCoords() {
        return createVector(round(engine.mouseScreen().x), round(engine.mouseScreen().y));
    }
    transformCoordinates(drawSelect) {
        const [x1, y1] = drawSelect[0];
        const [x2, y2] = drawSelect[1];
        const x = Math.min(x1, x2);
        const y = Math.min(y1, y2);
        const width = Math.abs(x2 - x1);
        const height = Math.abs(y2 - y1);
        return {
            x: x, y: y, width: width, height: height,
            getCollisionType: () => { return 'Rect'; },
            getCollisionVectors: () => {
                return [{ x: x, y: y }, { x: width, y: height }];
            }
        };
    }
    mouseDown(selection = this.selectionBox, creatingNew = this.creatingNew) {
        if (!selection[0])
            return;
        selection[1] = this.mouseCoords().array();
        let drawSelect = selection;
        let rect1 = this.transformCoordinates(drawSelect);
        if (!rect1)
            return;
        if (creatingNew) {
            return this.newObject = rect1;
        }
        selectedObjects = [];
        this.tryOffset = {};
        for (let tempBox of engine.getActiveScene().boxes) {
            if (tempBox.collision) {
                let c = tempBox.collision(rect1, false);
                if (c) {
                    selectedObjects.push(tempBox.uuid);
                    //console.log(t_box.uuid);
                }
                tempBox.clr = c * 50;
                //console.log(c);
            }
        }
        if (selectedObjects.length === 0) {
            this.removeSelection();
            info = [];
        }
    }
    onResize() {
        sideMenu.position(windowWidth - 300, 0);
    }
    releaseSelectBox() {
        if (this.creatingNew) {
            let objClass = classes[addSelect.value()];
            if (this.newObject.width || this.newObject.height) {
                let classParameters = [];
                if (!this.newObject.width) {
                    this.newObject.width = 1;
                }
                else if (!this.newObject.height) {
                    this.newObject.height = 1;
                }
                if (this.selectionBox[0] && this.selectionBox[1]) {
                    this.newObject.radius = round(dist(this.selectionBox[0][0], this.selectionBox[0][1], this.selectionBox[1][0], this.selectionBox[1][1]));
                    if (this.isCircle) {
                        this.newObject.x = this.startPos.x;
                        this.newObject.y = this.startPos.y;
                    }
                    for (let param of objClass.prototype.getValuesName()) {
                        let resp = this.newObject[param];
                        if (resp === undefined) {
                            let paramResp = param !== "noMenu" ? prompt(param) : ' ';
                            classParameters.push(parseStringNum(paramResp));
                        }
                        else {
                            classParameters.push(parseStringNum(resp));
                        }
                    }
                    let obj = new objClass(...classParameters);
                    obj.init();
                    engine.getActiveScene().boxes.push(obj);
                    selectedObjects.push(obj.uuid);
                    obj.clr = 50;
                    this.updateLevels();
                }
            }
            else {
                this.mouseDown([this.mouseCoords().array()], false);
                this.creatingNew = false;
            }
        }
        this.selectionBox = [];
    }
    copyObject() {
        for (let _ = selectedObjects.length; _ >= 0; _--) {
            let objs = selectedObjects[_];
            if (!engine.getfromUUID(objs)) {
                selectedObjects.splice(_, 1);
            }
        }
        this.copiedObjs = [];
        for (let objId of selectedObjects) {
            let copiedObj = {
                vals: engine.getfromUUID(objId).getValues(),
                type: engine.getfromUUID(objId).typeId,
                components: engine.getfromUUID(objId).jsonComponents()
            };
            this.copiedObjs.push(copiedObj);
        }
    }
    uiElement(element) {
        element.mouseOver(() => overUI = true);
        element.mouseOut(() => overUI = false);
    }
    saveMap() {
        let jsMap = createWriter('map.json');
        jsMap.write(MapJson());
        jsMap.close();
    }
    deleteInfoDivs() {
        // Remove existing infoDivs
        for (let t_info of infoDivs) {
            t_info.remove();
        }
    }
    levelScreen() {
        this.levelMode = !this.levelMode;
        this.deleteInfoDivs();
        if (this.levelMode) {
            const activeScene = engine.getActiveScene();
            const levelValues = activeScene.getLevelValues();
            const levelValueNames = activeScene.getLevelValueNames();
            const actualLevelValues = activeScene.getActualLevelValues();
            for (let i = 0; i < levelValues.length; i++) {
                addMenuInput(levelValueNames[i], (val) => {
                    const actValue = parseStringNum(val, activeScene[actualLevelValues[i]]);
                    activeScene[actualLevelValues[i]] = actValue;
                    levelValues[i] = actValue;
                }, () => levelValues[i]);
            }
            addMenuInput("Grid Size", (value) => {
                this.gridSize = parseStringNum(value, this.gridSize, true);
            }, () => {
                return this.gridSize;
            });
        }
        else {
            this.forceMenuUpdate = true;
        }
    }
    pasteObjects() {
        if (this.pasted || overUI) {
            return;
        }
        let firstObjPos;
        for (let copiedObj of this.copiedObjs) {
            if (copiedObj.type === '' || copiedObj.type === undefined) {
                console.warn('Empty type means not copyable');
                continue;
            }
            let _obj = addObj(copiedObj.type, copiedObj.vals);
            for (let component of copiedObj.components) {
                let componentClass = engine.componentList[component.name];
                _obj.components.push(new componentClass({ ...component.params, obj: _obj }));
            }
            engine.addObj(_obj);
            _obj.clr = 50;
            let offsetPosX = this.mouseCoords().x;
            let offsetPosY = this.mouseCoords().y;
            if (!firstObjPos) {
                firstObjPos = [_obj.x, _obj.y];
            }
            else {
                offsetPosX -= firstObjPos[0] - _obj.x;
                offsetPosY -= firstObjPos[1] - _obj.y;
            }
            _obj.offSet(offsetPosX, offsetPosY);
            _obj.typeId = copiedObj.type;
            selectedObjects.push(_obj.uuid);
        }
        this.pasted = true;
    }
    removeMapObject() {
        for (let selectedId in selectedObjects) {
            let objId = selectedObjects[selectedId];
            removeObject(objId);
            delete selectedObjects[selectedId];
        }
        //filter empty
        engine.getActiveScene().boxes = getCurrentBoxes().filter((_) => {
            return _;
        });
        selectedObjects = selectedObjects.filter((_) => {
            return _;
        });
        this.deleteInfoDivs();
    }
    onSetup() {
        canvas.ondragover = (event) => {
            event.preventDefault();
        };
        canvas.ondrop = (event) => {
            event.preventDefault();
            if (event.dataTransfer.files[0].type === 'application/json') {
                event.dataTransfer.files[0].text().then((data) => {
                    JsonMap({ data: data });
                    engine.cameraPos = editor.cameraPos;
                });
            }
        };
        button = this.fromReference("playButton");
        //this.uiElement(button);
        Engine.removeListeners.push((obj) => {
            shouldUpdateLevels = true;
        });
        this.fromReference("leftHolder");
        let bottomDiv = this.fromReference("bottomDiv");
        bottomDiv.elt.ondrop = (event) => {
            this.makeFile(event);
        };
        bottomDiv.elt.ondragover = (event) => {
            event.preventDefault();
        };
        inputFile = createFileInput((file) => {
            forceBrowserUpdate = true;
            forceMenuUpdate = true;
            shouldUpdateLevels = true;
            JsonMap(file);
            engine.cameraPos = editor.cameraPos;
        });
        //Fixes some cross platform bugs
        inputFile.elt.accept = ".js,.json";
        inputFile.style("display: none");
        visibleInputFile = this.fromReference("loadFile");
        visibleInputFile.mouseClicked((e) => {
            inputFile.elt.click(e);
        });
        this.uiElement(visibleInputFile);
        addButton = this.fromReference("addButton");
        addButton.mousePressed(() => {
            this.creatingNew = !this.creatingNew;
        });
        addSelect = this.fromReference("addSelect");
        Object.keys(classes).forEach(element => {
            addSelect.option(element);
        });
        saveButton = this.fromReference("saveFile");
        saveButton.mousePressed(this.saveMap);
        this.uiElement(saveButton);
        exampleButton = this.fromReference("newButton");
        exampleButton.mousePressed(() => {
            let emptyExample = {};
            emptyExample["0"] = [[0, 100, 100, 500, 50]];
            emptyExample["0l"] = [0, 400, -10, 500];
            engine = new Engine();
            ScenesfromObject(emptyExample);
            for (let func of Engine.removeListeners) {
                if (typeof func === 'function') {
                    func();
                }
            }
            this.releaseSelectBox();
            engine.cameraPos = this.cameraPos;
        });
        refreshButton = this.fromReference("refreshButton");
        refreshButton.mousePressed(() => {
            let file = { data: MapJson() };
            forceBrowserUpdate = true;
            forceMenuUpdate = true;
            shouldUpdateLevels = true;
            JsonMap(file);
            engine.cameraPos = this.cameraPos;
        });
        sideMenu = createDiv();
        sideMenu.size(300);
        sideMenu.style("max-height:calc(100vh - 20px);overflow:auto;height:fit-content;background-color: rgba(0, 0, 0, 0.25);");
        //sideMenu.size(300, 200);
        sideMenu.position(windowWidth - sideMenu.size().width, 0);
        sideMenu.id('sideMenu');
        this.uiElement(sideMenu);
        let holdAll = document.getElementById("bottomDiv");
        ContentBrowserPanel.Holder = createDiv();
        ContentBrowserPanel.Holder.parent(holdAll);
        ContentBrowserPanel.Main = createDiv();
        ContentBrowserPanel.Main.parent(ContentBrowserPanel.Holder);
        let _ = createDiv();
        let cntentBtn = createDiv('ContentBrowserPanel');
        cntentBtn.parent(_);
        let select = createSelect();
        select.parent(_);
        let newList = ['.js', '.img'];
        for (let name of newList) {
            select.option(name);
        }
        let addFilebtn = createButton('add');
        addFilebtn.style('cursor:pointer');
        addFilebtn.mousePressed(() => {
            let file = addGameFile('', select.value().toString(), {});
            content.changeName(file);
        });
        addFilebtn.parent(_);
        cntentBtn.mousePressed(showBrowserPanel.bind(this));
        cntentBtn.style("cursor: pointer; width: fit-content;");
        //_.class("accordion-content");
        _.parent(ContentBrowserPanel.Main);
        ContentBrowserPanel.HUD = createDiv();
        ContentBrowserPanel.HUD.parent(ContentBrowserPanel.Main);
        //ContentBrowserPanel.Holder.size(windowWidth,windowHeight/4);
        ContentBrowserPanel.Holder.class('contentBrowser');
        ContentBrowserPanel.HUD.style('display: flex; align-items: center; flex-flow: row wrap; place-content: stretch space-around;     justify-content: flex-start; align-content: center; flex-direction: row; flex-wrap: wrap;');
        ContentBrowserPanel.Main.class("accordion-content");
        ContentBrowserPanel.Main.elt.style.maxHeight = "100%";
        ContentBrowserPanel.Main.maxHeight = '';
        /*display: flex;
        align-items: flex-start;
        // justify-items: stretch;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: stretch;*/
        ContentBrowserPanel.Main.style("position:relative;background-color: rgba(0, 0, 0, 0.25);overflow:auto;");
        //ContentBrowserPanel.Holder.position(0,windowHeight-windowHeight/4);
        this.uiElement(ContentBrowserPanel.Main);
        actionButtons = createDiv();
        actionButtons.id('actionMenu');
        actionButtons.parent('sideMenu');
        copyButton = createButton('Copy').class('allButtons');
        copyButton.mousePressed(this.copyObject.bind(this));
        copyButton.parent('actionMenu');
        this.uiElement(copyButton);
        removeButton = createButton('Remove').class('allButtons');
        removeButton.mousePressed(this.removeMapObject.bind(this));
        removeButton.parent('actionMenu');
        this.uiElement(removeButton);
        levelButton = createButton('Level').class('allButtons');
        levelButton.mousePressed(this.levelScreen.bind(this));
        levelButton.parent('actionMenu');
        this.uiElement(levelButton);
        button.mousePressed(() => {
            if (this.playingWindow && !this.playingWindow.closed) {
                //console.log(editorWindow);
                this.playingWindow.editorData = MapJson();
                this.playingWindow.doReload();
            }
            else {
                this.playingWindow = window.open("editor.html");
                this.playingWindow.editorData = MapJson();
            }
        });
        lastScene = engine.activeScene;
        this.cameraPos = createVector(0, 0);
    }
    readFileAsDataURL(file) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result.toString());
            reader.readAsDataURL(file);
        });
    }
    async makeFile(event) {
        event.preventDefault();
        let dragFile = event.dataTransfer.files[0];
        let newName = dragFile.name.split(".");
        newName.pop();
        newName = newName.join(".");
        let data;
        if (dragFile.type === "text/javascript") {
            data = await dragFile.text();
        }
        else if (dragFile.type.startsWith("image")) {
            data = await this.readFileAsDataURL(dragFile);
        }
        else {
            return;
        }
        let file = addGameFile(data, dragFile.type === "text/javascript" ? ".js" : ".img");
        content.changeName(file, newName);
        return file;
    }
    OpenEditMenu() {
        //remove any non removed objs
        lastInfo = info;
        info = [];
        let lastIndexes = infoIndexes;
        infoIndexes = [];
        for (let objectId of selectedObjects) {
            let tempBox = engine.getfromUUID(objectId);
            infoIndexes.push(objectId);
            if (tempBox) {
                for (let t_val_id in tempBox.getValues()) {
                    info.push(objectId);
                    info.push(tempBox.getValuesName()[t_val_id]);
                    info.push(tempBox.getValues()[t_val_id]);
                    info.push(tempBox.getActualValuesName()[t_val_id]);
                }
                if (tempBox.components) {
                    for (let componentId in tempBox.components) {
                        let components = tempBox.components[componentId];
                        info.push(objectId);
                        info.push("component");
                        info.push(componentId);
                        info.push(components.shouldUpdateMenu);
                    }
                }
                info.push(objectId);
                info.push("CustomButton");
                info.push(0);
                info.push(0);
            }
        }
        if ((lastInfo.length !== info.length)) {
            //console.log(lastInfo.length - info.length, lastIndexes.length - infoIndexes.length);
        }
        if (info.equals(lastInfo) && !forceMenuUpdate) {
            return;
        }
        let newInfo = lastInfo.length !== info.length;
        let noNewObjects = lastIndexes.equals(infoIndexes);
        if (!newInfo && noNewObjects && !forceMenuUpdate) {
            //edit existing values
            for (let t_info of infoDivs) {
                t_info.elt.dispatchEvent(this.valChanged);
                //Hacky solution to fix updating dom every time
                /*if (infoI < info.length)
                    t_info.child()[1].value = info[infoI + 2].toString();*/
            }
            return;
        }
        forceMenuUpdate = false;
        for (let t_info of infoDivs) {
            t_info.remove();
            infoDivs = [];
        }
        console.table(info);
        for (let i = 0; i < info.length; i += 4) {
            //console.log(info[i]);
            if (info[i + 1] === "noMenu" || info[i + 1] === "component" || info[i + 1] === "CustomButton") {
                //console.log("works");
                if (info[i + 1] === "noMenu") { // if (boxes[info[i]].components[info[i + 2]]) {
                    //     boxes[info[i]].components[info[i + 2]].MenuEdit('sideMenu');
                    // }
                }
                else if (info[i + 1] === "component") {
                    if (engine.getfromUUID(info[i]).components[info[i + 2]]) {
                        engine.getfromUUID(info[i]).components[info[i + 2]].MenuEdit('sideMenu');
                    }
                }
                else {
                    let divHolder = createDiv();
                    let ComponentSelect = createSelect();
                    for (const [key, value] of Object.entries(engine.componentList)) {
                        if (key !== "gameFile")
                            ComponentSelect.option(key);
                    }
                    ComponentSelect.style('cursor: pointer;');
                    ComponentSelect.parent(divHolder);
                    let addButton = createButton("Add");
                    divHolder.elt.ondrop = (event) => {
                        //console.log(event);
                        console.warn(event.dataTransfer.getData("UUID"));
                        if (event.dataTransfer.files.length > 0) {
                            this.makeFile(event).then((file) => {
                                let className = Engine.fileTypeList[file.type];
                                engine.getfromUUID(info[i]).components.push(new engine.componentList[className]({
                                    obj: engine.getfromUUID(info[i]),
                                    fileUUID: file.UUID
                                }));
                            });
                        }
                        else {
                            let uuid = event.dataTransfer.getData("UUID");
                            let file = engine.files[uuid];
                            let className = Engine.fileTypeList[file.type];
                            console.log(className);
                            engine.getfromUUID(info[i]).components.push(new engine.componentList[className]({
                                obj: engine.getfromUUID(info[i]),
                                fileUUID: uuid
                            }));
                            console.warn(file);
                        }
                    };
                    divHolder.elt.ondragover = (event) => {
                        event.preventDefault();
                        window.mouseReleased = () => { };
                        //console.warn(event.dataTransfer.getData("UUID"));
                    };
                    addButton.mousePressed(() => {
                        engine.getfromUUID(info[i]).components.push(new engine.componentList[ComponentSelect.value()]({
                            obj: engine.getfromUUID(info[i])
                        }));
                    });
                    addButton.parent(divHolder);
                    addButton.style('cursor: pointer;');
                    divHolder.parent('sideMenu');
                    infoDivs.push(divHolder);
                }
            }
            else {
                addMenuInput(info[i + 1], (val) => {
                    let actValue = parseStringNum(val);
                    engine.getfromUUID(info[i])[info[i + 3]] = actValue;
                    engine.getfromUUID(info[i])?.updateShape?.();
                    engine.getfromUUID(info[i])?.updatePosition?.();
                    info[i + 2] = actValue;
                }, () => info[i + 2]);
            }
        }
    }
}
//Accordion menu, menu edit, script edit, image edit
//Don't touch could break everything
function accordionMenu(headerText, inputField, name, Opened = { value: false }) {
    let isExpanded = Opened.value;
    let byOpened = Opened.value;
    headerText.style("cursor: pointer");
    let UpdateExpansion = () => {
        if (isExpanded) {
            headerText.html("▼" + name);
            inputField.show();
            if (!byOpened) {
                inputField.style("max-height", inputField.elt.scrollHeight + "px");
                setTimeout(() => {
                    Opened.value = true;
                    inputField.style('max-height', 'none');
                }, 400);
            }
            inputField.style('margin-left', '1em');
        }
        else {
            headerText.html("►" + name);
            inputField.style("max-height", "0px");
            inputField.hide();
            setTimeout(() => {
                Opened.value = false;
                inputField.hide();
            }, 200);
        }
    };
    if (isExpanded) {
        inputField.style('max-height', 'none');
    }
    else {
        inputField.hide();
    }
    UpdateExpansion();
    byOpened = false;
    headerText.mousePressed(() => {
        isExpanded = !isExpanded;
        UpdateExpansion();
    });
    return inputField;
}
//UtilFunc
function addEditableScript(name, set, get, parentName = "sideMenu", additionalDiv = [], replaceButton = false, opener) {
    let divHolder = createDiv();
    let headerText = createSpan("Script Component").parent(divHolder);
    let _get = get;
    let inputField = createDiv();
    inputField.child(...additionalDiv);
    let inp;
    if (replaceButton) {
        inp = replaceButton;
    }
    else {
        let _span = createSpan(name + ": ").parent(inputField);
        inp = createButton("Script").parent(inputField);
    }
    inp.mousePressed(() => {
        var popupWindow = window.open("popup.html", "Popup Window", "width=400,height=300");
        window.scriptData = function () {
            return _get().toString();
        };
        window.receivePopupText = (text) => {
            console.log(text);
            set(text);
            _get = () => text;
        };
    });
    inp.size(177, 'fit-content');
    accordionMenu(headerText, inputField, "Script Component", opener);
    infoDivs.push(divHolder);
    infoDivs[infoDivs.length - 1].parent(parentName);
    inputField.parent(divHolder);
    return [inputField, divHolder];
}
//UtilFunc
function addEditableSprite(name, set, get, parentName = "sideMenu", additionalDivs = [], replaceButton = false, opener) {
    let divHolder = createDiv();
    let headerText = createSpan("Sprite Component").parent(divHolder);
    let _get = get;
    let inputField = createDiv();
    inputField.child(...additionalDivs);
    let inp;
    if (replaceButton) {
        inp = replaceButton;
    }
    else {
        let _span = createSpan(name + ": ").parent(inputField);
        inp = createButton("Sprite").parent(inputField);
    }
    accordionMenu(headerText, inputField, "Sprite Component", opener);
    inp.mousePressed(() => {
        let popup = window.open('imagePopup.html', '_blank', 'width=400,height=400');
        popup._ImageData = () => {
            return _get();
        };
        console.log(_get);
        window.jsonImage = (text) => {
            console.log(text);
            let val = set(text);
            _get = () => { val; };
        };
    });
    inp.size(177, 'fit-content');
    let infoId = infoDivs.push(divHolder);
    infoDivs[infoId - 1].parent(parentName);
    inputField.parent(divHolder);
    return [inputField, divHolder];
}
//UtilFunc
function addMenuInput(name, set, get, par = 'sideMenu') {
    const divHolder = createDiv().html('');
    const _span = createSpan(name + ': ').parent(divHolder);
    let inp;
    const valueType = typeof get();
    switch (valueType) {
        case 'number':
            inp = createInput(get().toString()).style('opacity: 0.5;');
            inp.parent(divHolder).input(() => {
                const ogVal = get();
                const parsed = parseStringNum(inp.value(), ogVal);
                console.log(parsed);
                let newVal = parsed;
                set(newVal);
            });
            divHolder.elt.addEventListener('ValueChanged', () => {
                inp.value(get());
            });
            break;
        case 'string':
            inp = createInput(get()).style('opacity: 0.5;');
            inp.parent(divHolder).input(() => {
                set(inp.value());
            });
            divHolder.elt.addEventListener('ValueChanged', () => {
                inp.value(get());
            });
            break;
        case 'boolean':
            _span.remove();
            inp = createCheckbox(name, get());
            inp.parent(divHolder).changed(() => {
                set(inp.checked());
            });
            divHolder.elt.addEventListener('ValueChanged', () => {
                inp.checked(get());
            });
            break;
        default:
            console.error(valueType, "isn't a supported editable value");
            _span.remove();
            break;
    }
    if (inp) {
        infoDivs.push(divHolder);
        infoDivs[infoDivs.length - 1].parent(par);
    }
}
var classes = {
    Box: Box,
    Text: TextObject,
    Platform: movingPlatform,
    End: End,
    Enemy: Enemy,
    Interact: Interactive
};