import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function ProgressChart({ data = [], id }) {
  const { t } = useI18n();

  const rawData = data.length > 0 ? data : [
    { category: 'Earthworks', planned: 85, actual: 80, variance: -5 },
    { category: 'Pavement Crust', planned: 70, actual: 65, variance: -5 },
    { category: 'Structures', planned: 50, actual: 40, variance: -10 },
    { category: 'Drainage Systems', planned: 50, actual: 50, variance: 0 },
    { category: 'Bituminous Layers', planned: 30, actual: 32, variance: 2 },
    { category: 'Safety & Signage', planned: 15, actual: 10, variance: -5 }
  ];

  const chartData = rawData.map(item => ({
    ...item,
    categoryName: t(item.category, item.category)
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const planned = payload.find(p => p.dataKey === 'planned')?.value || 0;
      const actual = payload.find(p => p.dataKey === 'actual')?.value || 0;
      const variance = actual - planned;

      return (
        <div className="bg-white border border-[#D8E1E8] p-2.5 rounded-md shadow-md text-xs font-mono">
          <div className="font-sans font-bold text-[#16324F] border-b border-[#D8E1E8] pb-1 mb-1.5">
            {label}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between space-x-4 text-[#617386]">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-xs bg-[#A8B4C0]" />
                <span>{t('plannedLegend', 'Planned')}:</span>
              </span>
              <span className="font-semibold text-[#17212B]">{planned}%</span>
            </div>
            <div className="flex justify-between space-x-4 text-[#087F8C]">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-xs bg-[#087F8C]" />
                <span>{t('actualLegend', 'Actual')}:</span>
              </span>
              <span className="font-bold">{actual}%</span>
            </div>
            <div className="flex justify-between space-x-4 pt-1 border-t border-[#D8E1E8]">
              <span className="text-[#617386]">{t('thVariance', 'Variance')}:</span>
              <span className={`font-bold ${variance >= 0 ? 'text-[#16845B]' : 'text-[#C93636]'}`}>
                {variance >= 0 ? `+${variance}%` : `${variance}%`}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id={id} className="bg-white border border-[#D8E1E8] rounded-lg p-4 flex flex-col justify-between h-full shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D8E1E8] gap-2">
        <div>
          <h3 className="text-xs font-bold text-[#16324F] uppercase tracking-wider">
            {t('projectProgressTitle', 'PROJECT PROGRESS')}
          </h3>
          <p className="text-[11px] text-[#617386] mt-0.5">
            {t('projectProgressSubtitle', 'Planned vs actual cumulative progress across active WBS packages')}
          </p>
        </div>

        <div className="flex items-center space-x-3 text-[11px] font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#A8B4C0]" />
            <span className="text-[#617386]">{t('plannedLegend', 'Planned')}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#087F8C]" />
            <span className="text-[#087F8C] font-semibold">{t('actualLegend', 'Actual')}</span>
          </div>
        </div>
      </div>

      <div className="h-60 sm:h-64 w-full mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 15 }} barGap={4}>
            <CartesianGrid strokeDasharray="2 2" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="categoryName"
              stroke="#617386"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#D8E1E8' }}
              interval={0}
            />
            <YAxis
              stroke="#617386"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#D8E1E8' }}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(216, 225, 232, 0.3)' }} />
            <Bar dataKey="planned" fill="#A8B4C0" radius={[2, 2, 0, 0]} name={t('plannedLegend', 'Planned')} maxBarSize={32} />
            <Bar dataKey="actual" fill="#087F8C" radius={[2, 2, 0, 0]} name={t('actualLegend', 'Actual')} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
