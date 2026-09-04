import * as XLSX from 'xlsx';

export class ScheduleService {
  static parseFile(buffer, filename) {
    const isCsv = filename.toLowerCase().endsWith('.csv');
    const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true });
    const firstSheetName = workbook.SheetNames[0];
    if (!firstSheetName) {
      throw new Error("No sheet found in uploaded schedule file");
    }

    const worksheet = workbook.Sheets[firstSheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

    if (!rows || rows.length === 0) {
      throw new Error("Schedule file is empty. Please provide valid activity rows.");
    }

    const errors = [];
    const validActivities = [];
    const seenCodes = new Set();
    const wbsSet = new Set();
    const locationSet = new Set();

    // Map common header variations
    const normalizeKey = (obj, possibilities) => {
      for (const p of possibilities) {
        const found = Object.keys(obj).find(k => k.trim().toLowerCase() === p.toLowerCase());
        if (found && obj[found] !== undefined && obj[found] !== "") return obj[found];
      }
      return null;
    };

    rows.forEach((row, index) => {
      const rowNum = index + 2; // header is row 1
      const code = normalizeKey(row, ["Activity ID", "Activity Code", "ID", "Code", "ActivityID"]);
      const name = normalizeKey(row, ["Activity Name", "Activity", "Name", "Task Name", "Description"]);
      const wbs = normalizeKey(row, ["WBS", "WBS Element", "WBS Group", "Work Breakdown Structure"]) || "WBS 1.0 General";
      const location = normalizeKey(row, ["Location", "Zone", "Site", "Chainage"]) || "General";
      const plannedQtyRaw = normalizeKey(row, ["Planned Qty", "Planned Quantity", "Quantity", "Qty", "Target Qty"]);
      const unit = normalizeKey(row, ["Unit", "UOM", "Unit of Measure"]) || "m³";
      const plannedProgressRaw = normalizeKey(row, ["Planned Progress", "Planned %", "Progress", "Target Progress"]) || "0";
      const weightRaw = normalizeKey(row, ["Weight", "Weightage", "Activity Weight"]) || "0.01";
      const startDate = normalizeKey(row, ["Start Date", "Start", "Planned Start"]) || "2026-08-01";
      const finishDate = normalizeKey(row, ["Finish Date", "Finish", "Planned Finish", "End Date"]) || "2026-10-31";

      if (!code) {
        errors.push(`Row ${rowNum}: Missing required Activity ID`);
        return;
      }

      const cleanCode = String(code).trim().toUpperCase();
      if (seenCodes.has(cleanCode)) {
        errors.push(`Row ${rowNum}: Duplicate Activity ID "${cleanCode}"`);
        return;
      }
      seenCodes.add(cleanCode);

      if (!name) {
        errors.push(`Row ${rowNum}: Missing Activity Name for ID "${cleanCode}"`);
        return;
      }

      const plannedQty = parseFloat(plannedQtyRaw);
      if (isNaN(plannedQty) || plannedQty <= 0) {
        errors.push(`Row ${rowNum}: Invalid planned quantity "${plannedQtyRaw}" for ID "${cleanCode}" (must be positive number)`);
        return;
      }

      let plannedProgress = parseFloat(plannedProgressRaw);
      if (plannedProgress > 1) {
        // user entered percentage like 85
        plannedProgress = plannedProgress / 100;
      }
      if (isNaN(plannedProgress) || plannedProgress < 0 || plannedProgress > 1) {
        errors.push(`Row ${rowNum}: Invalid planned progress "${plannedProgressRaw}" (must be between 0% and 100%)`);
        return;
      }

      wbsSet.add(wbs);
      locationSet.add(location);

      validActivities.push({
        id: `act-${cleanCode.toLowerCase()}`,
        activity_code: cleanCode,
        name: String(name).trim(),
        wbs: String(wbs).trim(),
        location: String(location).trim(),
        start_date: String(startDate).split('T')[0],
        finish_date: String(finishDate).split('T')[0],
        planned_quantity: plannedQty,
        unit: String(unit).trim(),
        planned_progress: plannedProgress,
        weight: parseFloat(weightRaw) || 0.01,
        actual_quantity: 0,
        actual_progress: 0
      });
    });

    if (errors.length > 0) {
      const error = new Error(`Schedule validation failed with ${errors.length} error(s)`);
      error.validationErrors = errors;
      throw error;
    }

    return {
      activities: validActivities,
      summary: {
        totalActivities: validActivities.length,
        wbsCount: wbsSet.size,
        locationsCount: locationSet.size,
        wbsList: Array.from(wbsSet),
        locationsList: Array.from(locationSet)
      }
    };
  }

  static generateSampleSchedule() {
    // Generates a downloadable CSV representation of the NH-XX schedule
    const headers = ["Activity ID,Activity Name,WBS,Location,Start Date,Finish Date,Planned Qty,Unit,Planned Progress,Weight"];
    const rows = [
      "A101,Earthwork Excavation,WBS 2.1 Earthworks,Zone A,2026-08-01,2026-09-15,10000,m³,85%,0.08",
      "A102,Granular Sub-base,WBS 3.1 Pavement Crust,Zone A,2026-08-10,2026-09-25,5000,m³,70%,0.06",
      "A103,Concrete Drain Construction,WBS 4.1 Drainage Systems,Zone B,2026-08-05,2026-10-15,2000,m,50%,0.05",
      "A104,Culvert Construction,WBS 4.2 Cross Drainage,Chainage 12+500,2026-07-15,2026-09-30,10,Nos,50%,0.07",
      "A105,Asphalt Base Course,WBS 3.2 Bituminous Pavement,Zone C,2026-08-20,2026-10-30,8000,m²,30%,0.08"
    ];
    return headers.concat(rows).join("\n");
  }
}
