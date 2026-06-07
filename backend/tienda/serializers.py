from rest_framework import serializers
from .models import Genero, Pelicula, Pedido
import cloudinary


class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Genero
        fields = '__all__'


class PeliculaSerializer(serializers.ModelSerializer):
    genero_nombre = serializers.CharField(source='genero.nombre', read_only=True)
    imagen_url    = serializers.SerializerMethodField()

    class Meta:
        model  = Pelicula
        fields = ['id', 'titulo', 'director', 'anio', 'imagen', 'imagen_url',
                  'genero', 'genero_nombre', 'fecha_creacion']

    def get_imagen_url(self, obj):
        if obj.imagen:
            return cloudinary.CloudinaryImage(str(obj.imagen)).build_url()
        return None


class PedidoSerializer(serializers.ModelSerializer):
    pelicula_titulo = serializers.CharField(source='pelicula.titulo', read_only=True)

    class Meta:
        model  = Pedido
        fields = ['id', 'nombre_cliente', 'email_cliente', 'pelicula',
                  'pelicula_titulo', 'cantidad', 'total', 'estado', 'fecha', 'notas']