# Generated by Django 4.1.5 on 2023-01-13 11:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('localiquizapp', '0003_alter_quiz_description_alter_quiz_ending_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quiz',
            name='description',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='ending',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='starting',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]