
        globalThis.setup = async function() {
            await waitForEngine();
            const response = await fetch("../examples/GeoQuiz.json");
            const data = await response.json();
            engine = new Engine();
            player = new Player();
            engine.loadFromObject(data,true);
            createCanvas(windowWidth, windowHeight);
            noSmooth();
            //Remove right click default behaviour
            document.oncontextmenu = function (e) {
                e.preventDefault();
            };
            engine.setup();
        }

        