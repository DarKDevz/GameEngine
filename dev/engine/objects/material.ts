
class Material {
    fun: Function;
    values: any[];
    type: number;
    constructor() {
        this.fun = fill;
        this.values = [255,0,0]
        this.type = 0;
    }
    apply() {
        this.fun(...this.values);
    }
    set(fun:Function,values:Array<any>,type:number) {
        this.fun = fun;
        this.values = values;
        this.type = type;
    }
}