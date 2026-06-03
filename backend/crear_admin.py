import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

username = 'admin'
email = 'admin@gmail.com'
password = 'admin123'

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print(f"✅ Superusuario {username} creado")
else:
    print(f"ℹ️ El usuario {username} ya existe")
