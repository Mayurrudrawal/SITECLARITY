import React from 'react';
import { ChevronRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function CriticalActivitiesTable({ activities = [], onSelectActivity, id }) {
  const { t } = useI18n();

  const criticalList = activities
    .map(act => {
      const planned = Math.round((act.planned_progress || 0) * 100);
      const actual = Math.round((act.actual_progress || 0) * 100);
      const variance = actual - planned;
      return {
        ...act,
        plannedPct: planned,
        actualPct: actual,
        varianceVal: variance
      };
    })
    .filter(act => act.varianceVal < 0)
    .sort((a, b) => a.varianceVal - b.varianceVal)
    .slice(0, 6);

  return (
    <div id={id} className="bg-white border border-[#D8E1E8] rounded-lg p-4 flex flex-col justify-between shadow-xs">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#D8E1E8]">
          <div>
            <h3 className="text-xs font-bold text-[#16324F] uppercase tracking-wider flex items-center space-x-2">
              <span>{t('criticalActivitiesTitle', 'Critical Activities')}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold bg-[#FDECEC] text-[#C93636] border border-[#C93636]/30">
                {criticalList.length} {t('flaggedBadge', 'Flagged')}
              </span>
            </h3>
            <p className="text-[11px] text-[#617386] mt-0.5">
              {t('criticalActivitiesSubtitle', 'Priority schedule slippages requiring immediate site coordination')}
            </p>
          </div>
        </div>

        {/* Compact Table */}
        <div className="overflow-x-auto mt-2 -mx-4 sm:mx-0">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#617386] border-b border-[#D8E1E8] font-mono text-[10px] uppercase">
              <tr>
                <th className="py-2 px-3">{t('thActivity', 'Activity')}</th>
                <th className="py-2 px-3">{t('thLocation', 'Location')}</th>
                <th className="py-2 px-2 text-right">{t('thPlanned', 'Planned')}</th>
                <th className="py-2 px-2 text-right">{t('thActual', 'Actual')}</th>
                <th className="py-2 px-2 text-right">{t('thVariance', 'Variance')}</th>
                <th className="py-2 px-3 text-center">{t('thStatus', 'Status')}</th>
                <th className="py-2 px-2 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8E1E8] font-sans">
              {criticalList.map((act) => {
                return (
                  <tr
                    key={act.id}
                    onClick={() => onSelectActivity && onSelectActivity(act.activity_code)}
                    className="hover:bg-[#F5F7F9] cursor-pointer transition-colors group"
                  >
                    <td className="py-2.5 px-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-[#087F8C]">
                          {act.activity_code}
                        </span>
                        <span className="text-[#17212B] font-medium truncate max-w-[150px] lg:max-w-[200px]" title={act.name}>
                          {t(act.name, act.name)}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-[#617386] text-[11px] truncate max-w-[110px]">
                      {act.chainage_range || act.location}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-[#617386] text-[11px]">
                      {act.plannedPct}%
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-[#17212B] font-semibold text-[11px]">
                      {act.actualPct}%
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-bold text-[11px] text-[#C93636]">
                      {act.varianceVal}%
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <StatusBadge status={act.status} size="sm" />
                    </td>
                    <td className="py-2.5 px-2 text-right text-[#91A0AE] group-hover:text-[#087F8C]">
                      <ChevronRight size={14} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-[#D8E1E8] flex items-center justify-between text-[11px] text-[#617386]">
        <span>{t('clickRowInspectPrompt', 'Click any row to inspect work package quantities & execution history')}</span>
      </div>
    </div>
  );
}
