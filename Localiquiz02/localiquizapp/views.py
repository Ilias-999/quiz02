from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render

import pandas as pd
from .models import *
from .forms import QuizForm, CreateUserForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
 
from django.contrib.auth.decorators import login_required
from .decorators import unauthenticated_user, creator_only
from django.contrib.auth.models import Group

# Create your views here.

@unauthenticated_user
def registerPage(request):
    form = CreateUserForm()
    
    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            user = form.save() 
            group = Group.objects.get(name='user')
            user.groups.add(group)
            
            return redirect('login_page')
    context = {'form_register': form}
    return render(request, 'localiquizapp/register.html', context)

@unauthenticated_user
def loginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('list_quiz')
        
    context = {}
    return render(request, 'localiquizapp/login.html', context)

@login_required(login_url='login_page')
def logoutUser(request):
    logout(request)
    context = {}
    return redirect('afterlogoutpage')

@unauthenticated_user
def afterLogoutpage(request):
    return render(request, 'localiquizapp/logout.html', context={})


#def yourenotadmin(request):
    #logout(request)
    #context = {}
    #return render(request, 'localiquizapp/notadmin.html',context)

@login_required(login_url='login_page')
@creator_only
def create_quiz(request):
    if request.method == 'POST':
        form = QuizForm(request.POST, request.FILES)
        if form.is_valid():
            # Create the Quiz object
            quiz_name = form.cleaned_data['name']
            quiz_category = form.cleaned_data['category']
            quiz_starting  = form.cleaned_data['starting']
            quiz_ending = form.cleaned_data['ending']
            quiz_description = form.cleaned_data['description']
            quiz = Quiz.objects.create(name=quiz_name, category=quiz_category, starting = quiz_starting, ending = quiz_ending, description = quiz_description )        
            # Read the Excel file and create quiz questions
            df = pd.read_excel(form.cleaned_data['questions_file'])
            for index, row in df.iterrows():
                question = Question.objects.create(
                    quiz=quiz,
                    question=row['question'],
                    answer1=row['answer1'],
                    answer2=row['answer2'],
                    answer3=row.get('answer3',''),
                    answer4=row['answer4'],
                    correct=row.get('correct',''),
                    source=row['source'],
                    link=row['link'],
                    text=row['text']
                )
            # return redirect('quiz_detail', quiz_id=quiz.pk)          
    else:
        form = QuizForm()
    return render(request, 'localiquizapp/create_quiz.html', {'form': form})

@login_required(login_url='login_page')
@creator_only
def list_quiz(request):
    quizes = Quiz.objects.all()
    return render(request, 'localiquizapp/list_quiz.html', {'quizes':quizes})

def quiz_questions(request, quiz_id):
    quiz = get_object_or_404(Quiz, pk=quiz_id)
    questions = Question.objects.filter(quiz=quiz)
    return render(request, 'localiquizapp/quiz.html',{'quiz':quiz,'questions':questions})

def get_questions(request, quiz_id):
    quiz = get_object_or_404(Quiz, pk=quiz_id)
    thequestions = Question.objects.filter(quiz=quiz)
    return JsonResponse({"thequestions":list(thequestions.values())})  



