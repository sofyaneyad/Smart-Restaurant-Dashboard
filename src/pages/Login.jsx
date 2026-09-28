import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  ArrowLeft, 
  AlertCircle, 
  ChefHat, 
  Sun, 
  Moon,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const loginSchema = z.object({
  email: z.string().min(1, 'البريد الإلكتروني مطلوب').email('صيغة البريد الإلكتروني غير صحيحة'),
  password: z.string().min(6, 'كلمة المرور يجب أن تتكون من 6 أحرف على الأقل')
});

export function Login() {
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { loginWithEmail } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'sofyaneyad77@gmail.com', password: '' }
  });

  const onLogin = async (data) => {
    setAuthError('');
    setIsLoading(true);
    try {
      // Strict credentials validation: only sofyaneyad77@gmail.com and sofyan2005 are authorized
      if (data.email.trim().toLowerCase() !== 'sofyaneyad77@gmail.com' || data.password !== 'sofyan2005') {
        throw new Error('بيانات الدخول غير صحيحة. يرجى استخدام بيانات المدير المعتمدة للمنشأة (sofyaneyad77@gmail.com).');
      }

      await loginWithEmail(data.email, data.password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setAuthError(error.message || 'تعذر تسجيل الدخول. يرجى التأكد من البريد وكلمة المرور.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-[#f8f9fc] dark:bg-[#0c0d12] transition-colors overflow-hidden">
      {/* Visual Showcase Side (Desktop 50%) - High-end Restaurant Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-950 overflow-hidden items-end p-12">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=85"
          alt="Restaurant Culinary Interior"
          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

        <div className="relative z-10 space-y-4 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>نظام تشغيل المطاعم السحابي — بوابة المدير</span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight">
            تحكّم كامل في الصالة، المطبخ، والتدفقات المالية
          </h1>

          <p className="text-sm text-zinc-300 leading-relaxed font-normal">
            منظومة سحابية متقدمة تربط بين استلام الطلبات الحية، شاشات الطهاة في المطبخ، وهندسة تكلفة الوجبات بدقة فائقة.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
            <div>
              <p className="text-lg font-bold font-mono text-white">100%</p>
              <p className="text-[11px] text-zinc-400">إدارة سحابية فورية</p>
            </div>
            <div>
              <p className="text-lg font-bold font-mono text-emerald-400">14.2 د</p>
              <p className="text-[11px] text-zinc-400">متوسط زمن التجهيز</p>
            </div>
            <div>
              <p className="text-lg font-bold font-mono text-white">آمن ومشفّر</p>
              <p className="text-[11px] text-zinc-400">Firebase Auth</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Side */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative z-10">
        {/* Top Header Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center font-bold shadow-xs">
              <ChefHat className="h-5 w-5" />
            </div>
            <div>
              <p className="font-extrabold text-sm text-zinc-900 dark:text-white leading-none">GourmetOS</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">لوحة الإدارة الرئيسية</p>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-[#181d2a] transition-colors shadow-2xs cursor-pointer"
            title="تبديل الثيم"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Center Auth Form */}
        <div className="max-w-md w-full mx-auto my-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                تسجيل دخول المدير
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                أهلاً بك، يرجى إدخال بيانات حساب المدير للوصول إلى لوحة التحكم.
              </p>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {authError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-xl bg-rose-50 p-3.5 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-900/50 flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Form */}
            <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  البريد الإلكتروني للمدير
                </label>
                <div className="relative">
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    type="email"
                    placeholder="admin@smartrestaurant.com"
                    className="pr-10"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pr-10"
                    error={errors.password?.message}
                    {...register('password')}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="default"
                className="w-full h-11 text-sm font-bold shadow-sm"
                isLoading={isLoading}
              >
                <span>دخول لوحة التحكم</span>
                <ArrowLeft className="h-4 w-4 mr-1.5" />
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-zinc-400">
          نظام إدارة المطاعم الذكي • جميع الحقوق محفوظة
        </div>
      </div>
    </div>
  );
}
