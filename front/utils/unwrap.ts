import { Function, Bisect } from "./types"
import { Scene } from '../graph/scene'
import { Graph } from '../graph/function'
import { drawBisectStep, drawFunction } from './drawables'

export function unwrapBisect(scene: Scene, data: any) {
    const f: Function = { values: data.f }
    const b: Bisect = { iters: data.intervals }
    const gf = new Graph(scene, f)
    const gb = new Graph(scene, b)
    gf.setDrawFunction(drawFunction)
    gb.setDrawFunction(drawBisectStep)
    return [gf, gb]
}

