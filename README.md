# Site Clarity — Infrastructure Project Progress Intelligence
> **Smart India Hackathon (SIH 2026) Flagship Prototype**

Site Clarity bridges unstructured field reports from construction workers in 22+ Scheduled Indian Languages into standardized civil engineering parameters, automatic WBS schedule matching, real-time progress variance calculation, and immutable evidence traceability.

---

## 🌟 Key Capabilities

### 1. Multilingual Field Intelligence
- **Native Script Preservation**: Workers report progress via mobile in their native language (**हिन्दी**, **தமிழ்**, **मराठी**, **اردو** with true RTL support, etc.).
- **AI Entity Extraction**: Automatically detects languages, normalizes Devanagari/Indic numerals into standard metric units (e.g. $1,200\text{ m}^3$), extracts chainages, dates, and locations.
- **Progressive Inference**: Live delayed AI reveal demonstrating real-time natural language parsing, translation, and semantic normalization.

### 2. Intelligent Schedule Matching
- **Automated WBS Alignment**: Matches worker descriptions to canonical schedule items (e.g., `A101 — Earthwork Excavation`) with multi-factor confidence scoring (Semantic similarity, Location, Work type, Quantity consistency).
- **Interactive Approval**: Project managers can accept recommendations or reassign activities via interactive dropdowns.

### 3. Real-Time Progress Impact & Variance
- Computes actual vs. planned progress deltas and visualizes variance impacts on critical path activities.

### 4. Immutable Evidence Traceability Vault
- Cryptographic evidence logs linking raw worker reports to structured parameters and schedule updates for 100% audit compliance.

---

## 🚀 1-Click Deploy on Render

This repository includes a [`render.yaml`](render.yaml) blueprint for zero-configuration deployment on Render.

1. Fork or push this repository to your GitHub account.
2. Go to **[dashboard.render.com](https://dashboard.render.com)**.
3. Click **New +** → **Blueprint**.
4. Connect this repository (**`Mayurrudrawal/SITECLARITY`**).
5. Click **Apply** to deploy your live web service!

---

## 💻 Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Setup
```bash
# 1. Clone the repository
git clone https://github.com/Mayurrudrawal/SITECLARITY.git
cd SITECLARITY

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Production Build & Test Locally
```bash
npm run build
npm start
```
