function HandleCollision(obj1, obj2) {
  if (obj1.getCollisionType && obj2.getCollisionType) {
    let type1 = obj1.getCollisionType();
    let type2 = obj2.getCollisionType();
    return tCollision(type1, type2, obj1.getCollisionVectors(), obj2.getCollisionVectors(), true);
  }
  throw new Error("Objects insterted is not of type CollidableObject");
}
function tCollision(type1, type2, values1, values2, isVector) {
  let test = p5.prototype["collide" + type1 + type2 + (isVector ? "Vector" : "")];
  if (typeof test === "function") {
    return test(...values1, ...values2);
  } else {
    let test2 = p5.prototype["collide" + type2 + type1 + (isVector ? "Vector" : "")];
    if (typeof test2 === "function") {
      return test2(...values2, ...values1);
    } else {
      console.log(Array.from(arguments));
      throw new Error("collision between: " + type1 + " and " + type2 + "  doesnt exist");
    }
  }
}
