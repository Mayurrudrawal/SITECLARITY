import React from 'react';
import {
  ArrowRight,
  Globe,
  Cpu,
  Layers,
  CheckCircle2,
  Calendar,
  MapPin,
  TrendingUp,
  FileCheck,
  Building2,
  ShieldCheck,
  AlertCircle,
  GitMerge,
  BarChart3,
  Sparkles
} from 'lucide-react';

export function LandingPage({ onOpenDashboard }) {
  return (
    <div className="min-h-screen bg-[#F5F7F9] text-[#17212B] font-sans flex flex-col selection:bg-[#087F8C] selection:text-white">
      {/* =========================================================================
          TOP MINIMAL NAVIGATION BAR
         ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#D8E1E8] h-14">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-md bg-[#16324F] flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-xs">
              SC
            </div>
            <div>
              <div className="flex items-center space-x-1.5 leading-none">
                <span className="font-bold text-sm tracking-tight text-[#16324F] uppercase">
                  SITE CLARITY
                </span>
                <span className="text-[10px] uppercase font-mono font-medium bg-[#F5F7F9] text-[#617386] px-1.5 py-0.5 rounded border border-[#D8E1E8]">
                  v2.6
                </span>
              </div>
              <span className="text-[10px] text-[#617386] font-mono font-medium tracking-tight block mt-0.5">
                MULTILINGUAL FIELD INTELLIGENCE
              </span>
            </div>
          </div>

          {/* Center SIH Badge */}
          <div className="hidden md:flex items-center space-x-2 bg-[#F5F7F9] border border-[#D8E1E8] px-3 py-1 rounded-full text-xs font-mono text-[#617386]">
            <span className="w-2 h-2 rounded-full bg-[#087F8C] animate-pulse" />
            <span className="text-[#16324F] font-semibold">SIH 2026 PROTOTYPE</span>
            <span>•</span>
            <span>Deterministic AI Pipeline</span>
          </div>

          {/* Right Action CTA */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenDashboard}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#16324F] hover:bg-[#12283f] text-white text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer active:scale-[0.98]"
            >
              <span>Open Dashboard</span>
              <ArrowRight size={14} className="text-[#087F8C]" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SECTION 1: HERO SECTION (Target First Viewport)
         ========================================================================= */}
      <section className="py-8 sm:py-12 border-b border-[#D8E1E8] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Product Value & Direct Action */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-[#EAF2F8] border border-[#D8E1E8] text-xs font-mono text-[#3977A9]">
                <span className="font-bold tracking-wider">SITE CLARITY</span>
                <span>/</span>
                <span>INFRASTRUCTURE MONITORING</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#16324F] leading-tight tracking-tight">
                Turn Field Reports Into Actionable Site Intelligence.
              </h1>

              <p className="text-sm sm:text-base text-[#617386] leading-relaxed max-w-xl">
                Site Clarity helps construction teams capture field updates in their own language,
                understand unstructured reports with AI, and convert them into structured project intelligence.
              </p>

              {/* Primary Call to Action & Trust Indicators */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button
                  id="hero-open-dashboard-cta"
                  onClick={onOpenDashboard}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-[#16324F] hover:bg-[#0e2135] text-white text-sm font-semibold transition-all shadow-sm cursor-pointer group"
                >
                  <span>Open Dashboard</span>
                  <ArrowRight size={16} className="text-[#087F8C] transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center space-x-2 text-xs font-mono text-[#617386] px-3 py-2 rounded bg-[#F5F7F9] border border-[#D8E1E8]">
                  <CheckCircle2 size={14} className="text-[#16845B]" />
                  <span>Real-time WBS alignment & audit ledger</span>
                </div>
              </div>

              {/* Quick Spec Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#D8E1E8]">
                <div className="space-y-0.5">
                  <div className="text-lg font-bold font-mono text-[#16324F]">22+</div>
                  <div className="text-[11px] text-[#617386] font-medium leading-tight">Indian Languages Supported</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-lg font-bold font-mono text-[#087F8C]">5-Vector</div>
                  <div className="text-[11px] text-[#617386] font-medium leading-tight">Confidence Scoring</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-lg font-bold font-mono text-[#16845B]">100%</div>
                  <div className="text-[11px] text-[#617386] font-medium leading-tight">Evidence Traceability</div>
                </div>
              </div>
            </div>

            {/* Right Column: Secondary Visual (The Intelligence Pipeline) */}
            <div className="lg:col-span-6">
              <div className="bg-[#F5F7F9] border border-[#D8E1E8] rounded-xl p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D8E1E8]">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#087F8C]" />
                    <span className="text-xs font-mono font-bold text-[#16324F] uppercase tracking-wide">
                      INTELLIGENCE PIPELINE FLOW
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#617386] bg-white px-2 py-0.5 rounded border border-[#D8E1E8]">
                    LIVE PROCESSING
                  </span>
                </div>

                {/* Pipeline Flow Steps */}
                <div className="space-y-2.5 text-xs font-mono">
                  {/* Step 1: Worker Report */}
                  <div className="bg-white border border-[#D8E1E8] rounded-lg p-3 hover:border-[#3977A9] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-[#3977A9] uppercase">01 • Worker Report</span>
                      <span className="text-[10px] bg-[#EAF2F8] text-[#3977A9] px-1.5 py-0.2 rounded font-medium">Unstructured Audio / Text</span>
                    </div>
                    <p className="text-xs text-[#17212B] font-sans italic bg-[#F5F7F9] p-2 rounded border border-[#D8E1E8]">
                      "ज़ोन A में 1200 घन मीटर मिट्टी की खुदाई पूरी की गई। काम चेनिज 10+200 से 10+800 तक किया गया।"
                    </p>
                  </div>

                  <div className="flex justify-center -my-1 text-[#91A0AE]">
                    <span className="text-[11px]">↓</span>
                  </div>

                  {/* Step 2: Language Understanding */}
                  <div className="bg-white border border-[#D8E1E8] rounded-lg p-2.5 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 rounded bg-[#EAF2F8] text-[#3977A9]">
                        <Globe size={13} />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#617386] uppercase font-bold">02 • Language Understanding</div>
                        <div className="text-xs font-bold text-[#16324F]">Detected: Hindi (hi) • Conf: 98%</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#16845B] font-semibold bg-[#E8F5EF] px-2 py-0.5 rounded">Standardized</span>
                  </div>

                  <div className="flex justify-center -my-1 text-[#91A0AE]">
                    <span className="text-[11px]">↓</span>
                  </div>

                  {/* Step 3: AI Extraction */}
                  <div className="bg-white border border-[#D8E1E8] rounded-lg p-2.5 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 rounded bg-[#E7F5F4] text-[#087F8C]">
                        <Cpu size={13} />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#617386] uppercase font-bold">03 • AI Extraction</div>
                        <div className="text-xs font-bold text-[#16324F]">Earthwork Excavation • 1,200 m³ • Zone A</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#087F8C] bg-[#E7F5F4] px-2 py-0.5 rounded">96% Conf</span>
                  </div>

                  <div className="flex justify-center -my-1 text-[#91A0AE]">
                    <span className="text-[11px]">↓</span>
                  </div>

                  {/* Step 4: Structured Intelligence */}
                  <div className="bg-white border border-[#D8E1E8] rounded-lg p-2.5 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 rounded bg-[#E7F5F4] text-[#087F8C]">
                        <GitMerge size={13} />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#617386] uppercase font-bold">04 • Structured Intelligence</div>
                        <div className="text-xs font-bold text-[#16324F]">WBS 2.1 — Activity A101 Alignment</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#16845B] bg-[#E8F5EF] px-2 py-0.5 rounded font-bold">95% Match</span>
                  </div>

                  <div className="flex justify-center -my-1 text-[#91A0AE]">
                    <span className="text-[11px]">↓</span>
                  </div>

                  {/* Step 5: Project Dashboard */}
                  <div className="bg-[#16324F] text-white border border-[#16324F] rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 rounded bg-white/10 text-white">
                        <BarChart3 size={13} />
                      </div>
                      <div>
                        <div className="text-[10px] text-white/70 uppercase font-bold">05 • Project Dashboard</div>
                        <div className="text-xs font-bold text-white">Cumulative: 6,800 + 1,200 = 8,000 m³ (80%)</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#087F8C] font-mono font-bold bg-white px-2 py-0.5 rounded">
                      Audited
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CORE CAPABILITY SECTION
         ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#F5F7F9] border-b border-[#D8E1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8 sm:mb-10">
            <div className="text-xs font-mono font-bold text-[#087F8C] tracking-wider uppercase mb-1.5">
              CORE CAPABILITIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#16324F] tracking-tight">
              One Field Update. Structured Intelligence.
            </h2>
            <p className="text-sm text-[#617386] mt-2">
              How Site Clarity closes the operational gap between site laborers, resident engineers, and project leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Capability 01 */}
            <div className="bg-white border border-[#D8E1E8] rounded-xl p-5 hover:border-[#087F8C] transition-all flex flex-col justify-between shadow-xs group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#3977A9] bg-[#EAF2F8] px-2 py-0.5 rounded">
                    01
                  </span>
                  <div className="p-2 rounded-lg bg-[#EAF2F8] text-[#3977A9]">
                    <Globe size={16} />
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#16324F] group-hover:text-[#087F8C] transition-colors">
                  Multilingual Reporting
                </h3>
                <p className="text-xs text-[#617386] leading-relaxed">
                  Workers can submit site updates in their own language, reducing communication friction between field teams and management.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#D8E1E8] flex items-center justify-between text-[11px] font-mono text-[#617386]">
                <span>Hindi • Tamil • Marathi + 20</span>
              </div>
            </div>

            {/* Capability 02 */}
            <div className="bg-white border border-[#D8E1E8] rounded-xl p-5 hover:border-[#087F8C] transition-all flex flex-col justify-between shadow-xs group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#087F8C] bg-[#E7F5F4] px-2 py-0.5 rounded">
                    02
                  </span>
                  <div className="p-2 rounded-lg bg-[#E7F5F4] text-[#087F8C]">
                    <Cpu size={16} />
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#16324F] group-hover:text-[#087F8C] transition-colors">
                  AI Understanding
                </h3>
                <p className="text-xs text-[#617386] leading-relaxed">
                  Natural-language field reports are interpreted and converted into structured information.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#D8E1E8] flex items-center justify-between text-[11px] font-mono text-[#617386]">
                <span>Quantities • Units • Chainage</span>
              </div>
            </div>

            {/* Capability 03 */}
            <div className="bg-white border border-[#D8E1E8] rounded-xl p-5 hover:border-[#087F8C] transition-all flex flex-col justify-between shadow-xs group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#16845B] bg-[#E8F5EF] px-2 py-0.5 rounded">
                    03
                  </span>
                  <div className="p-2 rounded-lg bg-[#E8F5EF] text-[#16845B]">
                    <BarChart3 size={16} />
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#16324F] group-hover:text-[#087F8C] transition-colors">
                  Site Visibility
                </h3>
                <p className="text-xs text-[#617386] leading-relaxed">
                  Managers receive a consolidated view of field activity, progress, and operational signals.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#D8E1E8] flex items-center justify-between text-[11px] font-mono text-[#617386]">
                <span>Planned vs Actual • Slippage</span>
              </div>
            </div>

            {/* Capability 04 */}
            <div className="bg-white border border-[#D8E1E8] rounded-xl p-5 hover:border-[#087F8C] transition-all flex flex-col justify-between shadow-xs group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#16324F] bg-[#F5F7F9] px-2 py-0.5 rounded">
                    04
                  </span>
                  <div className="p-2 rounded-lg bg-[#F5F7F9] text-[#16324F]">
                    <ShieldCheck size={16} />
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#16324F] group-hover:text-[#087F8C] transition-colors">
                  Actionable Intelligence
                </h3>
                <p className="text-xs text-[#617386] leading-relaxed">
                  Important updates and issues can move from unstructured field communication into decision-ready information.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#D8E1E8] flex items-center justify-between text-[11px] font-mono text-[#617386]">
                <span>Certified Evidence Ledger</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: HOW IT WORKS (Horizontal Process)
         ========================================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#D8E1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="text-xs font-mono font-bold text-[#087F8C] tracking-wider uppercase mb-1.5">
              THE WORKFLOW
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#16324F] tracking-tight">
              Deterministic 5-Step Process
            </h2>
            <p className="text-xs sm:text-sm text-[#617386] mt-2">
              From the field worker's spoken update to verified executive project visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {/* Step 01 */}
            <div className="bg-[#F5F7F9] border border-[#D8E1E8] rounded-xl p-4 flex flex-col justify-between relative">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#16324F] bg-white px-2 py-0.5 rounded border border-[#D8E1E8]">
                    01
                  </span>
                  <span className="text-[10px] font-mono text-[#617386] uppercase">INPUT</span>
                </div>
                <div className="text-xs font-bold text-[#16324F] uppercase tracking-wide">
                  FIELD INPUT
                </div>
                <p className="text-xs text-[#617386] leading-relaxed">
                  Worker submits an update via audio, photo note, or digital site log.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#D8E1E8] text-[10px] font-mono text-[#3977A9]">
                Raw field data captured
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-[#F5F7F9] border border-[#D8E1E8] rounded-xl p-4 flex flex-col justify-between relative">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#087F8C] bg-white px-2 py-0.5 rounded border border-[#D8E1E8]">
                    02
                  </span>
                  <span className="text-[10px] font-mono text-[#617386] uppercase">LINGUAL</span>
                </div>
                <div className="text-xs font-bold text-[#16324F] uppercase tracking-wide">
                  LANGUAGE
                </div>
                <p className="text-xs text-[#617386] leading-relaxed">
                  Understand the worker's language and transcribe dialect terms accurately.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#D8E1E8] text-[10px] font-mono text-[#087F8C]">
                Normalized text generated
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-[#F5F7F9] border border-[#D8E1E8] rounded-xl p-4 flex flex-col justify-between relative">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#087F8C] bg-white px-2 py-0.5 rounded border border-[#D8E1E8]">
                    03
                  </span>
                  <span className="text-[10px] font-mono text-[#617386] uppercase">ENGINE</span>
                </div>
                <div className="text-xs font-bold text-[#16324F] uppercase tracking-wide">
                  AI PROCESSING
                </div>
                <p className="text-xs text-[#617386] leading-relaxed">
                  Extract meaningful field information: quantities, units, locations, and dates.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#D8E1E8] text-[10px] font-mono text-[#087F8C]">
                Structured entity payload
              </div>
            </div>

            {/* Step 04 */}
            <div className="bg-[#F5F7F9] border border-[#D8E1E8] rounded-xl p-4 flex flex-col justify-between relative">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#16845B] bg-white px-2 py-0.5 rounded border border-[#D8E1E8]">
                    04
                  </span>
                  <span className="text-[10px] font-mono text-[#617386] uppercase">MATCH</span>
                </div>
                <div className="text-xs font-bold text-[#16324F] uppercase tracking-wide">
                  STRUCTURE
                </div>
                <p className="text-xs text-[#617386] leading-relaxed">
                  Convert it into usable project data by matching with Master WBS activities.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#D8E1E8] text-[10px] font-mono text-[#16845B]">
                WBS aligned with score
              </div>
            </div>

            {/* Step 05 */}
            <div className="bg-[#F5F7F9] border border-[#D8E1E8] rounded-xl p-4 flex flex-col justify-between relative">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#16324F] bg-white px-2 py-0.5 rounded border border-[#D8E1E8]">
                    05
                  </span>
                  <span className="text-[10px] font-mono text-[#617386] uppercase">OUTPUT</span>
                </div>
                <div className="text-xs font-bold text-[#16324F] uppercase tracking-wide">
                  VISIBILITY
                </div>
                <p className="text-xs text-[#617386] leading-relaxed">
                  Surface it through the dashboard with audit-backed progress and delay alerts.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#D8E1E8] text-[10px] font-mono text-[#16324F]">
                Operational action ready
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: PRODUCT PREVIEW (From Field Communication to Project Visibility)
         ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#F5F7F9] border-b border-[#D8E1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-[#087F8C] tracking-wider uppercase mb-1.5">
                CONTINUITY TO PRODUCTION
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#16324F] tracking-tight">
                From Field Communication to Project Visibility
              </h2>
              <p className="text-xs sm:text-sm text-[#617386] mt-2 max-w-2xl">
                The actual Site Clarity dashboard provides live tracking for linear infrastructure.
                Below is the live operational schema connecting the field report to project control.
              </p>
            </div>

            <button
              onClick={onOpenDashboard}
              className="self-start md:self-auto inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-[#087F8C] hover:bg-[#076c77] text-white text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer group"
            >
              <span>Explore the Dashboard</span>
              <ArrowRight size={14} className="text-white transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Abstract Lightweight UI Preview reflecting actual app components */}
          <div className="bg-white border border-[#D8E1E8] rounded-xl p-5 sm:p-6 shadow-sm space-y-6">
            {/* Top Project Bar (Mirror of Dashboard Hero Header) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D8E1E8]">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-base text-[#16324F]">
                    NH-XX Highway Development Corridor
                  </span>
                  <span className="text-[10px] font-mono bg-[#EAF2F8] text-[#16324F] px-2 py-0.5 rounded border border-[#D8E1E8]">
                    CH 00+000 – 40+000
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#FFF5DD] text-[#C98200] border border-[#C98200]/30">
                    STATUS: AT RISK (-9% SLIPPAGE)
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs font-mono text-[#617386]">
                  <span>Timeline: 01 Aug 2026 – 31 Dec 2026</span>
                  <span>•</span>
                  <span>Zone A to D (40.0 km Package)</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#16845B]" />
                <span className="text-xs font-mono text-[#617386]">Active Activity: <strong>A101 Corridor A</strong></span>
              </div>
            </div>

            {/* Metrics Row (Actual Application Metrics) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#F5F7F9] border border-[#D8E1E8] rounded-lg p-3">
                <div className="text-[10px] font-mono text-[#617386] uppercase">Planned Progress</div>
                <div className="text-xl font-bold font-mono text-[#16324F] mt-1">68.0%</div>
                <div className="text-[10px] text-[#617386] mt-0.5">Master Schedule Baseline</div>
              </div>

              <div className="bg-[#F5F7F9] border border-[#D8E1E8] rounded-lg p-3">
                <div className="text-[10px] font-mono text-[#617386] uppercase">Actual Progress</div>
                <div className="text-xl font-bold font-mono text-[#087F8C] mt-1">59.0%</div>
                <div className="text-[10px] text-[#617386] mt-0.5">Physical Certified Executed</div>
              </div>

              <div className="bg-[#F5F7F9] border border-[#D8E1E8] rounded-lg p-3">
                <div className="text-[10px] font-mono text-[#617386] uppercase">Schedule Variance</div>
                <div className="text-xl font-bold font-mono text-[#C93636] mt-1">-9.0%</div>
                <div className="text-[10px] text-[#C93636] mt-0.5">7 Critical Activities Delayed</div>
              </div>

              <div className="bg-[#F5F7F9] border border-[#D8E1E8] rounded-lg p-3">
                <div className="text-[10px] font-mono text-[#617386] uppercase">Evidence Vault</div>
                <div className="text-xl font-bold font-mono text-[#16845B] mt-1">142</div>
                <div className="text-[10px] text-[#617386] mt-0.5">Signed Field Records</div>
              </div>
            </div>

            {/* Real Continuity Breakdown: Activity A101 Execution Bridge */}
            <div className="border border-[#D8E1E8] rounded-lg p-4 bg-[#F8FAFC]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold bg-[#16324F] text-white px-2 py-0.5 rounded">
                    ACTIVITY A101
                  </span>
                  <span className="text-xs font-bold text-[#16324F]">
                    Earthwork Excavation in Roadway Cut & Embankment
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#16845B] bg-[#E8F5EF] px-2 py-0.5 rounded font-semibold">
                  Match Confidence: 95%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="bg-white border border-[#D8E1E8] p-2.5 rounded">
                  <span className="text-[#617386] block text-[10px] uppercase">Prior Cumulative Progress</span>
                  <span className="text-[#16324F] font-bold text-sm">6,800 m³ (68%)</span>
                </div>
                <div className="bg-[#E7F5F4] border border-[#087F8C]/30 p-2.5 rounded">
                  <span className="text-[#087F8C] block text-[10px] uppercase font-bold">New Field Ingestion</span>
                  <span className="text-[#087F8C] font-bold text-sm">+1,200 m³ (Site_Report_0409)</span>
                </div>
                <div className="bg-white border border-[#D8E1E8] p-2.5 rounded">
                  <span className="text-[#617386] block text-[10px] uppercase">Updated Progress</span>
                  <span className="text-[#16845B] font-bold text-sm">8,000 m³ / 10,000 m³ (80%)</span>
                </div>
              </div>
            </div>

            {/* Bottom Dashboard Entry Banner */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#617386]">
              <div className="flex items-center space-x-2 font-mono">
                <ShieldCheck size={14} className="text-[#16845B]" />
                <span>Certified by Resident Engineer Rajesh Sharma • Geotagged Chainage 10+200</span>
              </div>

              <button
                onClick={onOpenDashboard}
                className="inline-flex items-center space-x-1.5 font-bold text-[#087F8C] hover:text-[#16324F] transition-colors cursor-pointer"
              >
                <span>Launch Full Project Control Suite</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FOOTER (Minimal Technical Footer)
         ========================================================================= */}
      <footer className="mt-auto border-t border-[#D8E1E8] bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5 text-center sm:text-left">
            <div className="font-bold text-[#16324F] tracking-tight uppercase">
              SITE CLARITY
            </div>
            <div className="text-[#617386] font-mono text-[11px]">
              Multilingual Field Intelligence
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#91A0AE] bg-[#F5F7F9] px-3 py-1 rounded border border-[#D8E1E8]">
            SIH 2026 Prototype
          </div>
        </div>
      </footer>
    </div>
  );
}
