import React, { useState } from 'react';
import {
  ArrowRight,
  FileText,
  ShieldCheck,
  Cpu,
  Globe,
  Languages,
  CheckCircle2,
  Edit3,
  Save,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import { StatusBadge } from './StatusBadge.jsx';
import { reviewExecutionRecord } from '../services/api.js';

export function ExtractionPanel({
  extraction,
  executionRecord,
  onRunMatching,
  isMatching = false,
  id
}) {
  const [viewMode, setViewMode] = useState('split'); // 'split', 'original', 'translation'
  const [isEditing, setIsEditing] = useState(false);
  const [isSavingReview, setIsSavingReview] = useState(false);
  const [reviewSaved, setReviewSaved] = useState(false);

  // Review editable values
  const [reviewData, setReviewData] = useState({
    activity: extraction?.activity || executionRecord?.activity_description || 'Earthwork Excavation',
    quantity: extraction?.quantity || executionRecord?.quantity || 1200,
    unit: extraction?.unit || executionRecord?.unit || 'm³',
    location: extraction?.location || executionRecord?.location || 'Zone A',
    chainage: extraction?.chainage || executionRecord?.chainage || '10+200 - 10+800',
    date: extraction?.date || executionRecord?.execution_date || '2026-09-04',
    status: extraction?.status || executionRecord?.status || 'completed'
  });

  if (!extraction) return null;

  const confidencePct = Math.round((extraction.confidence || 0.96) * 100);
  const isUncertain = confidencePct < 85;
  const originalLanguageName = extraction.detected_language || "Hindi";
  const originalLanguageNative = extraction.language_native_name || "";
  const langConfidencePct = Math.round((extraction.language_confidence || 0.98) * 100);
  const canonicalId = extraction.canonical_activity_id || "A101";

  const originalText = extraction.original_text || executionRecord?.original_text || executionRecord?.raw_text ||
    "आज ज़ोन ए में 1200 घन मीटर मिट्टी की खुदाई पूरी की गई। काम चेनिज 10+200 से 10+800 तक किया गया। मौसम साफ था।";

  const translatedText = extraction.translated_text || executionRecord?.translated_text ||
    "Today, 1,200 cubic metres of earthwork excavation was completed in Zone A from Chainage 10+200 to 10+800. Weather clear.";

  const handleSaveReview = async () => {
    const execId = executionRecord?.id || extraction?.execution_record_id;
    if (!execId) {
      setIsEditing(false);
      setReviewSaved(true);
      return;
    }
    setIsSavingReview(true);
    try {
      await reviewExecutionRecord(execId, reviewData);
      setIsEditing(false);
      setReviewSaved(true);
      extraction.activity = reviewData.activity;
      extraction.quantity = parseFloat(reviewData.quantity);
      extraction.unit = reviewData.unit;
      extraction.location = reviewData.location;
      extraction.chainage = reviewData.chainage;
      extraction.date = reviewData.date;
      extraction.status = reviewData.status;
      extraction.human_verified = true;
    } catch (err) {
      alert("Failed to save review: " + err.message);
    } finally {
      setIsSavingReview(false);
    }
  };

  return (
    <div id={id} className="bg-white border border-[#D8E1E8] rounded-lg p-5 shadow-xs space-y-5">
      {/* Transformation Pipeline Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D8E1E8] gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xs font-bold text-[#16324F] uppercase tracking-wider flex items-center space-x-2">
              <Cpu size={15} className="text-[#087F8C]" />
              <span>MULTILINGUAL AI EXTRACTION & CANONICAL NORMALIZATION</span>
            </h3>
            {reviewSaved && (
              <span className="text-[10px] bg-[#E8F5EF] text-[#16845B] border border-[#16845B]/30 px-2 py-0.5 rounded font-mono font-semibold flex items-center space-x-1">
                <CheckCircle2 size={11} />
                <span>Human Verified</span>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#087F8C] mt-1 font-semibold flex-wrap">
            <span className="text-[#617386]">WORKER'S LOCAL LANGUAGE</span>
            <ArrowRight size={12} className="text-[#91A0AE]" />
            <span className="text-[#087F8C]">LANGUAGE DETECTION & TRANSLATION</span>
            <ArrowRight size={12} className="text-[#91A0AE]" />
            <span className="text-[#16845B]">CANONICAL EXECUTION RECORD</span>
          </div>
        </div>

        {/* Confidence Badges */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <div className="flex items-center space-x-1.5 bg-[#F5F7F9] px-2.5 py-1.5 rounded-md border border-[#D8E1E8]">
            <Globe size={13} className="text-[#087F8C]" />
            <span className="text-[10px] font-mono uppercase text-[#617386]">Language:</span>
            <span className="text-xs font-bold font-mono text-[#16324F]">
              {originalLanguageName} {originalLanguageNative ? `(${originalLanguageNative})` : ''}
            </span>
            <span className="text-[10px] font-mono text-[#087F8C]">({langConfidencePct}%)</span>
          </div>

          <div className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md border ${
            isUncertain ? 'bg-[#FFF5DD] border-[#C98200]/30' : 'bg-[#E7F5F4] border-[#087F8C]/20'
          }`}>
            <span className="text-[10px] font-mono uppercase text-[#617386]">Extraction Conf:</span>
            <span className={`text-xs font-bold font-mono ${isUncertain ? 'text-[#C98200]' : 'text-[#087F8C]'}`}>
              {confidencePct}%
            </span>
          </div>
        </div>
      </div>

      {/* Uncertainty Notice (If < 85%) */}
      {isUncertain && !reviewSaved && (
        <div className="p-3 bg-[#FFF5DD] border border-[#C98200]/30 rounded-md text-xs text-[#8A5B00] flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <AlertTriangle size={16} className="text-[#C98200] shrink-0" />
            <span>
              <strong>Human Review Recommended:</strong> AI confidence is below 85% ({confidencePct}%). Verify parameters before schedule matching.
            </span>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-2.5 py-1 bg-white hover:bg-[#F5F7F9] text-[#16324F] text-[11px] font-semibold rounded border border-[#C98200]/40 transition-colors cursor-pointer"
          >
            Review & Edit
          </button>
        </div>
      )}

      {/* View Switcher: Original vs Translation vs Split View */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center space-x-1 bg-[#F5F7F9] p-1 rounded border border-[#D8E1E8] text-xs">
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              viewMode === 'split' ? 'bg-[#087F8C] text-white font-semibold' : 'text-[#617386] hover:text-[#17212B]'
            }`}
          >
            Side-by-Side Dual View
          </button>
          <button
            onClick={() => setViewMode('original')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              viewMode === 'original' ? 'bg-[#087F8C] text-white font-semibold' : 'text-[#617386] hover:text-[#17212B]'
            }`}
          >
            Worker's Original Report (Preserved)
          </button>
          <button
            onClick={() => setViewMode('translation')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              viewMode === 'translation' ? 'bg-[#087F8C] text-white font-semibold' : 'text-[#617386] hover:text-[#17212B]'
            }`}
          >
            Standardized English (PM View)
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-2.5 py-1 text-xs font-medium text-[#087F8C] hover:text-[#076f7b] border border-[#087F8C]/30 hover:border-[#087F8C] rounded bg-white flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <Edit3 size={12} />
              <span>Human Review / Edit Parameters</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="px-2.5 py-1 text-xs font-medium text-[#617386] hover:text-[#17212B] border border-[#D8E1E8] rounded bg-white flex items-center space-x-1 cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Cancel Edit</span>
            </button>
          )}
        </div>
      </div>

      {/* Two Column Layout: Source & Translation (Left) vs Extracted Structured Parameters (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT COLUMN: MULTILINGUAL REPORT PREVIEW */}
        <div className="bg-[#F5F7F9] rounded-lg border border-[#D8E1E8] p-4 flex flex-col justify-between space-y-3">
          {/* Sub-Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#D8E1E8]">
            <div className="flex items-center space-x-2">
              <Languages size={14} className="text-[#087F8C]" />
              <span className="text-xs font-bold text-[#16324F]">
                Field Ingestion & Translation Audit Trail
              </span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] font-mono text-[#16845B] bg-[#E8F5EF] px-2 py-0.5 rounded border border-[#16845B]/30 font-semibold">
              <ShieldCheck size={12} />
              <span>Original Immutably Preserved</span>
            </div>
          </div>

          {/* Dual Panel or Single Panel depending on viewMode */}
          <div className="space-y-3">
            {(viewMode === 'split' || viewMode === 'original') && (
              <div className="bg-white rounded-md border border-[#D8E1E8] p-3 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#617386] pb-1 border-b border-[#F0F4F8]">
                  <span className="font-bold text-[#16324F] flex items-center space-x-1">
                    <Globe size={11} className="text-[#087F8C]" />
                    <span>Worker's Native Language Report ({originalLanguageName})</span>
                  </span>
                  <span className="text-[#16845B] font-semibold">Immutable Original</span>
                </div>
                <div className="text-xs font-mono leading-relaxed text-[#17212B] whitespace-pre-wrap bg-[#F8FAFC] p-2.5 rounded border border-[#E2E8F0]">
                  {originalText}
                </div>
              </div>
            )}

            {(viewMode === 'split' || viewMode === 'translation') && (
              <div className="bg-white rounded-md border border-[#D8E1E8] p-3 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#617386] pb-1 border-b border-[#F0F4F8]">
                  <span className="font-bold text-[#16324F] flex items-center space-x-1">
                    <Languages size={11} className="text-[#087F8C]" />
                    <span>Standardized English Interpretation (Project Manager)</span>
                  </span>
                  <span className="text-[#087F8C] font-semibold">Confidence: {langConfidencePct}%</span>
                </div>
                <div className="text-xs font-mono leading-relaxed text-[#16324F] bg-[#F5F7F9] p-2.5 rounded border border-[#D8E1E8]">
                  {translatedText}
                </div>
              </div>
            )}
          </div>

          {/* Canonical Activity Normalization Callout */}
          <div className="p-2.5 rounded-md bg-[#E7F5F4] border border-[#087F8C]/20 text-xs font-mono flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-[#617386] uppercase font-sans font-semibold">Canonical Mapping:</span>
              <strong className="text-[#087F8C] font-bold">{canonicalId}</strong>
              <span className="text-[#17212B]">— {extraction.activity}</span>
            </div>
            <span className="text-[10px] text-[#16845B] font-semibold">Cross-Language Ready</span>
          </div>
        </div>

        {/* RIGHT COLUMN: EXTRACTED STRUCTURED PARAMETERS / HUMAN REVIEW */}
        <div className="bg-[#F5F7F9] rounded-lg border border-[#D8E1E8] p-4 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#D8E1E8]">
              <span className="text-xs font-bold text-[#16324F] uppercase tracking-wider">
                {isEditing ? "Human Review & Parameter Adjustment" : "Canonical Structured Execution Record"}
              </span>
              <StatusBadge status={reviewData.status || "Completed"} size="sm" />
            </div>

            {/* Editable Form or Structured Parameters Grid */}
            {isEditing ? (
              <div className="space-y-3 mt-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-[#617386] block mb-1">Execution Date</label>
                    <input
                      type="date"
                      value={reviewData.date}
                      onChange={(e) => setReviewData({ ...reviewData, date: e.target.value })}
                      className="w-full bg-white border border-[#D8E1E8] rounded px-2.5 py-1 text-xs text-[#17212B] focus:outline-none focus:border-[#087F8C]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#617386] block mb-1">Status</label>
                    <select
                      value={reviewData.status}
                      onChange={(e) => setReviewData({ ...reviewData, status: e.target.value })}
                      className="w-full bg-white border border-[#D8E1E8] rounded px-2.5 py-1 text-xs text-[#17212B] focus:outline-none"
                    >
                      <option value="completed">Completed</option>
                      <option value="in_progress">In Progress</option>
                      <option value="delayed">Delayed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#617386] block mb-1">Canonical Activity Name</label>
                  <input
                    type="text"
                    value={reviewData.activity}
                    onChange={(e) => setReviewData({ ...reviewData, activity: e.target.value })}
                    className="w-full bg-white border border-[#D8E1E8] rounded px-2.5 py-1 text-xs text-[#17212B] focus:outline-none focus:border-[#087F8C]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-[#617386] block mb-1">Quantity</label>
                    <input
                      type="number"
                      value={reviewData.quantity}
                      onChange={(e) => setReviewData({ ...reviewData, quantity: e.target.value })}
                      className="w-full bg-white border border-[#D8E1E8] rounded px-2.5 py-1 text-xs text-[#17212B] focus:outline-none focus:border-[#087F8C]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#617386] block mb-1">Unit</label>
                    <input
                      type="text"
                      value={reviewData.unit}
                      onChange={(e) => setReviewData({ ...reviewData, unit: e.target.value })}
                      className="w-full bg-white border border-[#D8E1E8] rounded px-2.5 py-1 text-xs text-[#17212B] focus:outline-none focus:border-[#087F8C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-[#617386] block mb-1">Location / Zone</label>
                    <input
                      type="text"
                      value={reviewData.location}
                      onChange={(e) => setReviewData({ ...reviewData, location: e.target.value })}
                      className="w-full bg-white border border-[#D8E1E8] rounded px-2.5 py-1 text-xs text-[#17212B] focus:outline-none focus:border-[#087F8C]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#617386] block mb-1">Chainage</label>
                    <input
                      type="text"
                      value={reviewData.chainage}
                      onChange={(e) => setReviewData({ ...reviewData, chainage: e.target.value })}
                      className="w-full bg-white border border-[#D8E1E8] rounded px-2.5 py-1 text-xs text-[#17212B] focus:outline-none focus:border-[#087F8C]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSaveReview}
                    disabled={isSavingReview}
                    className="px-4 py-1.5 bg-[#16845B] hover:bg-[#126d4b] text-white text-xs font-semibold rounded shadow-xs flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Save size={13} />
                    <span>{isSavingReview ? "Saving Verification..." : "Save & Mark Verified"}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 mt-3 text-xs font-mono">
                <div className="bg-white p-2.5 rounded-md border border-[#D8E1E8]">
                  <span className="text-[10px] text-[#617386] block">Execution Date</span>
                  <span className="font-bold text-[#17212B] text-sm">
                    {reviewData.date || "04 Sep 2026"}
                  </span>
                </div>

                <div className="bg-white p-2.5 rounded-md border border-[#D8E1E8]">
                  <span className="text-[10px] text-[#617386] block">Quantity Executed</span>
                  <span className="font-bold text-[#16845B] text-sm">
                    {Number(reviewData.quantity).toLocaleString()} {reviewData.unit || "m³"}
                  </span>
                </div>

                <div className="bg-white p-2.5 rounded-md border border-[#D8E1E8] col-span-2">
                  <span className="text-[10px] text-[#617386] block">Canonical Activity (WBS Linked)</span>
                  <span className="font-bold text-[#087F8C] text-sm">
                    {canonicalId} — {reviewData.activity}
                  </span>
                </div>

                <div className="bg-white p-2.5 rounded-md border border-[#D8E1E8]">
                  <span className="text-[10px] text-[#617386] block">Location</span>
                  <span className="font-semibold text-[#17212B]">
                    {reviewData.location || "Zone A"}
                  </span>
                </div>

                <div className="bg-white p-2.5 rounded-md border border-[#D8E1E8]">
                  <span className="text-[10px] text-[#617386] block">Chainage</span>
                  <span className="font-semibold text-[#17212B]">
                    {reviewData.chainage || "10+200 - 10+800"}
                  </span>
                </div>
              </div>
            )}

            {/* Explainability Breakdown */}
            <div className="mt-3 p-3 bg-white rounded-md border border-[#D8E1E8] font-mono text-xs space-y-1.5">
              <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#16324F]">
                WHY DID MULTILINGUAL NLU EXTRACT THIS?
              </div>
              <ul className="text-[11px] space-y-1 text-[#617386]">
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#087F8C]" />
                  <span>
                    Script / Language: <strong className="text-[#17212B] font-semibold">{originalLanguageName}</strong> ({langConfidencePct}% confidence)
                  </span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16845B]" />
                  <span>
                    Canonical synonym mapped: <strong className="text-[#16845B] font-semibold">{reviewData.activity}</strong> (A101)
                  </span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C98200]" />
                  <span>
                    Normalized quantity: <strong className="text-[#C98200] font-semibold">{Number(reviewData.quantity).toLocaleString()} {reviewData.unit}</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="mt-4 pt-3 border-t border-[#D8E1E8] flex justify-end">
            <button
              onClick={onRunMatching}
              disabled={isMatching}
              className="w-full sm:w-auto px-5 py-2 bg-[#087F8C] hover:bg-[#076f7b] text-white font-semibold rounded-md text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs cursor-pointer"
            >
              <span>{isMatching ? "Calculating Cross-Language Matches..." : "Proceed to Schedule Matching"}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
