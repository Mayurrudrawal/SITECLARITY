import React from 'react';

export function ConfidenceScore({ scorePercent, size = "md", showLabel = true, id }) {
  const percent = Math.round(scorePercent || 0);

  let color = "text-[#617386]";
  let bgColor = "bg-[#F5F7F9] border-[#D8E1E8]";
  let label = "Manual Selection";

  if (percent >= 85) {
    color = "text-[#16845B]";
    bgColor = "bg-[#E8F5EF] border-[#16845B]/30";
    label = "Automatic Match";
  } else if (percent >= 60) {
    color = "text-[#C98200]";
    bgColor = "bg-[#FFF5DD] border-[#C98200]/30";
    label = "Human Review";
  }

  if (size === "lg") {
    return (
      <div id={id} className={`inline-flex items-center space-x-3 px-3.5 py-1.5 rounded-lg border ${bgColor}`}>
        <div className="text-right">
          <div className={`text-2xl font-bold tracking-tight font-mono ${color}`}>
            {percent}%
          </div>
          {showLabel && <div className="text-[10px] font-semibold tracking-wider text-[#617386] uppercase">{label}</div>}
        </div>
      </div>
    );
  }

  return (
    <div id={id} className={`inline-flex items-center space-x-2 px-2.5 py-1 rounded-md border ${bgColor}`}>
      <span className={`font-mono font-bold text-xs ${color}`}>{percent}%</span>
      {showLabel && <span className="text-xs text-[#617386] font-medium">{label}</span>}
    </div>
  );
}
