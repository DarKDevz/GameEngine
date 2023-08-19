declare var b2World: Box2D.Dynamics.b2World;
declare var player: Player
declare var b2Vec2: Box2D.Common.Math.b2Vec2;
declare var b2BodyDef: Box2D.Dynamics.b2BodyDef;
declare var b2FixtureDef: Box2D.Dynamics.b2FixtureDef
declare var b2Body: Box2D.Dynamics.b2Body
declare var b2PolygonShape: Box2D.Collision.Shapes.b2PolygonShape
declare var canvas: any
declare var MapData: { data: any }
declare var JSZip: any

type Vec = ReturnType<typeof createVector>
type Div = ReturnType<typeof createDiv>
type b2Shape = Box2D.Collision.Shapes.b2Shape
type b2Fixture = Box2D.Dynamics.b2Fixture;
interface Window {
    [x: string]: any
}
interface Array<T> {
    equals(arg0: Array<T>): boolean;
}
type SpecialFunc = {
    (...anything: any): any
    [x: string]: any;
}
interface Bullet {
    directionX: number;
    directionY: number;
    r: number;
    id: undefined;
    startDate: number;
    oldX: number;
    oldY: number;
    collidedId: { isCollidable: any; };
}
interface gameFile {
    customData: any;
    references: {
        name?: string
    };
    UUID: UUID;
    type: string;
    data: string;
    whoUses: {};
}
type UUID = string;
interface Player {
    pos: Vec;
    size: Vec;
    vel: Vec;
    old: Vec;
    dir: { [x: string]: any }
    cameraPos: xyObject;
    godMode: boolean;
    grounded: boolean;
    colliding: boolean;
    collidedId: UUID;
    groundedId: UUID;
    shootingDelay: number;
    lastShotTime: number;
    collisionType: string;
    savedX: number;
    skipNext: boolean;
    body: Box2D.Dynamics.b2Body;
}
interface Editor {
    levelMode: boolean;
    cameraPos: Vec;
    playingWindow: any;
    creatingNew: boolean;
    newObject: any;
    valChanged: Event;
    copiedObj: any[];
    selectionBox: any
    gridSize: number;
    pasted: boolean;
    startPos: any;
    isCircle: boolean;
    copiedObjs: any[];
    forceMenuUpdate: boolean;
    tryOffset: { [x: UUID]: xyObject }
}
interface GameObject extends GameEvents{
    x: number;
    y: number;
    z: number;
    clr?: any;
    isShootable?: number;
    health?: number;
    width: number;
    height: number;
    isCollidable: boolean;
    tag: string;
    scene: string;
    overrides: any;
    savedFuncs: any;
    newOverrides: any;
    uuid: string;
    sprites: gameSprite[]; // Replace 'any' with the specific sprite type if available
    shown: any;
    collisionType: string;
    imageInitialized: boolean;
    typeId: number | undefined,
    components: Component[]
    body: any
    init(): void
    getCollisionVectors(): any[]
    getValues(): any[]
    [x: string]: any;
}
interface Box extends GameObject {
    oldX: number;
    oldY: number;
    w: number;
    h: number;
    fixture: b2Fixture;
}
interface End extends Box { }
interface TextObject extends GameObject {
    loaded: boolean;
    t: string;
}
interface Sprite extends Component {

}
interface xyObject {
    x: number,
    y: number
}
interface xywhObject extends xyObject {
    width: number,
    height: number
}
interface GameEvents {
    entryPoints: string[];
}
interface Level {
    toJSON(): any;
    extrasJson(): any;
    componentsJson(): unknown;
    ind: any
    getLevelValues(): any[]
    getLevelValueNames(): unknown
    getActualLevelValues(): unknown
    maxPos: any
    pos: Vec
    loadLevel(): void
    keyPress(arg0: Event): undefined,
    earlyUpdate(arg0: boolean): void,
    display(arg0: boolean): void,
    lateUpdate(arg0: boolean): void,
    boxes: GameObject[]
}
interface Component {
    shouldUpdateMenu: boolean;
    componentName: string;
    ownObject: GameObject;
    fileType: string;
    [x: string]: any
    new(...arg0: any): Component
}
interface gameScript extends Component {
    fileType: string;
    vals: { shown: any; editableVals: {}; };
    id: any;
    overrides: any;
    newOverrides: any;
    file: gameFile;
    _src: any;
    ownObject: GameObject
}
interface gameSprite {
    fileType: string;
    file: gameFile;
    _src: { imageb64: string; };
    sprite: any;
    ownObject: GameObject
}
type World = Box2D.Dynamics.b2World;
interface Engine extends GameEvents{
    scene: Level[]
    currentScene: number
    files: { [x: string]: gameFile }
    uuidList: { [x: UUID]: GameObject }
    usedUUID: UUID[]
    hasUUID: boolean
    assignedUUID: string
    world: World
    componentList: { [x: string]: class }
    removeListeners: Function[]
    physics: boolean;
    errorText: string;
    zoom: number;
    camera: Camera;
    gui: ReturnType<typeof createGraphics>
    mobile: boolean
    guiObjects: { [x: UUID]: GUIElement }
}
interface GUIElement extends GameObject{
    id: UUID
    mobileOnly: boolean;
    position: Vec
}
interface Camera {
    target: any;
    zoom: number;
    currentPos: { x: number; y: number; };
    isLocked: boolean;
}
function downloadFile(content: any, arg1: string) {
    throw new Error("Function not implemented.");
}