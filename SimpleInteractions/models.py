from pyexpat import model
from django.db import models
from ckeditor.fields import RichTextField

class Method(models.Model):
    name = models.CharField(max_length = 20)
    description = RichTextField(blank=True, null= True)

# Create your models here.
