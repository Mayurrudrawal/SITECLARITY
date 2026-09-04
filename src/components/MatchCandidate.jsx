import React, { useState } from 'react';
import { MatchScoreBreakdown } from './MatchScoreBreakdown.jsx';
import { ConfidenceScore } from './ConfidenceScore.jsx';
import { Check, Edit3, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export function MatchCandidate({
  candidate,
  allActivities = [],
  onAccept,
  onChangeActivity,
  isTop = false,
  isAccepting = false,
  id
}) {
  const [showBreakdown, setShowBreakdown] = useState(isTop);
  const [isChanging, setIsChanging] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(candidate.activity_id);

  const isMediumConfidence = candidate.confidence_percent >= 60 && candidate.confidence_percent < 85;

  const handleApplyChange = () => {
    if (onChangeActivity && selectedActivityId !== candidate.activity_id) {
      onChangeActivity(selectedActivityId);
      setIsChanging(false);
    }
  };

  return (
    <div
      id={id}
      className={`rounded-lg border transition-all duration-200 p-5 shadow-xs ${
        isTop
          ? 'bg-white border-2 border-[#16845B]/40 ring-1 ring-[#16845B]/20'
          : 'bg-white border border-[#D8E1E8]'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2.5">
            <span className="font-mono text-base font-bold text-[#087F8C]">
              {candidate.activity_code}
            </span>
            <span className="text-[#D8E1E8]">•</span>
            <h4 className="text-base font-bold text-[#16324F]">
              {candidate.activity_name}
            </h4>
            {isTop && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E8F5EF] text-[#16845B] border border-[#16845B]/30">
                Top Candidate
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#617386] font-sans">
            <span>{candidate.wbs}</span>
            <span>•</span>
            <span>Location: <strong className="text-[#17212B]">{candidate.location}</strong></span>
            <span>•</span>
            <span>Planned Qty: <strong className="text-[#17212B] font-mono">{candidate.planned_quantity?.toLocaleString()} {candidate.unit}</strong></span>
            <span>•</span>
            <span>Current Progress: <strong className="text-[#17212B] font-mono">{candidate.current_progress}%</strong></span>
          </div>

          {isMediumConfidence && (
            <div className="flex items-center space-x-1.5 text-xs text-[#C98200] bg-[#FFF5DD] border border-[#C98200]/30 px-2.5 py-1 rounded-md w-fit">
              <AlertCircle size={13} />
              <span>Human verification required before progress update</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <ConfidenceScore
            scorePercent={candidate.confidence_percent}
            size="lg"
            showLabel={true}
          />
        </div>
      </div>

      {/* Breakdown Toggle */}
      <div className="mt-4 pt-3 border-t border-[#D8E1E8] flex items-center justify-between">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-xs text-[#087F8C] hover:text-[#076f7b] flex items-center space-x-1 font-mono cursor-pointer"
        >
          <span>{showBreakdown ? 'Hide Match Breakdown' : 'View Match Score Breakdown (40/20/20/10/10)'}</span>
          {showBreakdown ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        <div className="flex items-center space-x-2">
          {!isChanging ? (
            <>
              <button
                onClick={() => setIsChanging(true)}
                className="px-3 py-1.5 bg-white hover:bg-[#F5F7F9] text-[#16324F] text-xs font-semibold rounded-md border border-[#D8E1E8] flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Edit3 size={13} />
                <span>Change Activity</span>
              </button>
              <button
                onClick={onAccept}
                disabled={isAccepting}
                className="px-4 py-1.5 bg-[#087F8C] hover:bg-[#076f7b] disabled:opacity-50 text-white text-xs font-semibold rounded-md flex items-center space-x-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <Check size={14} />
                <span>{isAccepting ? "Updating Progress..." : "Accept Match"}</span>
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <select
                value={selectedActivityId}
                onChange={(e) => setSelectedActivityId(e.target.value)}
                className="bg-white border border-[#D8E1E8] text-xs text-[#17212B] px-3 py-1.5 rounded-md focus:outline-none focus:border-[#087F8C] max-w-xs"
              >
                {allActivities.map((act) => (
                  <option key={act.id} value={act.id}>
                    {act.activity_code} — {act.name} ({act.location})
                  </option>
                ))}
              </select>
              <button
                onClick={handleApplyChange}
                className="px-3 py-1.5 bg-[#087F8C] text-white text-xs font-semibold rounded-md hover:bg-[#076f7b] cursor-pointer"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsChanging(false)}
                className="px-2 py-1.5 text-[#617386] hover:text-[#17212B] text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {showBreakdown && (
        <div className="mt-4">
          <MatchScoreBreakdown
            breakdown={candidate.breakdown}
            totalPercent={candidate.confidence_percent}
          />
        </div>
      )}
    </div>
  );
}
