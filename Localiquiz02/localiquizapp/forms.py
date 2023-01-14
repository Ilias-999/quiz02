from django import forms
from .models import Quiz, Category
from django.forms import ModelForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm



class QuizForm(forms.ModelForm):
    name = forms.CharField(max_length=50)
    category = forms.ModelChoiceField(queryset=Category.objects.all())
    starting = forms.CharField(max_length=50)
    ending = forms.CharField(max_length=50)
    description = forms.CharField(max_length=500)
    questions_file = forms.FileField(widget=forms.ClearableFileInput)

    class Meta:
        model = Quiz
        fields = ['name', 'category','starting' ,'ending' ,'description',  'questions_file']
        
        

        
        
class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields  = ['username', 'email', 'password1', 'password2']
        
        
    