// Seed dataset with 80+ realistic highway activities across 7 WBS groups
export const INITIAL_PROJECT = {
  id: "proj-nh-xx",
  name: "NH-XX Highway Development",
  description: "Four-lane National Highway expansion (KM 0+000 to KM 45+000) including earthworks, GSB, asphalt paving, box/pipe culverts, concrete drainage, and road safety infrastructure.",
  location: "Section KM 0+000 to KM 45+000, Corridor North",
  start_date: "2026-03-01",
  end_date: "2027-06-30",
  created_at: "2026-03-01T00:00:00Z",
  updated_at: "2026-09-04T00:00:00Z"
};

export const INITIAL_ACTIVITIES = [
  // WBS 1.0: Project Mobilization & Site Clearance
  {
    id: "act-101",
    activity_code: "A101",
    name: "Earthwork Excavation",
    wbs: "WBS 2.1 Earthworks",
    location: "Zone A",
    start_date: "2026-08-01",
    finish_date: "2026-09-15",
    planned_quantity: 10000,
    unit: "m³",
    planned_progress: 0.85, // 85%
    weight: 0.08,
    actual_quantity: 6800, // 6,800 m³ initial -> golden demo adds 1,200 m³ to reach 8,000 m³ (80%)
    actual_progress: 0.68,
    chainage_range: "10+000 - 11+500",
    work_type: "Earthwork"
  },
  {
    id: "act-102",
    activity_code: "A102",
    name: "Granular Sub-base",
    wbs: "WBS 3.1 Pavement Crust",
    location: "Zone A",
    start_date: "2026-08-10",
    finish_date: "2026-09-25",
    planned_quantity: 5000,
    unit: "m³",
    planned_progress: 0.70, // 70%
    weight: 0.06,
    actual_quantity: 3250, // 65%
    actual_progress: 0.65,
    chainage_range: "08+500 - 10+000",
    work_type: "GSB"
  },
  {
    id: "act-103",
    activity_code: "A103",
    name: "Concrete Drain Construction",
    wbs: "WBS 4.1 Drainage Systems",
    location: "Zone B",
    start_date: "2026-08-05",
    finish_date: "2026-10-15",
    planned_quantity: 2000,
    unit: "m",
    planned_progress: 0.50, // 50%
    weight: 0.05,
    actual_quantity: 1000, // 50%
    actual_progress: 0.50,
    chainage_range: "14+000 - 16+000",
    work_type: "Drainage"
  },
  {
    id: "act-104",
    activity_code: "A104",
    name: "Culvert Construction",
    wbs: "WBS 4.2 Cross Drainage",
    location: "Chainage 12+500",
    start_date: "2026-07-15",
    finish_date: "2026-09-30",
    planned_quantity: 10,
    unit: "Nos",
    planned_progress: 0.50, // 50%
    weight: 0.07,
    actual_quantity: 4, // 40% (Only 4 of 10 planned culverts completed)
    actual_progress: 0.40,
    chainage_range: "12+500",
    work_type: "Structures"
  },
  {
    id: "act-105",
    activity_code: "A105",
    name: "Asphalt Base Course",
    wbs: "WBS 3.2 Bituminous Pavement",
    location: "Zone C",
    start_date: "2026-08-20",
    finish_date: "2026-10-30",
    planned_quantity: 8000,
    unit: "m²",
    planned_progress: 0.30, // 30%
    weight: 0.08,
    actual_quantity: 2560, // 32%
    actual_progress: 0.32,
    chainage_range: "20+000 - 22+500",
    work_type: "Asphalt"
  },

  // WBS 1.0 Preliminaries & Site Clearance
  {
    id: "act-106",
    activity_code: "A106",
    name: "Clearing and Grubbing",
    wbs: "WBS 1.1 Site Clearance",
    location: "Zone A",
    start_date: "2026-04-01",
    finish_date: "2026-05-15",
    planned_quantity: 45,
    unit: "Hectares",
    planned_progress: 1.0,
    weight: 0.02,
    actual_quantity: 45,
    actual_progress: 1.0,
    chainage_range: "00+000 - 15+000",
    work_type: "Site Prep"
  },
  {
    id: "act-107",
    activity_code: "A107",
    name: "Utility Relocation (Water & Telecom)",
    wbs: "WBS 1.2 Utilities",
    location: "Zone A & B",
    start_date: "2026-04-15",
    finish_date: "2026-06-30",
    planned_quantity: 18,
    unit: "km",
    planned_progress: 0.95,
    weight: 0.02,
    actual_quantity: 17.1,
    actual_progress: 0.95,
    chainage_range: "00+000 - 18+000",
    work_type: "Utilities"
  },
  {
    id: "act-108",
    activity_code: "A108",
    name: "High-Tension Power Line Shifting",
    wbs: "WBS 1.2 Utilities",
    location: "Zone B",
    start_date: "2026-05-01",
    finish_date: "2026-07-15",
    planned_quantity: 12,
    unit: "Nos",
    planned_progress: 1.0,
    weight: 0.02,
    actual_quantity: 12,
    actual_progress: 1.0,
    chainage_range: "16+200 - 24+000",
    work_type: "Utilities"
  },
  {
    id: "act-109",
    activity_code: "A109",
    name: "Traffic Diversion Road Construction",
    wbs: "WBS 1.3 Traffic Control",
    location: "Zone A",
    start_date: "2026-05-10",
    finish_date: "2026-06-20",
    planned_quantity: 6,
    unit: "km",
    planned_progress: 1.0,
    weight: 0.015,
    actual_quantity: 6,
    actual_progress: 1.0,
    chainage_range: "05+000 - 11+000",
    work_type: "Diversion"
  },

  // WBS 2.0 Earthworks & Embankment
  {
    id: "act-110",
    activity_code: "A110",
    name: "Embankment Construction with Soil",
    wbs: "WBS 2.1 Earthworks",
    location: "Zone B",
    start_date: "2026-06-01",
    finish_date: "2026-09-30",
    planned_quantity: 25000,
    unit: "m³",
    planned_progress: 0.75,
    weight: 0.04,
    actual_quantity: 17500,
    actual_progress: 0.70,
    chainage_range: "15+000 - 22+000",
    work_type: "Earthwork"
  },
  {
    id: "act-111",
    activity_code: "A111",
    name: "Subgrade Compaction (Top 500mm)",
    wbs: "WBS 2.2 Subgrade",
    location: "Zone A",
    start_date: "2026-07-01",
    finish_date: "2026-09-10",
    planned_quantity: 18000,
    unit: "m³",
    planned_progress: 0.80,
    weight: 0.03,
    actual_quantity: 13500,
    actual_progress: 0.75,
    chainage_range: "04+000 - 10+000",
    work_type: "Subgrade"
  },
  {
    id: "act-112",
    activity_code: "A112",
    name: "Hard Rock Blasting & Excavation",
    wbs: "WBS 2.1 Earthworks",
    location: "Zone C",
    start_date: "2026-06-15",
    finish_date: "2026-08-31",
    planned_quantity: 7500,
    unit: "m³",
    planned_progress: 0.90,
    weight: 0.025,
    actual_quantity: 6750,
    actual_progress: 0.90,
    chainage_range: "28+000 - 30+500",
    work_type: "Earthwork"
  },
  {
    id: "act-113",
    activity_code: "A113",
    name: "Earthwork Excavation for Drains",
    wbs: "WBS 2.1 Earthworks",
    location: "Zone C",
    start_date: "2026-08-01",
    finish_date: "2026-10-15",
    planned_quantity: 4200,
    unit: "m³",
    planned_progress: 0.40,
    weight: 0.02,
    actual_quantity: 1512,
    actual_progress: 0.36,
    chainage_range: "25+000 - 28+000",
    work_type: "Earthwork"
  },

  // WBS 3.0 Pavement & Bituminous Works
  {
    id: "act-114",
    activity_code: "A114",
    name: "Wet Mix Macadam (WMM Layer 1)",
    wbs: "WBS 3.1 Pavement Crust",
    location: "Zone A",
    start_date: "2026-08-15",
    finish_date: "2026-10-10",
    planned_quantity: 12000,
    unit: "m³",
    planned_progress: 0.55,
    weight: 0.035,
    actual_quantity: 6000,
    actual_progress: 0.50,
    chainage_range: "02+000 - 08+000",
    work_type: "WMM"
  },
  {
    id: "act-115",
    activity_code: "A115",
    name: "Wet Mix Macadam (WMM Layer 2)",
    wbs: "WBS 3.1 Pavement Crust",
    location: "Zone A",
    start_date: "2026-09-01",
    finish_date: "2026-10-25",
    planned_quantity: 12000,
    unit: "m³",
    planned_progress: 0.20,
    weight: 0.035,
    actual_quantity: 1800,
    actual_progress: 0.15,
    chainage_range: "02+000 - 06+000",
    work_type: "WMM"
  },
  {
    id: "act-116",
    activity_code: "A116",
    name: "Dense Bituminous Macadam (DBM)",
    wbs: "WBS 3.2 Bituminous Pavement",
    location: "Zone A",
    start_date: "2026-09-10",
    finish_date: "2026-11-20",
    planned_quantity: 6500,
    unit: "m³",
    planned_progress: 0.10,
    weight: 0.04,
    actual_quantity: 650,
    actual_progress: 0.10,
    chainage_range: "00+000 - 04+000",
    work_type: "Asphalt"
  },
  {
    id: "act-117",
    activity_code: "A117",
    name: "Bituminous Concrete (Wearing Course)",
    wbs: "WBS 3.2 Bituminous Pavement",
    location: "Zone A",
    start_date: "2026-10-01",
    finish_date: "2026-12-15",
    planned_quantity: 3500,
    unit: "m³",
    planned_progress: 0.0,
    weight: 0.035,
    actual_quantity: 0,
    actual_progress: 0.0,
    chainage_range: "00+000 - 04+000",
    work_type: "Asphalt"
  },

  // WBS 4.0 Structures & Bridges
  {
    id: "act-118",
    activity_code: "A118",
    name: "Minor Bridge Pile Foundations",
    wbs: "WBS 4.3 Bridges",
    location: "Chainage 18+400",
    start_date: "2026-05-15",
    finish_date: "2026-08-30",
    planned_quantity: 48,
    unit: "Nos",
    planned_progress: 1.0,
    weight: 0.03,
    actual_quantity: 48,
    actual_progress: 1.0,
    chainage_range: "18+400",
    work_type: "Structures"
  },
  {
    id: "act-119",
    activity_code: "A119",
    name: "Minor Bridge Pier & Pier Cap Concrete",
    wbs: "WBS 4.3 Bridges",
    location: "Chainage 18+400",
    start_date: "2026-07-01",
    finish_date: "2026-09-30",
    planned_quantity: 850,
    unit: "m³",
    planned_progress: 0.65,
    weight: 0.025,
    actual_quantity: 510,
    actual_progress: 0.60,
    chainage_range: "18+400",
    work_type: "Structures"
  },
  {
    id: "act-120",
    activity_code: "A120",
    name: "Prestressed Concrete Girder Launching",
    wbs: "WBS 4.3 Bridges",
    location: "Chainage 18+400",
    start_date: "2026-08-15",
    finish_date: "2026-10-31",
    planned_quantity: 16,
    unit: "Nos",
    planned_progress: 0.35,
    weight: 0.03,
    actual_quantity: 4,
    actual_progress: 0.25,
    chainage_range: "18+400",
    work_type: "Structures"
  },
  {
    id: "act-121",
    activity_code: "A121",
    name: "Reinforced Earth (RE) Wall Erection",
    wbs: "WBS 4.4 Retaining Structures",
    location: "Zone B Approach",
    start_date: "2026-07-20",
    finish_date: "2026-10-15",
    planned_quantity: 4200,
    unit: "m²",
    planned_progress: 0.60,
    weight: 0.025,
    actual_quantity: 2100,
    actual_progress: 0.50,
    chainage_range: "18+000 - 18+800",
    work_type: "Structures"
  },
  {
    id: "act-122",
    activity_code: "A122",
    name: "Box Culvert Construction 2x2m",
    wbs: "WBS 4.2 Cross Drainage",
    location: "Chainage 26+100",
    start_date: "2026-08-01",
    finish_date: "2026-09-20",
    planned_quantity: 4,
    unit: "Nos",
    planned_progress: 0.75,
    weight: 0.02,
    actual_quantity: 2,
    actual_progress: 0.50,
    chainage_range: "26+100",
    work_type: "Structures"
  },

  // WBS 5.0 Road Furniture & Safety
  {
    id: "act-123",
    activity_code: "A123",
    name: "Metal Beam Crash Barrier (Thrie Beam)",
    wbs: "WBS 5.1 Safety Barriers",
    location: "Zone A",
    start_date: "2026-09-01",
    finish_date: "2026-11-30",
    planned_quantity: 14000,
    unit: "m",
    planned_progress: 0.15,
    weight: 0.02,
    actual_quantity: 1400,
    actual_progress: 0.10,
    chainage_range: "00+000 - 14+000",
    work_type: "Safety"
  },
  {
    id: "act-124",
    activity_code: "A124",
    name: "Thermoplastic Lane Markings",
    wbs: "WBS 5.2 Markings & Signage",
    location: "Zone A",
    start_date: "2026-10-15",
    finish_date: "2026-12-31",
    planned_quantity: 22000,
    unit: "m²",
    planned_progress: 0.0,
    weight: 0.015,
    actual_quantity: 0,
    actual_progress: 0.0,
    chainage_range: "00+000 - 22+000",
    work_type: "Safety"
  },
  {
    id: "act-125",
    activity_code: "A125",
    name: "Overhead Cantilever Direction Signs",
    wbs: "WBS 5.2 Markings & Signage",
    location: "Zone A & B",
    start_date: "2026-11-01",
    finish_date: "2027-01-15",
    planned_quantity: 24,
    unit: "Nos",
    planned_progress: 0.0,
    weight: 0.015,
    actual_quantity: 0,
    actual_progress: 0.0,
    chainage_range: "05+000 - 25+000",
    work_type: "Signage"
  },

  // Additional realistic activities to achieve exactly 125 activities
  ...generateAdditionalActivities()
];

function generateAdditionalActivities() {
  const items = [];
  const zones = ["Zone A", "Zone B", "Zone C", "Zone D"];
  const activityTemplates = [
    { name: "Subgrade Soil Stabilization", unit: "m²", wbs: "WBS 2.2 Subgrade Works", work: "Earthwork", baseQty: 18000 },
    { name: "Granular Sub-base Layer 1", unit: "m³", wbs: "WBS 3.1 Pavement Crust", work: "GSB", baseQty: 9500 },
    { name: "Granular Sub-base Layer 2", unit: "m³", wbs: "WBS 3.1 Pavement Crust", work: "GSB", baseQty: 8200 },
    { name: "Wet Mix Macadam (WMM) Base", unit: "m³", wbs: "WBS 3.2 Macadam Base", work: "WMM", baseQty: 7400 },
    { name: "Dense Bituminous Macadam (DBM)", unit: "m²", wbs: "WBS 3.3 Bituminous Base", work: "DBM", baseQty: 14000 },
    { name: "Bituminous Concrete (BC) Wearing Course", unit: "m²", wbs: "WBS 3.4 Surface Course", work: "Asphalt", baseQty: 12500 },
    { name: "Prime Coat Emulsion Spray", unit: "m²", wbs: "WBS 3.5 Prime/Tack", work: "Bitumen", baseQty: 16000 },
    { name: "Tack Coat Bituminous Spray", unit: "m²", wbs: "WBS 3.5 Prime/Tack", work: "Bitumen", baseQty: 15000 },
    { name: "Lined Trapezoidal Drain", unit: "m", wbs: "WBS 4.1 Surface Drainage", work: "Drainage", baseQty: 4500 },
    { name: "Precast Concrete Kerb & Chute", unit: "m", wbs: "WBS 4.1 Surface Drainage", work: "Drainage", baseQty: 6000 },
    { name: "Reinforced Soil (RS) Wall Panels", unit: "m²", wbs: "WBS 4.3 Retaining Structures", work: "Structures", baseQty: 3200 },
    { name: "Pipe Culvert 1200mm Hume Pipe", unit: "Nos", wbs: "WBS 4.2 Cross Drainage", work: "Culverts", baseQty: 18 },
    { name: "Box Culvert 3x3m Precast Deck", unit: "Nos", wbs: "WBS 4.2 Cross Drainage", work: "Culverts", baseQty: 12 },
    { name: "Minor Bridge Pier Substructure", unit: "m³", wbs: "WBS 5.1 Bridges", work: "Structures", baseQty: 850 },
    { name: "Vehicular Underpass (VUP) Deck Slab", unit: "m³", wbs: "WBS 5.2 Underpasses", work: "Structures", baseQty: 640 },
    { name: "Pedestrian Underpass (PUP) Barrel", unit: "m³", wbs: "WBS 5.2 Underpasses", work: "Structures", baseQty: 420 },
    { name: "Metal Beam Crash Barrier W-Beam", unit: "m", wbs: "WBS 6.1 Road Safety", work: "Safety", baseQty: 5200 },
    { name: "Retroreflective Gantry Signs", unit: "Nos", wbs: "WBS 6.2 Signage", work: "Signage", baseQty: 16 },
    { name: "Thermoplastic Road Marking 2.5mm", unit: "m²", wbs: "WBS 6.3 Road Markings", work: "Marking", baseQty: 7800 },
    { name: "Solar Raised Pavement Markers (Cat Eyes)", unit: "Nos", wbs: "WBS 6.1 Road Safety", work: "Safety", baseQty: 1400 },
    { name: "High Mast Solar Illumination 15m", unit: "Nos", wbs: "WBS 6.4 Highway Lighting", work: "Electrical", baseQty: 28 },
    { name: "Slope Turfing with Vetiver Grass", unit: "m²", wbs: "WBS 7.1 Environmental", work: "Landscaping", baseQty: 11000 },
    { name: "Median Plantation & Drip Grid", unit: "m", wbs: "WBS 7.1 Environmental", work: "Landscaping", baseQty: 8500 },
    { name: "Acoustic Noise Barrier Panels", unit: "m", wbs: "WBS 7.2 Noise Abatement", work: "Environmental", baseQty: 1800 },
    { name: "Highway Patrol Emergency Call Box (ECB)", unit: "Nos", wbs: "WBS 6.5 Highway Telematics", work: "Telematics", baseQty: 22 }
  ];

  let codeNum = 126;
  // 25 templates * 4 zones = 100 activities. Plus 25 initial = exactly 125 activities!
  for (let i = 0; i < activityTemplates.length; i++) {
    const tmpl = activityTemplates[i];
    for (let z = 0; z < zones.length; z++) {
      const zone = zones[z];
      const baseQty = tmpl.baseQty + z * 350;
      const plannedProg = Math.max(0.15, Math.min(0.92, (0.78 - z * 0.12 + (i % 4) * 0.05))).toFixed(2);
      const actualProg = Math.max(0.08, Math.min(1.0, (parseFloat(plannedProg) - ((i % 5 === 2) ? 0.09 : (i % 5 === 4) ? 0.05 : -0.01)))).toFixed(2);
      const actualQty = Math.round(baseQty * parseFloat(actualProg));

      items.push({
        id: `act-${codeNum}`,
        activity_code: `A${codeNum}`,
        name: `${tmpl.name} (${zone})`,
        wbs: tmpl.wbs,
        location: zone,
        start_date: `2026-0${Math.min(9, 3 + (z % 4))}-01`,
        finish_date: `2026-1${Math.min(2, 0 + (i % 3))}-15`,
        planned_quantity: baseQty,
        unit: tmpl.unit,
        planned_progress: parseFloat(plannedProg),
        weight: 0.006,
        actual_quantity: actualQty,
        actual_progress: parseFloat(actualProg),
        chainage_range: `${(z * 10).toString().padStart(2, '0')}+000 - ${(z * 10 + 9).toString().padStart(2, '0')}+500`,
        work_type: tmpl.work
      });
      codeNum++;
    }
  }
  return items;
}

// Initial Evidence Records
export const INITIAL_EVIDENCE = [
  {
    id: "evi-001",
    project_id: "proj-nh-xx",
    execution_record_id: "exec-001",
    file_name: "Site_Report_0409.pdf",
    file_type: "application/pdf",
    file_path: "/uploads/Site_Report_0409.pdf",
    source_type: "Daily Site Report",
    uploaded_at: "2026-09-04T07:30:00Z",
    raw_content: "NH-XX Highway Development Daily Site Log\nDate: 04 Sep 2026\nShift: Morning & Afternoon\nContractor: L&T Civil Infrastructure Joint Venture\nLocation: Zone A (Corridor North)\nChainage: 10+200 to 10+800\nActivity: Earthwork Excavation in roadway cut and embankment foundation.\nEquipment Deployed: 4x CAT 320D Excavators, 12x 16-Tonne Tippers, 1x CAT 120M Motor Grader, 1x Hamm 311 Compactor.\nExecuted Quantity: 1,200 cubic metres (m3) excavated, hauled to designated borrow disposal area.\nWeather: Clear, 28°C, soil moisture optimal.\nCertified by: Site Resident Engineer - Rajesh Sharma",
    metadata: {
      surveyor: "Rajesh Sharma",
      equipment: "4x Excavator CAT 320, 12x Tippers",
      chainage_start: "10+200",
      chainage_end: "10+800",
      status: "Verified by Resident Engineer"
    }
  },
  {
    id: "evi-002",
    project_id: "proj-nh-xx",
    execution_record_id: "exec-prior-104",
    file_name: "Culvert_Inspection_Ch12_500.pdf",
    file_type: "application/pdf",
    file_path: "/uploads/Culvert_Inspection_Ch12_500.pdf",
    source_type: "Structural Inspection Log",
    uploaded_at: "2026-08-28T14:15:00Z",
    raw_content: "Weekly Structural Progress Inspection\nLocation: Chainage 12+500 (Culvert Crossing)\nPlanned Culverts: 10 Nos Box Culverts (3x3m)\nStatus: Only 4 completed to date. Culvert 5 & 6 delayed due to high water table and dewatering pump requisition delays.\nVariance: -10% critical schedule slippage.\nInspected by: Senior Structural Consultant Dr. V. Menon",
    metadata: {
      culverts_completed: 4,
      culverts_planned: 10,
      inspection_type: "Structural Safety & QA/QC"
    }
  },
  {
    id: "evi-003",
    project_id: "proj-nh-xx",
    execution_record_id: "exec-prior-102",
    file_name: "Drone_LiDAR_Survey_ZoneA.pdf",
    file_type: "application/pdf",
    file_path: "/uploads/Drone_LiDAR_Survey_ZoneA.pdf",
    source_type: "Drone Survey",
    uploaded_at: "2026-08-30T16:00:00Z",
    raw_content: "Aerial Photogrammetry & LiDAR Survey Report\nFlight Corridor: KM 08+500 to 10+000 Zone A\nActivity: Granular Sub-base (GSB) Layer 1 compaction\nCertified Quantity: 3,250 m³ verified through DTM surface difference analysis.\nCompaction density: 98.4% MDD confirmed by nuclear density gauge cross-check.",
    metadata: {
      pilot: "P. Nair",
      survey_type: "LiDAR DTM Differential",
      chainage_range: "08+500 - 10+000"
    }
  },
  {
    id: "evi-004",
    project_id: "proj-nh-xx",
    execution_record_id: "exec-prior-103",
    file_name: "Concrete_Cube_Test_M30_Ch14.pdf",
    file_type: "application/pdf",
    file_path: "/uploads/Concrete_Cube_Test_M30_Ch14.pdf",
    source_type: "Lab Test Certificate",
    uploaded_at: "2026-09-02T11:45:00Z",
    raw_content: "Compressive Strength Test Certificate - M30 Grade Concrete\nLocation: Chainage 14+000 to 16+000 (Concrete Drain Construction)\n28-Day Target: 30.0 N/mm²\nMean 28-Day Strength Achieved: 34.2 N/mm² (Accepted)\nCumulative Length Cast: 1,000 m certified.",
    metadata: {
      lab_technician: "Anil K. Verma",
      test_standard: "IS 516 / IRC:SP:112",
      status: "QA Approved"
    }
  },
  {
    id: "evi-005",
    project_id: "proj-nh-xx",
    execution_record_id: "exec-prior-105",
    file_name: "Bituminous_Laydown_Ticket_ZoneC.pdf",
    file_type: "application/pdf",
    file_path: "/uploads/Bituminous_Laydown_Ticket_ZoneC.pdf",
    source_type: "Material Delivery Ticket",
    uploaded_at: "2026-09-01T15:20:00Z",
    raw_content: "Hot Mix Asphalt Batch Plant Ticket & Sensor Paver Log\nLocation: Zone C KM 20+000 to 22+500\nActivity: Asphalt Base Course (Dense Bituminous Macadam)\nBitumen Grade: VG-40 modified\nQuantity Delivered & Paved: 2,560 m² (32% completed)\nTemperature at Laydown: 155°C (Within specification 140°C - 165°C)",
    metadata: {
      plant_operator: "S. Murugan",
      paver_type: "Vögele Super 1800-3",
      status: "Compliant"
    }
  }
];

export const INITIAL_ALERTS = [
  {
    id: "alt-001",
    project_id: "proj-nh-xx",
    activity_id: "act-104",
    activity_code: "A104",
    type: "Schedule Delay",
    severity: "Critical",
    message: "A104 Culvert Construction (Chainage 12+500) has -10% variance. Only 4 of 10 planned culverts completed due to dewatering delays.",
    status: "Active",
    created_at: "2026-09-02T10:00:00Z"
  },
  {
    id: "alt-002",
    project_id: "proj-nh-xx",
    activity_id: "act-101",
    activity_code: "A101",
    type: "Progress Variance",
    severity: "Delayed",
    message: "A101 Earthwork Excavation is at 80% actual progress vs 85% planned target (-5% variance).",
    status: "Active",
    created_at: "2026-09-04T08:00:00Z"
  },
  {
    id: "alt-003",
    project_id: "proj-nh-xx",
    activity_id: "act-102",
    activity_code: "A102",
    type: "Material Delay",
    severity: "Delayed",
    message: "A102 Granular Sub-base Zone A running 5% behind planned target. Quarry crushed aggregate delivery slower than cycle demand.",
    status: "Active",
    created_at: "2026-09-03T11:20:00Z"
  },
  {
    id: "alt-004",
    project_id: "proj-nh-xx",
    activity_id: "act-105",
    activity_code: "A105",
    type: "Weather Alert",
    severity: "Notice",
    message: "Zone C Bituminous Paving: Intermittent monsoon precipitation forecasted. Pre-monsoon prime coat curing monitored.",
    status: "Active",
    created_at: "2026-09-03T18:00:00Z"
  },
  {
    id: "alt-005",
    project_id: "proj-nh-xx",
    activity_id: "act-103",
    activity_code: "A103",
    type: "Quality Milestone",
    severity: "On Track",
    message: "A103 Concrete Drain Construction: 28-day cube strength tests passed at 34.2 MPa, exceeding 30 MPa requirement.",
    status: "Resolved",
    created_at: "2026-09-02T12:00:00Z"
  }
];
