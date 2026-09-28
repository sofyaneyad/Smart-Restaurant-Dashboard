import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function getChartThemeOptions(isDark) {
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)';
  const textColor = isDark ? '#a1a1aa' : '#71717a';
  const tooltipBg = isDark ? '#18181b' : '#ffffff';
  const tooltipText = isDark ? '#f4f4f5' : '#18181b';
  const tooltipBorder = isDark ? '#27272a' : '#e4e4e7';

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
          font: { family: 'inherit', size: 12, weight: '500' },
          boxWidth: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16
        }
      },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: tooltipText,
        bodyColor: tooltipText,
        borderColor: tooltipBorder,
        borderWidth: 1,
        padding: 10,
        cornerRadius: 10,
        boxPadding: 4,
        usePointStyle: true,
        titleFont: { weight: '600', size: 12 },
        bodyFont: { size: 12 }
      }
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { size: 11, family: 'inherit' } },
        border: { display: false }
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { size: 11, family: 'inherit' } },
        border: { display: false }
      }
    }
  };
}
