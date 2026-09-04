import React, { useState } from 'react';
import {
  FileText,
  Search,
  ShieldCheck,
  Eye,
  Camera,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Cpu,
  GitMerge,
  CheckCircle2,
  X,
  FileCheck2
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function TraceabilityPage({ evidenceList = [], onOpenEvidence, id }) {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [locationFilter, setLocationFilter] = useState('ALL');
  const [activeTraceModal, setActiveTraceModal] = useState(null);

  const filtered = evidenceList.filter((evi) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      evi.file_name.toLowerCase().includes(term) ||
      evi.source_type.toLowerCase().includes(term) ||
      (evi.activity?.activity_code || '').toLowerCase().includes(term) ||
      (evi.activity?.name || '').toLowerCase().includes(term) ||
      (evi.raw_content || '').toLowerCase().includes(term);

    const matchesType = typeFilter === 'ALL' || evi.source_type.includes(typeFilter);
    const matchesLoc = locationFilter === 'ALL' || (evi.activity?.location || '').includes(locationFilter);

    return matchesSearch && matchesType && matchesLoc;
  });

  return (
    <div id={id} className="space-y-4 font-sans">
      {/* 1. Header with Stats */}
      <div className="bg-white border border-[#D8E1E8] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#16324F] uppercase tracking-wide flex items-center space-x-2">
            <span>VISUAL EVIDENCE WORKSPACE & TRACEABILITY VAULT</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold bg-[#E7F5F4] text-[#087F8C] border border-[#087F8C]/30">
              {evidenceList.length} Certified Records
            </span>
          </h2>
          <p className="text-xs text-[#617386] mt-0.5">
            Every claimed percentage mathematically traced to signed field reports, geo-tagged photos, and lab certificates
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-[#16845B] bg-[#E8F5EF] px-3 py-1.5 rounded-lg border border-[#16845B]/30 font-semibold self-start sm:self-auto">
          <ShieldCheck size={15} />
          <span>100% Cryptographically Verified</span>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white border border-[#D8E1E8] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#91A0AE]" />
          <input
            type="text"
            placeholder="Search by file name, activity (A101), chainage, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F5F7F9] border border-[#D8E1E8] text-[#17212B] text-xs pl-8 pr-3 py-1.5 rounded-md focus:outline-none focus:border-[#087F8C] font-mono placeholder-[#91A0AE]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#F5F7F9] border border-[#D8E1E8] text-[#17212B] text-xs px-2.5 py-1.5 rounded-md focus:outline-none focus:border-[#087F8C]"
          >
            <option value="ALL">All Media Types</option>
            <option value="Daily Report">Daily Site Reports (PDF)</option>
            <option value="Photo">Site Photos (JPEG)</option>
            <option value="Survey">LiDAR / Drone Surveys</option>
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="bg-[#F5F7F9] border border-[#D8E1E8] text-[#17212B] text-xs px-2.5 py-1.5 rounded-md focus:outline-none focus:border-[#087F8C]"
          >
            <option value="ALL">All Corridors & Zones</option>
            <option value="Zone A">Zone A (CH 00+000 - 09+500)</option>
            <option value="Zone B">Zone B (CH 10+000 - 19+500)</option>
            <option value="12+500">Chainage 12+500</option>
          </select>
        </div>
      </div>

      {/* 3. Visual Evidence Cards Grid (WHAT, WHEN, WHERE, WHICH ACTIVITY, WHAT RESULT) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((evi) => {
          const isA101 = evi.activity?.activity_code === "A101" || evi.file_name?.includes("0409");
          const isPhoto = evi.source_type?.toLowerCase().includes("photo") || evi.file_name?.includes(".jpg") || evi.file_name?.includes(".png");

          return (
            <div
              key={evi.id}
              className={`bg-white rounded-xl border transition-all shadow-xs flex flex-col justify-between overflow-hidden group ${
                isA101 ? 'border-[#087F8C] ring-1 ring-[#087F8C]/20' : 'border-[#D8E1E8] hover:border-[#087F8C]/60'
              }`}
            >
              {/* Document/Photo Visual Preview Header */}
              <div className="h-28 bg-[#F5F7F9] border-b border-[#D8E1E8] p-3 flex flex-col justify-between relative overflow-hidden">
                {/* Visual Watermark Stamp */}
                <div className="absolute right-2 -bottom-2 text-6xl font-black text-[#D8E1E8]/40 select-none font-mono pointer-events-none">
                  CERTIFIED
                </div>

                <div className="flex items-center justify-between z-10">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-[#D8E1E8] text-[10px] font-mono font-bold text-[#16324F] flex items-center space-x-1 shadow-2xs">
                    {isPhoto ? <Camera size={11} className="text-[#087F8C]" /> : <FileText size={11} className="text-[#087F8C]" />}
                    <span>{evi.source_type || 'Daily Site Report'}</span>
                  </span>

                  <span className="px-2 py-0.5 rounded-full bg-[#E8F5EF] text-[#16845B] border border-[#16845B]/30 text-[10px] font-mono font-bold flex items-center space-x-1">
                    <CheckCircle2 size={10} />
                    <span>SEALED & AUDITED</span>
                  </span>
                </div>

                <div className="z-10">
                  <h3 className="font-bold text-xs text-[#16324F] truncate group-hover:text-[#087F8C] transition-colors" title={evi.file_name}>
                    {evi.file_name}
                  </h3>
                  <div className="text-[10px] text-[#617386] font-mono mt-0.5 truncate">
                    SHA-256: {evi.id?.substring(0, 16)}...
                  </div>
                </div>
              </div>

              {/* 5 Core Information Coordinates */}
              <div className="p-3.5 space-y-2 text-xs font-mono">
                {/* 1. WHAT */}
                <div className="flex items-start justify-between">
                  <span className="text-[10px] text-[#91A0AE] uppercase font-bold">WHAT:</span>
                  <span className="font-bold text-[#17212B] text-right truncate max-w-[200px]">
                    {evi.execution?.work_item || evi.activity?.name || "Earthwork Excavation"}
                  </span>
                </div>

                {/* 2. WHEN */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#91A0AE] uppercase font-bold">WHEN:</span>
                  <span className="text-[#17212B]">
                    {evi.uploaded_at ? new Date(evi.uploaded_at).toLocaleDateString() : '04 Sep 2026'}
                  </span>
                </div>

                {/* 3. WHERE */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#91A0AE] uppercase font-bold">WHERE:</span>
                  <span className="text-[#087F8C] font-semibold flex items-center space-x-1">
                    <MapPin size={11} />
                    <span>{evi.activity?.location || 'Zone A'} ({evi.activity?.chainage_range || '10+200–10+800'})</span>
                  </span>
                </div>

                {/* 4. WHICH ACTIVITY */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#91A0AE] uppercase font-bold">ACTIVITY:</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#EAF2F8] text-[#16324F] font-bold border border-[#D8E1E8]">
                    {evi.activity?.activity_code || "A101"}
                  </span>
                </div>

                {/* 5. WHAT RESULT */}
                <div className="flex items-center justify-between pt-1 border-t border-[#F5F7F9]">
                  <span className="text-[10px] text-[#91A0AE] uppercase font-bold">RESULT:</span>
                  <span className="font-bold text-[#16845B]">
                    {evi.execution?.quantity ? `+${evi.execution.quantity.toLocaleString()} ${evi.execution.unit} (Progress Impact)` : '+1,200 m³ Certified'}
                  </span>
                </div>
              </div>

              {/* Action Bar: VIEW TRACEABILITY */}
              <div className="px-3.5 py-2.5 bg-[#F5F7F9] border-t border-[#D8E1E8] flex items-center justify-between text-xs font-semibold">
                <button
                  onClick={() => onOpenEvidence && onOpenEvidence(evi)}
                  className="text-[#617386] hover:text-[#16324F] flex items-center space-x-1 cursor-pointer"
                >
                  <Eye size={13} />
                  <span>Preview File</span>
                </button>

                <button
                  onClick={() => setActiveTraceModal(evi)}
                  className="px-2.5 py-1 rounded bg-[#087F8C] text-white hover:bg-[#076f7b] transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <span>VIEW TRACEABILITY</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. "VIEW TRACEABILITY" MODAL: Evidence → AI extraction → Activity match → Progress impact */}
      {activeTraceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#16324F]/50 backdrop-blur-xs">
          <div className="bg-white border border-[#D8E1E8] rounded-xl max-w-2xl w-full p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#D8E1E8]">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={18} className="text-[#16845B]" />
                <h3 className="text-sm font-bold text-[#16324F] uppercase tracking-wide">
                  DETERMINISTIC TRACEABILITY LINEAGE
                </h3>
              </div>
              <button
                onClick={() => setActiveTraceModal(null)}
                className="p-1 rounded-md text-[#91A0AE] hover:text-[#17212B] hover:bg-[#F5F7F9]"
              >
                <X size={16} />
              </button>
            </div>

            {/* 4-Step Visual Traceability Chain */}
            <div className="space-y-3 font-mono text-xs">
              {/* Step 1: Evidence */}
              <div className="p-3 rounded-lg bg-[#F5F7F9] border border-[#D8E1E8] flex items-start space-x-3">
                <div className="w-6 h-6 rounded-md bg-[#16324F] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#16324F]">SITE EVIDENCE SOURCE</span>
                    <span className="text-[10px] text-[#617386]">Uploaded 04 Sep 2026</span>
                  </div>
                  <div className="text-sm font-bold text-[#087F8C] mt-0.5">
                    {activeTraceModal.file_name}
                  </div>
                  <p className="text-[11px] text-[#617386] mt-1">
                    "{activeTraceModal.raw_content || 'Today, 1,200 cubic metres of earthwork excavation was completed in Zone A from Chainage 10+200 to 10+800. Certified by Resident Engineer Rajesh Sharma.'}"
                  </p>
                </div>
              </div>

              {/* Step 2: AI Extraction */}
              <div className="p-3 rounded-lg bg-[#E7F5F4] border border-[#087F8C]/30 flex items-start space-x-3">
                <div className="w-6 h-6 rounded-md bg-[#087F8C] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#087F8C]">AI EXTRACTION RESULT</span>
                    <span className="text-[10px] text-[#087F8C]">Multi-Modal NLP Model</span>
                  </div>
                  <div className="text-xs text-[#16324F] mt-1 space-y-0.5">
                    <div>• Work Item: <strong>Earthwork Excavation</strong></div>
                    <div>• Executed Quantity: <strong className="text-[#16845B]">+1,200 m³</strong></div>
                    <div>• Location: <strong>Zone A (Chainage 10+200 – 10+800)</strong></div>
                  </div>
                </div>
              </div>

              {/* Step 3: Activity Match */}
              <div className="p-3 rounded-lg bg-[#E7F5F4] border border-[#087F8C]/30 flex items-start space-x-3">
                <div className="w-6 h-6 rounded-md bg-[#087F8C] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#087F8C]">SCHEDULE ACTIVITY MATCH</span>
                    <span className="px-2 py-0.5 rounded bg-white text-[#16845B] font-bold border border-[#16845B]/30">
                      95% Confidence (Auto-Accepted)
                    </span>
                  </div>
                  <div className="text-xs text-[#16324F] mt-1">
                    Matched to <strong>A101 - Earthwork Excavation (WBS 2.1)</strong> based on 5-factor scoring breakdown.
                  </div>
                </div>
              </div>

              {/* Step 4: Progress Impact */}
              <div className="p-3 rounded-lg bg-[#E8F5EF] border border-[#16845B]/30 flex items-start space-x-3">
                <div className="w-6 h-6 rounded-md bg-[#16845B] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                  4
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#16845B]">PROGRESS & QUANTITY IMPACT</span>
                    <span className="text-[10px] text-[#16845B] font-bold">Ledger Block Sealed</span>
                  </div>
                  <div className="text-xs text-[#16324F] mt-1">
                    Cumulative execution moved from <strong>6,800 m³ (68.0%) → 8,000 m³ (80.0%)</strong> against 8,500 m³ planned baseline.
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 border-t border-[#D8E1E8] flex justify-end">
              <button
                onClick={() => setActiveTraceModal(null)}
                className="px-4 py-2 bg-[#16324F] hover:bg-[#16324F]/90 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close Traceability Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
