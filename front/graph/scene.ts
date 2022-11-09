import { Container, Sprite } from "pixi.js"

export class Scene extends Container {
    private readonly screenWidth: number;
    private readonly screenHeight: number;

    private clampy: Sprite;
    constructor(screenWidth: number, screenHeight: number) {
        super()

        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;

        this.clampy = Sprite.from("clampy.png");

        this.clampy.anchor.set(0.5);

        this.clampy.x = this.screenWidth / 2;
        this.clampy.y = this.screenHeight / 2;
    }
}
