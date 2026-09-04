import { db } from '../repositories/database.js';

export class ProgressEngine {
  /**
   * Applies an execution record update to an activity
   */
  static applyExecution(activityId, executionRecordId, quantity, unit) {
    const activity = db.getActivityById(activityId);
    if (!activity) {
      throw new Error(`Target activity not found: ${activityId}`);
    }

    // Validate units
    const cleanExecUnit = (unit || "").trim().toLowerCase().replace('³', '3').replace('²', '2');
    const cleanPlanUnit = (activity.unit || "").trim().toLowerCase().replace('³', '3').replace('²', '2');

    if (cleanExecUnit && cleanPlanUnit && cleanExecUnit !== cleanPlanUnit) {
      // Check if acceptable variation
      const isCompat = (cleanExecUnit.includes("cu") || cleanExecUnit.includes("m3")) &&
                       (cleanPlanUnit.includes("cu") || cleanPlanUnit.includes("m3"));
      if (!isCompat) {
        throw new Error(`Unit mismatch: Cannot add ${unit} to activity planned in ${activity.unit}`);
      }
    }

    const previousQty = activity.actual_quantity || 0;
    const addedQty = parseFloat(quantity);
    if (isNaN(addedQty) || addedQty <= 0) {
      throw new Error(`Invalid execution quantity: ${quantity}`);
    }

    // Apply via database repository
    const result = db.applyProgressUpdate(activityId, executionRecordId, addedQty);

    const plannedQty = result.activity.planned_quantity;
    const actualQty = result.activity.actual_quantity;
    const actualProgressPercent = Math.round(result.activity.actual_progress * 100);
    const plannedProgressPercent = Math.round(result.activity.planned_progress * 100);
    const variancePercent = actualProgressPercent - plannedProgressPercent;

    return {
      activity_id: result.activity.id,
      activity_code: result.activity.activity_code,
      activity_name: result.activity.name,
      previous_quantity: previousQty,
      added_quantity: addedQty,
      actual_quantity: actualQty,
      planned_quantity: plannedQty,
      unit: result.activity.unit,
      actual_progress: actualProgressPercent,
      planned_progress: plannedProgressPercent,
      variance: variancePercent,
      formula: {
        addition: `${previousQty.toLocaleString()} + ${addedQty.toLocaleString()} = ${actualQty.toLocaleString()} ${result.activity.unit}`,
        progress: `(${actualQty.toLocaleString()} / ${plannedQty.toLocaleString()}) × 100 = ${actualProgressPercent}%`,
        variance: `${actualProgressPercent}% - ${plannedProgressPercent}% = ${variancePercent >= 0 ? '+' : ''}${variancePercent}%`
      },
      progress_record: result.progressRecord
    };
  }
}
