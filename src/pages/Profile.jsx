import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  LogOut, 
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';

export function Profile() {
  const { currentUser, logout, updateAdminName } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(() => {
    return localStorage.getItem('restaurant_admin_name') || currentUser?.displayName || 'sofyan Eyad';
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    if (currentUser?.displayName) {
      setDisplayName(currentUser.displayName);
    }
  }, [currentUser?.displayName]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (displayName.trim()) {
      await updateAdminName(displayName.trim());
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const permissions = [
    { 
      name: 'إدارة وتوجيه الطلبات الحية', 
      desc: 'قبول، تحضير، تسليم وإلغاء طلبات خط المطبخ والصالة' 
    },
    { 
      name: 'تعديل قائمة الأطباق والأسعار', 
      desc: 'صلاحية كاملة لإضافة الوجبات وضبط هوامش تكلفة الطعام' 
    },
    { 
      name: 'الاطلاع على التقارير والتدفقات المالية', 
      desc: 'الوصول إلى الإيرادات الإجمالية ومقارنة الأهداف الشهرية وتصديرها' 
    },
    { 
      name: 'التحكم بأجهزة وطابعات المطبخ', 
      desc: 'ربط طابعات البونات وأجهزة الرنين الصوتي المباشر' 
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          الملف الشخصي للمدير
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          جلسة مدير المطعم النشطة عبر Firebase، موفر الهوية، والصلاحيات الإدارية المعتمدة.
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
            <span>تم حفظ التعديلات وتحديث اسم المدير بنجاح!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Summary */}
        <Card className="text-center p-6 flex flex-col items-center shadow-2xs">
          <div className="relative">
            <img
              src={currentUser?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=admin`}
              alt="الملف الشخصي"
              className="h-24 w-24 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-800 shadow-sm"
            />
          </div>

          <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-100">
            {currentUser?.displayName || 'المدير العام'}
          </h3>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">{currentUser?.email || 'admin@smartrestaurant.com'}</p>

          <div className="mt-3">
            <Badge variant="default">
              <ShieldCheck className="h-3.5 w-3.5 ml-1" />
              مدير المطعم والشيف التنفيذي
            </Badge>
          </div>

          <div className="mt-6 w-full pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2.5 text-right text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            <div className="flex justify-between">
              <span>طريقة تسجيل الدخول:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200 capitalize font-mono">
                {currentUser?.provider === 'google.com' ? 'Google Auth' : currentUser?.provider || 'Firebase'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>معرف المدير (UID):</span>
              <span className="font-mono text-[11px] truncate max-w-[130px] font-bold">
                {currentUser?.uid || 'firebase_uid'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>حالة الجلسة:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">متصل ونشط</span>
            </div>
          </div>

          <Button
            variant="destructive"
            className="w-full mt-6 gap-2 text-xs font-bold"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>تسجيل الخروج من لوحة التحكم</span>
          </Button>
        </Card>

        {/* Right Column: Account Details & Security */}
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-2xs">
            <CardHeader>
              <CardTitle className="text-base font-bold">المعلومات الشخصية</CardTitle>
              <CardDescription className="text-xs">
                تعديل اسم العرض وتفضيلات الاتصال لمدير المنشأة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    اسم العرض
                  </label>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    البريد الإلكتروني المعتمد (للقراءة فقط)
                  </label>
                  <Input
                    value={currentUser?.email || ''}
                    disabled
                    className="bg-zinc-100 dark:bg-zinc-800/50 cursor-not-allowed font-mono text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" variant="default" size="sm" className="font-bold text-xs">
                    حفظ التغييرات
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Role Permissions */}
          <Card className="shadow-2xs">
            <CardHeader>
              <CardTitle className="text-base font-bold">الصلاحيات الإدارية الممنوحة</CardTitle>
              <CardDescription className="text-xs">
                مستوى التخويل الأمني والتحكم بالنظام الممنوح للمدير
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {permissions.map((perm, idx) => (
                <div key={idx} className="flex items-start justify-between p-3 rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#161924]">
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{perm.name}</p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{perm.desc}</p>
                  </div>
                  <Badge variant="success">ممنوحة</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
