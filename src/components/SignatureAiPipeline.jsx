import React from 'react';
import {
  FileText,
  Cpu,
  GitMerge,
  Gauge,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function SignatureAiPipeline({
  goldenStep = 1,
  onNavigateToStage,
  id
}) {
  const { t } = useI18n();

  // Mapping of 6 stages in the deterministic pipeline
  const stages = [
    {
      id: 'evidence',
      number: '01',
      title: t('stageSiteEvidenceTitle', 'SITE EVIDENCE'),
      description: t('stageSiteEvidenceDesc', 'Unstructured daily report ingestion'),
      result: 'Site_Report_0409.pdf',
      subResult: t('Verified by Resident Engineer', 'Resident Engineer Signed'),
      icon: FileText,
      iconColor: 'text-[#3977A9]',
      bgColor: 'bg-[#EAF2F8]',
      activeStep: 2,
      tab: 'execution'
    },
    {
      id: 'extraction',
      number: '02',
      title: t('stageAiExtractionTitle', 'AI EXTRACTION'),
      description: t('stageAiExtractionDesc', 'Multi-modal entity parsing'),
      result: t('Earthwork Excavation', 'Earthwork Excavation'),
      subResult: `+1,200 m³ • ${t('Zone A', 'Zone A')} (10+200)`,
      icon: Cpu,
      iconColor: 'text-[#087F8C]',
      bgColor: 'bg-[#E7F5F4]',
      activeStep: 3,
      tab: 'ai-analysis'
    },
    {
      id: 'match',
      number: '03',
      title: t('stageActivityMatchTitle', 'ACTIVITY MATCH'),
      description: t('stageActivityMatchDesc', 'WBS schedule candidate alignment'),
      result: `${t('Activity', 'Activity')} A101`,
      subResult: `WBS 2.1 ${t('Earthworks', 'Earthworks')}`,
      icon: GitMerge,
      iconColor: 'text-[#087F8C]',
      bgColor: 'bg-[#E7F5F4]',
      activeStep: 4,
      tab: 'matching'
    },
    {
      id: 'confidence',
      number: '04',
      title: t('stageAiConfidenceTitle', 'AI CONFIDENCE'),
      description: t('stageAiConfidenceDesc', '5-vector analytical confidence'),
      result: '95% Score',
      subResult: '≥85% Auto-Accept Threshold',
      icon: Gauge,
      iconColor: 'text-[#16845B]',
      bgColor: 'bg-[#E8F5EF]',
      activeStep: 5,
      tab: 'matching'
    },
    {
      id: 'progress',
      number: '05',
      title: t('stageProgressUpdateTitle', 'PROGRESS UPDATE'),
      description: t('stageProgressUpdateDesc', 'Deterministic quantity bridge'),
      result: '68% → 80%',
      subResult: '6,800 + 1,200 = 8,000 m³',
      icon: TrendingUp,
      iconColor: 'text-[#087F8C]',
      bgColor: 'bg-[#E7F5F4]',
      activeStep: 7,
      tab: 'progress'
    },
    {
      id: 'traceability',
      number: '06',
      title: t('stageEvidenceTraceTitle', 'EVIDENCE TRACE'),
      description: t('stageEvidenceTraceDesc', 'Cryptographic audit ledger'),
      result: t('verifiedSealedText', 'Verified & Sealed'),
      subResult: 'RE Rajesh Sharma (04 Sep)',
      icon: ShieldCheck,
      iconColor: 'text-[#16845B]',
      bgColor: 'bg-[#E8F5EF]',
      activeStep: 9,
      tab: 'traceability'
    }
  ];

  return (
    <div id={id} className="bg-white border border-[#D8E1E8] rounded-xl p-4 sm:p-5 shadow-xs">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D8E1E8]">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-[#E7F5F4] text-[#087F8C] border border-[#087F8C]/20">
            <Sparkles size={15} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xs sm:text-sm font-bold text-[#16324F] uppercase tracking-wide">
                {t('signatureAiTitle', 'SIGNATURE AI INTELLIGENCE PIPELINE')}
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E7F5F4] text-[#087F8C] border border-[#087F8C]/30 font-medium">
                {t('deterministicVerificationBadge', 'DETERMINISTIC VERIFICATION')}
              </span>
            </div>
            <p className="text-[11px] text-[#617386] mt-0.5">
              {t('signatureAiSubtitle', 'Plan → Understand → Match → Measure → Verify')}
            </p>
          </div>
        </div>

        <div className="text-[11px] font-mono text-[#617386] flex items-center space-x-2 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#16845B]" />
          <span>{t('activePipelineLabel', 'Active Pipeline')}: <strong>A101 Corridor A</strong></span>
        </div>
      </div>

      {/* Pipeline Stages Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-2.5 mt-3.5">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isCurrentlyActive = goldenStep === stage.activeStep || (goldenStep >= stage.activeStep && goldenStep <= stage.activeStep + 1);
          const isPast = goldenStep > stage.activeStep;

          return (
            <div
              key={stage.id}
              onClick={() => onNavigateToStage && onNavigateToStage(stage.tab)}
              className={`relative rounded-lg p-3 border transition-all cursor-pointer group flex flex-col justify-between ${
                isCurrentlyActive
                  ? 'bg-white border-[#087F8C] shadow-sm ring-1 ring-[#087F8C]/30'
                  : isPast
                  ? 'bg-[#F8FAFC] border-[#D8E1E8] hover:border-[#087F8C]/60'
                  : 'bg-[#F5F7F9] border-[#D8E1E8] hover:border-[#91A0AE]'
              }`}
            >
              {/* Step indicator and connector arrow */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1.5">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold ${
                      isCurrentlyActive
                        ? 'bg-[#087F8C] text-white'
                        : isPast
                        ? 'bg-[#16845B] text-white'
                        : 'bg-[#D8E1E8] text-[#617386]'
                    }`}
                  >
                    {isPast ? <CheckCircle2 size={13} /> : stage.number}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#617386] tracking-wider uppercase">
                    {stage.title}
                  </span>
                </div>

                <div className={`p-1 rounded ${stage.bgColor} ${stage.iconColor}`}>
                  <Icon size={13} />
                </div>
              </div>

              {/* Middle: Stage outcome result */}
              <div className="my-1">
                <div className="text-xs font-bold text-[#16324F] truncate group-hover:text-[#087F8C] transition-colors">
                  {stage.result}
                </div>
                <div className="text-[10px] text-[#617386] font-mono truncate mt-0.5">
                  {stage.subResult}
                </div>
              </div>

              {/* Bottom: Context description & subtle arrow */}
              <div className="pt-2 border-t border-[#D8E1E8]/70 flex items-center justify-between text-[10px] text-[#91A0AE] font-mono">
                <span className="truncate max-w-[120px]">{stage.description}</span>
                <ArrowRight size={11} className="text-[#087F8C] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
