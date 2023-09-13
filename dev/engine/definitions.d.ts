declare var Box2D: Box2D;
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
declare var p5: any
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
    collisionType: 'Rect';
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
type collisionTypes = 'Rect'|'Circle'|'Line'|'Point'|'Frustum'
interface CollidableObject {
    getCollisionType(): collisionTypes
    getCollisionVectors(): any[]
    [x:string]:any;
}
/**
 * Represents a game object.
 * @interface
 */
interface GameObject extends GameEvents {
    /** The x-coordinate of the object. */
    x: number;

    /** The y-coordinate of the object. */
    y: number;

    /** The z-coordinate of the object. In 2d used only for defining which objects are rendered first*/
    z: number;
    /**Old x position used for physics */
    oldX:number;
    /**Old y position used for physics */
    oldY:number;
    /**if Components are enabled or not */
    noComponents:boolean;
    /** The color of the object (optional). */
    clr?: any;

    /** Determines if the object can be shot */
    isShootable?: boolean;

    /** The health of the object (optional). */
    health?: number;

    /** Determines if the object should always be drawn. */
    alwaysDraw: boolean;

    /** Indicates if the object is in 3D space. */
    is3D: boolean;

    /** The width of the object. */
    width: number;

    /** The height of the object. */
    height: number;

    /** Indicates if the object is collidable. */
    isCollidable: boolean;

    /** A tag to identify the object. */
    tag: string;

    /** The scene in which the object is placed. */
    scene: string;

    /** Object overrides (unsafe to modify). */
    overrides: any;

    /** Saved functions for the object (unsafe to modify). */
    savedFuncs: any;

    /** New overrides for the object (unsafe to modify). */
    newOverrides: any;

    /** The unique identifier for the object. */
    uuid: string;

    /** List of gameSprite components. */
    sprites: gameSprite[];

    /**If singular sprite will return one sprite if multiple more than one*/
    sprite: any

    /**Debugging purposes */
    script:string

    /** Object used for variables that are shown in editor by gameScript */
    shown: any;

    /** The collision type of the object. */
    collisionType: collisionTypes;

    /** Indicates if the image for the object has been initialized. */
    imageInitialized: boolean;

    /** The type identifier for custom classes (set to undefined if not applicable). */
    typeId: number | undefined;

    /** List of components attached to the object. */
    components: Component[];

    /** The body of the object. */
    body: any;

    /**
     * Initializes the object.
     * @function
     */
    init(): void;

    /**
     * Retrieves collision vectors for the object.
     * @function
     * @returns {any[]} An array of collision vectors.
     */
    getCollisionVectors(): any[];

    /**
     * Retrieves parameter names for the object.
     * @function
     * @returns {string[]} An array of parameter names.
     */
    parameterNames(): string[];

    /**
     * Updates the shape of the object (optional).
     * @function
     */
    updateShape?(): void;
    __proto__: any

    [x:string]:any
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
interface movingPlatform extends GameObject {
    x1:number;
    x2:number;
    direction: 'r'|'l';
}
interface Interactive extends GameObject {
    canBeInteracted:boolean;
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
/**
 * Represents a level in the game.
 * @interface
 */
interface Level {
    /**
     * Converts the level data to JSON format.
     * @function
     * @returns {any} The level data in JSON format.
     */
    toJSON(): any;

    /**
     * Converts additional extras to JSON format.
     * @function
     * @returns {any} Additional extras in JSON format.
     */
    extrasJson(): any;

    /**
     * Converts components data to an unknown format.
     * @function
     * @returns {unknown} Components data in an unknown format.
     */
    componentsJson(): unknown;

    /**
     * The index of the level.
     * @type {any}
     */
    ind: any;

    /**
     * Retrieves an array of level values.
     * @function
     * @returns {any[]} An array of level values.
     */
    getLevelValues(): any[];

    /**
     * Retrieves the names of level values.
     * @function
     * @returns {unknown} The names of level values in an unknown format.
     */
    getLevelValueNames(): unknown;

    /**
     * Retrieves the actual level values.
     * @function
     * @returns {unknown} The actual level values in an unknown format.
     */
    getActualLevelValues(): unknown;

    /**
     * The maximum position within the level.
     * @type {any}
     */
    maxPos: any;

    /**
     * The starting position of the level represented as a vector.
     * @type {Vec}
     */
    pos: Vec;

    /**
     * Loads the level.
     * @function
     */
    loadLevel(): void;

    /**
     * Performs early update operations.
     * @function
     * @param {boolean} shouldRun - wheter its should run or not
     */
    earlyUpdate(shouldRun: boolean): void;

    /**
     * Displays the level. and runs update()
     * @function
     * @param {boolean} shouldRun - wheter its should run or not
     */
    display(shouldRun: boolean): void;

    /**
     * After drawing function
     * @function
     * @param {boolean} shouldRun - wheter its should run or not
     */
    lateUpdate(shouldRun: boolean): void;

    /**
     * An array of game objects (boxes) in the level.
     * @type {GameObject[]}
     */
    boxes: GameObject[];
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
/**
 * Represents the game engine.
 * @interface
 * @extends {GameEvents}
 */
interface Engine extends GameEvents {
    /**
     * The scenes in the game.
     * @type {Level[]}
     */
    scene: Level[];

    /**
     * The index of the currently active scene.
     * @type {number}
     */
    currentScene: number;

    /**
     * Files used in the game.
     * @type {{ [x: string]: gameFile }}
     */
    files: { [x: string]: gameFile };

    /**
     * Mapping of UUIDs to game objects.
     * @type {{ [x: UUID]: GameObject }}
     */
    uuidList: { [x: UUID]: GameObject };

    /**
     * List of used UUIDs.
     * @type {UUID[]}
     */
    usedUUID: UUID[];

    /**
     * Indicates whether UUIDs are available.
     * @type {boolean}
     */
    hasUUID: boolean;

    /**
     * The assigned UUID for the engine.
     * @type {string}
     */
    assignedUUID: string;

    /**
     * worker that takes care of collision
     * to improve performance
     * note:If your device doesn't have a WebWorker it wont work
     * @type {Worker}
     */
    collisionWorker: Worker


    /**
     * List of all cached collisions
     * To check if one is colliding with the other
     * check both uuids
     * cache[uuid1][uuid2]&&cache[uuid2][uuid1]
     * or just use function checkCollided
     * @type {[x:string]:{[x:string]:boolean}}
     */
    allCollisions: {
        [x:UUID]:{
            [x:UUID]:boolean
        }
    }
    /**
     * The world in the game.
     * @type {World}
     */
    world: World;

    /**
     * List of available components.
     * @type {{ [x: string]: class }}
     */
    componentList: { [x: string]: class };

    /**
     * List of remove listeners functions.
     * @type {Function[]}
     */
    removeListeners: Function[];

    /**
     * Indicates whether physics are enabled.
     * @type {boolean}
     */
    physics: boolean;

    /**
     * Text for displaying errors.
     * @type {string}
     */
    errorText: string;

    /**
     * The camera used in the game.
     * @type {Camera}
     */
    camera: Camera;

    /**
     * Graphics user interface (GUI).
     * @type {ReturnType<typeof createGraphics>}
     */
    gui: ReturnType<typeof createGraphics>;

    /**
     * Indicates whether the game is running on a mobile device.
     * @type {boolean}
     */
    mobile: boolean;

    /**
     * Mapping of UUIDs to GUI elements.
     * @type {{ [x: UUID]: GUIElement }}
     */
    guiObjects: { [x: UUID]: GUIElement };

    /**
     * Mapping of UUIDs to event listener functions.
     * @type {{ [x: UUID]: { [x: string]: Function } }}
     */
    eventListener: { [x: UUID]: { [x: string]: Function } };
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
interface SpatialHashMap {
    cellSize:number;
    grid: Map;
    uuidToGrid: {[x:UUID]:Array[]}
    addObject(a:UUID,collider:CollidableObject):void
    queryObj(collider:CollidableObject):boolean
    uuidToGrid:any;
}
function downloadFile(content: any, arg1: string):void
/**
 * @description updates frustum planes to use for detecting wheter to draw an object or not
 */
function updateColliders():void
function replaceValues<SpecialFunc>():void
function replaceValues<SpecialFunc>():void
