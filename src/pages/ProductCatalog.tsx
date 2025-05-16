
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import BundleCard from "@/components/BundleCard";
import { products, bundles, Product, Bundle } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filteredBundles, setFilteredBundles] = useState<Bundle[]>([]);
  const [sortOption, setSortOption] = useState("name-asc");

  // Extract unique categories and tags
  const categories = [...new Set(products.map(p => p.category))];
  const allTags = [...new Set(products.flatMap(p => p.tags))];

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term) || 
        p.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(p => 
        selectedTags.some(tag => p.tags.includes(tag))
      );
    }
    
    // Sort
    switch(sortOption) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedTags, sortOption]);

  // Filter and sort bundles
  useEffect(() => {
    let filtered = [...bundles];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(b => 
        b.name.toLowerCase().includes(term) || 
        b.description.toLowerCase().includes(term) || 
        b.tags.some(tag => tag.toLowerCase().includes(term)) ||
        b.products.some(p => p.name.toLowerCase().includes(term))
      );
    }
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(b => 
        selectedTags.some(tag => b.tags.includes(tag))
      );
    }
    
    setFilteredBundles(filtered);
  }, [searchTerm, selectedTags]);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedTags([]);
    setSortOption("name-asc");
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Product Catalog</h1>
        <p className="text-gray-600 mt-2">Browse our products and bundles</p>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={sortOption}
              onValueChange={setSortOption}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
        
        {/* Tags filter */}
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Filter by Tags:</p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedTags.includes(tag) 
                    ? "bg-primary hover:bg-primary/80" 
                    : "hover:bg-muted/50"
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
                {selectedTags.includes(tag) && (
                  <X className="ml-1 h-3 w-3" />
                )}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Applied filters */}
        {(selectedCategory || selectedTags.length > 0 || searchTerm) && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Filters:</span>
            {selectedCategory && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Category: {selectedCategory}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedCategory("")} 
                />
              </Badge>
            )}
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: {searchTerm}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSearchTerm("")} 
                />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Product and Bundle Tabs */}
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="products">Individual Products</TabsTrigger>
          <TabsTrigger value="bundles">Bundles & Collections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="animate-fade-in">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No products match your filters</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear all filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="bundles" className="animate-fade-in">
          {filteredBundles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredBundles.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No bundles match your filters</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear all filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductCatalog;
