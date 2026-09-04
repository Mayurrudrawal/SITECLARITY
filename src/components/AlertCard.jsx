import React from 'react';
import { AlertTriangle, AlertOctagon, ArrowRight } from 'lucide-react';

export function AlertCard({ alert, onSelectActivity, id }) {
  const isCritical = alert.severity === "Critical";

  return (
    <div
      id={id}
      className={`rounded-lg border p-4 transition-colors shadow-xs ${
        isCritical
          ? 'bg-[#FDECEC] border-[#C93636]/30'
          : 'bg-[#FFF5DD] border-[#C98200]/30'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start space-x-3">
          <div
            className={`p-2 rounded-md mt-0.5 ${
              isCritical ? 'bg-white text-[#C93636]' : 'bg-white text-[#C98200]'
            }`}
          >
            {isCritical ? <AlertOctagon size={18} /> : <AlertTriangle size={18} />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold text-[#087F8C]">
                {alert.activity_code || "ACTIVITY"}
              </span>
              <span
                className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                  isCritical
                    ? 'bg-white text-[#C93636] border border-[#C93636]/30'
                    : 'bg-white text-[#C98200] border border-[#C98200]/30'
                }`}
              >
                {alert.severity}
              </span>
              <span className="text-[11px] text-[#617386]">{alert.type}</span>
            </div>
            <p className="text-xs text-[#17212B] font-sans mt-1.5 leading-relaxed">
              {alert.message}
            </p>
          </div>
        </div>

        {alert.activity_code && onSelectActivity && (
          <button
            onClick={() => onSelectActivity(alert.activity_code)}
            className="text-xs text-[#087F8C] hover:text-[#076f7b] font-semibold flex items-center space-x-1 whitespace-nowrap p-1 cursor-pointer"
          >
            <span>View</span>
            <ArrowRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
