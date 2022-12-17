#import imp
import json
from methods import bisection
from methods import secant
from methods import newton
from sympy import lambdify
from sympy import *
from sympy.abc import x
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
#from django.contrib.auth.hashers import make_password, check_password
from django.shortcuts import render, redirect
from SimpleInteractions.models import Method
from .models import Method
import numpy as np
from django.contrib import messages

#bisection method


def secant_response(request, *args, **kwargs):
    f = lambdify(x,request.GET["f"])
    fstp = float(request.GET["fstp"])
    sstp = float(request.GET["sstp"])
    low = float(request.GET["low"])
    high = float(request.GET["high"])
    (points, result) = secant(f, fstp, sstp, 1e-6)
    resdict = {
        "f": [{"x":x,"y":f(x)} for x in np.linspace(low,high,500)],
        "points" : points,
        "result" : result,
    }
    
    response = HttpResponse(json.dumps(resdict))
    return response

def bisection_response(request, *args, **kwargs):
    f = lambdify(x,request.GET["f"])
    a = float(request.GET["from"])
    b = float(request.GET["to"])
    low = float(request.GET["low"])
    high = float(request.GET["high"])
    (intervals, result) = bisection(f, a, b, (1e-6)*abs(b-a))
    resdict = {
        "f": [{"x":x,"y":f(x)} for x in np.linspace(low,high,500)],
        "intervals" : intervals,
        "result" : result,
    }
    response = HttpResponse(json.dumps(resdict))
    return response

def newton_response(request, *args, **kwargs):
    f = request.GET["f"]
    fl = lambdify(x,f)
    a = float(request.GET["x1"])
    low = float(request.GET["low"])
    high = float(request.GET["high"])
    (points, result) = newton(f, a, (1e-6)*abs(high-low))
    resdict = {
        "f": [{"x":x,"y":fl(x)} for x in np.linspace(low,high,500)],
        "points" : [{"x": x, "fx":fx} for (x,fx) in points],
        "result" : result,
    }
    response = HttpResponse(json.dumps(resdict))
    return response

def home(request):
    user = request.user 
    return render(request,"home.html", {'user':user})

def home_template(request):
    return render(request,"qwe")

def graph(request):
    return render(request,"graph.html")

def bisect_theory(request):
    bisect_decription = Method.objects.get(name = "bisection")
    bisect_description = bisect_decription.description
    return render(request,"THEORY/BISECTION.html", {'description':bisect_description})

def secant_theory(request):
    secant_decription = Method.objects.get(name = "secant").description
    return render(request,"THEORY/SECANT.html", {'secant_decription':secant_decription})

def theory_introduction(request):
    intro_decription = Method.objects.get(name = "intro").description
    return render(request,"THEORY/INTRO.html", {'intro_decription':intro_decription})

def newton_theory(request):
    newton_decription = Method.objects.get(name = "newton").description
    return render(request,"THEORY/NEWTON.html", {'newton_decription':newton_decription})

def user_signup(request):
    if request.method == 'POST':
        f_n = request.POST['first_name']
        l_n = request.POST['last_name']
        eml = request.POST['email']
        passwd = request.POST['password']
        user = User.objects.create_user(username = f_n, first_name = f_n, last_name = l_n, email = eml, password=passwd)
        user.save()
        login(request, user)
        return redirect(request.GET.get('next_up'))

def user_login(request):
    if request.method == 'POST':
        usrn = request.POST['username']
        passwd = request.POST['password']
        user = authenticate(request, username = usrn, password = passwd)
        if user is not None:
            login(request, user)
            return redirect(request.GET.get('next'))
        else:
            messages.error(request,'Try again later')
            return redirect(request.GET.get('next'))
    

def user_logout(request):
    logout(request)
    return redirect('home')
