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
    update() {
        
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
    onCreateFile(file: gameFile) {}
    get isAddable(){
        return true
    }
}
Component.componentOpen = {}
function addComponent(name: string, componentClass: any, fileExtension?: string) {
    if(fileExtension) {
        Engine.fileTypeList[fileExtension] = name;
    }
    return Engine.componentList[name] = componentClass;
}