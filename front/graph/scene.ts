import { Container } from "pixi.js"
import { Grid } from "./grid"

export class Scene extends Container {
    private readonly sceneWidth: number;
    private readonly sceneHeight: number;

    private readonly grid: Grid;

    constructor(contWidth: number, contHeight: number) {
        super()

        this.sceneHeight = contHeight;
        this.sceneWidth = contWidth;

        this.grid = new Grid(this.sceneWidth, this.sceneHeight);
        this.addChild(this.grid);
    }

    resize(width: number, height: number) {
        this.grid.resize(width, height);
    }
}
