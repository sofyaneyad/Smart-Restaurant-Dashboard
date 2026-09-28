import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Eye, 
  CheckCircle, 
  XCircle, 
  ChefHat, 
  Plus
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useRestaurant } from '../context/RestaurantContext';
import { motion } from 'framer-motion';

export function Orders() {
  const { orders, addOrder, updateOrderStatus, products } = useRestaurant();
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);

  // New order form state
  const [newCustomer, setNewCustomer] = useState('');
  const [newType, setNewType] = useState('صالة (طاولة 01)');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const filterTabs = [
    { key: 'All', label: 'الكل' },
    { key: 'Pending', label: 'قيد الانتظار' },
    { key: 'Preparing', label: 'جاري التحضير' },
    { key: 'Delivered', label: 'تم التسليم' },
    { key: 'Cancelled', label: 'ملغي' }
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'All' || order.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (orderId, newStatus, shouldCloseModal = false) => {
    updateOrderStatus(orderId, newStatus);
    if (shouldCloseModal) {
      setIsDetailsOpen(false);
      setSelectedOrder(null);
    } else if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!newCustomer.trim()) return;

    const prod = products.find((p) => p.id === selectedProductId) || products[0];
    const total = prod.price * Number(selectedQuantity);

    const newOrder = {
      id: `ORD-${Math.floor(7822 + Math.random() * 500)}`,
      customer: newCustomer,
      email: `${newCustomer.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      type: newType,
      items: [{ name: prod.nameAr, quantity: Number(selectedQuantity), price: prod.price }],
      total: total,
      status: 'Pending',
      time: 'الآن',
      date: 'اليوم',
      payment: 'معلق (دفع عند الاستلام)'
    };

    // Saved to localStorage & triggers notification!
    addOrder(newOrder);

    setNewCustomer('');
    setIsNewOrderOpen(false);
  };

  const getBadge = (status) => {
    switch (status) {
      case 'Preparing':
        return <Badge variant="preparing">جاري التحضير</Badge>;
      case 'Pending':
        return <Badge variant="info">قيد الانتظار</Badge>;
      case 'Delivered':
        return <Badge variant="success">تم التسليم</Badge>;
      case 'Cancelled':
        return <Badge variant="danger">ملغي</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            إدارة وتوجيه الطلبات الحية
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            متابعة تذاكر الصالة، السفري، والتوصيل مع التحديث المباشر للعمليات.
          </p>
        </div>
        <Button variant="default" onClick={() => setIsNewOrderOpen(true)} className="gap-2 font-bold text-xs">
          <Plus className="h-4 w-4" />
          <span>إضافة طلب جديد</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="shadow-2xs">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="ابحث برقم الطلب، العميل، أو القناة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white py-2 pr-10 pl-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 font-medium"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-1 p-1 bg-zinc-100 dark:bg-[#161924] rounded-xl w-full md:w-auto border border-zinc-200/50 dark:border-zinc-800">
              {filterTabs.map((tab) => {
                const count = tab.key === 'All' 
                  ? orders.length 
                  : orders.filter((o) => o.status.toLowerCase() === tab.key.toLowerCase()).length;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setStatusFilter(tab.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      statusFilter === tab.key
                        ? 'bg-white text-zinc-950 shadow-2xs dark:bg-[#202534] dark:text-white'
                        : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                      statusFilter === tab.key 
                        ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-200' 
                        : 'bg-zinc-200/70 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="shadow-2xs">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-zinc-50/80 border-b border-zinc-200 text-xs text-zinc-400 dark:bg-[#0c0f17] dark:border-[#1e2433]">
                <tr>
                  <th className="px-6 py-4 font-bold">رقم الطلب</th>
                  <th className="px-6 py-4 font-bold">العميل</th>
                  <th className="px-6 py-4 font-bold">القناة / الطاولة</th>
                  <th className="px-6 py-4 font-bold">الأصناف المطلوبة</th>
                  <th className="px-6 py-4 font-bold">المجموع</th>
                  <th className="px-6 py-4 font-bold">الحالة</th>
                  <th className="px-6 py-4 font-bold text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-[#1e2433]">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-zinc-400 text-sm font-medium">
                      لم يتم العثور على طلبات مطابقة لمعايير البحث.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-zinc-50/80 dark:hover:bg-[#181d2a] transition-all duration-150"
                    >
                      <td className="px-6 py-4 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                        {order.id}
                        <div className="text-[11px] text-zinc-400 font-sans">{order.time}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-zinc-900 dark:text-zinc-100">
                        {order.customer}
                        <div className="text-xs text-zinc-400 font-mono font-normal">{order.email}</div>
                      </td>
                      <td className="px-6 py-4 text-xs text-zinc-600 dark:text-zinc-400">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 font-semibold">
                          {order.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-zinc-700 dark:text-zinc-300 max-w-xs truncate font-medium">
                        {order.items.map((i) => `${i.quantity}x ${i.name}`).join('، ')}
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        {getBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 text-left">
                        <div className="flex items-center justify-start gap-1.5">
                          <button
                            onClick={() => handleOpenDetails(order)}
                            title="عرض تفاصيل الفاتورة"
                            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {order.status === 'Pending' && (
                            <button
                              onClick={() => handleStatusChange(order.id, 'Preparing')}
                              title="بدء التحضير بالمطبخ"
                              className="p-1.5 rounded-lg bg-sky-500/10 text-sky-700 hover:bg-sky-500/20 transition-colors cursor-pointer"
                            >
                              <ChefHat className="h-4 w-4" />
                            </button>
                          )}

                          {order.status === 'Preparing' && (
                            <button
                              onClick={() => handleStatusChange(order.id, 'Delivered')}
                              title="تأكيد تسليم الطلب"
                              className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 transition-colors cursor-pointer"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}

                          {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                            <button
                              onClick={() => handleStatusChange(order.id, 'Cancelled')}
                              title="إلغاء الطلب"
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-700 hover:bg-rose-500/20 transition-colors cursor-pointer"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal: Order Receipt & Details */}
      <Modal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title={selectedOrder ? `تذكرة وفاتورة المطبخ #${selectedOrder.id}` : 'تفاصيل التذكرة'}
        description="تفاصيل الأصناف وطريقة الدفع وحالة التحضير في المطبخ."
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-800">
              <div>
                <p className="text-xs text-zinc-400">العميل</p>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{selectedOrder.customer}</p>
                <p className="text-xs text-zinc-500 font-mono">{selectedOrder.email}</p>
              </div>
              <div className="text-left">
                <p className="text-xs text-zinc-400">الحالة</p>
                <div className="mt-0.5">{getBadge(selectedOrder.status)}</div>
              </div>
            </div>

            {/* Items Breakdown */}
            <div>
              <h4 className="text-xs font-bold uppercase text-zinc-400 mb-2">الأصناف المطلوبة</h4>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 text-sm">
                    <div>
                      <span className="font-bold font-mono text-zinc-900 dark:text-zinc-100">{item.quantity}x</span>{' '}
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="space-y-1.5 pt-2 text-xs border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex justify-between text-zinc-500">
                <span>طريقة الدفع</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{selectedOrder.payment}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>القناة</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{selectedOrder.type}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-zinc-50 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span>المجموع الكلي</span>
                <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400">${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Quick Status Buttons */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsDetailsOpen(false);
                  setSelectedOrder(null);
                }}
              >
                إغلاق
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400"
                  onClick={() => handleStatusChange(selectedOrder.id, 'Preparing', true)}
                >
                  جاري التحضير
                </Button>
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => handleStatusChange(selectedOrder.id, 'Delivered', true)}
                >
                  تأكيد التسليم
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Create New Order */}
      <Modal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        title="إضافة طلب جديد"
        description="تسجيل تذكرة طلب جديدة وتوجيهها مباشرة إلى محطة المطبخ."
      >
        <form onSubmit={handleCreateOrder} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              اسم العميل
            </label>
            <Input
              type="text"
              placeholder="مثال: رامي السعيد"
              value={newCustomer}
              onChange={(e) => setNewCustomer(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                القناة / الطاولة
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 font-medium"
              >
                <option value="صالة (طاولة 01)">صالة (طاولة 01)</option>
                <option value="صالة (طاولة 05)">صالة (طاولة 05)</option>
                <option value="صالة (طاولة 10)">صالة (طاولة 10)</option>
                <option value="سفري (استلام)">سفري (استلام)</option>
                <option value="توصيل منزلي">توصيل منزلي</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                اختيار الطبق
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 font-medium"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nameAr} (${p.price.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              الكمية
            </label>
            <Input
              type="number"
              min="1"
              max="20"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(e.target.value)}
              required
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => setIsNewOrderOpen(false)}>
              إلغاء
            </Button>
            <Button variant="default" type="submit">
              إرسال للمطبخ وحفظ
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
