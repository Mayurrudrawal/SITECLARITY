const API_BASE = '/api';

export async function fetchProject() {
  const res = await fetch(`${API_BASE}/projects`);
  if (!res.ok) throw new Error("Failed to fetch project");
  return res.json();
}

export async function fetchDashboard() {
  const res = await fetch(`${API_BASE}/dashboard`);
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json();
}

export async function fetchActivities() {
  const res = await fetch(`${API_BASE}/activities`);
  if (!res.ok) throw new Error("Failed to fetch activities");
  return res.json();
}

export async function fetchActivityById(id) {
  const res = await fetch(`${API_BASE}/activities/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch activity ${id}`);
  return res.json();
}

export async function uploadSchedule(file, mode = 'replace') {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/schedule/upload?mode=${mode}`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.error || "Failed to upload schedule");
    err.validation_errors = data.validation_errors || [];
    throw err;
  }
  return data;
}

export async function uploadExecutionEvidence(fileOrText, sourceType = "Daily Site Report") {
  const formData = new FormData();
  if (typeof fileOrText === 'string') {
    formData.append('raw_text', fileOrText);
    formData.append('source_type', sourceType);
  } else {
    formData.append('file', fileOrText);
    formData.append('source_type', sourceType);
  }

  const res = await fetch(`${API_BASE}/execution/upload`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to process evidence");
  return data;
}

export async function extractExecutionOnly(rawText, fileName = "") {
  const res = await fetch(`${API_BASE}/execution/extract`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ raw_text: rawText, file_name: fileName })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Extraction failed");
  return data;
}

export async function runMatching(executionRecordId, executionData = null) {
  const res = await fetch(`${API_BASE}/matching/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      execution_record_id: executionRecordId,
      execution_data: executionData
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Matching calculation failed");
  return data;
}

export async function acceptMatch(matchId) {
  const res = await fetch(`${API_BASE}/matching/${matchId}/accept`, {
    method: 'POST'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to accept match");
  return data;
}

export async function changeMatchActivity(matchId, newActivityId) {
  const res = await fetch(`${API_BASE}/matching/${matchId}/change`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ new_activity_id: newActivityId })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to re-assign match");
  return data;
}

export async function fetchEvidenceList() {
  const res = await fetch(`${API_BASE}/evidence`);
  if (!res.ok) throw new Error("Failed to fetch evidence list");
  return res.json();
}

export async function fetchEvidenceById(id) {
  const res = await fetch(`${API_BASE}/evidence/${id}`);
  if (!res.ok) throw new Error("Failed to fetch evidence details");
  return res.json();
}

export async function fetchProgress() {
  const res = await fetch(`${API_BASE}/progress`);
  if (!res.ok) throw new Error("Failed to fetch progress records");
  return res.json();
}

export async function fetchLanguages() {
  const res = await fetch(`${API_BASE}/languages`);
  if (!res.ok) throw new Error("Failed to fetch supported languages");
  return res.json();
}

export async function detectLanguage(text) {
  const res = await fetch(`${API_BASE}/language/detect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error("Language detection failed");
  return res.json();
}

export async function createFieldReport(reportPayload) {
  const res = await fetch(`${API_BASE}/execution/create-report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reportPayload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create field report");
  return data;
}

export async function reviewExecutionRecord(id, updates) {
  const res = await fetch(`${API_BASE}/execution/${id}/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to review execution record");
  return data;
}

export async function resetDemoState() {
  const res = await fetch(`${API_BASE}/demo/reset`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error("Failed to reset demo state");
  return res.json();
}
