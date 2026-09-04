import React from 'react';
import { UploadZone } from '../components/UploadZone.jsx';
import { ExtractionPanel } from '../components/ExtractionPanel.jsx';
import { StatusBadge } from '../components/StatusBadge.jsx';
import { FileText } from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function ExecutionPage({
  latestExtraction,
  latestExecutionRecord,
  recentCaptures = [],
  onUploadSuccess,
  onProceedToMatching,
  isMatching,
  id
}) {
  const { t } = useI18n();

  const defaultCaptures = [
    {
      id: 'cap-1',
      date: '04 Sep 2026',
      source: 'Daily Site Report (PDF)',
      location: 'Zone A (CH 10+200 - 10+800)',
      status: 'Extracted',
      activity: 'A101 — Earthwork Excavation',
      qty: '1,200 m³',
      confidence: '96%'
    },
    {
      id: 'cap-2',
      date: '03 Sep 2026',
      source: 'Site Photo Inspection',
      location: 'Chainage 12+500',
      status: 'Verified',
      activity: 'A104 — Culvert Construction',
      qty: 'Culvert Wall Pour',
      confidence: '94%'
    },
    {
      id: 'cap-3',
      date: '02 Sep 2026',
      source: 'Daily Progress Log',
      location: 'Zone A (CH 04+000 - 06+500)',
      status: 'Verified',
      activity: 'A102 — Granular Sub-base',
      qty: '500 m³',
      confidence: '91%'
    },
    {
      id: 'cap-4',
      date: '01 Sep 2026',
      source: 'Material Test Certificate',
      location: 'Batching Plant / Zone B',
      status: 'Verified',
      activity: 'A103 — Concrete Drain',
      qty: '28-Day Cube Test M35',
      confidence: '98%'
    }
  ];

  const capturesList = recentCaptures.length > 0 ? recentCaptures : defaultCaptures;

  return (
    <div id={id} className="space-y-4">
      {/* Header Banner */}
      <div className="bg-white border border-[#D8E1E8] rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#16324F] uppercase tracking-wide">
            {t('navExecution', 'SITE EVIDENCE & FIELD REPORTING')}
          </h2>
          <p className="text-xs text-[#617386] mt-0.5">
            {t('multilingualDesc', 'Capture what is happening on site from multi-modal field evidence')}
          </p>
        </div>
      </div>

      {/* Upload Zone */}
      <UploadZone
        id="execution-upload-zone"
        onUploadSuccess={onUploadSuccess}
      />

      {/* Active AI Extraction Transformation (if uploaded or demo run) */}
      {latestExtraction && (
        <ExtractionPanel
          id="execution-extraction-panel"
          extraction={latestExtraction}
          executionRecord={latestExecutionRecord}
          onRunMatching={onProceedToMatching}
          isMatching={isMatching}
        />
      )}

      {/* RECENT SITE CAPTURE */}
      <div className="bg-white border border-[#D8E1E8] rounded-lg p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#D8E1E8]">
          <div>
            <h3 className="text-xs font-bold text-[#16324F] uppercase tracking-wider">
              {t('recentSiteEvidenceTitle', 'RECENT SITE CAPTURE')}
            </h3>
            <p className="text-[11px] text-[#617386] mt-0.5">
              {t('recentEvidenceSubtitle', 'Field evidence ingestion ledger with multi-modal NLP confidence levels')}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-[#F8FAFC] text-[#617386] font-mono text-[10px] uppercase border-b border-[#D8E1E8]">
              <tr>
                <th className="py-2.5 px-3">{t('date', 'Date')}</th>
                <th className="py-2.5 px-3">{t('Source Evidence', 'Source Evidence')}</th>
                <th className="py-2.5 px-3">{t('location', 'Location')}</th>
                <th className="py-2.5 px-3">{t('quantity', 'Quantity')}</th>
                <th className="py-2.5 px-3">{t('activity', 'Linked Activity')}</th>
                <th className="py-2.5 px-3 text-center">{t('confidence', 'Confidence')}</th>
                <th className="py-2.5 px-3 text-center">{t('thStatus', 'Status')}</th>
                <th className="py-2.5 px-3 text-right">{t('action', 'Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8E1E8] font-sans">
              {capturesList.map((cap) => (
                <tr
                  key={cap.id}
                  onClick={() => onOpenEvidence && onOpenEvidence(cap)}
                  className="hover:bg-[#F5F7F9] transition-colors cursor-pointer"
                >
                  <td className="py-2.5 px-3 font-mono text-[#617386] whitespace-nowrap text-[11px]">
                    {cap.date}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-[#17212B]">
                    <div className="flex items-center space-x-1.5">
                      <FileText size={13} className="text-[#087F8C] shrink-0" />
                      <span>{t(cap.source, cap.source)}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-[#617386] text-[11px]">
                    {cap.location}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#16845B] text-[11px]">
                    {cap.qty}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[#087F8C] text-[11px]">
                    {t(cap.activity, cap.activity)}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-[#087F8C] font-bold text-[11px]">
                    {cap.confidence}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <StatusBadge status={cap.status} size="sm" />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenEvidence) onOpenEvidence(cap);
                      }}
                      className="px-2 py-0.5 text-[10px] font-mono font-semibold text-[#087F8C] hover:bg-[#E7F5F4] border border-[#087F8C]/20 rounded transition-colors"
                    >
                      {t('viewEvidence', 'View Evidence')}
                    </button>
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
