import { Function, Bisect, Newton, Secant } from "./types"

// assumed use is as bound function in graph object
export function drawFunction(this: any, _?: number) {
    this.clear();
    this.lineStyle(2, 0x239b56)
    const f = this.f as Function
    this.moveTo(f.values[0].x, f.values[0].y);
    f.values.forEach((p) => {
        this.lineTo(p.x, p.y)
    })
}

// just draw statically for now, will think about animating it later
// assumes existence of "m" member, which represents drawn method
export function drawBisectStep(this: any, index: number) {
    this.clear();
    this.lineStyle(2, 0xc0392b)
    const m = this.m as Bisect
    this.moveTo(m.iters[index].a, "top").lineTo(m.iters[index].a, "bottom");
    this.moveTo(m.iters[index].b, "top").lineTo(m.iters[index].b, "bottom");
}

export function drawNewtonStep(this: any, index: number) {
    const m = this.m as Newton
    this.moveTo(m.iters[index].x, m.iters[index].fx);
    this.lineTo(m.iters[index + 1].x, 0)
    // should be a dashed line, but it appears to be a pain
    this.lineTo(m.iters[index + 1].x, m.iters[index + 1].fx);
}

export function drawSecantStep(this: any, index: number) {
    this.clear();
    this.lineStyle(2, 0xc0392b)
    const m = this.m as Secant
    this.moveTo(m.iters[index].x, m.iters[index].fx);
    this.lineTo(m.iters[index + 2].x, 0)
    // should be a dashed line, but it appears to be a pain
    this.lineTo(m.iters[index + 2].x, m.iters[index + 2].fx);
}
