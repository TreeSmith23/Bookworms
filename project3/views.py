from rest_framework import viewsets
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
import requests
from rest_framework.response import Response

def corsTest(req):
    isbn = str(req)
    isbn = isbn.split("=")[1]
    isbn = isbn.split("'")[0]
    url = "https://booksrun.com/api/price/sell/" + isbn + "?key=2o2ixxg99vkipw5ttp3m"
    response = requests.get(url)
    pricing = response.json()
    data = {}
    if pricing["result"]["status"] == "error":
        data["avg"] = "N/A"
        data["good"] = "N/A"
        data["new"] = "N/A"
    else:
        data["avg"] = pricing["result"]["text"]["Average"]
        data["good"] = pricing["result"]["text"]["Good"]
        data["new"] = pricing["result"]["text"]["New"]

    return JsonResponse(data, safe=False)

def generalInfo(req):
    isbn = str(req)
    isbn = isbn.split("=")[1]
    isbn = isbn.split("'")[0]
    url = "https://www.googleapis.com/books/v1/volumes?q=" + isbn
    response = requests.get(url)
    info = response.json()
    data = {}
    data["isbn"] = isbn
    data["name"] = info["items"][0]["volumeInfo"]["title"]
    data["writers"] = info["items"][0]["volumeInfo"]["authors"][0]
    i = 0
    for person in info["items"][0]["volumeInfo"]["authors"]:
        if i == 0:
            i += 1
        else:
            data["writers"] += "\n" + person

    return JsonResponse(data, safe=False)

def find(req):
    title = str(req)
    title = title.split("=")[1]
    title = title.split("'")[0]
    title = title.replace("%20", "+")
    url = "https://www.googleapis.com/books/v1/volumes?q=" + title
    response = requests.get(url)
    info = response.json()
    data = {}
    data["isbn"] = info["items"][0]["volumeInfo"]["industryIdentifiers"][0]["identifier"]
    
    return JsonResponse(data, safe=False)




@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def getUserData(request):
    dumbString = str(request)
    dumbString = dumbString.split("=")
    dumbString = dumbString[1].split("'")
    # print(dumbString[0])
    user = User.objects.filter(username = dumbString[0])


    q1 = UserProfile.objects.filter(user = user[0].id)
    returnable = []
    for e in q1:
        diction = {}
        diction["username"] = dumbString[0]
        diction["firstname"] = e.firstname
        diction["lastname"] = e.lastname
        diction["email"] = e.email
        diction["university"] = e.university
        

        returnable.append(diction)

    # print(returnable)

    return JsonResponse(returnable, safe=False)
    #return HttpResponse(status=200)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def userBooks(request):
    print(request)
    myString = str(request)
    username = myString.split("=")[1].split("'")[0]
    print(username)
    user = User.objects.filter(username = username)

    allBooks = Book.objects.filter(seller = user[0])
    returnable = []
    for b in allBooks:
        diction = {}
        diction["isbn"] = b.isbn
        # diction["picture"] = e.picture
        diction["title"] = b.title
        diction["averagePrice"] = b.averagePrice
        diction["sellingPrice"] = b.sellingPrice
        diction["seller"] = b.seller.username
        returnable.append(diction)

    return JsonResponse(returnable, safe=False)
    # return HttpResponse(status=200)
