
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Product, Bundle, calculateBundlePrice } from "@/data/products";
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Group by item type for display
  const productItems = cartItems.filter(item => item.type === "product");
  const bundleItems = cartItems.filter(item => item.type === "bundle");

  const handleQuantityChange = (id: string, type: "product" | "bundle", action: "increase" | "decrease", currentQty: number) => {
    if (action === "decrease" && currentQty <= 1) {
      return;
    }
    
    const newQuantity = action === "increase" ? currentQty + 1 : currentQty - 1;
    updateQuantity(id, type, newQuantity);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/checkout");
    }, 1000);
  };

  const getItemPrice = (item: Product | Bundle, type: "product" | "bundle") => {
    if (type === "product") {
      return (item as Product).price;
    } else {
      return calculateBundlePrice(item as Bundle);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        {cartItems.length > 0 && (
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
        )}
      </div>
      
      {cartItems.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-16">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild className="bg-gradient-to-r from-bazaar-teal to-bazaar-purple hover:opacity-90 transition-opacity">
              <Link to="/catalog">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Product items */}
            {productItems.length > 0 && (
              <>
                <h2 className="text-xl font-semibold">Products</h2>
                <div className="space-y-4">
                  {productItems.map(({ item, quantity }) => {
                    const product = item as Product;
                    return (
                      <Card key={`product-${product.id}`} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-32 h-32">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow p-4">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{product.name}</h3>
                              <p className="font-semibold">${product.price.toFixed(2)}</p>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              {product.category}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(product.id, "product", "decrease", quantity)}
                                  disabled={quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(product.id, "product", "increase", quantity)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => removeFromCart(product.id, "product")}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}

            {/* Bundle items */}
            {bundleItems.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mt-8">Bundles</h2>
                <div className="space-y-4">
                  {bundleItems.map(({ item, quantity }) => {
                    const bundle = item as Bundle;
                    const bundlePrice = calculateBundlePrice(bundle);
                    return (
                      <Card key={`bundle-${bundle.id}`} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-32 h-32">
                            <img
                              src={bundle.image}
                              alt={bundle.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow p-4">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">{bundle.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {bundle.products.length} products
                                </p>
                              </div>
                              <p className="font-semibold">${bundlePrice.toFixed(2)}</p>
                            </div>
                            <div className="mt-2 text-sm">
                              <p className="text-bazaar-coral">Savings: {bundle.discount}% off</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(bundle.id, "bundle", "decrease", quantity)}
                                  disabled={quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(bundle.id, "bundle", "increase", quantity)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => removeFromCart(bundle.id, "bundle")}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
            <div className="mt-8">
              <Button 
                variant="outline" 
                asChild 
                className="flex items-center"
              >
                <Link to="/catalog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${(cartTotal + cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-bazaar-teal to-bazaar-purple hover:opacity-90 transition-opacity"
                >
                  {isProcessing ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
