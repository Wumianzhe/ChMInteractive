import { Container, Rectangle, Point } from "pixi.js"
import { Grid } from "./grid"
import { Graph } from "./function"

export class Scene extends Container {
    private readonly sceneWidth: number;
    private readonly sceneHeight: number;

    private readonly grid: Grid;
    private func: Graph;
    private screen: Rectangle;

    constructor(viewWidth: number, viewHeight: number) {
        super()

        this.sceneHeight = viewHeight;
        this.sceneWidth = viewWidth;
        this.screen = new Rectangle(-10, 4, 20, 8);

        this.grid = new Grid(this.sceneWidth, this.sceneHeight);
        this.addChild(this.grid);

        this.func = new Graph(this, "func_array.json");
        this.addChild(this.func);
    }

    /**
     * In place transform of "real" coordinates to pixel coordinates
     * Intended to be used as lambda
     * @param p - point to be transformed
     */
    remap(p: Point): Point {
        var P = new Point;
        P.x = (p.x - this.screen.x) / this.screen.width * this.sceneWidth;
        P.y = -(p.y - this.screen.y) / this.screen.height * this.sceneHeight;
        return P;
    }

    resize(width: number, height: number) {
        this.grid.resize(width, height);
    }
}
