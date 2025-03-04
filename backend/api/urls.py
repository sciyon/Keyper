from django.urls import path
from . import views

urlpatterns = [
    path("password/", views.PasswordListCreate.as_view(), name="password-list"),
    path("password/delete/<int:pk>/", views.PasswordDelete.as_view(), name="password-delete"),
]