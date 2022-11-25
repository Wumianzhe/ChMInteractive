import { Graphics, Rectangle } from "pixi.js"
import { Scene } from "./scene"
import { Point } from "../utils/drawables"

export class Grid extends Graphics {
    override parent: Scene;
    private view: Rectangle;
    constructor(parent: Scene) {
        super()

        this.parent = parent
        this.view = parent.getView();

        // draw lines
        this.drawMains();
        this.drawSecondary();
        this.drawTertiary()
    }
    override moveTo(x: number | "left" | "right", y: number | "top" | "bottom") {
        const coords: Point = this.parent.remap(x, y);
        super.moveTo(coords.x, coords.y)
        return this
    }
    override lineTo(x: number | "left" | "right", y: number | "top" | "bottom") {
        const coords: Point = this.parent.remap(x, y);
        super.lineTo(coords.x, coords.y)
        return this
    }
    update() {
        this.clear();
        this.view = this.parent.getView();
        this.drawMains()
        this.drawSecondary();
        this.drawTertiary()
    }
    drawMains() {
        this.lineStyle(3, 0x000000)
        this.moveTo(0, "top").lineTo(0, "bottom");
        this.moveTo("left", 0).lineTo("right", 0);
    }
    drawSecondary() {
        // per side
        const count = 10;
        const center_h = this.view.top - this.view.height / 2;
        const center_w = this.view.left + this.view.width / 2;
        const step_h = this.view.height / count / 2;
        const step_w = this.view.width / count / 2;
        for (let i = 1; i < count; i++) {
            this.lineStyle(1, 0x000000, 0.5)
            this.moveTo(center_w + i * step_w, "top").lineTo(center_w + i * step_w, "bottom");
            this.moveTo(center_w - i * step_w, "top").lineTo(center_w - i * step_w, "bottom");
            this.moveTo("left", center_h + i * step_h).lineTo("right", center_h + i * step_h);
            this.moveTo("left", center_h - i * step_h).lineTo("right", center_h - i * step_h);
        }
    }
    drawTertiary() {
        // per side
        const count = 50;
        const center_h = this.view.top - this.view.height / 2;
        const center_w = this.view.left + this.view.width / 2;
        const step_h = this.view.height / count / 2;
        const step_w = this.view.width / count / 2;
        for (let i = 1; i < count; i++) {
            this.lineStyle(1, 0x000000, 0.3)
            this.moveTo(center_w + i * step_w, "top").lineTo(center_w + i * step_w, "bottom");
            this.moveTo(center_w - i * step_w, "top").lineTo(center_w - i * step_w, "bottom");
            this.moveTo("left", center_h + i * step_h).lineTo("right", center_h + i * step_h);
            this.moveTo("left", center_h - i * step_h).lineTo("right", center_h - i * step_h);
        }
    }

}
