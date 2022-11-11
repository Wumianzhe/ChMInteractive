import { Application } from 'pixi.js'
import { Scene } from './scene'

const parent = document.getElementById("pixi-content") as HTMLDivElement;
const container = document.getElementById("pixi-canvas") as HTMLCanvasElement;

const app = new Application({
    view: container,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0xffffff,
    width: parent.offsetWidth,
    height: parent.offsetHeight
});

const scene = new Scene(app.screen.width, app.screen.height)

app.stage.addChild(scene)
var resize = () => {
    // app.view.style.width = `${parent.clientWidth}`;
    // app.view.style.height = `${parent.clientHeight}`;
    scene.resize(parent.clientWidth, parent.clientHeight);
    app.renderer.resize(parent.clientWidth, parent.clientHeight);
}
window.addEventListener("resize", resize);
