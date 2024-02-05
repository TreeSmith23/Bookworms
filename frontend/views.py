from rest_framework import viewsets, permissions
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
import os
from frontend.models import Book, UserProfile
from django.contrib.auth.models import User
from django.contrib.auth import login, logout
from django.shortcuts import get_object_or_404, redirect, render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import json
from urllib.parse import unquote

# Create your views here.
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

@permission_classes((IsAuthenticated, ))
def createBook(request):

    dumbStringOG = str(request)
    ISBN = dumbStringOG.split("&")[0].split("=")[1]
    Title = unquote(dumbStringOG.split("&")[1].split("=")[1])
    Username = dumbStringOG.split("&")[2].split("=")[1]
    Price = dumbStringOG.split("&")[3].split("=")[1].split("'")[0]

    print(ISBN)
    print(Title)
    print(Username)
    print(Price)

    user = User.objects.filter(username = Username)
    print(user[0].id)
    newbook = Book.objects.create(isbn = ISBN, title = Title, sellingPrice = Price, seller = user[0])
    return HttpResponse(status=200)

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def isBookAvailable(request):
    dumbString = str(request)
    case = dumbString.split("?")[1].split("=")[0]
    dumbString = dumbString.split("=")
    dumbString = dumbString[1].split("'")
    usableString = dumbString[0]
    print("HERE")
    print(usableString)
    print("HERE")
    if usableString.find("%") != -1:
        usableString = unquote(usableString)
    
    if(case == "isbn"):
        q1 = Book.objects.filter(isbn = usableString)
    else:
        q1 = Book.objects.filter(title = usableString)
    returnable = []
    for e in q1:
        # only keep isbn in sprint three
        diction = {}
        diction["isbn"] = e.isbn
        # diction["picture"] = e.picture
        diction["title"] = e.title
        diction["averagePrice"] = e.averagePrice
        diction["sellingPrice"] = e.sellingPrice
        diction["seller"] = e.seller.username
        returnable.append(diction)

    return JsonResponse(returnable, safe=False)



@api_view(["GET"])
@permission_classes((IsAuthenticated, ))
def test_authentication(request):
    print(request.user)
    return HttpResponse(status=200)


def createAccount(request):

    dumbStringOG = str(request)
    print(dumbStringOG)
    userName = dumbStringOG.split("&")[0].split("=")[1]
    password = unquote(dumbStringOG.split("&")[1].split("=")[1])
    firstName = dumbStringOG.split("&")[2].split("=")[1]
    lastName = dumbStringOG.split("&")[3].split("=")[1]
    email = dumbStringOG.split("&")[4].split("=")[1]
    uni = unquote(dumbStringOG.split("&")[5].split("=")[1].split("'")[0])

    print(userName)
    print(password)
    print(firstName)
    print(lastName)
    print(email)
    print(uni)
    if not("@" in email):
        return HttpResponse(status=400)


    # user = User.objects.filter(username = Username)
    # print(user[0].id)
    try:
        newuser = User.objects.create(username = userName)
        newuser.set_password(password)
        newuser.save()
    except:
        print("incorrect info for creating user1")
        quit()

    try:
        newuserprof = UserProfile.objects.create(user = newuser, university = uni, firstname = firstName, lastname = lastName, email = email)
    except:
        print("incorrect info for creating user2")
        quit()


    return HttpResponse(status=200)