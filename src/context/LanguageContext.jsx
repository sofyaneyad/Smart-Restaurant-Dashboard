import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Brand
    brandName: 'GourmetOS',
    brandSubtitle: 'Restaurant Management System',
    adminBadge: 'Admin',
    kitchenLive: 'Kitchen Live',
    accepting: 'Accepting Orders',
    serviceHours: 'Service Hours: 11:00 AM - 12:00 AM',

    // Navigation
    navDashboard: 'Dashboard',
    navOrders: 'Orders',
    navProducts: 'Menu & Dishes',
    navCustomers: 'Customers',
    navAnalytics: 'Analytics',
    navSettings: 'Settings',
    navProfile: 'Admin Profile',
    navSignOut: 'Sign Out',
    mainMenu: 'Main Menu',

    // Common Actions & Search
    searchPlaceholder: 'Search orders, menu, customers...',
    searchOrdersPlaceholder: 'Search by order ID, customer...',
    searchMenuPlaceholder: 'Search dishes, categories...',
    searchCustomersPlaceholder: 'Search patrons by name, email, phone...',
    filterAll: 'All',
    newOrder: 'New Order',
    addDish: 'Add Dish',
    addCustomer: 'Add Customer',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    viewDetails: 'View Details',
    exportPdf: 'Export PDF',
    loading: 'Loading...',

    // Dashboard
    dashboardTitle: 'Restaurant Performance Overview',
    dashboardSubtitle: 'Real-time telemetry for kitchen pace, dining occupancy, and sales volume.',
    statRevenue: "Today's Net Revenue",
    statRevenueSub: 'vs. yesterday',
    statOrders: 'Total Orders',
    statOrdersSub: 'currently preparing',
    statOccupancy: 'Table Occupancy',
    statOccupancySub: 'tables available',
    statPace: 'Kitchen Ticket Pace',
    statPaceSub: 'Optimized rhythm',
    salesOverviewTitle: 'Sales Performance',
    salesOverviewDesc: 'Track daily cashflow and seasonal order spikes',
    dailyView: 'Daily',
    monthlyView: 'Monthly',
    topDishesTitle: 'Best Selling Items',
    topDishesDesc: 'Top revenue and quantity contributors',
    topContributor: 'Top Performer:',
    ordersVolumeTitle: 'Rush Hours Order Volume',
    ordersVolumeDesc: 'Hourly distribution of dine-in and online tickets',
    kitchenAlertsTitle: 'Kitchen & Inventory Alerts',
    kitchenAlertsDesc: 'Real-time operational notices',
    recentOrdersTitle: 'Recent Live Orders',
    recentOrdersDesc: 'Latest customer orders across Dine-In, Delivery & Takeaway',
    viewAllOrders: 'View All Orders',

    // Orders Page
    ordersTitle: 'Live Orders Dispatch',
    ordersSubtitle: 'Monitor, approve, prepare, and deliver dining and delivery orders.',
    orderId: 'Order ID',
    customer: 'Customer',
    channel: 'Channel',
    items: 'Ordered Items',
    total: 'Total',
    status: 'Status',
    actions: 'Actions',
    statusPending: 'Pending',
    statusPreparing: 'Preparing',
    statusDelivered: 'Delivered',
    statusCancelled: 'Cancelled',
    startPreparing: 'Start Preparing',
    markDelivered: 'Mark Delivered',
    cancelOrder: 'Cancel Order',
    printReceipt: 'Print Ticket',
    orderReceipt: 'Kitchen Ticket & Invoice',
    paymentMethod: 'Payment Method',
    grandTotal: 'Grand Total',

    // Menu / Products Page
    menuTitle: 'Menu & Dishes Catalog',
    menuSubtitle: 'Control recipes, pricing, food cost margins, and inventory quantities.',
    dishName: 'Dish Name',
    category: 'Category',
    price: 'Price',
    cost: 'Cost',
    stock: 'Stock',
    sold: 'Sold',
    inStock: 'In Stock',
    lowStock: 'Low Stock',
    addNewDishModal: 'Add New Dish',
    editDishModal: 'Edit Dish Details',
    dishNameAr: 'Arabic Name',
    initialStock: 'Initial Stock',
    foodCost: 'Food Cost ($)',
    dishDescription: 'Description & Ingredients',

    // Customers Page
    customersTitle: 'Patrons & Guest CRM',
    customersSubtitle: 'Track guest spend history, table loyalty tiers, and dining preferences.',
    totalPatrons: 'Registered Patrons',
    vipMembers: 'VIP Diners',
    retentionRate: 'Retention Rate',
    totalSpent: 'Total Spend',
    favoriteDish: 'Favorite Dish',
    loyaltyTier: 'Loyalty Tier',
    viewCard: 'Guest Card',
    lifetimeRevenue: 'Lifetime Revenue',
    totalVisits: 'Total Visits',

    // Analytics Page
    analyticsTitle: 'Business Analytics & Profitability',
    analyticsSubtitle: 'Deep dive into profit margins, sales channels, and category performance.',
    grossMargin: 'Gross Profit Margin',
    tableTurnover: 'Average Table Turn',
    avgTicket: 'Average Ticket Size',
    returnRate: 'Diner Return Rate',
    actualVsTarget: 'Actual Revenue vs. Monthly Target',
    channelBreakdown: 'Sales by Order Channel',
    categoryRevenue: 'Revenue by Menu Category',
    dineIn: 'Dine-In',
    delivery: 'Delivery',
    takeaway: 'Takeaway',

    // Settings Page
    settingsTitle: 'Restaurant & Operations Settings',
    settingsSubtitle: 'Configure restaurant identity, hardware printers, and sales tax rules.',
    generalBusiness: 'General Business Details',
    restaurantName: 'Restaurant Name',
    tagline: 'Tagline / Slogan',
    supportEmail: 'Support Email',
    phoneNumber: 'Phone Number',
    physicalAddress: 'Physical Address',
    financialOps: 'Financial & Operational Parameters',
    currency: 'Store Currency',
    taxRate: 'Sales Tax Rate (%)',
    deliveryFee: 'Delivery Fee ($)',
    operatingHours: 'Operating Schedule',
    kitchenAutomations: 'Kitchen Line Automations',
    soundAlerts: 'Order Audio Chime',
    soundAlertsDesc: 'Play audio chime on incoming online or kitchen ticket',
    autoAccept: 'Auto-Accept Orders',
    autoAcceptDesc: 'Automatically move new tickets to the kitchen line',
    autoPrint: 'Auto Thermal Kitchen Printing',
    autoPrintDesc: 'Send kitchen tickets directly to thermal kitchen printers',
    saveSettings: 'Save Configuration',

    // Profile Page
    profileTitle: 'Admin Account & Security',
    profileSubtitle: 'Active Firebase manager session, authentication provider, and privileges.',
    authProvider: 'Auth Provider',
    userId: 'Firebase User ID',
    sessionStatus: 'Session Status',
    personalInfo: 'Personal Information',
    displayName: 'Display Name',
    registeredEmail: 'Registered Email',
    adminPrivileges: 'System Privileges',
    signOutDashboard: 'Sign Out of Dashboard',

    // Auth / Login Page
    loginTitle: 'GourmetOS Restaurant Portal',
    loginSubtitle: 'Professional Kitchen & Administration Gateway',
    signInTab: 'Sign In',
    registerTab: 'Register Admin',
    googleSignIn: 'Continue with Google',
    orWithEmail: 'Or authenticate with email',
    emailAddress: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    signInButton: 'Sign In to Dashboard',
    registerButton: 'Create Admin Account',
    demoButton: 'Instant Demo Access (Chef Mario)'
  },
  ar: {
    // Brand
    brandName: 'GourmetOS',
    brandSubtitle: 'نظام إدارة المطاعم المتقدم',
    adminBadge: 'مدير',
    kitchenLive: 'المطبخ متصل',
    accepting: 'استقبال الطلبات نشط',
    serviceHours: 'ساعات العمل: 11:00 ص - 12:00 م',

    // Navigation
    navDashboard: 'لوحة التحكم',
    navOrders: 'الطلبات الحية',
    navProducts: 'قائمة الوجبات',
    navCustomers: 'العملاء والولاء',
    navAnalytics: 'التحليلات والتقارير',
    navSettings: 'إعدادات المطعم',
    navProfile: 'الملف الشخصي',
    navSignOut: 'تسجيل الخروج',
    mainMenu: 'القائمة الرئيسية',

    // Common Actions & Search
    searchPlaceholder: 'بحث في الطلبات، الوجبات، العملاء...',
    searchOrdersPlaceholder: 'ابحث برقم الطلب أو اسم العميل...',
    searchMenuPlaceholder: 'ابحث في الأطباق أو التصنيفات...',
    searchCustomersPlaceholder: 'ابحث بالاسم أو البريد أو الهاتف...',
    filterAll: 'الكل',
    newOrder: 'طلب جديد',
    addDish: 'إضافة وجبة',
    addCustomer: 'إضافة عميل',
    saveChanges: 'حفظ التعديلات',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    viewDetails: 'عرض التفاصيل',
    exportPdf: 'تصدير PDF',
    loading: 'جاري التحميل...',

    // Dashboard
    dashboardTitle: 'لوحة القيادة التشغيلية',
    dashboardSubtitle: 'مراقبة فورية للمبيعات، إشغال الصالة، وسرعة خط الإنتاج في المطبخ.',
    statRevenue: 'صافي إيرادات اليوم',
    statRevenueSub: 'مقارنة بالأمس',
    statOrders: 'إجمالي الطلبات',
    statOrdersSub: 'طلب قيد التحضير حالياً',
    statOccupancy: 'إشغال الطاولات',
    statOccupancySub: 'طاولات شاغرة',
    statPace: 'متوسط زمن التجهيز',
    statPaceSub: 'إيقاع مطبخ متوازن',
    salesOverviewTitle: 'تحليل المبيعات والإيراد',
    salesOverviewDesc: 'متابعة التدفق المالي وحجم المبيعات',
    dailyView: 'يومي',
    monthlyView: 'شهري',
    topDishesTitle: 'الأطباق الأكثر مبيعاً',
    topDishesDesc: 'الأعلى طلباً ومساهمة في الأرباح',
    topContributor: 'الأعلى مبيعاً:',
    ordersVolumeTitle: 'كثافة الطلبات في ساعات الذروة',
    ordersVolumeDesc: 'توزيع تذاكر الطلبات على مدار فترات الغداء والعشاء',
    kitchenAlertsTitle: 'تنبيهات المطبخ والمخزون',
    kitchenAlertsDesc: 'إشعارات تشغيلية مباشرة من خط الإعداد',
    recentOrdersTitle: 'أحدث الطلبات الواردة',
    recentOrdersDesc: 'متابعة حية للطلبات داخل الصالة، والتوصيل، والاستلام',
    viewAllOrders: 'عرض كافة الطلبات',

    // Orders Page
    ordersTitle: 'إدارة وتوجيه الطلبات',
    ordersSubtitle: 'متابعة، تحضير، وتوصيل طلبات الصالة والسفري وخدمات التوصيل.',
    orderId: 'رقم الطلب',
    customer: 'العميل',
    channel: 'القناة / الطاولة',
    items: 'الأصناف المطلوبة',
    total: 'الإجمالي',
    status: 'الحالة',
    actions: 'الإجراءات',
    statusPending: 'قيد الانتظار',
    statusPreparing: 'جاري التحضير',
    statusDelivered: 'تم التوصيل',
    statusCancelled: 'ملغي',
    startPreparing: 'بدء التحضير',
    markDelivered: 'تأكيد التسليم',
    cancelOrder: 'إلغاء الطلب',
    printReceipt: 'طباعة التذكرة',
    orderReceipt: 'فاتورة وتذكرة المطبخ',
    paymentMethod: 'طريقة الدفع',
    grandTotal: 'المجموع الكلي',

    // Menu / Products Page
    menuTitle: 'قائمة الأطباق والوجبات',
    menuSubtitle: 'إدارة الوصفات، أسعار البيع، هوامش تكلفة الطعام، وكميات المخزون.',
    dishName: 'اسم الطبق',
    category: 'التصنيف',
    price: 'سعر البيع',
    cost: 'التكلفة',
    stock: 'المخزون',
    sold: 'المبيعات',
    inStock: 'متوفر',
    lowStock: 'مخزون منخفض',
    addNewDishModal: 'إضافة طبق جديد',
    editDishModal: 'تعديل تفاصيل الطبق',
    dishNameAr: 'الاسم بالعربية',
    initialStock: 'الكمية الأولية',
    foodCost: 'تكلفة المكونات ($)',
    dishDescription: 'الوصف والمكونات ومسببات الحساسية',

    // Customers Page
    customersTitle: 'قاعدة بيانات الضيوف والولاء',
    customersSubtitle: 'متابعة إنفاق العملاء، تصنيفات الولاء، والأطباق المفضلة.',
    totalPatrons: 'إجمالي الضيوف المسجلين',
    vipMembers: 'أعضاء الفئة الذهبية VIP',
    retentionRate: 'نسبة ولاء الضيوف',
    totalSpent: 'إجمالي الإنفاق',
    favoriteDish: 'الطبق المفضل',
    loyaltyTier: 'فئة العميل',
    viewCard: 'بطاقة العميل',
    lifetimeRevenue: 'القيمة المالية التراكمية',
    totalVisits: 'عدد الزيارات',

    // Analytics Page
    analyticsTitle: 'التحليلات المالية والربحية',
    analyticsSubtitle: 'قراءة شاملة لهوامش الأرباح، قنوات البيع، وأداء أقسام القائمة.',
    grossMargin: 'هامش الربح الإجمالي',
    tableTurnover: 'معدل دوران الطاولة',
    avgTicket: 'متوسط الفاتورة الواحدة',
    returnRate: 'نسبة عودة الضيوف',
    actualVsTarget: 'الإيراد الفعلي مقابل الهدف الشهري',
    channelBreakdown: 'توزيع المبيعات حسب القناة',
    categoryRevenue: 'الإيراد حسب تصنيف الوجبات',
    dineIn: 'محلي (داخل الصالة)',
    delivery: 'توصيل منزلي',
    takeaway: 'سفري (استلام)',

    // Settings Page
    settingsTitle: 'إعدادات المنشأة والعمليات',
    settingsSubtitle: 'تهيئة هوية المطعم، طابعات المطبخ الحرارية، والضرائب التشغيلية.',
    generalBusiness: 'البيانات التجارية العامة',
    restaurantName: 'اسم المطعم / المنشأة',
    tagline: 'الشعار التسويقي',
    supportEmail: 'البريد الإلكتروني للفرع',
    phoneNumber: 'رقم هاتف الاتصال',
    physicalAddress: 'العنوان الجغرافي',
    financialOps: 'المعايير المالية والتشغيلية',
    currency: 'عملة النظام',
    taxRate: 'نسبة ضريبة المبيعات (%)',
    deliveryFee: 'رسوم التوصيل الموحدة ($)',
    operatingHours: 'جدول ساعات العمل',
    kitchenAutomations: 'أتمتة خط المطبخ والشاشات',
    soundAlerts: 'التنبيه الصوتي للطلبات',
    soundAlertsDesc: 'تشغيل رنين صوتي واضح عند وصول تذكرة طلب جديدة',
    autoAccept: 'الموافقة التلقائية على الطلبات',
    autoAcceptDesc: 'إرسال تذاكر الطلبات مباشرة لشاشات الطهاة دون انتظار',
    autoPrint: 'الطباعة الحرارية المباشرة',
    autoPrintDesc: 'إخراج بون الفاتورة تلقائياً على طابعات المطبخ الحرارية',
    saveSettings: 'حفظ التكوين والإعدادات',

    // Profile Page
    profileTitle: 'حساب المدير والأمان',
    profileSubtitle: 'جلسة مدير المطعم النشطة عبر Firebase، موفر الهوية، والصلاحيات.',
    authProvider: 'موفر تسجيل الدخول',
    userId: 'معرف المستخدم في Firebase',
    sessionStatus: 'حالة الجلسة',
    personalInfo: 'المعلومات الشخصية',
    displayName: 'اسم العرض',
    registeredEmail: 'البريد الإلكتروني المسجل',
    adminPrivileges: 'الصلاحيات الإدارية الممنوحة',
    signOutDashboard: 'تسجيل الخروج من لوحة التحكم',

    // Auth / Login Page
    loginTitle: 'بوابة GourmetOS للمطاعم',
    loginSubtitle: 'النظام السحابي الموحد لإدارة المطابخ والصالات والعمليات',
    signInTab: 'تسجيل الدخول',
    registerTab: 'تسجيل مدير جديد',
    googleSignIn: 'المتابعة بحساب Google',
    orWithEmail: 'أو تسجيل الدخول عبر البريد الإلكتروني',
    emailAddress: 'عنوان البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    fullName: 'الاسم الكامل',
    signInButton: 'دخول لوحة التحكم',
    registerButton: 'إنشاء حساب إدارة جديد',
    demoButton: 'دخول تجريبي فوري (الشيف ماريو)'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('restaurant_language') || 'ar'; // Default to Arabic as user speaks Arabic, with instant toggle to English!
  });

  useEffect(() => {
    localStorage.setItem('restaurant_language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
