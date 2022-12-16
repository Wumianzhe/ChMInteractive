import { Graphics, Rectangle, Text } from "pixi.js"
import { Scene } from "./scene"

export class Grid extends Graphics {
    override parent: Scene;
    private view: Rectangle;
    private unit: number;
    // part of unit, but it'll have to be calculated often otherwise
    private multi: number;
    private range = { low: 80, high: 200 }
    constructor(parent: Scene) {
        super()

        this.parent = parent
        this.view = parent.getView();
        // placeholders to stop TS complaining
        this.unit = 1;
        this.multi = 1;
        this.calcScale();

        // draw lines
        this.drawMains();
        this.drawSecondary();
        this.drawTertiary()
    }
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
    calcScale() {
        const predicate = (side: number): boolean => {
            return this.range.low < side && this.range.high > side;
        }
        function tryFactors(): number | undefined {
            for (let i of ["1", "2", "5"]) { // can't set type for i
                let inum = parseFloat(i)
                if (predicate(scale.scaleX * inum)) {
                    return inum;
                }
            }
            return undefined
        }
        // 10 is a magic number (approx of default view width/100)
        this.unit = Math.pow(10, Math.floor(Math.log10(this.view.width / 10)));
        let scale = this.parent.getScale(this.unit);
        let factor = tryFactors();
        if (factor === undefined) {
            if (scale.scaleX < this.range.low / 2) {
                this.unit *= 10;
                scale.scaleX *= 10;
                factor = tryFactors();
                this.multi = factor ? factor : 1;
                // fallback to default if still no return value
                factor ??= 0.1;
                this.unit *= factor;
            } else {
                this.unit *= 0.1;
                scale.scaleX *= 0.1;
                factor = tryFactors();
                this.multi = factor ? factor : 1;
                // fallback to default if still no return value
                factor ??= 10;
                this.unit *= factor;
            }
        } else {
            this.unit *= factor;
        }

        console.log(this.unit);
    }
    resize() {
        this.view = this.parent.getView();
        this.calcScale();
        this.update();
    }
    update(_?: number) {
        this.clear();
        // clear children (can't use forEach here)
        while (this.children[0]) {
            this.children[0].destroy();
        }
        this.drawMains();
        this.drawSecondary();
        this.drawTertiary();
    }
    drawMains() {
        this.lineStyle(3, 0x000000)
        this.moveTo(0, "top").lineTo(0, "bottom");
        this.moveTo("left", 0).lineTo("right", 0);
    }

    // TODO fix numbers font (minor)
    drawSecondary() {
        this.lineStyle(1, 0x000000)
        let low = this.unit * Math.ceil(this.view.x / this.unit);
        let high = this.unit * Math.floor((this.view.x + this.view.width) / this.unit);

        for (let i = low; i <= high; i += this.unit) {
            this.moveTo(i, "top").lineTo(i, "bottom");
            let text = new Text(i.toString());
            const coords = this.parent.remap(i, 0);
            text.position.set(coords.x, coords.y)
            this.addChild(text);
        }
        high = this.unit * Math.ceil(this.view.y / this.unit);
        low = this.unit * Math.floor((this.view.y - this.view.height) / this.unit);
        for (let i = low; i <= high; i += this.unit) {
            this.moveTo("left", i).lineTo("right", i);
            let text = new Text(i.toString());
            const coords = this.parent.remap(0, i);
            text.position.set(coords.x, coords.y)
            this.addChild(text);
        }
    }
    drawTertiary() {
        var unitSmall = this.unit / ((this.multi == 2) ? 4 : 5);
        this.lineStyle(0.5, 0x000000, 0.3)
        let low = unitSmall * Math.ceil(this.view.x / unitSmall);
        let high = unitSmall * Math.floor((this.view.x + this.view.width) / unitSmall);

        for (let i = low; i <= high; i += unitSmall) {
            this.moveTo(i, "top").lineTo(i, "bottom");
        }
        high = unitSmall * Math.ceil(this.view.y / unitSmall);
        low = unitSmall * Math.floor((this.view.y - this.view.height) / unitSmall);
        for (let i = low; i <= high; i += unitSmall) {
            this.moveTo("left", i).lineTo("right", i);
        }
    }
}
