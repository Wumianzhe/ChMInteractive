import { Graphics, Rectangle } from "pixi.js"
import { Scene } from "./scene"

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
    update() {
        this.clear();
        this.view = this.parent.getView();
        this.drawMains()
        this.drawSecondary();
        this.drawTertiary()
    }
    drawMains() {
        this.lineStyle(3, 0x000000)
        this.moveTo(this.view.width / 2, 0).lineTo(this.view.width / 2, this.view.height);
        this.moveTo(0, this.view.height / 2).lineTo(this.view.width, this.view.height / 2);
    }
    drawSecondary() {
        var shift = 160
        for (let i = 0; i < this.view.width / shift; i++) {
            this.lineStyle(2, 0x000000)
            this.moveTo(this.view.width / 2 + shift * i, 0).lineTo(this.view.width / 2 + shift * i, this.view.height);
            this.moveTo(this.view.width / 2 - shift * i, 0).lineTo(this.view.width / 2 - shift * i, this.view.height);
        }
    }
    drawTertiary() {
       var shift = 40
        for (let i = 0; i < this.view.width / 40; i++) {
            this.lineStyle(1, 0x000000)
            this.moveTo(this.view.width / 2 + shift * i, 0).lineTo(this.view.width / 2 + shift * i, this.view.height);
            this.moveTo(this.view.width / 2 - shift * i, 0).lineTo(this.view.width / 2 - shift * i, this.view.height);
            this.moveTo(0, this.view.height / 2 + shift * i).lineTo(this.view.width, this.view.height / 2 + shift * i);
            this.moveTo(0, this.view.height / 2 - shift * i).lineTo(this.view.width, this.view.height / 2 - shift * i);
        }
    }

}
