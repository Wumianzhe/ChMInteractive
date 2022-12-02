// import { Application } from 'pixi.js'
// import { Scene } from './scene'
// import { unwrapBisect } from '../utils/unwrap'
// import { Graph } from './function'

// const parent = document.getElementById("pixi-content") as HTMLDivElement;
// const container = document.getElementById("pixi-canvas") as HTMLCanvasElement;

// const app = new Application({
//     view: container,
//     resolution: window.devicePixelRatio || 1,
//     autoDensity: true,
//     backgroundColor: 0xffffff,
//     width: parent.offsetWidth,
//     height: parent.offsetHeight
// });

// const scene = new Scene(app.screen.width, app.screen.height)

// app.renderer.backgroundAlpha = 0
// app.stage.addChild(scene)
// var resize = () => {
//     scene.resize(parent.clientWidth, parent.clientHeight);
//     app.renderer.resize(parent.clientWidth, parent.clientHeight);
// }
// window.addEventListener("resize", resize);

// export function setMethod(data: any, method: string) {
//     switch (method) {
//         case 'bisect':
//             var gf: Graph, gb: Graph;
//             [gf, gb] = unwrapBisect(scene, data)
//             console.log(gf, gb)
//             scene.addChild(gf);
//             scene.paintLoop();
//             break;
//         default:
//             console.log("Incorrect input")
//     }
// }
