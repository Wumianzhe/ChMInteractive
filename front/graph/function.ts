import { Graphics, Point } from "pixi.js"
import { Scene } from "./scene"


export class Graph extends Graphics {
    override parent: Scene;
    private values: Array<Point>;

    constructor(parent: Scene, url: string) {
        super()

        this.parent = parent;
        this.values = new Array<Point>;
        this.loadArray(url)//.then(() => this.update());
    }
    async loadArray(url: string) {
        fetch(url).then(response => response.json()).then(json => {
            // stub
            // no idea why `i` ends up string and not a number
            //for (var i in range(0, 101)) {
            //    this.values.push(new Point(json["args"][i], json["values"][i]));
            //}
            console.log(json);
        })
    }
    update() {
        this.clear();
        this.lineStyle(1, 0x000000)
        this.moveTo(this.values[0].x, this.values[0].y);
        this.values.forEach((p) => {
            var P = this.parent.remap(p.x, p.y);
            this.lineTo(P.x, P.y);
        })
    }
}
