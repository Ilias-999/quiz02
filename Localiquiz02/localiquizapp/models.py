from django.db import models

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class Quiz(models.Model):
    name = models.CharField(max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    starting = models.CharField(max_length=50,null=True, blank=True)
    ending = models.CharField(max_length=50, null=True, blank=True)
    description = models.CharField(max_length=200, null=True, blank=True)
    
    def __str__(self):
        return self.name
    
class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.CharField(max_length=300)
    answer1 = models.CharField(max_length=200)
    answer2 = models.CharField(max_length=200)
    answer3 = models.CharField(max_length=200)
    answer4 = models.CharField(max_length=200)
    correct = models.CharField(max_length=50)
    source = models.CharField(max_length=200)
    link = models.CharField(max_length=500)
    text = models.TextField()
    
    def __str__(self):
        return self.question
    


