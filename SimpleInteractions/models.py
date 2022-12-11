from pyexpat import model
from django.db import models

class UserLogin(models.Model):
    first_name = models.CharField(max_length = 30)
    last_name = models.CharField(max_length = 30)
    email = models.EmailField(max_length = 30)
    password = models.CharField(max_length = 200)
    is_customer = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_authenticated = models.BooleanField(default=False)

class Method(models.Model):
    name = models.CharField(max_length = 20)
    description = models.CharField(max_length = 1000)

# Create your models here.
