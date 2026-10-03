from django.db import transaction
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from cart.models import Cart
from .models import Order, OrderItem
from .serializers import OrderSerializer

class OrderListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).prefetch_related("items__product")
        return Response(OrderSerializer(orders, many=True).data)

    @transaction.atomic
    def post(self, request):
        shipping_address = request.data.get("shipping_address", "").strip()
        if not shipping_address:
            return Response({"detail": "Shipping address is required."}, status=400)

        cart, _ = Cart.objects.get_or_create(user=request.user)
        items = list(cart.items.select_related("product"))

        if not items:
            return Response({"detail": "Your cart is empty."}, status=400)

        for item in items:
            if item.quantity > item.product.stock:
                return Response({"detail": f"Insufficient stock for {item.product.name}."}, status=400)

        total = sum(item.product.price * item.quantity for item in items)
        order = Order.objects.create(
            user=request.user,
            total_amount=total,
            shipping_address=shipping_address,
        )

        for item in items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price,
            )
            item.product.stock -= item.quantity
            item.product.save(update_fields=["stock"])

        cart.items.all().delete()
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
