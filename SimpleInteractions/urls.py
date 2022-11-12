from django.urls import path

from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    # path('index/', views.index, name='index'),
    # path('add/', views.add, name='add'),
    path('home/', views.home, name='home'),
    # path('about/', views.about, name='ABOUT'),
    # path('graph/', views.graph, name='GRAPH'),
    # path('theory/', views.theory, name='THEORY')
]
