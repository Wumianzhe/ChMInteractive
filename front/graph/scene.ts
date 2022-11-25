import { Container, Rectangle, Point } from "pixi.js"
import { Grid } from "./grid"
import { Graph } from "./function"

export class Scene extends Container {
    private sceneWidth: number;
    private sceneHeight: number;

    private readonly grid: Grid;
    private func: Graph;
    screen: Rectangle;

    constructor(viewWidth: number, viewHeight: number) {
        super()

        this.sceneHeight = viewHeight;
        this.sceneWidth = viewWidth;
        this.screen = new Rectangle(-10, 4, 20, 8);

        this.grid = new Grid(this);
        this.addChild(this.grid);

        this.func = new Graph(this, "http://localhost:8080/home/");
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

    getView(): Rectangle {
        return new Rectangle(0, 0, this.sceneWidth, this.sceneHeight);
    }

    resize(width: number, height: number) {
        this.sceneWidth = width;
        this.sceneHeight = height;
        this.grid.update();
        this.func.update();
    }
}
