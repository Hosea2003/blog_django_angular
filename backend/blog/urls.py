from django.urls import path
from . import views

urlpatterns = [
    path('', views.BlogListAPIView().as_view()),
    path('update/<int:pk>', views.BlogUpdateAPIView().as_view()),
    path('details/<int:pk>', views.BlogDetailAPIView().as_view(), name="blog-detail"),
    path('unpublish/<int:pk>', views.BlogUnpublish().as_view()),
    path('create/', views.BlogCreateAPIView().as_view()),
    path('like/<int:pk>/', views.BlogLikeOrUnlikeView().as_view(), name="blog-like"),
    path('comments/<int:id>', views.BlogCommentAPIView().as_view())
]
