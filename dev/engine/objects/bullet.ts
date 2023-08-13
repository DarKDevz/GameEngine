class Bullet extends GameObject {
    constructor(x: number, y: number, dx: number, dy: number, selfId?: undefined) {
        super(x, y);
        this.directionX = dx;
        this.directionY = dy;
        this.r = 10;
        this.id = selfId;
        this.startDate = Date.now();
    }
    getCollisionVectors() {
        return [this, this.r * 2]
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
    collision(obj: GameObject) {
        var oX: any, oY: any, oW: any, oH: any;
        if (obj.pos !== undefined) {
            oX = obj.pos.x;
            oY = obj.pos.y;
        } else {
            oX = obj.x;
            oY = obj.y;
        }
        if (obj.size !== undefined) {
            oW = obj.size.x;
            oH = obj.size.y;
        } else {
            oW = obj.width;
            oH = obj.height;
        }
        let rect = {
            x: oX,
            y: oY,
            width: oW,
            height: oH,
        }
        let collides = collideCircle(rect, this);
        return collides;
    }
    display() {
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
        const speed = 3; // Adjust the speed as needed
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
        let t_box_id: GameObject;
        for (t_box_id of getCurrentBoxes()) {
            if (t_box_id && t_box_id.isCollidable) {
                let c = this.collision(t_box_id);
                if (c) {
                    this.collidedId = t_box_id;
                    this.onCollide(t_box_id);
                }
            }
        }
    }
}

function lerp(x: number, arg1: number, speedx: number): number {
    throw new Error("Function not implemented.");
}
