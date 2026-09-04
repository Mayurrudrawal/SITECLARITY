import React, { useState } from 'react';
import {
  FileText,
  Cpu,
  GitMerge,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export function ExecutionTimeline({
  onOpenEvidence,
  onOpenMatch,
  onOpenProgress,
  id
}) {
  const [selectedNode, setSelectedNode] = useState(null);

  const timelineEvents = [
    {
      id: 'node-upload',
      date: '04 SEP 2026',
      time: '09:30 AM',
      title: 'Site Evidence Uploaded',
      summary: 'Site_Report_0409.pdf submitted by Site Engineer (Zone A)',
      sourceType: 'Daily Report',
      sourceDetail: {
        fileName: 'Site_Report_0409.pdf',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        certifiedBy: 'Rajesh Sharma, Resident Engineer',
        recordedLocation: 'Zone A (CH 10+200 - 10+800)'
      },
      icon: FileText,
      iconBg: 'bg-[#EAF2F8] text-[#16324F]',
      badge: 'Certified Source',
      badgeColor: 'bg-[#EAF2F8] text-[#16324F]'
    },
    {
      id: 'node-ai',
      date: '04 SEP 2026',
      time: '09:31 AM',
      title: 'AI Multi-Modal Extraction Completed',
      summary: 'Extracted 1,200 m³ Earthwork Excavation in Zone A (10+200 - 10+800)',
      sourceType: 'NLP & OCR Engine',
      sourceDetail: {
        itemExtracted: 'Earthwork Excavation',
        quantity: '1,200 m³',
        location: 'Zone A, Chainage 10+200 to 10+800',
        confidenceScore: '96.2%'
      },
      icon: Cpu,
      iconBg: 'bg-[#E7F5F4] text-[#087F8C]',
      badge: 'Automated',
      badgeColor: 'bg-[#E7F5F4] text-[#087F8C]'
    },
    {
      id: 'node-match',
      date: '04 SEP 2026',
      time: '09:32 AM',
      title: 'Activity A101 Matched with 95% Confidence',
      summary: 'Automatic alignment with WBS 2.1 schedule task',
      sourceType: 'Matching Engine',
      sourceDetail: {
        matchedCode: 'A101 - Earthwork Excavation',
        wbsReference: '2.1 Site Preparation & Earthworks',
        scoreBreakdown: 'Semantic 40/40 + Quantity 20/20 + Location 20/20 + Unit 9/10 + Date 6/10 = 95%',
        autoAccepted: 'Yes (Threshold ≥85%)'
      },
      icon: GitMerge,
      iconBg: 'bg-[#E7F5F4] text-[#087F8C]',
      badge: '95% Match',
      badgeColor: 'bg-[#E8F5EF] text-[#16845B]'
    },
    {
      id: 'node-progress',
      date: '04 SEP 2026',
      time: '09:33 AM',
      title: 'Cumulative Progress & Quantities Updated',
      summary: '6,800 + 1,200 = 8,000 m³ executed (80% actual vs 85% planned)',
      sourceType: 'Deterministic Bridge',
      sourceDetail: {
        priorActual: '6,800 m³ (68%)',
        increment: '+1,200 m³ (+12%)',
        updatedActual: '8,000 m³ (80%)',
        plannedTarget: '8,500 m³ (85%)',
        updatedVariance: '-5% (Reduced from -17%)'
      },
      icon: TrendingUp,
      iconBg: 'bg-[#E8F5EF] text-[#16845B]',
      badge: 'Verified Delta',
      badgeColor: 'bg-[#E8F5EF] text-[#16845B]'
    },
    {
      id: 'node-verify',
      date: '04 SEP 2026',
      time: '09:34 AM',
      title: 'Evidence Verified in Cryptographic Ledger',
      summary: 'Linked permanently into audit trail with RE certification',
      sourceType: 'Audit Ledger',
      sourceDetail: {
        auditId: 'AUD-2026-0904-A101',
        blockStamp: '04-SEP-2026 09:34:12 IST',
        inspector: 'Rajesh Sharma, RE',
        integrityHash: 'verified_valid'
      },
      icon: ShieldCheck,
      iconBg: 'bg-[#E8F5EF] text-[#16845B]',
      badge: 'Audited',
      badgeColor: 'bg-[#E8F5EF] text-[#16845B]'
    }
  ];

  return (
    <div id={id} className="bg-white border border-[#D8E1E8] rounded-xl p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-[#D8E1E8]">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-[#16324F] uppercase tracking-wide">
            EXECUTION TIMELINE & LINEAGE NODES
          </h3>
          <p className="text-[11px] text-[#617386] mt-0.5">
            Click any timeline node to reveal its underlying forensic data
          </p>
        </div>
        <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-[#E8F5EF] text-[#16845B] rounded border border-[#16845B]/30">
          5 Nodes Verified
        </span>
      </div>

      <div className="mt-4 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D8E1E8] space-y-4">
        {timelineEvents.map((event) => {
          const Icon = event.icon;
          const isExpanded = selectedNode === event.id;

          return (
            <div key={event.id} className="relative group">
              {/* Timeline Bullet Node */}
              <button
                onClick={() => setSelectedNode(isExpanded ? null : event.id)}
                className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center transition-all cursor-pointer ${
                  isExpanded
                    ? 'bg-[#087F8C] ring-4 ring-[#E7F5F4]'
                    : 'bg-[#16324F] group-hover:bg-[#087F8C]'
                }`}
                title="Click to reveal details"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </button>

              {/* Node Content Container */}
              <div
                onClick={() => setSelectedNode(isExpanded ? null : event.id)}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  isExpanded
                    ? 'bg-[#F8FAFC] border-[#087F8C] shadow-xs'
                    : 'bg-[#F5F7F9] border-[#D8E1E8] hover:border-[#087F8C]/60 hover:bg-white'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded ${event.iconBg}`}>
                      <Icon size={13} />
                    </div>
                    <span className="text-xs font-bold text-[#16324F]">
                      {event.title}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-medium ${event.badgeColor}`}>
                      {event.badge}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-[10px] font-mono text-[#617386]">
                    <span>{event.time}</span>
                    <span>•</span>
                    <span>{event.date}</span>
                    {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </div>
                </div>

                <div className="text-[11px] text-[#617386] mt-1 pl-6">
                  {event.summary}
                </div>

                {/* Expanded Forensic Detail Drawer */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#D8E1E8] pl-6 animate-in fade-in duration-150">
                    <div className="bg-white border border-[#D8E1E8] rounded-md p-3 font-mono text-xs space-y-1.5">
                      <div className="text-[10px] font-bold uppercase text-[#087F8C]">
                        Source Record Payload:
                      </div>
                      {Object.entries(event.sourceDetail).map(([key, val]) => (
                        <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] py-0.5 border-b border-[#F5F7F9]">
                          <span className="text-[#617386] capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="font-semibold text-[#17212B]">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
