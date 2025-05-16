
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  image: string;
  stock: number;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  products: Product[];
  discount: number; // percentage discount
  tags: string[];
  image: string;
  featured: boolean;
  type: 'themed' | 'custom' | 'ai-suggested';
}

// Mock product data
export const products: Product[] = [
  {
    id: "p1",
    name: "Premium Coffee Mug",
    description: "A high-quality ceramic coffee mug perfect for your daily brew.",
    price: 14.99,
    category: "Kitchen",
    tags: ["coffee", "kitchen", "gift"],
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    stock: 50
  },
  {
    id: "p2",
    name: "Organic Coffee Beans",
    description: "Freshly roasted organic coffee beans from sustainable farms.",
    price: 12.99,
    category: "Food",
    tags: ["coffee", "food", "organic", "eco"],
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    stock: 30
  },
  {
    id: "p3",
    name: "Coffee Grinder",
    description: "Manual coffee grinder with adjustable settings for the perfect grind.",
    price: 24.99,
    category: "Kitchen",
    tags: ["coffee", "kitchen", "tool"],
    image: "https://images.unsplash.com/photo-1570173548275-c641fa7941db?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    stock: 15
  },
  {
    id: "p4",
    name: "Leather Journal",
    description: "Handcrafted leather journal with premium paper for writing and sketching.",
    price: 19.99,
    category: "Stationery",
    tags: ["office", "gift", "stationery"],
    image: "https://images.unsplash.com/photo-1550950573-14cfe8efe7c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    stock: 25
  },
  {
    id: "p5",
    name: "Artisanal Chocolate Bar",
    description: "Premium dark chocolate bar made with organic cacao beans.",
    price: 7.99,
    category: "Food",
    tags: ["food", "sweet", "gift"],
    image: "https://images.unsplash.com/photo-1549007953-2f2dc0b24019?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    stock: 40
  },
  {
    id: "p6",
    name: "Scented Candle",
    description: "Hand-poured soy wax candle with natural essential oils.",
    price: 16.99,
    category: "Home",
    tags: ["home", "gift", "decor"],
    image: "https://images.unsplash.com/photo-1608181831718-c129ef35d646?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    stock: 35
  },
  {
    id: "p7",
    name: "Eco-friendly Water Bottle",
    description: "Stainless steel reusable water bottle that keeps drinks cold for 24 hours.",
    price: 22.99,
    category: "Accessories",
    tags: ["eco", "outdoor", "fitness"],
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    stock: 45
  },
  {
    id: "p8",
    name: "Bluetooth Speaker",
    description: "Compact wireless speaker with rich sound and long battery life.",
    price: 39.99,
    category: "Electronics",
    tags: ["tech", "audio", "gift"],
    image: "https://images.unsplash.com/photo-1589003358621-c088c9d9d8d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    stock: 20
  }
];

// Mock bundle data
export const bundles: Bundle[] = [
  {
    id: "b1",
    name: "Coffee Lover's Kit",
    description: "Everything a coffee enthusiast needs for the perfect brew.",
    products: [products[0], products[1], products[2]],
    discount: 15,
    tags: ["coffee", "gift", "kitchen"],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    featured: true,
    type: 'themed'
  },
  {
    id: "b2",
    name: "Self-Care Package",
    description: "Perfect bundle for relaxation and personal time.",
    products: [products[3], products[5], products[6]],
    discount: 10,
    tags: ["gift", "wellness", "home"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    featured: true,
    type: 'themed'
  },
  {
    id: "b3",
    name: "Tech & Treats",
    description: "The perfect combination of technology and tasty treats.",
    products: [products[7], products[4]],
    discount: 8,
    tags: ["tech", "food", "gift"],
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    featured: false,
    type: 'themed'
  }
];

// Calculate total price of products in a bundle (before discount)
export const calculateBundleOriginalPrice = (bundle: Bundle): number => {
  return bundle.products.reduce((sum, product) => sum + product.price, 0);
};

// Calculate discounted price for a bundle
export const calculateBundlePrice = (bundle: Bundle): number => {
  const originalPrice = calculateBundleOriginalPrice(bundle);
  return originalPrice * (1 - bundle.discount / 100);
};

// Calculate savings
export const calculateBundleSavings = (bundle: Bundle): number => {
  const originalPrice = calculateBundleOriginalPrice(bundle);
  const discountedPrice = calculateBundlePrice(bundle);
  return originalPrice - discountedPrice;
};
