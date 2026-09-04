import React from 'react';
import { ExtractionPanel } from '../components/ExtractionPanel.jsx';
import { Cpu } from 'lucide-react';

export function AiAnalysisPage({
  latestExtraction,
  latestExecutionRecord,
  onProceedToMatching,
  isMatching,
  id
}) {
  // If no live extraction, provide the Golden Scenario default extraction for instant inspection
  const sampleExtraction = latestExtraction || {
    date: "04 Sep 2026",
    activity: "Earthwork Excavation",
    quantity: 1200,
    unit: "m³",
    location: "Zone A",
    chainage: "10+200 → 10+800",
    status: "Completed",
    confidence: 0.96,
    reasoning: "High semantic affinity with activity A101 earthwork excavation. Quantity 1,200 m3 and chainage 10+200 - 10+800 match Zone A corridor parameters."
  };

  return (
    <div id={id} className="space-y-4">
      <div className="bg-white border border-[#D8E1E8] rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#16324F] uppercase tracking-wide">
            AI EXTRACTION & NATURAL LANGUAGE ENGINE
          </h2>
          <p className="text-xs text-[#617386] mt-0.5">
            Real-time entity extraction from unstructured site logs into structured execution telemetry
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-[#087F8C] bg-[#E7F5F4] px-3 py-1.5 rounded-md border border-[#087F8C]/20 font-semibold">
          <Cpu size={14} />
          <span>Multi-Modal NLP Model Active</span>
        </div>
      </div>

      <ExtractionPanel
        id="ai-analysis-panel"
        extraction={sampleExtraction}
        executionRecord={latestExecutionRecord}
        onRunMatching={onProceedToMatching}
        isMatching={isMatching}
      />
    </div>
  );
}
