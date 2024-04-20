declare var engine: Engine
declare var canvas: any
declare var MapData: { data: any }
declare var JSZip: any
declare function showSaveFilePicker(options: any): Promise<any>
declare var editor: Editor
declare var infoDivs: Array<Div>
type Vec = ReturnType<typeof createVector>
type Div = ReturnType<typeof createDiv>
declare interface Window {
    [x: string]: any
}
declare interface Array<T> {
    equals(arg0: Array<T>): boolean;
}
declare interface Joystick extends GUIElement {
    stickSize: any;
    position: Vec;
    stickPosition: any;
    isDragging: boolean;
    dir: { [x: string]: any }
}
declare interface Button extends GUIElement {
    size: number;
    cb: [Function, Function]
    position: Vec;
    pressed: boolean
}
declare interface GUIElement extends GameObject {
    size: number
}
declare interface ImportInterface {
    _font: { default: boolean, value: string };
    version: number
    file: { [x: UUID]: FileConstructor }[]
    GUI: { default: boolean }
    scenes: {
        [x: number]: SceneConstructor
    }
    is3D?: boolean
}
declare interface FileConstructor { references: {}, data: string, type: string }
declare interface SceneConstructor {
    Data: any[],
    sceneData: number[],
    componentData?: [listOfComponents]
}
declare interface listOfComponents {
    [x: string]: componentConstructor[]
    [Symbol.iterator](): {
        next(): { value: componentConstructor }
    }
}
declare interface componentConstructor {
    name: string, params: { fileUUID: UUID, vals: any }
}
type SpecialFunc = {
    (...anything: any): any
    [x: string]: any;
}
declare interface Bullet {
    directionX: number;
    directionY: number;
    r: number;
    id: undefined;
    startDate: number;
    oldX: number;
    oldY: number;
    collidedId: { isCollidable: any; };
}
declare interface gameFile {
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
declare interface Player {
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
    body: RAPIER.RigidBody;
}
declare interface BaseEditor {
    levelMode: boolean;
    cameraPos: Vec;
    playingWindow: any;
    creatingNew: boolean;
    newObject: any;
    valChanged: Event;
    copiedObj: any[];
    gridSize: number;
    pasted: boolean;
    startPos: any;
    copiedObjs: any[];
    updates: {
        menu: boolean;
        browser: boolean;
        level: boolean
    };
    tryOffset: { [x: UUID]: xyObject }
    sceneContext: number;
    contextObj: any;
}
declare interface Editor {
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
    updates: {
        menu: boolean;
        browser: boolean;
        level: boolean
    };
    tryOffset: { [x: UUID]: xyObject }
    sceneContext: number;
    contextObj: any;
}
declare interface EditableObject {
    name: string
    set: (val: any) => void
    get: () => any
    value: any
}
type collisionTypes = 'Rect' | 'Circle' | 'Line' | 'Point' | 'Frustum' | 'Poly' | 'Sphere' | 'Box3D' | 'Ellipse'
declare interface CollidableObject {
    getCollisionType(): collisionTypes
    getCollisionVectors(): any[]
    [x: string]: any;
}
/**
 * Represents a game object.
 * @declare interface
 */
declare interface GameObject extends GameEvents {
    /** The x-coordinate of the object. */
    x: number;

    /** The y-coordinate of the object. */
    y: number;

    /** The z-coordinate of the object. In 2d used only for defining which objects are rendered first*/
    z: number;
    /**Old x position used for physics */
    oldX: number;
    /**Old y position used for physics */
    oldY: number;
    /**if Components are enabled or not */
    noComponents: boolean;
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
    tag: string|undefined;

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
    script: string

    /** Object used for variables that are shown in editor by gameScript */
    shown: any;

    /** The collision type of the object. */
    collisionType: collisionTypes;

    /** Indicates if the image for the object has been initialized. */
    imageInitialized: boolean;

    /** The type identifier for custom classes (set to undefined if not applicable). */
    typeId: number | string;

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
    material: Material;
    __proto__: any

    [x: string]: any
}
declare interface Material {
    fun: Function;
    values: any[];
    type: number;
    /**
     * Applies the material to the p5 renderer
     */
    apply():void
    set(fun:Function,values:Array<()=>any>,type:number): void
}
declare interface Box extends GameObject {
    oldX: number;
    oldY: number;
    w: number;
    h: number;
}
declare interface End extends Box { }
declare interface TextObject extends GameObject {
    loaded: boolean;
    t: string;
}
declare interface Sprite extends Component {

}
declare interface Vector {
    x: number,
    y: number
}
declare interface xyObject {
    x: number,
    y: number
}
declare interface xywhObject extends xyObject {
    width: number,
    height: number
}
declare interface movingPlatform extends Box {
    x1: number;
    x2: number;
    direction: 'r' | 'l';
}
declare interface Interactive extends GameObject {
    canBeInteracted: boolean;
}
declare interface GameEvents {
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
 * @declare interface
 */
declare interface Level {
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
 * Displays the custom level values
 * @function
 * @param {boolean} shouldRun - wheter its should run or not
 */
    customDraw(shouldRun: boolean): void;

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

declare interface Component {
    shouldUpdateMenu: boolean;
    componentName: string;
    ownObject: GameObject;
    type: string;
    [x: string]: any
    new(...arg0: any): Component
    toJson(): string;
}
declare interface gameScript extends Component {
    type: string;
    vals: { shown: any; editableVals: {}; };
    id: any;
    overrides: any;
    newOverrides: any;
    file: gameFile;
    _src: any;
    ownObject: GameObject
}
declare interface gameGlobalScript {
    file: gameFile
}
declare interface gameSprite {
    type: string;
    file: gameFile;
    _src: { imageb64: string; };
    sprite: any;
    ownObject: GameObject
}
type World = RAPIER.World;
/**
 * Represents the game engine.
 * @declare interface
 * @extends {GameEvents}
 */
declare interface Engine extends GameEvents {
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
    activeScene: Level;
    loading: boolean;
    defaultPlayer: boolean;
    assignUUID(str:UUID):void
    addScriptByName(name:string,vals:Object,context:any)
    generateUUID() : UUID
    getActiveScene(): Level;
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
        [x: UUID]: {
            [x: UUID]: boolean
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
    componentList: { [x: string]: any };

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
     * Graphics user declare interface (GUI).
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

    editorZoom: number;

    is3D: boolean;
}
declare interface Gizmo {
    pos: Vec
}
declare interface GUIElement extends GameObject {
    id: UUID
    mobileOnly: boolean;
    position: Vec
}
declare interface Camera {
    target: any;
    zoom: number;
    currentPos: { x: number; y: number; };
    isLocked: boolean;
}
declare interface Particle {
    lifeTime: number
    graphics: ReturnType<typeof createGraphics>
    dir: Vec
    pos: Vec
    gX: number
    gY: number
    velocity: number
    toBeRemoved: boolean
    creation: number
    shape: 'line' | 'circle'
    size: number
    color: string
    sinDir: number;
    cosDir: number
}
declare interface gameParticle extends Component {
    id: UUID
    manager: ParticleRenderer
}
declare interface ParticleRenderer {
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
declare interface SpatialHashMap {
    cellSize: number;
    grid: Map<String, any>;
    uuidToGrid: { [x: UUID]: any }
    addObject(uuid: UUID, collider: [collisionTypes, xyObject[]]): void
    queryObj(collider: CollidableObject): boolean
}
declare function HandleCollision(obj1:CollidableObject,obj2:CollidableObject):boolean
declare function removeObject(str:UUID):void
declare namespace RAPIER {
    type RigidBodyHandle = number;
    type Rotation = number;
    type InteractionGroups = number;
    enum JointType {
        Revolute,
        Fixed,
        Prismatic,
        Rope,
        Spring,
        // #if DIM3
        Spherical,
        Generic,
        // #endif
    }
    enum CoefficientCombineRule {
        Average = 0,
        Min = 1,
        Multiply = 2,
        Max = 3,
    }
    enum ActiveHooks {
        NONE = 0,
        FILTER_CONTACT_PAIRS = 0b0001,
        FILTER_INTERSECTION_PAIRS = 0b0010,
        // MODIFY_SOLVER_CONTACTS = 0b0100, /* Not supported yet in JS. */
    }
    enum ActiveEvents {
        NONE = 0,
        /**
         * Enable collision events.
         */
        COLLISION_EVENTS = 0b0001,
        /**
         * Enable contact force events.
         */
        CONTACT_FORCE_EVENTS = 0b0010,
    }
    enum SolverFlags {
        EMPTY = 0b000,
        COMPUTE_IMPULSE = 0b001,
    }
    type MultibodyJointHandle = number;
    class RigidBodySet {
        raw: RawRigidBodySet;
        /**
         * Release the WASM memory occupied by this rigid-body set.
         */
        public free(): void;

        constructor(raw?: RawRigidBodySet);

        /**
         * Internal method, do not call this explicitly.
         */
        public finalizeDeserialization(colliderSet: ColliderSet): void;

        /**
         * Creates a new rigid-body and return its integer handle.
         *
         * @param colliderSet - The collider set to which the new rigid-body belongs.
         * @param desc - The description of the rigid-body to create.
         */
        public createRigidBody(
            colliderSet: ColliderSet,
            desc: RigidBodyDesc,
        ): RigidBody;

        /**
         * Removes a rigid-body from this set.
         *
         * This will also remove all the colliders and joints attached to the rigid-body.
         *
         * @param handle - The integer handle of the rigid-body to remove.
         * @param islands - The island manager.
         * @param colliders - The collider set.
         * @param impulseJoints - The impulse joint set.
         * @param multibodyJoints - The multibody joint set.
         */
        public remove(
            handle: RigidBodyHandle,
            islands: IslandManager,
            colliders: ColliderSet,
            impulseJoints: ImpulseJointSet,
            multibodyJoints: MultibodyJointSet,
        ): void;

        /**
         * The number of rigid-bodies in this set.
         */
        public len(): number;

        /**
         * Does this set contain a rigid-body with the given handle?
         *
         * @param handle - The rigid-body handle to check.
         */
        public contains(handle: RigidBodyHandle): boolean;

        /**
         * Gets the rigid-body with the given handle.
         *
         * @param handle - The handle of the rigid-body to retrieve.
         */
        public get(handle: RigidBodyHandle): RigidBody | null;

        /**
         * Applies the given closure to each rigid-body contained by this set.
         *
         * @param f - The closure to apply.
         */
        public forEach(f: (body: RigidBody) => void): void;

        /**
         * Applies the given closure to each active rigid-body contained by this set.
         *
         * A rigid-body is active if it is not sleeping, i.e., if it moved recently.
         *
         * @param islands - The island manager.
         * @param f - The closure to apply.
         */
        public forEachActiveRigidBody(
            islands: IslandManager,
            f: (body: RigidBody) => void,
        ): void;

        /**
         * Gets all rigid-bodies in the list.
         *
         * @returns Rigid-bodies list.
         */
        public getAll(): RigidBody[];
    }
    class MultibodyJoint {
        protected rawSet: RawMultibodyJointSet; // The MultibodyJoint won't need to free this.
        handle: MultibodyJointHandle;

        constructor(rawSet: RawMultibodyJointSet, handle: MultibodyJointHandle)

        public static newTyped(
            rawSet: RawMultibodyJointSet,
            handle: MultibodyJointHandle,
        ): MultibodyJoint

        /**
         * Checks if this joint is still valid (i.e. that it has
         * not been deleted from the joint set yet).
         */
        public isValid(): boolean

        // /**
        //  * The unique integer identifier of the first rigid-body this joint it attached to.
        //  */
        // public bodyHandle1(): RigidBodyHandle {
        //     return this.rawSet.jointBodyHandle1(this.handle);
        // }
        //
        // /**
        //  * The unique integer identifier of the second rigid-body this joint is attached to.
        //  */
        // public bodyHandle2(): RigidBodyHandle {
        //     return this.rawSet.jointBodyHandle2(this.handle);
        // }
        //
        // /**
        //  * The type of this joint given as a string.
        //  */
        // public type(): JointType {
        //     return this.rawSet.jointType(this.handle);
        // }
        //
        // // #if DIM3
        // /**
        //  * The rotation quaternion that aligns this joint's first local axis to the `x` axis.
        //  */
        // public frameX1(): Rotation {
        //     return RotationOps.fromRaw(this.rawSet.jointFrameX1(this.handle));
        // }
        //
        // // #endif
        //
        // // #if DIM3
        // /**
        //  * The rotation matrix that aligns this joint's second local axis to the `x` axis.
        //  */
        // public frameX2(): Rotation {
        //     return RotationOps.fromRaw(this.rawSet.jointFrameX2(this.handle));
        // }
        //
        // // #endif
        //
        // /**
        //  * The position of the first anchor of this joint.
        //  *
        //  * The first anchor gives the position of the points application point on the
        //  * local frame of the first rigid-body it is attached to.
        //  */
        // public anchor1(): Vector {
        //     return VectorOps.fromRaw(this.rawSet.jointAnchor1(this.handle));
        // }
        //
        // /**
        //  * The position of the second anchor of this joint.
        //  *
        //  * The second anchor gives the position of the points application point on the
        //  * local frame of the second rigid-body it is attached to.
        //  */
        // public anchor2(): Vector {
        //     return VectorOps.fromRaw(this.rawSet.jointAnchor2(this.handle));
        // }

        /**
         * Controls whether contacts are computed between colliders attached
         * to the rigid-bodies linked by this joint.
         */
        public setContactsEnabled(enabled: boolean)

        /**
         * Indicates if contacts are enabled between colliders attached
         * to the rigid-bodies linked by this joint.
         */
        public contactsEnabled(): boolean
    }

    export class UnitMultibodyJoint extends MultibodyJoint {
        /**
         * The axis left free by this joint.
         */
        protected rawAxis?(): RawJointAxis;

        // /**
        //  * Are the limits enabled for this joint?
        //  */
        // public limitsEnabled(): boolean {
        //     return this.rawSet.jointLimitsEnabled(this.handle, this.rawAxis());
        // }
        //
        // /**
        //  * The min limit of this joint.
        //  */
        // public limitsMin(): number {
        //     return this.rawSet.jointLimitsMin(this.handle, this.rawAxis());
        // }
        //
        // /**
        //  * The max limit of this joint.
        //  */
        // public limitsMax(): number {
        //     return this.rawSet.jointLimitsMax(this.handle, this.rawAxis());
        // }
        //
        // public configureMotorModel(model: MotorModel) {
        //     this.rawSet.jointConfigureMotorModel(this.handle, this.rawAxis(), model);
        // }
        //
        // public configureMotorVelocity(targetVel: number, factor: number) {
        //     this.rawSet.jointConfigureMotorVelocity(this.handle, this.rawAxis(), targetVel, factor);
        // }
        //
        // public configureMotorPosition(targetPos: number, stiffness: number, damping: number) {
        //     this.rawSet.jointConfigureMotorPosition(this.handle, this.rawAxis(), targetPos, stiffness, damping);
        // }
        //
        // public configureMotor(targetPos: number, targetVel: number, stiffness: number, damping: number) {
        //     this.rawSet.jointConfigureMotor(this.handle, this.rawAxis(), targetPos, targetVel, stiffness, damping);
        // }
    }
    class MultibodyJointSet {
        raw: RawMultibodyJointSet;
        /**
         * Release the WASM memory occupied by this joint set.
         */
        public free()

        constructor(raw?: RawMultibodyJointSet)

        /**
         * Creates a new joint and return its integer handle.
         *
         * @param desc - The joint's parameters.
         * @param parent1 - The handle of the first rigid-body this joint is attached to.
         * @param parent2 - The handle of the second rigid-body this joint is attached to.
         * @param wakeUp - Should the attached rigid-bodies be awakened?
         */
        public createJoint(
            desc: JointData,
            parent1: RigidBodyHandle,
            parent2: RigidBodyHandle,
            wakeUp: boolean,
        ): MultibodyJoint

        /**
         * Remove a joint from this set.
         *
         * @param handle - The integer handle of the joint.
         * @param wake_up - If `true`, the rigid-bodies attached by the removed joint will be woken-up automatically.
         */
        public remove(handle: MultibodyJointHandle, wake_up: boolean)

        /**
         * Internal function, do not call directly.
         * @param handle
         */
        public unmap(handle: MultibodyJointHandle)

        /**
         * The number of joints on this set.
         */
        public len(): number

        /**
         * Does this set contain a joint with the given handle?
         *
         * @param handle - The joint handle to check.
         */
        public contains(handle: MultibodyJointHandle): boolean

        /**
         * Gets the joint with the given handle.
         *
         * Returns `null` if no joint with the specified handle exists.
         *
         * @param handle - The integer handle of the joint to retrieve.
         */
        public get(handle: MultibodyJointHandle): MultibodyJoint | null

        /**
         * Applies the given closure to each joint contained by this set.
         *
         * @param f - The closure to apply.
         */
        public forEach(f: (joint: MultibodyJoint) => void)

        /**
         * Calls the given closure with the integer handle of each multibody joint attached to this rigid-body.
         *
         * @param f - The closure called with the integer handle of each multibody joint attached to the rigid-body.
         */
        public forEachJointHandleAttachedToRigidBody(
            handle: RigidBodyHandle,
            f: (handle: MultibodyJointHandle) => void,
        )

        /**
         * Gets all joints in the list.
         *
         * @returns joint list.
         */
        public getAll(): MultibodyJoint[]
    }
    enum JointAxesMask {
        X = 1 << 0,
        Y = 1 << 1,
        Z = 1 << 2,
        AngX = 1 << 3,
        AngY = 1 << 4,
        AngZ = 1 << 5,
    }
    class JointData {
        anchor1: Vector;
        anchor2: Vector;
        axis: Vector;
        frame1: Rotation;
        frame2: Rotation;
        jointType: JointType;
        limitsEnabled: boolean;
        limits: Array<number>;
        axesMask: JointAxesMask;
        stiffness: number;
        damping: number;
        length: number;

        private constructor()

        /**
         * Creates a new joint descriptor that builds a Fixed joint.
         *
         * A fixed joint removes all the degrees of freedom between the affected bodies, ensuring their
         * anchor and local frames coincide in world-space.
         *
         * @param anchor1 - Point where the joint is attached on the first rigid-body affected by this joint. Expressed in the
         *                  local-space of the rigid-body.
         * @param frame1 - The reference orientation of the joint wrt. the first rigid-body.
         * @param anchor2 - Point where the joint is attached on the second rigid-body affected by this joint. Expressed in the
         *                  local-space of the rigid-body.
         * @param frame2 - The reference orientation of the joint wrt. the second rigid-body.
         */
        public static fixed(
            anchor1: Vector,
            frame1: Rotation,
            anchor2: Vector,
            frame2: Rotation,
        ): JointData

        public static spring(
            rest_length: number,
            stiffness: number,
            damping: number,
            anchor1: Vector,
            anchor2: Vector,
        ): JointData

        public static rope(
            length: number,
            anchor1: Vector,
            anchor2: Vector,
        ): JointData

        // #if DIM2

        /**
         * Create a new joint descriptor that builds revolute joints.
         *
         * A revolute joint allows three relative rotational degrees of freedom
         * by preventing any relative translation between the anchors of the
         * two attached rigid-bodies.
         *
         * @param anchor1 - Point where the joint is attached on the first rigid-body affected by this joint. Expressed in the
         *                  local-space of the rigid-body.
         * @param anchor2 - Point where the joint is attached on the second rigid-body affected by this joint. Expressed in the
         *                  local-space of the rigid-body.
         */
        public static revolute(anchor1: Vector, anchor2: Vector): JointData

        /**
         * Creates a new joint descriptor that builds a Prismatic joint.
         *
         * A prismatic joint removes all the degrees of freedom between the
         * affected bodies, except for the translation along one axis.
         *
         * @param anchor1 - Point where the joint is attached on the first rigid-body affected by this joint. Expressed in the
         *                  local-space of the rigid-body.
         * @param anchor2 - Point where the joint is attached on the second rigid-body affected by this joint. Expressed in the
         *                  local-space of the rigid-body.
         * @param axis - Axis of the joint, expressed in the local-space of the rigid-bodies it is attached to.
         */
        public static prismatic(
            anchor1: Vector,
            anchor2: Vector,
            axis: Vector,
        ): JointData

        // #endif

        // #if DIM3
        /**
         * Create a new joint descriptor that builds generic joints.
         *
         * A generic joint allows customizing its degrees of freedom
         * by supplying a mask of the joint axes that should remain locked.
         *
         * @param anchor1 - Point where the joint is attached on the first rigid-body affected by this joint. Expressed in the
         *                  local-space of the rigid-body.
         * @param anchor2 - Point where the joint is attached on the second rigid-body affected by this joint. Expressed in the
         *                  local-space of the rigid-body.
         * @param axis - The X axis of the joint, expressed in the local-space of the rigid-bodies it is attached to.
         * @param axesMask - Mask representing the locked axes of the joint. You can use logical OR to select these from
         *                   the JointAxesMask enum. For example, passing (JointAxesMask.AngX || JointAxesMask.AngY) will
         *                   create a joint locked in the X and Y rotational axes.
         */
        public static generic(
            anchor1: Vector,
            anchor2: Vector,
            axis: Vector,
            axesMask: JointAxesMask,
        ): JointData

        /**
         * Create a new joint descriptor that builds spherical joints.
         *
         * A spherical joint allows three relative rotational degrees of freedom
         * by preventing any relative translation between the anchors of the
         * two attached rigid-bodies.
         *
         * @param anchor1 - Point where the joint is attached on the first rigid-body affected by this joint. Expressed in the
         *                  local-space of the rigid-body.
         * @param anchor2 - Point where the joint is attached on the second rigid-body affected by this joint. Expressed in the
         *                  local-space of the rigid-body.
         */
        public static spherical(anchor1: Vector, anchor2: Vector): JointData

        /**
         * Creates a new joint descriptor that builds a Prismatic joint.
         *
         * A prismatic joint removes all the degrees of freedom between the
         * affected bodies, except for the translation along one axis.
         *
         * @param anchor1 - Point where the joint is attached on the first rigid-body affected by this joint. Expressed in the
         *                  local-space of the rigid-body.
         * @param anchor2 - Point where the joint is attached on the second rigid-body affected by this joint. Expressed in the
         *                  local-space of the rigid-body.
         * @param axis - Axis of the joint, expressed in the local-space of the rigid-bodies it is attached to.
         */
        public static prismatic(
            anchor1: Vector,
            anchor2: Vector,
            axis: Vector,
        ): JointData

        /**
         * Create a new joint descriptor that builds Revolute joints.
         *
         * A revolute joint removes all degrees of freedom between the affected
         * bodies except for the rotation along one axis.
         *
         * @param anchor1 - Point where the joint is attached on the first rigid-body affected by this joint. Expressed in the
         *                  local-space of the rigid-body.
         * @param anchor2 - Point where the joint is attached on the second rigid-body affected by this joint. Expressed in the
         *                  local-space of the rigid-body.
         * @param axis - Axis of the joint, expressed in the local-space of the rigid-bodies it is attached to.
         */
        public static revolute(
            anchor1: Vector,
            anchor2: Vector,
            axis: Vector,
        ): JointData
        // #endif

        public intoRaw(): RawGenericJoint
    }
    export class Ray {
        /**
         * The starting point of the ray.
         */
        public origin: Vector;
        /**
         * The direction of propagation of the ray.
         */
        public dir: Vector;

        /**
         * Builds a ray from its origin and direction.
         *
         * @param origin - The ray's starting point.
         * @param dir - The ray's direction of propagation.
         */
        constructor(origin: Vector, dir: Vector)

        public pointAt(t: number): Vector
    }

    /**
     * The intersection between a ray and a collider.
     */
    export class RayIntersection {
        /**
         * The time-of-impact of the ray with the collider.
         *
         * The hit point is obtained from the ray's origin and direction: `origin + dir * toi`.
         */
        toi: number;
        /**
         * The normal of the collider at the hit point.
         */
        normal: Vector;

        /**
         * The type of the geometric feature the point was projected on.
         */
        featureType: FeatureType.Unknown;

        /**
         * The id of the geometric feature the point was projected on.
         */
        featureId: number | undefined;

        constructor(
            toi: number,
            normal: Vector,
            featureType?: FeatureType,
            featureId?: number,
        )

        public static fromRaw(raw: RawRayIntersection): RayIntersection
    }

    /**
     * The intersection between a ray and a collider (includes the collider handle).
     */
    export class RayColliderIntersection {
        /**
         * The collider hit by the ray.
         */
        collider: Collider;
        /**
         * The time-of-impact of the ray with the collider.
         *
         * The hit point is obtained from the ray's origin and direction: `origin + dir * toi`.
         */
        toi: number;
        /**
         * The normal of the collider at the hit point.
         */
        normal: Vector;

        /**
         * The type of the geometric feature the point was projected on.
         */
        featureType: FeatureType.Unknown;

        /**
         * The id of the geometric feature the point was projected on.
         */
        featureId: number | undefined;

        constructor(
            collider: Collider,
            toi: number,
            normal: Vector,
            featureType?: FeatureType,
            featureId?: number,
        )

        public static fromRaw(
            colliderSet: ColliderSet,
            raw: RawRayColliderIntersection,
        ): RayColliderIntersection
    }
    enum FeatureType {
        Vertex,
        Edge,
        Face,
        Unknown,
    }
    enum QueryFilterFlags {
        /**
         * Exclude from the query any collider attached to a fixed rigid-body and colliders with no rigid-body attached.
         */
        EXCLUDE_FIXED = 0b0000_0001,
        /**
         * Exclude from the query any collider attached to a dynamic rigid-body.
         */
        EXCLUDE_KINEMATIC = 0b0000_0010,
        /**
         * Exclude from the query any collider attached to a kinematic rigid-body.
         */
        EXCLUDE_DYNAMIC = 0b0000_0100,
        /**
         * Exclude from the query any collider that is a sensor.
         */
        EXCLUDE_SENSORS = 0b0000_1000,
        /**
         * Exclude from the query any collider that is not a sensor.
         */
        EXCLUDE_SOLIDS = 0b0001_0000,
        /**
         * Excludes all colliders not attached to a dynamic rigid-body.
         */
        ONLY_DYNAMIC = QueryFilterFlags.EXCLUDE_FIXED |
        QueryFilterFlags.EXCLUDE_KINEMATIC,
        /**
         * Excludes all colliders not attached to a kinematic rigid-body.
         */
        ONLY_KINEMATIC = QueryFilterFlags.EXCLUDE_DYNAMIC |
        QueryFilterFlags.EXCLUDE_FIXED,
        /**
         * Exclude all colliders attached to a non-fixed rigid-body
         * (this will not exclude colliders not attached to any rigid-body).
         */
        ONLY_FIXED = QueryFilterFlags.EXCLUDE_DYNAMIC |
        QueryFilterFlags.EXCLUDE_KINEMATIC,
    }

    /**
     * The time of impact between a ray and a collider.
     */
    export class RayColliderToi {
        /**
         * The handle of the collider hit by the ray.
         */
        collider: Collider;
        /**
         * The time-of-impact of the ray with the collider.
         *
         * The hit point is obtained from the ray's origin and direction: `origin + dir * toi`.
         */
        toi: number;

        constructor(collider: Collider, toi: number)
        public static fromRaw(
            colliderSet: ColliderSet,
            raw: RawRayColliderToi,
        ): RayColliderToi
    }

    type ImpulseJointHandle = number;
    class ColliderSet {
        raw: RawColliderSet;

        /**
         * Release the WASM memory occupied by this collider set.
         */


        constructor(raw?: RawColliderSet)

        /**
         * Creates a new collider and return its integer handle.
         *
         * @param bodies - The set of bodies where the collider's parent can be found.
         * @param desc - The collider's description.
         * @param parentHandle - The integer handle of the rigid-body this collider is attached to.
         */
        public createCollider(
            bodies: RigidBodySet,
            desc: ColliderDesc,
            parentHandle: RigidBodyHandle,
        ): Collider

        /**
         * Remove a collider from this set.
         *
         * @param handle - The integer handle of the collider to remove.
         * @param bodies - The set of rigid-body containing the rigid-body the collider is attached to.
         * @param wakeUp - If `true`, the rigid-body the removed collider is attached to will be woken-up automatically.
         */
        public remove(
            handle: ColliderHandle,
            islands: IslandManager,
            bodies: RigidBodySet,
            wakeUp: boolean,
        )

        /**
         * Internal function, do not call directly.
         * @param handle
         */
        public unmap(handle: ImpulseJointHandle)

        /**
         * Gets the rigid-body with the given handle.
         *
         * @param handle - The handle of the rigid-body to retrieve.
         */
        public get(handle: ColliderHandle): Collider | null

        /**
         * The number of colliders on this set.
         */
        public len(): number

        /**
         * Does this set contain a collider with the given handle?
         *
         * @param handle - The collider handle to check.
         */
        public contains(handle: ColliderHandle): boolean

        /**
         * Applies the given closure to each collider contained by this set.
         *
         * @param f - The closure to apply.
         */
        public forEach(f: (collider: Collider) => void)

        /**
         * Gets all colliders in the list.
         *
         * @returns collider list.
         */
        public getAll(): Collider[]
    }
    interface PhysicsHooks {
        /**
         * Function that determines if contacts computation should happen between two colliders, and how the
         * constraints solver should behave for these contacts.
         *
         * This will only be executed and taken into account if at least one of the involved colliders contains the
         * `ActiveHooks.FILTER_CONTACT_PAIR` flag in its active hooks.
         *
         * @param collider1 − Handle of the first collider involved in the potential contact.
         * @param collider2 − Handle of the second collider involved in the potential contact.
         * @param body1 − Handle of the first body involved in the potential contact.
         * @param body2 − Handle of the second body involved in the potential contact.
         */
        filterContactPair(
            collider1: ColliderHandle,
            collider2: ColliderHandle,
            body1: RigidBodyHandle,
            body2: RigidBodyHandle,
        ): SolverFlags | null;

        /**
         * Function that determines if intersection computation should happen between two colliders (where at least
         * one is a sensor).
         *
         * This will only be executed and taken into account if `one of the involved colliders contains the
         * `ActiveHooks.FILTER_INTERSECTION_PAIR` flag in its active hooks.
         *
         * @param collider1 − Handle of the first collider involved in the potential contact.
         * @param collider2 − Handle of the second collider involved in the potential contact.
         * @param body1 − Handle of the first body involved in the potential contact.
         * @param body2 − Handle of the second body involved in the potential contact.
         */
        filterIntersectionPair(
            collider1: ColliderHandle,
            collider2: ColliderHandle,
            body1: RigidBodyHandle,
            body2: RigidBodyHandle,
        ): boolean;
    }
    enum RigidBodyType {
        /**
         * A `RigidBodyType::Dynamic` body can be affected by all external forces.
         */
        Dynamic = 0,
        /**
         * A `RigidBodyType::Fixed` body cannot be affected by external forces.
         */
        Fixed = 1,
        /**
         * A `RigidBodyType::KinematicPositionBased` body cannot be affected by any external forces but can be controlled
         * by the user at the position level while keeping realistic one-way interaction with dynamic bodies.
         *
         * One-way interaction means that a kinematic body can push a dynamic body, but a kinematic body
         * cannot be pushed by anything. In other words, the trajectory of a kinematic body can only be
         * modified by the user and is independent from any contact or joint it is involved in.
         */
        KinematicPositionBased = 2,
        /**
         * A `RigidBodyType::KinematicVelocityBased` body cannot be affected by any external forces but can be controlled
         * by the user at the velocity level while keeping realistic one-way interaction with dynamic bodies.
         *
         * One-way interaction means that a kinematic body can push a dynamic body, but a kinematic body
         * cannot be pushed by anything. In other words, the trajectory of a kinematic body can only be
         * modified by the user and is independent from any contact or joint it is involved in.
         */
        KinematicVelocityBased = 3
    }
    class ImpulseJoint {
        protected rawSet: RawImpulseJointSet; // The ImpulseJoint won't need to free this.
        protected bodySet: RigidBodySet; // The ImpulseJoint won’t need to free this.
        handle: ImpulseJointHandle;

        constructor(
            rawSet: RawImpulseJointSet,
            bodySet: RigidBodySet,
            handle: ImpulseJointHandle,
        )

        public static newTyped(
            rawSet: RawImpulseJointSet,
            bodySet: RigidBodySet,
            handle: ImpulseJointHandle,
        ): ImpulseJoint

        /** @internal */
        public finalizeDeserialization(bodySet: RigidBodySet)

        /**
         * Checks if this joint is still valid (i.e. that it has
         * not been deleted from the joint set yet).
         */
        public isValid(): boolean

        /**
         * The first rigid-body this joint it attached to.
         */
        public body1(): RigidBody

        /**
         * The second rigid-body this joint is attached to.
         */
        public body2(): RigidBody

        /**
         * The type of this joint given as a string.
         */
        public type(): JointType

        // #if DIM3
        /**
         * The rotation quaternion that aligns this joint's first local axis to the `x` axis.
         */
        public frameX1(): Rotation

        // #endif

        // #if DIM3
        /**
         * The rotation matrix that aligns this joint's second local axis to the `x` axis.
         */
        public frameX2(): Rotation
        // #endif

        /**
         * The position of the first anchor of this joint.
         *
         * The first anchor gives the position of the application point on the
         * local frame of the first rigid-body it is attached to.
         */
        public anchor1(): Vector

        /**
         * The position of the second anchor of this joint.
         *
         * The second anchor gives the position of the application point on the
         * local frame of the second rigid-body it is attached to.
         */
        public anchor2(): Vector

        /**
         * Sets the position of the first anchor of this joint.
         *
         * The first anchor gives the position of the application point on the
         * local frame of the first rigid-body it is attached to.
         */
        public setAnchor1(newPos: Vector)

        /**
         * Sets the position of the second anchor of this joint.
         *
         * The second anchor gives the position of the application point on the
         * local frame of the second rigid-body it is attached to.
         */
        public setAnchor2(newPos: Vector)

        /**
         * Controls whether contacts are computed between colliders attached
         * to the rigid-bodies linked by this joint.
         */
        public setContactsEnabled(enabled: boolean)

        /**
         * Indicates if contacts are enabled between colliders attached
         * to the rigid-bodies linked by this joint.
         */
        public contactsEnabled(): boolean
    }
    class IslandManager {
        raw: RawIslandManager;

        /**
         * Release the WASM memory occupied by this narrow-phase.
         */
        public free()

        constructor(raw?: RawIslandManager)

        /**
         * Applies the given closure to the handle of each active rigid-bodies contained by this set.
         *
         * A rigid-body is active if it is not sleeping, i.e., if it moved recently.
         *
         * @param f - The closure to apply.
         */
        public forEachActiveRigidBodyHandle(f: (handle: RigidBodyHandle) => void)
    }
    class ImpulseJointSet {
        raw: RawImpulseJointSet;

        /**
         * Release the WASM memory occupied by this joint set.
         */
        public free()

        constructor(raw?: RawImpulseJointSet)


        /**
         * Creates a new joint and return its integer handle.
         *
         * @param bodies - The set of rigid-bodies containing the bodies the joint is attached to.
         * @param desc - The joint's parameters.
         * @param parent1 - The handle of the first rigid-body this joint is attached to.
         * @param parent2 - The handle of the second rigid-body this joint is attached to.
         * @param wakeUp - Should the attached rigid-bodies be awakened?
         */
        public createJoint(
            bodies: RigidBodySet,
            desc: JointData,
            parent1: RigidBodyHandle,
            parent2: RigidBodyHandle,
            wakeUp: boolean,
        ): ImpulseJoint

        /**
         * Remove a joint from this set.
         *
         * @param handle - The integer handle of the joint.
         * @param wakeUp - If `true`, the rigid-bodies attached by the removed joint will be woken-up automatically.
         */
        public remove(handle: ImpulseJointHandle, wakeUp: boolean)

        /**
         * Calls the given closure with the integer handle of each impulse joint attached to this rigid-body.
         *
         * @param f - The closure called with the integer handle of each impulse joint attached to the rigid-body.
         */
        public forEachJointHandleAttachedToRigidBody(
            handle: RigidBodyHandle,
            f: (handle: ImpulseJointHandle) => void,
        )

        /**
         * Internal function, do not call directly.
         * @param handle
         */
        public unmap(handle: ImpulseJointHandle)

        /**
         * The number of joints on this set.
         */
        public len(): number
        /**
         * Does this set contain a joint with the given handle?
         *
         * @param handle - The joint handle to check.
         */
        public contains(handle: ImpulseJointHandle): boolean

        /**
         * Gets the joint with the given handle.
         *
         * Returns `null` if no joint with the specified handle exists.
         *
         * @param handle - The integer handle of the joint to retrieve.
         */
        public get(handle: ImpulseJointHandle): ImpulseJoint | null

        /**
         * Applies the given closure to each joint contained by this set.
         *
         * @param f - The closure to apply.
         */
        public forEach(f: (joint: ImpulseJoint) => void)

        /**
         * Gets all joints in the list.
         *
         * @returns joint list.
         */
        public getAll(): ImpulseJoint[]
    }
    class RigidBody {
        private rawSet;
        private colliderSet;
        readonly handle: RigidBodyHandle;
        /**
         * An arbitrary user-defined object associated with this rigid-body.
         */
        userData?: unknown;
        constructor(rawSet: RawRigidBodySet, colliderSet: ColliderSet, handle: RigidBodyHandle);
        /** @internal */
        finalizeDeserialization(colliderSet: ColliderSet): void;
        /**
         * Checks if this rigid-body is still valid (i.e. that it has
         * not been deleted from the rigid-body set yet.
         */
        isValid(): boolean;
        /**
         * Locks or unlocks the ability of this rigid-body to translate.
         *
         * @param locked - If `true`, this rigid-body will no longer translate due to forces and impulses.
         * @param wakeUp - If `true`, this rigid-body will be automatically awaken if it is currently asleep.
         */
        lockTranslations(locked: boolean, wakeUp: boolean): void;
        /**
         * Locks or unlocks the ability of this rigid-body to rotate.
         *
         * @param locked - If `true`, this rigid-body will no longer rotate due to torques and impulses.
         * @param wakeUp - If `true`, this rigid-body will be automatically awaken if it is currently asleep.
         */
        lockRotations(locked: boolean, wakeUp: boolean): void;
        /**
         * Locks or unlocks the ability of this rigid-body to translation along individual coordinate axes.
         *
         * @param enableX - If `false`, this rigid-body will no longer rotate due to torques and impulses, along the X coordinate axis.
         * @param enableY - If `false`, this rigid-body will no longer rotate due to torques and impulses, along the Y coordinate axis.
         * @param wakeUp - If `true`, this rigid-body will be automatically awaken if it is currently asleep.
         */
        setEnabledTranslations(enableX: boolean, enableY: boolean, wakeUp: boolean): void;
        /**
         * Locks or unlocks the ability of this rigid-body to translation along individual coordinate axes.
         *
         * @param enableX - If `false`, this rigid-body will no longer rotate due to torques and impulses, along the X coordinate axis.
         * @param enableY - If `false`, this rigid-body will no longer rotate due to torques and impulses, along the Y coordinate axis.
         * @param wakeUp - If `true`, this rigid-body will be automatically awaken if it is currently asleep.
         * @deprecated use `this.setEnabledTranslations` with the same arguments instead.
         */
        restrictTranslations(enableX: boolean, enableY: boolean, wakeUp: boolean): void;
        /**
         * The dominance group, in [-127, +127] this rigid-body is part of.
         */
        dominanceGroup(): number;
        /**
         * Sets the dominance group of this rigid-body.
         *
         * @param group - The dominance group of this rigid-body. Must be a signed integer in the range [-127, +127].
         */
        setDominanceGroup(group: number): void;
        /**
         * Enable or disable CCD (Continuous Collision Detection) for this rigid-body.
         *
         * @param enabled - If `true`, CCD will be enabled for this rigid-body.
         */
        enableCcd(enabled: boolean): void;
        /**
         * The world-space translation of this rigid-body.
         */
        translation(): Vector;
        /**
         * The world-space orientation of this rigid-body.
         */
        rotation(): Rotation;
        /**
         * The world-space next translation of this rigid-body.
         *
         * If this rigid-body is kinematic this value is set by the `setNextKinematicTranslation`
         * method and is used for estimating the kinematic body velocity at the next timestep.
         * For non-kinematic bodies, this value is currently unspecified.
         */
        nextTranslation(): Vector;
        /**
         * The world-space next orientation of this rigid-body.
         *
         * If this rigid-body is kinematic this value is set by the `setNextKinematicRotation`
         * method and is used for estimating the kinematic body velocity at the next timestep.
         * For non-kinematic bodies, this value is currently unspecified.
         */
        nextRotation(): Rotation;
        /**
         * Sets the translation of this rigid-body.
         *
         * @param tra - The world-space position of the rigid-body.
         * @param wakeUp - Forces the rigid-body to wake-up so it is properly affected by forces if it
         *                 wasn't moving before modifying its position.
         */
        setTranslation(tra: Vector, wakeUp: boolean): void;
        /**
         * Sets the linear velocity fo this rigid-body.
         *
         * @param vel - The linear velocity to set.
         * @param wakeUp - Forces the rigid-body to wake-up if it was asleep.
         */
        setLinvel(vel: Vector, wakeUp: boolean): void;
        /**
         * The scale factor applied to the gravity affecting
         * this rigid-body.
         */
        gravityScale(): number;
        /**
         * Sets the scale factor applied to the gravity affecting
         * this rigid-body.
         *
         * @param factor - The scale factor to set. A value of 0.0 means
         *   that this rigid-body will on longer be affected by gravity.
         * @param wakeUp - Forces the rigid-body to wake-up if it was asleep.
         */
        setGravityScale(factor: number, wakeUp: boolean): void;
        /**
         * Sets the rotation angle of this rigid-body.
         *
         * @param angle - The rotation angle, in radians.
         * @param wakeUp - Forces the rigid-body to wake-up so it is properly affected by forces if it
         * wasn't moving before modifying its position.
         */
        setRotation(angle: number, wakeUp: boolean): void;
        /**
         * Sets the angular velocity fo this rigid-body.
         *
         * @param vel - The angular velocity to set.
         * @param wakeUp - Forces the rigid-body to wake-up if it was asleep.
         */
        setAngvel(vel: number, wakeUp: boolean): void;
        /**
         * If this rigid body is kinematic, sets its future translation after the next timestep integration.
         *
         * This should be used instead of `rigidBody.setTranslation` to make the dynamic object
         * interacting with this kinematic body behave as expected. Internally, Rapier will compute
         * an artificial velocity for this rigid-body from its current position and its next kinematic
         * position. This velocity will be used to compute forces on dynamic bodies interacting with
         * this body.
         *
         * @param t - The kinematic translation to set.
         */
        setNextKinematicTranslation(t: Vector): void;
        /**
         * If this rigid body is kinematic, sets its future rotation after the next timestep integration.
         *
         * This should be used instead of `rigidBody.setRotation` to make the dynamic object
         * interacting with this kinematic body behave as expected. Internally, Rapier will compute
         * an artificial velocity for this rigid-body from its current position and its next kinematic
         * position. This velocity will be used to compute forces on dynamic bodies interacting with
         * this body.
         *
         * @param angle - The kinematic rotation angle, in radians.
         */
        setNextKinematicRotation(angle: number): void;
        /**
         * The linear velocity of this rigid-body.
         */
        linvel(): Vector;
        /**
         * The angular velocity of this rigid-body.
         */
        angvel(): number;
        /**
         * The mass of this rigid-body.
         */
        mass(): number;
        /**
         * The inverse mass taking into account translation locking.
         */
        effectiveInvMass(): Vector;
        /**
         * The inverse of the mass of a rigid-body.
         *
         * If this is zero, the rigid-body is assumed to have infinite mass.
         */
        invMass(): number;
        /**
         * The center of mass of a rigid-body expressed in its local-space.
         */
        localCom(): Vector;
        /**
         * The world-space center of mass of the rigid-body.
         */
        worldCom(): Vector;
        /**
         * The inverse of the principal angular inertia of the rigid-body.
         *
         * Components set to zero are assumed to be infinite along the corresponding principal axis.
         */
        invPrincipalInertiaSqrt(): number;
        /**
         * The angular inertia along the principal inertia axes of the rigid-body.
         */
        principalInertia(): number;
        /**
         * The square-root of the world-space inverse angular inertia tensor of the rigid-body,
         * taking into account rotation locking.
         */
        effectiveWorldInvInertiaSqrt(): number;
        /**
         * The effective world-space angular inertia (that takes the potential rotation locking into account) of
         * this rigid-body.
         */
        effectiveAngularInertia(): number;
        /**
         * Put this rigid body to sleep.
         *
         * A sleeping body no longer moves and is no longer simulated by the physics engine unless
         * it is waken up. It can be woken manually with `this.wakeUp()` or automatically due to
         * external forces like contacts.
         */
        sleep(): void;
        /**
         * Wakes this rigid-body up.
         *
         * A dynamic rigid-body that does not move during several consecutive frames will
         * be put to sleep by the physics engine, i.e., it will stop being simulated in order
         * to avoid useless computations.
         * This methods forces a sleeping rigid-body to wake-up. This is useful, e.g., before modifying
         * the position of a dynamic body so that it is properly simulated afterwards.
         */
        wakeUp(): void;
        /**
         * Is CCD enabled for this rigid-body?
         */
        isCcdEnabled(): boolean;
        /**
         * The number of colliders attached to this rigid-body.
         */
        numColliders(): number;
        /**
         * Retrieves the `i-th` collider attached to this rigid-body.
         *
         * @param i - The index of the collider to retrieve. Must be a number in `[0, this.numColliders()[`.
         *         This index is **not** the same as the unique identifier of the collider.
         */
        collider(i: number): Collider;
        /**
         * Sets whether this rigid-body is enabled or not.
         *
         * @param enabled - Set to `false` to disable this rigid-body and all its attached colliders.
         */
        setEnabled(enabled: boolean): void;
        /**
         * Is this rigid-body enabled?
         */
        isEnabled(): boolean;
        /**
         * The status of this rigid-body: static, dynamic, or kinematic.
         */
        bodyType(): RigidBodyType;
        /**
         * Set a new status for this rigid-body: static, dynamic, or kinematic.
         */
        setBodyType(type: RigidBodyType, wakeUp: boolean): void;
        /**
         * Is this rigid-body sleeping?
         */
        isSleeping(): boolean;
        /**
         * Is the velocity of this rigid-body not zero?
         */
        isMoving(): boolean;
        /**
         * Is this rigid-body static?
         */
        isFixed(): boolean;
        /**
         * Is this rigid-body kinematic?
         */
        isKinematic(): boolean;
        /**
         * Is this rigid-body dynamic?
         */
        isDynamic(): boolean;
        /**
         * The linear damping coefficient of this rigid-body.
         */
        linearDamping(): number;
        /**
         * The angular damping coefficient of this rigid-body.
         */
        angularDamping(): number;
        /**
         * Sets the linear damping factor applied to this rigid-body.
         *
         * @param factor - The damping factor to set.
         */
        setLinearDamping(factor: number): void;
        /**
         * Recompute the mass-properties of this rigid-bodies based on its currently attached colliders.
         */
        recomputeMassPropertiesFromColliders(): void;
        /**
         * Sets the rigid-body's additional mass.
         *
         * The total angular inertia of the rigid-body will be scaled automatically based on this additional mass. If this
         * scaling effect isn’t desired, use Self::additional_mass_properties instead of this method.
         *
         * This is only the "additional" mass because the total mass of the rigid-body is equal to the sum of this
         * additional mass and the mass computed from the colliders (with non-zero densities) attached to this rigid-body.
         *
         * That total mass (which includes the attached colliders’ contributions) will be updated at the name physics step,
         * or can be updated manually with `this.recomputeMassPropertiesFromColliders`.
         *
         * This will override any previous additional mass-properties set by `this.setAdditionalMass`,
         * `this.setAdditionalMassProperties`, `RigidBodyDesc::setAdditionalMass`, or
         * `RigidBodyDesc.setAdditionalMassfProperties` for this rigid-body.
         *
         * @param mass - The additional mass to set.
         * @param wakeUp - If `true` then the rigid-body will be woken up if it was put to sleep because it did not move for a while.
         */
        setAdditionalMass(mass: number, wakeUp: boolean): void;
        /**
         * Sets the rigid-body's additional mass-properties.
         *
         * This is only the "additional" mass-properties because the total mass-properties of the rigid-body is equal to the
         * sum of this additional mass-properties and the mass computed from the colliders (with non-zero densities) attached
         * to this rigid-body.
         *
         * That total mass-properties (which include the attached colliders’ contributions) will be updated at the name
         * physics step, or can be updated manually with `this.recomputeMassPropertiesFromColliders`.
         *
         * This will override any previous mass-properties set by `this.setAdditionalMass`,
         * `this.setAdditionalMassProperties`, `RigidBodyDesc.setAdditionalMass`, or `RigidBodyDesc.setAdditionalMassProperties`
         * for this rigid-body.
         *
         * If `wake_up` is true then the rigid-body will be woken up if it was put to sleep because it did not move for a while.
         */
        setAdditionalMassProperties(mass: number, centerOfMass: Vector, principalAngularInertia: number, wakeUp: boolean): void;
        /**
         * Sets the linear damping factor applied to this rigid-body.
         *
         * @param factor - The damping factor to set.
         */
        setAngularDamping(factor: number): void;
        /**
         * Resets to zero the user forces (but not torques) applied to this rigid-body.
         *
         * @param wakeUp - should the rigid-body be automatically woken-up?
         */
        resetForces(wakeUp: boolean): void;
        /**
         * Resets to zero the user torques applied to this rigid-body.
         *
         * @param wakeUp - should the rigid-body be automatically woken-up?
         */
        resetTorques(wakeUp: boolean): void;
        /**
         * Adds a force at the center-of-mass of this rigid-body.
         *
         * @param force - the world-space force to add to the rigid-body.
         * @param wakeUp - should the rigid-body be automatically woken-up?
         */
        addForce(force: Vector, wakeUp: boolean): void;
        /**
         * Applies an impulse at the center-of-mass of this rigid-body.
         *
         * @param impulse - the world-space impulse to apply on the rigid-body.
         * @param wakeUp - should the rigid-body be automatically woken-up?
         */
        applyImpulse(impulse: Vector, wakeUp: boolean): void;
        /**
         * Adds a torque at the center-of-mass of this rigid-body.
         *
         * @param torque - the torque to add to the rigid-body.
         * @param wakeUp - should the rigid-body be automatically woken-up?
         */
        addTorque(torque: number, wakeUp: boolean): void;
        /**
         * Applies an impulsive torque at the center-of-mass of this rigid-body.
         *
         * @param torqueImpulse - the torque impulse to apply on the rigid-body.
         * @param wakeUp - should the rigid-body be automatically woken-up?
         */
        applyTorqueImpulse(torqueImpulse: number, wakeUp: boolean): void;
        /**
         * Adds a force at the given world-space point of this rigid-body.
         *
         * @param force - the world-space force to add to the rigid-body.
         * @param point - the world-space point where the impulse is to be applied on the rigid-body.
         * @param wakeUp - should the rigid-body be automatically woken-up?
         */
        addForceAtPoint(force: Vector, point: Vector, wakeUp: boolean): void;
        /**
         * Applies an impulse at the given world-space point of this rigid-body.
         *
         * @param impulse - the world-space impulse to apply on the rigid-body.
         * @param point - the world-space point where the impulse is to be applied on the rigid-body.
         * @param wakeUp - should the rigid-body be automatically woken-up?
         */
        applyImpulseAtPoint(impulse: Vector, point: Vector, wakeUp: boolean): void;
    }
    class RigidBodyDesc {
        enabled: boolean;
        translation: Vector;
        rotation: Rotation;
        gravityScale: number;
        mass: number;
        massOnly: boolean;
        centerOfMass: Vector;
        translationsEnabledX: boolean;
        translationsEnabledY: boolean;
        linvel: Vector;
        angvel: number;
        principalAngularInertia: number;
        rotationsEnabled: boolean;
        linearDamping: number;
        angularDamping: number;
        status: RigidBodyType;
        canSleep: boolean;
        sleeping: boolean;
        ccdEnabled: boolean;
        dominanceGroup: number;
        userData?: unknown;
        constructor(status: RigidBodyType);
        /**
         * A rigid-body descriptor used to build a dynamic rigid-body.
         */
        static dynamic(): RigidBodyDesc;
        /**
         * A rigid-body descriptor used to build a position-based kinematic rigid-body.
         */
        static kinematicPositionBased(): RigidBodyDesc;
        /**
         * A rigid-body descriptor used to build a velocity-based kinematic rigid-body.
         */
        static kinematicVelocityBased(): RigidBodyDesc;
        /**
         * A rigid-body descriptor used to build a fixed rigid-body.
         */
        static fixed(): RigidBodyDesc;
        /**
         * A rigid-body descriptor used to build a dynamic rigid-body.
         *
         * @deprecated The method has been renamed to `.dynamic()`.
         */
        static newDynamic(): RigidBodyDesc;
        /**
         * A rigid-body descriptor used to build a position-based kinematic rigid-body.
         *
         * @deprecated The method has been renamed to `.kinematicPositionBased()`.
         */
        static newKinematicPositionBased(): RigidBodyDesc;
        /**
         * A rigid-body descriptor used to build a velocity-based kinematic rigid-body.
         *
         * @deprecated The method has been renamed to `.kinematicVelocityBased()`.
         */
        static newKinematicVelocityBased(): RigidBodyDesc;
        /**
         * A rigid-body descriptor used to build a fixed rigid-body.
         *
         * @deprecated The method has been renamed to `.fixed()`.
         */
        static newStatic(): RigidBodyDesc;
        setDominanceGroup(group: number): RigidBodyDesc;
        /**
         * Sets whether the created rigid-body will be enabled or disabled.
         * @param enabled − If set to `false` the rigid-body will be disabled at creation.
         */
        setEnabled(enabled: boolean): RigidBodyDesc;
        /**
         * Sets the initial translation of the rigid-body to create.
         */
        setTranslation(x: number, y: number): RigidBodyDesc;
        /**
         * Sets the initial rotation of the rigid-body to create.
         *
         * @param rot - The rotation to set.
         */
        setRotation(rot: Rotation): RigidBodyDesc;
        /**
         * Sets the scale factor applied to the gravity affecting
         * the rigid-body being built.
         *
         * @param scale - The scale factor. Set this to `0.0` if the rigid-body
         *   needs to ignore gravity.
         */
        setGravityScale(scale: number): RigidBodyDesc;
        /**
         * Sets the initial mass of the rigid-body being built, before adding colliders' contributions.
         *
         * @param mass − The initial mass of the rigid-body to create.
         */
        setAdditionalMass(mass: number): RigidBodyDesc;
        /**
         * Sets the initial linear velocity of the rigid-body to create.
         *
         * @param x - The linear velocity to set along the `x` axis.
         * @param y - The linear velocity to set along the `y` axis.
         */
        setLinvel(x: number, y: number): RigidBodyDesc;
        /**
         * Sets the initial angular velocity of the rigid-body to create.
         *
         * @param vel - The angular velocity to set.
         */
        setAngvel(vel: number): RigidBodyDesc;
        /**
         * Sets the mass properties of the rigid-body being built.
         *
         * Note that the final mass properties of the rigid-bodies depends
         * on the initial mass-properties of the rigid-body (set by this method)
         * to which is added the contributions of all the colliders with non-zero density
         * attached to this rigid-body.
         *
         * Therefore, if you want your provided mass properties to be the final
         * mass properties of your rigid-body, don't attach colliders to it, or
         * only attach colliders with densities equal to zero.
         *
         * @param mass − The initial mass of the rigid-body to create.
         * @param centerOfMass − The initial center-of-mass of the rigid-body to create.
         * @param principalAngularInertia − The initial principal angular inertia of the rigid-body to create.
         */
        setAdditionalMassProperties(mass: number, centerOfMass: Vector, principalAngularInertia: number): RigidBodyDesc;
        /**
         * Allow translation of this rigid-body only along specific axes.
         * @param translationsEnabledX - Are translations along the X axis enabled?
         * @param translationsEnabledY - Are translations along the y axis enabled?
         */
        enabledTranslations(translationsEnabledX: boolean, translationsEnabledY: boolean): RigidBodyDesc;
        /**
         * Allow translation of this rigid-body only along specific axes.
         * @param translationsEnabledX - Are translations along the X axis enabled?
         * @param translationsEnabledY - Are translations along the y axis enabled?
         * @deprecated use `this.enabledTranslations` with the same arguments instead.
         */
        restrictTranslations(translationsEnabledX: boolean, translationsEnabledY: boolean): RigidBodyDesc;
        /**
         * Locks all translations that would have resulted from forces on
         * the created rigid-body.
         */
        lockTranslations(): RigidBodyDesc;
        /**
         * Locks all rotations that would have resulted from forces on
         * the created rigid-body.
         */
        lockRotations(): RigidBodyDesc;
        /**
         * Sets the linear damping of the rigid-body to create.
         *
         * This will progressively slowdown the translational movement of the rigid-body.
         *
         * @param damping - The angular damping coefficient. Should be >= 0. The higher this
         *                  value is, the stronger the translational slowdown will be.
         */
        setLinearDamping(damping: number): RigidBodyDesc;
        /**
         * Sets the angular damping of the rigid-body to create.
         *
         * This will progressively slowdown the rotational movement of the rigid-body.
         *
         * @param damping - The angular damping coefficient. Should be >= 0. The higher this
         *                  value is, the stronger the rotational slowdown will be.
         */
        setAngularDamping(damping: number): RigidBodyDesc;
        /**
         * Sets whether or not the rigid-body to create can sleep.
         *
         * @param can - true if the rigid-body can sleep, false if it can't.
         */
        setCanSleep(can: boolean): RigidBodyDesc;
        /**
         * Sets whether or not the rigid-body is to be created asleep.
         *
         * @param can - true if the rigid-body should be in sleep, default false.
         */
        setSleeping(sleeping: boolean): RigidBodyDesc;
        /**
         * Sets whether Continuous Collision Detection (CCD) is enabled for this rigid-body.
         *
         * @param enabled - true if the rigid-body has CCD enabled.
         */
        setCcdEnabled(enabled: boolean): RigidBodyDesc;
        /**
         * Sets the user-defined object of this rigid-body.
         *
         * @param userData - The user-defined object to set.
         */
        setUserData(data?: unknown): RigidBodyDesc;
    }
    enum ActiveCollisionTypes {
        /**
         * Enable collision-detection between a collider attached to a dynamic body
         * and another collider attached to a dynamic body.
         */
        DYNAMIC_DYNAMIC = 1,
        /**
         * Enable collision-detection between a collider attached to a dynamic body
         * and another collider attached to a kinematic body.
         */
        DYNAMIC_KINEMATIC = 12,
        /**
         * Enable collision-detection between a collider attached to a dynamic body
         * and another collider attached to a fixed body (or not attached to any body).
         */
        DYNAMIC_FIXED = 2,
        /**
         * Enable collision-detection between a collider attached to a kinematic body
         * and another collider attached to a kinematic body.
         */
        KINEMATIC_KINEMATIC = 52224,
        /**
         * Enable collision-detection between a collider attached to a kinematic body
         * and another collider attached to a fixed body (or not attached to any body).
         */
        KINEMATIC_FIXED = 8704,
        /**
         * Enable collision-detection between a collider attached to a fixed body (or
         * not attached to any body) and another collider attached to a fixed body (or
         * not attached to any body).
         */
        FIXED_FIXED = 32,
        /**
         * The default active collision types, enabling collisions between a dynamic body
         * and another body of any type, but not enabling collisions between two non-dynamic bodies.
         */
        DEFAULT = 15,
        /**
         * Enable collisions between any kind of rigid-bodies (including between two non-dynamic bodies).
         */
        ALL = 60943
    }
    type ColliderHandle = number;
    class Collider {
        private colliderSet;
        readonly handle: ColliderHandle;
        public _shape;
        private _parent;
        constructor(colliderSet: ColliderSet, handle: ColliderHandle, parent: RigidBody | null, shape?: Shape);
        /** @internal */
        finalizeDeserialization(bodies: RigidBodySet): void;
        private ensureShapeIsCached;
        /**
         * The shape of this collider.
         */
        get shape(): Shape;
        /**
         * Checks if this collider is still valid (i.e. that it has
         * not been deleted from the collider set yet).
         */
        isValid(): boolean;
        /**
         * The world-space translation of this rigid-body.
         */
        translation(): Vector;
        /**
         * The world-space orientation of this rigid-body.
         */
        rotation(): Rotation;
        /**
         * Is this collider a sensor?
         */
        isSensor(): boolean;
        /**
         * Sets whether or not this collider is a sensor.
         * @param isSensor - If `true`, the collider will be a sensor.
         */
        setSensor(isSensor: boolean): void;
        /**
         * Sets the new shape of the collider.
         * @param shape - The collider’s new shape.
         */
        setShape(shape: Shape): void;
        /**
         * Sets whether this collider is enabled or not.
         *
         * @param enabled - Set to `false` to disable this collider (its parent rigid-body won’t be disabled automatically by this).
         */
        setEnabled(enabled: boolean): void;
        /**
         * Is this collider enabled?
         */
        isEnabled(): boolean;
        /**
         * Sets the restitution coefficient of the collider to be created.
         *
         * @param restitution - The restitution coefficient in `[0, 1]`. A value of 0 (the default) means no bouncing behavior
         *                   while 1 means perfect bouncing (though energy may still be lost due to numerical errors of the
         *                   constraints solver).
         */
        setRestitution(restitution: number): void;
        /**
         * Sets the friction coefficient of the collider to be created.
         *
         * @param friction - The friction coefficient. Must be greater or equal to 0. This is generally smaller than 1. The
         *                   higher the coefficient, the stronger friction forces will be for contacts with the collider
         *                   being built.
         */
        setFriction(friction: number): void;
        /**
         * Gets the rule used to combine the friction coefficients of two colliders
         * colliders involved in a contact.
         */
        frictionCombineRule(): CoefficientCombineRule;
        /**
         * Sets the rule used to combine the friction coefficients of two colliders
         * colliders involved in a contact.
         *
         * @param rule − The combine rule to apply.
         */
        setFrictionCombineRule(rule: CoefficientCombineRule): void;
        /**
         * Gets the rule used to combine the restitution coefficients of two colliders
         * colliders involved in a contact.
         */
        restitutionCombineRule(): CoefficientCombineRule;
        /**
         * Sets the rule used to combine the restitution coefficients of two colliders
         * colliders involved in a contact.
         *
         * @param rule − The combine rule to apply.
         */
        setRestitutionCombineRule(rule: CoefficientCombineRule): void;
        /**
         * Sets the collision groups used by this collider.
         *
         * Two colliders will interact iff. their collision groups are compatible.
         * See the documentation of `InteractionGroups` for details on teh used bit pattern.
         *
         * @param groups - The collision groups used for the collider being built.
         */
        setCollisionGroups(groups: InteractionGroups): void;
        /**
         * Sets the solver groups used by this collider.
         *
         * Forces between two colliders in contact will be computed iff their solver
         * groups are compatible.
         * See the documentation of `InteractionGroups` for details on the used bit pattern.
         *
         * @param groups - The solver groups used for the collider being built.
         */
        setSolverGroups(groups: InteractionGroups): void;
        /**
         * Get the physics hooks active for this collider.
         */
        activeHooks(): number;
        /**
         * Set the physics hooks active for this collider.
         *
         * Use this to enable custom filtering rules for contact/intersecstion pairs involving this collider.
         *
         * @param activeHooks - The hooks active for contact/intersection pairs involving this collider.
         */
        setActiveHooks(activeHooks: ActiveHooks): void;
        /**
         * The events active for this collider.
         */
        activeEvents(): ActiveEvents;
        /**
         * Set the events active for this collider.
         *
         * Use this to enable contact and/or intersection event reporting for this collider.
         *
         * @param activeEvents - The events active for contact/intersection pairs involving this collider.
         */
        setActiveEvents(activeEvents: ActiveEvents): void;
        /**
         * Gets the collision types active for this collider.
         */
        activeCollisionTypes(): ActiveCollisionTypes;
        /**
         * Sets the total force magnitude beyond which a contact force event can be emitted.
         *
         * @param threshold - The new force threshold.
         */
        setContactForceEventThreshold(threshold: number): void;
        /**
         * The total force magnitude beyond which a contact force event can be emitted.
         */
        contactForceEventThreshold(): number;
        /**
         * Set the collision types active for this collider.
         *
         * @param activeCollisionTypes - The hooks active for contact/intersection pairs involving this collider.
         */
        setActiveCollisionTypes(activeCollisionTypes: ActiveCollisionTypes): void;
        /**
         * Sets the uniform density of this collider.
         *
         * This will override any previous mass-properties set by `this.setDensity`,
         * `this.setMass`, `this.setMassProperties`, `ColliderDesc.density`,
         * `ColliderDesc.mass`, or `ColliderDesc.massProperties` for this collider.
         *
         * The mass and angular inertia of this collider will be computed automatically based on its
         * shape.
         */
        setDensity(density: number): void;
        /**
         * Sets the mass of this collider.
         *
         * This will override any previous mass-properties set by `this.setDensity`,
         * `this.setMass`, `this.setMassProperties`, `ColliderDesc.density`,
         * `ColliderDesc.mass`, or `ColliderDesc.massProperties` for this collider.
         *
         * The angular inertia of this collider will be computed automatically based on its shape
         * and this mass value.
         */
        setMass(mass: number): void;
        /**
         * Sets the mass of this collider.
         *
         * This will override any previous mass-properties set by `this.setDensity`,
         * `this.setMass`, `this.setMassProperties`, `ColliderDesc.density`,
         * `ColliderDesc.mass`, or `ColliderDesc.massProperties` for this collider.
         */
        setMassProperties(mass: number, centerOfMass: Vector, principalAngularInertia: number): void;
        /**
         * Sets the translation of this collider.
         *
         * @param tra - The world-space position of the collider.
         */
        setTranslation(tra: Vector): void;
        /**
         * Sets the translation of this collider relative to its parent rigid-body.
         *
         * Does nothing if this collider isn't attached to a rigid-body.
         *
         * @param tra - The new translation of the collider relative to its parent.
         */
        setTranslationWrtParent(tra: Vector): void;
        /**
         * Sets the rotation angle of this collider.
         *
         * @param angle - The rotation angle, in radians.
         */
        setRotation(angle: number): void;
        /**
         * Sets the rotation angle of this collider relative to its parent rigid-body.
         *
         * Does nothing if this collider isn't attached to a rigid-body.
         *
         * @param angle - The rotation angle, in radians.
         */
        setRotationWrtParent(angle: number): void;
        /**
         * The type of the shape of this collider.
         * @deprecated this field will be removed in the future, please access this field on `shape` member instead.
         */
        shapeType(): ShapeType;
        /**
         * The half-extents of this collider if it is a cuboid shape.
         * @deprecated this field will be removed in the future, please access this field on `shape` member instead.
         */
        halfExtents(): Vector;
        /**
         * Sets the half-extents of this collider if it is a cuboid shape.
         *
         * @param newHalfExtents - desired half extents.
         */
        setHalfExtents(newHalfExtents: Vector): void;
        /**
         * The radius of this collider if it is a ball, cylinder, capsule, or cone shape.
         * @deprecated this field will be removed in the future, please access this field on `shape` member instead.
         */
        radius(): number;
        /**
         * Sets the radius of this collider if it is a ball, cylinder, capsule, or cone shape.
         *
         * @param newRadius - desired radius.
         */
        setRadius(newRadius: number): void;
        /**
         * The radius of the round edges of this collider if it is a round cylinder.
         * @deprecated this field will be removed in the future, please access this field on `shape` member instead.
         */
        roundRadius(): number;
        /**
         * Sets the radius of the round edges of this collider if it has round edges.
         *
         * @param newBorderRadius - desired round edge radius.
         */
        setRoundRadius(newBorderRadius: number): void;
        /**
         * The half height of this collider if it is a cylinder, capsule, or cone shape.
         * @deprecated this field will be removed in the future, please access this field on `shape` member instead.
         */
        halfHeight(): number;
        /**
         * Sets the half height of this collider if it is a cylinder, capsule, or cone shape.
         *
         * @param newHalfheight - desired half height.
         */
        setHalfHeight(newHalfheight: number): void;
        /**
         * If this collider has a triangle mesh, polyline, convex polygon, or convex polyhedron shape,
         * this returns the vertex buffer of said shape.
         * @deprecated this field will be removed in the future, please access this field on `shape` member instead.
         */
        vertices(): Float32Array;
        /**
         * If this collider has a triangle mesh, polyline, or convex polyhedron shape,
         * this returns the index buffer of said shape.
         * @deprecated this field will be removed in the future, please access this field on `shape` member instead.
         */
        indices(): Uint32Array | undefined;
        /**
         * If this collider has a heightfield shape, this returns the heights buffer of
         * the heightfield.
         * In 3D, the returned height matrix is provided in column-major order.
         * @deprecated this field will be removed in the future, please access this field on `shape` member instead.
         */
        heightfieldHeights(): Float32Array;
        /**
         * If this collider has a heightfield shape, this returns the scale
         * applied to it.
         * @deprecated this field will be removed in the future, please access this field on `shape` member instead.
         */
        heightfieldScale(): Vector;
        /**
         * The rigid-body this collider is attached to.
         */
        parent(): RigidBody ;
        /**
         * The friction coefficient of this collider.
         */
        friction(): number;
        /**
         * The restitution coefficient of this collider.
         */
        restitution(): number;
        /**
         * The density of this collider.
         */
        density(): number;
        /**
         * The mass of this collider.
         */
        mass(): number;
        /**
         * The volume of this collider.
         */
        volume(): number;
        /**
         * The collision groups of this collider.
         */
        collisionGroups(): InteractionGroups;
        /**
         * The solver groups of this collider.
         */
        solverGroups(): InteractionGroups;
        /**
         * Tests if this collider contains a point.
         *
         * @param point - The point to test.
         */
        containsPoint(point: Vector): boolean;
        /**
         * Find the projection of a point on this collider.
         *
         * @param point - The point to project.
         * @param solid - If this is set to `true` then the collider shapes are considered to
         *   be plain (if the point is located inside of a plain shape, its projection is the point
         *   itself). If it is set to `false` the collider shapes are considered to be hollow
         *   (if the point is located inside of an hollow shape, it is projected on the shape's
         *   boundary).
         */
        projectPoint(point: Vector, solid: boolean): PointProjection | null;
        /**
         * Tests if this collider intersects the given ray.
         *
         * @param ray - The ray to cast.
         * @param maxToi - The maximum time-of-impact that can be reported by this cast. This effectively
         *   limits the length of the ray to `ray.dir.norm() * maxToi`.
         */
        intersectsRay(ray: Ray, maxToi: number): boolean;
        castShape(collider1Vel: Vector, shape2: Shape, shape2Pos: Vector, shape2Rot: Rotation, shape2Vel: Vector, maxToi: number, stopAtPenetration: boolean): ShapeTOI | null;
        castCollider(collider1Vel: Vector, collider2: Collider, collider2Vel: Vector, maxToi: number, stopAtPenetration: boolean): ShapeColliderTOI | null;
        intersectsShape(shape2: Shape, shapePos2: Vector, shapeRot2: Rotation): boolean;
        /**
         * Computes one pair of contact points between the shape owned by this collider and the given shape.
         *
         * @param shape2 - The second shape.
         * @param shape2Pos - The initial position of the second shape.
         * @param shape2Rot - The rotation of the second shape.
         * @param prediction - The prediction value, if the shapes are separated by a distance greater than this value, test will fail.
         * @returns `null` if the shapes are separated by a distance greater than prediction, otherwise contact details. The result is given in world-space.
         */
        contactShape(shape2: Shape, shape2Pos: Vector, shape2Rot: Rotation, prediction: number): ShapeContact | null;
        /**
         * Computes one pair of contact points between the collider and the given collider.
         *
         * @param collider2 - The second collider.
         * @param prediction - The prediction value, if the shapes are separated by a distance greater than this value, test will fail.
         * @returns `null` if the shapes are separated by a distance greater than prediction, otherwise contact details. The result is given in world-space.
         */
        contactCollider(collider2: Collider, prediction: number): ShapeContact | null;
        castRay(ray: Ray, maxToi: number, solid: boolean): number;
        /**
         * Find the closest intersection between a ray and this collider.
         *
         * This also computes the normal at the hit point.
         * @param ray - The ray to cast.
         * @param maxToi - The maximum time-of-impact that can be reported by this cast. This effectively
         *   limits the length of the ray to `ray.dir.norm() * maxToi`.
         * @param solid - If `false` then the ray will attempt to hit the boundary of a shape, even if its
         *   origin already lies inside of a shape. In other terms, `true` implies that all shapes are plain,
         *   whereas `false` implies that all shapes are hollow for this ray-cast.
         */
        castRayAndGetNormal(ray: Ray, maxToi: number, solid: boolean): RayIntersection | null;
    }
    class ShapeContact {
        /**
         * Distance between the two contact points.
         * If this is negative, this contact represents a penetration.
         */
        distance: number;

        /**
         * Position of the contact on the first shape.
         */
        point1: Vector;

        /**
         * Position of the contact on the second shape.
         */
        point2: Vector;

        /**
         * Contact normal, pointing towards the exterior of the first shape.
         */
        normal1: Vector;

        /**
         * Contact normal, pointing towards the exterior of the second shape.
         * If these contact data are expressed in world-space, this normal is equal to -normal1.
         */
        normal2: Vector;

        constructor(
            dist: number,
            point1: Vector,
            point2: Vector,
            normal1: Vector,
            normal2: Vector,
        )

        public static fromRaw(raw: RawShapeContact): ShapeContact
    }
    class PointColliderProjection {
        /**
         * The collider hit by the ray.
         */
        collider: Collider;
        /**
         * The projection of the point on the collider.
         */
        point: Vector;
        /**
         * Is the point inside of the collider?
         */
        isInside: boolean;

        /**
         * The type of the geometric feature the point was projected on.
         */

        /**
         * The id of the geometric feature the point was projected on.
         */
        featureId: number | undefined;

        constructor(
            collider: Collider,
            point: Vector,
            isInside: boolean,
            featureType?: FeatureType,
            featureId?: number,
        )

        public static fromRaw(
            colliderSet: ColliderSet,
            raw: RawPointColliderProjection,
        ): PointColliderProjection
    }
    class PointProjection {
        /**
         * The projection of the point on the collider.
         */
        point: Vector;
        /**
         * Is the point inside of the collider?
         */
        isInside: boolean;

        constructor(point: Vector, isInside: boolean)
        public static fromRaw(raw: RawPointProjection): PointProjection
    }
    class ShapeTOI {
        /**
         * The time of impact of the two shapes.
         */
        toi: number;
        /**
         * The local-space contact point on the first shape, at
         * the time of impact.
         */
        witness1: Vector;
        /**
         * The local-space contact point on the second shape, at
         * the time of impact.
         */
        witness2: Vector;
        /**
         * The local-space normal on the first shape, at
         * the time of impact.
         */
        normal1: Vector;
        /**
         * The local-space normal on the second shape, at
         * the time of impact.
         */
        normal2: Vector;

        constructor(
            toi: number,
            witness1: Vector,
            witness2: Vector,
            normal1: Vector,
            normal2: Vector,
        )

        public static fromRaw(
            colliderSet: ColliderSet,
            raw: RawShapeTOI,
        ): ShapeTOI
    }

    /**
     * The intersection between a ray and a collider.
     */
    export class ShapeColliderTOI extends ShapeTOI {
        /**
         * The handle of the collider hit by the ray.
         */
        collider: Collider;

        constructor(
            collider: Collider,
            toi: number,
            witness1: Vector,
            witness2: Vector,
            normal1: Vector,
            normal2: Vector,
        )

        public static fromRaw(
            colliderSet: ColliderSet,
            raw: RawShapeColliderTOI,
        ): ShapeColliderTOI
    }
    enum MassPropsMode {
        Density = 0,
        Mass = 1,
        MassProps = 2
    }
    class ColliderDesc {
        enabled: boolean;
        shape: Shape;
        massPropsMode: MassPropsMode;
        mass: number;
        centerOfMass: Vector;
        principalAngularInertia: number;
        rotationsEnabled: boolean;
        density: number;
        friction: number;
        restitution: number;
        rotation: Rotation;
        translation: Vector;
        isSensor: boolean;
        collisionGroups: InteractionGroups;
        solverGroups: InteractionGroups;
        frictionCombineRule: CoefficientCombineRule;
        restitutionCombineRule: CoefficientCombineRule;
        activeEvents: ActiveEvents;
        activeHooks: ActiveHooks;
        activeCollisionTypes: ActiveCollisionTypes;
        contactForceEventThreshold: number;
        /**
         * Initializes a collider descriptor from the collision shape.
         *
         * @param shape - The shape of the collider being built.
         */
        constructor(shape: Shape);
        /**
         * Create a new collider descriptor with a ball shape.
         *
         * @param radius - The radius of the ball.
         */
        static ball(radius: number): ColliderDesc;
        /**
         * Create a new collider descriptor with a capsule shape.
         *
         * @param halfHeight - The half-height of the capsule, along the `y` axis.
         * @param radius - The radius of the capsule basis.
         */
        static capsule(halfHeight: number, radius: number): ColliderDesc;
        /**
         * Creates a new segment shape.
         *
         * @param a - The first point of the segment.
         * @param b - The second point of the segment.
         */
        static segment(a: Vector, b: Vector): ColliderDesc;
        /**
         * Creates a new triangle shape.
         *
         * @param a - The first point of the triangle.
         * @param b - The second point of the triangle.
         * @param c - The third point of the triangle.
         */
        static triangle(a: Vector, b: Vector, c: Vector): ColliderDesc;
        /**
         * Creates a new triangle shape with round corners.
         *
         * @param a - The first point of the triangle.
         * @param b - The second point of the triangle.
         * @param c - The third point of the triangle.
         * @param borderRadius - The radius of the borders of this triangle. In 3D,
         *   this is also equal to half the thickness of the triangle.
         */
        static roundTriangle(a: Vector, b: Vector, c: Vector, borderRadius: number): ColliderDesc;
        /**
         * Creates a new collider descriptor with a polyline shape.
         *
         * @param vertices - The coordinates of the polyline's vertices.
         * @param indices - The indices of the polyline's segments. If this is `undefined` or `null`,
         *    the vertices are assumed to describe a line strip.
         */
        static polyline(vertices: Float32Array, indices?: Uint32Array | null): ColliderDesc;
        /**
         * Creates a new collider descriptor with a triangle mesh shape.
         *
         * @param vertices - The coordinates of the triangle mesh's vertices.
         * @param indices - The indices of the triangle mesh's triangles.
         */
        static trimesh(vertices: Float32Array, indices: Uint32Array): ColliderDesc;
        /**
         * Creates a new collider descriptor with a rectangular shape.
         *
         * @param hx - The half-width of the rectangle along its local `x` axis.
         * @param hy - The half-width of the rectangle along its local `y` axis.
         */
        static cuboid(hx: number, hy: number): ColliderDesc;
        /**
         * Creates a new collider descriptor with a rectangular shape with round borders.
         *
         * @param hx - The half-width of the rectangle along its local `x` axis.
         * @param hy - The half-width of the rectangle along its local `y` axis.
         * @param borderRadius - The radius of the cuboid's borders.
         */
        static roundCuboid(hx: number, hy: number, borderRadius: number): ColliderDesc;
        /**
         * Creates a new collider description with a halfspace (infinite plane) shape.
         *
         * @param normal - The outward normal of the plane.
         */
        static halfspace(normal: Vector): ColliderDesc;
        /**
         * Creates a new collider descriptor with a heightfield shape.
         *
         * @param heights - The heights of the heightfield, along its local `y` axis.
         * @param scale - The scale factor applied to the heightfield.
         */
        static heightfield(heights: Float32Array, scale: Vector): ColliderDesc;
        /**
         * Computes the convex-hull of the given points and use the resulting
         * convex polygon as the shape for this new collider descriptor.
         *
         * @param points - The point that will be used to compute the convex-hull.
         */
        static convexHull(points: Float32Array): ColliderDesc | null;
        /**
         * Creates a new collider descriptor that uses the given set of points assumed
         * to form a convex polyline (no convex-hull computation will be done).
         *
         * @param vertices - The vertices of the convex polyline.
         */
        static convexPolyline(vertices: Float32Array): ColliderDesc | null;
        /**
         * Computes the convex-hull of the given points and use the resulting
         * convex polygon as the shape for this new collider descriptor. A
         * border is added to that convex polygon to give it round corners.
         *
         * @param points - The point that will be used to compute the convex-hull.
         * @param borderRadius - The radius of the round border added to the convex polygon.
         */
        static roundConvexHull(points: Float32Array, borderRadius: number): ColliderDesc | null;
        /**
         * Creates a new collider descriptor that uses the given set of points assumed
         * to form a round convex polyline (no convex-hull computation will be done).
         *
         * @param vertices - The vertices of the convex polyline.
         * @param borderRadius - The radius of the round border added to the convex polyline.
         */
        static roundConvexPolyline(vertices: Float32Array, borderRadius: number): ColliderDesc | null;
        /**
         * Sets the position of the collider to be created relative to the rigid-body it is attached to.
         */
        setTranslation(x: number, y: number): ColliderDesc;
        /**
         * Sets the rotation of the collider to be created relative to the rigid-body it is attached to.
         *
         * @param rot - The rotation of the collider to be created relative to the rigid-body it is attached to.
         */
        setRotation(rot: Rotation): ColliderDesc;
        /**
         * Sets whether or not the collider being created is a sensor.
         *
         * A sensor collider does not take part of the physics simulation, but generates
         * proximity events.
         *
         * @param sensor - Set to `true` of the collider built is to be a sensor.
         */
        setSensor(sensor: boolean): ColliderDesc;
        /**
         * Sets whether the created collider will be enabled or disabled.
         * @param enabled − If set to `false` the collider will be disabled at creation.
         */
        setEnabled(enabled: boolean): ColliderDesc;
        /**
         * Sets the density of the collider being built.
         *
         * The mass and angular inertia tensor will be computed automatically based on this density and the collider’s shape.
         *
         * @param density - The density to set, must be greater or equal to 0. A density of 0 means that this collider
         *                  will not affect the mass or angular inertia of the rigid-body it is attached to.
         */
        setDensity(density: number): ColliderDesc;
        /**
         * Sets the mass of the collider being built.
         *
         * The angular inertia tensor will be computed automatically based on this mass and the collider’s shape.
         *
         * @param mass - The mass to set, must be greater or equal to 0.
         */
        setMass(mass: number): ColliderDesc;
        /**
         * Sets the mass properties of the collider being built.
         *
         * This replaces the mass-properties automatically computed from the collider's density and shape.
         * These mass-properties will be added to the mass-properties of the rigid-body this collider will be attached to.
         *
         * @param mass − The mass of the collider to create.
         * @param centerOfMass − The center-of-mass of the collider to create.
         * @param principalAngularInertia − The principal angular inertia of the collider to create.
         */
        setMassProperties(mass: number, centerOfMass: Vector, principalAngularInertia: number): ColliderDesc;
        /**
         * Sets the restitution coefficient of the collider to be created.
         *
         * @param restitution - The restitution coefficient in `[0, 1]`. A value of 0 (the default) means no bouncing behavior
         *                   while 1 means perfect bouncing (though energy may still be lost due to numerical errors of the
         *                   constraints solver).
         */
        setRestitution(restitution: number): ColliderDesc;
        /**
         * Sets the friction coefficient of the collider to be created.
         *
         * @param friction - The friction coefficient. Must be greater or equal to 0. This is generally smaller than 1. The
         *                   higher the coefficient, the stronger friction forces will be for contacts with the collider
         *                   being built.
         */
        setFriction(friction: number): ColliderDesc;
        /**
         * Sets the rule used to combine the friction coefficients of two colliders
         * colliders involved in a contact.
         *
         * @param rule − The combine rule to apply.
         */
        setFrictionCombineRule(rule: CoefficientCombineRule): ColliderDesc;
        /**
         * Sets the rule used to combine the restitution coefficients of two colliders
         * colliders involved in a contact.
         *
         * @param rule − The combine rule to apply.
         */
        setRestitutionCombineRule(rule: CoefficientCombineRule): ColliderDesc;
        /**
         * Sets the collision groups used by this collider.
         *
         * Two colliders will interact iff. their collision groups are compatible.
         * See the documentation of `InteractionGroups` for details on teh used bit pattern.
         *
         * @param groups - The collision groups used for the collider being built.
         */
        setCollisionGroups(groups: InteractionGroups): ColliderDesc;
        /**
         * Sets the solver groups used by this collider.
         *
         * Forces between two colliders in contact will be computed iff their solver
         * groups are compatible.
         * See the documentation of `InteractionGroups` for details on the used bit pattern.
         *
         * @param groups - The solver groups used for the collider being built.
         */
        setSolverGroups(groups: InteractionGroups): ColliderDesc;
        /**
         * Set the physics hooks active for this collider.
         *
         * Use this to enable custom filtering rules for contact/intersecstion pairs involving this collider.
         *
         * @param activeHooks - The hooks active for contact/intersection pairs involving this collider.
         */
        setActiveHooks(activeHooks: ActiveHooks): ColliderDesc;
        /**
         * Set the events active for this collider.
         *
         * Use this to enable contact and/or intersection event reporting for this collider.
         *
         * @param activeEvents - The events active for contact/intersection pairs involving this collider.
         */
        setActiveEvents(activeEvents: ActiveEvents): ColliderDesc;
        /**
         * Set the collision types active for this collider.
         *
         * @param activeCollisionTypes - The hooks active for contact/intersection pairs involving this collider.
         */
        setActiveCollisionTypes(activeCollisionTypes: ActiveCollisionTypes): ColliderDesc;
        /**
         * Sets the total force magnitude beyond which a contact force event can be emitted.
         *
         * @param threshold - The force threshold to set.
         */
        setContactForceEventThreshold(threshold: number): ColliderDesc;
    }
    abstract class Shape {
        abstract intoRaw(): RawShape;
        /**
         * The concrete type of this shape.
         */
        abstract get type(): ShapeType;
        /**
         * instant mode without cache
         */
        static fromRaw(rawSet: RawColliderSet, handle: ColliderHandle): Shape;
        /**
         * Computes the time of impact between two moving shapes.
         * @param shapePos1 - The initial position of this sahpe.
         * @param shapeRot1 - The rotation of this shape.
         * @param shapeVel1 - The velocity of this shape.
         * @param shape2 - The second moving shape.
         * @param shapePos2 - The initial position of the second shape.
         * @param shapeRot2 - The rotation of the second shape.
         * @param shapeVel2 - The velocity of the second shape.
         * @param maxToi - The maximum time when the impact can happen.
         * @param stopAtPenetration - If set to `false`, the linear shape-cast won’t immediately stop if
         *   the shape is penetrating another shape at its starting point **and** its trajectory is such
         *   that it’s on a path to exist that penetration state.
         * @returns If the two moving shapes collider at some point along their trajectories, this returns the
         *  time at which the two shape collider as well as the contact information during the impact. Returns
         *  `null`if the two shapes never collide along their paths.
         */
        castShape(shapePos1: Vector, shapeRot1: Rotation, shapeVel1: Vector, shape2: Shape, shapePos2: Vector, shapeRot2: Rotation, shapeVel2: Vector, maxToi: number, stopAtPenetration: boolean): ShapeTOI | null;
        /**
         * Tests if this shape intersects another shape.
         *
         * @param shapePos1 - The position of this shape.
         * @param shapeRot1 - The rotation of this shape.
         * @param shape2  - The second shape to test.
         * @param shapePos2 - The position of the second shape.
         * @param shapeRot2 - The rotation of the second shape.
         * @returns `true` if the two shapes intersect, `false` if they don’t.
         */
        intersectsShape(shapePos1: Vector, shapeRot1: Rotation, shape2: Shape, shapePos2: Vector, shapeRot2: Rotation): boolean;
        /**
         * Computes one pair of contact points between two shapes.
         *
         * @param shapePos1 - The initial position of this sahpe.
         * @param shapeRot1 - The rotation of this shape.
         * @param shape2 - The second shape.
         * @param shapePos2 - The initial position of the second shape.
         * @param shapeRot2 - The rotation of the second shape.
         * @param prediction - The prediction value, if the shapes are separated by a distance greater than this value, test will fail.
         * @returns `null` if the shapes are separated by a distance greater than prediction, otherwise contact details. The result is given in world-space.
         */
        contactShape(shapePos1: Vector, shapeRot1: Rotation, shape2: Shape, shapePos2: Vector, shapeRot2: Rotation, prediction: number): ShapeContact | null;
        containsPoint(shapePos: Vector, shapeRot: Rotation, point: Vector): boolean;
        projectPoint(shapePos: Vector, shapeRot: Rotation, point: Vector, solid: boolean): PointProjection;
        intersectsRay(ray: Ray, shapePos: Vector, shapeRot: Rotation, maxToi: number): boolean;
        castRay(ray: Ray, shapePos: Vector, shapeRot: Rotation, maxToi: number, solid: boolean): number;
        castRayAndGetNormal(ray: Ray, shapePos: Vector, shapeRot: Rotation, maxToi: number, solid: boolean): RayIntersection;
    }
    enum ShapeType {
        Ball = 0,
        Cuboid = 1,
        Capsule = 2,
        Segment = 3,
        Polyline = 4,
        Triangle = 5,
        TriMesh = 6,
        HeightField = 7,
        ConvexPolygon = 9,
        RoundCuboid = 10,
        RoundTriangle = 11,
        RoundConvexPolygon = 12,
        HalfSpace = 13
    }
    class Ball extends Shape {
        readonly type = ShapeType.Ball;
        /**
         * The balls radius.
         */
        radius: number;
        /**
         * Creates a new ball with the given radius.
         * @param radius - The balls radius.
         */
        constructor(radius: number);
        intoRaw(): RawShape;
    }
    class HalfSpace extends Shape {
        readonly type = ShapeType.HalfSpace;
        /**
         * The outward normal of the half-space.
         */
        normal: Vector;
        /**
         * Creates a new halfspace delimited by an infinite plane.
         *
         * @param normal - The outward normal of the plane.
         */
        constructor(normal: Vector);
        intoRaw(): RawShape;
    }
    class Cuboid extends Shape {
        readonly type = ShapeType.Cuboid;
        /**
         * The half extent of the cuboid along each coordinate axis.
         */
        halfExtents: Vector;
        /**
         * Creates a new 2D rectangle.
         * @param hx - The half width of the rectangle.
         * @param hy - The helf height of the rectangle.
         */
        constructor(hx: number, hy: number);
        intoRaw(): RawShape;
    }
    class IntegrationParameters {
        raw: RawIntegrationParameters;

        constructor(raw?: RawIntegrationParameters)

        /**
         * Free the WASM memory used by these integration parameters.
         */
        public free()

        /**
         * The timestep length (default: `1.0 / 60.0`)
         */
        get dt(): number
        /**
         * The Error Reduction Parameter in `[0, 1]` is the proportion of
         * the positional error to be corrected at each time step (default: `0.2`).
         */
        get erp(): number

        /**
         * Amount of penetration the engine wont attempt to correct (default: `0.001m`).
         */
        get allowedLinearError(): number

        /**
         * The maximal distance separating two objects that will generate predictive contacts (default: `0.002`).
         */
        get predictionDistance(): number
        /**
         * The number of solver iterations run by the constraints solver for calculating forces (default: `4`).
         */
        get numSolverIterations(): number

        /**
         * Number of addition friction resolution iteration run during the last solver sub-step (default: `4`).
         */
        get numAdditionalFrictionIterations(): number

        /**
         * Number of internal Project Gauss Seidel (PGS) iterations run at each solver iteration (default: `1`).
         */
        get numInternalPgsIterations(): number
        /**
         * Minimum number of dynamic bodies in each active island (default: `128`).
         */
        get minIslandSize(): number

        /**
         * Maximum number of substeps performed by the  solver (default: `1`).
         */
        get maxCcdSubsteps(): number

        set dt(value: number)

        set erp(value: number)

        set allowedLinearError(value: number)

        set predictionDistance(value: number)

        /**
         * Sets the number of solver iterations run by the constraints solver for calculating forces (default: `4`).
         */
        set numSolverIterations(value: number)
        /**
         * Sets the number of addition friction resolution iteration run during the last solver sub-step (default: `4`).
         */
        set numAdditionalFrictionIterations(value: number)

        /**
         * Sets the number of internal Project Gauss Seidel (PGS) iterations run at each solver iteration (default: `1`).
         */
        set numInternalPgsIterations(value: number)

        set minIslandSize(value: number)

        set maxCcdSubsteps(value: number)

        public switchToStandardPgsSolver()

        public switchToSmallStepsPgsSolver()
    }
    class BroadPhase {
        raw: RawBroadPhase;

        /**
         * Release the WASM memory occupied by this broad-phase.
         */
        public free()

        constructor(raw?: RawBroadPhase)
    }
    class NarrowPhase {
        raw: RawNarrowPhase;
        tempManifold: TempContactManifold;

        /**
         * Release the WASM memory occupied by this narrow-phase.
         */
        public free()

        constructor(raw?: RawNarrowPhase)
        /**
         * Enumerates all the colliders potentially in contact with the given collider.
         *
         * @param collider1 - The second collider involved in the contact.
         * @param f - Closure that will be called on each collider that is in contact with `collider1`.
         */
        public contactPairsWith(
            collider1: ColliderHandle,
            f: (collider2: ColliderHandle) => void,
        )

        /**
         * Enumerates all the colliders intersecting the given colliders, assuming one of them
         * is a sensor.
         */
        public intersectionPairsWith(
            collider1: ColliderHandle,
            f: (collider2: ColliderHandle) => void,
        )

        /**
         * Iterates through all the contact manifolds between the given pair of colliders.
         *
         * @param collider1 - The first collider involved in the contact.
         * @param collider2 - The second collider involved in the contact.
         * @param f - Closure that will be called on each contact manifold between the two colliders. If the second argument
         *            passed to this closure is `true`, then the contact manifold data is flipped, i.e., methods like `localNormal1`
         *            actually apply to the `collider2` and fields like `localNormal2` apply to the `collider1`.
         */
        public contactPair(
            collider1: ColliderHandle,
            collider2: ColliderHandle,
            f: (manifold: TempContactManifold, flipped: boolean) => void,
        )

        /**
         * Returns `true` if `collider1` and `collider2` intersect and at least one of them is a sensor.
         * @param collider1 − The first collider involved in the intersection.
         * @param collider2 − The second collider involved in the intersection.
         */
        public intersectionPair(
            collider1: ColliderHandle,
            collider2: ColliderHandle,
        ): boolean
    }

    export class TempContactManifold {
        raw: RawContactManifold;

        public free()

        constructor(raw: RawContactManifold)

        public normal(): Vector

        public localNormal1(): Vector

        public localNormal2(): Vector

        public subshape1(): number

        public subshape2(): number

        public numContacts(): number

        public localContactPoint1(i: number): Vector | null

        public localContactPoint2(i: number): Vector | null

        public contactDist(i: number): number

        public contactFid1(i: number): number

        public contactFid2(i: number): number

        public contactImpulse(i: number): number

        // #if DIM2
        public contactTangentImpulse(i: number): number
        // #endif

        // #if DIM3
        public contactTangentImpulseX(i: number): number

        public contactTangentImpulseY(i: number): number
        // #endif

        public numSolverContacts(): number

        public solverContactPoint(i: number): Vector

        public solverContactDist(i: number): number

        public solverContactFriction(i: number): number

        public solverContactRestitution(i: number): number

        public solverContactTangentVelocity(i: number): Vector
    }
    class CCDSolver {
        raw: RawCCDSolver;

        /**
         * Release the WASM memory occupied by this narrow-phase.
         */
        public free()

        constructor(raw?: RawCCDSolver)
    }
    class QueryPipeline {
        raw: RawQueryPipeline;

        /**
         * Release the WASM memory occupied by this query pipeline.
         */
        free()

        constructor(raw?: RawQueryPipeline)

        /**
         * Updates the acceleration structure of the query pipeline.
         * @param bodies - The set of rigid-bodies taking part in this pipeline.
         * @param colliders - The set of colliders taking part in this pipeline.
         */
        public update(bodies: RigidBodySet, colliders: ColliderSet)

        /**
         * Find the closest intersection between a ray and a set of collider.
         *
         * @param colliders - The set of colliders taking part in this pipeline.
         * @param ray - The ray to cast.
         * @param maxToi - The maximum time-of-impact that can be reported by this cast. This effectively
         *   limits the length of the ray to `ray.dir.norm() * maxToi`.
         * @param solid - If `false` then the ray will attempt to hit the boundary of a shape, even if its
         *   origin already lies inside of a shape. In other terms, `true` implies that all shapes are plain,
         *   whereas `false` implies that all shapes are hollow for this ray-cast.
         * @param groups - Used to filter the colliders that can or cannot be hit by the ray.
         * @param filter - The callback to filter out which collider will be hit.
         */
        public castRay(
            bodies: RigidBodySet,
            colliders: ColliderSet,
            ray: Ray,
            maxToi: number,
            solid: boolean,
            filterFlags?: QueryFilterFlags,
            filterGroups?: InteractionGroups,
            filterExcludeCollider?: ColliderHandle,
            filterExcludeRigidBody?: RigidBodyHandle,
            filterPredicate?: (collider: ColliderHandle) => boolean,
        ): RayColliderToi | null

        /**
         * Find the closest intersection between a ray and a set of collider.
         *
         * This also computes the normal at the hit point.
         * @param colliders - The set of colliders taking part in this pipeline.
         * @param ray - The ray to cast.
         * @param maxToi - The maximum time-of-impact that can be reported by this cast. This effectively
         *   limits the length of the ray to `ray.dir.norm() * maxToi`.
         * @param solid - If `false` then the ray will attempt to hit the boundary of a shape, even if its
         *   origin already lies inside of a shape. In other terms, `true` implies that all shapes are plain,
         *   whereas `false` implies that all shapes are hollow for this ray-cast.
         * @param groups - Used to filter the colliders that can or cannot be hit by the ray.
         */
        public castRayAndGetNormal(
            bodies: RigidBodySet,
            colliders: ColliderSet,
            ray: Ray,
            maxToi: number,
            solid: boolean,
            filterFlags?: QueryFilterFlags,
            filterGroups?: InteractionGroups,
            filterExcludeCollider?: ColliderHandle,
            filterExcludeRigidBody?: RigidBodyHandle,
            filterPredicate?: (collider: ColliderHandle) => boolean,
        ): RayColliderIntersection | null

        /**
         * Cast a ray and collects all the intersections between a ray and the scene.
         *
         * @param colliders - The set of colliders taking part in this pipeline.
         * @param ray - The ray to cast.
         * @param maxToi - The maximum time-of-impact that can be reported by this cast. This effectively
         *   limits the length of the ray to `ray.dir.norm() * maxToi`.
         * @param solid - If `false` then the ray will attempt to hit the boundary of a shape, even if its
         *   origin already lies inside of a shape. In other terms, `true` implies that all shapes are plain,
         *   whereas `false` implies that all shapes are hollow for this ray-cast.
         * @param groups - Used to filter the colliders that can or cannot be hit by the ray.
         * @param callback - The callback called once per hit (in no particular order) between a ray and a collider.
         *   If this callback returns `false`, then the cast will stop and no further hits will be detected/reported.
         */
        public intersectionsWithRay(
            bodies: RigidBodySet,
            colliders: ColliderSet,
            ray: Ray,
            maxToi: number,
            solid: boolean,
            callback: (intersect: RayColliderIntersection) => boolean,
            filterFlags?: QueryFilterFlags,
            filterGroups?: InteractionGroups,
            filterExcludeCollider?: ColliderHandle,
            filterExcludeRigidBody?: RigidBodyHandle,
            filterPredicate?: (collider: ColliderHandle) => boolean,
        )

        /**
         * Gets the handle of up to one collider intersecting the given shape.
         *
         * @param colliders - The set of colliders taking part in this pipeline.
         * @param shapePos - The position of the shape used for the intersection test.
         * @param shapeRot - The orientation of the shape used for the intersection test.
         * @param shape - The shape used for the intersection test.
         * @param groups - The bit groups and filter associated to the ray, in order to only
         *   hit the colliders with collision groups compatible with the ray's group.
         */
        public intersectionWithShape(
            bodies: RigidBodySet,
            colliders: ColliderSet,
            shapePos: Vector,
            shapeRot: Rotation,
            shape: Shape,
            filterFlags?: QueryFilterFlags,
            filterGroups?: InteractionGroups,
            filterExcludeCollider?: ColliderHandle,
            filterExcludeRigidBody?: RigidBodyHandle,
            filterPredicate?: (collider: ColliderHandle) => boolean,
        ): ColliderHandle | null

        /**
         * Find the projection of a point on the closest collider.
         *
         * @param colliders - The set of colliders taking part in this pipeline.
         * @param point - The point to project.
         * @param solid - If this is set to `true` then the collider shapes are considered to
         *   be plain (if the point is located inside of a plain shape, its projection is the point
         *   itself). If it is set to `false` the collider shapes are considered to be hollow
         *   (if the point is located inside of an hollow shape, it is projected on the shape's
         *   boundary).
         * @param groups - The bit groups and filter associated to the point to project, in order to only
         *   project on colliders with collision groups compatible with the ray's group.
         */
        public projectPoint(
            bodies: RigidBodySet,
            colliders: ColliderSet,
            point: Vector,
            solid: boolean,
            filterFlags?: QueryFilterFlags,
            filterGroups?: InteractionGroups,
            filterExcludeCollider?: ColliderHandle,
            filterExcludeRigidBody?: RigidBodyHandle,
            filterPredicate?: (collider: ColliderHandle) => boolean,
        ): PointColliderProjection | null

        /**
         * Find the projection of a point on the closest collider.
         *
         * @param colliders - The set of colliders taking part in this pipeline.
         * @param point - The point to project.
         * @param groups - The bit groups and filter associated to the point to project, in order to only
         *   project on colliders with collision groups compatible with the ray's group.
         */
        public projectPointAndGetFeature(
            bodies: RigidBodySet,
            colliders: ColliderSet,
            point: Vector,
            filterFlags?: QueryFilterFlags,
            filterGroups?: InteractionGroups,
            filterExcludeCollider?: ColliderHandle,
            filterExcludeRigidBody?: RigidBodyHandle,
            filterPredicate?: (collider: ColliderHandle) => boolean,
        ): PointColliderProjection | null

        /**
         * Find all the colliders containing the given point.
         *
         * @param colliders - The set of colliders taking part in this pipeline.
         * @param point - The point used for the containment test.
         * @param groups - The bit groups and filter associated to the point to test, in order to only
         *   test on colliders with collision groups compatible with the ray's group.
         * @param callback - A function called with the handles of each collider with a shape
         *   containing the `point`.
         */
        public intersectionsWithPoint(
            bodies: RigidBodySet,
            colliders: ColliderSet,
            point: Vector,
            callback: (handle: ColliderHandle) => boolean,
            filterFlags?: QueryFilterFlags,
            filterGroups?: InteractionGroups,
            filterExcludeCollider?: ColliderHandle,
            filterExcludeRigidBody?: RigidBodyHandle,
            filterPredicate?: (collider: ColliderHandle) => boolean,
        )
        /**
         * Casts a shape at a constant linear velocity and retrieve the first collider it hits.
         * This is similar to ray-casting except that we are casting a whole shape instead of
         * just a point (the ray origin).
         *
         * @param colliders - The set of colliders taking part in this pipeline.
         * @param shapePos - The initial position of the shape to cast.
         * @param shapeRot - The initial rotation of the shape to cast.
         * @param shapeVel - The constant velocity of the shape to cast (i.e. the cast direction).
         * @param shape - The shape to cast.
         * @param maxToi - The maximum time-of-impact that can be reported by this cast. This effectively
         *   limits the distance traveled by the shape to `shapeVel.norm() * maxToi`.
         * @param stopAtPenetration - If set to `false`, the linear shape-cast won’t immediately stop if
         *   the shape is penetrating another shape at its starting point **and** its trajectory is such
         *   that it’s on a path to exist that penetration state.
         * @param groups - The bit groups and filter associated to the shape to cast, in order to only
         *   test on colliders with collision groups compatible with this group.
         */
        public castShape(
            bodies: RigidBodySet,
            colliders: ColliderSet,
            shapePos: Vector,
            shapeRot: Rotation,
            shapeVel: Vector,
            shape: Shape,
            maxToi: number,
            stopAtPenetration: boolean,
            filterFlags?: QueryFilterFlags,
            filterGroups?: InteractionGroups,
            filterExcludeCollider?: ColliderHandle,
            filterExcludeRigidBody?: RigidBodyHandle,
            filterPredicate?: (collider: ColliderHandle) => boolean,
        ): ShapeColliderTOI | null
        /**
         * Retrieve all the colliders intersecting the given shape.
         *
         * @param colliders - The set of colliders taking part in this pipeline.
         * @param shapePos - The position of the shape to test.
         * @param shapeRot - The orientation of the shape to test.
         * @param shape - The shape to test.
         * @param groups - The bit groups and filter associated to the shape to test, in order to only
         *   test on colliders with collision groups compatible with this group.
         * @param callback - A function called with the handles of each collider intersecting the `shape`.
         */
        public intersectionsWithShape(
            bodies: RigidBodySet,
            colliders: ColliderSet,
            shapePos: Vector,
            shapeRot: Rotation,
            shape: Shape,
            callback: (handle: ColliderHandle) => boolean,
            filterFlags?: QueryFilterFlags,
            filterGroups?: InteractionGroups,
            filterExcludeCollider?: ColliderHandle,
            filterExcludeRigidBody?: RigidBodyHandle,
            filterPredicate?: (collider: ColliderHandle) => boolean,
        )
        /**
         * Finds the handles of all the colliders with an AABB intersecting the given AABB.
         *
         * @param aabbCenter - The center of the AABB to test.
         * @param aabbHalfExtents - The half-extents of the AABB to test.
         * @param callback - The callback that will be called with the handles of all the colliders
         *                   currently intersecting the given AABB.
         */
        public collidersWithAabbIntersectingAabb(
            aabbCenter: Vector,
            aabbHalfExtents: Vector,
            callback: (handle: ColliderHandle) => boolean,
        )
    }
    class KinematicCharacterController {
        constructor(
            offset: number,
            params: IntegrationParameters,
            bodies: RigidBodySet,
            colliders: ColliderSet,
            queries: QueryPipeline,
        )
        public free()
        public up(): Vector
        public setUp(vector: Vector)
        public applyImpulsesToDynamicBodies(): boolean
        public setApplyImpulsesToDynamicBodies(enabled: boolean)
        public characterMass(): number | null
        public setCharacterMass(mass: number | null)
        public offset(): number
        public setOffset(value: number)
        public slideEnabled(): boolean
        public setSlideEnabled(enabled: boolean)
        public autostepMaxHeight(): number | null
        public autostepMinWidth(): number | null
        public autostepIncludesDynamicBodies(): boolean | null

        /**
         * Is automatically stepping over small objects enabled?
         */
        public autostepEnabled(): boolean
        /**
         * Enabled automatically stepping over small objects.
         *
         * @param maxHeight - The maximum step height a character can automatically step over.
         * @param minWidth - The minimum width of free space that must be available after stepping on a stair.
         * @param includeDynamicBodies - Can the character automatically step over dynamic bodies too?
         */
        public enableAutostep(
            maxHeight: number,
            minWidth: number,
            includeDynamicBodies: boolean,
        )

        /**
         * Disable automatically stepping over small objects.
         */
        public disableAutostep()

        /**
         * The maximum angle (radians) between the floor’s normal and the `up` vector that the
         * character is able to climb.
         */
        public maxSlopeClimbAngle(): number

        /**
         * Sets the maximum angle (radians) between the floor’s normal and the `up` vector that the
         * character is able to climb.
         */
        public setMaxSlopeClimbAngle(angle: number)

        /**
         * The minimum angle (radians) between the floor’s normal and the `up` vector before the
         * character starts to slide down automatically.
         */
        public minSlopeSlideAngle(): number

        /**
         * Sets the minimum angle (radians) between the floor’s normal and the `up` vector before the
         * character starts to slide down automatically.
         */
        public setMinSlopeSlideAngle(angle: number)

        /**
         * If snap-to-ground is enabled, should the character be automatically snapped to the ground if
         * the distance between the ground and its feet are smaller than the specified threshold?
         */
        public snapToGroundDistance(): number | null

        /**
         * Enables automatically snapping the character to the ground if the distance between
         * the ground and its feet are smaller than the specified threshold.
         */
        public enableSnapToGround(distance: number)

        /**
         * Disables automatically snapping the character to the ground.
         */
        public disableSnapToGround()
        /**
         * Is automatically snapping the character to the ground enabled?
         */
        public snapToGroundEnabled(): boolean

        /**
         * Computes the movement the given collider is able to execute after hitting and sliding on obstacles.
         *
         * @param collider - The collider to move.
         * @param desiredTranslationDelta - The desired collider movement.
         * @param filterFlags - Flags for excluding whole subsets of colliders from the obstacles taken into account.
         * @param filterGroups - Groups for excluding colliders with incompatible collision groups from the obstacles
         *                       taken into account.
         * @param filterPredicate - Any collider for which this closure returns `false` will be excluded from the
         *                          obstacles taken into account.
         */
        public computeColliderMovement(
            collider: Collider,
            desiredTranslationDelta: Vector,
            filterFlags?: QueryFilterFlags,
            filterGroups?: InteractionGroups,
            filterPredicate?: (collider: Collider) => boolean,
        )

        /**
         * The movement computed by the last call to `this.computeColliderMovement`.
         */
        public computedMovement(): Vector

        /**
         * The result of ground detection computed by the last call to `this.computeColliderMovement`.
         */
        public computedGrounded(): boolean

        /**
         * The number of collisions against obstacles detected along the path of the last call
         * to `this.computeColliderMovement`.
         */
        public numComputedCollisions(): number

        /**
         * Returns the collision against one of the obstacles detected along the path of the last
         * call to `this.computeColliderMovement`.
         *
         * @param i - The i-th collision will be returned.
         * @param out - If this argument is set, it will be filled with the collision information.
         */
        public computedCollision(
            i: number,
            out?: CharacterCollision,
        ): CharacterCollision | null
    }
    class SerializationPipeline {
        raw: RawSerializationPipeline;
    
        /**
         * Release the WASM memory occupied by this serialization pipeline.
         */
        free()
    
        constructor(raw?: RawSerializationPipeline)
    
        /**
         * Serialize a complete physics state into a single byte array.
         * @param gravity - The current gravity affecting the simulation.
         * @param integrationParameters - The integration parameters of the simulation.
         * @param broadPhase - The broad-phase of the simulation.
         * @param narrowPhase - The narrow-phase of the simulation.
         * @param bodies - The rigid-bodies taking part into the simulation.
         * @param colliders - The colliders taking part into the simulation.
         * @param impulseJoints - The impulse joints taking part into the simulation.
         * @param multibodyJoints - The multibody joints taking part into the simulation.
         */
        public serializeAll(
            gravity: Vector,
            integrationParameters: IntegrationParameters,
            islands: IslandManager,
            broadPhase: BroadPhase,
            narrowPhase: NarrowPhase,
            bodies: RigidBodySet,
            colliders: ColliderSet,
            impulseJoints: ImpulseJointSet,
            multibodyJoints: MultibodyJointSet,
        ): Uint8Array 
    
        /**
         * Deserialize the complete physics state from a single byte array.
         *
         * @param data - The byte array to deserialize.
         */
        public deserializeAll(data: Uint8Array): World
    }
    class PhysicsPipeline {
        raw: RawPhysicsPipeline;
    
        public free() 
    
        constructor(raw?: RawPhysicsPipeline)
    
        public step(
            gravity: Vector,
            integrationParameters: IntegrationParameters,
            islands: IslandManager,
            broadPhase: BroadPhase,
            narrowPhase: NarrowPhase,
            bodies: RigidBodySet,
            colliders: ColliderSet,
            impulseJoints: ImpulseJointSet,
            multibodyJoints: MultibodyJointSet,
            ccdSolver: CCDSolver,
            eventQueue?: EventQueue,
            hooks?: PhysicsHooks,
        )
    }
    class TempContactForceEvent {
        raw: RawContactForceEvent;
    
        public free() 
    
        /**
         * The first collider involved in the contact.
         */
        public collider1(): ColliderHandle 
    
        /**
         * The second collider involved in the contact.
         */
        public collider2(): ColliderHandle
    
        /**
         * The sum of all the forces between the two colliders.
         */
        public totalForce(): Vector 
        /**
         * The sum of the magnitudes of each force between the two colliders.
         *
         * Note that this is **not** the same as the magnitude of `self.total_force`.
         * Here we are summing the magnitude of all the forces, instead of taking
         * the magnitude of their sum.
         */
        public totalForceMagnitude(): number
    
        /**
         * The world-space (unit) direction of the force with strongest magnitude.
         */
        public maxForceDirection(): Vector 
    
        /**
         * The magnitude of the largest force at a contact point of this contact pair.
         */
        public maxForceMagnitude(): number
    }
    class CharacterCollision {
        /** The collider involved in the collision. Null if the collider no longer exists in the physics world. */
        public collider: Collider | null;
        /** The translation delta applied to the character before this collision took place. */
        public translationDeltaApplied: Vector;
        /** The translation delta the character would move after this collision if there is no other obstacles. */
        public translationDeltaRemaining: Vector;
        /** The time-of-impact between the character and the obstacles. */
        public toi: number;
        /** The world-space contact point on the collider when the collision happens. */
        public witness1: Vector;
        /** The local-space contact point on the character when the collision happens. */
        public witness2: Vector;
        /** The world-space outward contact normal on the collider when the collision happens. */
        public normal1: Vector;
        /** The local-space outward contact normal on the character when the collision happens. */
        public normal2: Vector;
    }
    class DebugRenderBuffers {
        /**
         * The lines to render. This is a flat array containing all the lines
         * to render. Each line is described as two consecutive point. Each
         * point is described as two (in 2D) or three (in 3D) consecutive
         * floats. For example, in 2D, the array: `[1, 2, 3, 4, 5, 6, 7, 8]`
         * describes the two segments `[[1, 2], [3, 4]]` and `[[5, 6], [7, 8]]`.
         */
        public vertices: Float32Array;
        /**
         * The color buffer. There is one color per vertex, and each color
         * has four consecutive components (in RGBA format).
         */
        public colors: Float32Array;
    
        constructor(vertices: Float32Array, colors: Float32Array)
    }
    class EventQueue {
        raw: RawEventQueue;
    
        /**
         * Creates a new event collector.
         *
         * @param autoDrain -setting this to `true` is strongly recommended. If true, the collector will
         * be automatically drained before each `world.step(collector)`. If false, the collector will
         * keep all events in memory unless it is manually drained/cleared; this may lead to unbounded use of
         * RAM if no drain is performed.
         */
        constructor(autoDrain: boolean, raw?: RawEventQueue)
        /**
         * Release the WASM memory occupied by this event-queue.
         */
        public free() 
    
        /**
         * Applies the given javascript closure on each collision event of this collector, then clear
         * the internal collision event buffer.
         *
         * @param f - JavaScript closure applied to each collision event. The
         * closure must take three arguments: two integers representing the handles of the colliders
         * involved in the collision, and a boolean indicating if the collision started (true) or stopped
         * (false).
         */
        public drainCollisionEvents(
            f: (
                handle1: ColliderHandle,
                handle2: ColliderHandle,
                started: boolean,
            ) => void,
        ) 
    
        /**
         * Applies the given javascript closure on each contact force event of this collector, then clear
         * the internal collision event buffer.
         *
         * @param f - JavaScript closure applied to each collision event. The
         *            closure must take one `TempContactForceEvent` argument.
         */
        public drainContactForceEvents(f: (event: TempContactForceEvent) => void)
    
        /**
         * Removes all events contained by this collector
         */
        public clear()
    }
    class DebugRenderPipeline {
        raw: RawDebugRenderPipeline;
        public vertices: Float32Array;
        public colors: Float32Array;
    
        /**
         * Release the WASM memory occupied by this serialization pipeline.
         */
        free()
    
        constructor(raw?: RawDebugRenderPipeline)
        public render(
            bodies: RigidBodySet,
            colliders: ColliderSet,
            impulse_joints: ImpulseJointSet,
            multibody_joints: MultibodyJointSet,
            narrow_phase: NarrowPhase,
        )
    }
    class World {
        gravity: Vector;
        integrationParameters: IntegrationParameters;
        islands: IslandManager;
        broadPhase: BroadPhase;
        narrowPhase: NarrowPhase;
        bodies: RigidBodySet;
        colliders: ColliderSet;
        impulseJoints: ImpulseJointSet;
        multibodyJoints: MultibodyJointSet;
        ccdSolver: CCDSolver;
        queryPipeline: QueryPipeline;
        physicsPipeline: PhysicsPipeline;
        serializationPipeline: SerializationPipeline;
        debugRenderPipeline: DebugRenderPipeline;
        characterControllers: Set<KinematicCharacterController>;
        /**
         * Release the WASM memory occupied by this physics world.
         *
         * All the fields of this physics world will be freed as well,
         * so there is no need to call their `.free()` methods individually.
         */
        free(): void;
        constructor(gravity: Vector, rawIntegrationParameters?: RawIntegrationParameters, rawIslands?: RawIslandManager, rawBroadPhase?: RawBroadPhase, rawNarrowPhase?: RawNarrowPhase, rawBodies?: RawRigidBodySet, rawColliders?: RawColliderSet, rawImpulseJoints?: RawImpulseJointSet, rawMultibodyJoints?: RawMultibodyJointSet, rawCCDSolver?: RawCCDSolver, rawQueryPipeline?: RawQueryPipeline, rawPhysicsPipeline?: RawPhysicsPipeline, rawSerializationPipeline?: RawSerializationPipeline, rawDebugRenderPipeline?: RawDebugRenderPipeline);
        static fromRaw(raw: RawDeserializedWorld): World;
        /**
         * Takes a snapshot of this world.
         *
         * Use `World.restoreSnapshot` to create a new physics world with a state identical to
         * the state when `.takeSnapshot()` is called.
         */
        takeSnapshot(): Uint8Array;
        /**
         * Creates a new physics world from a snapshot.
         *
         * This new physics world will be an identical copy of the snapshoted physics world.
         */
        static restoreSnapshot(data: Uint8Array): World;
        /**
         * Computes all the lines (and their colors) needed to render the scene.
         */
        debugRender(): DebugRenderBuffers;
        /**
         * Advance the simulation by one time step.
         *
         * All events generated by the physics engine are ignored.
         *
         * @param EventQueue - (optional) structure responsible for collecting
         *   events generated by the physics engine.
         */
        step(eventQueue?: EventQueue, hooks?: PhysicsHooks): void;
        /**
         * Update colliders positions after rigid-bodies moved.
         *
         * When a rigid-body moves, the positions of the colliders attached to it need to be updated. This update is
         * generally automatically done at the beginning and the end of each simulation step with World.step.
         * If the positions need to be updated without running a simulation step this method can be called manually.
         */
        propagateModifiedBodyPositionsToColliders(): void;
        /**
         * Ensure subsequent scene queries take into account the collider positions set before this method is called.
         *
         * This does not step the physics simulation forward.
         */
        updateSceneQueries(): void;
        /**
         * The current simulation timestep.
         */
        get timestep(): number;
        /**
         * Sets the new simulation timestep.
         *
         * The simulation timestep governs by how much the physics state of the world will
         * be integrated. A simulation timestep should:
         * - be as small as possible. Typical values evolve around 0.016 (assuming the chosen unit is milliseconds,
         * corresponds to the time between two frames of a game running at 60FPS).
         * - not vary too much during the course of the simulation. A timestep with large variations may
         * cause instabilities in the simulation.
         *
         * @param dt - The timestep length, in seconds.
         */
        set timestep(dt: number);
        /**
         * The maximum velocity iterations the velocity-based force constraint solver can make.
         */
        get maxVelocityIterations(): number;
        /**
         * Sets the maximum number of velocity iterations (default: 4).
         *
         * The greater this value is, the most rigid and realistic the physics simulation will be.
         * However a greater number of iterations is more computationally intensive.
         *
         * @param niter - The new maximum number of velocity iterations.
         */
        set maxVelocityIterations(niter: number);
        /**
         * The maximum velocity iterations the velocity-based friction constraint solver can make.
         */
        get maxVelocityFrictionIterations(): number;
        /**
         * Sets the maximum number of velocity iterations for friction (default: 8).
         *
         * The greater this value is, the most realistic friction will be.
         * However a greater number of iterations is more computationally intensive.
         *
         * @param niter - The new maximum number of velocity iterations.
         */
        set maxVelocityFrictionIterations(niter: number);
        /**
         * The maximum velocity iterations the velocity-based constraint solver can make to attempt to remove
         * the energy introduced by constraint stabilization.
         */
        get maxStabilizationIterations(): number;
        /**
         * Sets the maximum number of velocity iterations for stabilization (default: 1).
         *
         * @param niter - The new maximum number of velocity iterations.
         */
        set maxStabilizationIterations(niter: number);
        /**
         * Creates a new rigid-body from the given rigd-body descriptior.
         *
         * @param body - The description of the rigid-body to create.
         */
        createRigidBody(body: RigidBodyDesc): RigidBody;
        /**
         * Creates a new character controller.
         *
         * @param offset - The artificial gap added between the character’s chape and its environment.
         */
        createCharacterController(offset: number): KinematicCharacterController;
        /**
         * Removes a character controller from this world.
         *
         * @param controller - The character controller to remove.
         */
        removeCharacterController(controller: KinematicCharacterController): void;
        /**
         * Creates a new collider.
         *
         * @param desc - The description of the collider.
         * @param parent - The rigid-body this collider is attached to.
         */
        createCollider(desc: ColliderDesc, parent?: RigidBody): Collider;
        /**
         * Creates a new impulse joint from the given joint descriptor.
         *
         * @param params - The description of the joint to create.
         * @param parent1 - The first rigid-body attached to this joint.
         * @param parent2 - The second rigid-body attached to this joint.
         * @param wakeUp - Should the attached rigid-bodies be awakened?
         */
        createImpulseJoint(params: JointData, parent1: RigidBody, parent2: RigidBody, wakeUp: boolean): ImpulseJoint;
        /**
         * Creates a new multibody joint from the given joint descriptor.
         *
         * @param params - The description of the joint to create.
         * @param parent1 - The first rigid-body attached to this joint.
         * @param parent2 - The second rigid-body attached to this joint.
         * @param wakeUp - Should the attached rigid-bodies be awakened?
         */
        createMultibodyJoint(params: JointData, parent1: RigidBody, parent2: RigidBody, wakeUp: boolean): MultibodyJoint;
        /**
         * Retrieves a rigid-body from its handle.
         *
         * @param handle - The integer handle of the rigid-body to retrieve.
         */
        getRigidBody(handle: RigidBodyHandle): RigidBody;
        /**
         * Retrieves a collider from its handle.
         *
         * @param handle - The integer handle of the collider to retrieve.
         */
        getCollider(handle: ColliderHandle): Collider;
        /**
         * Retrieves an impulse joint from its handle.
         *
         * @param handle - The integer handle of the impulse joint to retrieve.
         */
        getImpulseJoint(handle: ImpulseJointHandle): ImpulseJoint;
        /**
         * Retrieves an multibody joint from its handle.
         *
         * @param handle - The integer handle of the multibody joint to retrieve.
         */
        getMultibodyJoint(handle: MultibodyJointHandle): MultibodyJoint;
        /**
         * Removes the given rigid-body from this physics world.
         *
         * This will remove this rigid-body as well as all its attached colliders and joints.
         * Every other bodies touching or attached by joints to this rigid-body will be woken-up.
         *
         * @param body - The rigid-body to remove.
         */
        removeRigidBody(body: RigidBody): void;
        /**
         * Removes the given collider from this physics world.
         *
         * @param collider - The collider to remove.
         * @param wakeUp - If set to `true`, the rigid-body this collider is attached to will be awaken.
         */
        removeCollider(collider: Collider, wakeUp: boolean): void;
        /**
         * Removes the given impulse joint from this physics world.
         *
         * @param joint - The impulse joint to remove.
         * @param wakeUp - If set to `true`, the rigid-bodies attached by this joint will be awaken.
         */
        removeImpulseJoint(joint: ImpulseJoint, wakeUp: boolean): void;
        /**
         * Removes the given multibody joint from this physics world.
         *
         * @param joint - The multibody joint to remove.
         * @param wakeUp - If set to `true`, the rigid-bodies attached by this joint will be awaken.
         */
        removeMultibodyJoint(joint: MultibodyJoint, wakeUp: boolean): void;
        /**
         * Applies the given closure to each collider managed by this physics world.
         *
         * @param f(collider) - The function to apply to each collider managed by this physics world. Called as `f(collider)`.
         */
        forEachCollider(f: (collider: Collider) => void): void;
        /**
         * Applies the given closure to each rigid-body managed by this physics world.
         *
         * @param f(body) - The function to apply to each rigid-body managed by this physics world. Called as `f(collider)`.
         */
        forEachRigidBody(f: (body: RigidBody) => void): void;
        /**
         * Applies the given closure to each active rigid-body managed by this physics world.
         *
         * After a short time of inactivity, a rigid-body is automatically deactivated ("asleep") by
         * the physics engine in order to save computational power. A sleeping rigid-body never moves
         * unless it is moved manually by the user.
         *
         * @param f - The function to apply to each active rigid-body managed by this physics world. Called as `f(collider)`.
         */
        forEachActiveRigidBody(f: (body: RigidBody) => void): void;
        /**
         * Find the closest intersection between a ray and the physics world.
         *
         * @param ray - The ray to cast.
         * @param maxToi - The maximum time-of-impact that can be reported by this cast. This effectively
         *   limits the length of the ray to `ray.dir.norm() * maxToi`.
         * @param solid - If `false` then the ray will attempt to hit the boundary of a shape, even if its
         *   origin already lies inside of a shape. In other terms, `true` implies that all shapes are plain,
         *   whereas `false` implies that all shapes are hollow for this ray-cast.
         * @param groups - Used to filter the colliders that can or cannot be hit by the ray.
         * @param filter - The callback to filter out which collider will be hit.
         */
        castRay(ray: Ray, maxToi: number, solid: boolean, filterFlags?: QueryFilterFlags, filterGroups?: InteractionGroups, filterExcludeCollider?: Collider, filterExcludeRigidBody?: RigidBody, filterPredicate?: (collider: Collider) => boolean): RayColliderToi | null;
        /**
         * Find the closest intersection between a ray and the physics world.
         *
         * This also computes the normal at the hit point.
         * @param ray - The ray to cast.
         * @param maxToi - The maximum time-of-impact that can be reported by this cast. This effectively
         *   limits the length of the ray to `ray.dir.norm() * maxToi`.
         * @param solid - If `false` then the ray will attempt to hit the boundary of a shape, even if its
         *   origin already lies inside of a shape. In other terms, `true` implies that all shapes are plain,
         *   whereas `false` implies that all shapes are hollow for this ray-cast.
         * @param groups - Used to filter the colliders that can or cannot be hit by the ray.
         */
        castRayAndGetNormal(ray: Ray, maxToi: number, solid: boolean, filterFlags?: QueryFilterFlags, filterGroups?: InteractionGroups, filterExcludeCollider?: Collider, filterExcludeRigidBody?: RigidBody, filterPredicate?: (collider: Collider) => boolean): RayColliderIntersection | null;
        /**
         * Cast a ray and collects all the intersections between a ray and the scene.
         *
         * @param ray - The ray to cast.
         * @param maxToi - The maximum time-of-impact that can be reported by this cast. This effectively
         *   limits the length of the ray to `ray.dir.norm() * maxToi`.
         * @param solid - If `false` then the ray will attempt to hit the boundary of a shape, even if its
         *   origin already lies inside of a shape. In other terms, `true` implies that all shapes are plain,
         *   whereas `false` implies that all shapes are hollow for this ray-cast.
         * @param groups - Used to filter the colliders that can or cannot be hit by the ray.
         * @param callback - The callback called once per hit (in no particular order) between a ray and a collider.
         *   If this callback returns `false`, then the cast will stop and no further hits will be detected/reported.
         */
        intersectionsWithRay(ray: Ray, maxToi: number, solid: boolean, callback: (intersect: RayColliderIntersection) => boolean, filterFlags?: QueryFilterFlags, filterGroups?: InteractionGroups, filterExcludeCollider?: Collider, filterExcludeRigidBody?: RigidBody, filterPredicate?: (collider: Collider) => boolean): void;
        /**
         * Gets the handle of up to one collider intersecting the given shape.
         *
         * @param shapePos - The position of the shape used for the intersection test.
         * @param shapeRot - The orientation of the shape used for the intersection test.
         * @param shape - The shape used for the intersection test.
         * @param groups - The bit groups and filter associated to the ray, in order to only
         *   hit the colliders with collision groups compatible with the ray's group.
         */
        intersectionWithShape(shapePos: Vector, shapeRot: Rotation, shape: Shape, filterFlags?: QueryFilterFlags, filterGroups?: InteractionGroups, filterExcludeCollider?: Collider, filterExcludeRigidBody?: RigidBody, filterPredicate?: (collider: Collider) => boolean): Collider | null;
        /**
         * Find the projection of a point on the closest collider.
         *
         * @param point - The point to project.
         * @param solid - If this is set to `true` then the collider shapes are considered to
         *   be plain (if the point is located inside of a plain shape, its projection is the point
         *   itself). If it is set to `false` the collider shapes are considered to be hollow
         *   (if the point is located inside of an hollow shape, it is projected on the shape's
         *   boundary).
         * @param groups - The bit groups and filter associated to the point to project, in order to only
         *   project on colliders with collision groups compatible with the ray's group.
         */
        projectPoint(point: Vector, solid: boolean, filterFlags?: QueryFilterFlags, filterGroups?: InteractionGroups, filterExcludeCollider?: Collider, filterExcludeRigidBody?: RigidBody, filterPredicate?: (collider: Collider) => boolean): PointColliderProjection | null;
        /**
         * Find the projection of a point on the closest collider.
         *
         * @param point - The point to project.
         * @param groups - The bit groups and filter associated to the point to project, in order to only
         *   project on colliders with collision groups compatible with the ray's group.
         */
        projectPointAndGetFeature(point: Vector, filterFlags?: QueryFilterFlags, filterGroups?: InteractionGroups, filterExcludeCollider?: Collider, filterExcludeRigidBody?: RigidBody, filterPredicate?: (collider: Collider) => boolean): PointColliderProjection | null;
        /**
         * Find all the colliders containing the given point.
         *
         * @param point - The point used for the containment test.
         * @param groups - The bit groups and filter associated to the point to test, in order to only
         *   test on colliders with collision groups compatible with the ray's group.
         * @param callback - A function called with the handles of each collider with a shape
         *   containing the `point`.
         */
        intersectionsWithPoint(point: Vector, callback: (handle: Collider) => boolean, filterFlags?: QueryFilterFlags, filterGroups?: InteractionGroups, filterExcludeCollider?: Collider, filterExcludeRigidBody?: RigidBody, filterPredicate?: (collider: Collider) => boolean): void;
        /**
         * Casts a shape at a constant linear velocity and retrieve the first collider it hits.
         * This is similar to ray-casting except that we are casting a whole shape instead of
         * just a point (the ray origin).
         *
         * @param shapePos - The initial position of the shape to cast.
         * @param shapeRot - The initial rotation of the shape to cast.
         * @param shapeVel - The constant velocity of the shape to cast (i.e. the cast direction).
         * @param shape - The shape to cast.
         * @param maxToi - The maximum time-of-impact that can be reported by this cast. This effectively
         *   limits the distance traveled by the shape to `shapeVel.norm() * maxToi`.
         * @param stopAtPenetration - If set to `false`, the linear shape-cast won’t immediately stop if
         *   the shape is penetrating another shape at its starting point **and** its trajectory is such
         *   that it’s on a path to exist that penetration state.
         * @param groups - The bit groups and filter associated to the shape to cast, in order to only
         *   test on colliders with collision groups compatible with this group.
         */
        castShape(shapePos: Vector, shapeRot: Rotation, shapeVel: Vector, shape: Shape, maxToi: number, stopAtPenetration: boolean, filterFlags?: QueryFilterFlags, filterGroups?: InteractionGroups, filterExcludeCollider?: Collider, filterExcludeRigidBody?: RigidBody, filterPredicate?: (collider: Collider) => boolean): ShapeColliderTOI | null;
        /**
         * Retrieve all the colliders intersecting the given shape.
         *
         * @param shapePos - The position of the shape to test.
         * @param shapeRot - The orientation of the shape to test.
         * @param shape - The shape to test.
         * @param groups - The bit groups and filter associated to the shape to test, in order to only
         *   test on colliders with collision groups compatible with this group.
         * @param callback - A function called with the handles of each collider intersecting the `shape`.
         */
        intersectionsWithShape(shapePos: Vector, shapeRot: Rotation, shape: Shape, callback: (collider: Collider) => boolean, filterFlags?: QueryFilterFlags, filterGroups?: InteractionGroups, filterExcludeCollider?: Collider, filterExcludeRigidBody?: RigidBody, filterPredicate?: (collider: Collider) => boolean): void;
        /**
         * Finds the handles of all the colliders with an AABB intersecting the given AABB.
         *
         * @param aabbCenter - The center of the AABB to test.
         * @param aabbHalfExtents - The half-extents of the AABB to test.
         * @param callback - The callback that will be called with the handles of all the colliders
         *                   currently intersecting the given AABB.
         */
        collidersWithAabbIntersectingAabb(aabbCenter: Vector, aabbHalfExtents: Vector, callback: (handle: Collider) => boolean): void;
        /**
         * Enumerates all the colliders potentially in contact with the given collider.
         *
         * @param collider1 - The second collider involved in the contact.
         * @param f - Closure that will be called on each collider that is in contact with `collider1`.
         */
        contactsWith(collider1: Collider, f: (collider2: Collider) => void): void;
        /**
         * Enumerates all the colliders intersecting the given colliders, assuming one of them
         * is a sensor.
         */
        intersectionsWith(collider1: Collider, f: (collider2: Collider) => void): void;
        /**
         * Iterates through all the contact manifolds between the given pair of colliders.
         *
         * @param collider1 - The first collider involved in the contact.
         * @param collider2 - The second collider involved in the contact.
         * @param f - Closure that will be called on each contact manifold between the two colliders. If the second argument
         *            passed to this closure is `true`, then the contact manifold data is flipped, i.e., methods like `localNormal1`
         *            actually apply to the `collider2` and fields like `localNormal2` apply to the `collider1`.
         */
        contactPair(collider1: Collider, collider2: Collider, f: (manifold: TempContactManifold, flipped: boolean) => void): void;
        /**
         * Returns `true` if `collider1` and `collider2` intersect and at least one of them is a sensor.
         * @param collider1 − The first collider involved in the intersection.
         * @param collider2 − The second collider involved in the intersection.
         */
        intersectionPair(collider1: Collider, collider2: Collider): boolean;
    }
    /* tslint:disable */
    /* eslint-disable */
    /**
    * @returns {string}
    */
    export function version(): string;
    /**
    */
    export enum RawJointType {
        Revolute,
        Fixed,
        Prismatic,
        Generic,
    }
    /**
    */
    export enum RawMotorModel {
        AccelerationBased,
        ForceBased,
    }
    /**
    */
    export enum RawJointAxis {
        X,
        Y,
        AngX,
    }
    /**
    */
    export enum RawRigidBodyType {
        Dynamic,
        Fixed,
        KinematicPositionBased,
        KinematicVelocityBased,
    }
    /**
    */
    export enum RawFeatureType {
        Vertex,
        Face,
        Unknown,
    }
    /**
    */
    export enum RawShapeType {
        Ball,
        Cuboid,
        Capsule,
        Segment,
        Polyline,
        Triangle,
        TriMesh,
        HeightField,
        Compound,
        ConvexPolygon,
        RoundCuboid,
        RoundTriangle,
        RoundConvexPolygon,
        HalfSpace,
    }
    /**
    */
    export class RawBroadPhase {
        free(): void;
        /**
        */
        constructor();
    }
    /**
    */
    export class RawCCDSolver {
        free(): void;
        /**
        */
        constructor();
    }
    /**
    */
    export class RawCharacterCollision {
        free(): void;
        /**
        */
        constructor();
        /**
        * @returns {number}
        */
        handle(): number;
        /**
        * @returns {RawVector}
        */
        translationApplied(): RawVector;
        /**
        * @returns {RawVector}
        */
        translationRemaining(): RawVector;
        /**
        * @returns {number}
        */
        toi(): number;
        /**
        * @returns {RawVector}
        */
        worldWitness1(): RawVector;
        /**
        * @returns {RawVector}
        */
        worldWitness2(): RawVector;
        /**
        * @returns {RawVector}
        */
        worldNormal1(): RawVector;
        /**
        * @returns {RawVector}
        */
        worldNormal2(): RawVector;
    }
    /**
    */
    export class RawColliderSet {
        free(): void;
        /**
        * The world-space translation of this collider.
        * @param {number} handle
        * @returns {RawVector}
        */
        coTranslation(handle: number): RawVector;
        /**
        * The world-space orientation of this collider.
        * @param {number} handle
        * @returns {RawRotation}
        */
        coRotation(handle: number): RawRotation;
        /**
        * Sets the translation of this collider.
        *
        * # Parameters
        * - `x`: the world-space position of the collider along the `x` axis.
        * - `y`: the world-space position of the collider along the `y` axis.
        * - `wakeUp`: forces the collider to wake-up so it is properly affected by forces if it
        * wasn't moving before modifying its position.
        * @param {number} handle
        * @param {number} x
        * @param {number} y
        */
        coSetTranslation(handle: number, x: number, y: number): void;
        /**
        * @param {number} handle
        * @param {number} x
        * @param {number} y
        */
        coSetTranslationWrtParent(handle: number, x: number, y: number): void;
        /**
        * Sets the rotation angle of this collider.
        *
        * # Parameters
        * - `angle`: the rotation angle, in radians.
        * - `wakeUp`: forces the collider to wake-up so it is properly affected by forces if it
        * wasn't moving before modifying its position.
        * @param {number} handle
        * @param {number} angle
        */
        coSetRotation(handle: number, angle: number): void;
        /**
        * @param {number} handle
        * @param {number} angle
        */
        coSetRotationWrtParent(handle: number, angle: number): void;
        /**
        * Is this collider a sensor?
        * @param {number} handle
        * @returns {boolean}
        */
        coIsSensor(handle: number): boolean;
        /**
        * The type of the shape of this collider.
        * @param {number} handle
        * @returns {number}
        */
        coShapeType(handle: number): number;
        /**
        * @param {number} handle
        * @returns {RawVector | undefined}
        */
        coHalfspaceNormal(handle: number): RawVector | undefined;
        /**
        * The half-extents of this collider if it is has a cuboid shape.
        * @param {number} handle
        * @returns {RawVector | undefined}
        */
        coHalfExtents(handle: number): RawVector | undefined;
        /**
        * Set the half-extents of this collider if it has a cuboid shape.
        * @param {number} handle
        * @param {RawVector} newHalfExtents
        */
        coSetHalfExtents(handle: number, newHalfExtents: RawVector): void;
        /**
        * The radius of this collider if it is a ball, capsule, cylinder, or cone shape.
        * @param {number} handle
        * @returns {number | undefined}
        */
        coRadius(handle: number): number | undefined;
        /**
        * Set the radius of this collider if it is a ball, capsule, cylinder, or cone shape.
        * @param {number} handle
        * @param {number} newRadius
        */
        coSetRadius(handle: number, newRadius: number): void;
        /**
        * The half height of this collider if it is a capsule, cylinder, or cone shape.
        * @param {number} handle
        * @returns {number | undefined}
        */
        coHalfHeight(handle: number): number | undefined;
        /**
        * Set the half height of this collider if it is a capsule, cylinder, or cone shape.
        * @param {number} handle
        * @param {number} newHalfheight
        */
        coSetHalfHeight(handle: number, newHalfheight: number): void;
        /**
        * The radius of the round edges of this collider.
        * @param {number} handle
        * @returns {number | undefined}
        */
        coRoundRadius(handle: number): number | undefined;
        /**
        * Set the radius of the round edges of this collider.
        * @param {number} handle
        * @param {number} newBorderRadius
        */
        coSetRoundRadius(handle: number, newBorderRadius: number): void;
        /**
        * The vertices of this triangle mesh, polyline, convex polyhedron, segment, triangle or convex polyhedron, if it is one.
        * @param {number} handle
        * @returns {Float32Array | undefined}
        */
        coVertices(handle: number): Float32Array | undefined;
        /**
        * The indices of this triangle mesh, polyline, or convex polyhedron, if it is one.
        * @param {number} handle
        * @returns {Uint32Array | undefined}
        */
        coIndices(handle: number): Uint32Array | undefined;
        /**
        * The height of this heightfield if it is one.
        * @param {number} handle
        * @returns {Float32Array | undefined}
        */
        coHeightfieldHeights(handle: number): Float32Array | undefined;
        /**
        * The scaling factor applied of this heightfield if it is one.
        * @param {number} handle
        * @returns {RawVector | undefined}
        */
        coHeightfieldScale(handle: number): RawVector | undefined;
        /**
        * The unique integer identifier of the collider this collider is attached to.
        * @param {number} handle
        * @returns {number | undefined}
        */
        coParent(handle: number): number | undefined;
        /**
        * @param {number} handle
        * @param {boolean} enabled
        */
        coSetEnabled(handle: number, enabled: boolean): void;
        /**
        * @param {number} handle
        * @returns {boolean}
        */
        coIsEnabled(handle: number): boolean;
        /**
        * The friction coefficient of this collider.
        * @param {number} handle
        * @returns {number}
        */
        coFriction(handle: number): number;
        /**
        * The restitution coefficient of this collider.
        * @param {number} handle
        * @returns {number}
        */
        coRestitution(handle: number): number;
        /**
        * The density of this collider.
        * @param {number} handle
        * @returns {number}
        */
        coDensity(handle: number): number;
        /**
        * The mass of this collider.
        * @param {number} handle
        * @returns {number}
        */
        coMass(handle: number): number;
        /**
        * The volume of this collider.
        * @param {number} handle
        * @returns {number}
        */
        coVolume(handle: number): number;
        /**
        * The collision groups of this collider.
        * @param {number} handle
        * @returns {number}
        */
        coCollisionGroups(handle: number): number;
        /**
        * The solver groups of this collider.
        * @param {number} handle
        * @returns {number}
        */
        coSolverGroups(handle: number): number;
        /**
        * The physics hooks enabled for this collider.
        * @param {number} handle
        * @returns {number}
        */
        coActiveHooks(handle: number): number;
        /**
        * The collision types enabled for this collider.
        * @param {number} handle
        * @returns {number}
        */
        coActiveCollisionTypes(handle: number): number;
        /**
        * The events enabled for this collider.
        * @param {number} handle
        * @returns {number}
        */
        coActiveEvents(handle: number): number;
        /**
        * The total force magnitude beyond which a contact force event can be emitted.
        * @param {number} handle
        * @returns {number}
        */
        coContactForceEventThreshold(handle: number): number;
        /**
        * @param {number} handle
        * @param {RawVector} point
        * @returns {boolean}
        */
        coContainsPoint(handle: number, point: RawVector): boolean;
        /**
        * @param {number} handle
        * @param {RawVector} colliderVel
        * @param {RawShape} shape2
        * @param {RawVector} shape2Pos
        * @param {RawRotation} shape2Rot
        * @param {RawVector} shape2Vel
        * @param {number} maxToi
        * @param {boolean} stop_at_penetration
        * @returns {RawShapeTOI | undefined}
        */
        coCastShape(handle: number, colliderVel: RawVector, shape2: RawShape, shape2Pos: RawVector, shape2Rot: RawRotation, shape2Vel: RawVector, maxToi: number, stop_at_penetration: boolean): RawShapeTOI | undefined;
        /**
        * @param {number} handle
        * @param {RawVector} collider1Vel
        * @param {number} collider2handle
        * @param {RawVector} collider2Vel
        * @param {number} max_toi
        * @param {boolean} stop_at_penetration
        * @returns {RawShapeColliderTOI | undefined}
        */
        coCastCollider(handle: number, collider1Vel: RawVector, collider2handle: number, collider2Vel: RawVector, max_toi: number, stop_at_penetration: boolean): RawShapeColliderTOI | undefined;
        /**
        * @param {number} handle
        * @param {RawShape} shape2
        * @param {RawVector} shapePos2
        * @param {RawRotation} shapeRot2
        * @returns {boolean}
        */
        coIntersectsShape(handle: number, shape2: RawShape, shapePos2: RawVector, shapeRot2: RawRotation): boolean;
        /**
        * @param {number} handle
        * @param {RawShape} shape2
        * @param {RawVector} shapePos2
        * @param {RawRotation} shapeRot2
        * @param {number} prediction
        * @returns {RawShapeContact | undefined}
        */
        coContactShape(handle: number, shape2: RawShape, shapePos2: RawVector, shapeRot2: RawRotation, prediction: number): RawShapeContact | undefined;
        /**
        * @param {number} handle
        * @param {number} collider2handle
        * @param {number} prediction
        * @returns {RawShapeContact | undefined}
        */
        coContactCollider(handle: number, collider2handle: number, prediction: number): RawShapeContact | undefined;
        /**
        * @param {number} handle
        * @param {RawVector} point
        * @param {boolean} solid
        * @returns {RawPointProjection}
        */
        coProjectPoint(handle: number, point: RawVector, solid: boolean): RawPointProjection;
        /**
        * @param {number} handle
        * @param {RawVector} rayOrig
        * @param {RawVector} rayDir
        * @param {number} maxToi
        * @returns {boolean}
        */
        coIntersectsRay(handle: number, rayOrig: RawVector, rayDir: RawVector, maxToi: number): boolean;
        /**
        * @param {number} handle
        * @param {RawVector} rayOrig
        * @param {RawVector} rayDir
        * @param {number} maxToi
        * @param {boolean} solid
        * @returns {number}
        */
        coCastRay(handle: number, rayOrig: RawVector, rayDir: RawVector, maxToi: number, solid: boolean): number;
        /**
        * @param {number} handle
        * @param {RawVector} rayOrig
        * @param {RawVector} rayDir
        * @param {number} maxToi
        * @param {boolean} solid
        * @returns {RawRayIntersection | undefined}
        */
        coCastRayAndGetNormal(handle: number, rayOrig: RawVector, rayDir: RawVector, maxToi: number, solid: boolean): RawRayIntersection | undefined;
        /**
        * @param {number} handle
        * @param {boolean} is_sensor
        */
        coSetSensor(handle: number, is_sensor: boolean): void;
        /**
        * @param {number} handle
        * @param {number} restitution
        */
        coSetRestitution(handle: number, restitution: number): void;
        /**
        * @param {number} handle
        * @param {number} friction
        */
        coSetFriction(handle: number, friction: number): void;
        /**
        * @param {number} handle
        * @returns {number}
        */
        coFrictionCombineRule(handle: number): number;
        /**
        * @param {number} handle
        * @param {number} rule
        */
        coSetFrictionCombineRule(handle: number, rule: number): void;
        /**
        * @param {number} handle
        * @returns {number}
        */
        coRestitutionCombineRule(handle: number): number;
        /**
        * @param {number} handle
        * @param {number} rule
        */
        coSetRestitutionCombineRule(handle: number, rule: number): void;
        /**
        * @param {number} handle
        * @param {number} groups
        */
        coSetCollisionGroups(handle: number, groups: number): void;
        /**
        * @param {number} handle
        * @param {number} groups
        */
        coSetSolverGroups(handle: number, groups: number): void;
        /**
        * @param {number} handle
        * @param {number} hooks
        */
        coSetActiveHooks(handle: number, hooks: number): void;
        /**
        * @param {number} handle
        * @param {number} events
        */
        coSetActiveEvents(handle: number, events: number): void;
        /**
        * @param {number} handle
        * @param {number} types
        */
        coSetActiveCollisionTypes(handle: number, types: number): void;
        /**
        * @param {number} handle
        * @param {RawShape} shape
        */
        coSetShape(handle: number, shape: RawShape): void;
        /**
        * @param {number} handle
        * @param {number} threshold
        */
        coSetContactForceEventThreshold(handle: number, threshold: number): void;
        /**
        * @param {number} handle
        * @param {number} density
        */
        coSetDensity(handle: number, density: number): void;
        /**
        * @param {number} handle
        * @param {number} mass
        */
        coSetMass(handle: number, mass: number): void;
        /**
        * @param {number} handle
        * @param {number} mass
        * @param {RawVector} centerOfMass
        * @param {number} principalAngularInertia
        */
        coSetMassProperties(handle: number, mass: number, centerOfMass: RawVector, principalAngularInertia: number): void;
        /**
        */
        constructor();
        /**
        * @returns {number}
        */
        len(): number;
        /**
        * @param {number} handle
        * @returns {boolean}
        */
        contains(handle: number): boolean;
        /**
        * @param {boolean} enabled
        * @param {RawShape} shape
        * @param {RawVector} translation
        * @param {RawRotation} rotation
        * @param {number} massPropsMode
        * @param {number} mass
        * @param {RawVector} centerOfMass
        * @param {number} principalAngularInertia
        * @param {number} density
        * @param {number} friction
        * @param {number} restitution
        * @param {number} frictionCombineRule
        * @param {number} restitutionCombineRule
        * @param {boolean} isSensor
        * @param {number} collisionGroups
        * @param {number} solverGroups
        * @param {number} activeCollisionTypes
        * @param {number} activeHooks
        * @param {number} activeEvents
        * @param {number} contactForceEventThreshold
        * @param {boolean} hasParent
        * @param {number} parent
        * @param {RawRigidBodySet} bodies
        * @returns {number | undefined}
        */
        createCollider(enabled: boolean, shape: RawShape, translation: RawVector, rotation: RawRotation, massPropsMode: number, mass: number, centerOfMass: RawVector, principalAngularInertia: number, density: number, friction: number, restitution: number, frictionCombineRule: number, restitutionCombineRule: number, isSensor: boolean, collisionGroups: number, solverGroups: number, activeCollisionTypes: number, activeHooks: number, activeEvents: number, contactForceEventThreshold: number, hasParent: boolean, parent: number, bodies: RawRigidBodySet): number | undefined;
        /**
        * Removes a collider from this set and wake-up the rigid-body it is attached to.
        * @param {number} handle
        * @param {RawIslandManager} islands
        * @param {RawRigidBodySet} bodies
        * @param {boolean} wakeUp
        */
        remove(handle: number, islands: RawIslandManager, bodies: RawRigidBodySet, wakeUp: boolean): void;
        /**
        * Checks if a collider with the given integer handle exists.
        * @param {number} handle
        * @returns {boolean}
        */
        isHandleValid(handle: number): boolean;
        /**
        * Applies the given JavaScript function to the integer handle of each collider managed by this collider set.
        *
        * # Parameters
        * - `f(handle)`: the function to apply to the integer handle of each collider managed by this collider set. Called as `f(handle)`.
        * @param {Function} f
        */
        forEachColliderHandle(f: Function): void;
    }
    /**
    */
    export class RawContactForceEvent {
        free(): void;
        /**
        * The first collider involved in the contact.
        * @returns {number}
        */
        collider1(): number;
        /**
        * The second collider involved in the contact.
        * @returns {number}
        */
        collider2(): number;
        /**
        * The sum of all the forces between the two colliders.
        * @returns {RawVector}
        */
        total_force(): RawVector;
        /**
        * The sum of the magnitudes of each force between the two colliders.
        *
        * Note that this is **not** the same as the magnitude of `self.total_force`.
        * Here we are summing the magnitude of all the forces, instead of taking
        * the magnitude of their sum.
        * @returns {number}
        */
        total_force_magnitude(): number;
        /**
        * The world-space (unit) direction of the force with strongest magnitude.
        * @returns {RawVector}
        */
        max_force_direction(): RawVector;
        /**
        * The magnitude of the largest force at a contact point of this contact pair.
        * @returns {number}
        */
        max_force_magnitude(): number;
    }
    /**
    */
    export class RawContactManifold {
        free(): void;
        /**
        * @returns {RawVector}
        */
        normal(): RawVector;
        /**
        * @returns {RawVector}
        */
        local_n1(): RawVector;
        /**
        * @returns {RawVector}
        */
        local_n2(): RawVector;
        /**
        * @returns {number}
        */
        subshape1(): number;
        /**
        * @returns {number}
        */
        subshape2(): number;
        /**
        * @returns {number}
        */
        num_contacts(): number;
        /**
        * @param {number} i
        * @returns {RawVector | undefined}
        */
        contact_local_p1(i: number): RawVector | undefined;
        /**
        * @param {number} i
        * @returns {RawVector | undefined}
        */
        contact_local_p2(i: number): RawVector | undefined;
        /**
        * @param {number} i
        * @returns {number}
        */
        contact_dist(i: number): number;
        /**
        * @param {number} i
        * @returns {number}
        */
        contact_fid1(i: number): number;
        /**
        * @param {number} i
        * @returns {number}
        */
        contact_fid2(i: number): number;
        /**
        * @param {number} i
        * @returns {number}
        */
        contact_impulse(i: number): number;
        /**
        * @param {number} i
        * @returns {number}
        */
        contact_tangent_impulse(i: number): number;
        /**
        * @returns {number}
        */
        num_solver_contacts(): number;
        /**
        * @param {number} i
        * @returns {RawVector | undefined}
        */
        solver_contact_point(i: number): RawVector | undefined;
        /**
        * @param {number} i
        * @returns {number}
        */
        solver_contact_dist(i: number): number;
        /**
        * @param {number} i
        * @returns {number}
        */
        solver_contact_friction(i: number): number;
        /**
        * @param {number} i
        * @returns {number}
        */
        solver_contact_restitution(i: number): number;
        /**
        * @param {number} i
        * @returns {RawVector}
        */
        solver_contact_tangent_velocity(i: number): RawVector;
    }
    /**
    */
    export class RawContactPair {
        free(): void;
        /**
        * @returns {number}
        */
        collider1(): number;
        /**
        * @returns {number}
        */
        collider2(): number;
        /**
        * @returns {number}
        */
        numContactManifolds(): number;
        /**
        * @param {number} i
        * @returns {RawContactManifold | undefined}
        */
        contactManifold(i: number): RawContactManifold | undefined;
    }
    /**
    */
    export class RawDebugRenderPipeline {
        free(): void;
        /**
        */
        constructor();
        /**
        * @returns {Float32Array}
        */
        vertices(): Float32Array;
        /**
        * @returns {Float32Array}
        */
        colors(): Float32Array;
        /**
        * @param {RawRigidBodySet} bodies
        * @param {RawColliderSet} colliders
        * @param {RawImpulseJointSet} impulse_joints
        * @param {RawMultibodyJointSet} multibody_joints
        * @param {RawNarrowPhase} narrow_phase
        */
        render(bodies: RawRigidBodySet, colliders: RawColliderSet, impulse_joints: RawImpulseJointSet, multibody_joints: RawMultibodyJointSet, narrow_phase: RawNarrowPhase): void;
    }
    /**
    */
    export class RawDeserializedWorld {
        free(): void;
        /**
        * @returns {RawVector | undefined}
        */
        takeGravity(): RawVector | undefined;
        /**
        * @returns {RawIntegrationParameters | undefined}
        */
        takeIntegrationParameters(): RawIntegrationParameters | undefined;
        /**
        * @returns {RawIslandManager | undefined}
        */
        takeIslandManager(): RawIslandManager | undefined;
        /**
        * @returns {RawBroadPhase | undefined}
        */
        takeBroadPhase(): RawBroadPhase | undefined;
        /**
        * @returns {RawNarrowPhase | undefined}
        */
        takeNarrowPhase(): RawNarrowPhase | undefined;
        /**
        * @returns {RawRigidBodySet | undefined}
        */
        takeBodies(): RawRigidBodySet | undefined;
        /**
        * @returns {RawColliderSet | undefined}
        */
        takeColliders(): RawColliderSet | undefined;
        /**
        * @returns {RawImpulseJointSet | undefined}
        */
        takeImpulseJoints(): RawImpulseJointSet | undefined;
        /**
        * @returns {RawMultibodyJointSet | undefined}
        */
        takeMultibodyJoints(): RawMultibodyJointSet | undefined;
    }
    /**
    * A structure responsible for collecting events generated
    * by the physics engine.
    */
    export class RawEventQueue {
        free(): void;
        /**
        * Creates a new event collector.
        *
        * # Parameters
        * - `autoDrain`: setting this to `true` is strongly recommended. If true, the collector will
        * be automatically drained before each `world.step(collector)`. If false, the collector will
        * keep all events in memory unless it is manually drained/cleared; this may lead to unbounded use of
        * RAM if no drain is performed.
        * @param {boolean} autoDrain
        */
        constructor(autoDrain: boolean);
        /**
        * Applies the given javascript closure on each collision event of this collector, then clear
        * the internal collision event buffer.
        *
        * # Parameters
        * - `f(handle1, handle2, started)`:  JavaScript closure applied to each collision event. The
        * closure should take three arguments: two integers representing the handles of the colliders
        * involved in the collision, and a boolean indicating if the collision started (true) or stopped
        * (false).
        * @param {Function} f
        */
        drainCollisionEvents(f: Function): void;
        /**
        * @param {Function} f
        */
        drainContactForceEvents(f: Function): void;
        /**
        * Removes all events contained by this collector.
        */
        clear(): void;
    }
    /**
    */
    export class RawGenericJoint {
        free(): void;
        /**
        * Creates a new joint descriptor that builds a Prismatic joint.
        *
        * A prismatic joint removes all the degrees of freedom between the
        * affected bodies, except for the translation along one axis.
        *
        * Returns `None` if any of the provided axes cannot be normalized.
        * @param {RawVector} anchor1
        * @param {RawVector} anchor2
        * @param {RawVector} axis
        * @param {boolean} limitsEnabled
        * @param {number} limitsMin
        * @param {number} limitsMax
        * @returns {RawGenericJoint | undefined}
        */
        static prismatic(anchor1: RawVector, anchor2: RawVector, axis: RawVector, limitsEnabled: boolean, limitsMin: number, limitsMax: number): RawGenericJoint | undefined;
        /**
        * Creates a new joint descriptor that builds a Fixed joint.
        *
        * A fixed joint removes all the degrees of freedom between the affected bodies.
        * @param {RawVector} anchor1
        * @param {RawRotation} axes1
        * @param {RawVector} anchor2
        * @param {RawRotation} axes2
        * @returns {RawGenericJoint}
        */
        static fixed(anchor1: RawVector, axes1: RawRotation, anchor2: RawVector, axes2: RawRotation): RawGenericJoint;
        /**
        * Create a new joint descriptor that builds Revolute joints.
        *
        * A revolute joint removes all degrees of freedom between the affected
        * bodies except for the rotation.
        * @param {RawVector} anchor1
        * @param {RawVector} anchor2
        * @returns {RawGenericJoint | undefined}
        */
        static revolute(anchor1: RawVector, anchor2: RawVector): RawGenericJoint | undefined;
    }
    /**
    */
    export class RawImpulseJointSet {
        free(): void;
        /**
        * The type of this joint.
        * @param {number} handle
        * @returns {number}
        */
        jointType(handle: number): number;
        /**
        * The unique integer identifier of the first rigid-body this joint it attached to.
        * @param {number} handle
        * @returns {number}
        */
        jointBodyHandle1(handle: number): number;
        /**
        * The unique integer identifier of the second rigid-body this joint is attached to.
        * @param {number} handle
        * @returns {number}
        */
        jointBodyHandle2(handle: number): number;
        /**
        * The angular part of the joint’s local frame relative to the first rigid-body it is attached to.
        * @param {number} handle
        * @returns {RawRotation}
        */
        jointFrameX1(handle: number): RawRotation;
        /**
        * The angular part of the joint’s local frame relative to the second rigid-body it is attached to.
        * @param {number} handle
        * @returns {RawRotation}
        */
        jointFrameX2(handle: number): RawRotation;
        /**
        * The position of the first anchor of this joint.
        *
        * The first anchor gives the position of the points application point on the
        * local frame of the first rigid-body it is attached to.
        * @param {number} handle
        * @returns {RawVector}
        */
        jointAnchor1(handle: number): RawVector;
        /**
        * The position of the second anchor of this joint.
        *
        * The second anchor gives the position of the points application point on the
        * local frame of the second rigid-body it is attached to.
        * @param {number} handle
        * @returns {RawVector}
        */
        jointAnchor2(handle: number): RawVector;
        /**
        * Sets the position of the first local anchor
        * @param {number} handle
        * @param {RawVector} newPos
        */
        jointSetAnchor1(handle: number, newPos: RawVector): void;
        /**
        * Sets the position of the second local anchor
        * @param {number} handle
        * @param {RawVector} newPos
        */
        jointSetAnchor2(handle: number, newPos: RawVector): void;
        /**
        * Are contacts between the rigid-bodies attached by this joint enabled?
        * @param {number} handle
        * @returns {boolean}
        */
        jointContactsEnabled(handle: number): boolean;
        /**
        * Sets whether contacts are enabled between the rigid-bodies attached by this joint.
        * @param {number} handle
        * @param {boolean} enabled
        */
        jointSetContactsEnabled(handle: number, enabled: boolean): void;
        /**
        * Are the limits for this joint enabled?
        * @param {number} handle
        * @param {number} axis
        * @returns {boolean}
        */
        jointLimitsEnabled(handle: number, axis: number): boolean;
        /**
        * Return the lower limit along the given joint axis.
        * @param {number} handle
        * @param {number} axis
        * @returns {number}
        */
        jointLimitsMin(handle: number, axis: number): number;
        /**
        * If this is a prismatic joint, returns its upper limit.
        * @param {number} handle
        * @param {number} axis
        * @returns {number}
        */
        jointLimitsMax(handle: number, axis: number): number;
        /**
        * Enables and sets the joint limits
        * @param {number} handle
        * @param {number} axis
        * @param {number} min
        * @param {number} max
        */
        jointSetLimits(handle: number, axis: number, min: number, max: number): void;
        /**
        * @param {number} handle
        * @param {number} axis
        * @param {number} model
        */
        jointConfigureMotorModel(handle: number, axis: number, model: number): void;
        /**
        * @param {number} handle
        * @param {number} axis
        * @param {number} targetVel
        * @param {number} factor
        */
        jointConfigureMotorVelocity(handle: number, axis: number, targetVel: number, factor: number): void;
        /**
        * @param {number} handle
        * @param {number} axis
        * @param {number} targetPos
        * @param {number} stiffness
        * @param {number} damping
        */
        jointConfigureMotorPosition(handle: number, axis: number, targetPos: number, stiffness: number, damping: number): void;
        /**
        * @param {number} handle
        * @param {number} axis
        * @param {number} targetPos
        * @param {number} targetVel
        * @param {number} stiffness
        * @param {number} damping
        */
        jointConfigureMotor(handle: number, axis: number, targetPos: number, targetVel: number, stiffness: number, damping: number): void;
        /**
        */
        constructor();
        /**
        * @param {RawGenericJoint} params
        * @param {number} parent1
        * @param {number} parent2
        * @param {boolean} wake_up
        * @returns {number}
        */
        createJoint(params: RawGenericJoint, parent1: number, parent2: number, wake_up: boolean): number;
        /**
        * @param {number} handle
        * @param {boolean} wakeUp
        */
        remove(handle: number, wakeUp: boolean): void;
        /**
        * @returns {number}
        */
        len(): number;
        /**
        * @param {number} handle
        * @returns {boolean}
        */
        contains(handle: number): boolean;
        /**
        * Applies the given JavaScript function to the integer handle of each joint managed by this physics world.
        *
        * # Parameters
        * - `f(handle)`: the function to apply to the integer handle of each joint managed by this set. Called as `f(collider)`.
        * @param {Function} f
        */
        forEachJointHandle(f: Function): void;
        /**
        * Applies the given JavaScript function to the integer handle of each joint attached to the given rigid-body.
        *
        * # Parameters
        * - `f(handle)`: the function to apply to the integer handle of each joint attached to the rigid-body. Called as `f(collider)`.
        * @param {number} body
        * @param {Function} f
        */
        forEachJointAttachedToRigidBody(body: number, f: Function): void;
    }
    /**
    */
    export class RawIntegrationParameters {
        free(): void;
        /**
        */
        constructor();
        /**
        */
        allowedLinearError: number;
        /**
        */
        dt: number;
        /**
        */
        erp: number;
        /**
        */
        maxCcdSubsteps: number;
        /**
        */
        maxStabilizationIterations: number;
        /**
        */
        maxVelocityFrictionIterations: number;
        /**
        */
        maxVelocityIterations: number;
        /**
        */
        minIslandSize: number;
        /**
        */
        predictionDistance: number;
    }
    /**
    */
    export class RawIslandManager {
        free(): void;
        /**
        */
        constructor();
        /**
        * Applies the given JavaScript function to the integer handle of each active rigid-body
        * managed by this island manager.
        *
        * After a short time of inactivity, a rigid-body is automatically deactivated ("asleep") by
        * the physics engine in order to save computational power. A sleeping rigid-body never moves
        * unless it is moved manually by the user.
        *
        * # Parameters
        * - `f(handle)`: the function to apply to the integer handle of each active rigid-body managed by this
        *   set. Called as `f(collider)`.
        * @param {Function} f
        */
        forEachActiveRigidBodyHandle(f: Function): void;
    }
    /**
    */
    export class RawKinematicCharacterController {
        free(): void;
        /**
        * @param {number} offset
        */
        constructor(offset: number);
        /**
        * @returns {RawVector}
        */
        up(): RawVector;
        /**
        * @param {RawVector} vector
        */
        setUp(vector: RawVector): void;
        /**
        * @returns {number}
        */
        offset(): number;
        /**
        * @param {number} value
        */
        setOffset(value: number): void;
        /**
        * @returns {boolean}
        */
        slideEnabled(): boolean;
        /**
        * @param {boolean} enabled
        */
        setSlideEnabled(enabled: boolean): void;
        /**
        * @returns {number | undefined}
        */
        autostepMaxHeight(): number | undefined;
        /**
        * @returns {number | undefined}
        */
        autostepMinWidth(): number | undefined;
        /**
        * @returns {boolean | undefined}
        */
        autostepIncludesDynamicBodies(): boolean | undefined;
        /**
        * @returns {boolean}
        */
        autostepEnabled(): boolean;
        /**
        * @param {number} maxHeight
        * @param {number} minWidth
        * @param {boolean} includeDynamicBodies
        */
        enableAutostep(maxHeight: number, minWidth: number, includeDynamicBodies: boolean): void;
        /**
        */
        disableAutostep(): void;
        /**
        * @returns {number}
        */
        maxSlopeClimbAngle(): number;
        /**
        * @param {number} angle
        */
        setMaxSlopeClimbAngle(angle: number): void;
        /**
        * @returns {number}
        */
        minSlopeSlideAngle(): number;
        /**
        * @param {number} angle
        */
        setMinSlopeSlideAngle(angle: number): void;
        /**
        * @returns {number | undefined}
        */
        snapToGroundDistance(): number | undefined;
        /**
        * @param {number} distance
        */
        enableSnapToGround(distance: number): void;
        /**
        */
        disableSnapToGround(): void;
        /**
        * @returns {boolean}
        */
        snapToGroundEnabled(): boolean;
        /**
        * @param {number} dt
        * @param {RawRigidBodySet} bodies
        * @param {RawColliderSet} colliders
        * @param {RawQueryPipeline} queries
        * @param {number} collider_handle
        * @param {RawVector} desired_translation
        * @param {boolean} apply_impulses_to_dynamic_bodies
        * @param {number | undefined} character_mass
        * @param {number} filter_flags
        * @param {number | undefined} filter_groups
        * @param {Function} filter_predicate
        */
        computeColliderMovement(dt: number, bodies: RawRigidBodySet, colliders: RawColliderSet, queries: RawQueryPipeline, collider_handle: number, desired_translation: RawVector, apply_impulses_to_dynamic_bodies: boolean, character_mass: number | undefined, filter_flags: number, filter_groups: number | undefined, filter_predicate: Function): void;
        /**
        * @returns {RawVector}
        */
        computedMovement(): RawVector;
        /**
        * @returns {boolean}
        */
        computedGrounded(): boolean;
        /**
        * @returns {number}
        */
        numComputedCollisions(): number;
        /**
        * @param {number} i
        * @param {RawCharacterCollision} collision
        * @returns {boolean}
        */
        computedCollision(i: number, collision: RawCharacterCollision): boolean;
    }
    /**
    */
    export class RawMultibodyJointSet {
        free(): void;
        /**
        * The type of this joint.
        * @param {number} handle
        * @returns {number}
        */
        jointType(handle: number): number;
        /**
        * The angular part of the joint’s local frame relative to the first rigid-body it is attached to.
        * @param {number} handle
        * @returns {RawRotation}
        */
        jointFrameX1(handle: number): RawRotation;
        /**
        * The angular part of the joint’s local frame relative to the second rigid-body it is attached to.
        * @param {number} handle
        * @returns {RawRotation}
        */
        jointFrameX2(handle: number): RawRotation;
        /**
        * The position of the first anchor of this joint.
        *
        * The first anchor gives the position of the points application point on the
        * local frame of the first rigid-body it is attached to.
        * @param {number} handle
        * @returns {RawVector}
        */
        jointAnchor1(handle: number): RawVector;
        /**
        * The position of the second anchor of this joint.
        *
        * The second anchor gives the position of the points application point on the
        * local frame of the second rigid-body it is attached to.
        * @param {number} handle
        * @returns {RawVector}
        */
        jointAnchor2(handle: number): RawVector;
        /**
        * Are contacts between the rigid-bodies attached by this joint enabled?
        * @param {number} handle
        * @returns {boolean}
        */
        jointContactsEnabled(handle: number): boolean;
        /**
        * Sets whether contacts are enabled between the rigid-bodies attached by this joint.
        * @param {number} handle
        * @param {boolean} enabled
        */
        jointSetContactsEnabled(handle: number, enabled: boolean): void;
        /**
        * Are the limits for this joint enabled?
        * @param {number} handle
        * @param {number} axis
        * @returns {boolean}
        */
        jointLimitsEnabled(handle: number, axis: number): boolean;
        /**
        * Return the lower limit along the given joint axis.
        * @param {number} handle
        * @param {number} axis
        * @returns {number}
        */
        jointLimitsMin(handle: number, axis: number): number;
        /**
        * If this is a prismatic joint, returns its upper limit.
        * @param {number} handle
        * @param {number} axis
        * @returns {number}
        */
        jointLimitsMax(handle: number, axis: number): number;
        /**
        */
        constructor();
        /**
        * @param {RawGenericJoint} params
        * @param {number} parent1
        * @param {number} parent2
        * @param {boolean} wakeUp
        * @returns {number}
        */
        createJoint(params: RawGenericJoint, parent1: number, parent2: number, wakeUp: boolean): number;
        /**
        * @param {number} handle
        * @param {boolean} wakeUp
        */
        remove(handle: number, wakeUp: boolean): void;
        /**
        * @param {number} handle
        * @returns {boolean}
        */
        contains(handle: number): boolean;
        /**
        * Applies the given JavaScript function to the integer handle of each joint managed by this physics world.
        *
        * # Parameters
        * - `f(handle)`: the function to apply to the integer handle of each joint managed by this set. Called as `f(collider)`.
        * @param {Function} f
        */
        forEachJointHandle(f: Function): void;
        /**
        * Applies the given JavaScript function to the integer handle of each joint attached to the given rigid-body.
        *
        * # Parameters
        * - `f(handle)`: the function to apply to the integer handle of each joint attached to the rigid-body. Called as `f(collider)`.
        * @param {number} body
        * @param {Function} f
        */
        forEachJointAttachedToRigidBody(body: number, f: Function): void;
    }
    /**
    */
    export class RawNarrowPhase {
        free(): void;
        /**
        */
        constructor();
        /**
        * @param {number} handle1
        * @param {Function} f
        */
        contacts_with(handle1: number, f: Function): void;
        /**
        * @param {number} handle1
        * @param {number} handle2
        * @returns {RawContactPair | undefined}
        */
        contact_pair(handle1: number, handle2: number): RawContactPair | undefined;
        /**
        * @param {number} handle1
        * @param {Function} f
        */
        intersections_with(handle1: number, f: Function): void;
        /**
        * @param {number} handle1
        * @param {number} handle2
        * @returns {boolean}
        */
        intersection_pair(handle1: number, handle2: number): boolean;
    }
    /**
    */
    export class RawPhysicsPipeline {
        free(): void;
        /**
        */
        constructor();
        /**
        * @param {RawVector} gravity
        * @param {RawIntegrationParameters} integrationParameters
        * @param {RawIslandManager} islands
        * @param {RawBroadPhase} broadPhase
        * @param {RawNarrowPhase} narrowPhase
        * @param {RawRigidBodySet} bodies
        * @param {RawColliderSet} colliders
        * @param {RawImpulseJointSet} joints
        * @param {RawMultibodyJointSet} articulations
        * @param {RawCCDSolver} ccd_solver
        */
        step(gravity: RawVector, integrationParameters: RawIntegrationParameters, islands: RawIslandManager, broadPhase: RawBroadPhase, narrowPhase: RawNarrowPhase, bodies: RawRigidBodySet, colliders: RawColliderSet, joints: RawImpulseJointSet, articulations: RawMultibodyJointSet, ccd_solver: RawCCDSolver): void;
        /**
        * @param {RawVector} gravity
        * @param {RawIntegrationParameters} integrationParameters
        * @param {RawIslandManager} islands
        * @param {RawBroadPhase} broadPhase
        * @param {RawNarrowPhase} narrowPhase
        * @param {RawRigidBodySet} bodies
        * @param {RawColliderSet} colliders
        * @param {RawImpulseJointSet} joints
        * @param {RawMultibodyJointSet} articulations
        * @param {RawCCDSolver} ccd_solver
        * @param {RawEventQueue} eventQueue
        * @param {object} hookObject
        * @param {Function} hookFilterContactPair
        * @param {Function} hookFilterIntersectionPair
        */
        stepWithEvents(gravity: RawVector, integrationParameters: RawIntegrationParameters, islands: RawIslandManager, broadPhase: RawBroadPhase, narrowPhase: RawNarrowPhase, bodies: RawRigidBodySet, colliders: RawColliderSet, joints: RawImpulseJointSet, articulations: RawMultibodyJointSet, ccd_solver: RawCCDSolver, eventQueue: RawEventQueue, hookObject: object, hookFilterContactPair: Function, hookFilterIntersectionPair: Function): void;
    }
    /**
    */
    export class RawPointColliderProjection {
        free(): void;
        /**
        * @returns {number}
        */
        colliderHandle(): number;
        /**
        * @returns {RawVector}
        */
        point(): RawVector;
        /**
        * @returns {boolean}
        */
        isInside(): boolean;
        /**
        * @returns {number}
        */
        featureType(): number;
        /**
        * @returns {number | undefined}
        */
        featureId(): number | undefined;
    }
    /**
    */
    export class RawPointProjection {
        free(): void;
        /**
        * @returns {RawVector}
        */
        point(): RawVector;
        /**
        * @returns {boolean}
        */
        isInside(): boolean;
    }
    /**
    */
    export class RawQueryPipeline {
        free(): void;
        /**
        */
        constructor();
        /**
        * @param {RawRigidBodySet} bodies
        * @param {RawColliderSet} colliders
        */
        update(bodies: RawRigidBodySet, colliders: RawColliderSet): void;
        /**
        * @param {RawRigidBodySet} bodies
        * @param {RawColliderSet} colliders
        * @param {RawVector} rayOrig
        * @param {RawVector} rayDir
        * @param {number} maxToi
        * @param {boolean} solid
        * @param {number} filter_flags
        * @param {number | undefined} filter_groups
        * @param {number | undefined} filter_exclude_collider
        * @param {number | undefined} filter_exclude_rigid_body
        * @param {Function} filter_predicate
        * @returns {RawRayColliderToi | undefined}
        */
        castRay(bodies: RawRigidBodySet, colliders: RawColliderSet, rayOrig: RawVector, rayDir: RawVector, maxToi: number, solid: boolean, filter_flags: number, filter_groups: number | undefined, filter_exclude_collider: number | undefined, filter_exclude_rigid_body: number | undefined, filter_predicate: Function): RawRayColliderToi | undefined;
        /**
        * @param {RawRigidBodySet} bodies
        * @param {RawColliderSet} colliders
        * @param {RawVector} rayOrig
        * @param {RawVector} rayDir
        * @param {number} maxToi
        * @param {boolean} solid
        * @param {number} filter_flags
        * @param {number | undefined} filter_groups
        * @param {number | undefined} filter_exclude_collider
        * @param {number | undefined} filter_exclude_rigid_body
        * @param {Function} filter_predicate
        * @returns {RawRayColliderIntersection | undefined}
        */
        castRayAndGetNormal(bodies: RawRigidBodySet, colliders: RawColliderSet, rayOrig: RawVector, rayDir: RawVector, maxToi: number, solid: boolean, filter_flags: number, filter_groups: number | undefined, filter_exclude_collider: number | undefined, filter_exclude_rigid_body: number | undefined, filter_predicate: Function): RawRayColliderIntersection | undefined;
        /**
        * @param {RawRigidBodySet} bodies
        * @param {RawColliderSet} colliders
        * @param {RawVector} rayOrig
        * @param {RawVector} rayDir
        * @param {number} maxToi
        * @param {boolean} solid
        * @param {Function} callback
        * @param {number} filter_flags
        * @param {number | undefined} filter_groups
        * @param {number | undefined} filter_exclude_collider
        * @param {number | undefined} filter_exclude_rigid_body
        * @param {Function} filter_predicate
        */
        intersectionsWithRay(bodies: RawRigidBodySet, colliders: RawColliderSet, rayOrig: RawVector, rayDir: RawVector, maxToi: number, solid: boolean, callback: Function, filter_flags: number, filter_groups: number | undefined, filter_exclude_collider: number | undefined, filter_exclude_rigid_body: number | undefined, filter_predicate: Function): void;
        /**
        * @param {RawRigidBodySet} bodies
        * @param {RawColliderSet} colliders
        * @param {RawVector} shapePos
        * @param {RawRotation} shapeRot
        * @param {RawShape} shape
        * @param {number} filter_flags
        * @param {number | undefined} filter_groups
        * @param {number | undefined} filter_exclude_collider
        * @param {number | undefined} filter_exclude_rigid_body
        * @param {Function} filter_predicate
        * @returns {number | undefined}
        */
        intersectionWithShape(bodies: RawRigidBodySet, colliders: RawColliderSet, shapePos: RawVector, shapeRot: RawRotation, shape: RawShape, filter_flags: number, filter_groups: number | undefined, filter_exclude_collider: number | undefined, filter_exclude_rigid_body: number | undefined, filter_predicate: Function): number | undefined;
        /**
        * @param {RawRigidBodySet} bodies
        * @param {RawColliderSet} colliders
        * @param {RawVector} point
        * @param {boolean} solid
        * @param {number} filter_flags
        * @param {number | undefined} filter_groups
        * @param {number | undefined} filter_exclude_collider
        * @param {number | undefined} filter_exclude_rigid_body
        * @param {Function} filter_predicate
        * @returns {RawPointColliderProjection | undefined}
        */
        projectPoint(bodies: RawRigidBodySet, colliders: RawColliderSet, point: RawVector, solid: boolean, filter_flags: number, filter_groups: number | undefined, filter_exclude_collider: number | undefined, filter_exclude_rigid_body: number | undefined, filter_predicate: Function): RawPointColliderProjection | undefined;
        /**
        * @param {RawRigidBodySet} bodies
        * @param {RawColliderSet} colliders
        * @param {RawVector} point
        * @param {number} filter_flags
        * @param {number | undefined} filter_groups
        * @param {number | undefined} filter_exclude_collider
        * @param {number | undefined} filter_exclude_rigid_body
        * @param {Function} filter_predicate
        * @returns {RawPointColliderProjection | undefined}
        */
        projectPointAndGetFeature(bodies: RawRigidBodySet, colliders: RawColliderSet, point: RawVector, filter_flags: number, filter_groups: number | undefined, filter_exclude_collider: number | undefined, filter_exclude_rigid_body: number | undefined, filter_predicate: Function): RawPointColliderProjection | undefined;
        /**
        * @param {RawRigidBodySet} bodies
        * @param {RawColliderSet} colliders
        * @param {RawVector} point
        * @param {Function} callback
        * @param {number} filter_flags
        * @param {number | undefined} filter_groups
        * @param {number | undefined} filter_exclude_collider
        * @param {number | undefined} filter_exclude_rigid_body
        * @param {Function} filter_predicate
        */
        intersectionsWithPoint(bodies: RawRigidBodySet, colliders: RawColliderSet, point: RawVector, callback: Function, filter_flags: number, filter_groups: number | undefined, filter_exclude_collider: number | undefined, filter_exclude_rigid_body: number | undefined, filter_predicate: Function): void;
        /**
        * @param {RawRigidBodySet} bodies
        * @param {RawColliderSet} colliders
        * @param {RawVector} shapePos
        * @param {RawRotation} shapeRot
        * @param {RawVector} shapeVel
        * @param {RawShape} shape
        * @param {number} maxToi
        * @param {boolean} stop_at_penetration
        * @param {number} filter_flags
        * @param {number | undefined} filter_groups
        * @param {number | undefined} filter_exclude_collider
        * @param {number | undefined} filter_exclude_rigid_body
        * @param {Function} filter_predicate
        * @returns {RawShapeColliderTOI | undefined}
        */
        castShape(bodies: RawRigidBodySet, colliders: RawColliderSet, shapePos: RawVector, shapeRot: RawRotation, shapeVel: RawVector, shape: RawShape, maxToi: number, stop_at_penetration: boolean, filter_flags: number, filter_groups: number | undefined, filter_exclude_collider: number | undefined, filter_exclude_rigid_body: number | undefined, filter_predicate: Function): RawShapeColliderTOI | undefined;
        /**
        * @param {RawRigidBodySet} bodies
        * @param {RawColliderSet} colliders
        * @param {RawVector} shapePos
        * @param {RawRotation} shapeRot
        * @param {RawShape} shape
        * @param {Function} callback
        * @param {number} filter_flags
        * @param {number | undefined} filter_groups
        * @param {number | undefined} filter_exclude_collider
        * @param {number | undefined} filter_exclude_rigid_body
        * @param {Function} filter_predicate
        */
        intersectionsWithShape(bodies: RawRigidBodySet, colliders: RawColliderSet, shapePos: RawVector, shapeRot: RawRotation, shape: RawShape, callback: Function, filter_flags: number, filter_groups: number | undefined, filter_exclude_collider: number | undefined, filter_exclude_rigid_body: number | undefined, filter_predicate: Function): void;
        /**
        * @param {RawVector} aabbCenter
        * @param {RawVector} aabbHalfExtents
        * @param {Function} callback
        */
        collidersWithAabbIntersectingAabb(aabbCenter: RawVector, aabbHalfExtents: RawVector, callback: Function): void;
    }
    /**
    */
    export class RawRayColliderIntersection {
        free(): void;
        /**
        * @returns {number}
        */
        colliderHandle(): number;
        /**
        * @returns {RawVector}
        */
        normal(): RawVector;
        /**
        * @returns {number}
        */
        toi(): number;
        /**
        * @returns {number}
        */
        featureType(): number;
        /**
        * @returns {number | undefined}
        */
        featureId(): number | undefined;
    }
    /**
    */
    export class RawRayColliderToi {
        free(): void;
        /**
        * @returns {number}
        */
        colliderHandle(): number;
        /**
        * @returns {number}
        */
        toi(): number;
    }
    /**
    */
    export class RawRayIntersection {
        free(): void;
        /**
        * @returns {RawVector}
        */
        normal(): RawVector;
        /**
        * @returns {number}
        */
        toi(): number;
        /**
        * @returns {number}
        */
        featureType(): number;
        /**
        * @returns {number | undefined}
        */
        featureId(): number | undefined;
    }
    /**
    */
    export class RawRigidBodySet {
        free(): void;
        /**
        * The world-space translation of this rigid-body.
        * @param {number} handle
        * @returns {RawVector}
        */
        rbTranslation(handle: number): RawVector;
        /**
        * The world-space orientation of this rigid-body.
        * @param {number} handle
        * @returns {RawRotation}
        */
        rbRotation(handle: number): RawRotation;
        /**
        * Put the given rigid-body to sleep.
        * @param {number} handle
        */
        rbSleep(handle: number): void;
        /**
        * Is this rigid-body sleeping?
        * @param {number} handle
        * @returns {boolean}
        */
        rbIsSleeping(handle: number): boolean;
        /**
        * Is the velocity of this rigid-body not zero?
        * @param {number} handle
        * @returns {boolean}
        */
        rbIsMoving(handle: number): boolean;
        /**
        * The world-space predicted translation of this rigid-body.
        *
        * If this rigid-body is kinematic this value is set by the `setNextKinematicTranslation`
        * method and is used for estimating the kinematic body velocity at the next timestep.
        * For non-kinematic bodies, this value is currently unspecified.
        * @param {number} handle
        * @returns {RawVector}
        */
        rbNextTranslation(handle: number): RawVector;
        /**
        * The world-space predicted orientation of this rigid-body.
        *
        * If this rigid-body is kinematic this value is set by the `setNextKinematicRotation`
        * method and is used for estimating the kinematic body velocity at the next timestep.
        * For non-kinematic bodies, this value is currently unspecified.
        * @param {number} handle
        * @returns {RawRotation}
        */
        rbNextRotation(handle: number): RawRotation;
        /**
        * Sets the translation of this rigid-body.
        *
        * # Parameters
        * - `x`: the world-space position of the rigid-body along the `x` axis.
        * - `y`: the world-space position of the rigid-body along the `y` axis.
        * - `wakeUp`: forces the rigid-body to wake-up so it is properly affected by forces if it
        * wasn't moving before modifying its position.
        * @param {number} handle
        * @param {number} x
        * @param {number} y
        * @param {boolean} wakeUp
        */
        rbSetTranslation(handle: number, x: number, y: number, wakeUp: boolean): void;
        /**
        * Sets the rotation angle of this rigid-body.
        *
        * # Parameters
        * - `angle`: the rotation angle, in radians.
        * - `wakeUp`: forces the rigid-body to wake-up so it is properly affected by forces if it
        * wasn't moving before modifying its position.
        * @param {number} handle
        * @param {number} angle
        * @param {boolean} wakeUp
        */
        rbSetRotation(handle: number, angle: number, wakeUp: boolean): void;
        /**
        * Sets the linear velocity of this rigid-body.
        * @param {number} handle
        * @param {RawVector} linvel
        * @param {boolean} wakeUp
        */
        rbSetLinvel(handle: number, linvel: RawVector, wakeUp: boolean): void;
        /**
        * Sets the angular velocity of this rigid-body.
        * @param {number} handle
        * @param {number} angvel
        * @param {boolean} wakeUp
        */
        rbSetAngvel(handle: number, angvel: number, wakeUp: boolean): void;
        /**
        * If this rigid body is kinematic, sets its future translation after the next timestep integration.
        *
        * This should be used instead of `rigidBody.setTranslation` to make the dynamic object
        * interacting with this kinematic body behave as expected. Internally, Rapier will compute
        * an artificial velocity for this rigid-body from its current position and its next kinematic
        * position. This velocity will be used to compute forces on dynamic bodies interacting with
        * this body.
        *
        * # Parameters
        * - `x`: the world-space position of the rigid-body along the `x` axis.
        * - `y`: the world-space position of the rigid-body along the `y` axis.
        * @param {number} handle
        * @param {number} x
        * @param {number} y
        */
        rbSetNextKinematicTranslation(handle: number, x: number, y: number): void;
        /**
        * If this rigid body is kinematic, sets its future rotation after the next timestep integration.
        *
        * This should be used instead of `rigidBody.setRotation` to make the dynamic object
        * interacting with this kinematic body behave as expected. Internally, Rapier will compute
        * an artificial velocity for this rigid-body from its current position and its next kinematic
        * position. This velocity will be used to compute forces on dynamic bodies interacting with
        * this body.
        *
        * # Parameters
        * - `angle`: the rotation angle, in radians.
        * @param {number} handle
        * @param {number} angle
        */
        rbSetNextKinematicRotation(handle: number, angle: number): void;
        /**
        * @param {number} handle
        * @param {RawColliderSet} colliders
        */
        rbRecomputeMassPropertiesFromColliders(handle: number, colliders: RawColliderSet): void;
        /**
        * @param {number} handle
        * @param {number} mass
        * @param {boolean} wake_up
        */
        rbSetAdditionalMass(handle: number, mass: number, wake_up: boolean): void;
        /**
        * @param {number} handle
        * @param {number} mass
        * @param {RawVector} centerOfMass
        * @param {number} principalAngularInertia
        * @param {boolean} wake_up
        */
        rbSetAdditionalMassProperties(handle: number, mass: number, centerOfMass: RawVector, principalAngularInertia: number, wake_up: boolean): void;
        /**
        * The linear velocity of this rigid-body.
        * @param {number} handle
        * @returns {RawVector}
        */
        rbLinvel(handle: number): RawVector;
        /**
        * The angular velocity of this rigid-body.
        * @param {number} handle
        * @returns {number}
        */
        rbAngvel(handle: number): number;
        /**
        * @param {number} handle
        * @param {boolean} locked
        * @param {boolean} wake_up
        */
        rbLockTranslations(handle: number, locked: boolean, wake_up: boolean): void;
        /**
        * @param {number} handle
        * @param {boolean} allow_x
        * @param {boolean} allow_y
        * @param {boolean} wake_up
        */
        rbSetEnabledTranslations(handle: number, allow_x: boolean, allow_y: boolean, wake_up: boolean): void;
        /**
        * @param {number} handle
        * @param {boolean} locked
        * @param {boolean} wake_up
        */
        rbLockRotations(handle: number, locked: boolean, wake_up: boolean): void;
        /**
        * @param {number} handle
        * @returns {number}
        */
        rbDominanceGroup(handle: number): number;
        /**
        * @param {number} handle
        * @param {number} group
        */
        rbSetDominanceGroup(handle: number, group: number): void;
        /**
        * @param {number} handle
        * @param {boolean} enabled
        */
        rbEnableCcd(handle: number, enabled: boolean): void;
        /**
        * The mass of this rigid-body.
        * @param {number} handle
        * @returns {number}
        */
        rbMass(handle: number): number;
        /**
        * The inverse of the mass of a rigid-body.
        *
        * If this is zero, the rigid-body is assumed to have infinite mass.
        * @param {number} handle
        * @returns {number}
        */
        rbInvMass(handle: number): number;
        /**
        * The inverse mass taking into account translation locking.
        * @param {number} handle
        * @returns {RawVector}
        */
        rbEffectiveInvMass(handle: number): RawVector;
        /**
        * The center of mass of a rigid-body expressed in its local-space.
        * @param {number} handle
        * @returns {RawVector}
        */
        rbLocalCom(handle: number): RawVector;
        /**
        * The world-space center of mass of the rigid-body.
        * @param {number} handle
        * @returns {RawVector}
        */
        rbWorldCom(handle: number): RawVector;
        /**
        * The inverse of the principal angular inertia of the rigid-body.
        *
        * Components set to zero are assumed to be infinite along the corresponding principal axis.
        * @param {number} handle
        * @returns {number}
        */
        rbInvPrincipalInertiaSqrt(handle: number): number;
        /**
        * The angular inertia along the principal inertia axes of the rigid-body.
        * @param {number} handle
        * @returns {number}
        */
        rbPrincipalInertia(handle: number): number;
        /**
        * The square-root of the world-space inverse angular inertia tensor of the rigid-body,
        * taking into account rotation locking.
        * @param {number} handle
        * @returns {number}
        */
        rbEffectiveWorldInvInertiaSqrt(handle: number): number;
        /**
        * The effective world-space angular inertia (that takes the potential rotation locking into account) of
        * this rigid-body.
        * @param {number} handle
        * @returns {number}
        */
        rbEffectiveAngularInertia(handle: number): number;
        /**
        * Wakes this rigid-body up.
        *
        * A dynamic rigid-body that does not move during several consecutive frames will
        * be put to sleep by the physics engine, i.e., it will stop being simulated in order
        * to avoid useless computations.
        * This methods forces a sleeping rigid-body to wake-up. This is useful, e.g., before modifying
        * the position of a dynamic body so that it is properly simulated afterwards.
        * @param {number} handle
        */
        rbWakeUp(handle: number): void;
        /**
        * Is Continuous Collision Detection enabled for this rigid-body?
        * @param {number} handle
        * @returns {boolean}
        */
        rbIsCcdEnabled(handle: number): boolean;
        /**
        * The number of colliders attached to this rigid-body.
        * @param {number} handle
        * @returns {number}
        */
        rbNumColliders(handle: number): number;
        /**
        * Retrieves the `i-th` collider attached to this rigid-body.
        *
        * # Parameters
        * - `at`: The index of the collider to retrieve. Must be a number in `[0, this.numColliders()[`.
        *         This index is **not** the same as the unique identifier of the collider.
        * @param {number} handle
        * @param {number} at
        * @returns {number}
        */
        rbCollider(handle: number, at: number): number;
        /**
        * The status of this rigid-body: fixed, dynamic, or kinematic.
        * @param {number} handle
        * @returns {number}
        */
        rbBodyType(handle: number): number;
        /**
        * Set a new status for this rigid-body: fixed, dynamic, or kinematic.
        * @param {number} handle
        * @param {number} status
        * @param {boolean} wake_up
        */
        rbSetBodyType(handle: number, status: number, wake_up: boolean): void;
        /**
        * Is this rigid-body fixed?
        * @param {number} handle
        * @returns {boolean}
        */
        rbIsFixed(handle: number): boolean;
        /**
        * Is this rigid-body kinematic?
        * @param {number} handle
        * @returns {boolean}
        */
        rbIsKinematic(handle: number): boolean;
        /**
        * Is this rigid-body dynamic?
        * @param {number} handle
        * @returns {boolean}
        */
        rbIsDynamic(handle: number): boolean;
        /**
        * The linear damping coefficient of this rigid-body.
        * @param {number} handle
        * @returns {number}
        */
        rbLinearDamping(handle: number): number;
        /**
        * The angular damping coefficient of this rigid-body.
        * @param {number} handle
        * @returns {number}
        */
        rbAngularDamping(handle: number): number;
        /**
        * @param {number} handle
        * @param {number} factor
        */
        rbSetLinearDamping(handle: number, factor: number): void;
        /**
        * @param {number} handle
        * @param {number} factor
        */
        rbSetAngularDamping(handle: number, factor: number): void;
        /**
        * @param {number} handle
        * @param {boolean} enabled
        */
        rbSetEnabled(handle: number, enabled: boolean): void;
        /**
        * @param {number} handle
        * @returns {boolean}
        */
        rbIsEnabled(handle: number): boolean;
        /**
        * @param {number} handle
        * @returns {number}
        */
        rbGravityScale(handle: number): number;
        /**
        * @param {number} handle
        * @param {number} factor
        * @param {boolean} wakeUp
        */
        rbSetGravityScale(handle: number, factor: number, wakeUp: boolean): void;
        /**
        * Resets to zero all user-added forces added to this rigid-body.
        * @param {number} handle
        * @param {boolean} wakeUp
        */
        rbResetForces(handle: number, wakeUp: boolean): void;
        /**
        * Resets to zero all user-added torques added to this rigid-body.
        * @param {number} handle
        * @param {boolean} wakeUp
        */
        rbResetTorques(handle: number, wakeUp: boolean): void;
        /**
        * Adds a force at the center-of-mass of this rigid-body.
        *
        * # Parameters
        * - `force`: the world-space force to apply on the rigid-body.
        * - `wakeUp`: should the rigid-body be automatically woken-up?
        * @param {number} handle
        * @param {RawVector} force
        * @param {boolean} wakeUp
        */
        rbAddForce(handle: number, force: RawVector, wakeUp: boolean): void;
        /**
        * Applies an impulse at the center-of-mass of this rigid-body.
        *
        * # Parameters
        * - `impulse`: the world-space impulse to apply on the rigid-body.
        * - `wakeUp`: should the rigid-body be automatically woken-up?
        * @param {number} handle
        * @param {RawVector} impulse
        * @param {boolean} wakeUp
        */
        rbApplyImpulse(handle: number, impulse: RawVector, wakeUp: boolean): void;
        /**
        * Adds a torque at the center-of-mass of this rigid-body.
        *
        * # Parameters
        * - `torque`: the torque to apply on the rigid-body.
        * - `wakeUp`: should the rigid-body be automatically woken-up?
        * @param {number} handle
        * @param {number} torque
        * @param {boolean} wakeUp
        */
        rbAddTorque(handle: number, torque: number, wakeUp: boolean): void;
        /**
        * Applies an impulsive torque at the center-of-mass of this rigid-body.
        *
        * # Parameters
        * - `torque impulse`: the torque impulse to apply on the rigid-body.
        * - `wakeUp`: should the rigid-body be automatically woken-up?
        * @param {number} handle
        * @param {number} torque_impulse
        * @param {boolean} wakeUp
        */
        rbApplyTorqueImpulse(handle: number, torque_impulse: number, wakeUp: boolean): void;
        /**
        * Adds a force at the given world-space point of this rigid-body.
        *
        * # Parameters
        * - `force`: the world-space force to apply on the rigid-body.
        * - `point`: the world-space point where the impulse is to be applied on the rigid-body.
        * - `wakeUp`: should the rigid-body be automatically woken-up?
        * @param {number} handle
        * @param {RawVector} force
        * @param {RawVector} point
        * @param {boolean} wakeUp
        */
        rbAddForceAtPoint(handle: number, force: RawVector, point: RawVector, wakeUp: boolean): void;
        /**
        * Applies an impulse at the given world-space point of this rigid-body.
        *
        * # Parameters
        * - `impulse`: the world-space impulse to apply on the rigid-body.
        * - `point`: the world-space point where the impulse is to be applied on the rigid-body.
        * - `wakeUp`: should the rigid-body be automatically woken-up?
        * @param {number} handle
        * @param {RawVector} impulse
        * @param {RawVector} point
        * @param {boolean} wakeUp
        */
        rbApplyImpulseAtPoint(handle: number, impulse: RawVector, point: RawVector, wakeUp: boolean): void;
        /**
        * An arbitrary user-defined 32-bit integer
        * @param {number} handle
        * @returns {number}
        */
        rbUserData(handle: number): number;
        /**
        * Sets the user-defined 32-bit integer of this rigid-body.
        *
        * # Parameters
        * - `data`: an arbitrary user-defined 32-bit integer.
        * @param {number} handle
        * @param {number} data
        */
        rbSetUserData(handle: number, data: number): void;
        /**
        */
        constructor();
        /**
        * @param {boolean} enabled
        * @param {RawVector} translation
        * @param {RawRotation} rotation
        * @param {number} gravityScale
        * @param {number} mass
        * @param {boolean} massOnly
        * @param {RawVector} centerOfMass
        * @param {RawVector} linvel
        * @param {number} angvel
        * @param {number} principalAngularInertia
        * @param {boolean} translationEnabledX
        * @param {boolean} translationEnabledY
        * @param {boolean} rotationsEnabled
        * @param {number} linearDamping
        * @param {number} angularDamping
        * @param {number} rb_type
        * @param {boolean} canSleep
        * @param {boolean} sleeping
        * @param {boolean} ccdEnabled
        * @param {number} dominanceGroup
        * @returns {number}
        */
        createRigidBody(enabled: boolean, translation: RawVector, rotation: RawRotation, gravityScale: number, mass: number, massOnly: boolean, centerOfMass: RawVector, linvel: RawVector, angvel: number, principalAngularInertia: number, translationEnabledX: boolean, translationEnabledY: boolean, rotationsEnabled: boolean, linearDamping: number, angularDamping: number, rb_type: number, canSleep: boolean, sleeping: boolean, ccdEnabled: boolean, dominanceGroup: number): number;
        /**
        * @param {number} handle
        * @param {RawIslandManager} islands
        * @param {RawColliderSet} colliders
        * @param {RawImpulseJointSet} joints
        * @param {RawMultibodyJointSet} articulations
        */
        remove(handle: number, islands: RawIslandManager, colliders: RawColliderSet, joints: RawImpulseJointSet, articulations: RawMultibodyJointSet): void;
        /**
        * The number of rigid-bodies on this set.
        * @returns {number}
        */
        len(): number;
        /**
        * Checks if a rigid-body with the given integer handle exists.
        * @param {number} handle
        * @returns {boolean}
        */
        contains(handle: number): boolean;
        /**
        * Applies the given JavaScript function to the integer handle of each rigid-body managed by this set.
        *
        * # Parameters
        * - `f(handle)`: the function to apply to the integer handle of each rigid-body managed by this set. Called as `f(collider)`.
        * @param {Function} f
        */
        forEachRigidBodyHandle(f: Function): void;
        /**
        * @param {RawColliderSet} colliders
        */
        propagateModifiedBodyPositionsToColliders(colliders: RawColliderSet): void;
    }
    /**
    * A rotation quaternion.
    */
    export class RawRotation {
        free(): void;
        /**
        * The identity rotation.
        * @returns {RawRotation}
        */
        static identity(): RawRotation;
        /**
        * The rotation with thegiven angle.
        * @param {number} angle
        * @returns {RawRotation}
        */
        static fromAngle(angle: number): RawRotation;
        /**
        * The rotation angle in radians.
        */
        readonly angle: number;
        /**
        * The imaginary part of this complex number.
        */
        readonly im: number;
        /**
        * The real part of this complex number.
        */
        readonly re: number;
    }
    /**
    */
    export class RawSerializationPipeline {
        free(): void;
        /**
        */
        constructor();
        /**
        * @param {RawVector} gravity
        * @param {RawIntegrationParameters} integrationParameters
        * @param {RawIslandManager} islands
        * @param {RawBroadPhase} broadPhase
        * @param {RawNarrowPhase} narrowPhase
        * @param {RawRigidBodySet} bodies
        * @param {RawColliderSet} colliders
        * @param {RawImpulseJointSet} impulse_joints
        * @param {RawMultibodyJointSet} multibody_joints
        * @returns {Uint8Array | undefined}
        */
        serializeAll(gravity: RawVector, integrationParameters: RawIntegrationParameters, islands: RawIslandManager, broadPhase: RawBroadPhase, narrowPhase: RawNarrowPhase, bodies: RawRigidBodySet, colliders: RawColliderSet, impulse_joints: RawImpulseJointSet, multibody_joints: RawMultibodyJointSet): Uint8Array | undefined;
        /**
        * @param {Uint8Array} data
        * @returns {RawDeserializedWorld | undefined}
        */
        deserializeAll(data: Uint8Array): RawDeserializedWorld | undefined;
    }
    /**
    */
    export class RawShape {
        free(): void;
        /**
        * @param {number} hx
        * @param {number} hy
        * @returns {RawShape}
        */
        static cuboid(hx: number, hy: number): RawShape;
        /**
        * @param {number} hx
        * @param {number} hy
        * @param {number} borderRadius
        * @returns {RawShape}
        */
        static roundCuboid(hx: number, hy: number, borderRadius: number): RawShape;
        /**
        * @param {number} radius
        * @returns {RawShape}
        */
        static ball(radius: number): RawShape;
        /**
        * @param {RawVector} normal
        * @returns {RawShape}
        */
        static halfspace(normal: RawVector): RawShape;
        /**
        * @param {number} halfHeight
        * @param {number} radius
        * @returns {RawShape}
        */
        static capsule(halfHeight: number, radius: number): RawShape;
        /**
        * @param {Float32Array} vertices
        * @param {Uint32Array} indices
        * @returns {RawShape}
        */
        static polyline(vertices: Float32Array, indices: Uint32Array): RawShape;
        /**
        * @param {Float32Array} vertices
        * @param {Uint32Array} indices
        * @returns {RawShape}
        */
        static trimesh(vertices: Float32Array, indices: Uint32Array): RawShape;
        /**
        * @param {Float32Array} heights
        * @param {RawVector} scale
        * @returns {RawShape}
        */
        static heightfield(heights: Float32Array, scale: RawVector): RawShape;
        /**
        * @param {RawVector} p1
        * @param {RawVector} p2
        * @returns {RawShape}
        */
        static segment(p1: RawVector, p2: RawVector): RawShape;
        /**
        * @param {RawVector} p1
        * @param {RawVector} p2
        * @param {RawVector} p3
        * @returns {RawShape}
        */
        static triangle(p1: RawVector, p2: RawVector, p3: RawVector): RawShape;
        /**
        * @param {RawVector} p1
        * @param {RawVector} p2
        * @param {RawVector} p3
        * @param {number} borderRadius
        * @returns {RawShape}
        */
        static roundTriangle(p1: RawVector, p2: RawVector, p3: RawVector, borderRadius: number): RawShape;
        /**
        * @param {Float32Array} points
        * @returns {RawShape | undefined}
        */
        static convexHull(points: Float32Array): RawShape | undefined;
        /**
        * @param {Float32Array} points
        * @param {number} borderRadius
        * @returns {RawShape | undefined}
        */
        static roundConvexHull(points: Float32Array, borderRadius: number): RawShape | undefined;
        /**
        * @param {Float32Array} vertices
        * @returns {RawShape | undefined}
        */
        static convexPolyline(vertices: Float32Array): RawShape | undefined;
        /**
        * @param {Float32Array} vertices
        * @param {number} borderRadius
        * @returns {RawShape | undefined}
        */
        static roundConvexPolyline(vertices: Float32Array, borderRadius: number): RawShape | undefined;
        /**
        * @param {RawVector} shapePos1
        * @param {RawRotation} shapeRot1
        * @param {RawVector} shapeVel1
        * @param {RawShape} shape2
        * @param {RawVector} shapePos2
        * @param {RawRotation} shapeRot2
        * @param {RawVector} shapeVel2
        * @param {number} maxToi
        * @param {boolean} stop_at_penetration
        * @returns {RawShapeTOI | undefined}
        */
        castShape(shapePos1: RawVector, shapeRot1: RawRotation, shapeVel1: RawVector, shape2: RawShape, shapePos2: RawVector, shapeRot2: RawRotation, shapeVel2: RawVector, maxToi: number, stop_at_penetration: boolean): RawShapeTOI | undefined;
        /**
        * @param {RawVector} shapePos1
        * @param {RawRotation} shapeRot1
        * @param {RawShape} shape2
        * @param {RawVector} shapePos2
        * @param {RawRotation} shapeRot2
        * @returns {boolean}
        */
        intersectsShape(shapePos1: RawVector, shapeRot1: RawRotation, shape2: RawShape, shapePos2: RawVector, shapeRot2: RawRotation): boolean;
        /**
        * @param {RawVector} shapePos1
        * @param {RawRotation} shapeRot1
        * @param {RawShape} shape2
        * @param {RawVector} shapePos2
        * @param {RawRotation} shapeRot2
        * @param {number} prediction
        * @returns {RawShapeContact | undefined}
        */
        contactShape(shapePos1: RawVector, shapeRot1: RawRotation, shape2: RawShape, shapePos2: RawVector, shapeRot2: RawRotation, prediction: number): RawShapeContact | undefined;
        /**
        * @param {RawVector} shapePos
        * @param {RawRotation} shapeRot
        * @param {RawVector} point
        * @returns {boolean}
        */
        containsPoint(shapePos: RawVector, shapeRot: RawRotation, point: RawVector): boolean;
        /**
        * @param {RawVector} shapePos
        * @param {RawRotation} shapeRot
        * @param {RawVector} point
        * @param {boolean} solid
        * @returns {RawPointProjection}
        */
        projectPoint(shapePos: RawVector, shapeRot: RawRotation, point: RawVector, solid: boolean): RawPointProjection;
        /**
        * @param {RawVector} shapePos
        * @param {RawRotation} shapeRot
        * @param {RawVector} rayOrig
        * @param {RawVector} rayDir
        * @param {number} maxToi
        * @returns {boolean}
        */
        intersectsRay(shapePos: RawVector, shapeRot: RawRotation, rayOrig: RawVector, rayDir: RawVector, maxToi: number): boolean;
        /**
        * @param {RawVector} shapePos
        * @param {RawRotation} shapeRot
        * @param {RawVector} rayOrig
        * @param {RawVector} rayDir
        * @param {number} maxToi
        * @param {boolean} solid
        * @returns {number}
        */
        castRay(shapePos: RawVector, shapeRot: RawRotation, rayOrig: RawVector, rayDir: RawVector, maxToi: number, solid: boolean): number;
        /**
        * @param {RawVector} shapePos
        * @param {RawRotation} shapeRot
        * @param {RawVector} rayOrig
        * @param {RawVector} rayDir
        * @param {number} maxToi
        * @param {boolean} solid
        * @returns {RawRayIntersection | undefined}
        */
        castRayAndGetNormal(shapePos: RawVector, shapeRot: RawRotation, rayOrig: RawVector, rayDir: RawVector, maxToi: number, solid: boolean): RawRayIntersection | undefined;
    }
    /**
    */
    export class RawShapeColliderTOI {
        free(): void;
        /**
        * @returns {number}
        */
        colliderHandle(): number;
        /**
        * @returns {number}
        */
        toi(): number;
        /**
        * @returns {RawVector}
        */
        witness1(): RawVector;
        /**
        * @returns {RawVector}
        */
        witness2(): RawVector;
        /**
        * @returns {RawVector}
        */
        normal1(): RawVector;
        /**
        * @returns {RawVector}
        */
        normal2(): RawVector;
    }
    /**
    */
    export class RawShapeContact {
        free(): void;
        /**
        * @returns {number}
        */
        distance(): number;
        /**
        * @returns {RawVector}
        */
        point1(): RawVector;
        /**
        * @returns {RawVector}
        */
        point2(): RawVector;
        /**
        * @returns {RawVector}
        */
        normal1(): RawVector;
        /**
        * @returns {RawVector}
        */
        normal2(): RawVector;
    }
    /**
    */
    export class RawShapeTOI {
        free(): void;
        /**
        * @returns {number}
        */
        toi(): number;
        /**
        * @returns {RawVector}
        */
        witness1(): RawVector;
        /**
        * @returns {RawVector}
        */
        witness2(): RawVector;
        /**
        * @returns {RawVector}
        */
        normal1(): RawVector;
        /**
        * @returns {RawVector}
        */
        normal2(): RawVector;
    }
    /**
    * A vector.
    */
    export class RawVector {
        free(): void;
        /**
        * Creates a new vector filled with zeros.
        * @returns {RawVector}
        */
        static zero(): RawVector;
        /**
        * Creates a new 2D vector from its two components.
        *
        * # Parameters
        * - `x`: the `x` component of this 2D vector.
        * - `y`: the `y` component of this 2D vector.
        * @param {number} x
        * @param {number} y
        */
        constructor(x: number, y: number);
        /**
        * Create a new 2D vector from this vector with its components rearranged as `{x, y}`.
        * @returns {RawVector}
        */
        xy(): RawVector;
        /**
        * Create a new 2D vector from this vector with its components rearranged as `{y, x}`.
        * @returns {RawVector}
        */
        yx(): RawVector;
        /**
        * The `x` component of this vector.
        */
        x: number;
        /**
        * The `y` component of this vector.
        */
        y: number;
    }
}