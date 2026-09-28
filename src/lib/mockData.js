export const initialProducts = [
  {
    id: 'PRD-001',
    name: 'Truffle Angus Burger',
    nameAr: 'برجر أنجوس بالكمأة',
    category: 'Burgers',
    price: 18.5,
    cost: 7.2,
    stock: 42,
    salesCount: 384,
    rating: 4.9,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
    description: 'Black Angus patty, black truffle mayo, brioche bun, aged cheddar, caramelized onions.'
  },
  {
    id: 'PRD-002',
    name: 'Artisan Woodfire Margherita',
    nameAr: 'بيتزا مارغريتا حطب',
    category: 'Pizza',
    price: 15.0,
    cost: 4.8,
    stock: 55,
    salesCount: 520,
    rating: 4.8,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&auto=format&fit=crop&q=80',
    description: 'San Marzano tomatoes, fresh buffalo mozzarella, fresh basil, extra virgin olive oil.'
  },
  {
    id: 'PRD-003',
    name: 'Creamy Fettuccine Alfredo',
    nameAr: 'فيتوتشيني ألفريدو بالدجاج',
    category: 'Pasta',
    price: 16.5,
    cost: 5.5,
    stock: 28,
    salesCount: 290,
    rating: 4.7,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&auto=format&fit=crop&q=80',
    description: 'Handmade fettuccine, grilled chicken breast, parmesan cream sauce, roasted garlic.'
  },
  {
    id: 'PRD-004',
    name: 'Crispy Buffalo Chicken Wings',
    nameAr: 'أجنحة دجاج بافلو مقرمشة',
    category: 'Appetizers',
    price: 12.0,
    cost: 3.9,
    stock: 60,
    salesCount: 460,
    rating: 4.6,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&auto=format&fit=crop&q=80',
    description: '8 pcs crispy fried wings tossed in signature spicy buffalo sauce with blue cheese dip.'
  },
  {
    id: 'PRD-005',
    name: 'Pistachio Lava Cake',
    nameAr: 'كيكة الفستق البركانية',
    category: 'Desserts',
    price: 9.5,
    cost: 3.0,
    stock: 18,
    salesCount: 310,
    rating: 4.9,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80',
    description: 'Warm molten pistachio core cake served with Madagascar vanilla gelato.'
  },
  {
    id: 'PRD-006',
    name: 'Smoked Salmon Poke Bowl',
    nameAr: 'بوكي بول السلمون المدخن',
    category: 'Healthy',
    price: 17.0,
    cost: 6.8,
    stock: 30,
    salesCount: 215,
    rating: 4.7,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80',
    description: 'Sushi rice, Norwegian smoked salmon, avocado, edamame, cucumber, ponzu dressing.'
  },
  {
    id: 'PRD-007',
    name: 'Dragonfruit Mojito Mocktail',
    nameAr: 'موخيتو دراغون فروت',
    category: 'Beverages',
    price: 6.5,
    cost: 1.5,
    stock: 90,
    salesCount: 480,
    rating: 4.8,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=80',
    description: 'Fresh dragonfruit, crushed mint, lime juice, sparkling soda water.'
  },
  {
    id: 'PRD-008',
    name: 'BBQ Ribeye Steak 300g',
    nameAr: 'ستيك ريب آي مشوي 300غ',
    category: 'Steaks',
    price: 32.0,
    cost: 14.0,
    stock: 12,
    salesCount: 175,
    rating: 4.9,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80',
    description: 'Prime ribeye grilled to perfection, roasted rosemary potatoes, pepper sauce.'
  }
];

export const initialOrders = [
  {
    id: 'ORD-7821',
    customer: 'Ahmad Al-Mansoor',
    email: 'ahmad@example.com',
    type: 'Dine-In (Table 04)',
    items: [
      { name: 'Truffle Angus Burger', quantity: 2, price: 18.5 },
      { name: 'Dragonfruit Mojito', quantity: 2, price: 6.5 }
    ],
    total: 50.0,
    status: 'Preparing', // Pending, Preparing, Delivered, Cancelled
    time: '10 mins ago',
    date: 'Today, 08:45 PM',
    payment: 'Credit Card (Paid)'
  },
  {
    id: 'ORD-7820',
    customer: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    type: 'Takeaway',
    items: [
      { name: 'Artisan Woodfire Margherita', quantity: 1, price: 15.0 },
      { name: 'Crispy Buffalo Chicken Wings', quantity: 1, price: 12.0 }
    ],
    total: 27.0,
    status: 'Pending',
    time: '18 mins ago',
    date: 'Today, 08:37 PM',
    payment: 'Apple Pay (Paid)'
  },
  {
    id: 'ORD-7819',
    customer: 'Omar Farooq',
    email: 'omar.f@example.com',
    type: 'Delivery',
    items: [
      { name: 'BBQ Ribeye Steak 300g', quantity: 1, price: 32.0 },
      { name: 'Pistachio Lava Cake', quantity: 1, price: 9.5 }
    ],
    total: 41.5,
    status: 'Delivered',
    time: '45 mins ago',
    date: 'Today, 08:10 PM',
    payment: 'Cash on Delivery'
  },
  {
    id: 'ORD-7818',
    customer: 'Layla Mahmoud',
    email: 'layla.m@example.com',
    type: 'Dine-In (Table 12)',
    items: [
      { name: 'Creamy Fettuccine Alfredo', quantity: 2, price: 16.5 },
      { name: 'Smoked Salmon Poke Bowl', quantity: 1, price: 17.0 },
      { name: 'Dragonfruit Mojito', quantity: 3, price: 6.5 }
    ],
    total: 69.5,
    status: 'Delivered',
    time: '1 hour ago',
    date: 'Today, 07:55 PM',
    payment: 'Credit Card (Paid)'
  },
  {
    id: 'ORD-7817',
    customer: 'Karim Zaid',
    email: 'karim.z@example.com',
    type: 'Delivery',
    items: [
      { name: 'Truffle Angus Burger', quantity: 1, price: 18.5 }
    ],
    total: 18.5,
    status: 'Cancelled',
    time: '2 hours ago',
    date: 'Today, 06:40 PM',
    payment: 'Refunded'
  },
  {
    id: 'ORD-7816',
    customer: 'Elena Rostova',
    email: 'elena.r@example.com',
    type: 'Dine-In (Table 02)',
    items: [
      { name: 'Artisan Woodfire Margherita', quantity: 2, price: 15.0 },
      { name: 'Pistachio Lava Cake', quantity: 2, price: 9.5 }
    ],
    total: 49.0,
    status: 'Delivered',
    time: '3 hours ago',
    date: 'Today, 05:20 PM',
    payment: 'Credit Card (Paid)'
  }
];

export const initialCustomers = [
  {
    id: 'CUST-101',
    name: 'Ahmad Al-Mansoor',
    email: 'ahmad@example.com',
    phone: '+962 79 123 4567',
    totalOrders: 18,
    totalSpent: 485.5,
    favoriteDish: 'Truffle Angus Burger',
    lastOrder: 'Today',
    status: 'VIP'
  },
  {
    id: 'CUST-102',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+962 78 987 6543',
    totalOrders: 12,
    totalSpent: 310.0,
    favoriteDish: 'Artisan Woodfire Margherita',
    lastOrder: 'Today',
    status: 'Regular'
  },
  {
    id: 'CUST-103',
    name: 'Omar Farooq',
    email: 'omar.f@example.com',
    phone: '+962 77 444 8899',
    totalOrders: 24,
    totalSpent: 780.0,
    favoriteDish: 'BBQ Ribeye Steak 300g',
    lastOrder: 'Today',
    status: 'VIP'
  },
  {
    id: 'CUST-104',
    name: 'Layla Mahmoud',
    email: 'layla.m@example.com',
    phone: '+962 79 666 1212',
    totalOrders: 8,
    totalSpent: 195.0,
    favoriteDish: 'Creamy Fettuccine Alfredo',
    lastOrder: 'Today',
    status: 'Regular'
  },
  {
    id: 'CUST-105',
    name: 'Karim Zaid',
    email: 'karim.z@example.com',
    phone: '+962 78 333 5555',
    totalOrders: 5,
    totalSpent: 92.5,
    favoriteDish: 'Truffle Angus Burger',
    lastOrder: 'Yesterday',
    status: 'New'
  },
  {
    id: 'CUST-106',
    name: 'Elena Rostova',
    email: 'elena.r@example.com',
    phone: '+962 77 111 2233',
    totalOrders: 15,
    totalSpent: 420.0,
    favoriteDish: 'Pistachio Lava Cake',
    lastOrder: '2 days ago',
    status: 'VIP'
  }
];

export const restaurantSettings = {
  restaurantName: 'Gourmet Bistro & Grill',
  tagline: 'Smart Culinary Experience',
  email: 'contact@gourmetbistro.com',
  phone: '+962 6 500 1234',
  address: 'King Abdullah II St, Al-Madina Circle, Amman',
  currency: 'USD ($)',
  taxRate: 10,
  deliveryFee: 3.5,
  openingHours: '11:00 AM - 12:00 AM',
  soundNotifications: true,
  autoAcceptOrders: false,
  kitchenPrinting: true
};
