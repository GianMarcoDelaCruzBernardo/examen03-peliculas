from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GeneroViewSet, PeliculaViewSet, PedidoViewSet
from .views import login_view, register_view, logout_view

router = DefaultRouter()
router.register(r'generos',   GeneroViewSet,   basename='genero')
router.register(r'peliculas', PeliculaViewSet, basename='pelicula')
router.register(r'pedidos',   PedidoViewSet,   basename='pedido')

urlpatterns = [
    path('', include(router.urls)),
    path('login/',    login_view,    name='login'),
    path('register/', register_view, name='register'),
    path('logout/',   logout_view,   name='logout'),
]
