import { Graphics } from "pixi.js"
import { Scene } from "./scene"
import { Function, Method } from "../utils/types"


export class Graph extends Graphics {
    override parent: Scene;
    f?: Function
    m?: Method
    // @ts-expect-error used only in update, which is empty by default
    private iter: number = 0;
    public update: (_: number) => void = (_?: number) => {
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
    setDrawFunction(func: (this: any, index: number) => void) {
        this.update = func;
    }
}
