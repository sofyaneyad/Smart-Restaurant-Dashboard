import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Crown, 
  Phone, 
  Mail, 
  Heart, 
  Plus
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useRestaurant } from '../context/RestaurantContext';

export function Customers() {
  const { customers, addCustomer } = useRestaurant();
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('الكل');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFavorite, setNewFavorite] = useState('برجر أنجوس بالكمأة');

  const filteredCustomers = customers.filter((c) => {
    const matchesTier = 
      tierFilter === 'الكل' || 
      (tierFilter === 'VIP' && c.status === 'VIP') ||
      (tierFilter === 'منتظم' && c.status === 'Regular') ||
      (tierFilter === 'جديد' && c.status === 'New');
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    return matchesTier && matchesSearch;
  });

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newCust = {
      id: `CUST-${Math.floor(107 + Math.random() * 50)}`,
      name: newName,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: newPhone || '+962 79 000 0000',
      totalOrders: 1,
      totalSpent: 45.0,
      favoriteDish: newFavorite,
      lastOrder: 'اليوم',
      status: 'New'
    };

    addCustomer(newCust); // Saved to localStorage!

    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            قاعدة بيانات الضيوف والولاء
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            متابعة إنفاق العملاء، تصنيفات الولاء، وسجل الزيارات السابقة.
          </p>
        </div>
        <Button variant="default" onClick={() => setIsAddOpen(true)} className="gap-2 font-bold text-xs">
          <Plus className="h-4 w-4" />
          <span>إضافة عميل جديد</span>
        </Button>
      </div>

      {/* Guest Loyalty Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-2xs">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-400 font-bold">إجمالي الضيوف المسجلين</p>
              <p className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100">{customers.length * 42}</p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                +18 ضيف جديد هذا الأسبوع
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-2xs">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-400 font-bold">أعضاء فئة كبار الضيوف (VIP)</p>
              <p className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {customers.filter(c => c.status === 'VIP').length * 15}
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                متوسط الفاتورة $58 للزيارة
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-2xs">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-400 font-bold">نسبة ولاء الضيوف</p>
              <p className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100">76.4%</p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                مؤشر رضا وتكرار زيارات عالي
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="shadow-2xs">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="ابحث بالاسم، البريد، أو الهاتف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white py-2 pr-10 pl-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 font-medium"
              />
            </div>

            <div className="flex gap-1.5 p-1 bg-zinc-100 dark:bg-[#161924] rounded-xl border border-zinc-200/50 dark:border-zinc-800">
              {['الكل', 'VIP', 'منتظم', 'جديد'].map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setTierFilter(tier)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    tierFilter === tier
                      ? 'bg-white text-zinc-950 shadow-2xs dark:bg-[#202534] dark:text-white'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="shadow-2xs">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-zinc-50/80 border-b border-zinc-200 text-xs text-zinc-400 dark:bg-[#0c0f17] dark:border-[#1e2433]">
                <tr>
                  <th className="px-6 py-4 font-bold">العميل</th>
                  <th className="px-6 py-4 font-bold">بيانات الاتصال</th>
                  <th className="px-6 py-4 font-bold">عدد الزيارات</th>
                  <th className="px-6 py-4 font-bold">إجمالي الإنفاق</th>
                  <th className="px-6 py-4 font-bold">الطبق المفضل</th>
                  <th className="px-6 py-4 font-bold">فئة الولاء</th>
                  <th className="px-6 py-4 font-bold text-left">الملف التعريفي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-[#1e2433]">
                {filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-zinc-50/80 dark:hover:bg-[#181d2a] transition-all duration-150 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 flex items-center justify-center font-bold text-xs">
                          {cust.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{cust.name}</p>
                          <p className="text-xs text-zinc-400 font-mono">{cust.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-600 dark:text-zinc-400 space-y-0.5">
                      <div className="flex items-center gap-1.5 font-mono">
                        <Mail className="h-3.5 w-3.5 text-zinc-400" />
                        <span>{cust.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono">
                        <Phone className="h-3.5 w-3.5 text-zinc-400" />
                        <span>{cust.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-zinc-800 dark:text-zinc-200">
                      {cust.totalOrders} زيارات
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      ${cust.totalSpent.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
                        {cust.favoriteDish}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={cust.status === 'VIP' ? 'warning' : cust.status === 'Regular' ? 'info' : 'default'}>
                        {cust.status === 'VIP' && <Crown className="h-3 w-3 inline ml-1 text-amber-500" />}
                        {cust.status === 'VIP' ? 'VIP' : cust.status === 'Regular' ? 'منتظم' : 'جديد'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-left">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedCustomer(cust)}
                        className="text-xs py-1 font-bold"
                      >
                        عرض البطاقة
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Card Modal */}
      <Modal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        title={selectedCustomer ? `بطاقة الضيف: ${selectedCustomer.name}` : ''}
        description="الملف التعريفي للضيف ومؤشرات الإنفاق التراكمي وسجل التفضيلات."
      >
        {selectedCustomer && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-800">
              <div className="h-12 w-12 rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 flex items-center justify-center font-bold text-base shadow-xs">
                {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  {selectedCustomer.name}
                  <Badge variant={selectedCustomer.status === 'VIP' ? 'warning' : 'info'}>
                    {selectedCustomer.status === 'VIP' ? 'VIP' : selectedCustomer.status === 'Regular' ? 'منتظم' : 'جديد'}
                  </Badge>
                </h4>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">{selectedCustomer.email} • {selectedCustomer.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <p className="text-xs text-zinc-400 font-bold">القيمة المالية التراكمية</p>
                <p className="text-xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">${selectedCustomer.totalSpent.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <p className="text-xs text-zinc-400 font-bold">إجمالي الزيارات</p>
                <p className="text-xl font-mono font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">{selectedCustomer.totalOrders} مرات</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#161924] border border-zinc-200/70 dark:border-zinc-800 text-xs leading-relaxed">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                ملاحظات وتفضيل الضيف في المطعم: 
              </span>
              <span className="text-zinc-600 dark:text-zinc-400 mr-1 font-medium">
                يفضل دائماً طلب {selectedCustomer.favoriteDish}. ويفضل دائماً الجلسات الخارجية المطلة على التراس.
              </span>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
                إغلاق
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Customer Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="إضافة ضيف جديد"
        description="تسجيل ضيف جديد في سجل الضيوف وبرنامج الولاء الخاص بالمطعم."
      >
        <form onSubmit={handleAddCustomer} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              الاسم الكامل
            </label>
            <Input
              type="text"
              placeholder="مثال: طارق النابلسي"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                البريد الإلكتروني
              </label>
              <Input
                type="email"
                placeholder="tareq@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                رقم الهاتف
              </label>
              <Input
                type="text"
                placeholder="+962 79 123 4567"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              الطبق المفضل
            </label>
            <Input
              type="text"
              placeholder="مثال: برجر أنجوس بالكمأة"
              value={newFavorite}
              onChange={(e) => setNewFavorite(e.target.value)}
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => setIsAddOpen(false)}>
              إلغاء
            </Button>
            <Button variant="default" type="submit">
              حفظ بيانات العميل
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
