import React, { useState } from 'react';
import { 
  ArrowUpRight,
  SlidersHorizontal,
  Save,
  CheckCircle2,
  TrendingUp,
  Clock,
  DollarSign,
  Users
} from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useTheme } from '../context/ThemeContext';
import { useRestaurant } from '../context/RestaurantContext';
import { getChartThemeOptions } from '../lib/chartConfig';
import { motion, AnimatePresence } from 'framer-motion';

export function Analytics() {
  const { isDark } = useTheme();
  const { 
    analyticsTimeRange, 
    setAnalyticsTimeRange, 
    analyticsTargets, 
    updateAnalyticsTargets 
  } = useRestaurant();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state for editing targets of the current period
  const currentTargets = analyticsTargets[analyticsTimeRange] || analyticsTargets.month;
  const [formTargets, setFormTargets] = useState({
    targetRevenue: currentTargets.targetRevenue,
    profitMargin: currentTargets.profitMargin,
    tableTime: currentTargets.tableTime,
    avgTicket: currentTargets.avgTicket
  });

  const chartOptions = getChartThemeOptions(isDark);

  // Handle switching time ranges
  const handleRangeChange = (range) => {
    setAnalyticsTimeRange(range);
    const nextTargets = analyticsTargets[range] || analyticsTargets.month;
    setFormTargets({
      targetRevenue: nextTargets.targetRevenue,
      profitMargin: nextTargets.profitMargin,
      tableTime: nextTargets.tableTime,
      avgTicket: nextTargets.avgTicket
    });
  };

  // Handle saving customized target goals
  const handleSaveTargets = (e) => {
    e.preventDefault();
    updateAnalyticsTargets(analyticsTimeRange, {
      targetRevenue: Number(formTargets.targetRevenue),
      profitMargin: Number(formTargets.profitMargin),
      tableTime: Number(formTargets.tableTime),
      avgTicket: Number(formTargets.avgTicket)
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditModalOpen(false);
    }, 1200);
  };

  // Period-specific configurations
  const periodData = {
    week: {
      title: 'هذا الأسبوع',
      revenueTitle: 'الإيراد الفعلي مقابل الهدف الأسبوعي',
      revenueDesc: 'قراءة يومية مباشرة لمبيعات أيام الأسبوع من السبت إلى الجمعة',
      labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
      actualRevenue: [4800, 4200, 5100, 5600, 7200, 9400, 9800],
      targetRevenue: [
        Math.round((currentTargets.targetRevenue * 0.11)),
        Math.round((currentTargets.targetRevenue * 0.10)),
        Math.round((currentTargets.targetRevenue * 0.12)),
        Math.round((currentTargets.targetRevenue * 0.13)),
        Math.round((currentTargets.targetRevenue * 0.17)),
        Math.round((currentTargets.targetRevenue * 0.23)),
        Math.round((currentTargets.targetRevenue * 0.24))
      ],
      channels: [46, 38, 16],
      channelValues: { dineIn: '$21,200', delivery: '$17,500', takeaway: '$7,400' },
      channelPercentages: { dineIn: '46%', delivery: '38%', takeaway: '16%' },
      categories: [12400, 10800, 5900, 4800, 3600, 5200, 3400],
      kpi: {
        profit: `${currentTargets.profitMargin}%`,
        profitSub: 'تكلفة طعام محسنة بمعدل +3.8%',
        tableTime: `${currentTargets.tableTime} دقيقة`,
        tableSub: 'سرعة تحضير عالية بأوقات الذروة',
        avgTicket: `$${currentTargets.avgTicket.toFixed(2)}`,
        avgTicketSub: '+$2.80 مقارنة بالأسبوع الماضي',
        loyalty: '58.4%',
        loyaltySub: 'زيارات متكررة لنفس الضيوف'
      }
    },
    month: {
      title: 'هذا الشهر',
      revenueTitle: 'الإيراد الفعلي مقابل الهدف الشهري',
      revenueDesc: 'مقارنة الأداء المالي الأسبوعي للشهر الحالي مع المخطط التقديري',
      labels: ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'],
      actualRevenue: [12800, 14200, 13900, 16500],
      targetRevenue: [
        Math.round(currentTargets.targetRevenue * 0.23),
        Math.round(currentTargets.targetRevenue * 0.25),
        Math.round(currentTargets.targetRevenue * 0.25),
        Math.round(currentTargets.targetRevenue * 0.27)
      ],
      channels: [54, 30, 16],
      channelValues: { dineIn: '$31,000', delivery: '$17,200', takeaway: '$9,200' },
      channelPercentages: { dineIn: '54%', delivery: '30%', takeaway: '16%' },
      categories: [14200, 18500, 9800, 8400, 6900, 12800, 7600],
      kpi: {
        profit: `${currentTargets.profitMargin}%`,
        profitSub: 'تكلفة الطعام محسنة بمعدل 2.4%',
        tableTime: `${currentTargets.tableTime} دقيقة`,
        tableSub: 'متوسط وقت جلوس الزبون بالصالة',
        avgTicket: `$${currentTargets.avgTicket.toFixed(2)}`,
        avgTicketSub: 'مدعوم بزيادة طلبات المشروبات',
        loyalty: '62.1%',
        loyaltySub: 'أكثر من زيارتين شهرياً للعميل'
      }
    },
    year: {
      title: '2026',
      revenueTitle: 'الإيراد الفعلي مقابل الهدف السنوي 2026',
      revenueDesc: 'القراءة المالية الشاملة لجميع أشهر العام والنمو السنوي التراكمي',
      labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      actualRevenue: [48000, 52000, 59000, 56000, 64000, 71000, 78000, 82000, 76000, 69000, 74000, 89000],
      targetRevenue: [
        Math.round(currentTargets.targetRevenue * 0.06),
        Math.round(currentTargets.targetRevenue * 0.065),
        Math.round(currentTargets.targetRevenue * 0.075),
        Math.round(currentTargets.targetRevenue * 0.075),
        Math.round(currentTargets.targetRevenue * 0.08),
        Math.round(currentTargets.targetRevenue * 0.085),
        Math.round(currentTargets.targetRevenue * 0.095),
        Math.round(currentTargets.targetRevenue * 0.10),
        Math.round(currentTargets.targetRevenue * 0.09),
        Math.round(currentTargets.targetRevenue * 0.085),
        Math.round(currentTargets.targetRevenue * 0.09),
        Math.round(currentTargets.targetRevenue * 0.10)
      ],
      channels: [58, 28, 14],
      channelValues: { dineIn: '$474,400', delivery: '$229,000', takeaway: '$114,600' },
      channelPercentages: { dineIn: '58%', delivery: '28%', takeaway: '14%' },
      categories: [158000, 194000, 112000, 96000, 78000, 145000, 84000],
      kpi: {
        profit: `${currentTargets.profitMargin}%`,
        profitSub: 'نمو سنوي بمعدل +5.4%',
        tableTime: `${currentTargets.tableTime} دقيقة`,
        tableSub: 'معدل سنوي ممتاز للمطعم',
        avgTicket: `$${currentTargets.avgTicket.toFixed(2)}`,
        avgTicketSub: 'نمو سنوي بمعدل +$6.80',
        loyalty: '66.5%',
        loyaltySub: 'قاعدة عملاء ولاء متنامية'
      }
    }
  };

  const currentData = periodData[analyticsTimeRange] || periodData.month;

  // 1. Revenue vs Target Bar Chart
  const revenueVsTargetData = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'الإيراد الفعلي ($)',
        data: currentData.actualRevenue,
        backgroundColor: '#10b981', // Emerald
        borderRadius: 4
      },
      {
        label: 'الهدف التقديري ($)',
        data: currentData.targetRevenue,
        backgroundColor: isDark ? '#1e2433' : '#e4e4e7',
        borderRadius: 4
      }
    ]
  };

  // 2. Channel Distribution Doughnut Chart
  const channelData = {
    labels: ['محلي (الصالة)', 'توصيل منزلي', 'سفري (استلام)'],
    datasets: [
      {
        data: currentData.channels,
        backgroundColor: ['#10b981', '#0284c7', '#64748b'],
        borderWidth: 2,
        borderColor: isDark ? '#11141d' : '#ffffff'
      }
    ]
  };

  // 3. Category Sales Horizontal Bar Chart
  const categorySalesData = {
    labels: ['برجر', 'بيتزا', 'باستا', 'مشروبات', 'حلويات', 'ستيك ومشاوي', 'مقبلات'],
    datasets: [
      {
        label: 'الإيراد حسب القسم ($)',
        data: currentData.categories,
        backgroundColor: [
          '#10b981',
          '#0284c7',
          '#3b82f6',
          '#0d9488',
          '#f59e0b',
          '#ec4899',
          '#8b5cf6'
        ],
        borderRadius: 4
      }
    ]
  };

  const horizontalBarOptions = {
    ...chartOptions,
    indexAxis: 'y',
    plugins: {
      ...chartOptions.plugins,
      legend: { display: false }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Switcher and Edit Target trigger */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            التحليلات المالية والتقارير
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            قراءة دقيقة لهوامش الربحية، قنوات البيع، وأداء أقسام قائمة الطعام لـ ({currentData.title}).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Time range switchers (Synchronized and Preserved) */}
          <div className="flex rounded-xl bg-zinc-100 p-1 dark:bg-[#161a26] border border-zinc-200/50 dark:border-[#1e2433]">
            <button
              onClick={() => handleRangeChange('week')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                analyticsTimeRange === 'week' 
                  ? 'bg-white text-zinc-950 shadow-2xs dark:bg-[#202738] dark:text-white' 
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
            >
              هذا الأسبوع
            </button>
            <button
              onClick={() => handleRangeChange('month')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                analyticsTimeRange === 'month' 
                  ? 'bg-white text-zinc-950 shadow-2xs dark:bg-[#202738] dark:text-white' 
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
            >
              هذا الشهر
            </button>
            <button
              onClick={() => handleRangeChange('year')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                analyticsTimeRange === 'year' 
                  ? 'bg-white text-zinc-950 shadow-2xs dark:bg-[#202738] dark:text-white' 
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
            >
              2026
            </button>
          </div>

          {/* Edit Targets Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            className="gap-1.5 text-xs font-bold"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>تعديل المستهدفات</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards (Dynamic according to selected period) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-2xs">
          <CardContent className="p-5">
            <span className="text-xs text-zinc-400 font-bold">هامش الربح الإجمالي</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-50">
                {currentData.kpi.profit}
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center font-mono">
                <ArrowUpRight className="h-3.5 w-3.5" />
                +3.2%
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-mono">
              {currentData.kpi.profitSub}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-2xs">
          <CardContent className="p-5">
            <span className="text-xs text-zinc-400 font-bold">معدل دوران الطاولة</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-50">
                {currentData.kpi.tableTime}
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center font-mono">
                <ArrowUpRight className="h-3.5 w-3.5" />
                مثالي
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              {currentData.kpi.tableSub}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-2xs">
          <CardContent className="p-5">
            <span className="text-xs text-zinc-400 font-bold">متوسط الفاتورة الواحدة</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-50">
                {currentData.kpi.avgTicket}
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center font-mono">
                <ArrowUpRight className="h-3.5 w-3.5" />
                +4.5%
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              {currentData.kpi.avgTicketSub}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-2xs">
          <CardContent className="p-5">
            <span className="text-xs text-zinc-400 font-bold">نسبة عودة الضيوف</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-50">
                {currentData.kpi.loyalty}
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center font-mono">
                <ArrowUpRight className="h-3.5 w-3.5" />
                +5.8%
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              {currentData.kpi.loyaltySub}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actual vs Target Revenue */}
        <Card className="lg:col-span-2 shadow-2xs">
          <CardHeader>
            <CardTitle className="text-base font-bold">
              {currentData.revenueTitle}
            </CardTitle>
            <CardDescription className="text-xs">
              {currentData.revenueDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full pt-2">
              <Bar data={revenueVsTargetData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Order Channel Distribution */}
        <Card className="shadow-2xs">
          <CardHeader>
            <CardTitle className="text-base font-bold">توزيع المبيعات حسب القناة</CardTitle>
            <CardDescription className="text-xs">
              نسبة إيرادات الصالة مقابل التوصيل والسفري لـ ({currentData.title})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 w-full relative flex items-center justify-center">
              <Doughnut
                data={channelData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { 
                        color: isDark ? '#a1a1aa' : '#52525b', 
                        boxWidth: 8, 
                        usePointStyle: true, 
                        font: { family: 'Tajawal', size: 11 } 
                      }
                    }
                  },
                  cutout: '70%'
                }}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-zinc-50 dark:bg-[#161a26] border border-zinc-200/60 dark:border-[#1e2433]">
                <span className="font-bold font-mono text-zinc-900 dark:text-zinc-100 block">
                  {currentData.channelPercentages.dineIn}
                </span>
                <span className="text-zinc-500 text-[11px]">الصالة</span>
                <span className="text-[10px] text-zinc-400 block font-mono">{currentData.channelValues.dineIn}</span>
              </div>
              <div className="p-2 rounded-xl bg-zinc-50 dark:bg-[#161a26] border border-zinc-200/60 dark:border-[#1e2433]">
                <span className="font-bold font-mono text-zinc-900 dark:text-zinc-100 block">
                  {currentData.channelPercentages.delivery}
                </span>
                <span className="text-zinc-500 text-[11px]">التوصيل</span>
                <span className="text-[10px] text-zinc-400 block font-mono">{currentData.channelValues.delivery}</span>
              </div>
              <div className="p-2 rounded-xl bg-zinc-50 dark:bg-[#161a26] border border-zinc-200/60 dark:border-[#1e2433]">
                <span className="font-bold font-mono text-zinc-900 dark:text-zinc-100 block">
                  {currentData.channelPercentages.takeaway}
                </span>
                <span className="text-zinc-500 text-[11px]">السفري</span>
                <span className="text-[10px] text-zinc-400 block font-mono">{currentData.channelValues.takeaway}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance Breakdown */}
      <Card className="shadow-2xs">
        <CardHeader>
          <CardTitle className="text-base font-bold">الإيراد حسب تصنيف قائمة الطعام</CardTitle>
          <CardDescription className="text-xs">
            تحليل مالي للأقسام الأعلى توليداً للأرباح والمبيعات خلال ({currentData.title})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <Bar data={categorySalesData} options={horizontalBarOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Modal: Edit Period Target Goals */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`تعديل المستهدفات المالية لـ (${currentData.title})`}
        description="تعديل أهداف المبيعات وهوامش الربحية لتنعكس مباشرة في المخططات والرسوم البيانية."
      >
        <form onSubmit={handleSaveTargets} className="space-y-4">
          <AnimatePresence>
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>تم تحديث المستهدفات وحفظها بنجاح!</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              المستهدف المالي الإجمالي للفترة ($)
            </label>
            <div className="relative">
              <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                type="number"
                value={formTargets.targetRevenue}
                onChange={(e) => setFormTargets({ ...formTargets, targetRevenue: e.target.value })}
                className="pr-9"
                required
              />
            </div>
            <span className="text-[11px] text-zinc-400 mt-1 block">
              سيتم توزيع هذا المستهدف على أيام/أسابيع الفترة في الرسم البياني
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                هامش الربح المستهدف (%)
              </label>
              <Input
                type="number"
                step="0.1"
                value={formTargets.profitMargin}
                onChange={(e) => setFormTargets({ ...formTargets, profitMargin: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                زمن دوران الطاولة (دقيقة)
              </label>
              <Input
                type="number"
                value={formTargets.tableTime}
                onChange={(e) => setFormTargets({ ...formTargets, tableTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              متوسط قيمة الفاتورة المتوقعة ($)
            </label>
            <Input
              type="number"
              step="0.1"
              value={formTargets.avgTicket}
              onChange={(e) => setFormTargets({ ...formTargets, avgTicket: e.target.value })}
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              variant="default"
              size="sm"
              className="gap-2 font-bold"
            >
              <Save className="h-4 w-4" />
              <span>حفظ وتطبيق المستهدفات</span>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
