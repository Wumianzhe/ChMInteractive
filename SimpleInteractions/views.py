#import imp

from django.http import HttpResponse
from SimpleInteractions.models import Method
from .models import Method
from sympy.abc import x
from sympy import lambdify
import numpy as np
#bisection method
def bisection(f, a, b, eps):
    while(abs(b - a)> 2 * eps):
        c = (a + b) / 2
        if (f(a) * f(c) < 0):
            b = c
        else:
            a = c
        result = (a + b) / 2
    return result

#secant method		
def secant(f, x_0, x_1, eps, m_1, M_2):
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

# def index(request):
#     to_show = Method.objects.filter(name = "MidpointRect")
#     return render(request, 'index.html', {'name': to_show.first()})

def bisection_response(request, *args, **kwargs):
    f = lambdify(x,request.GET["f"])
    a = float(request.GET["from"])
    b = float(request.GET["to"])
    eps = float(request.GET["epsilon"])
    result = bisection(f, a, b, eps)
    
    resdict = {
        "f": {x:f(x) for x in np.linspace(-10,10,200)}
    }
    print(resdict["f"])

    response = HttpResponse(result)
    return response