import { Graphics, Rectangle } from "pixi.js"
import { Scene } from "./scene"
import { Point } from "../utils/drawables"
export class Grid extends Graphics {
    override parent: Scene;
    private view: Rectangle;
    private unit: number;
    private range = {low: 80, high: 200}
    constructor(parent: Scene) {
        super()

        this.parent = parent
        this.view = parent.getView();
        // placeholders to stop TS complaining
        this.unit=1;
        this.calcScale();

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
    calcScale() {
        const predicate = (side: number): boolean => {
            return this.range.low < side && this.range.high > side;
        }
        function tryFactors():number|undefined {
            for (let i of ["1","2","5"]) { // can't set type for i
                let inum = parseFloat(i) as 0.5|1|2;
                if (predicate(scale.scaleX*inum)) {
                    return inum;
                }
            }
            return undefined
        }
        // 20 is a magic number
        this.unit = Math.pow(10,Math.floor(Math.log10(this.view.width/20)));
        let scale = this.parent.getScale(this.unit);
        let factor = tryFactors();
        if (factor === undefined) {
            if (scale.scaleX < this.range.low/2) {
                this.unit *=10;
                scale.scaleX *= 10;
                factor = tryFactors();
                // fallback to default if still no return value
                factor ??=0.1;
                this.unit *=factor;
            } else {
                this.unit *=0.1;
                scale.scaleX *= 0.1;
                factor = tryFactors();
                // fallback to default if still no return value
                factor ??=10;
                this.unit *=factor;
            }
        } else {
            this.unit *= factor;
        }
        
        console.log(this.unit);
    }
    update() {
        this.clear();
        this.view = this.parent.getView();
        this.calcScale()
        this.drawMains()
        this.drawSecondary();
        this.drawTertiary()
    }
    drawMains() {
        this.lineStyle(3, 0x000000)
        this.moveTo(0, "top").lineTo(0, "bottom");
        this.moveTo("left", 0).lineTo("right", 0);
    }

    // TODO rewrite using scene size, so one square is of "reasonable" size
    drawSecondary() {
        this.lineStyle(1,0x000000)
        let low = this.unit*Math.ceil(this.view.x /this.unit);
        let high = this.unit*Math.floor((this.view.x+this.view.width)/this.unit);
        for (let i = low; i <= high; i+=this.unit) {
            this.moveTo(i,"top").lineTo(i,"bottom");
        }
    }
    drawTertiary() {
        
    }

}
