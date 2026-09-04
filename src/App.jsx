import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { GoldenDemoWalkthrough } from './components/GoldenDemoWalkthrough.jsx';
import { EvidenceViewer } from './components/EvidenceViewer.jsx';
import { ActivityDetail } from './components/ActivityDetail.jsx';
import { CommandPalette } from './components/CommandPalette.jsx';

import { DashboardPage } from './pages/DashboardPage.jsx';
import { SchedulePage } from './pages/SchedulePage.jsx';
import { ExecutionPage } from './pages/ExecutionPage.jsx';
import { AiAnalysisPage } from './pages/AiAnalysisPage.jsx';
import { MatchingPage } from './pages/MatchingPage.jsx';
import { ProgressPage } from './pages/ProgressPage.jsx';
import { DelaysPage } from './pages/DelaysPage.jsx';
import { TraceabilityPage } from './pages/TraceabilityPage.jsx';
import { MultilingualIntelligencePage } from './pages/MultilingualIntelligencePage.jsx';

import {
  fetchDashboard,
  fetchActivities,
  fetchActivityById,
  uploadExecutionEvidence,
  runMatching,
  acceptMatch,
  changeMatchActivity,
  fetchEvidenceList,
  fetchProgress,
  resetDemoState
} from './services/api.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [evidenceList, setEvidenceList] = useState([]);
  const [progressData, setProgressData] = useState(null);

  // Active Execution & Matching State
  const [latestExtraction, setLatestExtraction] = useState(null);
  const [latestExecutionRecord, setLatestExecutionRecord] = useState(null);
  const [matchingResults, setMatchingResults] = useState(null);
  const [isMatching, setIsMatching] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);

  // Modals & Detailed Views
  const [selectedActivityCode, setSelectedActivityCode] = useState(null);
  const [activityDetailData, setActivityDetailData] = useState(null);
  const [viewingEvidence, setViewingEvidence] = useState(null);

  // Golden Demo Stepper
  const [goldenStep, setGoldenStep] = useState(1);
  const [showGoldenDemo, setShowGoldenDemo] = useState(false);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const skipRequestedRef = useRef(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Global Command Palette (⌘K)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadAllData = async () => {
    try {
      const [dash, actRes, eviRes, progRes] = await Promise.all([
        fetchDashboard(),
        fetchActivities(),
        fetchEvidenceList(),
        fetchProgress()
      ]);
      setDashboardData(dash);
      setActivities(actRes.activities || []);
      setEvidenceList(eviRes || []);
      setProgressData(progRes || null);
    } catch (err) {
      console.error("Failed to load project monitor data:", err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // When activity code selected for detail view
  const handleSelectActivity = async (code) => {
    setSelectedActivityCode(code);
    try {
      const act = await fetchActivityById(code);
      setActivityDetailData(act);
      setActiveTab('activity-detail');
    } catch (err) {
      showToast(`Could not load details for ${code}`);
    }
  };

  // Upload handler in Execution Capture
  const handleUploadSuccess = async (result) => {
    setLatestExtraction(result.extraction);
    setLatestExecutionRecord(result.execution_record);
    showToast("Site report successfully ingested & AI extraction completed");
    setGoldenStep(3);

    // Auto calculate matching candidates
    try {
      setIsMatching(true);
      const matchData = await runMatching(result.execution_record.id, null);
      setMatchingResults(matchData);
    } catch (err) {
      console.error("Auto match calculation failed:", err);
    } finally {
      setIsMatching(false);
    }
  };

  // Proceed to Matching Tab
  const handleProceedToMatching = async () => {
    if (!matchingResults && latestExecutionRecord) {
      setIsMatching(true);
      try {
        const matchData = await runMatching(latestExecutionRecord.id, null);
        setMatchingResults(matchData);
      } catch (err) {
        showToast("Matching error: " + err.message);
      } finally {
        setIsMatching(false);
      }
    }
    setActiveTab('matching');
    setGoldenStep(4);
  };

  // Accept match
  const handleAcceptMatch = async (matchId) => {
    setIsAccepting(true);
    try {
      const result = await acceptMatch(matchId);
      showToast(result.message || "Match accepted & progress updated!");
      setGoldenStep(7);
      await loadAllData();
      setActiveTab('progress');
    } catch (err) {
      showToast("Failed to accept match: " + err.message);
    } finally {
      setIsAccepting(false);
    }
  };

  // Change activity
  const handleChangeActivity = async (matchId, newActivityId) => {
    try {
      const result = await changeMatchActivity(matchId, newActivityId);
      showToast(result.message || "Match re-assigned!");
      if (latestExecutionRecord) {
        const updated = await runMatching(latestExecutionRecord.id, null);
        setMatchingResults(updated);
      }
    } catch (err) {
      showToast("Error re-assigning match: " + err.message);
    }
  };

  // Reset Demo
  const handleResetDemo = async () => {
    try {
      const res = await resetDemoState();
      setGoldenStep(1);
      setLatestExtraction(null);
      setLatestExecutionRecord(null);
      setMatchingResults(null);
      setShowGoldenDemo(false);
      setActiveTab('dashboard');
      await loadAllData();
      showToast("Demo state reset to clean baseline (A101 @ 6,800 m³)");
    } catch (err) {
      showToast("Reset failed: " + err.message);
    }
  };

  const handlePauseDemo = () => {
    isPausedRef.current = !isPausedRef.current;
    setIsPaused(isPausedRef.current);
    showToast(isPausedRef.current ? "Demo walkthrough paused" : "Demo walkthrough resumed");
  };

  const handleSkipDemo = () => {
    skipRequestedRef.current = true;
    showToast("Skipping to next step...");
  };

  // 1-Click Interactive Golden Demo Run (Sequential execution of the 9 steps)
  const handleRunAutoDemo = async () => {
    setShowGoldenDemo(true);
    setIsAutoRunning(true);
    setIsPaused(false);
    isPausedRef.current = false;
    skipRequestedRef.current = false;
    showToast("Starting 9-Step Golden Demo Walkthrough...");

    const waitStep = async (ms) => {
      const start = Date.now();
      while (Date.now() - start < ms) {
        if (skipRequestedRef.current) {
          skipRequestedRef.current = false;
          break;
        }
        while (isPausedRef.current) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    };

    try {
      // Step 1: Dashboard
      setGoldenStep(1);
      setActiveTab('dashboard');
      await loadAllData();
      await waitStep(1600);

      // Step 2: Capture Site Evidence
      setGoldenStep(2);
      setActiveTab('execution');
      showToast("Step 2: Uploading Site_Report_0409.pdf...");
      await waitStep(1400);

      // Step 3: AI Extraction
      setGoldenStep(3);
      const uploadRes = await uploadExecutionEvidence(
        "Today, 1,200 cubic metres of earthwork excavation was completed in Zone A from Chainage 10+200 to 10+800. Certified by Resident Engineer Rajesh Sharma on 04 Sep 2026.",
        "Daily Site Report"
      );
      setLatestExtraction(uploadRes.extraction);
      setLatestExecutionRecord(uploadRes.execution_record);
      showToast("Step 3: Extracted 1,200 m³ Earthwork Excavation (Confidence 96%)");
      await waitStep(2000);

      // Step 4 & 5: Matching & Confidence Breakdown
      setGoldenStep(4);
      setActiveTab('matching');
      const matchData = await runMatching(uploadRes.execution_record.id, null);
      setMatchingResults(matchData);
      showToast("Step 4 & 5: Identified A101 with 95% Confidence (40+20+20+9+6)");
      setGoldenStep(5);
      await waitStep(2200);

      // Step 6: Accept Match
      setGoldenStep(6);
      showToast("Step 6: Accepting Top Match for A101...");
      const acceptRes = await acceptMatch(matchData.match_id);
      await waitStep(1400);

      // Step 7: Progress Calculation
      setGoldenStep(7);
      setActiveTab('progress');
      await loadAllData();
      showToast("Step 7: Progress updated: 6,800 + 1,200 = 8,000 m³ (80% vs 85% planned)");
      await waitStep(2200);

      // Step 8: Return to Dashboard
      setGoldenStep(8);
      setActiveTab('dashboard');
      await loadAllData();
      showToast("Step 8: Dashboard reflects updated overall progress & -5% variance on A101");
      await waitStep(2000);

      // Step 9: Open Evidence Traceability
      setGoldenStep(9);
      const evidenceData = await fetchEvidenceList();
      const topEvidence = evidenceData.find(e => e.file_name?.includes("0409")) || evidenceData[0];
      if (topEvidence) {
        setViewingEvidence(topEvidence);
      }
      showToast("Step 9: Opened original certified evidence behind the progress number!");
    } catch (err) {
      console.error("Auto demo error:", err);
      showToast("Golden demo step error: " + err.message);
    } finally {
      setIsAutoRunning(false);
      setIsPaused(false);
      isPausedRef.current = false;
    }
  };

  const delayedCount = dashboardData?.metrics?.delayedActivitiesCount ?? 7;
  const evidenceCount = dashboardData?.metrics?.evidenceRecordsCount ?? 142;
  const scheduleCount = activities.length || 125;
  const variance = dashboardData?.metrics?.scheduleVariance ?? -9;

  return (
    <div className="min-h-screen bg-[#F5F7F9] text-[#17212B] flex flex-col font-sans selection:bg-[#087F8C] selection:text-white">
      {/* 1. TOP HEADER */}
      <Header
        id="app-header"
        projectName={dashboardData?.project?.name}
        variance={variance}
        onResetDemo={handleResetDemo}
        onRunAutoDemo={handleRunAutoDemo}
        isAutoRunning={isAutoRunning}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSelectedActivityCode(null);
        }}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onLanguageChanged={(code, nativeName) => showToast(`Interface language switched to ${nativeName} (${code.toUpperCase()})`)}
      />

      <div className="flex-1 flex">
        {/* 2. PERSISTENT SIDEBAR */}
        <Sidebar
          id="app-sidebar"
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setSelectedActivityCode(null);
          }}
          delayedCount={delayedCount}
          evidenceCount={evidenceCount}
          scheduleCount={scheduleCount}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* 3. MAIN WORKSPACE */}
        <main className="flex-1 lg:pl-60 min-w-0 flex flex-col justify-between">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-5">
            {/* Interactive Golden Demo 9-Step Guide Banner - only displayed when Run Demo is clicked */}
            {showGoldenDemo && (
              <GoldenDemoWalkthrough
                id="app-golden-walkthrough"
                currentStep={goldenStep}
                onStepClick={(stepNum) => {
                  setGoldenStep(stepNum);
                  if (stepNum === 1 || stepNum === 8) setActiveTab('dashboard');
                  else if (stepNum === 2) setActiveTab('execution');
                  else if (stepNum === 3) setActiveTab('ai-analysis');
                  else if (stepNum === 4 || stepNum === 5 || stepNum === 6) setActiveTab('matching');
                  else if (stepNum === 7) setActiveTab('progress');
                  else if (stepNum === 9) setActiveTab('traceability');
                }}
                onRunAutoDemo={handleRunAutoDemo}
                isAutoRunning={isAutoRunning}
                isPaused={isPaused}
                onPauseDemo={handlePauseDemo}
                onSkipDemo={handleSkipDemo}
                onResetDemo={handleResetDemo}
                onClose={() => setShowGoldenDemo(false)}
              />
            )}

            {/* Active View Routing */}
            {activeTab === 'dashboard' && (
              <DashboardPage
                id="page-dashboard"
                dashboardData={dashboardData}
                goldenStep={goldenStep}
                onSelectActivity={handleSelectActivity}
                onSelectTab={(tab) => setActiveTab(tab)}
                onOpenCapture={() => {
                  setActiveTab('execution');
                  setGoldenStep(2);
                }}
                onOpenEvidence={(evi) => setViewingEvidence(evi)}
              />
            )}

            {activeTab === 'schedule' && (
              <SchedulePage
                id="page-schedule"
                onScheduleUpdated={loadAllData}
                onSelectActivity={handleSelectActivity}
              />
            )}

            {activeTab === 'multilingual-intelligence' && (
              <MultilingualIntelligencePage
                id="page-multilingual-intelligence"
                onSelectActivity={handleSelectActivity}
                onOpenEvidence={(evi) => setViewingEvidence(evi)}
                onSelectTab={(tab) => setActiveTab(tab)}
                onProgressUpdated={loadAllData}
              />
            )}

            {activeTab === 'execution' && (
              <ExecutionPage
                id="page-execution"
                latestExtraction={latestExtraction}
                latestExecutionRecord={latestExecutionRecord}
                recentCaptures={dashboardData?.recentEvidence || []}
                onUploadSuccess={handleUploadSuccess}
                onProceedToMatching={handleProceedToMatching}
                onOpenEvidence={(evi) => setViewingEvidence(evi)}
                isMatching={isMatching}
              />
            )}

            {activeTab === 'ai-analysis' && (
              <AiAnalysisPage
                id="page-ai-analysis"
                latestExtraction={latestExtraction}
                latestExecutionRecord={latestExecutionRecord}
                onProceedToMatching={handleProceedToMatching}
                isMatching={isMatching}
              />
            )}

            {activeTab === 'matching' && (
              <MatchingPage
                id="page-matching"
                matchingResults={matchingResults}
                allActivities={activities}
                onAcceptMatch={handleAcceptMatch}
                onChangeActivity={handleChangeActivity}
                isAccepting={isAccepting}
                onRerunMatching={async () => {
                  if (latestExecutionRecord) {
                    const updated = await runMatching(latestExecutionRecord.id, null);
                    setMatchingResults(updated);
                  } else {
                    const uploadRes = await uploadExecutionEvidence(
                      "Today, 1,200 cubic metres of earthwork excavation was completed in Zone A from Chainage 10+200 to 10+800. Certified by Resident Engineer Rajesh Sharma on 04 Sep 2026.",
                      "Daily Site Report"
                    );
                    setLatestExtraction(uploadRes.extraction);
                    setLatestExecutionRecord(uploadRes.execution_record);
                    const updated = await runMatching(uploadRes.execution_record.id, null);
                    setMatchingResults(updated);
                  }
                }}
              />
            )}

            {activeTab === 'progress' && (
              <ProgressPage
                id="page-progress"
                progressData={progressData}
                onSelectActivity={handleSelectActivity}
                onOpenEvidence={(evi) => setViewingEvidence(evi)}
              />
            )}

            {activeTab === 'delays' && (
              <DelaysPage
                id="page-delays"
                activities={activities}
                onSelectActivity={handleSelectActivity}
              />
            )}

            {activeTab === 'traceability' && (
              <TraceabilityPage
                id="page-traceability"
                evidenceList={evidenceList}
                onOpenEvidence={(evi) => setViewingEvidence(evi)}
              />
            )}

            {activeTab === 'activity-detail' && (
              <ActivityDetail
                id="page-activity-detail"
                activity={activityDetailData}
                onBack={() => setActiveTab('dashboard')}
                onOpenEvidence={(evi) => setViewingEvidence(evi)}
                onOpenMatch={() => setActiveTab('matching')}
                onOpenHistory={() => setActiveTab('progress')}
                onOpenTraceability={() => setActiveTab('traceability')}
              />
            )}
          </div>

          {/* Footer Bar */}
          <footer className="border-t border-[#D8E1E8] bg-white py-3.5 px-6 text-center text-xs text-[#617386] font-mono">
            <span>SITE CLARITY • AI-Powered Infrastructure Progress Intelligence • Plan, Capture, Understand, Match, Measure, Verify</span>
          </footer>
        </main>
      </div>

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          setSelectedActivityCode(null);
        }}
        onSelectActivity={handleSelectActivity}
        onRunDemo={handleRunAutoDemo}
        onResetDemo={handleResetDemo}
        activities={activities}
        evidenceList={evidenceList}
      />

      {/* Evidence Viewer Slide-Over / Modal */}
      {viewingEvidence && (
        <EvidenceViewer
          id="modal-evidence-viewer"
          evidence={viewingEvidence}
          onClose={() => setViewingEvidence(null)}
        />
      )}

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#16324F] border border-[#087F8C] text-white text-xs px-4 py-3 rounded-md shadow-lg flex items-center space-x-2 animate-in slide-in-from-bottom-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-[#087F8C] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
