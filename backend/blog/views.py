from django.shortcuts import render
from rest_framework import generics, mixins, permissions, views
from rest_framework.response import Response
import datetime


from .models import *
from .serializers import *
from api.permissions import IsManagerOrOwner
# Create your views here.
class BlogListAPIView(generics.ListCreateAPIView):
    queryset=Blog.objects.all()
    serializer_class=BlogSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        qs=super().get_queryset()
        return qs.filter(public=True)

class BlogUpdateAPIView(generics.UpdateAPIView):
    queryset=Blog.objects.all()
    serializer_class=BlogSerializer
    lookup_field="pk"
    permission_classes=[permissions.IsAuthenticated]

    def perform_update(self, serializer):
        updated=datetime.datetime.now()
        serializer.save(updated=updated)

class BlogDetailAPIView(generics.RetrieveAPIView):
    queryset=Blog.objects.all()
    serializer_class=BlogSerializer
    lookup_field="pk"

class BlogUnpublish(
    generics.GenericAPIView):
    queryset=Blog.objects.all()
    serializer_class=BlogSerializer
    lookup_field="pk"
    permission_classes=[IsManagerOrOwner]

    def patch(self, *args, **kwargs):
        pk=kwargs.get('pk')
        if pk is None:
            return Response({"message":"Provide the pk"})
        blog=Blog.objects.filter(pk=pk)
        if not blog.exists():
            return Response({"message":"blog not found"})
        blog=blog.first()
        blog.public=False
        blog.save()
        return Response(BlogSerializer(blog, context={'request':self.request}).data)

class BlogCreateAPIView(generics.CreateAPIView):
    queryset=Blog.objects.all()
    serializer_class=BlogCreateSerializer
    permission_classes=[permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user=self.request.user
        # image = serializer.validated_data.get("image")
        # print(image)
        serializer.save(owner=user)


class BlogLikeOrUnlikeView(generics.GenericAPIView):
    queryset=Blog.objects.all()
    serializer_class=BlogSerializer
    permission_classes=[permissions.IsAuthenticated]
    lookup_field="pk"

    def post(self, *args, **kwargs):
        blog= self.get_object()
        likes=blog.bloglike_set.all()
        user = self.request.user
        blog_like= likes.filter(user=user)

        if blog_like.exists():
            blog_like.delete()

        else:
            blog_like=BlogLike(blog=blog, user=user)
            blog_like.save()

        return Response(BlogSerializer(blog, context={'request':self.request}).data)

class BlogCommentAPIView(views.APIView):
    permission_classes=[permissions.IsAuthenticated]

    def get(self, *args, **kwargs):
        blog_id=kwargs.get("id")
        if not blog_id:
            return Response({"message":"Provide the blog id"})
        
        blog = Blog.objects.filter(id=blog_id)
        if not blog.exists():
            return Response({"message":"blog not found"})

        blog = blog.first()
        comments = blog.blogcomment_set.all()
        return Response(BlogCommentSerializer(comments, many=True).data)

    def post(self, *args, **kwargs):
        blog_id=kwargs.get("id")
        if not blog_id:
            return Response({"message":"Provide the blog id"})
        
        blog = Blog.objects.filter(id=blog_id)
        if not blog.exists():
            return Response({"message":"blog not found"})

        blog = blog.first()
        user = self.request.user
        comment =self.request.data.get("comment")
        if comment is None or comment =="":
            return Response({"message":"Provide the comment"})
        blog_comment = BlogComment(user=user, blog=blog, comment=comment)
        blog_comment.save()
        return self.get(*args, **kwargs)