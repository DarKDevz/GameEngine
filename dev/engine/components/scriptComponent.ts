class gameScript extends Component {
	constructor({ obj, fn = '', vals = {}, fileUUID = '' }: { obj: GameObject, fn: string, vals: object, fileUUID: UUID }) {
		super("gameScript");
		this.fileType = ".js";
		this.ownObject = obj;
		let temp = {}
		this.vals = {
			set shown(value) {
				if (typeof value === 'object' && Object.keys(value).length > 0) {
					for (let key in obj.shown) {
						if (value.hasOwnProperty(key)) {
							//console.warn(obj.shown[key],value[key]);
							value[key] = replaceValues(obj.shown[key], value[key]);
						}
					}
					//console.log('The value is an object.');
				}
				obj.shown = Object.assign(obj.shown, value);
				let normalObject = removeNonNormal(value);
				if (typeof normalObject === "object") {
					for (let i in normalObject) {
						this.editableVals[i] = normalObject[i];
						//console.log(i);
					}
				} else {
					this.editableVals[''] = normalObject;
				}
				//this.editableVals = removeNonNormal(value);
				// Call your custom function here
				//console.log("valChanged", value);
			},
			get shown() {
				return obj.shown;
			},
			editableVals: new Proxy(temp, {
				set(target, key, value) {
					//console.log("works? maybe?")
					if (key === "") { target = value; }
					else { target[key] = value; }
					//console.log(key);
					//target[key] = tValue[key];
					return true;
				},
				get(target, key, receiver) {
					return target[key];
				}
			})
		}
		this.vals.shown = vals;
		this.id = engine.generateUUID();
		this.overrides = {};
		this.newOverrides = {};
		if (fileUUID !== '') {
			this.file = engine.files[fileUUID];
			this.fn = this.file.data
			this.file.type = this.fileType;
			this.file.addUser(this, obj.uuid);
		} else {
			this.file = addGameFile(fn, this.fileType);
			this.fn = this.file.data;
			this.file.addUser(this, obj.uuid);
		}
		let scenesAreLoaded = false;
		let hasScene = false;
		let scene: any;
		for (scene in engine.scene) {
			if (scene.boxes) {
				if (scene.boxes.indexOf(engine.getfromUUID(this.ownObject.uuid)) > -1) {
					hasScene = true;
				} else {
					console.error("Not in scene:" + scene.ind)
				}
				scenesAreLoaded = true
			}
		}
		if (!hasScene && scenesAreLoaded) {
			console.error("Isn't in any scene");
		}
	}
	updateValues() {
		for (let key in this.ownObject.shown) {
			if (this.vals.editableVals.hasOwnProperty(key)) {
				//console.warn(this.ownObject.shown[key],this.vals.editableVals[key]);
				this.ownObject.shown[key] = replaceValues(this.vals.editableVals[key], this.ownObject.shown[key]);
			}
		}
	}
	evalValues() { }
	set fn(source) {
		//console.log("changed");
		//Updated script, update the object's script so it calls function
		this._src = source;
		this.ownObject.script = source;
		//console.log(this.id);
		this.newOverrides = {};
		//console.log(this.components[this.id]);
		//this.components[this.id].evalValues(source);
		let _temp = {};

		let _Run = {
			shown: new Proxy(_temp, {
				set(target, key, value) {
					target[key] = value;
					let tValue = (target);
					//console.log(value, removeNonNormal(target));
					if (key === "valueDetected") {
						console.log("valueDetected is added or modified:", value);
					}
					target[key] = tValue[key];
					return true;
				}
			})
		};
		(new Function(source)).call(_Run);
		this.newOverrides = _Run;
		//console.log(_Run, _temp);
		this.vals.shown = _temp;
		delete this.newOverrides.shown
		//console.log(this);
		this.overrides = this.newOverrides;
		function tryRun(funcCall: Function, funcContext: any, funcArgs: IArguments, funcName: string, onError?: Function) {
			let _;
			try {
				_ = funcCall.call(funcContext, ...funcArgs);
			} catch (e) {
				//Log Error
				console.error(funcName + " has an error: " + e);
				console.error(funcCall);
				//Remove function call
				onError(e);
				return;
			}
			return _;
		}
		for (let i in this.overrides) {
			//console.log(i);
			//check if the overriden value even exists and if we want to replace with a function
			//Check also if it's a function that exists in the prototype
			if (this.ownObject[i] !== undefined &&
				this.ownObject.__proto__[i] !== undefined &&
				typeof this.overrides[i] === "function") {
				let script = this;
				let firstSet = this.ownObject[i] === this.ownObject.__proto__[i];
				let lastAccess = this.ownObject[i]?.ids
				if (lastAccess?.includes(this.id)) {
					//just change the overrides
				} else if (lastAccess === undefined || firstSet) {
					this.ownObject[i] = function () {
						let shouldSkip = false;
						if (script.overrides[i] !== undefined) {
							let ret = tryRun(script.overrides[i], this, arguments, i, (error) => {
								engine.errorText = 'script has an error, check console';
								script.overrides[i] = () => { };
							});
							if (this[i].skip) {
								ret = this[i].skip;
								this[i].skip = false;
							}
							if (ret !== undefined) {
								return ret;
							}
						}
						else {
							//script has been deleted
							return tryRun(this.__proto__[i], this, arguments, i);
						}
						this.__proto__[i].call(this, ...arguments);
					}.bind(script.ownObject);
					this.ownObject[i].ids = [this.id];
				} else {
					//Second iteration or third even
					let ogFunc = this.ownObject[i];
					this.ownObject[i] = function () {
						let shouldSkip = false;
						if (script.overrides[i] !== undefined) {
							let ret = tryRun(script.overrides[i], this, arguments, i, (error) => {
								engine.errorText = 'script has an error, check console';
								script.overrides[i] = () => { };
							});
							if (ret !== undefined) {
								this[i].skip = ret;
							}
						}
						else {
							//script has been deleted
							return tryRun(ogFunc, this, arguments, i);
						}
						ogFunc.call(this, ...arguments);
					}.bind(script.ownObject);
					this.ownObject[i].ids = [...ogFunc.ids, this.id];
				}
				//console.log(this.overrides[this.id][i]);
			} else if (typeof this.overrides[i] === "function") {
				this.ownObject[i] = this.overrides[i].bind(this.ownObject);
			} else {
				this.ownObject[i] = this.overrides[i];
			}
		}
		//console.log(this.overrides);
	}
	get fn() {
		return this._src
	}
	addNewEditObj(obj: object, parent: string | Div = 'sideMenu', opened) {
		let Holder: Div;
		//console.log(obj)
		for (let i in obj) {
			//console.log(i, obj[i], typeof obj[i]);
			if (typeof obj[i] === "object") {
				let divHolder = createDiv().parent(parent);
				let headerText = createDiv();
				Holder = accordionMenu(headerText, createDiv(), i, opened);
				headerText.parent(divHolder);
				Holder.parent(divHolder);
				infoDivs.push(headerText);
				opened[i] ??= { value: false };
				this.addNewEditObj(obj[i], Holder, opened[i]);
			} else {
				addMenuInput(i, (_) => {
					obj[i] = parseStringNum(_);
					this.updateValues();
					return obj[i]
				}
					, () => {
						return obj[i]
					}
					, parent)
				//console.log("final Object", obj[i]);
			}
		}
	}
	AddFileEdit(parent: string | Div) {
		let alreadyHasName = this.file.references.name;
		let buttonName = alreadyHasName ? alreadyHasName : this.file.UUID
		let inp = createButton(buttonName + this.file.type).parent(parent);
		inp.elt.ondrop = (event) => {
			//console.log(event);
			console.warn(event.dataTransfer.getData("UUID"));
			let uuid = event.dataTransfer.getData("UUID");
			let file = engine.files[uuid];
			//If file isn't a script return
			if (file.type !== this.fileType) return;
			this.loadFile(file);
			forceMenuUpdate = true;
			//Replace old file with new file
		}
		inp.elt.ondragover = (event) => {
			event.preventDefault();
			window.mouseReleased = () => { }
			//console.warn(event.dataTransfer.getData("UUID"));
		}
	}
	ContentBrowser(file: gameFile, Panel: any) {
		let typeOfFile = file.type;
		let _file = file;
		let _get = () => { return file.data }
		let set = (file) => {
			for (let ObjId in _file.whoUses) {
				let script = _file.whoUses[ObjId];
				script.loadFile(file);
			}
		};
		let alreadyHasName = _file.references.name;
		let buttonName = alreadyHasName ? alreadyHasName : _file.UUID
		buttonName = buttonName + typeOfFile
		let inp = createButton(buttonName).parent(Panel.HUD);
		inp.elt.draggable = "true";
		inp.elt.ondragstart = (event) => {
			event.dataTransfer.setData("UUID", file.UUID);
			console.log(file);
		}
		inp.mousePressed(() => {
			if (mouseButton === "right") {
				content.changeName(_file);
			} else {
				window.mouseReleased = () => {
					window.mouseReleased = () => { };
					var popupWindow = window.open("popup.html", "Popup Window", "width=400,height=300");
					window.scriptData = function () {
						return _get().toString()
					}
					window.receivePopupText = (text) => {
						console.warn(text);
						_file.data = text;
						set(_file);
						_get = () => text;
					};
				}
			}
		});
		inp.size(140, 140);
		Panel.Divs.push(inp);
	}
	MenuEdit(parent: string | Div) {
		if (!addEditableScript)
			return;
		//console.log(parent);
		let fileHolder = createDiv()
		this.AddFileEdit(fileHolder);
		Component.componentOpen[this.id] ??= { value: false }
		let shouldOpen = Component.componentOpen[this.id];
		let mainDiv = addEditableScript("function", (val) => {
			let actValue = val;
			//if only one uses it's better to replace the file
			//instead of just re-adding it and changing the name; 
			if (Object.keys(this.file.whoUses).length == 1) {
				this.file.data = actValue;
				this.loadFile(this.file);
			} else {
				this.loadFile(addGameFile(actValue, this.fileType));
			}
			return actValue;
		}
			, () => this.fn, parent, [fileHolder], fileHolder, shouldOpen);
		this.addNewEditObj(this.vals.editableVals, mainDiv[0], shouldOpen);
	}
	deleteUser(shouldDelete = true) {
		this.file.removeUser(this.ownObject.uuid, shouldDelete);
	}
	loadFile(file) {
		if (this.file.UUID !== file.UUID) {
			this.deleteUser()
		}
		this.file = file;
		//Include Ourselfs as a user
		this.file.addUser(this, this.ownObject.uuid);
		//Will load all sprites and not initialize correctly
		//Load Sprite automatically
		this.fn = this.file.data;
		//Re-initiate Object
		//Initiate Object only if it's in the right scene;
		//Re-initiates all objects so it's more like the client side once loaded
		// engine.getActiveScene().initiateBoxes();
		// if(engine.activeScene.toString() === engine.getfromUUID(this.ownObject.uuid).scene) {
		// engine.getfromUUID(this.ownObject.uuid).init()
		// }
		//console.error("Not assigned to any level defaulting it to be the active scene", engine.getfromUUID(this.ownObject.uuid).scene);
		forceMenuUpdate = true;
	}
	toJson() {
		return {
			name: this.componentName,
			params: {
				fileUUID: this.file.UUID,
				vals: this.vals.editableVals
			}
		};
	}
}
class gameSprite extends Component {
	constructor({ obj, src = { imageb64: '' }, fileUUID = '' }: { obj: GameObject, src: any, fileUUID: UUID }) {
		super("gameSprite");
		if (!obj.sprites) {
			debugger;
		}
		this.fileType = ".img"
		obj.sprites.push(this);
		if (fileUUID !== '') {
			this.fileData = engine.files[fileUUID];
			this.fileData.type = ".img";
			this.fileData.addUser(this, obj.uuid);
		} else {
			//Support for Old Loading Images
			this.fileData = addGameFile(src.imageb64, ".img");
			this.fileData.addUser(this, obj.uuid);
		}
		this.ownObject = obj;
		//console.log(src);
		if (src.imageb64) {
			delete src.imageb64;
		}
		this._src = src;
		this.src = src;
		this.id = engine.generateUUID()
		//engine.assignUUID("Image File");
		this.sprite;
	}
	set src(value) {
		//console.log("changed");
		//console.warn("the src has been set", value);
		//delete value.imageb64;
		this._src = { ...value };
		this._src.imageb64 = undefined;
		if (this.ownObject.sprite) {
			this.reloadImage();
		}
	}
	get src() {
		return this._src
	}
	ContentBrowser(file: gameFile, Panel: any) {
		let _file = file;
		let img = createImg(_file.data, "Not Loading").parent(Panel.HUD);
		img.elt.draggable = "true";
		img.elt.ondragstart = (event) => {
			event.dataTransfer.setData("UUID", _file.UUID);
			console.log(_file);
		}
		let _get = () => { return _file.data }
		img.mousePressed(() => {
			console.log(mouseButton);
			if (mouseButton === "right") {
				content.changeName(_file);
			} else {
				window.mouseReleased = () => {
					this.mouseReleased = () => { }
					let popup = window.open('imagePopup.html', '_blank', 'width=400,height=400');
					popup._ImageData = () => {
						return _get();
					}
					window.jsonImage = (text: string) => {
						console.warn(text);
						forceBrowserUpdate = true;
						//_file.loadFile(addGameFile(val.imageb64,'.img'));
						_file.data = text;
						//Remove Sprite definition so it reloads it correctly
						_file.customData = undefined;
						console.log(_file.whoUses);
						for (let uuid in _file.whoUses) {
							let _sprite = _file.whoUses[uuid];
							console.log(_sprite);
							_sprite.loadFile(_file);
							console.log(_sprite);
						}
						_get = () => { return text };
					};
				}
			}
		});
		img.size(140, 140);
		Panel.Divs.push(img);
	}
	MenuEdit(parent: string | Div) {
		if (!addEditableSprite)
			return;
		let divHolder = createDiv()
		let FileEdit = this.AddFileEdit();
		FileEdit.parent(divHolder);
		Component.componentOpen[this.id] ??= { value: false }
		let shouldOpen = Component.componentOpen[this.id]
		let mainDiv = addEditableSprite("Image", (val) => {
			forceBrowserUpdate = true;
			let actValue = val;
			console.log(val);
			this.src = actValue;
			if (val.imageb64) {
				this.loadFile(addGameFile(val.imageb64, '.img'));
			}
			return actValue;
		}
			, () => this.fileData.data, parent, [divHolder], divHolder, shouldOpen)
	}
	AddFileEdit() {
		let alreadyHasName = this.fileData.references.name;
		let buttonName = alreadyHasName ? alreadyHasName : this.fileData.UUID
		let inp = createButton(buttonName + this.fileData.type);
		inp.elt.ondrop = (event) => {
			console.log(event);
			console.warn(event.dataTransfer.getData("UUID"));
			let uuid = event.dataTransfer.getData("UUID");
			let file = engine.files[uuid];
			//If file isn't an image return
			if (file.type !== ".img") return;
			//Replace old file with new file;
			this.loadFile(file);
			//Replace old file with new file
		}
		inp.elt.ondragover = (event) => {
			event.preventDefault();
			window.mouseReleased = () => { }
			//console.warn(event.dataTransfer.getData("UUID"));
		}
		return inp;
	}
	deleteUser(shouldDelete = true) {
		this.fileData.removeUser(this.ownObject.uuid, shouldDelete);
	}
	loadFile(file: gameFile) {
		//Remove Og File
		if (this.fileData.UUID !== file.UUID) {
			this.deleteUser()
		}
		this.fileData = file;
		//Include Ourselfs as a user
		this.fileData.addUser(this, this.ownObject.uuid);
		//Will load all sprites and not initialize correctly
		//Load Sprite automatically
		if (!this.fileData.customData) {
			this.fileData.customData = loadImage(this.fileData.data.toString());
		}
		this.setSprite(this.fileData.customData);
		forceMenuUpdate = true;
		forceBrowserUpdate = true;
	}
	getSprite() {
		return this.sprite.get(...arguments)
	}
	reloadImage() {
		let _img = this.src;
		//console.log(_img);
		//Check if file has already loaded image, then get reference
		if (this.fileData.customData !== undefined) {
			var _sprite = this.fileData.customData;
		} else {
			var _sprite = loadImage(this.fileData.data.toString(), () => {
				//console.error("Image has been loaded");
				for (let objId in this.fileData.whoUses) {
					if (!engine.uuidList[objId].imageInitialized) {
						engine.uuidList[objId].init()
						engine.uuidList[objId].imageInitialized = true;
					}
				}
			});
			//engine.getActiveScene().initiateBoxes();
		}
		this.setSprite(_sprite);
		//engine.getActiveScene().initiateBoxes();
	}
	setSprite(sprite: ReturnType<typeof loadImage>) {
		this.fileData.customData = sprite;
		this.sprite = sprite;
		if (typeof this.ownObject.sprite !== 'object') {
			let _og = this.ownObject.sprite
			this.ownObject.sprite = _og ? [_og] : [];
		}
		this.ownObject.sprite[this.ownObject.sprites.indexOf(this)] = sprite;
		if (this.ownObject.sprite.length === 1) {
			this.ownObject.sprite = sprite;
		}
	}
	getImage() {
		return this.ownObject.sprite;
	}
	toJson() {
		//this._src.imageb64 = this.fileData.data;
		let _return = {
			name: this.componentName,
			params: {
				src: { ...this._src },
				fileUUID: this.fileData.UUID
			}
		};
		return _return
	}
}
class gameFile extends Component {
	static addGameFile = function (data: string, type?: string, references?: object): gameFile {
		//console.error(references);
		let fileexists: any;
		if (data !== '') {
			fileexists = checkifexists(data)
		}
		if (!fileexists) {
			let fUUID = engine.customFileUUID(type);
			//console.warn(fUUID);
			fileexists = new gameFile(data, fUUID, type)
			fileexists.references = Object.assign({}, references);
		}
		return fileexists;
	}
	constructor(data: any, UUID: string, type: any) {
		super("gameFile");
		this.customData = undefined;
		this.references = {};
		this.UUID = UUID;
		this.type = type;
		let parsedImage = data.toString();
		//console.warn(data);
		this.data = parsedImage;
		engine.files[UUID] = this;
		this.whoUses = {};
	}
	editReference(name: string, value: string) {
		this.references[name] = value;
		if (!value) {
			delete this.references[name]
		}
	}
	addReference(name: string, value: any) {
		this.references[name] = value
	}
	removeUser(UUID: UUID, deleteIfEmpty = false) {
		delete this.whoUses[UUID];
		if (deleteIfEmpty) {
			if (Object.keys(this.whoUses).length == 0) {
				//If no one uses it delete it
				//alert("empty script");
				delete engine.files[this.UUID]
			}
		}
	}
	addUser(obj: GameObject, UUID: UUID) {
		this.whoUses[UUID] = obj;
	}
	get File() {
		return this.data;
	}
	set File(value) {
		this.data = value;
	}
}

class gameSpritesheet {
	sWidth: number;
	sHeight: number;
	tWidth: number;
	tHeight: number;
	constructor(totWidth: number, totHeight: number, spriteWidth: number, spriteHeight: number) {
		this.sWidth = spriteWidth;
		this.sHeight = spriteHeight;
		this.tWidth = totWidth;
		this.tHeight = totHeight;
	}
	fromIndex(tileIndex: number) {
		//let tileSize = this
		let xindex = tileIndex % (this.tWidth / this.sWidth);
		let yindex = (tileIndex - xindex) / (this.tHeight / this.sHeight);
		return [xindex * this.sWidth, yindex * this.sHeight, this.sWidth, this.sHeight]
	}
}
class gameAnimation {
	spritesheet: gameSpritesheet;
	start: number;
	end: number;
	time: number;
	loop: boolean;
	interval: number;
	yoyo: boolean;
	onStep: () => void;
	onStop: () => void;
	onLoop: () => void;
	animIndex: number;
	constructor(gameSpritesheet: gameSpritesheet,
		{ start = 0,
			end = 0,
			time = 0.5,
			loop = !1,
			yoyo = !1,
			onStep = () => { },
			onStop = () => { },
			onLoop = () => { } }: any) {
		this.spritesheet = gameSpritesheet;
		this.start = start;
		this.end = end;
		this.time = time;
		this.loop = loop;
		this.startInd();
		this.interval;
		this.yoyo = yoyo;
		this.onStep = onStep;
		this.onStop = onStop;
		this.onLoop = onLoop;
	}
	set frameRate(value) {
		this.time = value;
		//Stop Interval and re run
		this.pause();
		this.run();
		this.time;
	}
	get frameRate() {
		return this.time;
	}
	play() {
		this.startInd();
		clearInterval(this.interval);
		this.run();
	}
	run() {
		this.interval = setInterval(() => {
			this.onStep();
			this.animIndex += Math.sign(this.end - this.start);
			//if it goes over the end frame
			//Check if it can loop
			//if it can loop keep looping it
			let surpassedEnd = this.animIndex >= this.end
			surpassedEnd = this.end > this.start ? surpassedEnd : this.animIndex <= this.end
			if (surpassedEnd) {
				if (!this.loop) {
					let canStop = this.stop();
					if (canStop) this.onStop();
				} else {
					this.reset()
					this.onLoop();
				}
			}
		}, this.time * 1000)
	}
	startInd() {
		this.animIndex = this.start;
	}
	reverse() {
		let _ = this.start;
		this.start = this.end;
		this.end = _;
	}
	reset() {
		if (this.yoyo) {
			//Do yoyo
			this.reverse();
		}
		this.startInd()
	}
	pause() {
		clearInterval(this.interval)
	}
	stop() {
		if (this.yoyo) {
			//Do yoyo
			if (this.end > this.start) {
				this.reverse()
				return false;
			} else {
				clearInterval(this.interval)
			}
		} else {
			clearInterval(this.interval)
		}
		return true;
	}

}
addComponent("gameScript", gameScript, ".js");
addComponent("gameSprite", gameSprite, ".img");
addComponent("gameFile", gameFile);

function checkifexists(data: any) {
	for (let file of Object.values(engine.files)) {
		if (file.data === data) return file;
	}
	return false;
}
function addGameFile(data: string, type?: string, references?: object): gameFile {
	//console.error(references);
	let fileexists: any;
	if (data !== '') {
		fileexists = checkifexists(data)
	}
	if (!fileexists) {
		let fUUID = engine.customFileUUID(type);
		//console.warn(fUUID);
		fileexists = new gameFile(data, fUUID, type)
		fileexists.references = Object.assign({}, references);
	}
	return fileexists;
}