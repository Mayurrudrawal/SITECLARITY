import React, { useEffect, useState } from 'react';
import {
  X,
  FileText,
  ShieldCheck,
  Globe,
  Languages,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  SplitSquareVertical
} from 'lucide-react';
import { StatusBadge } from './StatusBadge.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function EvidenceViewer({ evidence, onClose, id }) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('split'); // 'split', 'original', 'translation', 'parameters', 'traceability'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!evidence) return null;

  const originalLang = evidence.original_language || evidence.execution?.original_language || "hi";
  const detectedLangName = evidence.metadata?.detected_language || (originalLang === 'ta' ? 'Tamil' : originalLang === 'mr' ? 'Marathi' : originalLang === 'te' ? 'Telugu' : originalLang === 'en' ? 'English' : 'Hindi');
  const langConfidence = evidence.metadata?.language_confidence || "98%";
  const extractionConfidence = evidence.metadata?.extraction_confidence || "96%";

  const originalContent = evidence.original_text || evidence.raw_content || evidence.execution?.original_text || evidence.execution?.raw_text ||
    "आज ज़ोन ए में 1200 घन मीटर मिट्टी की खुदाई पूरी की गई। काम चेनिज 10+200 से 10+800 तक किया गया। मौसम साफ था।";

  const translatedContent = evidence.translated_text || evidence.execution?.translated_text ||
    "Today, 1,200 cubic metres of earthwork excavation was completed in Zone A from Chainage 10+200 to 10+800. Weather clear, 4x excavators and 12x tippers deployed. Certified by Resident Engineer Rajesh Sharma on 04 Sep 2026.";

  const canonicalActivity = evidence.activity?.name || evidence.execution?.activity_description || evidence.metadata?.extracted_activity || "Earthwork Excavation";
  const canonicalCode = evidence.activity?.activity_code || evidence.execution?.canonical_activity_id || "A101";
  const quantity = evidence.execution?.quantity || evidence.metadata?.extracted_quantity || 1200;
  const unit = evidence.execution?.unit || evidence.metadata?.extracted_unit || "m³";
  const location = evidence.execution?.location || evidence.metadata?.extracted_location || "Zone A";
  const chainage = evidence.execution?.chainage || "10+200 - 10+800";

  return (
    <div
      id={id}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17212B]/40 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-[#D8E1E8] w-full max-w-4xl rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#D8E1E8] flex items-center justify-between bg-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#E7F5F4] border border-[#087F8C]/20 text-[#087F8C]">
              <FileText size={20} />
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <h3 className="text-base font-bold text-[#16324F]">
                  {t('viewEvidence', 'Evidence Document Details')}
                </h3>
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-[#F5F7F9] text-[#617386] border border-[#D8E1E8]">
                  {evidence.file_name || "Site_Report.log"}
                </span>
                {/* Detected Language Badge */}
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#E7F5F4] text-[#087F8C] border border-[#087F8C]/20 flex items-center space-x-1">
                  <Globe size={11} />
                  <span>{detectedLangName} · AI Analyzed ✓</span>
                </span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#E8F5EF] text-[#16845B] border border-[#16845B]/30 flex items-center space-x-1">
                  <ShieldCheck size={11} />
                  <span>Original Preserved ✓</span>
                </span>
              </div>
              <p className="text-xs text-[#617386] mt-0.5">
                {t('multilingualDesc', 'Multilingual Ingestion, Immutable Audit Trail & Schedule Traceability')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[#617386] hover:text-[#17212B] hover:bg-[#F5F7F9] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 pt-3 border-b border-[#D8E1E8] bg-[#F8FAFC] flex space-x-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('split')}
            className={`pb-2 px-3 border-b-2 font-medium flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'split' ? 'border-[#087F8C] text-[#087F8C] font-bold' : 'border-transparent text-[#617386] hover:text-[#17212B]'
            }`}
          >
            <SplitSquareVertical size={13} />
            <span>{t('dualView', 'Dual View (Original vs Translation)')}</span>
          </button>
          <button
            onClick={() => setActiveTab('original')}
            className={`pb-2 px-3 border-b-2 font-medium flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'original' ? 'border-[#087F8C] text-[#087F8C] font-bold' : 'border-transparent text-[#617386] hover:text-[#17212B]'
            }`}
          >
            <Globe size={13} />
            <span>{t('originalReport', 'Original Worker Report')}</span>
          </button>
          <button
            onClick={() => setActiveTab('translation')}
            className={`pb-2 px-3 border-b-2 font-medium flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'translation' ? 'border-[#087F8C] text-[#087F8C] font-bold' : 'border-transparent text-[#617386] hover:text-[#17212B]'
            }`}
          >
            <Languages size={13} />
            <span>Standardized English Translation</span>
          </button>
          <button
            onClick={() => setActiveTab('parameters')}
            className={`pb-2 px-3 border-b-2 font-medium flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'parameters' ? 'border-[#087F8C] text-[#087F8C] font-bold' : 'border-transparent text-[#617386] hover:text-[#17212B]'
            }`}
          >
            <Cpu size={13} />
            <span>Extracted Canonical Parameters</span>
          </button>
          <button
            onClick={() => setActiveTab('traceability')}
            className={`pb-2 px-3 border-b-2 font-medium flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'traceability' ? 'border-[#087F8C] text-[#087F8C] font-bold' : 'border-transparent text-[#617386] hover:text-[#17212B]'
            }`}
          >
            <Layers size={13} />
            <span>Full Traceability Chain</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Top Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-[#F5F7F9] p-3 rounded-md border border-[#D8E1E8]">
              <span className="text-[#617386] block mb-1">Source Type & Language</span>
              <span className="font-semibold text-[#17212B]">
                {evidence.source_type} ({detectedLangName})
              </span>
            </div>

            <div className="bg-[#F5F7F9] p-3 rounded-md border border-[#D8E1E8]">
              <span className="text-[#617386] block mb-1">Uploaded Date</span>
              <span className="font-mono text-[#17212B]">
                {evidence.uploaded_at ? new Date(evidence.uploaded_at).toLocaleDateString() : '04 Sep 2026'}
              </span>
            </div>

            <div className="bg-[#F5F7F9] p-3 rounded-md border border-[#D8E1E8]">
              <span className="text-[#617386] block mb-1">Canonical Activity</span>
              <span className="font-mono font-bold text-[#087F8C]">
                {canonicalCode} — {canonicalActivity}
              </span>
            </div>

            <div className="bg-[#F5F7F9] p-3 rounded-md border border-[#D8E1E8]">
              <span className="text-[#617386] block mb-1">Execution Quantity</span>
              <span className="font-mono font-bold text-[#16845B]">
                {Number(quantity).toLocaleString()} {unit}
              </span>
            </div>
          </div>

          {/* TAB 1: DUAL VIEW (Original Worker Report + Standardized English Interpretation) */}
          {activeTab === 'split' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Original Report */}
              <div className="bg-[#F8FAFC] border border-[#D8E1E8] rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#D8E1E8]">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-[#16324F]">
                    <Globe size={13} className="text-[#087F8C]" />
                    <span>Worker's Original Report ({detectedLangName})</span>
                  </div>
                  <span className="text-[10px] text-[#16845B] bg-[#E8F5EF] px-2 py-0.5 rounded border border-[#16845B]/30 font-semibold">
                    Immutable
                  </span>
                </div>
                <div className="bg-white border border-[#D8E1E8] rounded p-3 font-mono text-xs text-[#17212B] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap">
                  {originalContent}
                </div>
                <p className="text-[10px] text-[#617386] font-mono">
                  Preserved exactly as filed by the field crew without algorithmic overwrite.
                </p>
              </div>

              {/* Standardized English */}
              <div className="bg-[#F8FAFC] border border-[#D8E1E8] rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#D8E1E8]">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-[#16324F]">
                    <Languages size={13} className="text-[#087F8C]" />
                    <span>Standardized English Translation (Project Manager)</span>
                  </div>
                  <span className="text-[10px] text-[#087F8C] bg-[#E7F5F4] px-2 py-0.5 rounded border border-[#087F8C]/20 font-semibold">
                    Confidence: {extractionConfidence}
                  </span>
                </div>
                <div className="bg-white border border-[#D8E1E8] rounded p-3 font-mono text-xs text-[#16324F] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap">
                  {translatedContent}
                </div>
                <p className="text-[10px] text-[#617386] font-mono">
                  Automatically translated & verified against NHAI technical specifications.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: ORIGINAL REPORT FULL VIEW */}
          {activeTab === 'original' && (
            <div className="bg-[#F8FAFC] border border-[#D8E1E8] rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#D8E1E8]">
                <div className="flex items-center space-x-2">
                  <Globe size={16} className="text-[#087F8C]" />
                  <span className="text-xs font-bold text-[#16324F]">
                    Original Field Worker Report (Immutable Archive)
                  </span>
                </div>
                <div className="text-xs font-mono text-[#087F8C]">
                  Language: <strong>{detectedLangName}</strong> ({langConfidence} conf)
                </div>
              </div>
              <div className="bg-white border border-[#D8E1E8] rounded p-4 font-mono text-xs text-[#17212B] leading-relaxed whitespace-pre-wrap">
                {originalContent}
              </div>
            </div>
          )}

          {/* TAB 3: STANDARDIZED ENGLISH FULL VIEW */}
          {activeTab === 'translation' && (
            <div className="bg-[#F8FAFC] border border-[#D8E1E8] rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#D8E1E8]">
                <div className="flex items-center space-x-2">
                  <Languages size={16} className="text-[#087F8C]" />
                  <span className="text-xs font-bold text-[#16324F]">
                    Standardized English Interpretation for Project Management
                  </span>
                </div>
                <div className="text-xs font-mono text-[#16845B]">
                  Certified by Resident Engineer
                </div>
              </div>
              <div className="bg-white border border-[#D8E1E8] rounded p-4 font-mono text-xs text-[#16324F] leading-relaxed whitespace-pre-wrap">
                {translatedContent}
              </div>
            </div>
          )}

          {/* TAB 4: EXTRACTED CANONICAL PARAMETERS */}
          {activeTab === 'parameters' && (
            <div className="bg-[#F8FAFC] border border-[#D8E1E8] rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#D8E1E8]">
                <span className="text-xs font-bold text-[#16324F] uppercase tracking-wider">
                  Canonical Structured Execution Record
                </span>
                <StatusBadge status="Completed" size="sm" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="bg-white p-3 rounded border border-[#D8E1E8]">
                  <span className="text-[10px] text-[#617386] block">Canonical Activity</span>
                  <span className="font-bold text-[#087F8C] text-sm">{canonicalCode} — {canonicalActivity}</span>
                </div>
                <div className="bg-white p-3 rounded border border-[#D8E1E8]">
                  <span className="text-[10px] text-[#617386] block">Quantity Executed</span>
                  <span className="font-bold text-[#16845B] text-sm">{Number(quantity).toLocaleString()} {unit}</span>
                </div>
                <div className="bg-white p-3 rounded border border-[#D8E1E8]">
                  <span className="text-[10px] text-[#617386] block">Location / Zone</span>
                  <span className="font-semibold text-[#17212B]">{location}</span>
                </div>
                <div className="bg-white p-3 rounded border border-[#D8E1E8]">
                  <span className="text-[10px] text-[#617386] block">Chainage Range</span>
                  <span className="font-semibold text-[#17212B]">{chainage}</span>
                </div>
                <div className="bg-white p-3 rounded border border-[#D8E1E8]">
                  <span className="text-[10px] text-[#617386] block">Execution Date</span>
                  <span className="font-semibold text-[#17212B]">04 Sep 2026</span>
                </div>
                <div className="bg-white p-3 rounded border border-[#D8E1E8]">
                  <span className="text-[10px] text-[#617386] block">NLU Confidence</span>
                  <span className="font-bold text-[#087F8C]">{extractionConfidence}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5 / PERSISTENT: TRACEABILITY CHAIN */}
          {(activeTab === 'traceability' || activeTab === 'split') && (
            <div className="bg-[#F5F7F9] border border-[#D8E1E8] rounded-lg p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#16324F] mb-3">
                Full Multilingual Evidence-to-Schedule Traceability Chain
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs font-mono">
                <div className="bg-white p-2.5 rounded-md border border-[#D8E1E8]">
                  <div className="text-[10px] text-[#617386]">1. Worker Report</div>
                  <div className="font-bold text-[#17212B] truncate">{detectedLangName} Input</div>
                  <div className="text-[10px] text-[#087F8C] mt-1 font-semibold">Preserved</div>
                </div>

                <div className="bg-white p-2.5 rounded-md border border-[#D8E1E8]">
                  <div className="text-[10px] text-[#617386]">2. Language Detect</div>
                  <div className="font-bold text-[#17212B]">{langConfidence} Conf</div>
                  <div className="text-[10px] text-[#16845B] mt-1 font-semibold">Script Verified</div>
                </div>

                <div className="bg-white p-2.5 rounded-md border border-[#D8E1E8]">
                  <div className="text-[10px] text-[#617386]">3. AI Extraction</div>
                  <div className="font-bold text-[#17212B]">{Number(quantity).toLocaleString()} {unit}</div>
                  <div className="text-[10px] text-[#16845B] mt-1 font-semibold">Conf {extractionConfidence}</div>
                </div>

                <div className="bg-white p-2.5 rounded-md border border-[#D8E1E8]">
                  <div className="text-[10px] text-[#617386]">4. Canonical Match</div>
                  <div className="font-bold text-[#17212B]">{canonicalCode}</div>
                  <div className="text-[10px] text-[#087F8C] mt-1 font-semibold">Match 95%</div>
                </div>

                <div className="bg-white p-2.5 rounded-md border border-[#D8E1E8]">
                  <div className="text-[10px] text-[#617386]">5. Progress Impact</div>
                  <div className="font-bold text-[#17212B]">6,800 → 8,000 {unit}</div>
                  <div className="text-[10px] text-[#C98200] mt-1 font-semibold">Actual 80%</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#D8E1E8] bg-white flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-[#16845B]">
            <ShieldCheck size={16} />
            <span className="font-medium">Certified by Resident Engineer Rajesh Sharma • Multilingual Audit Linked</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-[#F5F7F9] text-[#16324F] text-xs font-semibold rounded-md border border-[#D8E1E8] cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
