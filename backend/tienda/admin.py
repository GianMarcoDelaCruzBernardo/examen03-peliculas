from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Genero, Pelicula, Pedido


@admin.register(Genero)
class GeneroAdmin(ModelAdmin):
    list_display = (
        'id',
        'nombre',
        'descripcion',
    )

    list_display_links = (
        'id',
        'nombre',
    )

    search_fields = (
        'nombre',
    )

@admin.register(Pelicula)
class PeliculaAdmin(ModelAdmin):
    list_display = (
        'id',
        'titulo',
        'director',
        'anio',
        'genero',
        'fecha_creacion'
    )

    list_display_links = (
        'id',
        'titulo',
    )

    list_filter = ('genero',)
    search_fields = ('titulo', 'director')


@admin.register(Pedido)
class PedidoAdmin(ModelAdmin):
    list_display        = ('id', 'nombre_cliente', 'email_cliente', 'pelicula', 'cantidad', 'total', 'estado', 'fecha')
    list_filter         = ('estado',)
    search_fields       = ('nombre_cliente', 'email_cliente')
    readonly_fields     = ('fecha',)
    list_editable       = ('estado',)
