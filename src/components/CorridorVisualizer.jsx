import React, { useState } from 'react';
import { MapPin, Navigation, AlertTriangle, Layers, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function CorridorVisualizer({
  selectedZone = 'ALL',
  onSelectActivity,
  compact = false,
  id
}) {
  const { t } = useI18n();
  const [activeHighlight, setActiveHighlight] = useState('A101'); // 'A101', 'A104', or null

  const zones = [
    { name: t('Zone A', 'Zone A'), start: '00+000', end: '09+500', len: '9.5 km', status: t('On Track', 'On Track'), pct: '88%' },
    { name: t('Zone B', 'Zone B'), start: '10+000', end: '19+500', len: '9.5 km', status: t('At Risk', 'At Risk'), pct: '62%' },
    { name: t('Zone C', 'Zone C'), start: '20+000', end: '29+500', len: '9.5 km', status: t('On Track', 'On Track'), pct: '45%' },
    { name: t('Zone D', 'Zone D'), start: '30+000', end: '40+000', len: '10.0 km', status: t('Planned', 'Planned'), pct: '15%' }
  ];

  return (
    <div id={id} className={`bg-white border border-[#D8E1E8] rounded-xl ${compact ? 'p-3' : 'p-4 sm:p-5'} shadow-xs`}>
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D8E1E8] gap-2">
        <div className="flex items-center space-x-2">
          <Navigation size={15} className="text-[#087F8C]" />
          <h3 className="text-xs sm:text-sm font-bold text-[#16324F] uppercase tracking-wide">
            {t('corridorAlignmentTitle', 'INFRASTRUCTURE CORRIDOR ALIGNMENT (40.0 KM)')}
          </h3>
        </div>
        <div className="text-[11px] font-mono text-[#617386] flex items-center space-x-3">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#087F8C]" />
            <span>{t('activeWorkPrefix', 'Active Work')}: <strong>10+200 — 10+800</strong></span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#C93636]" />
            <span>{t('delayHotspotPrefix', 'Delay Hotspot')}: <strong>12+500</strong></span>
          </span>
        </div>
      </div>

      {/* Linear Corridor Bar Diagram */}
      <div className="mt-4">
        {/* 4 Zone Segment Blocks */}
        <div className="grid grid-cols-4 gap-1.5 text-center text-xs font-mono">
          {zones.map((z, idx) => (
            <div
              key={z.name}
              className={`p-2 rounded-lg border transition-all ${
                idx === 1
                  ? 'bg-[#E7F5F4]/40 border-[#087F8C]/40'
                  : 'bg-[#F5F7F9] border-[#D8E1E8]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-[#617386] font-bold">
                <span>{z.name}</span>
                <span>{z.pct}</span>
              </div>
              <div className="text-[11px] font-bold text-[#16324F] mt-0.5 truncate">
                {z.start} – {z.end}
              </div>
              <div className="text-[10px] text-[#91A0AE] mt-0.5">
                {z.len}
              </div>
            </div>
          ))}
        </div>

        {/* The Track Line with Work Execution Pin */}
        <div className="relative mt-5 mb-3 px-2">
          {/* Continuous Highway Alignment Line */}
          <div className="h-2 w-full bg-[#E2E8F0] rounded-full relative">
            {/* Completed section */}
            <div className="absolute left-0 top-0 h-2 bg-[#A8B4C0] rounded-l-full" style={{ width: '25%' }} />
            
            {/* Active Execution Work Zone (CH 10+200 to 10+800 = ~26% to 29%) */}
            <div
              onClick={() => onSelectActivity && onSelectActivity('A101')}
              className="absolute top-0 h-2 bg-[#087F8C] rounded cursor-pointer transition-all hover:h-3 hover:-top-0.5 hover:ring-2 hover:ring-[#087F8C]"
              style={{ left: '26%', width: '6%' }}
              title="A101: Earthwork Excavation (10+200 - 10+800)"
            />

            {/* Delay hotspot (Culvert 12+500 = ~32%) */}
            <div
              onClick={() => onSelectActivity && onSelectActivity('A104')}
              className="absolute top-0 h-2 bg-[#C93636] rounded cursor-pointer transition-all hover:h-3 hover:-top-0.5 hover:ring-2 hover:ring-[#C93636]"
              style={{ left: '32%', width: '3%' }}
              title="A104: Critical Culvert Bottleneck (12+500)"
            />
          </div>

          {/* Markers / Callout Bubbles */}
          <div className="relative h-14 mt-1">
            {/* Marker 1: A101 Active Execution */}
            <div
              onClick={() => onSelectActivity && onSelectActivity('A101')}
              className="absolute -top-1 left-[25%] -translate-x-1/2 flex flex-col items-center cursor-pointer group"
            >
              <div className="w-2 h-2 rounded-full bg-[#087F8C] ring-4 ring-[#E7F5F4] animate-pulse" />
              <div className="mt-1 bg-[#16324F] text-white px-2 py-1 rounded shadow-md text-[10px] font-mono font-bold whitespace-nowrap group-hover:bg-[#087F8C] transition-colors">
                <span>A101: 10+200 → 10+800</span>
                <span className="block text-[9px] font-normal text-[#E7F5F4] font-sans">
                  +1,200 m³ {t('excavationLabel', 'Excavation')}
                </span>
              </div>
            </div>

            {/* Marker 2: A104 Culvert Issue */}
            <div
              onClick={() => onSelectActivity && onSelectActivity('A104')}
              className="absolute -top-1 left-[34%] -translate-x-1/2 flex flex-col items-center cursor-pointer group"
            >
              <div className="w-2 h-2 rounded-full bg-[#C93636] ring-4 ring-[#FDECEC]" />
              <div className="mt-1 bg-white border border-[#C93636]/40 text-[#C93636] px-2 py-1 rounded shadow-xs text-[10px] font-mono font-bold whitespace-nowrap group-hover:bg-[#FDECEC] transition-colors">
                <span>A104: 12+500</span>
                <span className="block text-[9px] font-normal text-[#617386] font-sans">
                  {t('dewateringDelayLabel', 'Dewatering Delay')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info note */}
        <div className="pt-2 border-t border-[#D8E1E8] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#617386] font-mono gap-1">
          <span>{t('spatialContextLabel', 'Spatial Context: Corridor Chainage 00+000 (Start) → 40+000 (Finish)')}</span>
          <span className="text-[#087F8C] font-semibold">{t('clickCorridorNodeLabel', 'Click any corridor node to inspect corresponding activity')}</span>
        </div>
      </div>
    </div>
  );
}
