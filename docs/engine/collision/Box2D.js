import("/libs/rapier2d.js").then((obj) => {
  obj.init().then(() => {
    window.RAPIER = obj;
  });
});
