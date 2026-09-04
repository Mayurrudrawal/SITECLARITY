import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Camera,
  Mic,
  Sparkles,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Globe,
  Languages,
  CheckCircle2,
  ListPlus
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, DEMO_MULTILINGUAL_SAMPLES } from '../config/languages.js';
import { createFieldReport } from '../services/api.js';

export function UploadZone({ onUploadSuccess, id }) {
  const [activeTab, setActiveTab] = useState('text'); // 'text', 'structured', 'pdf', 'photo', 'voice'
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [detectedLangInfo, setDetectedLangInfo] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  // Structured form state
  const [structuredForm, setStructuredForm] = useState({
    execution_date: '2026-09-04',
    location: 'Zone A',
    chainage: '10+200 - 10+800',
    activity: 'Earthwork Excavation (मिट्टी की खुदाई / மண் அகழ்வு)',
    quantity: '1200',
    unit: 'm³',
    status: 'completed',
    description: '4x excavators and 12x tippers deployed. Weather clear. Certified by Resident Engineer.',
    additional_notes: ''
  });

  // Client-side quick detection preview
  useEffect(() => {
    if (!textInput.trim()) {
      setDetectedLangInfo(null);
      return;
    }
    const t = textInput;
    if (/[\u0B80-\u0BFF]/.test(t)) {
      setDetectedLangInfo({ name: 'Tamil', nativeName: 'தமிழ்', code: 'ta', confidence: 0.99 });
    } else if (/[\u0900-\u097F]/.test(t)) {
      if (/\b(आहे|झाले|केले|आणि|मध्ये|स्वच्छ)\b/i.test(t)) {
        setDetectedLangInfo({ name: 'Marathi', nativeName: 'मराठी', code: 'mr', confidence: 0.98 });
      } else {
        setDetectedLangInfo({ name: 'Hindi', nativeName: 'हिन्दी', code: 'hi', confidence: 0.98 });
      }
    } else if (/[\u0C00-\u0C7F]/.test(t)) {
      setDetectedLangInfo({ name: 'Telugu', nativeName: 'తెలుగు', code: 'te', confidence: 0.99 });
    } else if (/[\u0980-\u09FF]/.test(t)) {
      setDetectedLangInfo({ name: 'Bengali', nativeName: 'বাংলা', code: 'bn', confidence: 0.99 });
    } else if (/[\u0A80-\u0AFF]/.test(t)) {
      setDetectedLangInfo({ name: 'Gujarati', nativeName: 'ગુજરાતી', code: 'gu', confidence: 0.99 });
    } else if (/[\u0C80-\u0CFF]/.test(t)) {
      setDetectedLangInfo({ name: 'Kannada', nativeName: 'ಕನ್ನಡ', code: 'kn', confidence: 0.99 });
    } else if (/[\u0D00-\u0D7F]/.test(t)) {
      setDetectedLangInfo({ name: 'Malayalam', nativeName: 'മലയാളം', code: 'ml', confidence: 0.99 });
    } else if (/[\u0A00-\u0A7F]/.test(t)) {
      setDetectedLangInfo({ name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', code: 'pa', confidence: 0.99 });
    } else if (/[\u0600-\u06FF]/.test(t)) {
      setDetectedLangInfo({ name: 'Urdu', nativeName: 'اردو', code: 'ur', confidence: 0.98 });
    } else if (/[a-zA-Z]/.test(t)) {
      setDetectedLangInfo({ name: 'English', nativeName: 'English', code: 'en', confidence: 0.97 });
    }
  }, [textInput]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processUpload(file);
  };

  const processUpload = async (fileOrText) => {
    setIsUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append('worker_language', selectedLanguage);

      if (typeof fileOrText === 'string') {
        formData.append('raw_text', fileOrText);
        formData.append('source_type', 'Daily Site Report');
      } else {
        formData.append('file', fileOrText);
        formData.append('source_type', activeTab === 'photo' ? 'Site Photo Inspection' : 'Daily Site Report');
      }

      const res = await fetch('/api/execution/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload execution evidence");

      if (onUploadSuccess) {
        onUploadSuccess(data);
      }
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleStructuredSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadError(null);
    try {
      const payload = {
        report_type: 'structured',
        report_language: selectedLanguage,
        ...structuredForm
      };
      const data = await createFieldReport(payload);
      if (onUploadSuccess) {
        onUploadSuccess(data);
      }
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLoadSample = (sample) => {
    setSelectedLanguage(sample.langCode);
    setTextInput(sample.text);
    setActiveTab('text');
  };

  return (
    <div id={id} className="bg-white border border-[#D8E1E8] rounded-lg p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-[#D8E1E8] gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xs font-bold text-[#16324F] uppercase tracking-wider">
              MULTILINGUAL SITE EVIDENCE & FIELD REPORTING
            </h3>
            <span className="text-[10px] bg-[#E7F5F4] text-[#087F8C] px-2 py-0.5 rounded font-mono font-semibold border border-[#087F8C]/20 flex items-center space-x-1">
              <Globe size={11} />
              <span>हिन्दी / Hindi</span>
            </span>
          </div>
          <p className="text-[11px] text-[#617386] mt-0.5">
            Site workers create reports in their preferred native language with automatic script detection, canonical activity mapping, and English translation for Project Managers.
          </p>
        </div>

        {/* Input Method Switcher */}
        <div className="flex items-center space-x-1 bg-[#F5F7F9] p-1 rounded-md border border-[#D8E1E8] text-xs self-start lg:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'text' ? 'bg-[#087F8C] text-white font-semibold' : 'text-[#617386] hover:text-[#17212B]'
            }`}
          >
            <Languages size={13} />
            <span>Text Report</span>
          </button>
          <button
            onClick={() => setActiveTab('structured')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'structured' ? 'bg-[#087F8C] text-white font-semibold' : 'text-[#617386] hover:text-[#17212B]'
            }`}
          >
            <ListPlus size={13} />
            <span>Structured Form</span>
          </button>
          <button
            onClick={() => setActiveTab('pdf')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'pdf' ? 'bg-[#087F8C] text-white font-semibold' : 'text-[#617386] hover:text-[#17212B]'
            }`}
          >
            <FileText size={13} />
            <span>PDF Upload</span>
          </button>
          <button
            onClick={() => setActiveTab('photo')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'photo' ? 'bg-[#087F8C] text-white font-semibold' : 'text-[#617386] hover:text-[#17212B]'
            }`}
          >
            <Camera size={13} />
            <span>Photo</span>
          </button>
          <button
            onClick={() => setActiveTab('voice')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'voice' ? 'bg-[#087F8C] text-white font-semibold' : 'text-[#617386] hover:text-[#17212B]'
            }`}
          >
            <Mic size={13} />
            <span>Voice Memo</span>
          </button>
        </div>
      </div>

      {/* Language Selector & Sample Presets Bar */}
      <div className="bg-[#F8FAFC] border border-[#D8E1E8] rounded-md p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Language Selection Dropdown */}
        <div className="flex items-center space-x-2.5">
          <label htmlFor="report-lang-select" className="text-xs font-semibold text-[#16324F] flex items-center space-x-1.5 whitespace-nowrap">
            <Globe size={14} className="text-[#087F8C]" />
            <span>Worker's Language:</span>
          </label>
          <div className="relative">
            <select
              id="report-lang-select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-white border border-[#D8E1E8] hover:border-[#087F8C] focus:border-[#087F8C] text-xs font-medium text-[#17212B] rounded-md px-2.5 py-1.5 focus:outline-none cursor-pointer pr-7"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} {lang.nativeName !== lang.name ? `(${lang.nativeName})` : ''}
                </option>
              ))}
            </select>
          </div>
          {detectedLangInfo && selectedLanguage === 'auto' && (
            <span className="text-[11px] font-mono text-[#087F8C] bg-[#E7F5F4] px-2 py-0.5 rounded border border-[#087F8C]/20 flex items-center space-x-1">
              <CheckCircle2 size={12} className="text-[#16845B]" />
              <span>Detected: <strong>{detectedLangInfo.name} ({detectedLangInfo.nativeName})</strong></span>
            </span>
          )}
        </div>

        {/* Quick Demo Multilingual Presets */}
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs">
          <span className="text-[11px] font-semibold text-[#617386] whitespace-nowrap">Quick Demo:</span>
          {DEMO_MULTILINGUAL_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => handleLoadSample(sample)}
              className="px-2.5 py-1 bg-white hover:bg-[#E7F5F4] hover:text-[#087F8C] hover:border-[#087F8C] text-[#16324F] text-[11px] font-medium rounded border border-[#D8E1E8] whitespace-nowrap transition-colors cursor-pointer"
              title={sample.title}
            >
              {sample.nativeLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panels */}
      <div>
        {/* 1. Free-form Native Language Text Report */}
        {activeTab === 'text' && (
          <div className="space-y-3">
            <div className="relative">
              <textarea
                rows={4}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Worker can write in native script or romanized language (e.g., 'आज ज़ोन ए में 1200 घन मीटर मिट्टी की खुदाई पूरी की गई...' or 'இன்று மண்டலம் A-வில் 1200 கன மீட்டர் மண் அகழ்வு...')"
                className="w-full bg-white border border-[#D8E1E8] focus:border-[#087F8C] rounded-md p-3 text-xs text-[#17212B] focus:outline-none placeholder-[#91A0AE] leading-relaxed"
              />
              {detectedLangInfo && (
                <div className="absolute bottom-2.5 right-3 text-[10px] font-mono bg-white/90 border border-[#D8E1E8] px-2 py-0.5 rounded text-[#617386]">
                  Language: <strong className="text-[#087F8C]">{detectedLangInfo.name}</strong> ({Math.round(detectedLangInfo.confidence * 100)}% conf)
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="text-[11px] text-[#617386]">
                Original worker report will be <strong className="text-[#17212B]">strictly preserved</strong> without overwriting.
              </div>

              <button
                type="button"
                onClick={() => processUpload(textInput)}
                disabled={isUploading || !textInput.trim()}
                className="w-full sm:w-auto px-5 py-2 bg-[#087F8C] hover:bg-[#076f7b] disabled:opacity-50 text-white font-semibold rounded-md text-xs transition-colors shadow-xs cursor-pointer flex items-center justify-center space-x-2"
              >
                <Sparkles size={13} />
                <span>{isUploading ? "Extracting & Translating..." : "Process Report with Multilingual AI"}</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. Structured Report Form */}
        {activeTab === 'structured' && (
          <form onSubmit={handleStructuredSubmit} className="space-y-4 bg-[#F8FAFC] border border-[#D8E1E8] rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-[#16324F] mb-1">Execution Date</label>
                <input
                  type="date"
                  value={structuredForm.execution_date}
                  onChange={(e) => setStructuredForm({ ...structuredForm, execution_date: e.target.value })}
                  className="w-full bg-white border border-[#D8E1E8] rounded px-3 py-1.5 text-xs text-[#17212B] focus:outline-none focus:border-[#087F8C]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#16324F] mb-1">Location / Zone</label>
                <input
                  type="text"
                  value={structuredForm.location}
                  onChange={(e) => setStructuredForm({ ...structuredForm, location: e.target.value })}
                  placeholder="e.g. Zone A / மண்டலம் A"
                  className="w-full bg-white border border-[#D8E1E8] rounded px-3 py-1.5 text-xs text-[#17212B] focus:outline-none focus:border-[#087F8C]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#16324F] mb-1">Chainage Range</label>
                <input
                  type="text"
                  value={structuredForm.chainage}
                  onChange={(e) => setStructuredForm({ ...structuredForm, chainage: e.target.value })}
                  placeholder="e.g. 10+200 - 10+800"
                  className="w-full bg-white border border-[#D8E1E8] rounded px-3 py-1.5 text-xs text-[#17212B] focus:outline-none focus:border-[#087F8C]"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-[#16324F] mb-1">Activity Description (Worker Native Language)</label>
                <input
                  type="text"
                  value={structuredForm.activity}
                  onChange={(e) => setStructuredForm({ ...structuredForm, activity: e.target.value })}
                  placeholder="e.g. मिट्टी की खुदाई / மண் அகழ்வு / Earthwork Excavation"
                  className="w-full bg-white border border-[#D8E1E8] rounded px-3 py-1.5 text-xs text-[#17212B] focus:outline-none focus:border-[#087F8C]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#16324F] mb-1">Quantity & Unit</label>
                <div className="flex space-x-1.5">
                  <input
                    type="number"
                    value={structuredForm.quantity}
                    onChange={(e) => setStructuredForm({ ...structuredForm, quantity: e.target.value })}
                    className="w-2/3 bg-white border border-[#D8E1E8] rounded px-3 py-1.5 text-xs text-[#17212B] focus:outline-none focus:border-[#087F8C]"
                    required
                  />
                  <select
                    value={structuredForm.unit}
                    onChange={(e) => setStructuredForm({ ...structuredForm, unit: e.target.value })}
                    className="w-1/3 bg-white border border-[#D8E1E8] rounded px-2 py-1.5 text-xs text-[#17212B] focus:outline-none"
                  >
                    <option value="m³">m³</option>
                    <option value="m²">m²</option>
                    <option value="m">m</option>
                    <option value="Nos">Nos</option>
                    <option value="km">km</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[11px] font-semibold text-[#16324F] mb-1">Site Notes / Worker Observations</label>
                <textarea
                  rows={2}
                  value={structuredForm.description}
                  onChange={(e) => setStructuredForm({ ...structuredForm, description: e.target.value })}
                  placeholder="Additional field remarks in local language..."
                  className="w-full bg-white border border-[#D8E1E8] rounded p-2 text-xs text-[#17212B] focus:outline-none focus:border-[#087F8C]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#D8E1E8]">
              <button
                type="submit"
                disabled={isUploading}
                className="px-5 py-2 bg-[#087F8C] hover:bg-[#076f7b] disabled:opacity-50 text-white font-semibold rounded-md text-xs transition-colors shadow-xs cursor-pointer flex items-center space-x-2"
              >
                <CheckCircle2 size={14} />
                <span>{isUploading ? "Processing Structured Report..." : "Submit Structured Report"}</span>
              </button>
            </div>
          </form>
        )}

        {/* 3. PDF Upload */}
        {activeTab === 'pdf' && (
          <div>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#D8E1E8] hover:border-[#087F8C] bg-[#F5F7F9] rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-[#E7F5F4] border border-[#087F8C]/20 flex items-center justify-center text-[#087F8C]">
                <FileCheck size={20} />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#17212B]">
                {isUploading ? "Extracting execution parameters with Multilingual AI..." : "Drop certified site report PDF here or click to browse"}
              </p>
              <p className="text-[11px] text-[#617386] mt-1 font-mono">
                Supports multilingual Daily Progress Reports (DPR), Measurement Books (MB), and Inspection Logs
              </p>
            </div>

            {/* Quick 1-Click Golden Report Option */}
            <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2 p-2.5 bg-[#F5F7F9] border border-[#D8E1E8] rounded-md">
              <div className="flex items-center space-x-2 text-xs">
                <ShieldCheck size={14} className="text-[#16845B]" />
                <span className="text-[#617386] font-mono text-[11px]">
                  Certified Evidence: <strong className="text-[#17212B]">Site_Report_0409.pdf</strong> (1,200 m³ Earthwork Excavation)
                </span>
              </div>
              <button
                onClick={() => processUpload(DEMO_MULTILINGUAL_SAMPLES[5].text)}
                disabled={isUploading}
                className="w-full sm:w-auto px-3 py-1 bg-white hover:bg-[#F5F7F9] text-[#16324F] text-xs font-semibold rounded-md border border-[#D8E1E8] flex items-center justify-center space-x-1 transition-colors cursor-pointer"
              >
                <Sparkles size={12} className="text-[#087F8C]" />
                <span>Load Certified Sample PDF</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. Photo Inspection */}
        {activeTab === 'photo' && (
          <div className="text-center p-6 bg-[#F5F7F9] rounded-lg border border-[#D8E1E8]">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#E7F5F4] border border-[#087F8C]/20 flex items-center justify-center text-[#087F8C]">
                <Camera size={20} />
              </div>
              <p className="text-xs font-semibold text-[#17212B]">
                Upload Geo-Tagged Site Inspection Photo
              </p>
              <p className="text-[11px] text-[#617386] mt-1 font-mono">
                Extracts GPS metadata, work activity, and physical completion from visual inspection
              </p>
            </div>
            <button
              onClick={() => processUpload("Inspection photo confirmed earthwork excavation in Zone A Chainage 10+200 - 10+800. Quantity estimate 1,200 m3 certified.")}
              disabled={isUploading}
              className="mt-3 px-3 py-1 bg-white hover:bg-[#F5F7F9] text-[#16324F] text-xs font-semibold rounded-md border border-[#D8E1E8] inline-flex items-center space-x-1 cursor-pointer"
            >
              <span>Load Geo-Tagged Photo Sample</span>
            </button>
          </div>
        )}

        {/* 5. Voice Memo */}
        {activeTab === 'voice' && (
          <div className="text-center p-6 bg-[#F5F7F9] rounded-lg border border-[#D8E1E8] space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#EAF2F8] flex items-center justify-center text-[#3977A9]">
              <Mic size={20} />
            </div>
            <p className="text-xs font-semibold text-[#17212B]">Voice Memo Intake in Regional Languages</p>
            <p className="text-[11px] text-[#617386] font-mono">
              Field engineer voice memo transcription into canonical execution parameters
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <button
                onClick={() => processUpload("आज साइट पर 1200 घन मीटर मिट्टी खुदाई पूरी हुई। काम ज़ोन ए में चेनिज 10+200 से 10+800 तक था।")}
                className="px-3 py-1 bg-white hover:bg-[#F5F7F9] text-[#16324F] text-xs font-semibold rounded-md border border-[#D8E1E8] cursor-pointer"
              >
                Simulate Hindi Voice Note (हिन्दी)
              </button>
              <button
                onClick={() => processUpload("இன்று தளத்தில் 1200 கன மீட்டர் மண் அகழ்வு பணி நிறைவு பெற்றது. மண்டலம் A 10+200 முதல் 10+800 வரை.")}
                className="px-3 py-1 bg-white hover:bg-[#F5F7F9] text-[#16324F] text-xs font-semibold rounded-md border border-[#D8E1E8] cursor-pointer"
              >
                Simulate Tamil Voice Note (தமிழ்)
              </button>
            </div>
          </div>
        )}

        {uploadError && (
          <div className="mt-3 p-3 bg-[#FDECEC] border border-[#C93636]/30 rounded-md text-xs text-[#C93636] flex items-center space-x-2">
            <AlertCircle size={15} />
            <span>{uploadError}</span>
          </div>
        )}
      </div>
    </div>
  );
}
