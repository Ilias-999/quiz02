from django.http import HttpResponse 
from django.shortcuts import redirect

def unauthenticated_user(view_func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('logout')
        else: 
            return view_func(request, *args, **kwargs)       
    return wrapper_func

def creator_only(view_func):
    def wrapper_function(request, *args, **kwargs):
        grupe = None
        if request.user.groups.exists():
            groupe = request.user.groups.all()[0].name
            
        if groupe == 'creator':
            return view_func(request, *args, **kwargs)
        
        else:
            return redirect('logout')
    
    return wrapper_function
        