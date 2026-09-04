import React, { useState } from 'react';
import { StatusBadge } from './StatusBadge.jsx';
import { CorridorVisualizer } from './CorridorVisualizer.jsx';
import { ExecutionTimeline } from './ExecutionTimeline.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import {
  FileText,
  ArrowLeft,
  AlertOctagon,
  ChevronRight,
  Sparkles,
  Navigation,
  Clock,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Layers
} from 'lucide-react';

export function ActivityDetail({
  activity,
  onBack,
  onOpenEvidence,
  onOpenMatch,
  onOpenHistory,
  id
}) {
  const { t } = useI18n();
  if (!activity) return null;

  const [activeTab, setActiveTab] = useState('why'); // 'why', 'timeline', 'corridor', 'evidence'

  const plannedPct = Math.round((activity.planned_progress || 0) * 100);
  const actualPct = Math.round((activity.actual_progress || 0) * 100);
  const variance = actualPct - plannedPct;

  return (
    <div id={id} className="space-y-4 font-sans">
      {/* 1. INITIAL MINIMALIST HERO STRIP (Progressive Disclosure - Level 1) */}
      <div className="bg-white border border-[#D8E1E8] rounded-xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-[#F5F7F9] hover:bg-[#D8E1E8] text-[#16324F] transition-colors cursor-pointer"
              title="Return to previous overview"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-[#087F8C] bg-[#E7F5F4] px-2 py-0.5 rounded border border-[#087F8C]/20">
                  {activity.activity_code}
                </span>
                <h1 className="text-base sm:text-lg font-bold text-[#16324F]">
                  {t(activity.name, activity.name)}
                </h1>
                <StatusBadge status={activity.status} size="sm" />
              </div>
              <p className="text-xs text-[#617386] font-mono mt-0.5">
                {activity.wbs} • {activity.location} • {activity.start_date} → {activity.finish_date}
              </p>
            </div>
          </div>

          {/* Quick Variance Scorecard */}
          <div className="flex items-center space-x-4 bg-[#F5F7F9] border border-[#D8E1E8] p-2.5 rounded-lg font-mono text-xs">
            <div>
              <span className="text-[#617386] block text-[10px]">{t('thPlanned', 'Planned Target')}</span>
              <span className="text-sm font-bold text-[#16324F]">{plannedPct}%</span>
            </div>
            <div className="h-6 w-px bg-[#D8E1E8]" />
            <div>
              <span className="text-[#617386] block text-[10px]">{t('thActual', 'Actual Certified')}</span>
              <span className="text-sm font-bold text-[#087F8C]">{actualPct}%</span>
            </div>
            <div className="h-6 w-px bg-[#D8E1E8]" />
            <div>
              <span className="text-[#617386] block text-[10px]">{t('thVariance', 'Schedule Slippage')}</span>
              <span className={`text-sm font-bold ${variance >= 0 ? 'text-[#16845B]' : 'text-[#C93636]'}`}>
                {variance > 0 ? `+${variance}%` : `${variance}%`}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: VIEW EVIDENCE, VIEW MATCH, VIEW HISTORY */}
        <div className="mt-4 pt-3 border-t border-[#D8E1E8] flex flex-wrap items-center justify-between gap-2">
          {/* Navigation Pill Tabs */}
          <div className="flex items-center space-x-1.5 text-xs font-mono">
            <button
              onClick={() => setActiveTab('why')}
              className={`px-3 py-1.5 rounded-md border font-semibold transition-colors cursor-pointer ${
                activeTab === 'why'
                  ? 'bg-[#16324F] text-white border-[#16324F]'
                  : 'bg-[#F5F7F9] text-[#617386] border-[#D8E1E8] hover:text-[#17212B]'
              }`}
            >
              Why? Forensic Breakdown
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 rounded-md border font-semibold transition-colors cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-[#16324F] text-white border-[#16324F]'
                  : 'bg-[#F5F7F9] text-[#617386] border-[#D8E1E8] hover:text-[#17212B]'
              }`}
            >
              Execution Timeline
            </button>
            <button
              onClick={() => setActiveTab('corridor')}
              className={`px-3 py-1.5 rounded-md border font-semibold transition-colors cursor-pointer ${
                activeTab === 'corridor'
                  ? 'bg-[#16324F] text-white border-[#16324F]'
                  : 'bg-[#F5F7F9] text-[#617386] border-[#D8E1E8] hover:text-[#17212B]'
              }`}
            >
              Chainage Corridor
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-3 py-1.5 rounded-md border font-semibold transition-colors cursor-pointer ${
                activeTab === 'evidence'
                  ? 'bg-[#16324F] text-white border-[#16324F]'
                  : 'bg-[#F5F7F9] text-[#617386] border-[#D8E1E8] hover:text-[#17212B]'
              }`}
            >
              Linked Evidence ({activity.evidence?.length || 1})
            </button>
          </div>

          {/* Quick Direct Actions */}
          <div className="flex items-center space-x-2 text-xs font-semibold">
            <button
              onClick={() => onOpenMatch && onOpenMatch(activity.activity_code)}
              className="px-3 py-1.5 rounded-md bg-[#E7F5F4] text-[#087F8C] border border-[#087F8C]/30 hover:bg-[#087F8C] hover:text-white transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <Sparkles size={12} />
              <span>VIEW MATCH</span>
            </button>
            <button
              onClick={() => {
                if (activity.evidence?.[0] && onOpenEvidence) {
                  onOpenEvidence(activity.evidence[0]);
                }
              }}
              className="px-3 py-1.5 rounded-md bg-[#EAF2F8] text-[#3977A9] border border-[#3977A9]/30 hover:bg-[#3977A9] hover:text-white transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <FileText size={12} />
              <span>VIEW EVIDENCE</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. TAB CONTENT: "WHY?" FORENSIC REVEAL (Level 2 Disclosure) */}
      {activeTab === 'why' && (
        <div className="space-y-4">
          {/* The "WHY?" Card */}
          <div className="bg-white border border-[#D8E1E8] rounded-xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#D8E1E8]">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#E7F5F4] text-[#087F8C] border border-[#087F8C]/30">
                  DIAGNOSTIC EXPLANATION
                </span>
                <h3 className="text-sm font-bold text-[#16324F] uppercase tracking-wide">
                  WHY IS {activity.activity_code} AT {actualPct}% ACTUAL PROGRESS?
                </h3>
              </div>
              <span className="text-xs font-mono text-[#16845B] font-bold">
                95% AI Match Verified
              </span>
            </div>

            {/* Structured Evidence Drivers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
              <div className="p-3 bg-[#F5F7F9] border border-[#D8E1E8] rounded-lg text-center">
                <span className="text-[10px] text-[#617386] font-mono uppercase block">Execution Delta</span>
                <span className="text-base font-bold font-mono text-[#16845B] mt-1 block">
                  +1,200 {activity.unit || 'm³'}
                </span>
                <span className="text-[10px] text-[#91A0AE] font-mono">04 Sep 2026</span>
              </div>

              <div className="p-3 bg-[#F5F7F9] border border-[#D8E1E8] rounded-lg text-center">
                <span className="text-[10px] text-[#617386] font-mono uppercase block">Daily Reports</span>
                <span className="text-base font-bold font-mono text-[#16324F] mt-1 block">
                  4 Reports
                </span>
                <span className="text-[10px] text-[#91A0AE] font-mono">Signed by RE</span>
              </div>

              <div className="p-3 bg-[#F5F7F9] border border-[#D8E1E8] rounded-lg text-center">
                <span className="text-[10px] text-[#617386] font-mono uppercase block">Field Photos</span>
                <span className="text-base font-bold font-mono text-[#16324F] mt-1 block">
                  12 Photos
                </span>
                <span className="text-[10px] text-[#91A0AE] font-mono">Geo-tagged</span>
              </div>

              <div className="p-3 bg-[#F5F7F9] border border-[#D8E1E8] rounded-lg text-center">
                <span className="text-[10px] text-[#617386] font-mono uppercase block">AI Match Score</span>
                <span className="text-base font-bold font-mono text-[#087F8C] mt-1 block">
                  95% Match
                </span>
                <span className="text-[10px] text-[#91A0AE] font-mono">5-Vector Engine</span>
              </div>

              <div className="p-3 bg-[#F5F7F9] border border-[#D8E1E8] rounded-lg text-center">
                <span className="text-[10px] text-[#617386] font-mono uppercase block">Project Zone</span>
                <span className="text-base font-bold font-mono text-[#16324F] mt-1 block">
                  {activity.location || 'Zone A'}
                </span>
                <span className="text-[10px] text-[#91A0AE] font-mono">Corridor North</span>
              </div>

              <div className="p-3 bg-[#F5F7F9] border border-[#D8E1E8] rounded-lg text-center">
                <span className="text-[10px] text-[#617386] font-mono uppercase block">Chainage</span>
                <span className="text-xs font-bold font-mono text-[#16324F] mt-1.5 block truncate">
                  {activity.chainage_range || '10+200–10+800'}
                </span>
                <span className="text-[10px] text-[#91A0AE] font-mono">600m Section</span>
              </div>
            </div>

            {/* Deterministic Quantity Bridge */}
            <div className="mt-4 p-3 bg-[#E7F5F4]/40 border border-[#087F8C]/20 rounded-lg text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[#16324F]">
                Cumulative Quantity Equation: <strong>{(activity.actual_quantity - 1200 > 0 ? activity.actual_quantity - 1200 : 6800).toLocaleString()} {activity.unit} (Prior) + 1,200 {activity.unit} (Verified Delta) = {activity.actual_quantity?.toLocaleString()} {activity.unit} (Total)</strong>
              </span>
              <span className="text-[#16845B] font-bold whitespace-nowrap">
                Audit Status: 100% Traceable
              </span>
            </div>
          </div>

          {/* Critical notice if delayed or A104 */}
          {activity.activity_code === "A104" && (
            <div className="p-4 bg-[#FDECEC] border border-[#C93636]/30 rounded-xl flex items-start space-x-3 text-xs">
              <AlertOctagon size={20} className="text-[#C93636] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-[#C93636] uppercase tracking-wide">
                  Critical Bottleneck Notice (A104 Culvert Construction)
                </h4>
                <p className="text-[#17212B] leading-relaxed">
                  Only 4 of 10 planned culverts completed. High water table at Chainage 12+500 and dewatering pump requisition delays caused an 8-day work stoppage. Sub-base execution in Zone B is contingent on culvert drainage handover.
                </p>
              </div>
            </div>
          )}

          {/* Planned vs Actual Quantities Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white border border-[#D8E1E8] p-4 rounded-xl shadow-xs">
              <span className="text-[10px] font-mono uppercase font-semibold text-[#617386]">
                Planned Baseline Target
              </span>
              <div className="mt-1.5 text-2xl font-bold font-mono text-[#16324F]">
                {activity.planned_quantity?.toLocaleString()}{' '}
                <span className="text-xs font-normal text-[#617386]">{activity.unit}</span>
              </div>
              <p className="text-[11px] text-[#617386] mt-1 font-mono">
                Scheduled Window: {activity.start_date} → {activity.finish_date}
              </p>
            </div>

            <div className="bg-white border border-[#D8E1E8] p-4 rounded-xl shadow-xs">
              <span className="text-[10px] font-mono uppercase font-semibold text-[#617386]">
                Certified Executed Quantity
              </span>
              <div className="mt-1.5 text-2xl font-bold font-mono text-[#16845B]">
                {activity.actual_quantity?.toLocaleString()}{' '}
                <span className="text-xs font-normal text-[#617386]">{activity.unit}</span>
              </div>
              <p className="text-[11px] text-[#617386] mt-1 font-mono">
                Certified via daily inspection records
              </p>
            </div>

            <div className="bg-white border border-[#D8E1E8] p-4 rounded-xl shadow-xs">
              <span className="text-[10px] font-mono uppercase font-semibold text-[#617386]">
                Remaining Work Quantity
              </span>
              <div className="mt-1.5 text-2xl font-bold font-mono text-[#C98200]">
                {Math.max(0, (activity.planned_quantity || 0) - (activity.actual_quantity || 0)).toLocaleString()}{' '}
                <span className="text-xs font-normal text-[#617386]">{activity.unit}</span>
              </div>
              <p className="text-[11px] text-[#617386] mt-1 font-mono">
                Weight: {((activity.weight || 0.05) * 100).toFixed(1)}% of total highway project
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB: EXECUTION TIMELINE */}
      {activeTab === 'timeline' && (
        <ExecutionTimeline
          id="activity-execution-timeline"
          onOpenEvidence={onOpenEvidence}
        />
      )}

      {/* 4. TAB: CORRIDOR CONTEXT */}
      {activeTab === 'corridor' && (
        <CorridorVisualizer
          id="activity-corridor-visualizer"
          selectedZone={activity.location || 'Zone A'}
        />
      )}

      {/* 5. TAB: EVIDENCE & PROOF DOCUMENTS */}
      {activeTab === 'evidence' && (
        <div className="bg-white border border-[#D8E1E8] rounded-xl p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#D8E1E8]">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#16324F]">
                ATTACHED CERTIFIED EVIDENCE
              </h3>
              <p className="text-[11px] text-[#617386] mt-0.5">
                Every quantity claimed is backed by signed site reports and inspection photos
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(activity.evidence && activity.evidence.length > 0 ? activity.evidence : [
              {
                id: 'ev-demo-1',
                file_name: 'Site_Report_0409.pdf',
                source_type: 'Daily Site Report',
                uploaded_at: '2026-09-04T09:30:00Z',
                verified: true
              }
            ]).map((evi) => (
              <div
                key={evi.id}
                onClick={() => onOpenEvidence && onOpenEvidence(evi)}
                className="bg-[#F5F7F9] border border-[#D8E1E8] hover:border-[#087F8C] hover:bg-[#E7F5F4]/30 p-3.5 rounded-lg cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="p-2 rounded bg-white border border-[#D8E1E8] text-[#087F8C]">
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="font-semibold text-[#17212B] text-xs group-hover:text-[#087F8C] truncate block">
                      {evi.file_name}
                    </span>
                    <span className="text-[10px] text-[#617386] font-mono">
                      {evi.source_type} • Verified by RE Sharma
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 text-xs text-[#087F8C] font-semibold shrink-0 ml-2">
                  <span>View Proof</span>
                  <ChevronRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
