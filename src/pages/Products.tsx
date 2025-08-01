import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string | null;
  image_url: string | null;
  specifications: any;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedBrand, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedBrand !== "all") {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const uniqueBrands = [...new Set(products.map(p => p.brand))];
  const uniqueCategories = [...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Solar Products
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our comprehensive range of premium solar products from leading manufacturers
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-4 justify-center">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedBrand === "all" ? "default" : "outline"}
                onClick={() => setSelectedBrand("all")}
                size="sm"
              >
                All Brands
              </Button>
              {uniqueBrands.map(brand => (
                <Button
                  key={brand}
                  variant={selectedBrand === brand ? "default" : "outline"}
                  onClick={() => setSelectedBrand(brand)}
                  size="sm"
                >
                  {brand}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                size="sm"
              >
                All Categories
              </Button>
              {uniqueCategories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{product.brand}</Badge>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                  {product.description && (
                    <CardDescription className="line-clamp-2">
                      {product.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{product.name}</DialogTitle>
                        <DialogDescription>
                          {product.brand} - {product.category}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        {product.image_url && (
                          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        {product.description && (
                          <div>
                            <h4 className="font-semibold mb-2">Description</h4>
                            <p className="text-muted-foreground">{product.description}</p>
                          </div>
                        )}
                        {product.specifications && (
                          <div>
                            <h4 className="font-semibold mb-2">Specifications</h4>
                            <div className="bg-muted p-4 rounded-lg">
                              <pre className="text-sm whitespace-pre-wrap">
                                {JSON.stringify(product.specifications, null, 2)}
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No products found with the selected filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;