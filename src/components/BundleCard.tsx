
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bundle, calculateBundleOriginalPrice, calculateBundlePrice, calculateBundleSavings } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BundleCardProps {
  bundle: Bundle;
}

const BundleCard = ({ bundle }: BundleCardProps) => {
  const { addToCart } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  const originalPrice = calculateBundleOriginalPrice(bundle);
  const discountedPrice = calculateBundlePrice(bundle);
  const savings = calculateBundleSavings(bundle);

  const handleAddToCart = () => {
    addToCart(bundle, "bundle");
  };

  return (
    <Card className="bundle-card overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={bundle.image} 
          alt={bundle.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-bazaar-coral text-white">
            Save {bundle.discount}%
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl">{bundle.name}</CardTitle>
        <CardDescription className="line-clamp-2">{bundle.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex flex-wrap gap-1 mb-4">
          {bundle.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="product-tag">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="mt-2">
          <div className="font-semibold text-lg">${discountedPrice.toFixed(2)}</div>
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="line-through">${originalPrice.toFixed(2)}</span>
            <span className="ml-2 text-bazaar-coral">Save ${savings.toFixed(2)}</span>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2 w-full flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span>View Products</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{bundle.name}</DialogTitle>
              <DialogDescription>This bundle contains the following products:</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              {bundle.products.map((product) => (
                <div key={product.id} className="flex gap-3">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-bazaar-teal to-bazaar-purple hover:opacity-90 transition-opacity"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BundleCard;
