import { Graphics } from "pixi.js"
import { Scene } from "./scene"
import { Function, Method } from "../utils/types"


export class Graph extends Graphics {
    override parent: Scene;
    // @ts-expect-error used only in draw, which is empty by default
    private f?: Function
    // @ts-expect-error used only in draw, which is empty by default
    private m?: Method
    private iter: number = 0;
    public draw: (_: number) => void = (_: number) => {
        console.log(this)
    };

    override moveTo(x: number | "left" | "right", y: number | "top" | "bottom") {
        const coords = this.parent.remap(x, y);
        super.moveTo(coords.x, coords.y)
        return this
    }
    override lineTo(x: number | "left" | "right", y: number | "top" | "bottom") {
        const coords = this.parent.remap(x, y);
        super.lineTo(coords.x, coords.y)
        return this
    }

    constructor(parent: Scene, obj: Function | Method) {
        super()

        // type guard
        function isFunction(obj: Function | Method): obj is Function {
            return (obj as Function).values !== undefined
        }

        if (isFunction(obj)) {
            this.f = obj;
        } else {
            this.m = obj
        }

        this.parent = parent;
    }
    update() {
        this.clear();
        this.draw(this.iter);
    }
    setDrawFunction(func: any) {
        this.draw = func;
    }
}
