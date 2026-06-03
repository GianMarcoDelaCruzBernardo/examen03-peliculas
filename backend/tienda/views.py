from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Genero, Pelicula, Pedido
from .serializers import GeneroSerializer, PeliculaSerializer, PedidoSerializer


class CsrfExemptSessionAuthentication(SessionAuthentication):
    """Quita la validacion CSRF para que el frontend SPA pueda llamar la API."""
    def enforce_csrf(self, request):
        return


class GeneroViewSet(viewsets.ModelViewSet):
    queryset         = Genero.objects.all()
    serializer_class = GeneroSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes     = [AllowAny]


class PeliculaViewSet(viewsets.ModelViewSet):
    queryset         = Pelicula.objects.select_related('genero').all()
    serializer_class = PeliculaSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes     = [AllowAny]

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx['request'] = self.request
        return ctx

    def get_queryset(self):
        qs     = super().get_queryset()
        genero = self.request.query_params.get('genero')
        if genero:
            qs = qs.filter(genero__id=genero)
        return qs


class PedidoViewSet(viewsets.ModelViewSet):
    queryset         = Pedido.objects.select_related('pelicula').all()
    serializer_class = PedidoSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes     = [AllowAny]


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username') or request.data.get('email', '')
    password = request.data.get('password', '')
    if not username or not password:
        return Response({'error': 'Usuario y contrasena son requeridos.'}, status=400)
    if '@' in username:
        try:
            username = User.objects.get(email=username).username
        except User.DoesNotExist:
            return Response({'error': 'Credenciales incorrectas.'}, status=401)
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        return Response({'message': 'Login exitoso.', 'user': {'id': user.id, 'username': user.username, 'email': user.email}})
    return Response({'error': 'Credenciales incorrectas.'}, status=401)


@api_view(['POST'])
def register_view(request):
    username = request.data.get('username', '')
    email    = request.data.get('email', '')
    password = request.data.get('password', '')
    if not username or not email or not password:
        return Response({'error': 'Todos los campos son requeridos.'}, status=400)
    if len(password) < 6:
        return Response({'error': 'La contrasena debe tener al menos 6 caracteres.'}, status=400)
    if '@' not in email:
        return Response({'error': 'Correo electronico no valido.'}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'El nombre de usuario ya existe.'}, status=400)
    if User.objects.filter(email=email).exists():
        return Response({'error': 'El correo ya esta registrado.'}, status=400)
    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({'message': 'Usuario registrado.', 'user_id': user.id}, status=201)


@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Sesion cerrada.'})