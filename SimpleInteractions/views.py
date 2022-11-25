#import imp
import json
from django.http import HttpResponse
from SimpleInteractions.models import Method
from .models import Method
from sympy import *
from sympy.abc import x
from sympy import lambdify
import numpy as np
#bisection method
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

def secant_response(request, *args, **kwargs):
    f = lambdify(x,request.GET["f"])
    fstp = float(request.GET["fstp"])
    sstp = float(request.GET["sstp"])
    (points, result) = secant(f, fstp, sstp, 1e-6)
    resdict = {
        "f": {x:f(x) for x in np.linspace(-10,10,200)},
        "points" : points,
        "result" : result,
    }
    response = HttpResponse(json.dumps(resdict))
    return response

def bisection_response(request, *args, **kwargs):
    f = lambdify(x,request.GET["f"])
    a = float(request.GET["from"])
    b = float(request.GET["to"])
    (intervals, result) = bisection(f, a, b, (1e-6)*abs(b-a))
    resdict = {
        "f": {x:f(x) for x in np.linspace(-10,10,200)},
        "intervals" : intervals,
        "result" : result,
    }
    response = HttpResponse(json.dumps(resdict))
    return response

def newton_response(request, *args, **kwargs):
    f = request.GET["f"]
    fl = lambdify(x,f)
    a = float(request.GET["from"])
    b = float(request.GET["to"])
    (intervals, result) = newton(f, a, b, (1e-6)*abs(b-a))
    resdict = {
        "f": {x:fl(x) for x in np.linspace(-10,10,200)},
        "intervals" : intervals,
        "result" : result,
    }
    response = HttpResponse(json.dumps(resdict))
    return response
