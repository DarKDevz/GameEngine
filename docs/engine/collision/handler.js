function HandleCollision(obj1, obj2) {
    if (obj1?.fixture?.m_shape && obj1?.body?.m_xf && obj2?.fixture?.m_shape && obj2?.body?.m_xf) {
        return Box2D.Collision.Shapes.b2Shape.TestOverlap(obj1.fixture.m_shape, obj1.body.m_xf, obj2.fixture.m_shape, obj2.body.m_xf);
    }
    let type1 = obj1.getCollisionType();
    let type2 = obj2.getCollisionType();
    return tCollision(type1, type2, obj1.getCollisionVectors(), obj2.getCollisionVectors(), true);
}
function tCollision(type1, type2, values1, values2, isVector) {
    let test = p5.prototype["collide" + type1 + type2 + (isVector ? 'Vector' : '')];
    if (typeof test === "function") {
        return (test(...values1, ...values2));
    }
    else {
        let test = p5.prototype["collide" + type2 + type1 + (isVector ? 'Vector' : '')];
        if (typeof test === "function") {
            return (test(...values2, ...values1));
        }
        else {
            console.log(Array.from(arguments));
            throw new Error('collision between: ' + type1 + ' and ' + type2 + '  doesnt exist');
        }
    }
}
