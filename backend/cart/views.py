from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from products.models import Product
from .models import Cart, CartItem
from .serializers import CartSerializer

class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_cart(self, user):
        cart, _ = Cart.objects.get_or_create(user=user)
        return cart

    def get(self, request):
        cart = self.get_cart(request.user)
        return Response(CartSerializer(cart, context={"request": request}).data)

class CartItemCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        product_id = request.data.get("product")
        quantity = int(request.data.get("quantity", 1))

        if quantity < 1:
            return Response({"detail": "Quantity must be at least 1."}, status=400)

        product = get_object_or_404(Product, id=product_id, is_active=True)
        if quantity > product.stock:
            return Response({"detail": "Not enough stock."}, status=400)

        cart, _ = Cart.objects.get_or_create(user=request.user)
        item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        new_quantity = quantity if created else item.quantity + quantity

        if new_quantity > product.stock:
            return Response({"detail": "Not enough stock."}, status=400)

        item.quantity = new_quantity
        item.save()
        return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)

class CartItemUpdateView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = None

    def patch(self, request, pk):
        item = get_object_or_404(CartItem, pk=pk, cart__user=request.user)
        quantity = int(request.data.get("quantity", item.quantity))
        if quantity < 1:
            item.delete()
            return Response(status=204)
        if quantity > item.product.stock:
            return Response({"detail": "Not enough stock."}, status=400)
        item.quantity = quantity
        item.save()
        return Response(CartSerializer(item.cart).data)

class CartItemDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = CartItem.objects.all()

    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)
