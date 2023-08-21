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
