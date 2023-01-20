from .serializers import PublicUserSerializer
from rest_framework import views, permissions, status, generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth.models import User

# Create your views here.
class LogoutView(views.APIView):
    permission_classes=[permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token=request.data["refresh_token"]

            refresh_token=RefreshToken(refresh_token)

            refresh_token.blacklist()

            return Response({"message":"logout successfully"})

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class GetUserDetail(views.APIView):
    permission_classes=[permissions.IsAuthenticated]
    
    def get(self, *args, **kwargs):
        user = self.request.user
        return Response(PublicUserSerializer(user).data)