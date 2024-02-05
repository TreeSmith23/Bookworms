from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('result', views.index),
    path('signin', views.index),
    path('profile', views.index),
    path('checkout', views.index),
    path('createBook/', views.createBook),
    path('createAccount/', views.createAccount),
    path('isBookAvailable/', views.isBookAvailable),
    path('test_auth', views.test_authentication)

]