# Generated by Django 4.1.5 on 2023-01-13 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('localiquizapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='description',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='quiz',
            name='ending',
            field=models.CharField(default=None, max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='quiz',
            name='starting',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]
