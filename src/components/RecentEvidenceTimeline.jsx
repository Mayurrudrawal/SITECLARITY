import React from 'react';
import { ChevronRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function RecentEvidenceTimeline({ evidenceList = [], onOpenEvidence, id }) {
  const { t } = useI18n();
  const recentItems = evidenceList.slice(0, 5);

  return (
    <div id={id} className="bg-white border border-[#D8E1E8] rounded-lg p-4 flex flex-col justify-between h-full shadow-xs">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#D8E1E8]">
          <div>
            <h3 className="text-xs font-bold text-[#16324F] uppercase tracking-wider flex items-center space-x-2">
              <span>{t('recentSiteEvidenceTitle', 'Recent Site Evidence')}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold bg-[#EAF2F8] text-[#3977A9] border border-[#3977A9]/20">
                {evidenceList.length} {t('totalBadge', 'Total')}
              </span>
            </h3>
            <p className="text-[11px] text-[#617386] mt-0.5">
              {t('recentEvidenceSubtitle', 'Verified daily site reports, photos, test certificates & drone logs')}
            </p>
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="mt-3 space-y-2">
          {recentItems.map((evi) => {
            const dateStr = evi.uploaded_at
              ? new Date(evi.uploaded_at).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
              : '04 Sep';

            return (
              <div
                key={evi.id}
                onClick={() => onOpenEvidence && onOpenEvidence(evi)}
                className="p-2.5 rounded-md bg-[#F5F7F9] border border-[#D8E1E8] hover:border-[#087F8C] hover:bg-[#E7F5F4]/30 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-start space-x-3 min-w-0">
                  {/* Date badge */}
                  <div className="px-2 py-1 rounded bg-white border border-[#D8E1E8] text-[10px] font-mono text-[#16324F] font-bold shrink-0 text-center leading-none">
                    {dateStr}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[11px] font-semibold text-[#17212B] truncate">
                        {t(evi.activity?.name || evi.file_name, evi.activity?.name || evi.file_name)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-[10px] text-[#617386] mt-0.5 font-mono">
                      <span className="text-[#617386]">{t(evi.source_type, evi.source_type)}</span>
                      {evi.execution?.quantity && (
                        <>
                          <span>•</span>
                          <span className="text-[#16845B] font-semibold">
                            +{evi.execution.quantity.toLocaleString()} {evi.execution.unit}
                          </span>
                        </>
                      )}
                      {evi.activity?.activity_code && (
                        <>
                          <span>•</span>
                          <span className="text-[#087F8C] font-semibold">{evi.activity.activity_code}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0 ml-2">
                  <StatusBadge status="Verified" size="sm" />
                  <ChevronRight size={14} className="text-[#91A0AE] group-hover:text-[#087F8C]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-[#D8E1E8] flex items-center justify-between text-[11px] text-[#617386]">
        <span>{t('clickInspectEvidencePrompt', 'Click to inspect original certified evidence document & audit hash')}</span>
      </div>
    </div>
  );
}
