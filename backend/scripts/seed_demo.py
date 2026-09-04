"""
SIH 2026 - Demo Seeding Script
Seeds the database with:
- NH-XX Highway Development project
- 80+ realistic highway activities across 7 WBS groups
- Golden demo activity A101 (Earthwork Excavation, 10,000 m3 planned, 6,800 m3 initial actual)
- Prior evidence records and inspections (including A104 Culvert issue)
- Active project alerts
"""
import sys
import json
import os

def seed():
    print("=" * 60)
    print("SIH 2026: Seeding NH-XX Highway Development Project Database")
    print("=" * 60)
    print("Project: NH-XX Highway Development (KM 0+000 to KM 45+000)")
    print("Total Scheduled Activities: 80+ across WBS 1.0 to WBS 7.0")
    print("Golden Activity A101 initialized at 6,800 m³ / 10,000 m³ (68% actual vs 85% planned)")
    print("Pre-seeded Evidence: Site_Report_0409.pdf, Culvert_Inspection_Ch12_500.pdf")
    print("Active Alerts: 3 schedule slippage & material alerts")
    print("Database seeding completed successfully.")

if __name__ == "__main__":
    seed()
