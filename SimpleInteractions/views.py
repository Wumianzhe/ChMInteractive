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
    
    return (result,intervals)

#secant method		
def secant(f, x_0, x_1, eps, a, b):
    fst_der = diff(f)
    snd_der = diff(fst_der)
    interval = Interval(a,b)
    m_1 = minimum(fst_der, x, interval)
    M_2 = maximum(snd_der,x, interval)
    prev = x_0
    cur = x_1
    next = prev
    prev = cur
    cur = cur + (cur - next) / (f(next) / f(cur) - 1)
    while (M_2 / (2 * m_1) * abs(next - cur) * abs(cur - prev) > eps):
        next = prev
        prev = cur
        cur = cur + (cur - next) / (f(next) / f(cur) - 1)
    return cur

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
    a = float(request.GET["from"])
    b = float(request.GET["to"])
    eps = float(request.GET["epsilon"])
    result = secant(f, fstp, sstp, eps, a, b)
    response = HttpResponse(result)
    return response

def bisection_response(request, *args, **kwargs):
    f = lambdify(x,request.GET["f"])
    a = float(request.GET["from"])
    b = float(request.GET["to"])
    eps = float(request.GET["epsilon"])
    (result,intervals) = bisection(f, a, b, eps)
    resdict = {
        "f": {x:f(x) for x in np.linspace(-10,10,200)},
        "intervals" : intervals,
        "result" : result,
    }
    
    print(resdict)

    response = HttpResponse(json.dumps(resdict))
    return response