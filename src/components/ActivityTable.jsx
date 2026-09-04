import React, { useState } from 'react';
import { StatusBadge } from './StatusBadge.jsx';
import { Search, ChevronRight } from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function ActivityTable({ activities = [], onSelectActivity, id }) {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const filtered = activities.filter((act) => {
    const matchesSearch =
      act.activity_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.wbs.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'ALL' ||
      act.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div id={id} className="bg-white border border-[#D8E1E8] rounded-lg overflow-hidden shadow-xs">
      <div className="p-4 sm:p-5 border-b border-[#D8E1E8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#16324F]">
            {t('navSchedule', 'Schedule')} & {t('navProgress', 'Progress')}
          </h3>
          <p className="text-xs text-[#617386] mt-0.5">
            {t('Showing', 'Showing')} {filtered.length} {t('of', 'of')} {activities.length} {t('activities', 'tracked work items')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#91A0AE]" />
            <input
              type="text"
              placeholder={t('search', 'Search code, activity, location...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#F5F7F9] border border-[#D8E1E8] text-xs text-[#17212B] pl-8 pr-3 py-1.5 rounded-md focus:outline-none focus:border-[#087F8C] w-48 sm:w-64 placeholder-[#91A0AE]"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#F5F7F9] border border-[#D8E1E8] text-xs text-[#17212B] px-3 py-1.5 rounded-md focus:outline-none focus:border-[#087F8C]"
          >
            <option value="ALL">{t('All Statuses', 'All Statuses')}</option>
            <option value="Critical">{t('Critical', 'Critical')}</option>
            <option value="Delayed">{t('Delayed', 'Delayed')}</option>
            <option value="On Track">{t('On Track', 'On Track')}</option>
            <option value="Completed">{t('Completed', 'Completed')}</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#D8E1E8] text-[#617386] uppercase tracking-wider font-semibold font-mono text-[10px]">
              <th className="py-2.5 px-4">{t('Code', 'Code')}</th>
              <th className="py-2.5 px-4">{t('thActivity', 'Activity Name')}</th>
              <th className="py-2.5 px-4 hidden md:table-cell">{t('thLocation', 'WBS / Location')}</th>
              <th className="py-2.5 px-4 text-right">{t('thPlanned', 'Planned Qty')}</th>
              <th className="py-2.5 px-4 text-right">{t('thActual', 'Actual Qty')}</th>
              <th className="py-2.5 px-4 text-right">{t('thPlanned', 'Planned')}</th>
              <th className="py-2.5 px-4 text-right">{t('thActual', 'Actual')}</th>
              <th className="py-2.5 px-4 text-right">{t('thVariance', 'Variance')}</th>
              <th className="py-2.5 px-4 text-center">{t('thStatus', 'Status')}</th>
              <th className="py-2.5 px-4 text-center">{t('action', 'Action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8E1E8] font-mono">
            {filtered.slice(0, 30).map((act) => {
              const plannedPct = Math.round((act.planned_progress || 0) * 100);
              const actualPct = Math.round((act.actual_progress || 0) * 100);
              const variance = actualPct - plannedPct;
              const isA101 = act.activity_code === "A101";

              return (
                <tr
                  key={act.id}
                  className={`hover:bg-[#F5F7F9] transition-colors ${
                    isA101 ? 'bg-[#E7F5F4]/40 border-l-4 border-l-[#087F8C]' : ''
                  }`}
                >
                  <td className="py-2.5 px-4 font-bold text-[#087F8C] font-mono">
                    {act.activity_code}
                  </td>
                  <td className="py-2.5 px-4 font-sans font-medium text-[#17212B]">
                    <div className="flex items-center space-x-1.5">
                      <span>{t(act.name, act.name)}</span>
                      {isA101 && (
                        <span className="text-[10px] bg-[#E7F5F4] text-[#087F8C] border border-[#087F8C]/30 px-1.5 py-0.2 rounded font-mono font-medium">
                          {t('quickDemo', 'Golden Demo')}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-4 hidden md:table-cell font-sans text-[#617386]">
                    <div>{act.wbs}</div>
                    <div className="text-[11px] text-[#91A0AE]">{act.location}</div>
                  </td>
                  <td className="py-2.5 px-4 text-right text-[#617386]">
                    {act.planned_quantity?.toLocaleString()} <span className="text-[#91A0AE]">{act.unit}</span>
                  </td>
                  <td className="py-2.5 px-4 text-right text-[#17212B] font-semibold">
                    {act.actual_quantity?.toLocaleString()} <span className="text-[#91A0AE]">{act.unit}</span>
                  </td>
                  <td className="py-2.5 px-4 text-right text-[#3977A9] font-semibold">
                    {plannedPct}%
                  </td>
                  <td className="py-2.5 px-4 text-right text-[#087F8C] font-semibold">
                    {actualPct}%
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <span
                      className={`font-semibold ${
                        variance > 0
                          ? 'text-[#16845B]'
                          : variance < 0
                          ? 'text-[#C93636]'
                          : 'text-[#617386]'
                      }`}
                    >
                      {variance > 0 ? `+${variance}%` : `${variance}%`}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-center font-sans">
                    <StatusBadge status={act.status} size="sm" />
                  </td>
                  <td className="py-2.5 px-4 text-center font-sans">
                    <button
                      onClick={() => onSelectActivity && onSelectActivity(act.activity_code)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white hover:bg-[#F5F7F9] text-[#16324F] border border-[#D8E1E8] text-xs font-semibold transition-colors cursor-pointer"
                      title="Inspect evidence & audit trail"
                    >
                      <span>Trace</span>
                      <ChevronRight size={12} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-8 text-center text-[#617386] text-xs">
            No activities matched your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
