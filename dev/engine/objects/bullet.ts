class Bullet extends GameObject {
    constructor(x: number, y: number, dx: number, dy: number, selfId?: undefined) {
        super(x, y);
        this.directionX = dx;
        this.directionY = dy;
        this.r = 10;
        this.id = selfId;
        this.startDate = Date.now();
    }
    getSpeed(): number {
        return 3
    }
    getCollisionVectors() {
        return [{x:this.x,y:this.y}, this.r * 2]
    }
    getClassName() {
        return "Interactive"
    }
    onCollide(obj: GameObject) {
        if (obj.isShootable) {
            obj.health--;
        }
        removeObject(this.uuid);
    }
    draw() {
        this.oldX = this.x;
        this.oldY = this.y;
        fill(0, 255, 0);
        //it wants a diameter
        circle(this.x, this.y, this.r * 2);
    }
    customDraw() {
        super.customDraw();
        stroke(0, 0, 255);
        line(this.x, this.y, this.x - this.r, this.y);
        stroke(0, 255, 0);
        line(this.x, this.y, this.x, this.y - this.r);
        stroke(0);
    }
    lateUpdate() {
        const speed = this.getSpeed(); // Adjust the speed as needed
        let speedx = speed;
        let speedy = speed;
        this.oldX = this.x;
        this.oldY = this.y;

        this.x = lerp(this.x, this.x + this.directionX, speedx);
        this.y = lerp(this.y, this.y + this.directionY, speedy);
        const expiryTime = this.startDate + 5000; // 5 seconds expiry time

        if (Date.now() >= expiryTime) {
            removeObject(this.uuid)
        }
        for (let uuid in engine.allCollisions[this.uuid]) {
                let obj = engine.uuidList[uuid];
                if (obj && engine.uuidList[uuid].isCollidable) {
                    this.collidedId = obj;
                    this.onCollide(obj);
                }
        }
    }
}
