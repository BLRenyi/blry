from django.apps import AppConfig


class RegistrationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'regadmin'
    label = 'regadmin' # Explicitly define the app label 