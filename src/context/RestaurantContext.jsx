import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, initialOrders, initialCustomers, restaurantSettings } from '../lib/mockData';

const RestaurantContext = createContext();

const initialNotificationsList = [
  {
    id: 1,
    title: 'طلب صالة جديد #ORD-7822',
    desc: 'طاولة 04 • 2 برجر أنجوس، 2 موخيتو دراغون ($50.00)',
    time: 'منذ دقيقتين',
    type: 'order',
    isRead: false
  },
  {
    id: 2,
    title: 'تنبيه مخزون: كيكة الفستق البركانية',
    desc: 'تبقى 18 قطعة فقط قبل فترة الذروة المسائية',
    time: 'منذ 15 دقيقة',
    type: 'inventory',
    isRead: false
  },
  {
    id: 3,
    title: 'طلب الحساب: طاولة 12',
    desc: 'الزبون طلب إغلاق الحساب وتسوية الفاتورة ($69.50)',
    time: 'منذ 32 دقيقة',
    type: 'service',
    isRead: false
  },
  {
    id: 4,
    title: 'تم تسليم الطلب #ORD-7819',
    desc: 'تم تسليم طلب التوصيل للعميل عمر فاروق',
    time: 'منذ ساعة',
    type: 'delivered',
    isRead: true
  }
];

const defaultAnalyticsTargets = {
  week: {
    targetRevenue: 39400,
    profitMargin: 71.2,
    tableTime: 38,
    avgTicket: 34.50
  },
  month: {
    targetRevenue: 53000,
    profitMargin: 68.4,
    tableTime: 44,
    avgTicket: 38.90
  },
  year: {
    targetRevenue: 780000,
    profitMargin: 69.8,
    tableTime: 42,
    avgTicket: 41.20
  }
};

export function RestaurantProvider({ children }) {
  // 1. Orders State with localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('restaurant_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch (e) {
      console.error('Error loading orders from localStorage', e);
      return initialOrders;
    }
  });

  // 2. Products State with silent localStorage sync
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('restaurant_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Heal any stale broken image URLs from previous saves
        return parsed.map((p) => {
          if (p.id === 'PRD-004' && (!p.image || p.image.includes('photo-1527477378735-31296bf3cb18'))) {
            return { ...p, image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&auto=format&fit=crop&q=80' };
          }
          return p;
        });
      }
      return initialProducts;
    } catch (e) {
      console.error('Error loading products', e);
      return initialProducts;
    }
  });

  // 3. Customers State with localStorage
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem('restaurant_customers');
      return saved ? JSON.parse(saved) : initialCustomers;
    } catch (e) {
      console.error('Error loading customers from localStorage', e);
      return initialCustomers;
    }
  });

  // 4. Settings State with localStorage
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('restaurant_settings');
      return saved ? JSON.parse(saved) : restaurantSettings;
    } catch (e) {
      console.error('Error loading settings from localStorage', e);
      return restaurantSettings;
    }
  });

  // 5. Notifications State with localStorage
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('restaurant_notifications');
      return saved ? JSON.parse(saved) : initialNotificationsList;
    } catch (e) {
      console.error('Error loading notifications from localStorage', e);
      return initialNotificationsList;
    }
  });

  // 6. Analytics TimeRange & Targets with silent localStorage sync
  const [analyticsTimeRange, setAnalyticsTimeRangeState] = useState(() => {
    try {
      return localStorage.getItem('restaurant_analytics_timerange') || 'month';
    } catch (e) {
      return 'month';
    }
  });

  const [analyticsTargets, setAnalyticsTargets] = useState(() => {
    try {
      const saved = localStorage.getItem('restaurant_analytics_targets');
      return saved ? JSON.parse(saved) : defaultAnalyticsTargets;
    } catch (e) {
      return defaultAnalyticsTargets;
    }
  });

  const setAnalyticsTimeRange = (range) => {
    setAnalyticsTimeRangeState(range);
    try {
      localStorage.setItem('restaurant_analytics_timerange', range);
    } catch (e) {
      console.error(e);
    }
  };

  const updateAnalyticsTargets = (period, newValues) => {
    setAnalyticsTargets((prev) => {
      const updated = {
        ...prev,
        [period]: {
          ...prev[period],
          ...newValues
        }
      };
      try {
        localStorage.setItem('restaurant_analytics_targets', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('restaurant_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('restaurant_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('restaurant_customers', JSON.stringify(customers));
    } catch (e) {
      console.error(e);
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem('restaurant_settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('restaurant_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  // Order Actions
  const addOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);

    // Automatically trigger an operational notification
    const newNotif = {
      id: Date.now(),
      title: `طلب جديد #${newOrder.id}`,
      desc: `${newOrder.type} • ${newOrder.customer} ($${newOrder.total.toFixed(2)})`,
      time: 'الآن',
      type: 'order',
      isRead: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  // Product Actions
  const addProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Customer Actions
  const addCustomer = (newCustomer) => {
    setCustomers((prev) => [newCustomer, ...prev]);
  };

  const deleteCustomer = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  // Settings Actions
  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  // Notification Actions
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const value = {
    // Orders
    orders,
    addOrder,
    updateOrderStatus,
    deleteOrder,

    // Products
    products,
    addProduct,
    updateProduct,
    deleteProduct,

    // Customers
    customers,
    addCustomer,
    deleteCustomer,

    // Settings
    settings,
    updateSettings,

    // Notifications
    notifications,
    markAllNotificationsRead,
    markNotificationRead,
    clearAllNotifications,

    // Analytics TimeRange & Targets (silent localStorage sync)
    analyticsTimeRange,
    setAnalyticsTimeRange,
    analyticsTargets,
    updateAnalyticsTargets
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
}
