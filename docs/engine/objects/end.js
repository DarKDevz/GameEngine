class End extends Box {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.typeId = 1;
  }
  getClassName() {
    return "End";
  }
  init() {
    super.init();
    if (!player)
      this.earlyUpdate = () => {
      };
  }
  draw() {
    this.clr = color(255, 255, 0);
    super.draw();
  }
  earlyUpdate() {
    if (this.collision(player)) {
      if (engine.scene[engine.currentScene + 1] !== void 0)
        engine.scene[engine.currentScene + 1].loadLevel();
      else {
        addLevel([], createVector(0, -500)).loadLevel();
      }
    }
  }
}
