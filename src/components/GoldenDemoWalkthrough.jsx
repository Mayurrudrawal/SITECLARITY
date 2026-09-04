import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Check,
  Sparkles,
  Pause,
  SkipForward,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Cpu,
  X
} from 'lucide-react';

export function GoldenDemoWalkthrough({
  currentStep = 1,
  onStepClick,
  onRunAutoDemo,
  isAutoRunning = false,
  onResetDemo,
  onPauseDemo,
  onSkipDemo,
  onClose,
  isPaused = false,
  id
}) {
  // 7 Core sequential steps as required
  const steps = [
    { num: 1, title: "Schedule Loaded", desc: "125 activities baseline at 68% planned" },
    { num: 2, title: "Evidence Captured", desc: "Site_Report_0409.pdf ingested (Zone A)" },
    { num: 3, title: "AI Extraction", desc: "1,200 m³ Earthwork parsed via NLP" },
    { num: 4, title: "Activity Matched", desc: "A101 aligned with schedule WBS" },
    { num: 5, title: "Confidence Calculated", desc: "95% multi-vector score breakdown" },
    { num: 6, title: "Progress Updated", desc: "6,800 + 1,200 = 8,000 m³ (80% vs 85%)" },
    { num: 7, title: "Evidence Verified", desc: "Certified by RE & sealed in ledger" }
  ];

  const isCompleted = currentStep >= 7 && !isAutoRunning;

  return (
    <div id={id} className="bg-white border border-[#D8E1E8] rounded-xl p-4 sm:p-5 shadow-xs mb-5 font-sans animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Top Controller Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-[#D8E1E8]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#E7F5F4] border border-[#087F8C]/20 flex items-center justify-center text-[#087F8C]">
            <Sparkles size={16} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm sm:text-base font-bold text-[#16324F] uppercase tracking-wide">
                GOLDEN DEMO GUIDED INTELLIGENCE CONTROLLER
              </h2>
              <span className="text-[10px] bg-[#E7F5F4] text-[#087F8C] font-mono font-bold px-2 py-0.5 rounded-full border border-[#087F8C]/20">
                DETERMINISTIC PIPELINE
              </span>
            </div>
            <p className="text-xs text-[#617386] mt-0.5">
              Plan → Understand → Match → Measure → Verify
            </p>
          </div>
        </div>

        {/* Action Controls: Run, Pause, Skip, Reset, Close */}
        <div className="flex items-center space-x-2 self-start lg:self-auto">
          {isAutoRunning && (
            <>
              <button
                onClick={onPauseDemo}
                className="px-2.5 py-1.5 rounded-md bg-[#F5F7F9] hover:bg-[#D8E1E8] text-[#16324F] border border-[#D8E1E8] text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                title={isPaused ? "Resume execution" : "Pause sequence"}
              >
                {isPaused ? <Play size={12} /> : <Pause size={12} />}
                <span>{isPaused ? "Resume" : "Pause"}</span>
              </button>

              <button
                onClick={onSkipDemo}
                className="px-2.5 py-1.5 rounded-md bg-[#F5F7F9] hover:bg-[#D8E1E8] text-[#16324F] border border-[#D8E1E8] text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                title="Fast-forward to verified outcome"
              >
                <SkipForward size={12} />
                <span>Skip</span>
              </button>
            </>
          )}

          <button
            onClick={onResetDemo}
            className="px-3 py-1.5 rounded-md bg-white hover:bg-[#F5F7F9] text-[#16324F] border border-[#D8E1E8] text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="Reset to clean baseline state"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset Baseline</span>
            <span className="sm:hidden">Reset</span>
          </button>

          <button
            onClick={onRunAutoDemo}
            disabled={isAutoRunning}
            className="px-3.5 py-1.5 rounded-md bg-[#087F8C] hover:bg-[#076f7b] disabled:opacity-50 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Play size={12} className="fill-current" />
            <span>{isAutoRunning ? "Demo Executing..." : "Run Golden Demo"}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-[#617386] hover:text-[#16324F] hover:bg-[#F5F7F9] border border-[#D8E1E8] transition-colors cursor-pointer"
              title="Close guide controller"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Final State Banner when completed */}
      {isCompleted && (
        <div className="mt-3 p-3 bg-[#E8F5EF] border border-[#16845B]/30 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-in fade-in duration-200">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#16845B]">
            <CheckCircle2 size={16} />
            <span>GOLDEN DEMO VERIFIED OUTCOME:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 rounded bg-white text-[#16845B] border border-[#16845B]/30 font-bold">
              95% MATCH
            </span>
            <span className="text-[#16845B]">+</span>
            <span className="px-2 py-0.5 rounded bg-white text-[#087F8C] border border-[#087F8C]/30 font-bold">
              80% ACTUAL PROGRESS
            </span>
            <span className="text-[#16845B]">+</span>
            <span className="px-2 py-0.5 rounded bg-white text-[#16324F] border border-[#D8E1E8] font-bold">
              VERIFIED EVIDENCE
            </span>
          </div>
        </div>
      )}

      {/* Stepper Steps (7 stages) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-3 pt-1">
        {steps.map((s) => {
          const isActive = currentStep === s.num;
          const isDone = currentStep > s.num || isCompleted;

          return (
            <button
              key={s.num}
              onClick={() => onStepClick && onStepClick(s.num)}
              className={`p-2.5 rounded-lg text-left transition-all border flex flex-col justify-between cursor-pointer ${
                isActive
                  ? 'bg-[#E7F5F4] border-[#087F8C] ring-1 ring-[#087F8C]/40 shadow-xs'
                  : isDone
                  ? 'bg-[#E8F5EF]/60 border-[#16845B]/30 hover:bg-[#E8F5EF]'
                  : 'bg-[#F5F7F9] border-[#D8E1E8] hover:border-[#91A0AE] opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center ${
                    isActive
                      ? 'bg-[#087F8C] text-white'
                      : isDone
                      ? 'bg-[#16845B] text-white'
                      : 'bg-[#D8E1E8] text-[#617386]'
                  }`}
                >
                  {isDone ? <Check size={11} /> : s.num}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#087F8C] animate-pulse" />
                )}
              </div>
              <div className={`text-[11px] font-bold truncate ${isActive ? 'text-[#087F8C]' : isDone ? 'text-[#16845B]' : 'text-[#17212B]'}`}>
                {s.num}. {s.title}
              </div>
              <div className="text-[10px] text-[#617386] leading-tight line-clamp-2 mt-0.5">
                {s.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
