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
#from SimpleInteractions.models import UserLogin
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
    user = request.user 
    return render(request,"home.html", {'user':user})

def home_template(request):
    return render(request,"qwe")

def graph(request):
    return render(request,"graph.html")

def graph_bisection(request):
    return render(request,"GRAPH_HTML/BISECTION.html")

def graph_secant(request):
    return render(request,"GRAPH_HTML/SECANT.html")

def graph_newton(request):
    return render(request,"GRAPH_HTML/NEWTON.html")

def theory(request):
    return render(request,"THEORY/INTRO.html")

def bisect_theory(request):
    return render(request,"THEORY/BISECTION.html")

def secant_theory(request):
    return render(request,"THEORY/SECANT.html")

def theory_introduction(request):
    return render(request, "THEORY/INTRO.html")

def newton_theory(request):
    return render(request,"THEORY/NEWTON.html")

def about(request):
    return render(request,"ABOUT.html")

def user_signup(request):
    if request.method == 'POST':
        f_n = request.POST['first_name']
        l_n = request.POST['last_name']
        eml = request.POST['email']
        passwd = request.POST['password']
        user = User.objects.create_user(username = f_n, first_name = f_n, last_name = l_n, email = eml, password=passwd)
        user.save()
        #encrypted_passwd = make_password(request.POST['password'])
        #check_passwd = check_password(request.POST['password'], encrypted_passwd)
        #new_user = UserLogin(first_name = f_n, last_name = l_n, email = eml, password = encrypted_passwd, is_authenticated = True)
        #new_user.save()
        return redirect("home")
    return redirect("home")  

def user_login(request):
    if request.method == 'POST':
        usrn = request.POST['username']
        passwd = request.POST['password']
        user = authenticate(request, username = usrn, password = passwd)
        if user is not None:
            login(request, user)
    return redirect('home')

def user_logout(request):
    logout(request)
    return redirect('home')