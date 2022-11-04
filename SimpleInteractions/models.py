from pyexpat import model
from django.db import models


class Method(models.Model):
    name = models.CharField(max_length = 20)
    description = models.CharField(max_length = 1000)

# Create your models here.
