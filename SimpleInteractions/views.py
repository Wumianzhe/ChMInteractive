#import imp
import json
from methods import bisection
from methods import secant
from methods import newton
from sympy import lambdify
from sympy import *
from sympy.abc import x
from django.http import HttpResponse
from django.shortcuts import render
from SimpleInteractions.models import Method
from .models import Method
import numpy as np
#bisection method


def secant_response(request, *args, **kwargs):
    f = lambdify(x,request.GET["f"])
    fstp = float(request.GET["fstp"])
    sstp = float(request.GET["sstp"])
    (points, result) = secant(f, fstp, sstp, 1e-6)
    resdict = {
        "f": [{"x":x,"y":f(x)} for x in np.linspace(-10,10,200)],
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
        "f": [{"x":x,"y":f(x)} for x in np.linspace(-10,10,200)],
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
        "f": [{"x":x,"y":f(x)} for x in np.linspace(-10,10,200)],
        "intervals" : intervals,
        "result" : result,
    }
    response = HttpResponse(json.dumps(resdict))
    return response

def home(request):
    return render(request,"INDEX.html")

def graph_bisection(request):
    return render(request,"GRAPH_HTML/BISECTION.html")

def graph_secant(request):
    return render(request,"GRAPH_HTML/SECANT.html")

def graph_newton(request):
    return render(request,"GRAPH_HTML/NEWTON.html")

def theory(request):
    return render(request,"THEORY/INTRO.html")

def bisect_theory(request):
    test_bisect_decription = Method.objects.get(name = "bisection")
    description = test_bisect_decription.description
    return render(request,"THEORY/BISECTION.html")

def secant_theory(request):
    return render(request,"THEORY/SECANT.html")

def theory_introduction(request):
    return render(request, "THEORY/INTRO.html")


def newton_theory(request):
    return render(request,"THEORY/NEWTON.html")

def about(request):
    return render(request,"ABOUT.html")
