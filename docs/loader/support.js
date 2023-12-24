let temp = {};
var levels = new Proxy(temp, {
  set(target, key, value) {
    engine.scene[key] = value;
    return true;
  },
  get(target, key, receiver) {
    return engine.scene[key];
  },
  enumerable: false
});
let cList = new Proxy(temp, {
  set(target, key, value) {
    engine.componentList[key] = value;
    return true;
  },
  get(target, key, receiver) {
    return engine.componentList[key];
  },
  enumerable: false
});
Object.defineProperty(window, "componentList", {
  set(value) {
    cList = Object.assign(cList, value);
    return true;
  },
  get() {
    return cList;
  },
  enumerable: false
});
var boxes = new Proxy(temp, {
  set(target, key, value) {
    this.getActiveScene().boxes[key] = value;
    return true;
  },
  get(target, key, receiver) {
    return this.getActiveScene().boxes[key];
  }
});
Object.defineProperty(window, "activeLevel", {
  set(value) {
    engine.currentScene = value;
    return true;
  },
  get() {
    return engine.currentScene;
  },
  enumerable: false
});
Object.defineProperty(window, "deleteGameFile", {
  set(value) {
    return true;
  },
  get() {
    return engine.deleteGameFile.bind(engine);
  },
  enumerable: false
});
Object.defineProperty(window, "getByReference", {
  set(value) {
    return true;
  },
  get() {
    return engine.getByReference.bind(engine);
  },
  enumerable: false
});
function removeNonNormal(obj) {
  const replacer = (key, value) => {
    if (key === "p5")
      return void 0;
    if (key === "" || value instanceof p5.Vector)
      return value;
    let TypeOfValue = value?.constructor?.name;
    if (TypeOfValue !== "Object" && TypeOfValue !== "String" && TypeOfValue !== "Number" && TypeOfValue !== "Boolean" && TypeOfValue !== "Array") {
      return void 0;
    }
    return value;
  };
  const jsonString = JSON.stringify(obj, replacer);
  return JSON.parse(jsonString);
}
function replaceValues(obj, replaced) {
  if (typeof obj !== "object") {
    return obj;
  }
  for (let key in obj) {
    if (replaced.hasOwnProperty(key)) {
      replaced[key] = obj[key];
    } else if (typeof obj[key] === "object" && typeof replaced[key] === "object") {
      replaced[key] = replaceValues(obj[key], replaced[key]);
    }
  }
  return replaced;
}
