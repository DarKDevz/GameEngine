
        globalThis.setup = async function() {
            let obj = await import('/engine/test/rapier2d.test.js')
            await obj.init()
                window.RAPIER = obj;
            engine = new Engine();
            player = new Player();
            const response = await fetch("../examples/GeoQuiz.json");
            const data = await response.json();
            engine.loadFromObject(data,true);
            createCanvas(windowWidth, windowHeight);
            noSmooth();
            //Remove right click default behaviour
            document.oncontextmenu = function (e) {
                e.preventDefault();
            };
            engine.setup();
        }

        