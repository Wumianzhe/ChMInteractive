import { Container, Rectangle } from "pixi.js"
import { Grid } from "./grid"
import { Graph } from "./function"
import { Point } from "../utils/types"

export class Scene extends Container {
    private sceneWidth: number;
    private sceneHeight: number;
    private stepTimer?: NodeJS.Timer = undefined;
    private step: number = 0;
    private panPosition: Point = { x: 0, y: 0 };
    private panning: boolean = false;

    public readonly grid: Grid;
    view: Rectangle;

    constructor(viewWidth: number, viewHeight: number) {
        super()

        this.sceneHeight = viewHeight;
        this.sceneWidth = viewWidth;
        // modify height based on aspect ratio
        const ratio = this.sceneHeight / this.sceneWidth;
        this.view = new Rectangle(-10, 10 * ratio, 20, 20 * ratio);

        this.interactive = true;
        this.hitArea = new Rectangle(this.sceneHeight, this.sceneWidth);

        this.grid = new Grid(this);
        this.addChild(this.grid);

        // events registration
        this.on("mousemove", (e) => {
            this.pan({ x: e.data.global.x, y: e.data.global.y })
        }, this)
        // pointer up/down don't seem to work, so I'm using HTML events
        this.on('pointerdown', (e) => {
            console.log("down")
            this.panToggle({ x: e.data.global.x, y: e.data.global.y })
        }, this)
        this.on('pointerup', (e) => {
            console.log("up")
            this.panToggle({ x: e.data.global.x, y: e.data.global.y })
        }, this)
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
            _x = Math.min(Math.max(-10, (x - this.view.x) / this.view.width * this.sceneWidth), this.sceneWidth + 10);
        }
        if (y == "top") {
            _y = 0
        } else if (y == "bottom") {
            _y = this.sceneHeight;
        } else {
            _y = Math.min(Math.max(-10, -(y - this.view.y) / this.view.height * this.sceneHeight), this.sceneHeight + 10);
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
        // modify height based on aspect ratio
        const ratio = this.sceneHeight / this.sceneWidth;
        this.view.y = -this.view.x * ratio;
        this.view.height = this.view.width * ratio;
        this.updateStatic();
        this.update();
    }

    updateStatic() {
        this.grid.resize();

        function isFunctionGraph(obj: any): obj is Graph {
            return (obj as Graph).f !== undefined
        }
        this.children.forEach((obj) => {
            if (isFunctionGraph(obj)) {
                obj.clear();
                obj.update(0);
            }
        })
    }
    clearDrawables() {
        // is a de facto method cleanup
        clearInterval(this.stepTimer)
        this.stepTimer = undefined;
        this.step = 0;

        // I assume that addChild pushes back and child[0] will always be grid object
        // assumption seems to be true
        console.log("clear")
        while (this.children[1]) {
            this.children[1].destroy();
            this.removeChildAt(1);
        }
        this.updateStatic()
    }
    update(_?: number) {
        //console.log("update")
        function isMethodGraph(obj: any): obj is Graph {
            return (obj as Graph).m !== undefined
        }
        this.children.forEach((obj) => {
            if (isMethodGraph(obj)) {
                (obj as Graph).clear();
                (obj as Graph).update(this.step);
            }
        })
    }
    setStep(delay: number, maxIter: number) {
        // checks null for me and keeps old if not null
        this.stepTimer ??= setInterval(() => { this.advanceIter(maxIter) }, delay)
    }
    private advanceIter(maxIter: number) {
        this.step++;
        if (this.step == maxIter) {
            this.step = 0;
            clearInterval(this.stepTimer)
            this.stepTimer = undefined;
        }
    }
    rescale(origin: Point, scale: number) {
        const mathX = this.view.x + this.view.width * (origin.x / this.sceneWidth)
        const mathY = this.view.y - this.view.height * (origin.y / this.sceneHeight)

        this.view.x = mathX - scale * (mathX - this.view.x);
        this.view.y = mathY + scale * (this.view.y - mathY);

        this.view.width *= scale;
        this.view.height *= scale;

        this.updateStatic()
        this.update()
    }
    panToggle(position: Point) {
        this.panPosition = position
        this.panning = !this.panning
    }
    pan(to: Point) {
        if (!this.panning) {
            return;
        }
        const delta = { x: to.x - this.panPosition.x, y: to.y - this.panPosition.y }
        const deltaX = delta.x / this.sceneWidth * this.view.width // convert from screen to math coords
        const deltaY = delta.y / this.sceneHeight * this.view.height // convert from screen to math coords
        this.view.x -= deltaX;
        this.view.y += deltaY;

        this.panPosition = to;

        this.updateStatic()
        this.update()
    }
}
