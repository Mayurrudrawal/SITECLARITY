import React, { useState } from 'react';
import { ShieldCheck, Activity, AlertOctagon, TrendingDown, Layers, HelpCircle } from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function ProjectHealthPanel({
  status = "AT RISK",
  variance = -9,
  delayedCount = 7,
  criticalCount = 2,
  latestExecutionDate = "04 Sep 2026",
  auditConfidence = 98.4,
  id
}) {
  const { t } = useI18n();
  const [activeDimension, setActiveDimension] = useState(null);

  // 4 Core Dimensions of Project Health
  const dimensions = [
    { id: 'execution', name: t('dimExecution', 'Execution'), score: 88, color: '#087F8C', desc: '8,000 m³ verified out of scheduled targets' },
    { id: 'schedule', name: t('dimSchedule', 'Schedule'), score: 76, color: '#3977A9', desc: `${variance}% schedule slippage on critical path` },
    { id: 'evidence', name: t('dimEvidence', 'Evidence'), score: 94, color: '#16845B', desc: '142 certified records with 98.4% audit verification' },
    { id: 'risk', name: t('dimRisk', 'Risk Cont.'), score: 80, color: '#C98200', desc: '2 critical bottleneck items under mitigation' }
  ];

  // Calculated composite health score
  const overallScore = 84;

  // SVG Radial Gauge Calculations
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div id={id} className="bg-white border border-[#D8E1E8] rounded-xl p-4 sm:p-5 flex flex-col justify-between h-full shadow-xs">
      <div>
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D8E1E8]">
          <div className="flex items-center space-x-2">
            <Activity size={15} className="text-[#087F8C]" />
            <h3 className="text-xs font-bold text-[#16324F] uppercase tracking-wider">
              {t('projectHealthRadialTitle', 'PROJECT HEALTH RADIAL')}
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold bg-[#FFF5DD] text-[#C98200] border border-[#C98200]/30">
            {t(status, status)} ({overallScore}/100)
          </span>
        </div>

        {/* Sophisticated Radial & Composite Score Display */}
        <div className="mt-4 flex items-center justify-around p-3 bg-[#F5F7F9] rounded-xl border border-[#D8E1E8]">
          {/* Circular SVG Gauge */}
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
              {/* Background Track */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="#D8E1E8"
                strokeWidth="7"
                fill="transparent"
              />
              {/* Active Progress Arc */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="#087F8C"
                strokeWidth="7"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner Center Metrics */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold font-mono text-[#16324F] leading-none">
                {overallScore}
              </span>
              <span className="text-[9px] font-mono uppercase text-[#617386] mt-0.5 font-semibold">
                {t('indexBadge', 'INDEX')}
              </span>
            </div>
          </div>

          {/* Quick Explanatory Summary */}
          <div className="pl-3 space-y-1 text-xs">
            <div className="font-bold text-[#16324F] text-xs leading-tight">
              {t('compositeIndexTitle', 'Composite Index')}
            </div>
            <p className="text-[11px] text-[#617386] leading-snug">
              {t('compositeIndexDesc', 'Weighted index combining execution pace, critical float variance, and verified evidence density.')}
            </p>
            <div className="pt-1 flex items-center space-x-1.5 text-[10px] font-mono text-[#16845B]">
              <ShieldCheck size={12} />
              <span>{t('auditConfidenceLabel', 'Audit Confidence')}: {auditConfidence}%</span>
            </div>
          </div>
        </div>

        {/* 4 Dimension Meters */}
        <div className="mt-3.5 space-y-2">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#617386] px-1">
            {t('coreControlDimensionsTitle', 'CORE CONTROL DIMENSIONS:')}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {dimensions.map((dim) => {
              const isHovered = activeDimension === dim.id;

              return (
                <div
                  key={dim.id}
                  onMouseEnter={() => setActiveDimension(dim.id)}
                  onMouseLeave={() => setActiveDimension(null)}
                  className={`p-2.5 rounded-lg border transition-all cursor-default ${
                    isHovered
                      ? 'bg-white border-[#087F8C] shadow-xs'
                      : 'bg-[#F5F7F9] border-[#D8E1E8]'
                  }`}
                  title={dim.desc}
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-[#17212B]">
                    <span>{dim.name}</span>
                    <span className="font-mono text-xs font-bold" style={{ color: dim.color }}>
                      {dim.score}%
                    </span>
                  </div>

                  {/* Horizontal mini bar */}
                  <div className="w-full bg-[#D8E1E8] h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${dim.score}%`,
                        backgroundColor: dim.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Meta Row */}
      <div className="mt-4 pt-3 border-t border-[#D8E1E8] flex items-center justify-between text-[11px] font-mono text-[#617386]">
        <span>{t('latestSiteRecordLabel', 'Latest Site Record')}: <strong>{latestExecutionDate}</strong></span>
        <span className="text-[#C93636] font-semibold flex items-center space-x-1">
          <AlertOctagon size={12} />
          <span>{criticalCount} {t('bottlenecksBadge', 'Bottlenecks')}</span>
        </span>
      </div>
    </div>
  );
}
