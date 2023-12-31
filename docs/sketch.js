let lowestFrameRate = 60;
globalThis.setup = async function () {
            const response = await fetch("./examples/platformer.json");
            const data = await response.json();
            await waitForEngine()
            engine = new Engine();
            
            engine.loadFromObject(data, true);
            createCanvas(windowWidth, windowHeight);
            noSmooth();
            //Remove right click default behaviour
            document.oncontextmenu = function (e) {
                e.preventDefault();
            };
            engine.setup();
};
