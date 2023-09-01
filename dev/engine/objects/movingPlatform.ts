class movingPlatform extends Box {
	constructor(x: number, y: number, w: number, h: number, x1: any, x2: any) {
		super(x, y, w, h);
		this.direction = "r";
		this.x1 = x1;
		this.x2 = x2;
		this.typeId = 2;
	}
	init() {
		if (!this) return;
		if (!this.height) return;
		if (!this.width) return;
		if (this.width && this.height) {
			if (!this.body) {
				let bodyDef = new b2BodyDef;
				var fixDef = new b2FixtureDef;
				fixDef.density = 1.0;
				fixDef.friction = 0.5;
				fixDef.restitution = 0;
				bodyDef.type = b2Body.b2_kinematicBody;
				fixDef.shape = new b2PolygonShape;
				let hw = this.width / 2;
				let hh = this.height / 2;
				fixDef.shape.SetAsBox(hw, hh);
				fixDef.filter.categoryBits = Categories.PLATFORM;
				fixDef.filter.maskBits = Categories.BOX | Categories.DEFAULT;
				//console.warn(fixDef.filter);
				bodyDef.position.x = this.x + hw;
				bodyDef.position.y = this.y + hh;
				this.body = engine.world.CreateBody(bodyDef);
				this.body.SetUserData(this);
				this.body.CreateFixture(fixDef);
				this.body.SetFixedRotation(true);
			}
		}
	}
	getClassName() {
		return "movingPlatform"
	}
	offSet(x: number, y: number, diffX = 0, diffY = 0) {
		this.x1 += diffX;
		this.x2 += diffX;
		super.offSet(x, y);
	}
	draw() {
		//if(p5play.groups[1])this.phySprite.overlapping(p5play.groups[1])
		//this.phySprite.draw();
		fill(this.clr);
		rect(this.x, this.y, this.width, this.height);
	}
	getParameters(): any[] {
		return super.getParameters().concat(this.x1, this.x2);
	}
	getEditableArray(): EditableObject[] {
		return [...super.getEditableArray(),{
			name:"Point A",
			set:(val) => {
				this.x1 = val;
			},
			get:()=> {
				return this.x1
			},
			value: this.x1
		},{
			name:"Point B",
			set:(val) => {
				this.x2 = val;
			},
			get:()=> {
				return this.x2
			},
			value:this.x2
		}]
	}
	parameterNames() {
		return [...super.parameterNames(), "placeX1", "placeX2"];
	}
	earlyUpdate() {
		if (player.grounded && player.groundedId === this.uuid) {
			player.pos.x -= (this.oldX - this.x)
			//player.phySprite.pos.x -= (this.oldX - this.x)
		}
	}
	lateUpdate() {
		if (this.x + this.width < this.x2 && this.direction == "r") {
			//this.x += 3;
			if (this.body) {
				this.body.SetLinearVelocity({ x: 600, y: 0 })
			}
		}
		else {
			this.direction = "l";
		}
		if (this.direction == "l") {
			//this.x -= 3;
			if (this.body) {
				this.body.SetLinearVelocity({ x: -600, y: 0 })
			}
		}
		if (this.x < this.x1) this.direction = "r";
		this.x = this.body.GetTransform().position.x - this.width / 2;
		//this.phySprite.pos = {x:this.x+this.width/2,y:this.y+this.height/2};
	}
	customDraw() {
		stroke(0, 0, 255);
		line(this.x + this.width / 2, this.y + this.height / 2, this.x1, this.y + this.height / 2);
		stroke(255, 0, 0);
		line(this.x + this.width / 2, this.y + this.height / 2, this.x2, this.y + this.height / 2);
		stroke(0);
	}
}