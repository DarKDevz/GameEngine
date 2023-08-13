Engine.componentList = {};
Engine.fileTypeList = {}
class Component {
    static componentOpen: any;
    constructor(name: string, obj?: GameObject) {
        this.componentName = name;
        this.ownObject = obj;
        this.fileType = ""
        this.shouldUpdateMenu = false;
    }
    initialize() {

    }
    MenuEdit(parent) {

    }
    ContentBrowser(file: gameFile, Panel: any) {

    }
    CustomButton(set = () => { }) {

    }
    toJson() {
        return { name: this.componentName };
    }
    deleteUser(arg0?) {

    }
}
Component.componentOpen = {}
function addComponent(name: string, componentClass: any, fileExtension?: string) {
    Engine.fileTypeList[fileExtension] = name;
    return Engine.componentList[name] = componentClass;
}