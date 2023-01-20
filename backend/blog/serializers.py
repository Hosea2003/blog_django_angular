from rest_framework import serializers
from .models import *
from api.serializers import PublicUserSerializer

class BlogSerializer(serializers.ModelSerializer):
    url=serializers.HyperlinkedIdentityField(
        view_name="blog-detail",
        lookup_field="pk"
    )
    user=PublicUserSerializer(read_only=True, source="owner")
    likes=serializers.SerializerMethodField(read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)
    liked = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Blog
        fields=(
            "pk",
            "title",
            "content",
            "created",
            "updated",
            "url",
            "user",
            "image",
            "likes",
            "comments",
            "liked"
        )

    def get_likes(self, obj):
        likes = obj.bloglike_set.all()
        return len(likes)

    def get_comments(self, obj):
        comments = obj.blogcomment_set.all()
        return len(comments)

    def get_liked(self, obj):
        request = self.context.get("request")
        user = request.user
        likes = obj.bloglike_set.filter(user=user)
        return likes.exists()

class BlogCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Blog
        fields=["title", "content"]

class BlogCommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True, source="user.username")

    class Meta:
        model= BlogComment
        fields=[
            "pk",
            "username",
            "comment"
        ]