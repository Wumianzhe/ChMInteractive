import { Container, Rectangle, Point } from "pixi.js"
import { Grid } from "./grid"
import { Graph } from "./function"

export class Scene extends Container {
    private sceneWidth: number;
    private sceneHeight: number;

    private readonly grid: Grid;
    private func: Graph;
    view: Rectangle;

    constructor(viewWidth: number, viewHeight: number) {
        super()

        this.sceneHeight = viewHeight;
        this.sceneWidth = viewWidth;
        this.view = new Rectangle(-10, 4, 20, 8);

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
    remap(x: number | "left" | "right", y: number | "top" | "bottom") {
        let _x: number, _y: number;
        if (x == "left") {
            _x = 0
        } else if (x == "right") {
            _x = this.sceneWidth;
        } else {
            _x = (x - this.view.x) / this.view.width * this.sceneWidth;
        }
        if (y == "top") {
            _y = 0
        } else if (y == "bottom") {
            _y = this.sceneHeight;
        } else {
            _y = -(y - this.view.y) / this.view.height * this.sceneHeight;
        }
        return { x: _x, y: _y };
    }

    getView(): Rectangle {
        return this.view;
    }

    resize(width: number, height: number) {
        this.sceneWidth = width;
        this.sceneHeight = height;
        this.grid.update();
        this.func.update();
    }
}
