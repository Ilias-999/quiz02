from django.urls import path
from . import views

urlpatterns = [
    path('creat/', views.create_quiz, name='create_quiz'),
    path('list/', views.list_quiz, name='list_quiz'),
    path('quiz/<int:quiz_id>', views.quiz_questions, name="game_quiz"),
    path('getquestions/<int:quiz_id>', views.get_questions, name='get_questions'), 
    path('register/', views.registerPage, name='register_page'),
    path('login/', views.loginPage, name='login_page'),
    path('logout/', views.logoutUser, name='logout'),
    #path('yourenotadmin/', views.yourenotadmin, name='yourenotadmin'),
    path('afterlogoutpage/', views.afterLogoutpage, name='afterlogoutpage')
]
