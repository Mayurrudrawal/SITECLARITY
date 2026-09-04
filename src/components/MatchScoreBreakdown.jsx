import React from 'react';

export function MatchScoreBreakdown({ breakdown, totalPercent = 95, id }) {
  const data = breakdown || {
    semantic: { score: 40, max: 40, label: "Semantic Activity Match" },
    location: { score: 20, max: 20, label: "Location Match" },
    asset: { score: 20, max: 20, label: "Asset/Work Type Match" },
    date: { score: 9, max: 10, label: "Date Match" },
    quantity: { score: 6, max: 10, label: "Quantity Consistency" }
  };

  const items = [
    { key: 'semantic', label: data.semantic?.label || 'Semantic Activity Match', score: data.semantic?.score ?? 40, max: 40 },
    { key: 'location', label: data.location?.label || 'Location Match', score: data.location?.score ?? 20, max: 20 },
    { key: 'asset', label: data.asset?.label || 'Asset/Work Type Match', score: data.asset?.score ?? 20, max: 20 },
    { key: 'date', label: data.date?.label || 'Date Match', score: data.date?.score ?? 9, max: 10 },
    { key: 'quantity', label: data.quantity?.label || 'Quantity Consistency', score: data.quantity?.score ?? 6, max: 10 }
  ];

  const calculatedTotal = items.reduce((sum, item) => sum + item.score, 0);

  return (
    <div id={id} className="bg-[#F5F7F9] border border-[#D8E1E8] rounded-lg p-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[#D8E1E8] pb-2 mb-3">
        <span className="text-[#16324F] font-sans font-semibold text-xs tracking-wider uppercase">
          Multi-Factor Match Score Breakdown
        </span>
        <span className="text-[11px] text-[#617386] font-sans">
          Formula: <code className="text-[#087F8C] font-semibold">0.40S + 0.20L + 0.20A + 0.10D + 0.10Q</code>
        </span>
      </div>

      <div className="space-y-2.5">
        {items.map((item) => {
          const pct = Math.min(100, Math.round((item.score / item.max) * 100));
          return (
            <div key={item.key} className="space-y-1">
              <div className="flex justify-between items-center text-[#17212B]">
                <span className="font-sans text-xs text-[#617386]">{item.label}</span>
                <span className="font-semibold text-[#17212B]">
                  {item.score}/{item.max}
                </span>
              </div>
              <div className="w-full bg-[#D8E1E8] rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    pct >= 90 ? 'bg-[#16845B]' : pct >= 60 ? 'bg-[#087F8C]' : 'bg-[#C98200]'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#D8E1E8] mt-3 pt-3 flex items-center justify-between font-sans">
        <span className="text-xs font-semibold text-[#16324F] tracking-wide uppercase">
          Total Confidence Score
        </span>
        <div className="flex items-baseline space-x-2">
          <span className="text-lg font-bold font-mono text-[#16845B]">
            {totalPercent || calculatedTotal}%
          </span>
          <span className="text-[11px] text-[#16845B] font-semibold px-2 py-0.5 rounded bg-[#E8F5EF] border border-[#16845B]/30">
            ≥85% Automatic Match
          </span>
        </div>
      </div>
    </div>
  );
}
