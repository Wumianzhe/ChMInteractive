import { Container, Rectangle } from "pixi.js"
import { Grid } from "./grid"
import { Graph } from "./function"

export class Scene extends Container {
    private sceneWidth: number;
    private sceneHeight: number;

    public readonly grid: Grid;
    view: Rectangle;

    constructor(viewWidth: number, viewHeight: number) {
        super()

        this.sceneHeight = viewHeight;
        this.sceneWidth = viewWidth;
        this.view = new Rectangle(-10, 5.5, 20, 11);

        this.grid = new Grid(this);
        this.addChild(this.grid);
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
            _x = Math.min(Math.max(0, (x - this.view.x) / this.view.width * this.sceneWidth), this.sceneWidth);
        }
        if (y == "top") {
            _y = 0
        } else if (y == "bottom") {
            _y = this.sceneHeight;
        } else {
            _y = Math.min(Math.max(0, -(y - this.view.y) / this.view.height * this.sceneHeight), this.sceneHeight);
        }
        return { x: _x, y: _y };
    }

    getView(): Rectangle {
        return this.view;
    }

    getScale(unit: number) {
        const scaleX = this.sceneWidth * (unit / this.view.width) // size of one math unit on scene in X direction
        const scaleY = this.sceneHeight * (unit / this.view.height) // size of one math unit on scene in Y direction
        return { scaleX, scaleY }
    }

    resize(width: number, height: number) {
        this.sceneWidth = width;
        this.sceneHeight = height;
        this.grid.update();
        this.children.forEach((obj) => {
            (obj as Graph).draw(0);
        })
    }
    clearDrawables() {
        // I assume that addChild pushes back and child[0] will always be grid object
        // assumption seems to be true
        console.log("clear")
        while (this.children[1]) {
            this.removeChildAt(1);
        }
    }
    async paintLoop(_?: number) {
        await new Promise(r => setTimeout(r, 1000));
        this.children.forEach((obj) => {
            (obj as Graph).clear();
            (obj as Graph).draw(0);
        })
        // actual paint loop is WIP
        await new Promise(r => setTimeout(r, 5000));
        this.clearDrawables()
    }
}
