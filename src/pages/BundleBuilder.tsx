
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, X, Plus, Search } from "lucide-react";
import { products, Product, Bundle } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BundleBuilder = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [bundleName, setBundleName] = useState("My Custom Bundle");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { addToCart } = useCart();
  const { toast } = useToast();

  // Categories for filtering
  const categories = [...new Set(products.map((p) => p.category))];

  // Filter products based on search and category
  useEffect(() => {
    let filtered = [...products];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    
    // Don't show products that are already selected
    filtered = filtered.filter(
      (p) => !selectedProducts.some((sp) => sp.id === p.id)
    );
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedProducts]);

  const handleAddProduct = (product: Product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce((sum, product) => sum + product.price, 0);
  };

  const calculateDiscountPercentage = () => {
    const count = selectedProducts.length;
    if (count <= 1) return 0;
    if (count === 2) return 5;
    if (count === 3) return 10;
    if (count === 4) return 15;
    return 20; // Max discount for 5+ items
  };

  const calculateDiscountedPrice = () => {
    const total = calculateTotalPrice();
    const discountPercent = calculateDiscountPercentage();
    return total * (1 - discountPercent / 100);
  };

  const handleAddToCart = () => {
    if (selectedProducts.length < 2) {
      toast({
        title: "Bundle needs more products",
        description: "Add at least 2 products to create a bundle",
        variant: "destructive",
      });
      return;
    }

    const discount = calculateDiscountPercentage();
    const customBundle: Bundle = {
      id: `custom-${Date.now()}`,
      name: bundleName || "Custom Bundle",
      description: `Custom bundle with ${selectedProducts.length} products`,
      products: selectedProducts,
      discount,
      tags: [...new Set(selectedProducts.flatMap((p) => p.tags))],
      image: selectedProducts[0].image,
      featured: false,
      type: "custom",
    };

    addToCart(customBundle, "bundle");
    
    toast({
      title: "Bundle added to cart",
      description: `${customBundle.name} with ${selectedProducts.length} products added to cart`,
    });
    
    // Reset the builder
    setSelectedProducts([]);
    setBundleName("My Custom Bundle");
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Bundle Builder</h1>
        <p className="text-gray-600 mt-2">
          Create your own custom bundle and save more!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Select Products</h2>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-grow">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6 overflow-x-auto flex gap-2 pb-2">
                <Badge
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleCategorySelect(null)}
                >
                  All Categories
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              <Tabs defaultValue="grid" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="grid" className="animate-fade-in">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="cursor-pointer overflow-hidden hover:shadow-md transition-shadow"
                        onClick={() => handleAddProduct(product)}
                      >
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-3">
                          <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                          <p className="text-muted-foreground text-xs">{product.category}</p>
                          <p className="mt-1 font-semibold">${product.price.toFixed(2)}</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-full mt-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddProduct(product);
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="list" className="animate-fade-in">
                  <div className="space-y-2">
                    {filteredProducts.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <div className="flex">
                          <div className="w-24 h-24">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow p-3 flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">{product.name}</h3>
                              <p className="text-muted-foreground text-xs">{product.category}</p>
                              <p className="font-semibold">${product.price.toFixed(2)}</p>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleAddProduct(product)}
                              className="ml-auto h-8"
                            >
                              <Plus className="h-4 w-4 mr-1" /> Add
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No products found matching your search.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bundle preview */}
        <div>
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Your Bundle</h2>
              
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="bundleName">Bundle Name</Label>
                  <Input
                    id="bundleName"
                    value={bundleName}
                    onChange={(e) => setBundleName(e.target.value)}
                    placeholder="Name your bundle"
                  />
                </div>
              </div>
              
              <Separator className="my-4" />

              {selectedProducts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Your bundle is empty.</p>
                  <p>Add products from the left to create your bundle.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="font-medium">
                    {selectedProducts.length} product
                    {selectedProducts.length !== 1 ? "s" : ""} in your bundle
                  </p>
                  
                  {selectedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between bg-accent/50 p-2 rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Value</span>
                      <span>${calculateTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bundle Discount</span>
                      <span className="text-bazaar-coral">
                        -{calculateDiscountPercentage()}%
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Bundle Price</span>
                      <span>${calculateDiscountedPrice().toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 mb-4">
                      {selectedProducts.length < 2
                        ? "Add at least 2 items to create a bundle and unlock discounts."
                        : `You're saving $${(
                            calculateTotalPrice() - calculateDiscountedPrice()
                          ).toFixed(2)}!`}
                    </p>
                    
                    <div className="text-xs text-muted-foreground mb-4">
                      <p className="font-medium">Bundle Discounts:</p>
                      <p>2 products: 5% off</p>
                      <p>3 products: 10% off</p>
                      <p>4 products: 15% off</p>
                      <p>5+ products: 20% off</p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-bazaar-teal to-bazaar-purple hover:opacity-90 transition-opacity"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add Bundle to Cart
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BundleBuilder;
