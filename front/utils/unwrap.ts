import { Function, Bisect, Secant } from "./types"
import { Scene } from '../graph/scene'
import { Graph } from '../graph/function'
import { drawBisectStep, drawFunction, drawSecantStep } from './drawables'

export function unwrapBisect(scene: Scene, data: any) {
    const f: Function = { values: data.f }
    const b: Bisect = { iters: data.intervals }
    const gf = new Graph(scene, f)
    const gb = new Graph(scene, b)
    gf.setDrawFunction(drawFunction)
    gb.setDrawFunction(drawBisectStep)
    scene.addChild(gf);
    scene.addChild(gb);
    scene.updateStatic();
}

export function unwrapSecant(scene: Scene, data: any) {
    const f: Function = { values: data.f }
    const s: Secant = { iters: data.points }
    const gf = new Graph(scene, f)
    const gs = new Graph(scene, s)
    gf.setDrawFunction(drawFunction)
    gs.setDrawFunction(drawSecantStep)
    scene.addChild(gf);
    scene.addChild(gs);
    scene.updateStatic();
}
