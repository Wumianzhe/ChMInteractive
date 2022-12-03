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
    return [gf, gb]
}

export function unwrapSecant(scene: Scene, data: any) {
    const f: Function = { values: data.f }
    const s: Secant = { iters: data.points }
    const gf = new Graph(scene, f)
    const gs = new Graph(scene, s)
    gf.setDrawFunction(drawFunction)
    gs.setDrawFunction(drawSecantStep)
    return [gf, gs]
}
