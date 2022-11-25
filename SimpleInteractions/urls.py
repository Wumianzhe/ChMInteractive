from django.urls import path

from . import views

urlpatterns = [
    path('secant_response/', views.secant_response, name='secant_response'),
    path('bisection_response/', views.bisection_response, name='bisection_response'),
]
