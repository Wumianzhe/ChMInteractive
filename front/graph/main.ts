import { Renderer, Ticker, UPDATE_PRIORITY } from 'pixi.js'
import { unwrapBisect, unwrapSecant } from '../utils/unwrap'
import { Scene } from './scene'

const parent = document.getElementById("pixi-content") as HTMLDivElement;
const container = document.getElementById("pixi-canvas") as HTMLCanvasElement;

const renderer = new Renderer({
    view: container,
    backgroundColor: 0xffffff,
    width: parent.offsetWidth,
    height: parent.offsetHeight,
    antialias: true
})
renderer.clearBeforeRender = false

const scene = new Scene(parent.offsetWidth, parent.offsetHeight)
scene.updateStatic();

const resize = () => {
    scene.resize(parent.clientWidth, parent.clientHeight);
    renderer.resize(parent.clientWidth, parent.clientHeight);
}
window.addEventListener("resize", resize);
container.addEventListener("wheel", (event: any) => {
    event.preventDefault()

    const origin = { x: event.layerX - event.target.offsetLeft, y: event.layerY - event.target.offsetTop }
    const scale = (event.deltaY < 0) ? 0.933 : 1.071; // ~2^-0.1, ~2^0.1

    scene.rescale(origin, scale)
});

container.addEventListener("mousedown", (event: any) => {
    console.log("down")

    const origin = { x: event.layerX - event.target.offsetLeft, y: event.layerY - event.target.offsetTop }
    scene.panToggle(origin);
});
container.addEventListener("mouseup", (event: any) => {
    console.log("up")

    const origin = { x: event.layerX - event.target.offsetLeft, y: event.layerY - event.target.offsetTop }
    scene.panToggle(origin);
});

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
            unwrapBisect(scene, data)
            scene.setStep(300, data.intervals.length)
            break;
        case 'secant':
            scene.clearDrawables()
            unwrapSecant(scene, data)
            scene.setStep(300, data.points.length - 2)
            break;
        default:
            console.log("Incorrect input")
            return
    }
}
