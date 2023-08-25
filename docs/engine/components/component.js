Engine.componentList = {};
Engine.fileTypeList = {};
class Component {
    static componentOpen;
    constructor(name, obj) {
        this.componentName = name;
        this.ownObject = obj;
        this.fileType = "";
        this.shouldUpdateMenu = false;
    }
    update() {}
    initialize() {
    }
    MenuEdit(parent) {
    }
    ContentBrowser(file, Panel) {
    }
    CustomButton(set = () => { }) {
    }
    toJson() {
        return { name: this.componentName };
    }
    deleteUser(arg0) {
    }
}
Component.componentOpen = {};
function addComponent(name, componentClass, fileExtension) {
    Engine.fileTypeList[fileExtension] = name;
    return Engine.componentList[name] = componentClass;
}
