class InstanceDrawer {
  constructor(shape) {
    this.shape = shape;
    this.usesTexture = false;
    this.shader = createShader()
    this.matrix;
    this.oldMatrix;
    this.color;
    this.oldColor;
    this.length = 0;
    this.texture;
  }
  enableTexture(texture) {
    this.usesTexture = texture;
    this.shader.setUniform('useTexture',true);
  }
  add(position=[0,0,0],scale=[1,1,1],rotation=[0,0,0],color = [0,0,0]) {
    this.length++;
    this.oldMatrix = this.matrix;
    this.matrix = this.shader.initializedInstancedAttribute('aWorldMatrix', this.length);
    // transformations in reverse order.
    for(let i in this.oldMatrix) {
      this.matrix[i] = this.oldMatrix[i];
    }
    this.matrix[this.length-1].translate(position);
    this.matrix[this.length-1].scale(scale);
    this.matrix[this.length-1].rotate(rotation);

    this.oldColor = this.matrix;
    this.color = this.shader.initializedInstancedAttribute('aMaterialColor', this.length);
    // transformations in reverse order.
    for(let i in this.oldColor) {
      this.color[i] = this.oldColor[i];
    }
    //Colors are stored in succession
    this.color[this.length-1] = color[3];
    this.color[this.length-2] = color[2];
    this.color[this.length-3] = color[1];
    this.color[this.length-4] = color[0];

  }
  removeAll() {
    this.length = 0;
  }
  draw() {
    shader(this.shader)
    this.shader.setUniform('uTexture',this.usesTexture);
    this.shape((new Array(this.shape.length)).fill(1))
    resetShader()
  }
}
