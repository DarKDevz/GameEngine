class Enemy extends Box {
	constructor(x: number, y: number, w: number, h: number) {
		super(x, y, w, h);
		this.tag = "enemyBox";
		this.typeId = 4;
	}
	init() {
		super.init()
	}
	getClassName() {
		return "Enemy"
	}
	draw() {
		fill(255, 0, 0);
		rect(this.x, this.y, this.width, this.height)
	}
	earlyUpdate() {
		//Check if works
		if (this.collision(player)) {
			player.playerDeath()
		}
	}
}