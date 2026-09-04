import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Clock,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function DelaysPage({ activities = [], onSelectActivity, id }) {
  const { t } = useI18n();
  // Sort critical issues first (-10% or worse), then other delayed activities
  const delayedActivities = activities
    .map((act) => {
      const planned = Math.round((act.planned_progress || 0) * 100);
      const actual = Math.round((act.actual_progress || 0) * 100);
      const variance = actual - planned;
      return {
        ...act,
        plannedPct: planned,
        actualPct: actual,
        varianceVal: variance,
        isCritical: variance <= -10
      };
    })
    .filter((act) => act.varianceVal < 0)
    .sort((a, b) => a.varianceVal - b.varianceVal);

  const criticalCount = delayedActivities.filter(a => a.isCritical).length;
  const delayedCount = delayedActivities.length;
  const atRiskCount = 4;
  const recoveringCount = 1;

  return (
    <div id={id} className="space-y-4">
      {/* 1. Header Banner */}
      <div className="bg-white border border-[#D8E1E8] rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#16324F] uppercase tracking-wide flex items-center space-x-2">
            <span>DELAYS & ALERTS</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold bg-[#FDECEC] text-[#C93636] border border-[#C93636]/30">
              Schedule Slippage Matrix
            </span>
          </h2>
          <p className="text-xs text-[#617386] mt-0.5">
            Prioritized by variance severity to enable immediate project management interventions
          </p>
        </div>
      </div>

      {/* 2. Summary Strip (7 Delayed, 2 Critical, 4 At Risk, 1 Recovering) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="bg-white border border-[#D8E1E8] rounded-lg p-3.5 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#C98200] block">Delayed</span>
            <span className="text-xl font-bold text-[#17212B] mt-0.5 block">{delayedCount}</span>
          </div>
          <AlertTriangle size={18} className="text-[#C98200]" />
        </div>

        <div className="bg-[#FDECEC] border border-[#C93636]/30 rounded-lg p-3.5 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#C93636] block">Critical</span>
            <span className="text-xl font-bold text-[#C93636] mt-0.5 block">{criticalCount}</span>
          </div>
          <AlertOctagon size={18} className="text-[#C93636]" />
        </div>

        <div className="bg-[#FFF5DD] border border-[#C98200]/30 rounded-lg p-3.5 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#C98200] block">At Risk</span>
            <span className="text-xl font-bold text-[#C98200] mt-0.5 block">{atRiskCount}</span>
          </div>
          <Clock size={18} className="text-[#C98200]" />
        </div>

        <div className="bg-[#E8F5EF] border border-[#16845B]/30 rounded-lg p-3.5 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#16845B] block">Recovering</span>
            <span className="text-xl font-bold text-[#16845B] mt-0.5 block">{recoveringCount}</span>
          </div>
          <ShieldAlert size={18} className="text-[#16845B]" />
        </div>
      </div>

      {/* 3. Prioritized Exception Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {delayedActivities.map((act) => {
          const isCritical = act.isCritical;
          const completedQty = Math.round((act.planned_quantity || 1000) * (act.actual_progress || 0.5));

          return (
            <div
              key={act.id}
              className={`border rounded-lg p-4 sm:p-5 flex flex-col justify-between shadow-xs transition-colors ${
                isCritical
                  ? 'bg-white border-2 border-[#C93636]/40'
                  : 'bg-white border border-[#D8E1E8]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between pb-3 border-b border-[#D8E1E8]">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isCritical ? 'bg-[#FDECEC] text-[#C93636] border border-[#C93636]/30' : 'bg-[#FFF5DD] text-[#C98200] border border-[#C98200]/30'
                      }`}>
                        {isCritical ? 'CRITICAL' : 'DELAYED'}
                      </span>
                      <span className="font-mono font-bold text-[#087F8C] text-sm">
                        {act.activity_code}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#16324F]">
                      {act.name}
                    </h4>
                    <p className="text-[11px] text-[#617386] font-mono">
                      Location: <strong className="text-[#17212B]">{act.chainage_range || act.location}</strong>
                    </p>
                  </div>

                  <StatusBadge status={isCritical ? "Critical" : "Delayed"} size="sm" />
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 my-3 font-mono text-center text-xs">
                  <div className="bg-[#F5F7F9] p-2 rounded-md border border-[#D8E1E8]">
                    <span className="text-[10px] text-[#617386] block">Planned</span>
                    <span className="font-bold text-[#16324F]">{act.plannedPct}%</span>
                  </div>
                  <div className="bg-[#F5F7F9] p-2 rounded-md border border-[#D8E1E8]">
                    <span className="text-[10px] text-[#617386] block">Actual</span>
                    <span className="font-bold text-[#087F8C]">{act.actualPct}%</span>
                  </div>
                  <div className="bg-[#F5F7F9] p-2 rounded-md border border-[#D8E1E8]">
                    <span className="text-[10px] text-[#617386] block">Variance</span>
                    <span className="font-bold text-[#C93636]">{act.varianceVal}%</span>
                  </div>
                </div>

                {/* Progress Details */}
                <div className="space-y-1 text-xs font-mono text-[#617386]">
                  <div className="flex justify-between">
                    <span>Certified Completed:</span>
                    <span className="font-bold text-[#17212B]">
                      {completedQty.toLocaleString()} of {act.planned_quantity?.toLocaleString() || "10,000"} {act.unit || "m³"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Evidence records:</span>
                    <span className="text-[#087F8C] font-bold">
                      {act.evidence_records_count || (act.activity_code === "A104" ? 3 : 2)} certified docs
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-[#D8E1E8] flex justify-end">
                <button
                  onClick={() => onSelectActivity && onSelectActivity(act.activity_code)}
                  className="px-3.5 py-1.5 bg-white hover:bg-[#F5F7F9] text-[#16324F] text-xs font-semibold rounded-md border border-[#D8E1E8] flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>View Activity</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
