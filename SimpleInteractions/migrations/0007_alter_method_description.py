# Generated by Django 4.1.4 on 2022-12-16 18:23

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SimpleInteractions', '0006_delete_userlogin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='method',
            name='description',
            field=ckeditor.fields.RichTextField(blank=True, null=True),
        ),
    ]