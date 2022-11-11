import { Graphics } from "pixi.js"

export class Grid extends Graphics {
    private screenWidth: number;
    private screenHeight: number;

    constructor(contWidth: number, contHeight: number) {
        super()

        this.screenWidth = contWidth;
        this.screenHeight = contHeight;

        // draw lines
        this.drawMains();
        this.drawSecondary();
        this.drawTertiary()
    }
    resize(width: number, height: number) {
        this.clear();
        this.screenWidth = width;
        this.screenHeight = height;
        this.drawMains()
        this.drawSecondary();
        this.drawTertiary()
    }
    drawMains() {
        this.lineStyle(2, 0x000000)
        this.moveTo(this.screenWidth / 2, 0).lineTo(this.screenWidth / 2, this.screenHeight);
        this.moveTo(0, this.screenHeight / 2).lineTo(this.screenWidth, this.screenHeight / 2);
    }
    drawSecondary() {

    }
    drawTertiary() {

    }
}
