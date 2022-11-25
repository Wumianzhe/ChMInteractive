export interface Function {
    values: { x: number, y: number }[]
}

export interface Point {
    x: number,
    y: number
}

export interface Bisect {
    iters: { a: number, b: number }[]
}

export interface Newton {
    iters: { x: number, fx: number }[]
}

export interface Secant {
    iters: { x: number, fx: number }[]
}

export type Method = Bisect | Newton | Secant

// assumed use is as bound function in graph object
export function drawFunction(this: any, f: Function) {
    this.moveTo(f.values[0].x, f.values[0].y);
    f.values.forEach((p) => {
        this.lineTo(p.x, p.y)
    })
}

// just draw statically for now, will think about animating it later
// assumes existence of "m" member, which represents drawn method
export function drawBisectStep(this: any, index: number) {
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
    const m = this.m as Secant
    this.moveTo(m.iters[index].x, m.iters[index].fx);
    this.lineTo(m.iters[index + 2].x, 0)
    // should be a dashed line, but it appears to be a pain
    this.lineTo(m.iters[index + 2].x, m.iters[index + 2].fx);
}
