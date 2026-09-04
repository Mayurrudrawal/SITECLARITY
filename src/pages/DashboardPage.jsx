import React from 'react';
import { ProgressChart } from '../components/ProgressChart.jsx';
import { ProjectHealthPanel } from '../components/ProjectHealthPanel.jsx';
import { CriticalActivitiesTable } from '../components/CriticalActivitiesTable.jsx';
import { RecentEvidenceTimeline } from '../components/RecentEvidenceTimeline.jsx';
import { SignatureAiPipeline } from '../components/SignatureAiPipeline.jsx';
import { CorridorVisualizer } from '../components/CorridorVisualizer.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import {
  UploadCloud,
  Calendar,
  MapPin,
  TrendingDown,
  TrendingUp,
  Layers,
  AlertOctagon,
  FileCheck,
  Building2,
  Play,
  ArrowRight,
  ShieldCheck,
  Globe,
  Sparkles
} from 'lucide-react';

export function DashboardPage({
  dashboardData,
  onSelectActivity,
  onOpenCapture,
  onOpenEvidence,
  onSelectTab,
  goldenStep = 1,
  id
}) {
  const { t } = useI18n();

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center p-16 text-[#617386] font-mono text-xs">
        Loading Project Control Intelligence...
      </div>
    );
  }

  const { project, metrics, chartData, activities, recentEvidence } = dashboardData;

  const planned = metrics?.overallPlannedProgress ?? 68;
  const actual = metrics?.overallActualProgress ?? 59;
  const variance = metrics?.scheduleVariance ?? -9;
  const delayed = metrics?.delayedActivitiesCount ?? 7;
  const evidence = metrics?.evidenceRecordsCount ?? 142;

  return (
    <div id={id} className="space-y-4 font-sans">
      {/* =========================================================================
          LEVEL 1: HERO PROJECT HEALTH & PLANNED VS ACTUAL COMMAND BAR
         ========================================================================= */}
      <div className="bg-white border border-[#D8E1E8] rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#D8E1E8]">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-[#16324F] tracking-tight">
                {project?.name || "NH-XX Highway Development Corridor"}
              </h1>
              <span className="text-[10px] uppercase font-mono font-semibold bg-[#EAF2F8] text-[#16324F] border border-[#D8E1E8] px-2 py-0.5 rounded">
                CH 00+000 – 40+000
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#FFF5DD] text-[#C98200] border border-[#C98200]/30">
                {t('statusLabel', 'STATUS')}: {t('statusAtRisk', 'AT RISK')} ({variance}% {t('slippageText', 'SLIPPAGE')})
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#617386] font-mono">
              <span className="flex items-center space-x-1">
                <Calendar size={13} className="text-[#3977A9]" />
                <span>{t('timelineText', 'Timeline: 01 Aug 2026 – 31 Dec 2026')}</span>
              </span>
              <span className="text-[#D8E1E8]">•</span>
              <span className="flex items-center space-x-1">
                <MapPin size={13} className="text-[#3977A9]" />
                <span>{t('zonePackageText', 'Zone A to D (40.0 km Package)')}</span>
              </span>
              <span className="text-[#D8E1E8] hidden sm:inline">•</span>
              <span className="flex items-center space-x-1 hidden sm:flex">
                <Building2 size={13} className="text-[#3977A9]" />
                <span>{t('epcContractorText', 'EPC: InfraCorp Ltd.')}</span>
              </span>
            </div>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex items-center space-x-2.5 self-start lg:self-auto">
            <button
              onClick={() => onSelectTab && onSelectTab('multilingual-intelligence')}
              className="px-3.5 py-2 bg-[#E7F5F4] hover:bg-[#d8f0ee] text-[#087F8C] border border-[#087F8C]/30 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Launch Multilingual Field Intelligence Pipeline"
            >
              <Globe size={13} />
              <span>Multilingual AI</span>
            </button>

            <button
              onClick={() => onSelectTab && onSelectTab('matching')}
              className="px-3.5 py-2 bg-[#F5F7F9] hover:bg-[#D8E1E8] text-[#16324F] border border-[#D8E1E8] text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span>{t('navMatching', 'Matching')}</span>
              <ArrowRight size={13} />
            </button>

            <button
              onClick={onOpenCapture}
              className="px-4 py-2 bg-[#087F8C] hover:bg-[#076f7b] text-white text-xs font-semibold rounded-lg flex items-center space-x-2 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <UploadCloud size={14} />
              <span>+ {t('navExecution', 'Site Evidence')}</span>
            </button>
          </div>
        </div>

        {/* Level 1 Numerical Variance Bridge */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 font-mono">
          <div
            onClick={() => onSelectTab && onSelectTab('schedule')}
            className="p-3 bg-[#F5F7F9] hover:bg-[#EAF2F8] hover:border-[#3977A9] rounded-lg border border-[#D8E1E8] cursor-pointer transition-all group"
            title="Inspect Baseline Schedule"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#617386] group-hover:text-[#3977A9]">{t('thePlanLabel', 'THE PLAN')}</span>
              <span className="text-[9px] text-[#3977A9] opacity-0 group-hover:opacity-100 transition-opacity">{t('viewArrow', 'VIEW →')}</span>
            </div>
            <div className="text-2xl font-bold text-[#16324F] mt-1">{planned}%</div>
            <span className="text-[10px] text-[#617386]">{t('thePlanDesc', 'Target schedule baseline')}</span>
          </div>

          <div
            onClick={() => onSelectTab && onSelectTab('progress')}
            className="p-3 bg-[#E7F5F4]/60 hover:bg-[#E7F5F4] hover:border-[#087F8C] rounded-lg border border-[#087F8C]/30 cursor-pointer transition-all group"
            title="Inspect Progress Engine & Ledger"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#087F8C]">{t('theRealityLabel', 'THE REALITY')}</span>
              <span className="text-[9px] text-[#087F8C] opacity-0 group-hover:opacity-100 transition-opacity">{t('viewArrow', 'VIEW →')}</span>
            </div>
            <div className="text-2xl font-bold text-[#087F8C] mt-1">{actual}%</div>
            <span className="text-[10px] text-[#087F8C]/80">{t('theRealityDesc', 'Certified execution')}</span>
          </div>

          <div
            onClick={() => onSelectTab && onSelectTab('delays')}
            className="p-3 bg-[#FDECEC] hover:bg-[#FCE2E2] hover:border-[#C93636] rounded-lg border border-[#C93636]/30 cursor-pointer transition-all group"
            title="Inspect Delay Matrix"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#C93636]">{t('theVarianceLabel', 'THE VARIANCE')}</span>
              <span className="text-[9px] text-[#C93636] opacity-0 group-hover:opacity-100 transition-opacity">{t('viewArrow', 'VIEW →')}</span>
            </div>
            <div className="text-2xl font-bold text-[#C93636] mt-1">{variance}%</div>
            <span className="text-[10px] text-[#C93636]">{t('theVarianceDesc', 'Critical path delay')}</span>
          </div>

          <div
            onClick={() => onSelectTab && onSelectTab('delays')}
            className="p-3 bg-[#FFF5DD] hover:bg-[#FEEFC3] hover:border-[#C98200] rounded-lg border border-[#C98200]/30 cursor-pointer transition-all group"
            title="Inspect Project Bottlenecks"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#C98200]">{t('bottlenecksLabel', 'BOTTLENECKS')}</span>
              <span className="text-[9px] text-[#C98200] opacity-0 group-hover:opacity-100 transition-opacity">{t('viewArrow', 'VIEW →')}</span>
            </div>
            <div className="text-2xl font-bold text-[#C98200] mt-1">{delayed}</div>
            <span className="text-[10px] text-[#C98200]">{t('bottlenecksDesc', 'A104 Culvert issue')}</span>
          </div>

          <div
            onClick={() => onSelectTab && onSelectTab('traceability')}
            className="p-3 bg-[#E8F5EF] hover:bg-[#D5EFE3] hover:border-[#16845B] rounded-lg border border-[#16845B]/30 cursor-pointer transition-all group"
            title="Open Evidence Traceability Vault"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#16845B]">{t('certifiedEvidenceLabel', 'CERTIFIED EVIDENCE')}</span>
              <span className="text-[9px] text-[#16845B] opacity-0 group-hover:opacity-100 transition-opacity">{t('viewArrow', 'VIEW →')}</span>
            </div>
            <div className="text-2xl font-bold text-[#16845B] mt-1">{evidence}</div>
            <span className="text-[10px] text-[#16845B]">{t('certifiedEvidenceDesc', '100% audit verified')}</span>
          </div>

          {/* Multilingual Field Reports KPI Card */}
          <div
            onClick={() => onSelectTab && onSelectTab('multilingual-intelligence')}
            className="p-3 bg-[#F0F7FA] hover:bg-[#E3F0F6] hover:border-[#087F8C] rounded-lg border border-[#087F8C]/30 cursor-pointer transition-all group"
            title="Inspect Multilingual Field Reports & NLU Pipeline"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#087F8C]">MULTILINGUAL REPORTS</span>
              <span className="text-[9px] text-[#087F8C] opacity-0 group-hover:opacity-100 transition-opacity">EXPLORE →</span>
            </div>
            <div className="text-2xl font-bold text-[#16324F] mt-1">42</div>
            <span className="text-[10px] text-[#617386]">Languages: 7 • AI Analyzed: 39</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MULTILINGUAL FIELD INTELLIGENCE BANNER
         ========================================================================= */}
      <div className="bg-gradient-to-r from-[#16324F] via-[#1c3f64] to-[#087F8C] rounded-xl p-4 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-white/15 text-[10px] font-mono font-bold uppercase tracking-wider text-[#A7D7C5] flex items-center space-x-1">
              <Globe size={11} />
              <span>22 Scheduled Indian Languages + English</span>
            </span>
            <span className="text-[10px] font-mono text-white/80">Original Preserved ✓</span>
          </div>
          <h2 className="text-xs sm:text-sm font-semibold tracking-tight leading-snug max-w-3xl">
            "A worker can report site progress in their own language. Site Clarity understands it, converts it into standardized engineering data, links it to the project schedule, and updates progress without losing the original evidence."
          </h2>
        </div>
        <button
          onClick={() => onSelectTab && onSelectTab('multilingual-intelligence')}
          className="px-4 py-2 bg-white text-[#16324F] hover:bg-[#F5F7F9] font-bold text-xs rounded-lg shadow-xs flex items-center space-x-1.5 transition-colors whitespace-nowrap cursor-pointer self-start md:self-auto"
        >
          <Sparkles size={13} className="text-[#087F8C]" />
          <span>Launch Multilingual Pipeline →</span>
        </button>
      </div>

      {/* =========================================================================
          SIGNATURE AI INTELLIGENCE PIPELINE (Core Visual Feature - Section 3)
         ========================================================================= */}
      <SignatureAiPipeline
        id="dashboard-signature-pipeline"
        goldenStep={goldenStep}
        onNavigateToStage={(tab) => onSelectTab && onSelectTab(tab)}
      />

      {/* =========================================================================
          INFRASTRUCTURE CORRIDOR ALIGNMENT CONTEXT (Section 8)
         ========================================================================= */}
      <CorridorVisualizer
        id="dashboard-corridor-visualizer"
        onSelectActivity={onSelectActivity}
      />

      {/* =========================================================================
          LEVEL 2: OPERATIONAL METRICS, CHARTS & RADIAL HEALTH
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Planned vs Actual S-Curve Chart (2 cols) */}
        <div className="lg:col-span-2">
          <ProgressChart
            id="dashboard-progress-chart"
            data={chartData}
          />
        </div>

        {/* Sophisticated Project Health Radial Visualization (1 col) */}
        <div className="lg:col-span-1">
          <ProjectHealthPanel
            id="dashboard-health-panel"
            status="AT RISK"
            variance={variance}
            delayedCount={delayed}
            criticalCount={metrics?.criticalActivitiesCount ?? 2}
            latestExecutionDate="04 Sep 2026"
            auditConfidence={98.4}
          />
        </div>
      </div>

      {/* =========================================================================
          LEVEL 3: CRITICAL ACTIVITIES REGISTER & RECENT EVIDENCE TIMELINE
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <CriticalActivitiesTable
            id="dashboard-critical-table"
            activities={activities || []}
            onSelectActivity={onSelectActivity}
          />
        </div>

        <div className="lg:col-span-1">
          <RecentEvidenceTimeline
            id="dashboard-evidence-timeline"
            evidenceList={recentEvidence || []}
            onOpenEvidence={onOpenEvidence}
          />
        </div>
      </div>

      {/* =========================================================================
          RECENT MULTILINGUAL EVIDENCE AUDIT LOG (Requirement 14)
         ========================================================================= */}
      <div className="bg-white border border-[#D8E1E8] rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Globe size={15} className="text-[#087F8C]" />
            <h3 className="text-xs font-bold text-[#16324F] uppercase tracking-wider">
              Recent Multilingual Evidence
            </h3>
            <span className="text-[10px] font-mono text-[#087F8C] bg-[#E7F5F4] px-2 py-0.5 rounded font-semibold border border-[#087F8C]/20">
              AI Normalized
            </span>
          </div>
          <button
            onClick={() => onSelectTab && onSelectTab('multilingual-intelligence')}
            className="text-xs text-[#087F8C] hover:underline font-semibold flex items-center space-x-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Explore Multilingual Intelligence Pipeline</span>
            <ArrowRight size={12} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#D8E1E8] text-[#617386] text-[10px] uppercase">
                <th className="py-2 px-3">Evidence ID</th>
                <th className="py-2 px-3">Language</th>
                <th className="py-2 px-3">Original Field Activity</th>
                <th className="py-2 px-3">Quantity</th>
                <th className="py-2 px-3">Matched Schedule Item</th>
                <th className="py-2 px-3">Confidence</th>
                <th className="py-2 px-3 text-right">Audit Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F7F9]">
              {[
                {
                  id: "EV-0142",
                  evidence_id: "EV-0142",
                  file_name: "Site_Report_Hindi_0142.log",
                  language: "Hindi",
                  original_language: "hi",
                  source_language: "hi",
                  activity: "Earthwork Excavation",
                  extracted_activity: "Earthwork Excavation",
                  quantity: "1,200 m³",
                  extracted_quantity: 1200,
                  unit: "m³",
                  location: "Zone A",
                  chainage: "10+200 - 10+800",
                  matchedCode: "A101",
                  activity_code: "A101",
                  activity_name: "Earthwork Excavation",
                  confidence: "94%",
                  match_confidence: 0.94,
                  original_text: "ज़ोन A में 1200 घन मीटर मिट्टी की खुदाई पूरी की गई। काम चेनिज 10+200 से 10+800 तक किया गया।",
                  raw_content: "ज़ोन A में 1200 घन मीटर मिट्टी की खुदाई पूरी की गई। काम चेनिज 10+200 से 10+800 तक किया गया।",
                  translated_text: "Earthwork excavation completed in Zone A with 1,200 m³ quantity from Chainage 10+200 to 10+800.",
                  execution_date: "04 Sep 2026",
                  status: "completed"
                },
                {
                  id: "EV-0141",
                  evidence_id: "EV-0141",
                  file_name: "Site_Report_Tamil_0141.log",
                  language: "Tamil",
                  original_language: "ta",
                  source_language: "ta",
                  activity: "Drain Construction",
                  extracted_activity: "Lined Trapezoidal Drain Construction",
                  quantity: "320 m",
                  extracted_quantity: 320,
                  unit: "m",
                  location: "Zone B",
                  chainage: "14+100 - 14+420",
                  matchedCode: "A103",
                  activity_code: "A103",
                  activity_name: "Lined Trapezoidal Drain Construction",
                  confidence: "91%",
                  match_confidence: 0.91,
                  original_text: "மண்டலம் B-ல் 320 மீட்டர் கான்கிரீட் வடிகால் பணி முடிக்கப்பட்டது.",
                  raw_content: "மண்டலம் B-ல் 320 மீட்டர் கான்கிரீட் வடிகால் பணி முடிக்கப்பட்டது.",
                  translated_text: "Lined concrete trapezoidal drain construction completed for 320 m in Zone B.",
                  execution_date: "03 Sep 2026",
                  status: "completed"
                },
                {
                  id: "EV-0139",
                  evidence_id: "EV-0139",
                  file_name: "Site_Report_Marathi_0139.log",
                  language: "Marathi",
                  original_language: "mr",
                  source_language: "mr",
                  activity: "Earthwork Excavation",
                  extracted_activity: "Earthwork Excavation",
                  quantity: "850 m³",
                  extracted_quantity: 850,
                  unit: "m³",
                  location: "Zone A",
                  chainage: "09+800 - 10+200",
                  matchedCode: "A101",
                  activity_code: "A101",
                  activity_name: "Earthwork Excavation",
                  confidence: "96%",
                  match_confidence: 0.96,
                  original_text: "झोन A मध्ये 850 घनमीटर माती खोदकाम पूर्ण झाले.",
                  raw_content: "झोन A मध्ये 850 घनमीटर माती खोदकाम पूर्ण झाले.",
                  translated_text: "Earthwork excavation completed in Zone A with 850 m³ quantity.",
                  execution_date: "02 Sep 2026",
                  status: "completed"
                }
              ].map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onOpenEvidence && onOpenEvidence(item)}
                  className="hover:bg-[#F5F7F9] transition-colors cursor-pointer group"
                >
                  <td className="py-2.5 px-3 font-bold text-[#087F8C] group-hover:underline">
                    {item.id}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-[#EAF2F8] text-[#16324F] font-semibold text-[11px]">
                      {item.language}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-sans text-[#17212B]">
                    {item.activity}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-[#16324F]">
                    {item.quantity}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-[#F5F7F9] border border-[#D8E1E8] text-[#16324F] font-bold">
                      {item.matchedCode}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#16845B] font-bold">
                    {item.confidence}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="text-[11px] text-[#3977A9] group-hover:underline font-semibold">
                      View Traceability →
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
