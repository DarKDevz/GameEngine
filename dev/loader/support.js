let temp = {};
var levels = new Proxy(temp, {
    set(target, key, value) {
        engine.scene[key] = value;
        console.error("level variable is deprecated, use engine.scene instead");
        return true;
    },
    get(target, key, receiver) {
        console.error("level variable is deprecated, use engine.scene instead");
        return engine.scene[key];
    },
    enumerable:false
});
let cList = new Proxy(temp, {
    set(target, key, value) {
        engine.componentList[key] = value;
        console.error("componentList is deprecated, use engine.componentList instead");
        return true;
    },
    get(target, key, receiver) {
        console.error("componentList is deprecated, use engine.componentList instead");
        return engine.componentList[key];
    },
    enumerable:false
});
Object.defineProperty(window, "componentList", {
    set(value) {
        cList = Object.assign(cList, value);
        console.error("componentList variable is deprecated, use engine.componentList instead");
        return true;
    },
    get() {
        console.error("componentList variable is deprecated, use engine.componentList instead");
        return cList;
    },
    enumerable:false
});
var boxes = new Proxy(temp, {
    set(target, key, value) {
        this.getActiveScene().boxes[key] = value;
        console.error("Boxes variable is deprecated, use engine.scene instead");
        return true;
    },
    get(target, key, receiver) {
        console.error("Boxes variable is deprecated, use engine.scene instead");
        return this.getActiveScene().boxes[key];
    }
});
Object.defineProperty(window, "activeLevel", {
    set(value) {
        engine.currentScene = value;
        console.error("activeLevel variable is deprecated, use engine.activeScene instead");
        return true;
    },
    get() {
        console.error("activeLevel variable is deprecated, use engine.activeScene instead");
        return engine.currentScene;
    },
    enumerable:false
});
Object.defineProperty(window, "deleteGameFile", {
    set(value) {
        //engine.activeScene = value;
        console.error("deleteGameFile function is deprecated, use engine.deleteGameFile instead");
        return true;
    },
    get() {
        console.error("deleteGameFile function is deprecated, use engine.deleteGameFile instead");
        return engine.deleteGameFile.bind(engine);
    },
    enumerable:false
});
Object.defineProperty(window, "getByReference", {
    set(value) {
        //engine.activeScene = value;
        console.error("getByReference function is deprecated, use engine.getByReference instead");
        return true;
    },
    get() {
        console.error("getByReference function is deprecated, use engine.getByReference instead");
        return engine.getByReference.bind(engine);
    },
    enumerable:false
});
function removeNonNormal(obj) {
    const replacer = (key, value) => {
        if (key === "p5")
            return undefined;
        if (key === "" || value instanceof p5.Vector)
            return value;
        //console.log(key, value.constructor.name, typeof value);
        let TypeOfValue = value?.constructor?.name;
        if (TypeOfValue !== "Object" &&
            TypeOfValue !== "String" &&
            TypeOfValue !== "Number" &&
            TypeOfValue !== "Boolean" &&
            TypeOfValue !== "Array") {
            return undefined;
            // Ignore the property
        }
        return value;
        // Serialize the property as usual
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
        }
        else if (typeof obj[key] === 'object' && typeof replaced[key] === 'object') {
            replaced[key] = replaceValues(obj[key], replaced[key]);
        }
    }
    return replaced;
}
