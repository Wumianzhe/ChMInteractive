from unicodedata import name
from django.shortcuts import render
from django.http import HttpResponse
from SimpleInteractions.models import Method
from .models import Method


def index(request):
    to_show = Method.objects.filter(name = "MidpointRect")
    return render(request, 'index.html', {'name': to_show.first()})

def home(request):
    return render(request, 'INDEX.html')

def about(request):
     return render(request, 'ABOUT.html')

def graph(request):
    return render(request, 'GRAPH.html')
def theory(request):
    return render(request, 'THEORY.html',)
def add(request):
    val1 = int(request.POST.get('num1', False))
    val2 = int(request.POST.get('num2', False))
    res = 3 * val1 + val2
    return render(request, "result.html", {'result':res})
    #return (render(request, ''))
# Create your views here.
