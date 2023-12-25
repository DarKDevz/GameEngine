var oldScroll = 0;
var content: any = {};
//Browser Panel Stuff
content.changeName = function (_file: gameFile, tryRename?: string) {
    let newName = tryRename ? tryRename : prompt("Change file name", _file.name);
    if (newName === null || newName === _file.name) {
        //Client has escaped
        return;
    }
    //Delete all references
    let file = engine.files[_file.UUID]
    if (engine.getByReference('name', newName)) {
        alert('already used name')
        content.changeName(file);
    } else {
        file.editReference('name', newName);
        editor.updates.browser = true;
        editor.updates.menu = true;
    }
}
function readTypeAndName() {
    for (let nameOfFile in ContentBrowserPanel.files) {
        let _file = ContentBrowserPanel.files[nameOfFile];
        let typeOfFile = _file.type;
        Engine.componentList[Engine.fileTypeList[typeOfFile]].prototype.ContentBrowser(_file, ContentBrowserPanel)
    }
    ContentBrowserPanel.Main.elt.scrollTop = oldScroll;
}
function showEditMenu() {

}
function showBrowserPanel() {
    if (ContentBrowserPanel.HUD.elt.style.display === 'none') {
        ContentBrowserPanel.Holder.elt.style.maxHeight = '';
        ContentBrowserPanel.Main.elt.style.maxHeight = "calc(100%)";
        ContentBrowserPanel.HUD.elt.style.display = 'flex';
        //ContentBrowserPanel.Holder.position(0,windowHeight-windowHeight/4);
    } else {
        ContentBrowserPanel.HUD.hide();
        //ContentBrowserPanel.Holder.position(0,windowHeight-ContentBrowserPanel.Main.child()[0].scrollHeight);
        //ContentBrowserPanel.Main.elt.style.maxHeight = "calc(100%)";
        //ContentBrowserPanel.Holder.elt.style.height = ContentBrowserPanel.Main.child()[0].scrollHeight;
    }
}
content.removeOldContent = function () {
    oldScroll = ContentBrowserPanel.Main.elt.scrollTop;
    for (let i of ContentBrowserPanel.Divs) {
        i.remove();
    }
    ContentBrowserPanel.Divs = [];
}
function PanelsInit() {}
async function createZip() {
    var zip = new JSZip();
    let createSketchFile = function () {
        return `
        globalThis.setup = async function () {
                const response = await fetch("./examples/platformer.json");
                const data = await response.json();
                await waitForEngine()
                window.RAPIER = obj;
                engine = new Engine();
                player = new Player();
                engine.loadFromObject(data, true);
                createCanvas(windowWidth, windowHeight);
                noSmooth();
                //Remove right click default behaviour
                document.oncontextmenu = function (e) {
                    e.preventDefault();
                };
                engine.setup();
    };
        `;
    }
    let createMapFile = function () {
        return SaveMap();
    }
    var scriptTags = [
        { path: 'libs/p5.min.js' },
        { path: 'libs/p5.camera.js'},
        { path: 'libs/rapier2d.js'},
        { path: 'rapier_wasm2d_bg.wasm'},
        { path: 'engine/utils.js' },
        { path: 'engine/engine.js' },
        { path: 'engine/collision/p5.collide.js' },
        { path: 'engine/collision/handler.js' },
        { path: 'engine/objects/collision.js' },
        { path: 'engine/components/component.js' },
        { path: 'engine/components/scriptComponent.js' },
        { path: 'engine/objects/object.js' },
        { path: 'engine/objects/contactListener.js' },
        { path: 'engine/objects/box.js' },
        { path: 'engine/objects/player.js' },
        { path: 'engine/objects/end.js' },
        { path: 'engine/objects/text.js' },
        { path: 'engine/objects/enemyBox.js' },
        { path: 'engine/objects/interactive.js' },
        { path: 'engine/objects/bullet.js' },
        { path: 'engine/objects/movingPlatform.js' },
        { path: 'loader/level.js' },
        { path: 'loader/support.js' },
        { path: 'index.html' },
        { path: 'engine/objects/collisionChecker.js' },
        { path: 'sketch.js', makeFile: createSketchFile },
        { path: 'export.json', makeFile: createMapFile }
    ];
    const regex = /<!-- .*<\/script>/gms;

    // Fetch and add script files to the zip
    await Promise.all(scriptTags.map(async function (scriptInfo) {
        var scriptContent;
        if (scriptInfo.makeFile) {
            scriptContent = scriptInfo.makeFile()
        } else if (scriptInfo.path) {
            var response = await fetch(scriptInfo.path);
            scriptContent = await response.text();
            if (scriptInfo.path.endsWith(".html")) {
                scriptContent = scriptContent.replace(regex, '');
            }
        }
        zip.file(scriptInfo.path, scriptContent);
    }));

    // Generate the zip
    let content = await zip.generateAsync({ type: 'blob' })
    if (window?.showSaveFilePicker) {
        let file = await showSaveFilePicker({
            suggestedName:"project.zip",
            types:[{
            description:"Zip File",
            accept: {"text/blob":[".zip"]}
        }] });
        file = await file.createWritable()
        file.write(content);
        file.close()
    } else {
        downloadFile(content, 'export.zip');
    }
}
