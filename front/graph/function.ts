import { Graphics } from "pixi.js"
import { Scene } from "./scene"

export class Graph extends Graphics {
    private readonly parent: Scene;
    private args: Array<number>;
    private values: Array<number>;

    // stub
    constructor(parent: Scene, url: string) {
        super()

        this.parent = parent;
        this.loadArray(url);
        // draw lines
    }
    loadArray(url: string) {
        fetch(url).then(response => response.json()).then(json => {
            for (var prop in json) {
                console.log(prop);
            }
        })
    }
}
