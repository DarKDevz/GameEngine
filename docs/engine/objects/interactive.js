class Interactive extends GameObject {
    r;
    constructor(x, y, callback = "()=>{}", radius = 5) {
        super(x, y, "interactive");
        this.r = radius;
        this.z = 1;
        this.components = [];
        this.collisionType = 'Circle';
        /*let gScript = new gameScript({ obj: this, fn: callback });
        this.components.push(gScript);*/
        //gScript.initialize(callback);
        this.typeId = 5;
    }
    getCollisionType() {
        return 'Circle';
    }
    getCollisionVectors() {
        return [{ x: this.x, y: this.y }, this.r * 2];
    }
    getParameters() {
        return super.getParameters().concat(0, this.r);
    }
    getEditableArray() {
        return [...super.getEditableArray(), {
                name: "radius",
                set: (val) => {
                    this.r = val;
                },
                get: () => {
                    return this.r;
                },
                value: this.r
            }];
    }
    parameterNames() {
        return [...super.parameterNames(), "noMenu", "radius"];
    }
    getClassName() {
        return "Interactive";
    }
    getComponents(id = "noId") {
        if (id === "noId")
            return this.components;
        return this.components[id];
    }
    onCollide() {
        //eval(this.components[0].fn)
    }
    draw() {
        fill(255, 0, 255);
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
}
