from email.policy import default
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# class User(models.Model):
#     firstname = models.CharField(max_length = 50)
#     lastname = models.CharField(max_length = 50)
#     username = models.CharField(max_length = 50)
#     notpassword = models.CharField(max_length = 30)
#     email = models.CharField(max_length = 30)
#     university = models.CharField(max_length = 30)

#     def __str__(self):
#         return self.username


class Book(models.Model):
    isbn = models.CharField(max_length = 50,null=True)
    picture = models.ImageField(upload_to = 'uploads/',default='/book_link.jpg')
    title = models.CharField(max_length = 50,null=True)
    averagePrice = models.DecimalField(max_digits=5,decimal_places=2,null=True)
    sellingPrice = models.DecimalField(max_digits=5,decimal_places=2,null=True)
    seller = models.ForeignKey(User, on_delete=models.CASCADE,null=True)

    def __str__(self):
        return self.isbn

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    university = models.CharField(max_length=100, null=True)
    firstname = models.CharField(max_length=100, null=True)
    lastname = models.CharField(max_length=100, null=True)
    email = models.CharField(max_length=100, null=True)



