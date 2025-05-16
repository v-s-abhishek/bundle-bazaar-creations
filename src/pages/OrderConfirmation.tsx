
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  
  // If someone navigates directly to this page without completing checkout,
  // redirect them to the cart
  useEffect(() => {
    if (!localStorage.getItem("recent_order")) {
      navigate("/cart");
    }
  }, [navigate]);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="mb-8 flex justify-center">
        <CheckCircle2 className="h-16 w-16 text-bazaar-teal" />
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
      <p className="text-xl mb-8">
        Thank you for your purchase. We've sent a confirmation email with all the details.
      </p>
      
      <div className="bg-background rounded-lg shadow-md border p-6 mb-8 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Order Information</h2>
        <p className="mb-2"><span className="font-medium">Order ID:</span> {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
        <p><span className="font-medium">Order Date:</span> {new Date().toLocaleDateString()}</p>
      </div>
      
      <div className="space-x-4">
        <Button asChild className="bg-gradient-to-r from-bazaar-teal to-bazaar-purple hover:opacity-90">
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
