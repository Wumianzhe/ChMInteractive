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
