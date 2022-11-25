from sympy import *
from sympy.abc import x
from sympy import lambdify

def bisection(f, a, b, eps):
    intervals = []
    while(abs(b - a)> 2 * eps):
        intervals.append((a,b))
        c = (a + b) / 2
        if (f(a) * f(c) < 0):
            b = c
        else:
            a = c
        result = (a + b) / 2
    return (intervals, result)

#secant method		
def secant(f, x_0, x_1, eps):
    points = []
    points.append((x_0,f(x_0)))
    points.append((x_1,f(x_1)))
    prev = x_0
    cur = x_1
    next = prev
    prev = cur
    cur = cur + (cur - next) / (f(next) / f(cur) - 1)
    points.append((cur, f(cur)))
    while(abs(next-cur)>abs(eps*next)):
        next = prev
        prev = cur
        cur = cur + (cur - next) / (f(next) / f(cur) - 1)
        points.append((cur, f(cur)))
    return (points, cur)
#Newton method
def newton(func, a, b, e):
    intervals = []
    fder = diff(func)
    sder = diff(fder)
    f = lambdify(x, func)
    fderl = lambdify(x,sder)
    sderl = lambdify(x,fder)
    while (abs(a - b) > 2 * e):
        intervals.append((a, b))
        if (f(a) * sderl(a) < 0):
            a = a - f(a) * (a - b) / (f(a) - f(b))
        elif (f(a) * sderl(a) > 0):
            a = a - f(a) / fderl(a)
        if (f(b) * sderl(b) < 0):
            b - f(b) * (b - a) / (f(b) - f(a))
        elif (f(b) * sderl(b) > 0):
            b = b - f(b) / fderl(b)
    intervals.append((a, b))
    result = (a + b) / 2
    return (intervals, result)


#Integration
#midpoint rectangles
def midpoint_rectangles(f, a, b, count):
    sum = 0
    h = (b - a) / count
    for i in range(count):
        sum += (h)*f(a + h * i + h / 2)
    return sum

# first-order diff equat-s
def RK(f, xprev, yprev, h):
    k_1 = f(xprev,yprev)
    k_2 = f(xprev + h/3, yprev + h*k_1/3)
    k_3 = f(xprev + 2 * h/3, yprev + 2 * h * k_2/3)
    ycur = yprev + h / 4 * (k_1 + 3 * k_3)
    return ycur

def runge_kutta_plot(f, n, startpoint, a, b):
    ymas = []
    h = (b - a) / n
    yprev = startpoint
    for i in range(n):
        xprev = a + i * h
        ymas[i] = RK(f, xprev, yprev)
    return ymas