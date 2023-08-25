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
        forceBrowserUpdate = true;
        forceMenuUpdate = true;
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
function PanelsInit() {
    document.body.addEventListener("mouseup", (function () {
        direction = 'Released';
    }));
    document.body.addEventListener("mousemove", function (e) {
        changedY(e);
    });
    document.getElementById("divider").addEventListener("mousedown", function (e) {
        getYDivPosition(e);
    });
    document.getElementById("colDivider").addEventListener("mousedown", function (e) {
        getXDivPosition(e);
    });
    var container = document.getElementsByClassName("container")[0]
    var
        topCurrentHeight = 0,
        bottomCurrentHeight = 0,
        currentPosition = 0,
        newPosition = 0,
        rightWidth = 0,
        leftWidth = 0,
        direction = 'Released';

    function getYDivPosition(e) {
        direction = 'PressedY';
        currentPosition = e.pageY;
        let topTempHeight = document.getElementById("topDiv").clientHeight;
        topCurrentHeight = Math.floor(topTempHeight);
        let bottomTempHeight = document.getElementById("bottomDiv").clientHeight;
        bottomCurrentHeight = Math.floor(bottomTempHeight);
    }
    function getXDivPosition(e) {
        direction = 'PressedX';
        currentPosition = e.pageX;
        rightWidth = document.getElementById("rightHolder").clientWidth;
        leftWidth = document.getElementById("leftHolder").clientWidth;
    }
    function changedY(e: any) {
        if (direction == 'PressedY') {
            newPosition = e.pageY;
            var movePerPixels = Math.floor(newPosition - currentPosition);
            var topDivNewLocation = Math.floor(topCurrentHeight + movePerPixels);
            if (topDivNewLocation < 10) {
                document.getElementById("topDiv").style.height = '10px';
                document.getElementById("bottomDiv").style.height = "calc(100vh - 18px)";
            } else {
                var bottomDivNewLocation = Math.floor(bottomCurrentHeight - movePerPixels);
                if (bottomDivNewLocation < 10) {
                    document.getElementById("topDiv").style.height = "calc(100vh - 18px)";
                    document.getElementById("bottomDiv").style.height = '10px';
                }
                else {
                    document.getElementById("topDiv").style.height = "calc(" + topDivNewLocation / innerHeight * 100 + "% )";
                    document.getElementById("bottomDiv").style.height = "calc(" + bottomDivNewLocation / innerHeight * 100 + "% )";
                    document.getElementById("divider").style.height = "calc(" + (100 - ((topDivNewLocation / innerHeight * 100) + (bottomDivNewLocation / innerHeight * 100))) + "% )"
                }
                windowResized()
            }
        } else if (direction == "PressedX") {
            newPosition = e.pageX;
            var movePerPixels = Math.floor(newPosition - currentPosition);
            var topDivNewLocation = Math.floor(rightWidth - movePerPixels);
            var leftDivNewLocation = Math.floor(leftWidth + movePerPixels)
            var bottomDivNewLocation = Math.floor(rightWidth - movePerPixels);

            document.getElementById("rightHolder").style.width = "calc(" + topDivNewLocation / innerWidth * 100 + "% )";
            //document.getElementById("bottomDiv").style.width =  bottomDivNewLocation+'px';
            if (leftDivNewLocation > innerWidth - 20) {
                document.getElementById("leftHolder").style.width = "calc(100% - 8px)";
                document.getElementById("rightHolder").style.width = 10 + 'px';
            } else {
                if (leftDivNewLocation < 20) {
                    //document.getElementById("leftHolder").style.width = "calc(100% - 8px)";
                    document.getElementById("leftHolder").style.width = 10 + 'px';
                    document.getElementById("rightHolder").style.width = "calc(100% - 8px)";
                } else {
                    let _new = ("calc(" + leftDivNewLocation / innerWidth * 100 + "%)")
                    document.getElementById("leftHolder").style.width = _new;
                }
            }
            windowResized()
        }
    }
}
async function createZip() {
    var zip = new JSZip();
    let createSketchFile = function () {
        return `
        globalThis.preload = async function() {
            engine = new Engine();
            player = new Player();
            const response = await fetch("./export.json");
            const data = await response.json();
            engine.loadFromObject(data,true);
        }
        globalThis.setup = function() {
            createCanvas(windowWidth, windowHeight);
            noSmooth();
            //Remove right click default behaviour
            engine.setup();
        }

        `;
    }
    let createMapFile = function () {
        return MapJson();
    }
    var scriptTags = [
        { path: 'libs/p5.min.js' },
        { path: 'engine/collision/Box2D.js' },
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
    zip.generateAsync({ type: 'blob' })
        .then(function (content) {
            downloadFile(content, 'export.zip')
        });
}
