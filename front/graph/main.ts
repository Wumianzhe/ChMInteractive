import { Renderer } from 'pixi.js'
import { unwrapBisect } from '../utils/unwrap'
import { Scene } from './scene'
import { Graph } from './function'

const parent = document.getElementById("pixi-content") as HTMLDivElement;
const container = document.getElementById("pixi-canvas") as HTMLCanvasElement;

const renderer = new Renderer({
    view: container,
    backgroundColor: 0xffffff,
    width: parent.offsetWidth,
    height: parent.offsetHeight
})

const scene = new Scene(parent.offsetWidth, parent.offsetHeight)

var resize = () => {
    // app.view.style.width = `${parent.clientWidth}`;
    // app.view.style.height = `${parent.clientHeight}`;
    scene.resize(parent.clientWidth, parent.clientHeight);
    renderer.resize(parent.clientWidth, parent.clientHeight);
}
window.addEventListener("resize", resize);
new Promise(r => setTimeout(r, 30000)).then(() => {
    scene.clearDrawables();
})

// main loop (paint, events)
requestAnimationFrame(loop);
function loop() {
    scene.update();
    renderer.render(scene);
    requestAnimationFrame(loop)
}

export function setMethod(data: any, method: string) {
    switch (method) {
        case 'bisect':
            var gf: Graph, gb: Graph;
            [gf, gb] = unwrapBisect(scene, data)
            console.log(gf, gb)
            scene.addChild(gf);
            break;
        default:
            console.log("Incorrect input")
    }
}
