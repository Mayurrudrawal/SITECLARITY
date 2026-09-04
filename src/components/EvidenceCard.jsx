import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';

export function EvidenceCard({ evidence, onViewDetails, id }) {
  return (
    <div
      id={id}
      className="bg-white border border-[#D8E1E8] hover:border-[#087F8C] rounded-lg p-4 transition-colors shadow-xs group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-md bg-[#E7F5F4] text-[#087F8C] group-hover:bg-[#087F8C] group-hover:text-white transition-colors">
            <FileText size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#16324F] group-hover:text-[#087F8C] transition-colors">
              {evidence.file_name}
            </h4>
            <div className="text-[11px] text-[#617386] mt-0.5">
              {evidence.source_type}
            </div>
          </div>
        </div>

        <button
          onClick={() => onViewDetails(evidence)}
          className="px-2.5 py-1 rounded-md bg-white hover:bg-[#F5F7F9] text-xs font-semibold text-[#16324F] border border-[#D8E1E8] flex items-center space-x-1 cursor-pointer transition-colors"
        >
          <span>Inspect</span>
          <ExternalLink size={12} />
        </button>
      </div>

      <div className="mt-4 pt-3 border-t border-[#D8E1E8] grid grid-cols-2 gap-2 text-xs font-mono">
        <div>
          <span className="text-[#617386] text-[10px] block">Linked Activity</span>
          <span className="font-bold text-[#087F8C]">
            {evidence.activity?.activity_code || "A101"}
          </span>
        </div>
        <div>
          <span className="text-[#617386] text-[10px] block">Extracted Quantity</span>
          <span className="font-bold text-[#16845B]">
            {evidence.execution?.quantity?.toLocaleString() || "1,200"} {evidence.execution?.unit || "m³"}
          </span>
        </div>
      </div>
    </div>
  );
}
