class Enemy extends Box {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.tag = "enemyBox";
        this.typeId = 4;
    }
    init() {
        super.init();
        if (this.phySprite)
            this.phySprite.color = color(255, 0, 0);
    }
    getClassName() {
        return "Enemy";
    }
    draw() {
        fill(255, 0, 0);
        rect(this.x, this.y, this.width, this.height);
    }
    earlyUpdate() {
        if (this.collision(player)) {
            player.playerDeath();
        }
    }
}
