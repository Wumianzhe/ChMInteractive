from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index')
    ,path('index', views.index, name='index')
    ,path('add', views.add, name='add')
    ,path('num', views.num, name='numhead')
]
