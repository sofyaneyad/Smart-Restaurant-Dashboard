import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Star, 
  LayoutGrid, 
  List
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useRestaurant } from '../context/RestaurantContext';
import { motion, AnimatePresence } from 'framer-motion';

export function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    category: 'Burgers',
    price: '',
    cost: '',
    stock: '',
    image: '',
    description: ''
  });

  const categories = [
    { id: 'الكل', label: 'الكل' },
    { id: 'Burgers', label: 'برجر' },
    { id: 'Pizza', label: 'بيتزا' },
    { id: 'Pasta', label: 'باستا' },
    { id: 'Appetizers', label: 'مقبلات' },
    { id: 'Healthy', label: 'صحي' },
    { id: 'Beverages', label: 'مشروبات' },
    { id: 'Desserts', label: 'حلويات' },
    { id: 'Steaks', label: 'ستيك ومشاوي' }
  ];

  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === 'الكل' || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.nameAr.includes(searchQuery) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      nameAr: '',
      category: 'Burgers',
      price: '',
      cost: '',
      stock: '',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      nameAr: product.nameAr,
      category: product.category,
      price: product.price,
      cost: product.cost,
      stock: product.stock,
      image: product.image,
      description: product.description
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا الطبق من قائمة الطعام؟')) {
      deleteProduct(id);
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.nameAr.trim() || !formData.price) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        price: parseFloat(formData.price),
        cost: parseFloat(formData.cost || 0),
        stock: parseInt(formData.stock || 0)
      });
    } else {
      const newProduct = {
        id: `PRD-${Date.now().toString().slice(-4)}`,
        ...formData,
        name: formData.name || formData.nameAr,
        price: parseFloat(formData.price),
        cost: parseFloat(formData.cost || 0),
        stock: parseInt(formData.stock || 0),
        salesCount: 0,
        rating: 5.0,
        status: parseInt(formData.stock) > 10 ? 'In Stock' : 'Low Stock'
      };
      addProduct(newProduct);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            قائمة الطعام وهندسة الوجبات
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            إدارة الوصفات، أسعار البيع، التكلفة، ومستويات المخزون بدقة متناهية.
          </p>
        </div>
        <Button variant="default" onClick={handleOpenAdd} className="gap-2 font-bold text-xs">
          <Plus className="h-4 w-4" />
          <span>إضافة طبق جديد</span>
        </Button>
      </div>

      {/* Control bar */}
      <Card className="shadow-2xs">
        <CardContent className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="ابحث بالاسم العربي أو الإنجليزي..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white py-2 pr-10 pl-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 font-medium"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-[#161924] rounded-xl border border-zinc-200/50 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-zinc-950 shadow-2xs dark:bg-[#202534] dark:text-white'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400'
                }`}
                title="عرض شبكي"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-zinc-950 shadow-2xs dark:bg-[#202534] dark:text-white'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400'
                }`}
                title="عرض جدول"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-2xs'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 dark:bg-[#161924] dark:text-zinc-400 dark:hover:bg-[#202534]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {filteredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.15 }}
              >
                <Card className="overflow-hidden flex flex-col h-full border-zinc-200/90 dark:border-zinc-800 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                  {/* Image Container */}
                  <div className="relative h-44 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.nameAr}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';
                      }}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <Badge variant={prod.stock > 20 ? 'success' : 'warning'}>
                        {prod.stock} متوفر
                      </Badge>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-zinc-900/80 backdrop-blur-xs text-[11px] font-bold text-white">
                        {prod.category}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 leading-snug">
                          {prod.nameAr}
                        </h3>
                        <div className="flex items-center gap-1 text-xs font-bold text-zinc-600 dark:text-zinc-400 shrink-0 font-mono">
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
                          <span>{prod.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                        {prod.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-400 block font-bold">سعر البيع</span>
                        <span className="text-base font-extrabold font-mono text-zinc-900 dark:text-zinc-100">
                          ${prod.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(prod)}
                          title="تعديل الطبق"
                          className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          title="حذف الطبق"
                          className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* Table View */
        <Card className="shadow-2xs">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-zinc-50/80 border-b border-zinc-200 text-xs text-zinc-400 dark:bg-[#0c0f17] dark:border-[#1e2433]">
                  <tr>
                    <th className="px-6 py-3.5 font-bold">اسم الطبق</th>
                    <th className="px-6 py-3.5 font-bold">التصنيف</th>
                    <th className="px-6 py-3.5 font-bold">سعر البيع</th>
                    <th className="px-6 py-3.5 font-bold">التكلفة</th>
                    <th className="px-6 py-3.5 font-bold">المخزون</th>
                    <th className="px-6 py-3.5 font-bold">المبيعات</th>
                    <th className="px-6 py-3.5 font-bold text-left">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-[#1e2433]">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-zinc-50/80 dark:hover:bg-[#181d2a] transition-all duration-150">
                      <td className="px-6 py-3.5 flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.nameAr}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';
                          }}
                          className="w-10 h-10 rounded-lg object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
                        />
                        <div>
                          <p className="font-bold text-zinc-900 dark:text-zinc-100">{prod.nameAr}</p>
                          <p className="text-xs text-zinc-400 font-mono">{prod.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-xs text-zinc-500 font-semibold">
                        <Badge>{prod.category}</Badge>
                      </td>
                      <td className="px-6 py-3.5 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                        ${prod.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-3.5 font-mono text-xs text-zinc-400">
                        ${prod.cost.toFixed(2)}
                      </td>
                      <td className="px-6 py-3.5">
                        <Badge variant={prod.stock > 20 ? 'success' : 'warning'}>
                          {prod.stock}
                        </Badge>
                      </td>
                      <td className="px-6 py-3.5 font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        {prod.salesCount} وجبة
                      </td>
                      <td className="px-6 py-3.5 text-left">
                        <div className="flex items-center justify-start gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(prod)}
                            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 cursor-pointer"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(prod.id)}
                            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-500 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add / Edit Dish Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'تعديل تفاصيل الطبق' : 'إضافة طبق جديد للقائمة'}
        description="إدخال بيانات الطبق، سعر البيع وهوامش التكلفة والكمية المتوفرة."
      >
        <form onSubmit={handleSaveProduct} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                اسم الطبق (بالعربية)
              </label>
              <Input
                type="text"
                placeholder="مثال: برجر واغيو فاخر بالكمأة"
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                اسم الطبق (بالإنجليزية)
              </label>
              <Input
                type="text"
                placeholder="Wagyu Truffle Burger"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                التصنيف
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 font-medium"
              >
                {categories.filter(c => c.id !== 'الكل').map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                سعر البيع ($)
              </label>
              <Input
                type="number"
                step="0.1"
                placeholder="18.50"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                تكلفة الطعام ($)
              </label>
              <Input
                type="number"
                step="0.1"
                placeholder="7.20"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                الكمية في المخزون
              </label>
              <Input
                type="number"
                placeholder="30"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                رابط صورة الوجبة
              </label>
              <Input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              الوصف والمكونات
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="المكونات الطازجة، مسببات الحساسية، طريقة التحضير..."
              className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 font-medium"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              إلغاء
            </Button>
            <Button variant="default" type="submit">
              {editingProduct ? 'حفظ التعديلات' : 'إضافة الطبق وحفظ'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
