import('/engine/test/rapier2d.test.js').then((obj) => {
    obj.init().then(() => {
        window.RAPIER = obj;
    });
});