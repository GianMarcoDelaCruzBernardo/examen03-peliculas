from rest_framework import serializers
from .models import Genero, Pelicula, Pedido
from django.conf import settings


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
            cloud_name = settings.CLOUDINARY_STORAGE['CLOUD_NAME']
            public_id  = str(obj.imagen)
            if '.' in public_id.split('/')[-1]:
                return f'https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}'
            return f'https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}.jpg'
        return None


class PedidoSerializer(serializers.ModelSerializer):
    pelicula_titulo = serializers.CharField(source='pelicula.titulo', read_only=True)

    class Meta:
        model  = Pedido
        fields = ['id', 'nombre_cliente', 'email_cliente', 'pelicula',
                  'pelicula_titulo', 'cantidad', 'total', 'estado', 'fecha', 'notas']