import { Rectangle, Renderer, Ticker, UPDATE_PRIORITY } from 'pixi.js'
import { unwrapBisect, unwrapNewton, unwrapSecant } from '../utils/unwrap'
import { Scene } from './scene'

const parent = document.getElementById("pixi-content") as HTMLDivElement;
const container = document.getElementById("pixi-canvas") as HTMLCanvasElement;

const animTime = 500 //ms

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

const ticker = new Ticker();
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
            scene.setStep(animTime, data.intervals.length)
            break;
        case 'secant':
            scene.clearDrawables()
            unwrapSecant(scene, data)
            scene.setStep(animTime, data.points.length - 2)
            break;
        case 'newton':
            scene.clearDrawables()
            unwrapNewton(scene, data)
            scene.setStep(animTime, data.points.length - 1)
            break;
        default:
            console.log("Incorrect input")
            return
    }
}

export function getBounds(): Rectangle {
    return scene.view;
}
