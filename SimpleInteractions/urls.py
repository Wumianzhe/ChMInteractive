from django.urls import path
from . import views

urlpatterns = [
    path('home', views.home, name='home'),
    path('graph', views.graph, name='graph'),
    path('theory', views.theory, name='theory'),
    path('about', views.about, name='about'),
    path('secant_response/', views.secant_response, name='secant_response'),
    path('bisection_response/', views.bisection_response, name='bisection_response'),
    path('newton_response/', views.newton_response, name='newton_response'),
]
