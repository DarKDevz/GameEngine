class Material {
  fun;
  values;
  type;
  constructor() {
    this.fun = fill;
    this.values = [255, 0, 0];
    this.type = 0;
  }
  apply() {
    let args = [];
    for (let i of this.values) {
      args.push(i());
    }
    this.fun(...args);
  }
  set(fun, values, type) {
    this.fun = fun;
    this.values = values;
    this.type = type;
  }
}
