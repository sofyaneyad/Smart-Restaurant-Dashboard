import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Sun, 
  Moon, 
  Bell, 
  Search, 
  Plus, 
  ShoppingBag,
  AlertTriangle,
  Receipt,
  CheckCircle2,
  Trash2,
  CheckCheck
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useRestaurant } from '../../context/RestaurantContext';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar({ onMenuClick }) {
  const { toggleTheme, isDark } = useTheme();
  const { currentUser } = useAuth();
  const { 
    notifications, 
    markAllNotificationsRead, 
    clearAllNotifications, 
    markNotificationRead 
  } = useRestaurant();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (e, notif) => {
    e.stopPropagation();
    markNotificationRead(notif.id);
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case 'inventory':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'service':
        return <Receipt className="h-4 w-4 text-sky-500" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-zinc-500" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-18 w-full items-center justify-between border-b border-zinc-200/80 bg-white/95 px-4 sm:px-6 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#10121a]/90 transition-colors">
      {/* Search Bar & Mobile Trigger */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-md">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 lg:hidden cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative w-full hidden sm:block">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="ابحث عن طلب، وجبة، أو عميل..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/70 py-2 pr-10 pl-4 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-100 dark:focus:bg-zinc-900 transition-all font-medium"
          />
        </div>
      </div>

      {/* Right Actions: New Order, Theme Toggle, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick New Order Button */}
        <Button 
          size="sm" 
          variant="default" 
          className="hidden md:flex shadow-xs text-xs font-bold"
          onClick={() => navigate('/orders')}
        >
          <Plus className="h-3.5 w-3.5" />
          <span>طلب جديد</span>
        </Button>

        {/* Dark / Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="تبديل الثيم"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-[#181d2a] dark:hover:text-zinc-100 transition-colors shadow-2xs cursor-pointer"
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-zinc-200" />
          ) : (
            <Moon className="h-4 w-4 text-zinc-700" />
          )}
        </button>

        {/* Kitchen Notifications Center */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
            className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition-colors shadow-2xs cursor-pointer ${
              isOpen 
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' 
                : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-[#181d2a] dark:hover:text-zinc-100'
            }`}
            title="مركز إشعارات المطبخ"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white font-mono shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Animated Notifications Popover */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute top-11 left-0 z-50 w-80 sm:w-96 rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-[#141722] overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-100 p-3.5 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      إشعارات العمليات والمطبخ
                    </span>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                        {unreadCount} جديد
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAllNotificationsRead();
                      }}
                      className="flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                    >
                      <CheckCheck className="h-3.5 w-3.5" />
                      <span>قراءة الكل</span>
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-80 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/80">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-xs text-zinc-400">
                      <Bell className="mx-auto h-6 w-6 text-zinc-300 dark:text-zinc-700 mb-2" />
                      <p>لا توجد إشعارات جديدة حالياً</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={(e) => handleNotificationClick(e, notif)}
                        className={`p-3.5 flex items-start gap-3 hover:bg-zinc-50/80 dark:hover:bg-[#181d2a] transition-colors cursor-pointer ${
                          !notif.isRead ? 'bg-zinc-50/60 dark:bg-zinc-800/20' : ''
                        }`}
                      >
                        <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 shrink-0 mt-0.5">
                          {getNotifIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <p className={`text-xs font-bold truncate ${
                              notif.isRead ? 'text-zinc-600 dark:text-zinc-400' : 'text-zinc-900 dark:text-zinc-100'
                            }`}>
                              {notif.title}
                            </p>
                            {!notif.isRead && (
                              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
                            {notif.desc}
                          </p>
                          <span className="text-[10px] text-zinc-400 mt-1 block font-medium">
                            {notif.time}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="flex items-center justify-between border-t border-zinc-100 p-2.5 bg-zinc-50/50 dark:border-zinc-800 dark:bg-[#10121a]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearAllNotifications();
                      }}
                      className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors px-2 py-1 cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>مسح الكل</span>
                    </button>
                    <Link
                      to="/orders"
                      onClick={() => setIsOpen(false)}
                      className="text-[11px] font-bold text-zinc-900 hover:underline dark:text-zinc-100 px-2 py-1"
                    >
                      عرض جدول الطلبات ←
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Link */}
        <Link
          to="/profile"
          className="flex items-center gap-2.5 pr-2 border-r border-zinc-200 dark:border-zinc-800 mr-1 hover:opacity-85 transition-opacity"
        >
          <img
            src={currentUser?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=admin`}
            alt="المدير"
            className="h-8 w-8 rounded-full object-cover ring-1 ring-zinc-300 dark:ring-zinc-700"
          />
          <div className="hidden xl:block text-right">
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-tight">
              {currentUser?.displayName || 'المدير العام'}
            </p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold leading-tight">متصل الآن</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
