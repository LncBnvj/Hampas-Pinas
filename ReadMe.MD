# Hampas Pinas | Comprehensive Volleyball Analytics & Scouting System

Hampas Pinas is the premier data-driven ecosystem for Philippine volleyball. It integrates high-fidelity player tracking, team stability metrics, and national team scouting into a single unified platform. 

This documentation details the 2026 Season architecture, including the **92.74 Roster Strength Protocol** and the **Jia De Guzman #1 PR Standard**.

---

## 📂 Platform Architecture: The "Seven Windows"

The application is structured into seven specialized modules, each serving a critical role in the 2026 volleyball landscape.

### 🏠 1. The Home Dashboard (Executive Summary)
* **Pulse Check:** Displays the highest-rated player (**Jia De Guzman, 94.47 PR**) and team (**Choco Mucho, 92.74 Strength**).
* **Glory Wall:** Archives for major titles, currently highlighting the **PLDT High Speed Hitters** as 2025 Invitational Champions.
* **Live Ticker:** Real-time updates on roster changes, game results, and Alas Pilipinas news.

### 🥇 2. Player Rankings Window (The "PR" Engine)
The core database for evaluating individual talent.
* **Tier 1 (5-Star):** The "Untouchables" (PR 90+). These players dictate league parity.
* **Scout Grading System:**
    * **S+ Grade:** Hall-of-Fame trajectory.
    * **A/B Grade:** Reliable starters and system players.
    * **Prospect:** Rising stars from the collegiate ranks (e.g., Angge Poyos).
* **Position-Locked Ranks:** Persistent ranking (e.g., #1 S, #1 OH) that remains accurate even when the table is filtered.

### 🏆 3. Team Ranking Window (Roster Strength)
Analyzes collective team power based on the **70/30 Hybrid Model**.
* **Contender Status:** Teams scoring >85 are labeled "Championship Contenders."
* **Depth Analysis:** Visualizes the gap between the Starting Six and the reserve bench.
* **Historical Trends:** Tracks how a team's strength has evolved conference-over-conference.

### 🔄 4. Transfer Portal Window (Transaction Logic)
The most volatile window, tracking all PVL and International movements.
* **Transaction Logging:** Captures signings (Seth Rodriguez to PLDT), departures (Mich Morente from Creamline), and trades.
* **Transfer Entry Verification:** Strength is verified by the *Total Number of Transfer Entries*. High entry counts trigger a **Chemistry Penalty** in the Team Strength score.

### 🇵🇭 5. Alas Watch Window (National Team Scouting)
Direct integration with the **Alas Pilipinas** roadmap.
* **National Impact Score:** Measures how much a player's absence for national duty affects their pro club.
* **International Radar:** Tracks performance in AVC and FIVB sanctioned events.

### 🔍 6. Watchlist Window (The Scouting Portal)
A dedicated space for "Hidden Gems" and future stars.
* **Collegiate Watch:** Real-time PR tracking for UAAP/NCAA standout athletes.
* **The "Magic Bunot" List:** Identifying high-efficiency bench players who are ready for starting roles.

### ⚙️ 7. System Settings & Logic (The "Engine Room")
* **Formula Calibration:** Global settings for weighted averages and star-rating thresholds.
* **Data Refresh:** Manual and API-based triggers to update the league-wide database.

---

## 📉 Advanced Mathematical Protocols

### I. The Roster Strength Verification (Spreadsheet)
To maintain the integrity of the "92.74" style scores for top teams, the following logic must be applied in the backend spreadsheet:

| Component | Weight | Target Metric |
| :--- | :--- | :--- |
| **Starters (Top 7)** | 70% | High-impact performance & PR |
| **Bench (Players 8-14)** | 30% | Depth, versatility, and stability |

**Critical Check:** > Formula: `=(Starter_Avg * 0.7) + (Bench_Avg * 0.3)`

### II. JavaScript Implementation: Persistent Position Ranking
To solve the "All #1" UI bug, the system pre-calculates the rank within the `initializeLeagueRanks` function before the user applies any filters.

```javascript
// Pre-calculates position-specific ranks
function initializeLeagueRanks() {
    const tableBody = document.getElementById('rankingTableBody');
    const rows = Array.from(tableBody.querySelectorAll('.player-row'));
    const posCounters = {};

    // Sort globally by PR (highest to lowest)
    rows.sort((a, b) => parseFloat(b.dataset.pr) - parseFloat(a.dataset.pr));

    rows.forEach((row, index) => {
        const pos = row.dataset.pos || "N/A";
        
        // Save Global Rank
        row.setAttribute('data-league-rank', index + 1);

        // Save Static Position Rank
        posCounters[pos] = (posCounters[pos] || 0) + 1;
        row.setAttribute('data-static-pos-rank', posCounters[pos]);
    });
}