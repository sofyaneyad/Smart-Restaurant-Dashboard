import React, { useState } from 'react';
import { 
  Store, 
  DollarSign, 
  BellRing, 
  Save, 
  Check
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useRestaurant } from '../context/RestaurantContext';
import { motion, AnimatePresence } from 'framer-motion';

export function Settings() {
  const { settings, updateSettings } = useRestaurant();
  const [formData, setFormData] = useState(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          إعدادات المنشأة والعمليات
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          تهيئة هوية المطعم، تنبيهات المطبخ، والسياسات المالية والتشغيلية.
        </p>
      </div>

      <AnimatePresence>
        {savedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300"
          >
            <Check className="h-4 w-4" />
            <span>تم حفظ وتحديث إعدادات المطعم بنجاح!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card 1: Restaurant Info */}
        <Card className="shadow-2xs">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <Store className="h-4 w-4 text-zinc-500" />
              البيانات التجارية العامة
            </CardTitle>
            <CardDescription className="text-xs">
              البيانات المطبوعة على فواتير الزبائن وقائمة الطعام الرقمية
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  اسم المطعم / المنشأة
                </label>
                <Input
                  value={formData.restaurantName}
                  onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  الشعار التسويقي
                </label>
                <Input
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  البريد الإلكتروني للفرع
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  رقم الهاتف المباشر
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                العنوان الجغرافي للمطعم
              </label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Financial & Operational Settings */}
        <Card className="shadow-2xs">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <DollarSign className="h-4 w-4 text-zinc-500" />
              المعايير المالية والتشغيلية
            </CardTitle>
            <CardDescription className="text-xs">
              أسعار الخدمات، ضريبة القيمة المضافة، ورسوم التوصيل
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  عملة النظام
                </label>
                <Input
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  نسبة ضريبة المبيعات (%)
                </label>
                <Input
                  type="number"
                  value={formData.taxRate}
                  onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  رسوم التوصيل الموحدة ($)
                </label>
                <Input
                  type="number"
                  step="0.5"
                  value={formData.deliveryFee}
                  onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                جدول ساعات العمل
              </label>
              <Input
                value={formData.openingHours}
                onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Kitchen & Notification Automations */}
        <Card className="shadow-2xs">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <BellRing className="h-4 w-4 text-zinc-500" />
              أتمتة خط المطبخ والشاشات
            </CardTitle>
            <CardDescription className="text-xs">
              إعدادات الاتصال بشاشات المطبخ التفاعلية والرنين الصوتي المباشر
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">التنبيه الصوتي للطلبات</p>
                <p className="text-xs text-zinc-400">تشغيل رنين صوتي واضح عند وصول تذكرة طلب جديدة للمطبخ</p>
              </div>
              <input
                type="checkbox"
                checked={formData.soundNotifications}
                onChange={(e) => setFormData({ ...formData, soundNotifications: e.target.checked })}
                className="h-4 w-4 accent-zinc-900 dark:accent-zinc-100 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">الموافقة التلقائية على الطلبات</p>
                <p className="text-xs text-zinc-400">إرسال تذاكر الطلبات مباشرة لشاشات الطهاة دون انتظار</p>
              </div>
              <input
                type="checkbox"
                checked={formData.autoAcceptOrders}
                onChange={(e) => setFormData({ ...formData, autoAcceptOrders: e.target.checked })}
                className="h-4 w-4 accent-zinc-900 dark:accent-zinc-100 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">شاشات تحضير المطبخ (KDS)</p>
                <p className="text-xs text-zinc-400">توجيه التذاكر تلقائياً إلى محطات الطهي والإعداد الرقمية</p>
              </div>
              <input
                type="checkbox"
                checked={formData.kitchenPrinting}
                onChange={(e) => setFormData({ ...formData, kitchenPrinting: e.target.checked })}
                className="h-4 w-4 accent-zinc-900 dark:accent-zinc-100 rounded cursor-pointer"
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end border-t border-zinc-100 dark:border-zinc-800 pt-4">
            <Button type="submit" variant="default" className="gap-2 font-bold text-xs">
              <Save className="h-4 w-4" />
              <span>حفظ الإعدادات والتغييرات</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
