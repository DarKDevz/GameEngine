class TextObject extends GameObject {
    constructor(x: number, y: number, text: string) {
        super(x, y, "text");
        this.text = text;
        this.clr = 0;
        this.width = 0;
        this.height = 10;
        this.typeId = 3;
        this.loaded = false;
    }
    init() {
        this.loaded = true;
        this.width = textWidth(this.t);
    }
    getClassName() {
        return "Text"
    }
    getValues() {
        return [...super.getValues(), this.t];
    }
    getValuesName() {
        return [...super.getValuesName(), "text"]
    }
    getActualValuesName() {
        return [...super.getActualValuesName(), "text"]
    }
    set text(v: string) {
        this.t = v;
        if (this.loaded) this.width = textWidth(this.t);
    }
    display() {
        fill(this.clr)
        text(this.t, this.x, this.y);
    }

}

function textWidth(t: string): number {
    throw new Error("Function not implemented.");
}
