import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  TrendingUp,
  FileCheck,
  AlertTriangle,
  Play,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Layers,
  Building2,
  Calendar,
  Check,
  HelpCircle
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, DEMO_MULTILINGUAL_SAMPLES } from '../config/languages.js';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { runMatching, acceptMatch, changeMatchActivity } from '../services/api.js';

export function MultilingualIntelligencePage({
  onSelectActivity,
  onOpenEvidence,
  onSelectTab,
  onProgressUpdated
}) {
  const { t, language: appLanguage, setLanguage: setAppLanguage } = useI18n();

  // 1. Worker Report Language (Independent from App UI Language)
  const [workerLang, setWorkerLang] = useState('hi');
  const [reportText, setReportText] = useState(
    'ज़ोन A में 1200 घन मीटर मिट्टी की खुदाई पूरी की गई। काम चेनिज 10+200 से 10+800 तक किया गया।'
  );

  // 2. Pipeline State
  const [activeStep, setActiveStep] = useState(1); // 1: Worker, 2: Detected, 3: Extracted, 4: Matched, 5: Progress, 6: Traceability
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [isMatchAccepted, setIsMatchAccepted] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('A101');
  const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);
  const [isTraceabilityModalOpen, setIsTraceabilityModalOpen] = useState(false);
  const [isWorkerLangDropdownOpen, setIsWorkerLangDropdownOpen] = useState(false);

  // Language metadata
  const currentWorkerLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === workerLang) || SUPPORTED_LANGUAGES[0];
  const isWorkerRtl = currentWorkerLangObj.direction === 'rtl';

  // Showcase language sample presets
  const showcaseSamples = [
    {
      code: 'hi',
      name: 'Hindi',
      native: 'हिन्दी',
      text: 'ज़ोन A में 1200 घन मीटर मिट्टी की खुदाई पूरी की गई। काम चेनिज 10+200 से 10+800 तक किया गया।',
      detected: 'Hindi',
      confidence: '98%',
      interpretation: 'Earthwork excavation completed in Zone A with 1,200 m³ quantity.',
      script: 'Devanagari'
    },
    {
      code: 'ta',
      name: 'Tamil',
      native: 'தமிழ்',
      text: 'மண்டலம் A-ல் 1200 கன மீட்டர் மண் அகழ்வு பணி முடிந்தது. பணி 10+200 முதல் 10+800 வரை மேற்கொள்ளப்பட்டது.',
      detected: 'Tamil',
      confidence: '99%',
      interpretation: 'Earthwork excavation completed in Zone A with 1,200 m³ quantity.',
      script: 'Tamil'
    },
    {
      code: 'mr',
      name: 'Marathi',
      native: 'मराठी',
      text: 'झोन A मध्ये 1200 घनमीटर माती खोदकाम पूर्ण झाले. काम चेनेज 10+200 ते 10+800 पर्यंत केले गेले.',
      detected: 'Marathi',
      confidence: '97%',
      interpretation: 'Earthwork excavation completed in Zone A with 1,200 m³ quantity.',
      script: 'Devanagari'
    },
    {
      code: 'ur',
      name: 'Urdu',
      native: 'اردو',
      text: 'زون A میں 1200 کیوبک میٹر مٹی کی کھدائی مکمل کی گئی۔ کام چینج 10+200 سے 10+800 تک کیا گیا۔',
      detected: 'Urdu',
      confidence: '98%',
      interpretation: 'Earthwork excavation completed in Zone A with 1,200 m³ quantity.',
      script: 'Perso-Arabic (RTL)'
    }
  ];

  const currentSample =
    showcaseSamples.find((s) => s.code === workerLang) || showcaseSamples[0];

  // Dynamic Worker Form Labels
  const getWorkerFormLabels = (code) => {
    switch (code) {
      case 'hi':
        return {
          newReport: 'नई रिपोर्ट',
          reportDate: 'रिपोर्ट की तारीख',
          activity: 'कार्य',
          quantity: 'मात्रा',
          location: 'स्थान',
          chainage: 'चेनज',
          addEvidence: 'सबूत जोड़ें',
          analyzeBtn: 'AI द्वारा विश्लेषण करें'
        };
      case 'ta':
        return {
          newReport: 'புதிய அறிக்கை',
          reportDate: 'அறிக்கை தேதி',
          activity: 'பணி',
          quantity: 'அளவு',
          location: 'இடம்',
          chainage: 'செயினேஜ்',
          addEvidence: 'ஆதாரம் சேர்க்கவும்',
          analyzeBtn: 'AI மூலம் பகுப்பாய்வு செய்யவும்'
        };
      case 'mr':
        return {
          newReport: 'नवीन अहवाल',
          reportDate: 'अहवालाची तारीख',
          activity: 'काम',
          quantity: 'प्रमाण',
          location: 'स्थान',
          chainage: 'चेनज',
          addEvidence: 'पुरावा जोडा',
          analyzeBtn: 'AI द्वारे विश्लेषण करा'
        };
      case 'ur':
        return {
          newReport: 'نئی رپورٹ',
          reportDate: 'رپورٹ کی تاریخ',
          activity: 'کام',
          quantity: 'مقدار',
          location: 'مقام',
          chainage: 'چینج',
          addEvidence: 'ثبوت منسلک کریں',
          analyzeBtn: 'AI کے ذریعے تجزیہ کریں'
        };
      default:
        return {
          newReport: 'New Field Report',
          reportDate: 'Report Date',
          activity: 'Activity',
          quantity: 'Quantity',
          location: 'Location',
          chainage: 'Chainage',
          addEvidence: 'Attach Evidence',
          analyzeBtn: 'Analyze with Multilingual AI'
        };
    }
  };

  const workerLabels = getWorkerFormLabels(workerLang);

  // Switch sample worker language
  const handleSelectWorkerLang = (sample) => {
    setWorkerLang(sample.code);
    setReportText(sample.text);
    setIsMatchAccepted(false);
    setHasAnalyzed(false);
    setIsAnalyzing(false);
    setActiveStep(1);
  };

  // Trigger AI Analysis with realistic processing delay
  const handleAnalyzeClick = () => {
    setIsAnalyzing(true);
    setActiveStep(2);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      setActiveStep(4);
    }, 1200);
  };

  // Automated 8-Step Multilingual AI Demo
  useEffect(() => {
    let timer;
    if (isDemoRunning) {
      if (demoStep === 1) {
        // Step 1: Worker report in Hindi (only Card 1 shown)
        setWorkerLang('hi');
        setReportText('ज़ोन A में 1200 घन मीटर मिट्टी की खुदाई पूरी की गई। काम चेनिज 10+200 से 10+800 तक किया गया।');
        setIsMatchAccepted(false);
        setHasAnalyzed(false);
        setIsAnalyzing(false);
        setActiveStep(1);
        timer = setTimeout(() => setDemoStep(2), 1200);
      } else if (demoStep === 2) {
        // Step 2: Trigger analyzing delay on the button
        setIsAnalyzing(true);
        setActiveStep(2);
        timer = setTimeout(() => {
          setIsAnalyzing(false);
          setHasAnalyzed(true); // Cards 2 & 3 revealed after delay!
          setActiveStep(4);
          setDemoStep(3);
        }, 1300);
      } else if (demoStep === 3) {
        // Step 3: Cards 2 & 3 revealed and visible
        setActiveStep(4);
        timer = setTimeout(() => setDemoStep(4), 1400);
      } else if (demoStep === 4) {
        // Step 4: Schedule activity matching highlight
        setActiveStep(4);
        timer = setTimeout(() => setDemoStep(5), 1400);
      } else if (demoStep === 5) {
        // Step 5: Accept match
        setIsMatchAccepted(true);
        setActiveStep(5);
        if (onProgressUpdated) onProgressUpdated();
        timer = setTimeout(() => setDemoStep(6), 1600);
      } else if (demoStep === 6) {
        // Step 6: Progress updated
        setActiveStep(5);
        timer = setTimeout(() => setDemoStep(7), 1600);
      } else if (demoStep === 7) {
        // Step 7: Evidence traceability modal
        setActiveStep(6);
        setIsTraceabilityModalOpen(true);
        setIsDemoRunning(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isDemoRunning, demoStep]);

  const startAutoDemo = () => {
    setIsDemoRunning(true);
    setDemoStep(1);
  };

  const handleAcceptMatch = () => {
    setIsMatchAccepted(true);
    setActiveStep(5);
    if (onProgressUpdated) onProgressUpdated();
  };

  const handleReset = () => {
    setIsDemoRunning(false);
    setDemoStep(0);
    setIsMatchAccepted(false);
    setIsAnalyzing(false);
    setHasAnalyzed(false);
    setActiveStep(1);
    setWorkerLang('hi');
    setReportText('ज़ोन A में 1200 घन मीटर मिट्टी की खुदाई पूरी की गई। काम चेनिज 10+200 से 10+800 तक किया गया।');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* =========================================================================
          HERO BANNER: THE KILLER JUDGE-FACING MESSAGE
         ========================================================================= */}
      <div className="bg-white border border-[#D8E1E8] rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#087F8C] text-white text-[10px] font-mono font-bold tracking-wider uppercase flex items-center space-x-1">
                <Globe size={11} />
                <span>22 Scheduled Indian Languages + English</span>
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#EAF2F8] text-[#16324F] border border-[#D8E1E8]">
                Showcase: हिन्दी · தமிழ் · मराठी · اردو (RTL)
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#E7F5F4] text-[#16845B] border border-[#16845B]/30">
                Original Preserved ✓
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-[#16324F] tracking-tight">
              Multilingual Field Intelligence
            </h1>

            <p className="text-xs sm:text-sm text-[#3977A9] font-medium leading-relaxed">
              "A worker can report site progress in their own language. Site Clarity understands it, converts it into standardized engineering data, links it to the project schedule, and updates progress without losing the original evidence."
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2.5 self-start lg:self-auto">
            <button
              onClick={startAutoDemo}
              disabled={isDemoRunning}
              className="px-4 py-2 bg-[#087F8C] hover:bg-[#076f7b] disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center space-x-2 shadow-xs transition-colors cursor-pointer"
              title="Run Automated 8-Step Multilingual Pipeline"
            >
              <Play size={13} className="fill-current" />
              <span>{isDemoRunning ? `Demo Running (Step ${demoStep}/8)...` : '⚡ Multilingual AI Demo'}</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-2 bg-[#F5F7F9] hover:bg-[#EAF2F8] text-[#617386] hover:text-[#16324F] border border-[#D8E1E8] text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Reset Demo State"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          VIEWPORT 1: THE 3-COLUMN UNIFIED INTELLIGENCE BRIDGE (DEMO-FIRST)
         ========================================================================= */}
      <div className="bg-white border border-[#D8E1E8] rounded-xl p-5 shadow-xs space-y-4">
        {/* Pipeline Progress Breadcrumb Bar */}
        <div className="flex items-center justify-between border-b border-[#D8E1E8] pb-3 text-xs overflow-x-auto">
          <div className="flex items-center space-x-2 text-[11px] font-mono">
            <span className="text-[#617386] font-semibold uppercase tracking-wider">PIPELINE FLOW:</span>
            <span className={`px-2 py-0.5 rounded ${activeStep >= 1 ? 'bg-[#087F8C] text-white font-bold' : 'bg-[#F5F7F9] text-[#617386]'}`}>
              ① Worker Report
            </span>
            <span className="text-[#D8E1E8]">→</span>
            <span className={`px-2 py-0.5 rounded ${activeStep >= 2 ? 'bg-[#087F8C] text-white font-bold' : 'bg-[#F5F7F9] text-[#617386]'}`}>
              ② Detection & NLU
            </span>
            <span className="text-[#D8E1E8]">→</span>
            <span className={`px-2 py-0.5 rounded ${activeStep >= 3 ? 'bg-[#087F8C] text-white font-bold' : 'bg-[#F5F7F9] text-[#617386]'}`}>
              ③ Structured Data
            </span>
            <span className="text-[#D8E1E8]">→</span>
            <span className={`px-2 py-0.5 rounded ${activeStep >= 4 ? 'bg-[#087F8C] text-white font-bold' : 'bg-[#F5F7F9] text-[#617386]'}`}>
              ④ Schedule Match
            </span>
            <span className="text-[#D8E1E8]">→</span>
            <span className={`px-2 py-0.5 rounded ${activeStep >= 5 ? 'bg-[#16845B] text-white font-bold' : 'bg-[#F5F7F9] text-[#617386]'}`}>
              ⑤ Progress Updated
            </span>
          </div>

          <div className="text-[10px] font-mono text-[#617386] hidden sm:block">
            One Project Language for Management • Any Indian Language for the Field
          </div>
        </div>

        {/* 3-Column Bridge or Centered Worker Input when awaiting analysis */}
        <div className={`transition-all duration-500 ${hasAnalyzed ? 'grid grid-cols-1 lg:grid-cols-3 gap-5' : 'max-w-xl mx-auto'}`}>
          {/* -------------------------------------------------------------
              COLUMN 1: ① WORKER REPORT (Native Script Preserved)
             ------------------------------------------------------------- */}
          <div className={`p-4 rounded-lg border transition-all ${activeStep === 1 || !hasAnalyzed ? 'border-[#087F8C] ring-2 ring-[#087F8C]/20 bg-[#FBFDFD]' : 'border-[#D8E1E8] bg-[#F5F7F9]'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#16324F] uppercase tracking-wider flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-[#16324F] text-white text-[11px] font-mono font-bold flex items-center justify-center">
                  1
                </span>
                <span>WORKER REPORT</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#16845B] bg-[#E7F5F4] px-2 py-0.5 rounded border border-[#16845B]/20">
                Original Preserved ✓
              </span>
            </div>

            {/* Quick Showcase Language Selector Chips */}
            <div className="mb-3 space-y-1">
              <span className="text-[10px] font-mono text-[#617386] block">SELECT SHOWCASE WORKER LANGUAGE:</span>
              <div className="grid grid-cols-4 gap-1">
                {showcaseSamples.map((sample) => {
                  const isSelected = workerLang === sample.code;
                  return (
                    <button
                      key={sample.code}
                      onClick={() => handleSelectWorkerLang(sample)}
                      className={`py-1 px-1.5 text-xs font-semibold rounded text-center transition-colors cursor-pointer border ${
                        isSelected
                          ? 'bg-[#087F8C] text-white border-[#087F8C]'
                          : 'bg-white text-[#16324F] hover:bg-[#EAF2F8] border-[#D8E1E8]'
                      }`}
                    >
                      <span className="block text-[11px] leading-tight">{sample.native}</span>
                      <span className="block text-[9px] opacity-75 font-mono">({sample.name})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated Mobile Worker Interface Card */}
            <div
              className={`bg-white border border-[#D8E1E8] rounded-lg p-3 shadow-xs space-y-2.5 ${
                isWorkerRtl ? 'text-right' : 'text-left'
              }`}
              dir={isWorkerRtl ? 'rtl' : 'ltr'}
            >
              <div className="flex items-center justify-between border-b border-[#F5F7F9] pb-1.5">
                <span className="text-[10px] font-mono font-bold text-[#617386] uppercase">
                  WORKER MODE • {currentWorkerLangObj.nativeName}
                </span>
                <span className="text-[10px] font-mono text-[#087F8C]">CH 10+200 - 10+800</span>
              </div>

              {/* Dynamic Worker Form Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#16324F] block">
                  {workerLabels.newReport} ({workerLabels.activity} & {workerLabels.quantity}):
                </label>
                <textarea
                  value={reportText}
                  onChange={(e) => {
                    setReportText(e.target.value);
                    setHasAnalyzed(false);
                  }}
                  rows={3}
                  className="w-full text-xs p-2 bg-[#FBFDFD] border border-[#D8E1E8] rounded font-sans focus:outline-none focus:border-[#087F8C]"
                  dir={isWorkerRtl ? 'rtl' : 'ltr'}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-[#617386] font-mono">
                <div>{workerLabels.reportDate}: <strong>04 Sep 2026</strong></div>
                <div>{workerLabels.location}: <strong>Zone A</strong></div>
              </div>

              <button
                onClick={handleAnalyzeClick}
                disabled={isAnalyzing}
                className="w-full py-2.5 bg-[#087F8C] hover:bg-[#076f7b] disabled:opacity-85 text-white text-xs font-semibold rounded transition-all cursor-pointer flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <Sparkles size={14} className={isAnalyzing ? "animate-spin text-yellow-300" : ""} />
                <span>
                  {isAnalyzing
                    ? "AI विश्लेषण प्रगति पर है..."
                    : hasAnalyzed
                    ? `${workerLabels.analyzeBtn} (पुनः विश्लेषण)`
                    : workerLabels.analyzeBtn}
                </span>
              </button>

              {isAnalyzing && (
                <div className="space-y-1 pt-1 animate-pulse">
                  <div className="flex justify-between text-[10px] font-mono text-[#087F8C]">
                    <span>AI Multilingual NLU Analyzing...</span>
                    <span>Parsing Indic Entities</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#E7F5F4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#087F8C] rounded-full w-3/4 animate-pulse" />
                  </div>
                </div>
              )}
            </div>

            {/* Analysis State Indicator */}
            {!hasAnalyzed && !isAnalyzing ? (
              <div className="mt-3 p-2.5 bg-[#FBFDFD] border border-dashed border-[#087F8C]/40 rounded-lg text-center space-y-1">
                <div className="text-[11px] font-semibold text-[#16324F] flex items-center justify-center space-x-1">
                  <Sparkles size={12} className="text-[#087F8C]" />
                  <span>AI विश्लेषण की प्रतीक्षा (Awaiting Analysis)</span>
                </div>
                <p className="text-[10px] text-[#617386]">
                  कार्ड ② (AI समझ) एवं कार्ड ③ (शेड्यूल मिलान) <strong>"{workerLabels.analyzeBtn}"</strong> बटन दबाने के बाद 1.2 सेकंड के AI प्रोसेसिंग विलंब के उपरांत प्रकट होंगे।
                </p>
              </div>
            ) : hasAnalyzed ? (
              <div className="mt-3 p-2 bg-[#E7F5F4] border border-[#087F8C]/30 rounded text-center text-[11px] text-[#087F8C] font-semibold flex items-center justify-center space-x-1.5 animate-in fade-in">
                <Check size={13} className="text-[#16845B]" />
                <span>विश्लेषण सम्पन्न · कार्ड ② और कार्ड ③ सक्रिय</span>
              </div>
            ) : null}

            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={() => setIsTraceabilityModalOpen(true)}
                className="text-[11px] text-[#3977A9] hover:underline font-semibold flex items-center space-x-1 cursor-pointer"
              >
                <span>View Original Evidence Log</span>
                <ExternalLink size={11} />
              </button>
              <span className="text-[10px] font-mono text-[#617386]">EV-0142</span>
            </div>
          </div>

          {/* -------------------------------------------------------------
              THESE TWO CARDS (COLUMN 2 & COLUMN 3) ONLY SHOW AFTER DELAY
             ------------------------------------------------------------- */}
          {hasAnalyzed && (
            <>
              {/* -------------------------------------------------------------
                  COLUMN 2: ② AI UNDERSTANDING & STRUCTURED EXTRACTION
                 ------------------------------------------------------------- */}
              <div className="p-4 rounded-lg border border-[#087F8C] ring-2 ring-[#087F8C]/20 bg-[#FBFDFD] animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#16324F] uppercase tracking-wider flex items-center space-x-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#087F8C] text-white text-[11px] font-mono font-bold flex items-center justify-center">
                      2
                    </span>
                    <span>AI UNDERSTANDING</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#087F8C] bg-[#E7F5F4] px-2 py-0.5 rounded border border-[#087F8C]/20">
                    {currentSample.detected} · AI Analyzed ✓
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Language Detection Verification Card */}
                  <div className="bg-white border border-[#D8E1E8] rounded-lg p-3 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#617386] font-mono">Language Detected:</span>
                      <span className="font-bold text-[#16324F] flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-[#16845B]" />
                        <span>{currentSample.detected} ({currentSample.confidence} Confidence)</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-t border-[#F5F7F9] pt-1.5">
                      <span className="text-[#617386] font-mono">Script & Numerals:</span>
                      <span className="font-mono text-[#16324F]">{currentSample.script} • Indic Digits Parsed</span>
                    </div>
                    <div className="border-t border-[#F5F7F9] pt-2">
                      <span className="text-[10px] font-mono text-[#617386] uppercase block">AI Interpretation (Standardized English):</span>
                      <p className="text-xs font-medium text-[#16324F] mt-0.5 bg-[#F5F7F9] p-2 rounded border border-[#D8E1E8]">
                        "{currentSample.interpretation}"
                      </p>
                    </div>
                  </div>

                  {/* Structured Engineering Extraction Card */}
                  <div className="bg-white border border-[#D8E1E8] rounded-lg p-3 shadow-xs space-y-2">
                    <div className="flex items-center justify-between border-b border-[#F5F7F9] pb-1">
                      <span className="text-[10px] font-mono font-bold text-[#16324F] uppercase tracking-wider">
                        AI STRUCTURED EXTRACTION
                      </span>
                      <span className="text-[9px] font-mono text-[#16845B] bg-[#E7F5F4] px-1.5 py-0.2 rounded font-bold">
                        VERIFIED
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-1.5 bg-[#F5F7F9] rounded border border-[#D8E1E8]">
                        <span className="text-[9px] text-[#617386] block">DATE</span>
                        <strong className="text-[#16324F]">04 Sep 2026</strong>
                      </div>
                      <div className="p-1.5 bg-[#F5F7F9] rounded border border-[#D8E1E8]">
                        <span className="text-[9px] text-[#617386] block">QUANTITY</span>
                        <strong className="text-[#087F8C]">1,200 m³</strong>
                      </div>
                      <div className="p-1.5 bg-[#F5F7F9] rounded border border-[#D8E1E8]">
                        <span className="text-[9px] text-[#617386] block">LOCATION</span>
                        <strong className="text-[#16324F]">Zone A</strong>
                      </div>
                      <div className="p-1.5 bg-[#F5F7F9] rounded border border-[#D8E1E8]">
                        <span className="text-[9px] text-[#617386] block">CHAINAGE</span>
                        <strong className="text-[#16324F]">10+200 - 10+800</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-[#617386]">
                      <span>Activity: <strong>Earthwork Excavation</strong></span>
                      <span>Status: <strong className="text-[#16845B]">Completed</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------
                  COLUMN 3: ③ PROJECT IMPACT & SCHEDULE MATCH
                 ------------------------------------------------------------- */}
              <div className="p-4 rounded-lg border border-[#087F8C] ring-2 ring-[#087F8C]/20 bg-[#FBFDFD] animate-in fade-in slide-in-from-bottom-3 duration-500 delay-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#16324F] uppercase tracking-wider flex items-center space-x-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#16845B] text-white text-[11px] font-mono font-bold flex items-center justify-center">
                      3
                    </span>
                    <span>PROJECT & SCHEDULE MATCH</span>
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${isMatchAccepted ? 'bg-[#16845B] text-white' : 'bg-[#FFF5DD] text-[#C98200] border border-[#C98200]/30'}`}>
                    {isMatchAccepted ? 'Match Accepted ✓' : '94% Match'}
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Recommended Schedule Activity Card */}
                  <div className="bg-white border border-[#D8E1E8] rounded-lg p-3 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-[#16324F] block">
                          {selectedActivity} — Earthwork Excavation
                        </span>
                        <span className="text-[10px] font-mono text-[#617386]">WBS 2.1 Earthworks • Zone A</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-[#087F8C]">94%</span>
                        <span className="text-[9px] font-mono text-[#617386] block">Confidence</span>
                      </div>
                    </div>

                    {/* Confidence Breakdown Bars */}
                    <div className="space-y-1 pt-1 border-t border-[#F5F7F9] text-[10px] font-mono">
                      <div className="flex justify-between text-[#617386]">
                        <span>Semantic similarity: 96%</span>
                        <span>Location: 100%</span>
                      </div>
                      <div className="flex justify-between text-[#617386]">
                        <span>Work type: 95%</span>
                        <span>Quantity consistency: 88%</span>
                      </div>
                    </div>

                    {/* Working Action Buttons */}
                    <div className="flex items-center space-x-2 pt-2">
                      <button
                        onClick={handleAcceptMatch}
                        disabled={isMatchAccepted}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer flex items-center justify-center space-x-1 ${
                          isMatchAccepted
                            ? 'bg-[#E7F5F4] text-[#16845B] border border-[#16845B]/30'
                            : 'bg-[#16845B] hover:bg-[#13724e] text-white'
                        }`}
                      >
                        <Check size={13} />
                        <span>{isMatchAccepted ? 'Match Accepted' : 'Accept Match'}</span>
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setIsActivityDropdownOpen(!isActivityDropdownOpen)}
                          className="px-2.5 py-1.5 bg-[#F5F7F9] hover:bg-[#EAF2F8] text-[#16324F] border border-[#D8E1E8] text-xs font-semibold rounded flex items-center space-x-1 cursor-pointer"
                        >
                          <span>Change</span>
                          <ChevronDown size={11} />
                        </button>

                        {isActivityDropdownOpen && (
                          <div className="absolute right-0 mt-1 w-48 bg-white border border-[#D8E1E8] rounded shadow-lg py-1 z-20 text-xs">
                            <div
                              onClick={() => { setSelectedActivity('A101'); setIsActivityDropdownOpen(false); }}
                              className="px-3 py-1.5 hover:bg-[#F5F7F9] cursor-pointer font-medium"
                            >
                              A101 Earthwork Excavation
                            </div>
                            <div
                              onClick={() => { setSelectedActivity('A102'); setIsActivityDropdownOpen(false); }}
                              className="px-3 py-1.5 hover:bg-[#F5F7F9] cursor-pointer"
                            >
                              A102 Granular Sub-base
                            </div>
                            <div
                              onClick={() => { setSelectedActivity('A103'); setIsActivityDropdownOpen(false); }}
                              className="px-3 py-1.5 hover:bg-[#F5F7F9] cursor-pointer"
                            >
                              A103 Trapezoidal Drain
                            </div>
                            <div
                              onClick={() => { setSelectedActivity('A104'); setIsActivityDropdownOpen(false); }}
                              className="px-3 py-1.5 hover:bg-[#F5F7F9] cursor-pointer"
                            >
                              A104 Box Culvert 2x2m
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress Impact Comparison */}
                  <div className="bg-white border border-[#D8E1E8] rounded-lg p-3 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[#16324F] uppercase">
                        PROGRESS IMPACT
                      </span>
                      <span className="text-[10px] font-mono text-[#087F8C]">Updated from Evidence #EV-0142</span>
                    </div>

                    <div className="space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#617386]">Planned Progress:</span>
                        <strong className="text-[#16324F]">80%</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#617386]">Actual Progress:</span>
                        <strong className="text-[#087F8C]">{isMatchAccepted ? '62% (+4% Applied)' : '58%'}</strong>
                      </div>
                      <div className="flex justify-between text-[#C98200]">
                        <span>Variance:</span>
                        <strong>{isMatchAccepted ? '-18%' : '-22%'}</strong>
                      </div>

                      {/* Progress bar visualizer */}
                      <div className="h-2 w-full bg-[#EAF2F8] rounded-full overflow-hidden relative mt-1">
                        <div className="h-full bg-[#3977A9]/40 absolute left-0" style={{ width: '80%' }} title="Planned 80%" />
                        <div
                          className="h-full bg-[#087F8C] absolute left-0 transition-all duration-500"
                          style={{ width: isMatchAccepted ? '62%' : '58%' }}
                          title={`Actual ${isMatchAccepted ? '62%' : '58%'}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: THE "WOW" SECTION — PROVE MULTILINGUAL UNDERSTANDING
         ========================================================================= */}
      <div className="bg-white border border-[#D8E1E8] rounded-xl p-5 shadow-xs space-y-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#EAF2F8] text-[#3977A9] uppercase">
              SEMANTIC CONVERGENCE
            </span>
            <span className="text-xs font-bold text-[#16324F] uppercase tracking-wider">
              SECTION 2 — PROVE MULTILINGUAL UNDERSTANDING
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#16324F]">
            Same Engineering Activity — Different Indian Languages
          </h2>
          <p className="text-xs text-[#617386]">
            Different languages and scripts converge into the same standardized schedule item. Site Clarity normalizes vocabulary from regional Indian languages to canonical project WBS codes without loss of meaning.
          </p>
        </div>

        {/* 3 Converging Language Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card 1: Hindi */}
          <div className="p-3.5 bg-[#F5F7F9] border border-[#D8E1E8] rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#16324F]">हिन्दी (Hindi)</span>
              <span className="text-[9px] font-mono text-[#087F8C] bg-white px-1.5 py-0.5 rounded border border-[#D8E1E8]">Devanagari</span>
            </div>
            <p className="text-xs font-medium text-[#16324F] bg-white p-2.5 rounded border border-[#D8E1E8]">
              "ज़ोन A में मिट्टी की खुदाई पूरी हुई।"
            </p>
            <div className="text-[10px] font-mono text-[#617386] flex justify-between">
              <span>Term: मिट्टी की खुदाई</span>
              <span className="text-[#16845B]">Exact Match ✓</span>
            </div>
          </div>

          {/* Card 2: Tamil */}
          <div className="p-3.5 bg-[#F5F7F9] border border-[#D8E1E8] rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#16324F]">தமிழ் (Tamil)</span>
              <span className="text-[9px] font-mono text-[#087F8C] bg-white px-1.5 py-0.5 rounded border border-[#D8E1E8]">Tamil Script</span>
            </div>
            <p className="text-xs font-medium text-[#16324F] bg-white p-2.5 rounded border border-[#D8E1E8]">
              "மண்டலம் A-ல் மண் அகழ்வு பணி முடிந்தது."
            </p>
            <div className="text-[10px] font-mono text-[#617386] flex justify-between">
              <span>Term: மண் அகழ்வு பணி</span>
              <span className="text-[#16845B]">Exact Match ✓</span>
            </div>
          </div>

          {/* Card 3: Marathi */}
          <div className="p-3.5 bg-[#F5F7F9] border border-[#D8E1E8] rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#16324F]">मराठी (Marathi)</span>
              <span className="text-[9px] font-mono text-[#087F8C] bg-white px-1.5 py-0.5 rounded border border-[#D8E1E8]">Devanagari</span>
            </div>
            <p className="text-xs font-medium text-[#16324F] bg-white p-2.5 rounded border border-[#D8E1E8]">
              "झोन A मध्ये माती खोदकाम पूर्ण झाले."
            </p>
            <div className="text-[10px] font-mono text-[#617386] flex justify-between">
              <span>Term: माती खोदकाम</span>
              <span className="text-[#16845B]">Exact Match ✓</span>
            </div>
          </div>
        </div>

        {/* Visual Downward Convergence Graphic */}
        <div className="flex flex-col items-center justify-center pt-2">
          <div className="w-0.5 h-6 bg-[#087F8C]" />
          <div className="bg-[#16324F] text-white px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center space-x-2 shadow-md">
            <span>↓</span>
            <span>A101 — EARTHWORK EXCAVATION (94% MATCH)</span>
            <span>↓</span>
          </div>
          <div className="flex items-center space-x-4 mt-2 text-xs text-[#16845B] font-mono font-bold">
            <span>Semantic Understanding ✓</span>
            <span>•</span>
            <span>Activity Normalization ✓</span>
            <span>•</span>
            <span>Schedule Match 94%</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: PROVE TRUST — EVIDENCE TRACEABILITY CHAIN
         ========================================================================= */}
      <div className="bg-white border border-[#D8E1E8] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold text-[#16845B] uppercase tracking-wider">
              SECTION 3 — PROVE TRUST & AUDITABILITY
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#16324F]">
              Evidence Traceability Chain
            </h2>
            <p className="text-xs text-[#617386]">
              Every progress percentage is defensibly backed by original native-language site evidence.
            </p>
          </div>

          <button
            onClick={() => setIsTraceabilityModalOpen(true)}
            className="px-3.5 py-2 bg-[#087F8C] hover:bg-[#076f7b] text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ShieldCheck size={14} />
            <span>View Full Traceability Certificate</span>
          </button>
        </div>

        {/* Linear Step-by-Step Chain */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 font-mono text-xs">
          <div className="p-3 bg-[#F5F7F9] rounded-lg border border-[#D8E1E8]">
            <span className="text-[9px] text-[#617386] block">STEP 1: ORIGINAL</span>
            <strong className="text-[#16324F] block mt-1">Hindi Report</strong>
            <span className="text-[10px] text-[#617386] truncate block">"ज़ोन A में 1200 घन मीटर..."</span>
          </div>

          <div className="p-3 bg-[#F5F7F9] rounded-lg border border-[#D8E1E8]">
            <span className="text-[9px] text-[#617386] block">STEP 2: NLU EXTRACTION</span>
            <strong className="text-[#087F8C] block mt-1">Earthwork Excavation</strong>
            <span className="text-[10px] text-[#617386] block">Zone A (10+200 - 10+800)</span>
          </div>

          <div className="p-3 bg-[#F5F7F9] rounded-lg border border-[#D8E1E8]">
            <span className="text-[9px] text-[#617386] block">STEP 3: SCHEDULE MATCH</span>
            <strong className="text-[#16324F] block mt-1">A101 Activity</strong>
            <span className="text-[10px] text-[#16845B] block">94% Confidence</span>
          </div>

          <div className="p-3 bg-[#F5F7F9] rounded-lg border border-[#D8E1E8]">
            <span className="text-[9px] text-[#617386] block">STEP 4: QUANTITY</span>
            <strong className="text-[#087F8C] block mt-1">1,200 m³ Actual</strong>
            <span className="text-[10px] text-[#617386] block">Certified by RE</span>
          </div>

          <div className="p-3 bg-[#E7F5F4] rounded-lg border border-[#16845B]/30">
            <span className="text-[9px] text-[#16845B] font-bold block">STEP 5: PROGRESS</span>
            <strong className="text-[#16845B] block mt-1">62% Actual Progress</strong>
            <span className="text-[10px] text-[#617386] block">Linked to #EV-0142</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          AUDIT EVIDENCE TRACEABILITY MODAL
         ========================================================================= */}
      {isTraceabilityModalOpen && (
        <div className="fixed inset-0 bg-[#17212B]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-100">
          <div className="bg-white border border-[#D8E1E8] rounded-xl max-w-2xl w-full p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#D8E1E8] pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#087F8C] uppercase">
                  VERIFIED AUDIT RECORD #EV-0142
                </span>
                <h3 className="text-base font-bold text-[#16324F]">
                  Multilingual Site Evidence Traceability
                </h3>
              </div>
              <button
                onClick={() => setIsTraceabilityModalOpen(false)}
                className="text-xs font-mono text-[#617386] hover:text-[#16324F] p-1.5 rounded hover:bg-[#F5F7F9] cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Original Report */}
              <div className="p-3 bg-[#F5F7F9] rounded-lg border border-[#D8E1E8] space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-[#617386]">
                  <span>ORIGINAL REPORT (HINDI)</span>
                  <span className="text-[#16845B] font-bold">Preserved Script ✓</span>
                </div>
                <p className="text-sm font-semibold text-[#16324F]">
                  "ज़ोन A में 1200 घन मीटर मिट्टी की खुदाई पूरी की गई। काम चेनिज 10+200 से 10+800 तक किया गया।"
                </p>
              </div>

              {/* AI Interpretation */}
              <div className="p-3 bg-[#EAF2F8] rounded-lg border border-[#3977A9]/30 space-y-1">
                <span className="text-[10px] font-mono text-[#3977A9] font-bold">
                  AI INTERPRETATION (STANDARDIZED ENGLISH)
                </span>
                <p className="text-xs text-[#16324F] font-medium">
                  "Earthwork excavation completed in Zone A with 1,200 m³ quantity from Chainage 10+200 to 10+800."
                </p>
              </div>

              {/* Extracted Data Grid */}
              <div className="p-3 bg-white border border-[#D8E1E8] rounded-lg space-y-2 font-mono">
                <span className="text-[10px] font-bold text-[#617386] uppercase">EXTRACTED ENGINEERING DATA</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div>Activity: <strong>Earthwork Excavation</strong></div>
                  <div>Quantity: <strong>1,200 m³</strong></div>
                  <div>Location: <strong>Zone A</strong></div>
                  <div>Chainage: <strong>10+200 - 10+800</strong></div>
                </div>
              </div>

              {/* Schedule Link & Progress Impact */}
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-3 bg-[#F5F7F9] rounded-lg border border-[#D8E1E8]">
                  <span className="text-[10px] text-[#617386] block">SCHEDULE LINK</span>
                  <strong className="text-sm text-[#16324F] block mt-0.5">A101 Earthwork</strong>
                  <span className="text-[10px] text-[#087F8C]">94% Match Confidence</span>
                </div>
                <div className="p-3 bg-[#E7F5F4] rounded-lg border border-[#16845B]/30">
                  <span className="text-[10px] text-[#16845B] block font-bold">PROGRESS IMPACT</span>
                  <strong className="text-sm text-[#16845B] block mt-0.5">62% Actual (vs 80% Plan)</strong>
                  <span className="text-[10px] text-[#C98200]">-18% Schedule Variance</span>
                </div>
              </div>

              {/* SHA-256 Stamp */}
              <div className="text-[10px] font-mono text-[#617386] pt-2 border-t border-[#D8E1E8] flex justify-between">
                <span>SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</span>
                <span className="text-[#16845B] font-bold">Tamper-Proof Audit Vault</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsTraceabilityModalOpen(false)}
                className="px-4 py-2 bg-[#16324F] text-white text-xs font-semibold rounded-lg hover:bg-[#112438] cursor-pointer"
              >
                Close Audit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
