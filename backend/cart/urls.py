from django.urls import path
from .views import CartView, CartItemCreateView, CartItemUpdateView, CartItemDeleteView

urlpatterns = [
    path("", CartView.as_view()),
    path("items/", CartItemCreateView.as_view()),
    path("items/<int:pk>/", CartItemUpdateView.as_view()),
    path("items/<int:pk>/delete/", CartItemDeleteView.as_view()),
]
