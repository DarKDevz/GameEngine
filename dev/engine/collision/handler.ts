var HandleCollision:SpecialFunc = function (temp1,temp2) {
    if(temp1?.fixture?.m_shape && temp1?.body?.m_xf && temp2?.fixture?.m_shape && temp2?.body?.m_xf) {
        return Box2D.Collision.Shapes.b2Shape.TestOverlap(temp1.fixture.m_shape,temp1.body.m_xf,temp2.fixture.m_shape,temp2.body.m_xf)
    }
    let newArgs = Object.values(arguments);
    let type1 = (newArgs.shift())
    let type2 = (newArgs.shift())
    let func = p5.prototype[('collide')+type1+type2]
    if(typeof func === "function") {
        //console.error('collision between: ',type1,' and ',type2)
        return func(...newArgs);
    }else {
        console.trace()
        throw new Error('collision between: '+type1+' and '+type2+'  doesnt exist')
    }
}