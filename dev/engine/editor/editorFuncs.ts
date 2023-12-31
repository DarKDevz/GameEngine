var editor: Editor;
var lastWasPressed: any = false,
    overUI = false,
    Pressed = lastWasPressed,
    button = null,
    exampleButton: any = null,
    refreshButton = null,
    addButton = null,
    selectedObjects = [],
    lastScene = null,
    inputFile = null,
    visibleInputFile = null,
    saveButton = null,
    copyButton = null,
    removeButton = null,
    levelButton = null,
    gridSize = 1,
    lastUsedMouse = { x: false, y: false },
    mouseDiff = { x: 0, y: 0 },
    actionButtons = null,
    sideMenu = null,
    boxInfo = null,
    info = {},
    lastInfo = {},
    infoDivs = [],
    infoDivsHolder = [],
    infoIndexes = [],
    addSelect = null,
    id = null,
    openerState = {},
    sceneHolder = [],
    ContentBrowserPanel: any = {
        set files(value) { engine.files = value },
        get files() { return engine.files },
        Divs: [],
    },
    OldFiles = [];
class Editor3D extends BaseEditor {
    constructor() {
        super()
        this.rover = createRoverCam();
        this.rover.setState({           // optional
            position: [0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0)],
            rotation: [-PI / 2, 0, 0],
            sensitivity: 0.03,
            speed: 1.5
        });
        this.rover.controller = this.controller.bind(this.rover);
        this.rover.keyMap.y1 = [37, 37];
        this.rover.keyMap.p1 = [38, 38];
        this.rover.keyMap.y2 = [39, 39];
        this.rover.keyMap.p2 = [40, 40];
        this.rover.keyMap.d1 = [68, 68];
        this.rover.keyMap.a1 = [65, 65];
        this.select2D = [];
        this.newObject = {};
        this.test = new Gizmo(createVector(5,5,5));
    }
    controller() {
        if (this.enableControl && document.activeElement === document.body) {
            var t = this.keyMap
                , i = this.p5;
            let test = (keyName) => { return i.keyIsDown(t[keyName][0]) || i.keyIsDown(t[keyName][1]) }
            test('my1') && this.moveY(this.speed),
                test('my2') && this.moveY(-this.speed),
                test('e1') && this.elevate(-this.speed),
                test('e2') && this.elevate(this.speed),
                (test('y1') && this.yaw(-this.sensitivity),
                    test('y2') && this.yaw(this.sensitivity),
                    test('p1') && this.pitch(-this.sensitivity),
                    test('p2') && this.pitch(this.sensitivity)),
                test('mx1') && this.moveX(this.speed),
                test('mx2') && this.moveX(-this.speed),
                test('mz1') && this.moveZ(this.speed),
                test('mz2') && this.moveZ(-this.speed),
                test('f1') && this.fov(-this.sensitivity / 10),
                test('f2') && this.fov(this.sensitivity / 10),
                test('d1') && this.moveY(-this.speed),
                test('a1') && this.moveY(this.speed);
        }
    }
    calculateMousePosition() {
        let cam = _renderer._curCamera;
        let normX = mouseX / width;
        let normY = mouseY / height;
        let ndcX = (mouseX - width / 2) / width * 2;
        let ndcY = (mouseY - height / 2) / height * 2;
        let ndcZ = 1;
        let ndc = new DOMPoint(ndcX, -ndcY, ndcZ);
        let p = _renderer.uPMatrix.mat4;
        let projectionMatrix = new DOMMatrix([...p]);
        let camV = projectionMatrix.inverse().transformPoint(ndc);
        let w = camV.w;
        let m = _renderer.uMVMatrix.mat4;
        let modelViewMatrix = new DOMMatrix([...m]);
        let world = modelViewMatrix.inverse().transformPoint(camV);
        let world2 = [world.x / w, world.y / w, world.z / w];
        let phi = atan2(world2[1] - cam.eyeY, Math.hypot(world2[0] - cam.eyeX, world2[2] - cam.eyeZ));
        let th = -atan2(world2[0] - cam.eyeX, world2[2] - cam.eyeZ) + PI / 2;
        let dRay = -cam.eyeZ / (cos(phi) * sin(th));
        let projectedToZ = [
            cam.eyeX + dRay * cos(phi) * cos(th),
            cam.eyeY + dRay * sin(phi),
            dRay
        ];
        let ray = {
            x: cos(phi) * cos(th),
            y: sin(phi),
            z: cos(phi) * sin(th)
        }
        return [ray, projectedToZ];
    }
    onUpdate() {
        if (keyIsDown(16) && mouseIsPressed && !overUI) {
            if (!keyIsDown(18)) selectedObjects = [];
            let Info = this.calculateMousePosition();
            let Ball = {}
            Ball.getCollisionType = () => {
                return 'Circle'
            }
            Ball.getCollisionVectors = () => {
                return [{ x: Info[1][0], y: Info[1][1] }, 2];
            }
            for (let obj of engine.activeScene.boxes) {
                if (obj.collision && !obj.is3D) {
                    //Change to use collision types
                    let c = obj.collision(Ball, false) && Info[1][2] > 0;
                    if (c) {
                        selectedObjects.push(obj.uuid);
                    }
                    if (!keyIsDown(18) || c) { obj.clr = Number(c) * 50 }
                    //console.log(c);
                } else if (obj.collision) {
                    //TODO: 3D Shapes
                }
            }
            if (selectedObjects.length == 0) {
                editor.removeSelection()
                info = [];
                this.select2D = []
            }
        } else if (mouseIsPressed && !overUI && this.creatingNew) {
            let data = this.calculateMousePosition();
            if (this.select2D.length !== 2) {
                this.select2D.push(data);
            } else {
                this.select2D[1] = data;
            }
        }
        if (!mouseIsPressed && lastWasPressed && this.creatingNew) {
            if (this.select2D.length == 2) {
                let objClass = classes[addSelect.value()];
                let classParameters = [];
                this.newObject = {};
                this.newObject.x = min(this.select2D[0][1][0], this.select2D[1][1][0])
                this.newObject.y = min(this.select2D[0][1][1], this.select2D[1][1][1])
                this.newObject.width = max(this.select2D[0][1][0], this.select2D[1][1][0])
                this.newObject.height = max(this.select2D[0][1][1], this.select2D[1][1][1])
                this.newObject.width -= this.newObject.x;
                this.newObject.height -= this.newObject.y;
                if (this.newObject.width < 1) {
                    this.newObject.width = 1;
                }
                if (this.newObject.height < 1) {
                    this.newObject.height = 1;
                }
                this.newObject.radius = dist(this.select2D[0][1][0], this.select2D[0][1][1], this.select2D[1][1][0], this.select2D[1][1][1]);
                if (this.isCircle) {
                    this.newObject.x = this.select2D[0][1][0]
                    this.newObject.y = this.select2D[1][1][0];
                }
                if (this.newObject.width !== 1 && this.newObject.height !== 1) {
                    for (let param of objClass.prototype.parameterNames()) {
                        let resp = this.newObject[param];
                        if (resp === undefined) {
                            let paramResp = param !== "noMenu" ? prompt(param) : ' ';
                            classParameters.push(parseStringNum(paramResp));
                        } else {
                            classParameters.push(parseStringNum(resp));
                        }
                    }
                    let obj = new objClass(...classParameters)
                    obj.init();
                    engine.getActiveScene().boxes.push(obj);
                    selectedObjects.push(obj.uuid);
                    obj.clr = 50;
                    editor.updateLevels();
                } else {
                    this.creatingNew = false;
                }
            }
            this.select2D = [];
        }
        this.test.draw()
        if(mouseIsPressed && !overUI) {
            this.test.check(this.calculateMousePosition());
        }else {
            this.test.released()
        }
    }
    setCameraPos(box: GameObject) {
        //
    }
    setSelection(newArr: any[]) {
        selectedObjects = newArr;
    }
    onSetup(): void {
        super.onSetup();
    }
}
class Editor2D extends BaseEditor {
    constructor() {
        super()
        this.selectionBox = [];
        this.isCircle = false;
    }
    onSetup(): void {
        super.onSetup();
    }
    startSelect() {
        if (lastWasPressed !== 'startedOverUi' && lastWasPressed != Pressed && Pressed && mouseButton === LEFT) {
            this.selectionBox.push(this.mouseCoords().array());
            this.startPos = this.mouseCoords();
        }
    }
    moveScreen() {
        let diffX = (mouseX - pmouseX) / engine.camera.zoom
        let diffY = (mouseY - pmouseY) / engine.camera.zoom
        mouseDiff = { x: diffX, y: diffY };
        if (selectedObjects.length !== 0) {
            this.moveObjects(mouseDiff);
        } else {
            this.cameraPos.x -= diffX;
            this.cameraPos.y -= diffY;
            engine.camera.target = this.cameraPos;
        }
    }
    moveObjects(frameDiff: xyObject) {
        for (let uuid of selectedObjects) {
            let tempBox = engine.getfromUUID(uuid);
            if (tempBox) {
                tempBox.customDraw();
                let diff = {
                    x: frameDiff.x,
                    y: frameDiff.y
                };
                if (this.tryOffset[uuid]) {
                    diff.x += this.tryOffset[uuid].x
                    diff.y += this.tryOffset[uuid].y
                }
                let newPos = {
                    x: Math.round(tempBox.x / this.gridSize) * this.gridSize,
                    y: Math.round(tempBox.y / this.gridSize) * this.gridSize
                }
                let remainder = { x: diff.x % this.gridSize, y: diff.y % this.gridSize }
                this.tryOffset[uuid] = remainder;
                let newDiff = { x: diff.x - remainder.x, y: diff.y - remainder.y };
                newPos.x += newDiff.x
                newPos.y += newDiff.y
                tempBox.offSet(newPos.x, newPos.y, newDiff.x, newDiff.y);
            } else {
                selectedObjects.splice(uuid, 1);
            }
        }
    }
    setSelection(newArr: any[]) {
        selectedObjects = newArr;
    }
    setCameraPos(obj: xyObject) {
        this.cameraPos.x = obj.x;
        this.cameraPos.y = obj.y;
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
        rect(this.selectionBox[0][0], this.selectionBox[0][1],
            this.selectionBox[1][0] - this.selectionBox[0][0],
            this.selectionBox[1][1] - this.selectionBox[0][1]);
    }
    onUpdate() {
        if (this.selectionBox[1]) {
            this.DrawSelection()
        }
        /*------------------this.selectionBox Stuff---------------------*/
        this.startSelect()
        if (mouseIsPressed && !overUI && (mouseButton === CENTER || mouseButton === RIGHT)) {
            this.creatingNew = false;
            this.moveScreen()
        }
        if (Pressed && this.selectionBox[0] && !this.selectionBox[2]) {
            this.mouseDown();
        }
    }
    mouseCoords() {
        return createVector(round(engine.mouseScreen().x), round(engine.mouseScreen().y))
    }
    transformCoordinates(drawSelect): { [x: string]: any } {
        const [x1, y1] = drawSelect[0];
        const [x2, y2] = drawSelect[1];
        const x = Math.min(x1, x2);
        const y = Math.min(y1, y2);
        const width = Math.abs(x2 - x1);
        const height = Math.abs(y2 - y1);
        return {
            x: x, y: y, width: width, height: height,
            getCollisionType: () => { return 'Rect' },
            getCollisionVectors: () => {
                return [{ x: x, y: y }, { x: width, y: height }]
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
        this.tryOffset = {}
        let collisionRect: CollidableObject = {
            getCollisionType: () => { return 'Rect' },
            getCollisionVectors: () => { return [{ x: rect1.x, y: rect1.y }, { x: rect1.width, y: rect1.height }] }
        }
        for (let tempBox of engine.getActiveScene().boxes) {
            if (tempBox.collision) {
                //Change to use collision types
                let c = tempBox.collision(collisionRect, false) ? 1 : 0;
                if (c) {
                    selectedObjects.push(tempBox.uuid);
                    //console.log(t_box.uuid);
                }
                tempBox.clr = c * 50
                //console.log(c);
            }
        }
        if (selectedObjects.length === 0) {
            editor.removeSelection()
            info = [];
        }
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
                    for (let param of objClass.prototype.parameterNames()) {
                        let resp = this.newObject[param];
                        if (resp === undefined) {
                            let paramResp = param !== "noMenu" ? prompt(param) : ' ';
                            classParameters.push(parseStringNum(paramResp));
                        } else {
                            classParameters.push(parseStringNum(resp));
                        }
                    }
                    let obj = new objClass(...classParameters)
                    obj.init();
                    engine.getActiveScene().boxes.push(obj);
                    selectedObjects.push(obj.uuid);
                    obj.clr = 50;
                    editor.updateLevels();
                }
            } else {
                this.mouseDown([this.mouseCoords().array()], false);
                this.creatingNew = false;
            }
        }
        this.selectionBox = [];
    }
    copyObject() {
        for (let _ = selectedObjects.length; _ >= 0; _--) {
            let objs = selectedObjects[_]
            if (!engine.getfromUUID(objs)) {
                selectedObjects.splice(_, 1);
            }
        }
        this.copiedObjs = [];
        for (let objId of selectedObjects) {
            let copiedObj = {
                vals: engine.getfromUUID(objId).getParameters(),
                type: engine.getfromUUID(objId).typeId,
                components: engine.getfromUUID(objId).jsonComponents()
            }
            this.copiedObjs.push(copiedObj)
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
            } else {
                offsetPosX -= firstObjPos[0] - _obj.x;
                offsetPosY -= firstObjPos[1] - _obj.y;
            }
            _obj.offSet(offsetPosX, offsetPosY);
            _obj.typeId = copiedObj.type;
            selectedObjects.push(_obj.uuid);
        }
        this.pasted = true;
    }
}
class EditorManager {
    editor: BaseEditor;
    constructor() {
        this.editor;
        this.init();
    }
    init() {
        this.editor?.rover?.setActive?.(false)
        this.editor = engine.is3D ? new Editor3D() : new Editor2D();
    }
    get updates() {
        return this.editor.updates;
    }
    set updates(x) {
        this.editor.updates = x;
    }
    get levelMode() {
        return this.editor.levelMode;
    }
    set levelMode(value) {
        this.editor.levelMode = value;
    }
    get cameraPos() {
        return this.editor.cameraPos;
    }
    set cameraPos(value) {
        this.editor.cameraPos = value;
    }
    setCameraPos() {
        this.editor.setCameraPos(...arguments)
    }
    openSceneContext() {
        this.editor.openSceneContext(...arguments)
    }
    setSelection() {
        this.editor.setSelection(...arguments)
    }
    openBrowserContext() {
        this.editor.openBrowserContext(...arguments)
    }
    openContextMenu() {
        this.editor.openContextMenu(...arguments);
    }
    fromReference() {
        return this.editor.fromReference(...arguments)
    }
    onResize() {
        this.editor.onResize(...arguments);
    }
    levelScreen() {
        this.levelMode = !this.levelMode;
        this.editor.deleteInfoDivs()
        if (this.levelMode) {
            const activeScene = engine.getActiveScene();
            const levelValues = activeScene.getLevelValues();
            const levelValueNames = activeScene.getLevelValueNames();
            const actualLevelValues = activeScene.getActualLevelValues();
            for (let i = 0; i < levelValues.length; i++) {
                addMenuInput(
                    levelValueNames[i],
                    (val: any) => {
                        const actValue = parseStringNum(val, activeScene[actualLevelValues[i]]);
                        activeScene[actualLevelValues[i]] = actValue;
                        levelValues[i] = actValue;
                    },
                    () => levelValues[i]
                );
            }
            addMenuInput(
                "Grid Size",
                (value: any) => {
                    this.editor.gridSize = parseStringNum(value, this.editor.gridSize, true);
                },
                () => {
                    return this.editor.gridSize
                }
            );
        } else {
            this.removeSelection();
            info = [];
        }
    }
    pressedLevelMode() {
        let coords = createVector(mouseX, mouseY);
        for (let UUID in engine.guiObjects) {
            let GUIElement = engine.guiObjects[UUID];
            if (GUIElement.collidesPoint(coords)) {
                selectedObjects = [UUID]
            }
        }
    }
    removeSelection() {
        selectedObjects = [];
        this.editor.tryOffset = {}
        for (let t_info of infoDivs) {
            t_info.remove();
        }
    }
    countChildren(obj, stack = 0) {
        let count = 0;
        if (stack > 20) {
            return 1;
        }
        for (let index in obj) {
            let i = obj[index]
            if (typeof i !== "object") {
                count++;
            } else {
                stack++;
                count += this.countChildren(i, stack);
            }
        }
        return count;
    }
    OpenEditMenu() {
        lastInfo = JSON.parse(JSON.stringify(info));
        info = {};
        let lastIndexes = infoIndexes;
        infoIndexes = [];
        for (let objectId of selectedObjects) {
            let tempBox = engine.getfromUUID(objectId);
            if (tempBox) {
                info[tempBox.uuid] = tempBox.getEditableArray();
                for (let index in new Array(this.countChildren(tempBox.getEditableArray()))) {
                    infoIndexes.push(objectId + "" + index);
                }
                if (tempBox.components) {
                    for (let componentId in tempBox.components) {
                        info[tempBox.uuid].push({ isComponent: true, componentId });
                        infoIndexes.push("" + objectId + "" + componentId);
                    }
                }
                if (!(tempBox?.noComponents)) {
                    info[tempBox.uuid].push({ addComponent: true });
                }
            }
        }
        let check = deepReadCheck(info, lastInfo);
        //Means same
        if (check > 0 && !editor.updates.menu) {
            return;
        }
        if (lastIndexes.length !== infoIndexes.length) {
            //More values than before
            //Force update
            editor.updates.menu = true;
        }
        //Means Different Values
        if (check === 0 && !editor.updates.menu) {
            for (let t_info of infoDivs) {
                t_info.elt.dispatchEvent(this.editor.valChanged);
                //Hacky solution to fix updating dom every time
                /*if (infoI < info.length)
                    t_info.child()[1].value = info[infoI + 2].toString();*/
            }
            return;
        }
        editor.updates.menu = false;
        for (let t_info of infoDivs) {
            t_info.remove();
            infoDivs = [];
        }
        console.table(info);
        for (let uuid in info) {
            let edit = info[uuid];
            for (let editable of edit) {
                if (editable?.isComponent) {
                    engine.getfromUUID(uuid)?.components[editable.componentId].MenuEdit?.('sideMenu')
                } else if (editable?.addComponent) {
                    let divHolder = createDiv();
                    let ComponentSelect = createSelect();
                    for (const [key, value] of Object.entries(engine.componentList)) {
                        if (value.prototype.isAddable)
                            ComponentSelect.option(key);
                    }
                    ComponentSelect.style('cursor: pointer;');
                    ComponentSelect.parent(divHolder);
                    let addButton = createButton("Add");
                    addButton.elt.title = "Add component";
                    divHolder.elt.ondrop = (event) => {
                        //console.log(event);
                        if (event.dataTransfer.getData("UUID") === "")
                            return;
                        console.warn(event.dataTransfer.getData("UUID"));
                        if (event.dataTransfer.files.length > 0) {
                            this.makeFile(event).then((file) => {
                                let className = Engine.fileTypeList[file.type];
                                let component = new engine.componentList[className]({
                                    obj: engine.getfromUUID(uuid),
                                    fileUUID: file.UUID
                                });
                                engine.getfromUUID(uuid).components.push(component);
                            });
                        }
                        else {
                            let fileUUID = event.dataTransfer.getData("UUID");
                            let file = engine.files[fileUUID];
                            let className = Engine.fileTypeList[file.type];
                            console.log(className);
                            let component = new engine.componentList[className]({
                                obj: engine.getfromUUID(uuid),
                                fileUUID: fileUUID
                            })
                            engine.getfromUUID(uuid).components.push(component);
                            console.warn(file);
                        }
                    };
                    divHolder.elt.ondragover = (event) => {
                        event.preventDefault();
                        //console.warn(event.dataTransfer.getData("UUID"));
                    };
                    addButton.mousePressed(() => {
                        let component = new engine.componentList[ComponentSelect.value()]({
                            obj: engine.getfromUUID(uuid)
                        });
                        engine.getfromUUID(uuid).components.push(component);
                    });
                    addButton.parent(divHolder);
                    addButton.style('cursor: pointer;');
                    divHolder.parent('sideMenu');
                    infoDivs.push(divHolder);
                } else {
                    this.useEditObj(editable, 'sideMenu', {});
                }
            }
        }
    }
    addNewEditObj(obj: any, parent = 'sideMenu', opened, onUpdate = () => { }) {
        let Holder;
        //console.log(obj)
        for (let i in obj) {
            //console.log(i, obj[i], typeof obj[i]);
            if (typeof obj[i] === "object") {
                let divHolder = createDiv().parent(parent);
                let headerText = createDiv();
                Holder = accordionMenu(headerText, createDiv(), i, opened);
                headerText.parent(divHolder);
                Holder.parent(divHolder);
                infoDivs.push(headerText);
                opened[i] ??= { value: false };
                this.addNewEditObj(obj[i], Holder, opened[i], onUpdate);
            } else {
                addMenuInput(obj[i], (_) => {
                    obj[i] = (parseStringNum(_));
                    onUpdate()
                    return obj[i]
                }
                    , () => {
                        return obj[i].get()
                    }
                    , parent)
                //console.log("final Object", obj[i]);
            }
        }
    }
    useEditObj(obj: EditableObject, parent = 'sideMenu', opened) {
        let Holder;
        if (typeof obj.value === "object") {
            let divHolder = createDiv().parent(parent);
            let headerText = createDiv();
            Holder = accordionMenu(headerText, createDiv(), "", opened);
            headerText.parent(divHolder);
            Holder.parent(divHolder);
            infoDivs.push(headerText);
            opened[""] ??= { value: false };
            this.addNewEditObj(obj.value, Holder, opened[""], () => { obj.set(obj.value) });
        } else {
            addMenuInput(obj.name, (_) => {
                obj.set(parseStringNum(_));
                return obj.get()
            }
                , () => {
                    return obj.get()
                }
                , parent)
            //console.log("final Object", obj[i]);
        }
    }
    onUpdate() {
        if (mouseIsPressed && overUI) {
            lastWasPressed = 'startedOverUi'
        }
        if (!overUI && lastWasPressed !== 'startedOverUi') {
            lastWasPressed = Pressed;
            Pressed = mouseIsPressed && !this.levelMode;
        }
        if (this.last3D !== engine.is3D) {
            this.init();
        }
        this.last3D = engine.is3D;
        this.editor.onUpdate();
        if (mouseIsPressed && lastWasPressed !== 'startedOverUI' && this.levelMode) {
            this.pressedLevelMode()
        }
        //If switching scenes remove selected
        if (lastScene != engine.currentScene) {
            this.removeSelection()
        }
        lastScene = engine.currentScene;

        for (let uuid of selectedObjects) {
            let tempBox = engine.getfromUUID(uuid);
            if (tempBox) {
                tempBox?.customDraw?.();
            } else {
                selectedObjects.splice(uuid, 1);
            }
        }
        //Disallow selecting if Playing
        //if(Playing  && !Paused) this.selectionBox = [];

        if (selectedObjects.length != 0) {
            this.OpenEditMenu()
        }
        let newFile = Object.keys(engine.files);
        if (!newFile.equals(OldFiles) || editor.updates.browser) {
            editor.updates.browser = false;
            console.warn("added a file!/ changed");
            OldFiles = newFile;
            content.removeOldContent()
            readTypeAndName()
        }
        if (editor.updates.level && engine?.scene?.length > 0) {
            editor.updates.level = false;
            this.updateLevels()
        }
        if (keyIsDown(17) && keyIsDown(86)) {
            this.editor.pasteObjects();
        } else {
            this.pasted = false;
        }
        if (!this.levelMode && lastWasPressed != Pressed && !mouseIsPressed && !overUI) {
            if (lastWasPressed === 'startedOverUi') {
                lastWasPressed = false;
            } else {
                this.editor.releaseSelectBox?.();
            }
        }
    }
    updateLevels() {
        let leftDiv = document.getElementById("leftDiv");
        for (let oldScene of sceneHolder) {
            oldScene.remove()
        }
        for (let scene of engine.scene) {
            scene.addSceneBtn(leftDiv, openerState);
        }
    }
    onSetup() {
        this.editor.onSetup();
        this.last3D = engine.is3D;
    }
}
class Gizmo {
    pos: Vec;
    select: any;
    constructor(pos) {
        this.pos = pos;
        this.select = [];
    }
    draw(){
    noStroke();
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    let thickness = 2.5;
    let len = 100;
    let side = 50;
    push();
    push();
    fill(255, 0, 0);
    rotateZ(-Math.PI / 2);
    translate(0, len / 2, 0);
    cylinder(thickness, len);
    translate(0, len / 2, 0);
    cone(5, 10);
    pop();
    push();
    fill(0, 255, 0);
    rotateZ(Math.PI);
    translate(0, len / 2, 0);
    cylinder(thickness, len);
    translate(0, len / 2, 0);
    cone(5, 10);
    pop();
    push();
    fill(0, 0, 255);
    rotateX(Math.PI / 2);
    translate(0, len / 2, 0);
    cylinder(thickness, len);
    translate(0, len / 2, 0);
    cone(5, 10);
    pop();
    pop();
    pop();
    push()
          translate(this.pos.x, this.pos.y, this.pos.z)
          rotateX(-PI/2)
          translate(side/2, -side/2, 0)
          fill(0, 255, 0)
          plane(side)
        pop()
        push()
          translate(this.pos.x, this.pos.y, this.pos.z)
          rotateY(PI/2)
          translate(-side/2, -side/2, 0)
          fill(255, 0, 0)
          plane(side)
        pop()
            push()
          translate(this.pos.x, this.pos.y, this.pos.z)
          rotateZ(PI/2)
          translate(-side/2, -side/2, 0)
          fill(0, 0, 255)
          plane(side)
        pop()
  }
    getRayProjected(rayPos,rayDir,axis) {
        let rayPosition = rayPos.copy()
        let length = this.pos[axis] - rayPosition[axis];
        length /= rayDir[axis];
        rayPosition.add(rayDir.copy().mult(length))
        return rayPosition
    }
    check(data) {
        this.select ??= [];
        let select = [];
        let isFirstSelect = !Boolean(this.select[0])
        if(!isFirstSelect) {
            select = [this.select[0]]  
        }
        let rayDirection = createVector(data[0].x,data[0].y,data[0].z);
        let cam = _renderer._curCamera;
        let rayPosition = createVector(cam.eyeX,cam.eyeY,cam.eyeZ);
        let prePos = rayPosition.copy()
        rayPosition = this.getRayProjected(prePos,rayDirection,"x")
        let isZSelect = (rayPosition.y>this.pos.y && rayPosition.y<this.pos.y+5 && rayPosition.z>this.pos.z && rayPosition.z<this.pos.z+100);
        let isYSelect = (rayPosition.y < this.pos.y && rayPosition.y > this.pos.y - 100 && rayPosition.z>this.pos.z && rayPosition.z<this.pos.z+5)
        if(isZSelect && isFirstSelect) {
            select = ['z'];
        }
        else if(isYSelect && isFirstSelect) {
            select = ['y'];
        }else if(rayPosition.z<this.pos.z+50&&rayPosition.z>this.pos.z&&rayPosition.y-this.pos.y>-50&&rayPosition.y<this.pos.y && select.length === 0) {
            select = ['zy']
        }
        if(select[0] === 'z' || select[0] === 'y' || select[0] === 'zy') {
            select.push(rayPosition.copy())
        }
        rayPosition = this.getRayProjected(prePos,rayDirection,"z")
        let IsXSelect = (rayPosition.y>this.pos.y && rayPosition.y<this.pos.y+5 && rayPosition.x>this.pos.x && rayPosition.x<this.pos.x+100);
        if(IsXSelect && isFirstSelect) {
            select = ['x']
        }else if(rayPosition.x<this.pos.x+50&&rayPosition.x>this.pos.x&&rayPosition.y-this.pos.y>-50&&rayPosition.y<this.pos.y && isFirstSelect) {
            select = ['xy']
        }
            if(select[0] === 'x' || select[0] === 'xy') {
            select.push(rayPosition.copy())
        }
        rayPosition = this.getRayProjected(prePos,rayDirection,"y")
    if(rayPosition.x<this.pos.x+10&&rayPosition.x>this.pos.x-10&&rayPosition.z<this.pos.z+10&&rayPosition.z>this.pos.z-10 && isFirstSelect) {
            select = ['xyz']
        }else if(rayPosition.x>this.pos.x&&rayPosition.x<this.pos.x+50&&rayPosition.z>this.pos.z&&rayPosition.z<this.pos.z+50 && isFirstSelect) {
        select = ["xz"]
        }
        if(select[0] === 'xz') {
            select.push(rayPosition.copy())
        }
        if(select[0] === 'xyz') {
        select.push(prePos.copy().add(rayDirection.copy().mult(this.pos.dist(prePos))))
        }
        let lastMove = select[1];
        if(this.select.length !== 0 ){
            if(this.select[0] === select[0]) {
            lastMove = this.select[1];
        }}
        this.select = select
        if(this.select.length !== 0) {
            switch (select[0].length) {
            case 1:
            this.pos[select[0]] += select[1].copy().sub(lastMove)[select[0]]
            break;
            default:
                    this.pos.add(select[1].copy().sub(lastMove))
            break;
            }
        }
      }
    released() {
        this.select = [];
    }
}