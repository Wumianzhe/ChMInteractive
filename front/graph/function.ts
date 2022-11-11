import { Graphics } from "pixi.js"
import { Scene } from "./scene"

interface Point {
    [arg : number] : number
}

export class Graph extends Graphics {
    private values: Array<Point>;

    // stub
    constructor(parent: Scene, url: string) {
        super()

        this.parent = parent;
        this.values = [];
        this.loadArray(url);
        this.draw();
    }
    loadArray(url: string) {
        fetch(url).then(response => response.json()).then(json => {
            for (var i in Array.from(Array(101).keys())) {
                this.values[i][json["args"][i]] = json["values"][i];
            }
        })
    }
    draw() {
        console.log(this.values);
    }
}
