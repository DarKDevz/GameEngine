
        globalThis.preload = async function() {
            if(!window.RAPIER) { await import('https:/' + '/cdn.skypack.dev/@dimforge/rapier2d-compat').then((obj) => {
                obj.init().then(() => {
                    window.RAPIER = obj;
                });
            });
        }
            engine = new Engine();
            player = new Player();
            const response = await fetch("../examples/GeoQuiz.json");
            const data = await response.json();
            engine.loadFromObject(data,true);
        }
        globalThis.setup = function() {
            createCanvas(windowWidth, windowHeight);
            noSmooth();
            //Remove right click default behaviour
            engine.setup();
        }

        