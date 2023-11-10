import('https://cdn.skypack.dev/@dimforge/rapier2d-compat').then((obj) => {
    obj.init().then(() => {
        window.RAPIER = obj;
    });
});