# Generated by Django 4.1.5 on 2023-01-13 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('localiquizapp', '0005_remove_quiz_description_remove_quiz_ending_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='description',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='quiz',
            name='ending',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='quiz',
            name='starting',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
