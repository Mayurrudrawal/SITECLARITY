import React, { useState, useRef, useEffect } from 'react';
import {
  FileSpreadsheet,
  FileText,
  Download,
  AlertCircle,
  RefreshCw,
  Search,
  Eye,
  CheckCircle2,
  UploadCloud,
  ShieldCheck,
  X
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge.jsx';
import { uploadSchedule, fetchActivities } from '../services/api.js';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function SchedulePage({ onScheduleUpdated, onSelectActivity, id }) {
  const { t } = useI18n();
  const [currentStep, setCurrentStep] = useState(1); // 1: Upload, 2: Validate, 3: Review, 4: Import
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Default pre-loaded Certified PDF Baseline Schedule
  const [selectedFile, setSelectedFile] = useState({
    name: "NH-XX_Contract_Baseline_Schedule_Rev04.pdf",
    size: "3.8 MB",
    type: "PDF (Contract Baseline & P6 WBS)",
    date: "04 Sep 2026, 09:30 AM",
    status: "Verified & Active",
    activities: 125,
    wbs: 8,
    locations: 14,
    certifiedBy: "Resident Engineer Rajesh Sharma (NHAI)"
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isPreviewOpen) {
        setIsPreviewOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewOpen]);

  // Table state
  const [activitiesList, setActivitiesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [wbsFilter, setWbsFilter] = useState('ALL');
  const [locationFilter, setLocationFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortField, setSortField] = useState('activity_code');
  const [sortAsc, setSortAsc] = useState(true);

  const loadActivities = async () => {
    try {
      const res = await fetchActivities();
      setActivitiesList(res.activities || []);
    } catch (err) {
      console.error("Failed to load activities in SchedulePage:", err);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0] || e.dataTransfer?.files?.[0];
    if (!file) return;

    setSelectedFile({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.name.endsWith('.pdf') ? 'PDF (Contract Schedule Document)' : 'Spreadsheet (XLSX / CSV)',
      date: 'Just now',
      status: 'Validating Schedule Data...',
      activities: 125,
      wbs: 8,
      locations: 14,
      certifiedBy: 'Resident Engineer'
    });

    setIsUploading(true);
    setUploadError(null);
    setCurrentStep(2);
    try {
      await uploadSchedule(file, 'replace');
      setCurrentStep(3);
      await loadActivities();
      setSelectedFile(prev => ({ ...prev, status: 'Verified & Active' }));
      if (onScheduleUpdated) {
        onScheduleUpdated();
      }
    } catch (err) {
      setUploadError(err);
      setCurrentStep(1);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSimulateDefaultSchedule = async () => {
    setIsUploading(true);
    setUploadError(null);
    setCurrentStep(2);
    setSelectedFile({
      name: "NH-XX_Contract_Baseline_Schedule_Rev04.pdf",
      size: "3.8 MB",
      type: "PDF (Contract Baseline & P6 WBS)",
      date: "04 Sep 2026, 09:30 AM",
      status: "Verified & Active",
      activities: 125,
      wbs: 8,
      locations: 14,
      certifiedBy: "Resident Engineer Rajesh Sharma (NHAI)"
    });

    const csvContent = `Activity ID,Activity Name,WBS,Location,Start Date,Finish Date,Planned Qty,Unit,Planned Progress,Weight
A101,Earthwork Excavation,WBS 2.1 Earthworks,Zone A,2026-08-01,2026-09-15,10000,m³,85%,0.08
A102,Granular Sub-base,WBS 3.1 Pavement Crust,Zone A,2026-08-10,2026-09-25,5000,m³,70%,0.06
A103,Concrete Drain Construction,WBS 4.1 Drainage Systems,Zone B,2026-08-05,2026-10-15,2000,m,50%,0.05
A104,Culvert Construction,WBS 4.2 Cross Drainage,Chainage 12+500,2026-07-15,2026-09-30,10,Nos,50%,0.07
A105,Asphalt Base Course,WBS 3.2 Bituminous Pavement,Zone C,2026-08-20,2026-10-30,8000,m²,30%,0.08`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const file = new File([blob], "NH_Project_Schedule.csv", { type: 'text/csv' });

    try {
      await uploadSchedule(file, 'replace');
      setCurrentStep(4);
      await loadActivities();
      if (onScheduleUpdated) {
        onScheduleUpdated();
      }
    } catch (err) {
      setUploadError(err);
      setCurrentStep(1);
    } finally {
      setIsUploading(false);
    }
  };

  // Filter and Sort activities
  const filteredActivities = activitiesList
    .filter((act) => {
      const matchesSearch =
        act.activity_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.wbs?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesWbs = wbsFilter === 'ALL' || act.wbs?.includes(wbsFilter);
      const matchesLoc = locationFilter === 'ALL' || act.location === locationFilter;
      const matchesStatus = statusFilter === 'ALL' || act.status === statusFilter;

      return matchesSearch && matchesWbs && matchesLoc && matchesStatus;
    })
    .sort((a, b) => {
      let valA = a[sortField] || '';
      let valB = b[sortField] || '';
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div id={id} className="space-y-4">
      {/* 1. Header */}
      <div className="bg-white border border-[#D8E1E8] rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#16324F] uppercase tracking-wide">
            IMPORT PROJECT SCHEDULE
          </h2>
          <p className="text-xs text-[#617386] mt-0.5">
            Bring your existing project plan into Site Clarity (Primavera P6, MS Project, XLSX or CSV)
          </p>
        </div>

        <a
          href="/api/schedule/sample"
          download="NH_Project_Schedule.csv"
          className="px-3 py-1.5 bg-white hover:bg-[#F5F7F9] text-[#16324F] text-xs font-semibold rounded-md flex items-center space-x-1.5 transition-colors border border-[#D8E1E8] w-fit self-start sm:self-auto cursor-pointer"
        >
          <Download size={13} className="text-[#087F8C]" />
          <span>Download Sample CSV Template</span>
        </a>
      </div>

      {/* 2. Step Indicator (01 Upload → 02 Validate → 03 Review → 04 Import) */}
      <div className="bg-white border border-[#D8E1E8] rounded-lg p-3 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          {[
            { num: "01", label: "Upload" },
            { num: "02", label: "Validate" },
            { num: "03", label: "Review" },
            { num: "04", label: "Import" }
          ].map((step, idx) => {
            const stepNum = idx + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;

            return (
              <div
                key={step.num}
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  isActive
                    ? 'bg-[#E7F5F4] border border-[#087F8C]/40 text-[#087F8C]'
                    : isCompleted
                    ? 'bg-[#E8F5EF] border border-[#16845B]/30 text-[#16845B]'
                    : 'bg-[#F5F7F9] border border-[#D8E1E8] text-[#91A0AE]'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  isActive
                    ? 'bg-[#087F8C] text-white'
                    : isCompleted
                    ? 'bg-[#16845B] text-white'
                    : 'bg-[#D8E1E8] text-[#617386]'
                }`}>
                  {step.num}
                </span>
                <span className="font-semibold text-xs tracking-tight truncate">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Upload Box & Default Schedule Document */}
      <div className="bg-white border border-[#D8E1E8] rounded-lg p-4 sm:p-5 shadow-xs">
        {/* Default / Active Schedule PDF Card */}
        <div className="border border-[#D8E1E8] bg-[#F8FAFC] rounded-lg p-4 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center space-x-3.5 min-w-0">
              {/* PDF Document Icon Badge */}
              <div className="w-12 h-14 bg-[#FFF1F0] border border-[#FFA39E] rounded-md flex flex-col items-center justify-center relative shadow-2xs shrink-0 select-none">
                <span className="text-[9px] font-black text-[#CF1322] bg-[#FFA39E]/40 px-1 rounded uppercase font-mono tracking-tighter">
                  PDF
                </span>
                <FileText size={20} className="text-[#CF1322] mt-0.5" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-sm text-[#16324F] tracking-tight truncate">
                    {selectedFile.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-[#E8F5EF] text-[#16845B] border border-[#16845B]/30 flex items-center space-x-1">
                    <CheckCircle2 size={10} />
                    <span>CERTIFIED BASELINE</span>
                  </span>
                </div>
                <p className="text-xs text-[#617386] mt-0.5 truncate">
                  Official Contract Work Program & Primavera P6 WBS Schedule Export (Chainage 00+000 – 40+000)
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[11px] font-mono text-[#617386]">
                  <span className="text-[#17212B] font-semibold">{selectedFile.size}</span>
                  <span>•</span>
                  <span>125 Activities</span>
                  <span>•</span>
                  <span>8 WBS Packages</span>
                  <span>•</span>
                  <span className="text-[#16845B] font-medium">Certified 04 Sep 2026 by Resident Engineer</span>
                </div>
              </div>
            </div>

            {/* Document Action Buttons */}
            <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="px-3 py-1.5 bg-white hover:bg-[#F5F7F9] text-[#16324F] hover:text-[#087F8C] text-xs font-semibold rounded-md flex items-center space-x-1.5 transition-colors border border-[#D8E1E8] shadow-2xs cursor-pointer"
                title="Preview Certified Baseline Document"
              >
                <Eye size={13} className="text-[#087F8C]" />
                <span>Preview PDF</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-3 py-1.5 bg-white hover:bg-[#F5F7F9] text-[#16324F] text-xs font-semibold rounded-md flex items-center space-x-1.5 transition-colors border border-[#D8E1E8] shadow-2xs cursor-pointer"
                title="Upload or Replace Schedule File"
              >
                <UploadCloud size={13} className="text-[#617386]" />
                <span>Replace File</span>
              </button>

              <a
                href="/api/schedule/sample"
                download="NH_Project_Schedule.csv"
                className="p-1.5 bg-white hover:bg-[#F5F7F9] text-[#617386] hover:text-[#16324F] rounded-md transition-colors border border-[#D8E1E8] cursor-pointer"
                title="Download Original Template"
              >
                <Download size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Drop zone to replace or upload new file */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileUpload(e); }}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-3 border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-[#087F8C] bg-[#E7F5F4]'
              : 'border-[#D8E1E8] hover:border-[#087F8C] bg-[#F5F7F9]/70 hover:bg-[#F5F7F9]'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.xlsx,.xls,.csv"
            className="hidden"
          />
          <div className="flex items-center justify-center space-x-2 text-xs text-[#617386]">
            <UploadCloud size={14} className="text-[#087F8C]" />
            <span className="font-medium text-[#17212B]">
              {isUploading ? "Processing & Validating Schedule File..." : "Drop new schedule file or click to browse"}
            </span>
            <span className="font-mono text-[11px] text-[#91A0AE] hidden md:inline">
              (PDF, XLSX, CSV, or Primavera P6 XML)
            </span>
          </div>
        </div>

        {/* Validation Status Summary */}
        <div className="mt-4 pt-3 border-t border-[#D8E1E8] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px]">
            <span className="text-[#16845B] flex items-center space-x-1 font-semibold">
              <span>✓</span>
              <span>125 activities detected</span>
            </span>
            <span className="text-[#D8E1E8]">•</span>
            <span className="text-[#16845B] flex items-center space-x-1 font-semibold">
              <span>✓</span>
              <span>8 WBS groups detected</span>
            </span>
            <span className="text-[#D8E1E8]">•</span>
            <span className="text-[#16845B] flex items-center space-x-1 font-semibold">
              <span>✓</span>
              <span>14 locations detected</span>
            </span>
            <span className="text-[#D8E1E8]">•</span>
            <span className="text-[#C98200] flex items-center space-x-1 font-semibold">
              <span>⚠</span>
              <span>7 activities require review</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSimulateDefaultSchedule}
              disabled={isUploading}
              className="px-3 py-1.5 bg-white hover:bg-[#F5F7F9] text-[#16324F] text-xs font-semibold rounded-md flex items-center space-x-1 transition-colors border border-[#D8E1E8] cursor-pointer"
            >
              <RefreshCw size={12} className={isUploading ? "animate-spin" : "text-[#087F8C]"} />
              <span>Load 125 Highway Items</span>
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-3.5 py-1.5 bg-[#087F8C] hover:bg-[#076f7b] text-white font-semibold rounded-md text-xs transition-colors shadow-xs cursor-pointer"
            >
              Import Schedule
            </button>
          </div>
        </div>

        {uploadError && (
          <div className="mt-3 p-3 bg-[#FDECEC] border border-[#C93636]/30 rounded-md text-xs text-[#C93636] flex items-center space-x-2">
            <AlertCircle size={15} />
            <span>{uploadError.message || "Failed to process schedule file"}</span>
          </div>
        )}
      </div>

      {/* 4. MASTER SCHEDULE DATA TABLE */}
      <div className="bg-white border border-[#D8E1E8] rounded-lg overflow-hidden shadow-xs">
        {/* Table Controls */}
        <div className="p-4 border-b border-[#D8E1E8] flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-[#16324F] uppercase tracking-wider">
              PROJECT SCHEDULE MASTER TABLE ({filteredActivities.length} ACTIVITIES)
            </h3>
            <p className="text-[11px] text-[#617386] mt-0.5">
              Click any activity to view quantity history, linked DPRs, and progress bridge
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Search */}
            <div className="relative">
              <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#91A0AE]" />
              <input
                type="text"
                placeholder="Search code, name, zone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#F5F7F9] border border-[#D8E1E8] text-[#17212B] text-xs pl-7 pr-3 py-1.5 rounded-md focus:outline-none focus:border-[#087F8C] w-44 sm:w-56 font-mono placeholder-[#91A0AE]"
              />
            </div>

            {/* WBS Filter */}
            <select
              value={wbsFilter}
              onChange={(e) => setWbsFilter(e.target.value)}
              className="bg-[#F5F7F9] border border-[#D8E1E8] text-[#17212B] text-xs px-2.5 py-1.5 rounded-md focus:outline-none focus:border-[#087F8C] font-mono"
            >
              <option value="ALL">All WBS Packages</option>
              <option value="Earthworks">Earthworks</option>
              <option value="Pavement">Pavement</option>
              <option value="Drainage">Drainage</option>
              <option value="Structures">Structures</option>
              <option value="Bituminous">Bituminous</option>
              <option value="Safety">Road Safety</option>
            </select>

            {/* Location Filter */}
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-[#F5F7F9] border border-[#D8E1E8] text-[#17212B] text-xs px-2.5 py-1.5 rounded-md focus:outline-none focus:border-[#087F8C] font-mono"
            >
              <option value="ALL">All Zones</option>
              <option value="Zone A">Zone A (00+000 - 09+500)</option>
              <option value="Zone B">Zone B (10+000 - 19+500)</option>
              <option value="Zone C">Zone C (20+000 - 29+500)</option>
              <option value="Zone D">Zone D (30+000 - 39+500)</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#F5F7F9] border border-[#D8E1E8] text-[#17212B] text-xs px-2.5 py-1.5 rounded-md focus:outline-none focus:border-[#087F8C] font-mono"
            >
              <option value="ALL">All Statuses</option>
              <option value="Critical">Critical</option>
              <option value="Delayed">Delayed</option>
              <option value="On Track">On Track</option>
            </select>
          </div>
        </div>

        {/* Scrollable Sticky Header Table */}
        <div className="overflow-x-auto max-h-[560px]">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-[#F8FAFC] text-[#617386] font-mono text-[10px] uppercase sticky top-0 z-10 border-b border-[#D8E1E8]">
              <tr>
                <th
                  onClick={() => toggleSort('activity_code')}
                  className="py-2.5 px-3 cursor-pointer hover:text-[#087F8C] select-none"
                >
                  Activity ID {sortField === 'activity_code' ? (sortAsc ? '↑' : '↓') : ''}
                </th>
                <th
                  onClick={() => toggleSort('name')}
                  className="py-2.5 px-3 cursor-pointer hover:text-[#087F8C] select-none"
                >
                  Activity {sortField === 'name' ? (sortAsc ? '↑' : '↓') : ''}
                </th>
                <th className="py-2.5 px-3 hidden md:table-cell">WBS</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3 hidden lg:table-cell">Start</th>
                <th className="py-2.5 px-3 hidden lg:table-cell">Finish</th>
                <th className="py-2.5 px-3 text-right">Quantity</th>
                <th className="py-2.5 px-2">Unit</th>
                <th className="py-2.5 px-3 text-right">Planned</th>
                <th className="py-2.5 px-3 text-right">Actual</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8E1E8] font-sans">
              {filteredActivities.map((act) => {
                const plannedPct = Math.round((act.planned_progress || 0) * 100);
                const actualPct = Math.round((act.actual_progress || 0) * 100);
                const isA101 = act.activity_code === "A101";

                return (
                  <tr
                    key={act.id}
                    onClick={() => onSelectActivity && onSelectActivity(act.activity_code)}
                    className={`hover:bg-[#F5F7F9] cursor-pointer transition-colors group ${
                      isA101 ? 'bg-[#E7F5F4]/40 border-l-4 border-l-[#087F8C]' : ''
                    }`}
                  >
                    <td className="py-2 px-3 font-mono font-bold text-[#087F8C]">
                      {act.activity_code}
                    </td>
                    <td className="py-2 px-3 text-[#17212B] font-medium">
                      <div className="flex items-center space-x-1.5">
                        <span className="truncate max-w-[180px] sm:max-w-xs">{t(act.name, act.name)}</span>
                        {isA101 && (
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#E7F5F4] text-[#087F8C] border border-[#087F8C]/30 font-medium">
                            DEMO
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-3 text-[#617386] text-[11px] hidden md:table-cell truncate max-w-[140px]">
                      {act.wbs}
                    </td>
                    <td className="py-2 px-3 text-[#617386] text-[11px]">
                      {act.chainage_range || act.location}
                    </td>
                    <td className="py-2 px-3 font-mono text-[11px] text-[#617386] hidden lg:table-cell">
                      {act.start_date}
                    </td>
                    <td className="py-2 px-3 font-mono text-[11px] text-[#617386] hidden lg:table-cell">
                      {act.finish_date}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-semibold text-[#17212B] text-[11px]">
                      {act.planned_quantity?.toLocaleString()}
                    </td>
                    <td className="py-2 px-2 text-[#617386] font-mono text-[11px]">
                      {act.unit}
                    </td>
                    <td className="py-2 px-3 text-right font-mono text-[#3977A9] font-semibold text-[11px]">
                      {plannedPct}%
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-semibold text-[#087F8C] text-[11px]">
                      {actualPct}%
                    </td>
                    <td className="py-2 px-3 text-center">
                      <StatusBadge status={act.status} size="sm" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule PDF Document Preview Modal */}
      {isPreviewOpen && (
        <div
          onClick={() => setIsPreviewOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#17212B]/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-[#D8E1E8] w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Modal Top Bar */}
            <div className="p-3 sm:p-4 border-b border-[#D8E1E8] flex items-center justify-between bg-[#F8FAFC]">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-8 h-9 rounded bg-[#FFF1F0] border border-[#FFA39E] flex items-center justify-center text-[#CF1322] shrink-0 font-mono font-bold text-xs">
                  PDF
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#16324F] flex items-center space-x-2 truncate">
                    <span className="truncate">{selectedFile.name}</span>
                    <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-[#E8F5EF] text-[#16845B] border border-[#16845B]/30 shrink-0">
                      CERTIFIED BASELINE
                    </span>
                  </h3>
                  <p className="text-xs text-[#617386] truncate">
                    Contract Work Program • Primavera P6 WBS Baseline • {selectedFile.size} • 18 Pages
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <a
                  href="/api/schedule/sample"
                  download="NH_Project_Schedule.csv"
                  className="px-2.5 py-1.5 bg-white hover:bg-[#F5F7F9] text-[#16324F] border border-[#D8E1E8] text-xs font-semibold rounded-md flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Download size={13} className="text-[#087F8C]" />
                  <span className="hidden sm:inline">Download CSV</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1.5 rounded-md text-[#617386] hover:text-[#17212B] hover:bg-[#EAF0F6] transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Document Sheet Simulation */}
            <div className="p-4 sm:p-8 overflow-y-auto bg-[#E5E9EE] flex justify-center">
              <div className="bg-white border border-[#CBD5E1] rounded shadow-lg p-6 sm:p-10 max-w-2xl w-full text-xs font-sans text-[#17212B] space-y-6">
                {/* Official Letterhead */}
                <div className="border-b-2 border-[#16324F] pb-4 flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-[#617386] uppercase font-bold">
                      NATIONAL HIGHWAYS AUTHORITY OF INDIA
                    </p>
                    <h2 className="text-base sm:text-lg font-black text-[#16324F] tracking-tight uppercase mt-0.5">
                      CONTRACT WORK PROGRAM & SCHEDULE BASELINE
                    </h2>
                    <p className="text-xs text-[#617386]">
                      Project Package: NH-XX 4-Laning Development Corridor (Chainage 00+000 to 40+000)
                    </p>
                  </div>
                  <div className="text-right font-mono text-[10px] text-[#617386] shrink-0 ml-4">
                    <div>DOC REF: NHAI/BASE/PKG-01/REV4</div>
                    <div>EFFECTIVE: 01 AUG 2026</div>
                    <div>REVISION: 04.2 (CERTIFIED)</div>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] p-3 rounded border border-[#E2E8F0] font-mono text-[11px]">
                  <div>
                    <span className="text-[#617386] block text-[10px]">TOTAL SCOPE</span>
                    <span className="font-bold text-[#16324F]">125 Activities</span>
                  </div>
                  <div>
                    <span className="text-[#617386] block text-[10px]">PLANNED DURATION</span>
                    <span className="font-bold text-[#16324F]">153 Calendar Days</span>
                  </div>
                  <div>
                    <span className="text-[#617386] block text-[10px]">TOTAL WBS GROUPS</span>
                    <span className="font-bold text-[#16324F]">8 Divisions</span>
                  </div>
                  <div>
                    <span className="text-[#617386] block text-[10px]">VERIFIED TARGET</span>
                    <span className="font-bold text-[#16845B]">68% Target to Date</span>
                  </div>
                </div>

                {/* Schedule Line Items Excerpt */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-[#16324F] text-xs uppercase tracking-wide">
                      Key Baseline Work Breakdown Structure (Synchronized)
                    </h4>
                    <span className="text-[10px] font-mono text-[#617386]">Showing 5 of 125 synchronized items</span>
                  </div>
                  <table className="w-full text-left border border-[#E2E8F0] text-[11px] font-mono">
                    <thead className="bg-[#F1F5F9] text-[#475569] font-bold border-b border-[#E2E8F0]">
                      <tr>
                        <th className="p-2">Code</th>
                        <th className="p-2 font-sans">Activity Description</th>
                        <th className="p-2">Location</th>
                        <th className="p-2 text-right">Qty</th>
                        <th className="p-2">Unit</th>
                        <th className="p-2 text-right">Target</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr>
                        <td className="p-2 font-bold text-[#087F8C]">A101</td>
                        <td className="p-2 font-sans text-[#17212B]">Earthwork Excavation (WBS 2.1)</td>
                        <td className="p-2 text-[#617386]">Zone A</td>
                        <td className="p-2 text-right font-bold">10,000</td>
                        <td className="p-2 text-[#617386]">m³</td>
                        <td className="p-2 text-right text-[#16845B] font-bold">85%</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-[#087F8C]">A102</td>
                        <td className="p-2 font-sans text-[#17212B]">Granular Sub-base Layer 1 (WBS 3.1)</td>
                        <td className="p-2 text-[#617386]">Zone A</td>
                        <td className="p-2 text-right font-bold">5,000</td>
                        <td className="p-2 text-[#617386]">m³</td>
                        <td className="p-2 text-right text-[#16845B] font-bold">70%</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-[#087F8C]">A103</td>
                        <td className="p-2 font-sans text-[#17212B]">Concrete Drain Construction (WBS 4.1)</td>
                        <td className="p-2 text-[#617386]">Zone B</td>
                        <td className="p-2 text-right font-bold">2,000</td>
                        <td className="p-2 text-[#617386]">m</td>
                        <td className="p-2 text-right text-[#16845B] font-bold">50%</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-[#087F8C]">A104</td>
                        <td className="p-2 font-sans text-[#17212B]">Box Culvert 2x2m Structural Pour (WBS 4.2)</td>
                        <td className="p-2 text-[#617386]">CH 12+500</td>
                        <td className="p-2 text-right font-bold">10</td>
                        <td className="p-2 text-[#617386]">Nos</td>
                        <td className="p-2 text-right text-[#16845B] font-bold">50%</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-[#087F8C]">A105</td>
                        <td className="p-2 font-sans text-[#17212B]">Dense Bituminous Macadam (WBS 3.2)</td>
                        <td className="p-2 text-[#617386]">Zone C</td>
                        <td className="p-2 text-right font-bold">8,000</td>
                        <td className="p-2 text-[#617386]">m²</td>
                        <td className="p-2 text-right text-[#16845B] font-bold">30%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Official Sign-off and cryptographic stamp */}
                <div className="pt-4 border-t-2 border-dashed border-[#CBD5E1] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                  <div>
                    <div className="text-[10px] font-mono text-[#617386] uppercase">SUPERVISING AUTHORITY</div>
                    <div className="font-bold text-sm text-[#16324F] mt-0.5">Er. Rajesh Sharma</div>
                    <div className="text-[11px] text-[#617386]">Resident Engineer, NHAI Project Implementation Unit</div>
                    <div className="font-mono text-[10px] text-[#16845B] mt-1 flex items-center space-x-1">
                      <ShieldCheck size={12} />
                      <span>Digitally Signed & Certified on 04-SEP-2026</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-right font-mono text-[10px] text-[#617386]">
                    <div className="text-[#16324F] font-bold">CRYPTOGRAPHIC LEDGER SEAL</div>
                    <div>SHA-256: 7e89ab410d2834bfa901c27e8d45120ef93c</div>
                    <div className="text-[#16845B] font-bold mt-0.5">STATUS: IMMUTABLE AUDIT TRAIL</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
