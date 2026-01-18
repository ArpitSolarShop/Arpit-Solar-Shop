import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Upload, Eye, EyeOff, Database } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { seedProductData } from "@/utils/seedProductData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: "Reliance" | "Sakti" | "Tata";
  specifications: any;
  image_url?: string;
  logo_url?: string;
  created_at: string;
  is_published: boolean;
  product_type?: string;
  system_configurations?: any;
  pricing_data?: any;
  company_info?: any;
  sort_order: number;
}

type BrandType = "Reliance" | "Sakti" | "Tata";

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "Reliance" as "Reliance" | "Sakti" | "Tata",
    specifications: {},
    image_url: "",
    logo_url: "",
    is_published: true,
    product_type: "",
    system_configurations: {},
    pricing_data: {},
    company_info: {},
    sort_order: 0
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(formData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        toast.success('Product updated successfully');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([formData]);

        if (error) throw error;
        toast.success('Product created successfully');
      }

      setDialogOpen(false);
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        category: "",
        brand: "Reliance" as BrandType,
        specifications: {},
        image_url: "",
        logo_url: "",
        is_published: true,
        product_type: "",
        system_configurations: {},
        pricing_data: {},
        company_info: {},
        sort_order: 0
      });
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      category: product.category,
      brand: product.brand,
      specifications: product.specifications || {},
      image_url: product.image_url || "",
      logo_url: product.logo_url || "",
      is_published: product.is_published,
      product_type: product.product_type || "",
      system_configurations: product.system_configurations || {},
      pricing_data: product.pricing_data || {},
      company_info: product.company_info || {},
      sort_order: product.sort_order
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const togglePublishStatus = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_published: !product.is_published })
        .eq('id', product.id);

      if (error) throw error;
      toast.success(`Product ${product.is_published ? 'unpublished' : 'published'} successfully`);
      fetchProducts();
    } catch (error) {
      console.error('Error updating publish status:', error);
      toast.error('Failed to update product status');
    }
  };

  const handleSeedData = async () => {
    if (!confirm('This will add sample product data to the database. Continue?')) return;

    setLoading(true);
    try {
      await seedProductData();
      toast.success('Sample data added successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error seeding data:', error);
      toast.error('Failed to add sample data');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image_url' | 'logo_url') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${field === 'logo_url' ? 'logos' : 'images'}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-assets')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, [field]: publicUrl }));
      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    }
  };

  if (loading && products.length === 0) {
    return <div className="flex justify-center p-8">Loading products...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Manager</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSeedData} disabled={loading}>
            <Database className="mr-2 h-4 w-4" />
            Seed Sample Data
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingProduct(null);
                setFormData({
                  name: "",
                  description: "",
                  category: "",
                  brand: "Reliance" as BrandType,
                  specifications: {},
                  image_url: "",
                  logo_url: "",
                  is_published: true,
                  product_type: "",
                  system_configurations: {},
                  pricing_data: {},
                  company_info: {},
                  sort_order: 0
                });
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
              </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Solar Panels">Solar Panels</SelectItem>
                    <SelectItem value="Inverters">Inverters</SelectItem>
                    <SelectItem value="Batteries">Batteries</SelectItem>
                    <SelectItem value="Mounting">Mounting Systems</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="brand">Brand</Label>
                <Select value={formData.brand} onValueChange={(value: BrandType) => setFormData(prev => ({ ...prev, brand: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Reliance">Reliance</SelectItem>
                    <SelectItem value="Shakti Solar">Shakti Solar</SelectItem>
                    <SelectItem value="Tata Power Solar">Tata Power Solar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="product_type">Product Type</Label>
                <Select value={formData.product_type} onValueChange={(value) => setFormData(prev => ({ ...prev, product_type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grid-Tie System">Grid-Tie System</SelectItem>
                    <SelectItem value="Residential System">Residential System</SelectItem>
                    <SelectItem value="Commercial System">Commercial System</SelectItem>
                    <SelectItem value="Individual Product">Individual Product</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                />
                <Label htmlFor="is_published">Published</Label>
              </div>

              <div>
                <Label htmlFor="image_url">Product Image</Label>
                <div className="flex gap-2">
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    placeholder="Image URL"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('image-upload')?.click()}>
                    <Upload className="h-4 w-4" />
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'image_url')}
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="logo_url">Brand Logo</Label>
                <div className="flex gap-2">
                  <Input
                    id="logo_url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))}
                    placeholder="Logo URL"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('logo-upload')?.click()}>
                    <Upload className="h-4 w-4" />
                  </Button>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'logo_url')}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={loading}>
                  {editingProduct ? 'Update' : 'Create'} Product
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {product.name}
                    {!product.is_published && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">DRAFT</span>
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {product.brand} • {product.category}
                    {product.product_type && ` • ${product.product_type}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => togglePublishStatus(product)}
                    title={product.is_published ? 'Unpublish' : 'Publish'}
                  >
                    {product.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {product.image_url && (
                <div className="mb-4">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              )}
              {product.logo_url && (
                <div className="mb-4">
                  <img 
                    src={product.logo_url} 
                    alt={`${product.brand} logo`}
                    className="h-8 object-contain"
                  />
                </div>
              )}
              {product.description && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {product.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found. Add your first product to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ProductManager;