import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  ChefHat,
  AlertTriangle,
  ChevronLeft
} from 'lucide-react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { useRestaurant } from '../context/RestaurantContext';
import { getChartThemeOptions } from '../lib/chartConfig';

export function Dashboard() {
  const { isDark } = useTheme();
  const { orders, products, settings } = useRestaurant();
  const [salesTimeframe, setSalesTimeframe] = useState('daily'); // 'daily' | 'monthly'

  // Dynamic calculations from localStorage orders
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const preparingCount = orders.filter(o => o.status === 'Preparing').length;

  // Daily Sales Data (Last 7 Days)
  const dailySalesData = {
    labels: ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'],
    datasets: [
      {
        label: 'إيراد المبيعات ($)',
        data: [1240, 1560, 1420, 1890, 2450, 3100, Math.round(totalRevenue)],
        borderColor: '#10b981', // Clean Emerald
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#10b981',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  // Monthly Sales Data (Jan - Dec)
  const monthlySalesData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'الإيراد الشهري ($)',
        data: [32000, 34500, 41200, 38900, 46000, 52400, 58100, 61200, 54900, 59300, 64200, 71500],
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.08)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#059669',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  // Best Selling Dishes from products
  const topProducts = [...products].sort((a, b) => b.salesCount - a.salesCount).slice(0, 5);
  const bestSellersData = {
    labels: topProducts.map(p => p.nameAr),
    datasets: [
      {
        data: topProducts.map(p => p.salesCount || 100),
        backgroundColor: [
          '#10b981', // Emerald
          '#0284c7', // Sky
          '#64748b', // Slate
          '#b91c1c', // Bordeaux
          '#0d9488'  // Teal
        ],
        borderWidth: 2,
        borderColor: isDark ? '#141722' : '#ffffff'
      }
    ]
  };

  // Rush Hours Order Count
  const orderVolumeData = {
    labels: ['12 ظهراً', '2 ظهراً', '4 عصراً', '6 مساءً', '8 مساءً', '10 مساءً', '12 ليلاً'],
    datasets: [
      {
        label: 'عدد الطلبات',
        data: [42, 68, 35, 95, 142, 118, 48],
        backgroundColor: isDark ? '#222634' : '#18181b',
        hoverBackgroundColor: '#10b981',
        borderRadius: 6,
        barThickness: 22
      }
    ]
  };

  const chartOptions = getChartThemeOptions(isDark);

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDark ? '#a1a1aa' : '#52525b',
          font: { size: 11, family: 'Cairo' },
          boxWidth: 8,
          usePointStyle: true,
          padding: 12
        }
      }
    },
    cutout: '72%'
  };

  const getStatusBadge = (status) => {
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
            لوحة القيادة والمؤشرات الحية
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            متابعة فورية للمبيعات، وتدفق طلبات الصالة والمطبخ، ومعدل إشغال الطاولات.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl bg-zinc-100 dark:bg-[#161924] px-3.5 py-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-800">
            <Clock className="h-3.5 w-3.5 text-zinc-400" />
            <span>ساعات العمل: {settings.openingHours || '11:00 ص - 12:00 م'}</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <Card className="hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                صافي إيرادات اليوم
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-50">
                ${totalRevenue.toFixed(2)}
              </span>
              <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                <ArrowUpRight className="h-3.5 w-3.5" />
                +14.8%
              </span>
            </div>
            <p className="mt-1 text-[11px] text-zinc-400">تحديث فوري لجميع نقاط البيع</p>
          </CardContent>
        </Card>

        {/* KPI 2 */}
        <Card className="hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                إجمالي طلبات اليوم
              </span>
              <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
                <ShoppingBag className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-50">
                {totalOrdersCount}
              </span>
              <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                <ArrowUpRight className="h-3.5 w-3.5" />
                +8.2%
              </span>
            </div>
            <p className="mt-1 text-[11px] text-zinc-400">{preparingCount} طلب قيد التحضير حالياً</p>
          </CardContent>
        </Card>

        {/* KPI 3 */}
        <Card className="hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                إشغال طاولات الصالة
              </span>
              <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-50">16 / 20</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">80% إشغال</span>
            </div>
            <p className="mt-1 text-[11px] text-zinc-400">4 طاولات شاغرة متاحة</p>
          </CardContent>
        </Card>

        {/* KPI 4 */}
        <Card className="hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                متوسط سرعة الإعداد
              </span>
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                <ChefHat className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-50">14.2 دقيقة</span>
              <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                <ArrowDownRight className="h-3.5 w-3.5" />
                -2.1د
              </span>
            </div>
            <p className="mt-1 text-[11px] text-zinc-400">إيقاع تحضير سريع ومتوازن</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts: Sales & Best Sellers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Sales Line Chart */}
        <Card className="lg:col-span-2 shadow-2xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">
                تحليل المبيعات والإيراد
              </CardTitle>
              <CardDescription className="text-xs">
                متابعة حركة النقد وحجم الطلبات وتوزيع الإيراد
              </CardDescription>
            </div>

            {/* Timeframe Toggle */}
            <div className="flex items-center rounded-xl bg-zinc-100 p-1 dark:bg-[#161924] border border-zinc-200/50 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setSalesTimeframe('daily')}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                  salesTimeframe === 'daily'
                    ? 'bg-white text-zinc-900 shadow-2xs dark:bg-[#202534] dark:text-white'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400'
                }`}
              >
                يومي
              </button>
              <button
                type="button"
                onClick={() => setSalesTimeframe('monthly')}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                  salesTimeframe === 'monthly'
                    ? 'bg-white text-zinc-900 shadow-2xs dark:bg-[#202534] dark:text-white'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400'
                }`}
              >
                شهري
              </button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="h-72 w-full pt-4">
              <Line
                data={salesTimeframe === 'daily' ? dailySalesData : monthlySalesData}
                options={chartOptions}
              />
            </div>
          </CardContent>
        </Card>

        {/* Chart 2: Top Selling Dishes */}
        <Card className="shadow-2xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">
              الأطباق الأكثر طلباً
            </CardTitle>
            <CardDescription className="text-xs">
              أعلى الوجبات مساهمة في الإيراد الكلي
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 w-full relative flex items-center justify-center pt-2">
              <Doughnut data={bestSellersData} options={doughnutOptions} />
            </div>
            <div className="mt-3 text-center">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                الأعلى طلباً:{' '}
                <strong className="text-zinc-900 dark:text-zinc-100 font-bold">{topProducts[0]?.nameAr || 'مارغريتا حطب'}</strong>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Charts: Peak Hours & Kitchen Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 3: Rush Hours */}
        <Card className="lg:col-span-2 shadow-2xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">
              كثافة الطلبات في ساعات الذروة
            </CardTitle>
            <CardDescription className="text-xs">
              توزيع تذاكر الصالة والتوصيل على مدار فترات الغداء والعشاء
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full pt-2">
              <Bar data={orderVolumeData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Operational Alerts */}
        <Card className="shadow-2xs">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              تنبيهات المطبخ والمخزون
            </CardTitle>
            <CardDescription className="text-xs">
              إشعارات تشغيلية مباشرة من خط الإعداد
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/70 p-3 dark:bg-[#161924]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  تنبيه انخفاض المخزون
                </span>
                <Badge variant="warning">تبقى 18 قطعة</Badge>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                كيك الفستق البركاني قارب على النفاد قبل بدء فترة الذروة المسائية.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/70 p-3 dark:bg-[#161924]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  طلب حساب طاولة 04
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">منذ دقيقتين</span>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                الزبون طلب الفاتورة النهائية لتذكرة الصالة #ORD-7821.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/70 p-3 dark:bg-[#161924]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  محطات الطهي والتحضير
                </span>
                <Badge variant="success">جاهزية كاملة</Badge>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                جميع خطوط الشواء والفرن تعمل بكفاءة وسرعة متوازنة دون أي تأخير.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Live Orders Table */}
      <Card className="shadow-2xs">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-bold">أحدث الطلبات الواردة</CardTitle>
            <CardDescription className="text-xs">متابعة حية لطلبات الصالة، التوصيل، والسفري لحظة بلحظة</CardDescription>
          </div>
          <Link to="/orders">
            <Button variant="outline" size="sm" className="gap-1 text-xs font-bold">
              <span>عرض جميع الطلبات ({orders.length})</span>
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="border-b border-zinc-200 text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
                <tr>
                  <th className="pb-3 font-bold">رقم الطلب</th>
                  <th className="pb-3 font-bold">اسم العميل</th>
                  <th className="pb-3 font-bold">نوع الخدمة</th>
                  <th className="pb-3 font-bold">الأصناف المطلوبة</th>
                  <th className="pb-3 font-bold">المجموع</th>
                  <th className="pb-3 font-bold">الحالة</th>
                  <th className="pb-3 font-bold text-left">التوقيت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-[#1e2433]">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50/80 dark:hover:bg-[#181d2a] transition-all duration-150">
                    <td className="py-3.5 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      {order.id}
                    </td>
                    <td className="py-3.5 font-bold text-zinc-800 dark:text-zinc-200">
                      {order.customer}
                    </td>
                    <td className="py-3.5 text-xs text-zinc-500 dark:text-zinc-400">
                      {order.type}
                    </td>
                    <td className="py-3.5 text-xs text-zinc-600 dark:text-zinc-300">
                      {order.items.map((i) => `${i.quantity}x ${i.name}`).join('، ')}
                    </td>
                    <td className="py-3.5 font-bold font-mono text-zinc-900 dark:text-zinc-100">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-3.5">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-3.5 text-left text-xs text-zinc-400 font-medium">
                      {order.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
