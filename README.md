# Shimmer Engine
A WIP 2d game engine built on p5.js
## Shimmer editor:
https://darkdevz.github.io/GameEngine/map.html
## Example Site:
#### https://darkdevz.github.io/GameEngine/
#### https://darkdevz.github.io/GameEngine/Dash
#### https://darkdevz.github.io/GameEngine/ballblast.html
## Features Upcoming
https://trello.com/b/ATRd0ycb/game-engine
## Pros
all exports are stored in a json file,
or can be loaded from a javascript object,
so updates can be done dynamically with json
Easy to use Editor with lots of functionalities
Easy to use APIs: (p5.js and engine APIs)
Open Source code to implement changes
Modular Engine
Component Api to add your own components
## Shimmer API
### Overriding functions:
Skips the original display function
```javascript
this.display = function(OnlyDraw) {
return 1;
}
```
Will Run original display function afterwards
```javascript
this.display = function(OnlyDraw) {
return 0;
}
```
### Object Functions:
```typescript
this.display(OnlyDraw)
//OnlyDraw determines if
//this.update should be called
this.draw()/*
Default Draw function
Example for a Box Object it will do
rect(x,y,width,height)*/
this.update()/*
Holds Main Physics Update
Not recommended to Skip Original Function*/
this.collision(obj)
//Collision detection
this.customDraw()
//Draw call for when editor selects it
this.onCollide()/*
Function called when this.collision(obj)
detects a collision
Will be called also when on the editor
it gets selected
Implement your own version of collision
if doing complicated things*/

```
### Object Variables:
```typescript
/** The x-coordinate of the object. */
x: number;
/** The y-coordinate of the object. */
y: number;
/** The z-coordinate of the object. In 2d used only for defining which objects are
rendered first*/
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
/**If a singular sprite is inputted, the return value will be that of a single
sprite; if multiple sprites are inputted, the return value will be that of an array of
sprites*/
sprite: any
/** Object used for variables that are shown in editor*/
shown: any;
/** The collision type of the object. */
collisionType: collisionTypes;
/** Indicates if the image for the object has been initialized. */
imageInitialized: boolean;
/** The type identifier for custom classes (set to undefined if not applicable).
*/
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
```
### Shimmer API functions
#### Inside of engine(window.engine) Object
```javascript
//It checks if two objects with a UUID are colliding or not
//If these UUIDs don't exist in the scene it will always return false
checkCache(obj1, obj2 )
//Returns the x, y, and z positions of the mouse
mouseScreen ()
//SceneData contains all the scenes data, UseDefault, if true, will initialise all
default drawing methods
loadFromObject(SceneData, UseDefault)
//Removes the right click's default behaviour
setup()
//It is the default draw function
draw()
//If the target object has a UUID then it assigns an event listener to its creation,
if the object is already defined then it will run the function
onload(target,eventListener)
//Adds the target object to the current scene
//If the type ID variable is false then it will not assign a type ID to it
addObj(Obj, typeID)
//Adds a script by its name, it sets the shown variables with vals
//Adds the script to the third parameter
addScriptByName(name: string, vals: Object, obj: GameObject)
//Gets an object with the UUID
getFromUUID (UUID)
//Takes two UUIDs as parameters,with the first being the original UUID, and the second
being the newUUID.
changeUUID()

```
### Shimmer API values
#### Inside of engine(window.engine) Object
```typescript
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
* If this value exists then the value used to generate UUID will always be the
one used in assignedUUID
* @type {boolean}
*/
hasUUID: boolean;
/**
* The assigned UUID for generating UUID
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
* List of listeners for removal of objects.
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
eventListener: { [x: UUID]: { [x: string]: Function } };```
