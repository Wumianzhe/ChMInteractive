import { Renderer, Ticker, UPDATE_PRIORITY } from 'pixi.js'
import { unwrapBisect, unwrapSecant } from '../utils/unwrap'
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
renderer.clearBeforeRender = false

const scene = new Scene(parent.offsetWidth, parent.offsetHeight)
scene.updateStatic();

const resize = () => {
    // app.view.style.width = `${parent.clientWidth}`;
    // app.view.style.height = `${parent.clientHeight}`;
    scene.resize(parent.clientWidth, parent.clientHeight);
    renderer.resize(parent.clientWidth, parent.clientHeight);
}
window.addEventListener("resize", resize);

// main loop (paint, events)
const ticker = new Ticker();
// ticker.maxFPS = 60;
ticker.add(loop, UPDATE_PRIORITY.LOW)
ticker.start()

function loop() {
    scene.update();
    renderer.render(scene);
}

export function setMethod(data: any, method: string) {
    switch (method) {
        case 'bisection':
            scene.clearDrawables()
            var funcGraph: Graph, secantGraph: Graph;
            [funcGraph, secantGraph] = unwrapBisect(scene, data)
            scene.addChild(funcGraph);
            scene.addChild(secantGraph);
            scene.updateStatic();
            scene.setStep(300, data.intervals.length)
            break;
        case 'secant':
            scene.clearDrawables()
            var funcGraph: Graph, secantGraph: Graph;
            [funcGraph, secantGraph] = unwrapSecant(scene, data)
            scene.addChild(funcGraph);
            scene.addChild(secantGraph);
            scene.updateStatic();
            scene.setStep(300, data.points.length - 2)
            break;
        default:
            console.log("Incorrect input")
    }
}
