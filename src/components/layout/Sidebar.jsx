import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  UtensilsCrossed, 
  Users, 
  BarChart3, 
  Settings, 
  UserCircle, 
  LogOut, 
  ChefHat, 
  X,
  Flame
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

export function Sidebar({ isOpen, onClose }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'الرئيسية', path: '/', icon: LayoutDashboard, badge: null },
    { name: 'الطلبات المباشرة', path: '/orders', icon: ShoppingBag, badge: 'مباشر' },
    { name: 'قائمة الوجبات', path: '/products', icon: UtensilsCrossed, badge: null },
    { name: 'الزبائن والولاء', path: '/customers', icon: Users, badge: null },
    { name: 'التقارير والمبيعات', path: '/analytics', icon: BarChart3, badge: 'متقدم' },
    { name: 'إعدادات المطعم', path: '/settings', icon: Settings, badge: null },
    { name: 'الملف الشخصي', path: '/profile', icon: UserCircle, badge: null },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-zinc-200/80 bg-white transition-transform duration-300 ease-in-out dark:border-zinc-800/80 dark:bg-[#10121a] lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-18 items-center justify-between border-b border-zinc-100 px-6 dark:border-[#1e2433]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm">
              <ChefHat className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                GourmetOS
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                  المدير
                </span>
              </h1>
              <p className="text-[11px] text-zinc-400 font-medium">
                نظام إدارة المطعم السحابي
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Live Kitchen Status indicator */}
        <div className="mx-4 my-3 px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#161924] border border-zinc-200/60 dark:border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">المطبخ متصل</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">استقبال الطلبات نشط</span>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-zinc-400 dark:text-zinc-500">
            القائمة الرئيسية
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) =>
                  cn(
                    'group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-xs'
                      : 'text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-[#181d2a] dark:hover:text-zinc-100'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={cn('h-4.5 w-4.5 transition-transform group-hover:scale-105', isActive ? 'text-white dark:text-zinc-950' : 'text-zinc-500 dark:text-zinc-400')} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={cn(
                          'rounded-md px-1.5 py-0.2 text-[10px] font-semibold',
                          isActive
                            ? 'bg-white/20 text-white dark:bg-black/10 dark:text-black'
                            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer Admin User Info & Logout */}
        <div className="border-t border-zinc-100 p-4 dark:border-[#1e2433]">
          <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-2.5 dark:bg-[#161924] border border-zinc-200/50 dark:border-zinc-800/60">
            <img
              src={currentUser?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=admin`}
              alt="المدير"
              className="h-8 w-8 rounded-full object-cover ring-1 ring-zinc-300 dark:ring-zinc-700"
            />
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-bold text-zinc-900 dark:text-zinc-100">
                {currentUser?.displayName || 'المدير العام'}
              </p>
              <p className="truncate text-[10px] text-zinc-400 font-mono">
                {currentUser?.email || 'admin@smartrestaurant.com'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              title="تسجيل الخروج"
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-200 hover:text-rose-500 dark:hover:bg-zinc-800 dark:hover:text-rose-400 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
