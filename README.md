# Shimmer Engine
A WIP 2d game engine built on p5.js
## Shimmer editor:
https://darkdevz.github.io/platformer/map.html
## Example Site:
https://darkdevz.github.io/platformer/
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
```javascript
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
```javascript
//Object default variables
        this.x;
        this.y;
        this.width;
        this.height;
        this.isCollidable;
        this.tag;
//Components like gameScript, gameSprite
        this.components;
//List of gameSprite components
        this.sprites = [];
//gameScript variables
//UNSAFE to override
        this.overrides = {};
        this.savedFuncs = {};
        this.newOverrides = {};
//Own object uuid
        this.uuid;
//Box.js only variables
//clr: color of Box
        this.clr = 0;
//Previous position of object
//Used in physics
        this.oldX;
        this.oldY;
//typeId to redirect to custom class
//Box,End,Enemy etc...
//If object shouldn't be saved set
//typeId to null
        this.typeId;

```
### Shimmer API functions
```javascript
//WIP
```
### Shimmer API values
```javascript
//WIP
```
