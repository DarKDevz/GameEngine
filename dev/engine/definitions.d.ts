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
declare function showSaveFilePicker(options:any): Promise<any>
declare var webglVersion: 'p2d'|'webgl2'
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
interface Joystick extends GUIElement {
    stickSize: any;
    position: Vec;
    stickPosition: any;
    isDragging: boolean;
    dir: { [x: string]: any }
}
interface Button extends GUIElement {
    size: number;
    cb: [Function, Function]
    position: Vec;
    pressed: boolean
}
interface GUIElement extends GameObject {
    size: number
}
interface ImportInterface {
    _font: { default: boolean , value: string};
    version: number
    file: { [x: UUID]: FileConstructor }[]
    GUI: { default: boolean }
    scenes: {
        [x: number]: SceneConstructor
    }
}
interface FileConstructor { references: {}, data: string, type: string }
interface SceneConstructor {
    Data: any[],
    sceneData: number[],
    componentData?: [listOfComponents]
}
interface listOfComponents {
    [x: string]: componentConstructor[]
    [Symbol.iterator](): {
        next(): { value: componentConstructor }
    }
}
interface componentConstructor {
    name: string, params: { fileUUID: UUID, vals: any }
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
interface EditableObject {
    name:string
    set:(val:any)=>void
    get:()=>any
    value:any
}
interface GameObject extends GameEvents {
    x: number;
    y: number;
    z: number;
    clr?: any;
    isShootable?: number;
    health?: number;
    alwaysDraw: boolean;
    is3D:boolean;
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
    parameterNames(): string[]
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
    deviceMoved(...args: any): void,
    deviceTurned(...args: any): void,
    deviceShaken(...args: any): void,
    doubleClicked(...args: any): void,
    mousePressed(...args: any): void,
    mouseReleased(...args: any): void,
    mouseMoved(...args: any): void,
    mouseDragged(...args: any): void,
    mouseClicked(...args: any): void,
    mouseWheel(...args: any): void,
    touchStarted(...args: any): void,
    touchMoved(...args: any): void,
    touchEnded(...args: any): void,
    keyPressed(...args: any): void,
    keyReleased(...args: any): void,
    keyTyped(...args: any): void,
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
interface Engine extends GameEvents {
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
    camera: Camera;
    gui: ReturnType<typeof createGraphics>
    mobile: boolean
    guiObjects: { [x: UUID]: GUIElement }
    eventListener: { [x: UUID]: { [x: string]: Function } }
}
interface GUIElement extends GameObject {
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
interface Particle {
    lifeTime: number
    graphics: ReturnType<typeof createGraphics>
    dir: Vec
    pos: Vec
    gX: number
    gY: number
    velocity: number
    toBeRemoved: boolean
    creation: ReturnType<typeof frameCount>
    shape: 'line' | 'circle'
    size: number
    color: string
    sinDir: number;
    cosDir: number
}
interface gameParticle extends Component {
    id: UUID
    manager: ParticleRenderer
}
interface ParticleRenderer {
    settings: {
        autoPlay: boolean;
        timer: number;
        howManyPer: number;
        lifeTime: number;
        rDirX: number[];
        rDirY: number[];
        gDir: number[];
        velocity: number;
        pos: xyObject;
        size: number; // Default size
        color: string; // Default color (red)
        shape: 'line' | 'circle'
        loop: boolean;
    }
    particles: Particle[]
    allIntervals: number[]
    ownObject: GameObject
    graphics: ReturnType<typeof createGraphics>
    lastFrame: ReturnType<typeof createImage>

}
function downloadFile(content: any, arg1: string) {
    throw new Error("Function not implemented.");
}