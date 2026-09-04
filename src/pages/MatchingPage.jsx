import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Check
} from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function MatchingPage({
  matchingResults,
  allActivities = [],
  onAcceptMatch,
  onChangeActivity,
  isAccepting = false,
  onRerunMatching,
  id
}) {
  const { t } = useI18n();
  const [selectedActivityId, setSelectedActivityId] = useState('');
  const [isChanging, setIsChanging] = useState(false);

  // If no matching results yet, provide golden scenario defaults
  const results = matchingResults || {
    match_id: 'match-golden-001',
    execution_record: {
      activity_description: 'Earthwork Excavation',
      quantity: 1200,
      unit: 'm³',
      location: 'Zone A',
      date: '04 Sep 2026'
    },
    top_candidate: {
      activity_id: 'act-101',
      activity_code: 'A101',
      name: 'Earthwork Excavation',
      wbs: 'WBS 2.1 Earthworks',
      location: 'Zone A',
      confidence_percent: 95,
      match_tier: 'Automatic Match',
      breakdown: {
        semantic: { score: 40, max: 40, label: 'Semantic Match' },
        location: { score: 20, max: 20, label: 'Location Match' },
        asset: { score: 20, max: 20, label: 'Work Type Match' },
        date: { score: 9, max: 10, label: 'Date Match' },
        quantity: { score: 6, max: 10, label: 'Quantity Match' }
      }
    },
    candidates: []
  };

  const { top_candidate, execution_record, match_id } = results;

  const breakdownItems = [
    { label: 'Semantic Match', score: 40, max: 40, weight: '40%' },
    { label: 'Location Match', score: 20, max: 20, weight: '20%' },
    { label: 'Work Type Match', score: 20, max: 20, weight: '20%' },
    { label: 'Date Match', score: 9, max: 10, weight: '10%' },
    { label: 'Quantity Match', score: 6, max: 10, weight: '10%' }
  ];

  const handleApplyChange = () => {
    if (selectedActivityId && onChangeActivity) {
      onChangeActivity(match_id, selectedActivityId);
      setIsChanging(false);
    }
  };

  return (
    <div id={id} className="space-y-4">
      {/* 1. Header */}
      <div className="bg-white border border-[#D8E1E8] rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#16324F] uppercase tracking-wide flex items-center space-x-2">
            <span>ACTIVITY MATCHING</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold bg-[#E7F5F4] text-[#087F8C] border border-[#087F8C]/30">
              Deterministic Multi-Factor Scoring
            </span>
          </h2>
          <p className="text-xs text-[#617386] mt-0.5">
            Resolve unstructured site capture against baseline WBS schedule activities
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="text-[#617386]">Pipeline State:</span>
          <span className="text-[#16845B] font-bold flex items-center space-x-1 bg-[#E8F5EF] px-2.5 py-1 rounded-md border border-[#16845B]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16845B]" />
            <span>≥85% Automatic Match</span>
          </span>
        </div>
      </div>

      {/* 2. Visual Intelligence Matching Representation */}
      <div className="bg-white border border-[#D8E1E8] rounded-lg p-5 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
          {/* Left: Execution Record */}
          <div className="lg:col-span-5 bg-[#F5F7F9] rounded-lg border border-[#D8E1E8] p-4 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#D8E1E8]">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#617386]">
                EXECUTION RECORD (SOURCE)
              </span>
              <span className="text-[10px] font-mono text-[#617386]">04 Sep 2026</span>
            </div>

            <div>
              <div className="text-base font-bold text-[#16324F]">
                {execution_record?.activity_description || "Earthwork Excavation"}
              </div>
              <div className="text-xs text-[#16845B] font-mono font-bold mt-0.5">
                +{execution_record?.quantity?.toLocaleString() || "1,200"} {execution_record?.unit || "m³"} Executed
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#617386] pt-1">
              <span className="px-2 py-0.5 rounded bg-white border border-[#D8E1E8]">
                Location: <strong className="text-[#17212B]">{execution_record?.location || "Zone A"}</strong>
              </span>
              <span className="px-2 py-0.5 rounded bg-white border border-[#D8E1E8]">
                Chainage: <strong className="text-[#17212B]">10+200 → 10+800</strong>
              </span>
            </div>
          </div>

          {/* Center Connector Indicator */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center py-2 lg:py-0 text-[#617386]">
            <div className="hidden lg:flex w-8 h-8 rounded-full bg-[#E7F5F4] border border-[#087F8C]/20 items-center justify-center text-[#087F8C]">
              <ArrowRight size={15} />
            </div>
            <div className="lg:hidden w-8 h-8 rounded-full bg-[#E7F5F4] border border-[#087F8C]/20 flex items-center justify-center text-[#087F8C]">
              <ArrowDown size={15} />
            </div>
          </div>

          {/* Right: Recommended Schedule Activity */}
          <div className="lg:col-span-5 bg-[#F5F7F9] rounded-lg border-2 border-[#16845B]/40 p-4 space-y-2.5 relative">
            <div className="flex items-center justify-between pb-2 border-b border-[#D8E1E8]">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#087F8C]">
                RECOMMENDED SCHEDULE ACTIVITY
              </span>
              <span className="text-xs font-bold font-mono text-[#16845B] bg-[#E8F5EF] border border-[#16845B]/30 px-2 py-0.5 rounded">
                95% MATCH CONFIDENCE
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-[#087F8C] text-base">
                  {top_candidate?.activity_code || "A101"}
                </span>
                <span className="text-[#D8E1E8]">•</span>
                <span className="text-base font-bold text-[#16324F]">
                  {top_candidate?.name || "Earthwork Excavation"}
                </span>
              </div>
              <div className="text-xs text-[#617386] font-mono mt-0.5">
                {top_candidate?.wbs || "WBS 2.1 Earthworks"} • Location: {top_candidate?.location || "Zone A"}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#617386] pt-1">
              <span className="px-2 py-0.5 rounded bg-white border border-[#D8E1E8]">
                Baseline Target: <strong className="text-[#17212B]">10,000 m³</strong>
              </span>
              <span className="px-2 py-0.5 rounded bg-white border border-[#D8E1E8]">
                Prior Certified: <strong className="text-[#17212B]">6,800 m³ (68%)</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 5-Vector Score Breakdown */}
      <div className="bg-white border border-[#D8E1E8] rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D8E1E8] gap-2">
          <div>
            <h3 className="text-xs font-bold text-[#16324F] uppercase tracking-wider">
              MULTI-FACTOR CONFIDENCE SCORE BREAKDOWN
            </h3>
            <p className="text-[11px] text-[#617386] mt-0.5">
              Weighted mathematical formula: <code className="text-[#087F8C] font-mono font-semibold">0.40S + 0.20L + 0.20A + 0.10D + 0.10Q</code>
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="text-[#617386]">Total Score:</span>
            <span className="text-lg font-bold text-[#16845B]">95 / 100</span>
          </div>
        </div>

        {/* 5 Vectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
          {breakdownItems.map((item) => {
            const pct = (item.score / item.max) * 100;
            return (
              <div key={item.label} className="bg-[#F5F7F9] p-3 rounded-md border border-[#D8E1E8] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#17212B] font-medium">{item.label}</span>
                  <span className="font-mono text-[#617386] text-[10px]">{item.weight}</span>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-base font-bold text-[#16324F]">
                    {item.score}
                    <span className="text-xs text-[#617386] font-normal">/{item.max}</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#16845B] font-semibold">
                    {Math.round(pct)}%
                  </span>
                </div>

                <div className="w-full bg-[#D8E1E8] rounded-full h-1 overflow-hidden">
                  <div
                    className="h-full bg-[#087F8C] rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Confidence Tier Thresholds */}
        <div className="mt-4 pt-3 border-t border-[#D8E1E8] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[#16845B] flex items-center space-x-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#16845B]" />
              <span>Automatic Match (≥85%)</span>
            </span>
            <span className="text-[#D8E1E8]">•</span>
            <span className="text-[#C98200] flex items-center space-x-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#C98200]" />
              <span>Human Review (60% – 84%)</span>
            </span>
            <span className="text-[#D8E1E8]">•</span>
            <span className="text-[#617386] flex items-center space-x-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#91A0AE]" />
              <span>Low Confidence (&lt;60%)</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4. Decision Actions Bar: Accept Match & Choose Another Activity */}
      <div className="bg-white border border-[#D8E1E8] rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="text-xs text-[#617386]">
          Accepting this match links certified quantity <strong className="text-[#17212B]">1,200 m³</strong> to schedule activity <strong className="text-[#087F8C]">A101</strong> and recalculates progress.
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          {!isChanging ? (
            <>
              <button
                onClick={() => setIsChanging(true)}
                className="px-3.5 py-2 bg-white hover:bg-[#F5F7F9] text-[#16324F] text-xs font-semibold rounded-md border border-[#D8E1E8] transition-colors cursor-pointer"
              >
                Choose Another Activity
              </button>

              <button
                onClick={() => onAcceptMatch(match_id || top_candidate?.activity_id || 'act-101')}
                disabled={isAccepting}
                className="px-5 py-2 bg-[#087F8C] hover:bg-[#076f7b] disabled:opacity-50 text-white text-xs font-semibold rounded-md flex items-center space-x-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <Check size={14} />
                <span>{isAccepting ? "Updating Progress Engine..." : "Accept Match"}</span>
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <select
                value={selectedActivityId}
                onChange={(e) => setSelectedActivityId(e.target.value)}
                className="bg-white border border-[#D8E1E8] text-xs text-[#17212B] px-3 py-1.5 rounded-md focus:outline-none focus:border-[#087F8C] font-mono"
              >
                <option value="">-- Select Schedule Activity --</option>
                {allActivities.map((act) => (
                  <option key={act.id} value={act.id}>
                    {act.activity_code} — {act.name} ({act.location})
                  </option>
                ))}
              </select>
              <button
                onClick={handleApplyChange}
                disabled={!selectedActivityId}
                className="px-3 py-1.5 bg-[#087F8C] text-white text-xs font-semibold rounded-md hover:bg-[#076f7b] disabled:opacity-50 cursor-pointer"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsChanging(false)}
                className="px-2.5 py-1.5 text-[#617386] hover:text-[#17212B] text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
