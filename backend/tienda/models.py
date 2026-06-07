# -*- coding: utf-8 -*-
import cloudinary
from django.db import models
from cloudinary.models import CloudinaryField


class Genero(models.Model):
    nombre      = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name        = 'Genero'
        verbose_name_plural = 'Generos'
        ordering            = ['nombre']

    def __str__(self):
        return self.nombre


class Pelicula(models.Model):
    titulo         = models.CharField(max_length=200)
    director       = models.CharField(max_length=150)
    anio           = models.PositiveIntegerField()
    imagen         = CloudinaryField('imagen', folder='peliculas', blank=True, null=True)  # ← CAMBIO
    genero         = models.ForeignKey(
                         Genero,
                         on_delete=models.SET_NULL,
                         null=True, blank=True,
                         related_name='peliculas'
                     )
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name        = 'Pelicula'
        verbose_name_plural = 'Peliculas'
        ordering            = ['-anio']

    def __str__(self):
        return self.titulo


class Pedido(models.Model):
    ESTADO_CHOICES = [
        ('pendiente',  'Pendiente'),
        ('confirmado', 'Confirmado'),
        ('cancelado',  'Cancelado'),
    ]

    nombre_cliente = models.CharField(max_length=200)
    email_cliente  = models.EmailField()
    pelicula       = models.ForeignKey(
                         Pelicula,
                         on_delete=models.CASCADE,
                         related_name='pedidos'
                     )
    cantidad       = models.PositiveIntegerField(default=1)
    total          = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    estado         = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    fecha          = models.DateTimeField(auto_now_add=True)
    notas          = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name        = 'Pedido'
        verbose_name_plural = 'Pedidos'
        ordering            = ['-fecha']

    def __str__(self):
        return f'Pedido #{self.id} - {self.nombre_cliente} ({self.pelicula.titulo})'