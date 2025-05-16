
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BundleCard from "@/components/BundleCard";
import { bundles } from "@/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home = () => {
  const featuredBundles = bundles.filter(bundle => bundle.featured);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-purple-50 via-white to-teal-50">
        <div className="container mx-auto max-w-6xl flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 text-center md:text-left md:pr-10 mt-10 md:mt-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Discover Custom-Curated 
              <span className="bg-gradient-to-r from-bazaar-teal via-bazaar-purple to-bazaar-coral bg-clip-text text-transparent"> Product Bundles</span>
            </h1>
            <p className="text-lg text-gray-600">
              Bundle Bazaar offers personalized product bundles based on your preferences, with increasing discounts the more you bundle!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-bazaar-teal to-bazaar-purple hover:opacity-90 transition-opacity"
              >
                <Link to="/bundles/build">Build Your Bundle</Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg"
              >
                <Link to="/catalog">Browse Products</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Curated product bundles" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Bundles */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Featured Bundles</h2>
            <p className="text-gray-600 mt-2">Discover our most popular curated collections</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBundles.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link to="/catalog">Browse All Bundles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How Bundle Bazaar Works</h2>
            <p className="text-gray-600 mt-2">Build your perfect bundle in three easy steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 text-bazaar-purple rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Pick Products</h3>
              <p className="text-gray-600">Browse our catalog or use the bundle builder to select products you love.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-teal-100 text-bazaar-teal rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Create a Bundle</h3>
              <p className="text-gray-600">Combine items that go well together — the more you add, the more you save!</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-red-100 text-bazaar-coral rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Enjoy & Save</h3>
              <p className="text-gray-600">Get automatic discounts on every bundle and discover new product combinations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Explore Bundle Categories</h2>
            <p className="text-gray-600 mt-2">Find the perfect bundle for every occasion</p>
          </div>

          <Tabs defaultValue="gift" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="gift">Gift Bundles</TabsTrigger>
              <TabsTrigger value="theme">Themed Collections</TabsTrigger>
              <TabsTrigger value="popular">Popular Picks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gift" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative h-64 rounded-lg overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Birthday Gifts" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">Birthday Gifts</h3>
                    <Button variant="outline" size="sm" className="mt-2 bg-white/20 text-white border-white/30 hover:bg-white/30">
                      Explore
                    </Button>
                  </div>
                </div>
                
                <div className="relative h-64 rounded-lg overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1512909006721-3d6018887383?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Self Care" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">Self Care</h3>
                    <Button variant="outline" size="sm" className="mt-2 bg-white/20 text-white border-white/30 hover:bg-white/30">
                      Explore
                    </Button>
                  </div>
                </div>
                
                <div className="relative h-64 rounded-lg overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1602532305019-3dbbd482dae9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Corporate Gifts" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">Corporate Gifts</h3>
                    <Button variant="outline" size="sm" className="mt-2 bg-white/20 text-white border-white/30 hover:bg-white/30">
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="theme" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative h-64 rounded-lg overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Coffee Lover" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">Coffee Lover</h3>
                    <Button variant="outline" size="sm" className="mt-2 bg-white/20 text-white border-white/30 hover:bg-white/30">
                      Explore
                    </Button>
                  </div>
                </div>
                
                <div className="relative h-64 rounded-lg overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Eco Friendly" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">Eco Friendly</h3>
                    <Button variant="outline" size="sm" className="mt-2 bg-white/20 text-white border-white/30 hover:bg-white/30">
                      Explore
                    </Button>
                  </div>
                </div>
                
                <div className="relative h-64 rounded-lg overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Tech Enthusiast" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">Tech Enthusiast</h3>
                    <Button variant="outline" size="sm" className="mt-2 bg-white/20 text-white border-white/30 hover:bg-white/30">
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative h-64 rounded-lg overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1544164559-2e64cdefc7c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Morning Starter" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">Morning Starter</h3>
                    <Button variant="outline" size="sm" className="mt-2 bg-white/20 text-white border-white/30 hover:bg-white/30">
                      Explore
                    </Button>
                  </div>
                </div>
                
                <div className="relative h-64 rounded-lg overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Relaxation Kit" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">Relaxation Kit</h3>
                    <Button variant="outline" size="sm" className="mt-2 bg-white/20 text-white border-white/30 hover:bg-white/30">
                      Explore
                    </Button>
                  </div>
                </div>
                
                <div className="relative h-64 rounded-lg overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1586985564259-6211deb4c122?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Work From Home" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">Work From Home</h3>
                    <Button variant="outline" size="sm" className="mt-2 bg-white/20 text-white border-white/30 hover:bg-white/30">
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-bazaar-teal/10 to-bazaar-purple/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to create your own bundle?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the joy of personalization and savings by creating your own custom bundle today.
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-gradient-to-r from-bazaar-teal to-bazaar-purple hover:opacity-90 transition-opacity"
          >
            <Link to="/bundles/build">Start Building</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
