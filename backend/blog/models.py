from django.db import models
import datetime
from django.contrib.auth.models import User

# Create your models here.
class Blog(models.Model):
    title=models.CharField(max_length=250)
    content=models.TextField()
    created=models.DateTimeField(auto_now_add=True)
    updated=models.DateTimeField(auto_now=True)
    public =models.BooleanField(default=True)
    owner=models.ForeignKey(User, on_delete=models.SET_NULL, null=True, default=1)
    image=models.ImageField(upload_to="images/", blank=True, default="", null=True)
    
    def __str__(self):
        return self.title


class BlogLike(models.Model):
    blog=models.ForeignKey(Blog, on_delete=models.CASCADE)
    user=models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.blog)+" "+self.user.username

class BlogComment(models.Model):
    blog=models.ForeignKey(Blog, on_delete=models.CASCADE)
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    comment=models.TextField()
    