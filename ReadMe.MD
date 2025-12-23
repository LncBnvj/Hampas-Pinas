# Player & Team Scouting Dashboard

A lightweight, vanilla JavaScript-driven dashboard for displaying sports statistics, player scouting reports, and team rankings. This system uses dynamic DOM manipulation to display detailed info cards and provides real-time table filtering.

## 🚀 Features

* **Dynamic Info Cards**: Multiple views for Players (Home, Ranking, HQ) and Teams.
* **Contextual Data**: Automatically switches data points (e.g., "Draft Class" vs "Almamater") based on the view.
* **Dual-Filter System**: Filter player tables by name and team simultaneously.
* **Category Filtering**: Filter team rankings by league.
* **UX Focused**: Includes "click-outside-to-close" functionality for modals.

## 🛠️ Logic Breakdown

### 1. Card Display System
The script uses several `showCard` functions to populate a central modal (`#infoCard`).

* `showCard()`: Standard player view (College, Jersey No).
* `showCardRanking()`: Focuses on Draft Class and scouting reports.
* `showCardHQ()`: Designed for National Team history and Championship rings.
* `showTeamCard()`: Displays coaching staff and team-specific metrics like "Set Ratio."

### 2. Table Filtering
The dashboard includes two primary search functions:
* **`filterTable()`**: Combines a text input (`#nameSearch`) and a dropdown (`#teamFilter`) to narrow down the player list.
* **`filterTeamsByLeague()`**: A quick-sort dropdown for the team standings table.

## 📋 Requirements

To use this logic, your HTML must contain the following IDs:

| Element ID | Purpose |
| :--- | :--- |
| `infoCard` | The main modal container (`display: none` by default). |
| `infoGrid` | The container where the `info-item` divs are injected. |
| `cardTitle` | The header for the player or team name. |
| `cardTags` | Container for badges (e.g., Position, Team, Rank). |
| `playerTable` | The table element used for player searches. |

## 🖥️ Usage Example

To trigger a player card from an HTML button:

```html
<button onclick="showCard('John Doe', 'State Tech', 'Forward', 'MVP', 'Galaxies', 'New York', '23', 'Exceptional vertical leap.')">
  View Profile
</button>