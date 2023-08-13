//All physics are handled here
var contactListener = new Box2D.Dynamics.b2ContactListener();
var works = false;
contactListener.BeginContact = function (contact) {
    let dataA = contact.m_fixtureA.GetBody().GetUserData();
    let dataB = contact.m_fixtureB.GetBody().GetUserData();
    //console.error("works",dataA instanceof Player,dataB instanceof Box);
    let _player;
    let obj;
    if (dataA instanceof Player) {
        _player = dataA;
        obj = dataB;
    }
    else if (dataB instanceof Player) {
        _player = dataB;
        obj = dataA;
    }
    if (player && obj) {
        _player.collisionStart(obj.uuid);
    }
};
contactListener.EndContact = function (contact) {
    let dataA = contact.m_fixtureA.GetBody().GetUserData();
    let dataB = contact.m_fixtureB.GetBody().GetUserData();
    //console.error("works",dataA instanceof Player,dataB instanceof Box);
    let _player;
    let obj;
    if (dataA instanceof Player) {
        _player = dataA;
        obj = dataB;
    }
    else if (dataB instanceof Player) {
        _player = dataB;
        obj = dataA;
    }
    if (player && obj) {
        _player.collisionEnd(obj.uuid);
    }
};
contactListener.PreSolve = function (contact, oldManifold) {
};
contactListener.PostSolve = function (contact, impulse) {
};
