class End extends Box {
	constructor(x: number, y: number, w: number, h: number) {
		super(x, y, w, h);
		this.typeId = 1;
	}
	getClassName() {
		return "End"
	}
	init() {
		super.init();
		//this.clr = color(255,255,0)
	}
	draw() {
		this.clr = color(255, 255, 0)
		super.draw();
	}
	earlyUpdate() {
		if (this.collision(player)) {
			if (engine.scene[engine.currentScene + 1] !== undefined)
				engine.scene[engine.currentScene + 1].loadLevel();
			else {
				addLevel([], createVector(0, -500)).loadLevel();
			}
		}
	}
}

