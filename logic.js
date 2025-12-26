        // Function to close the card
        function closeCard() {
            document.getElementById('portalCard').style.display = "none";
        }

        // Universal function updated to handle Image Sources and Styling Toggles
        function updatePortalCard(name, imgSrc, title, reason, tagsHTML, gridHTML, isTeam = false) {
            document.getElementById('portalCardTitle').innerText = name;
            
            const imgElement = document.getElementById('portalCardImg');
            const container = imgElement.parentElement; // Gets the .card-img-container
            
            imgElement.src = imgSrc; 

            // TOGGLE TEAM LOGO STYLE: if isTeam is true, add the class; otherwise remove it
            if (isTeam) {
                container.classList.add('is-team');
            } else {
                container.classList.remove('is-team');
            }

            document.getElementById('portalDescTitle').innerText = title;
            document.getElementById('portalCardDescText').innerText = reason;
            document.getElementById('portalCardTags').innerHTML = tagsHTML;
            document.getElementById('portalInfoGrid').innerHTML = gridHTML;
            document.getElementById('portalCard').style.display = "flex";
        }

        // 1. PLAYER CARD - (isTeam = false)
        function showCard(name, playerImg, almamater, pos, award, team, hometown, jerseyno, reason) {
            const tags = `<span class="tag rising">${pos}</span> <span class="tag prospect">${team}</span>`;
            const grid = `
                <div class="info-item"><span>Jersey Number</span><strong>${jerseyno}</strong></div>
                <div class="info-item"><span>Notable Award</span><strong>${award}</strong></div>
                <div class="info-item"><span>Hometown</span><strong>${hometown}</strong></div>
                <div class="info-item"><span>College</span><strong>${almamater}</strong></div>
            `;
            updatePortalCard(name, playerImg, "Scouting Report", reason, tags, grid, false);
        }

        // 2. PLAYER RANKING CARD - (isTeam = false)
        function showCardRanking(name, playerImg, pos, award, team, hometown, jerseyno, draft, reason, level) {
            const tags = `<span class="tag rising">${pos}</span> <span class="tag prospect">${team}</span> <span class="tag prospect">${level}</span>`;
            const grid = `
                <div class="info-item"><span>Jersey Number</span><strong>${jerseyno}</strong></div>
                <div class="info-item"><span>Notable Award</span><strong>${award}</strong></div>
                <div class="info-item"><span>Hometown</span><strong>${hometown}</strong></div>
                <div class="info-item"><span>Draft Class</span><strong>${draft}</strong></div>
            `;
            updatePortalCard(name, playerImg, "Scouting Report", reason, tags, grid, false);
        }

        // 3. TEAM CARD - (isTeam = true)
        function showTeamCard(teamName, teamLogo, setratio, captain, coach, league, championship) {
            const tags = `<span class="tag underrated">League: ${league}</span>`;
            const grid = `
                <div class="info-item"><span>Head Coach</span><strong>${coach}</strong></div>
                <div class="info-item"><span>Team Captain</span><strong>${captain}</strong></div>
                <div class="info-item"><span>Championship</span><strong>${championship}</strong></div>
                <div class="info-item"><span>Set Ratio</span><strong>${setratio}</strong></div>
            `;
            updatePortalCard(teamName, teamLogo, "Team Overview", "Active roster and season performance metrics.", tags, grid, true);
        }

        // 4. TEAM CARD HOME - (isTeam = true)
        function showTeamCardHome(teamName, teamLogo, bestplayer, captain, coach, rank, achievement, league, seasonnote) {
            const tags = `<span class="tag underrated">Rank: ${rank}</span> <span class="tag underrated">League: ${league}</span>`;
            const grid = `
                <div class="info-item"><span>Head Coach</span><strong>${coach}</strong></div>
                <div class="info-item"><span>Team Captain</span><strong>${captain}</strong></div>
                <div class="info-item"><span>Notable Achievement</span><strong>${achievement}</strong></div>
                <div class="info-item"><span>Best Player</span><strong>${bestplayer}</strong></div>
            `;
            updatePortalCard(teamName, teamLogo, "Season Notes", seasonnote, tags, grid, true);
        }
        // Close if user clicks background - Updated ID
        window.onclick = function(event) {
            const modal = document.getElementById('portalCard');
            if (event.target == modal) {
                closeCard();
            }
        }
        function filterRankings() {
            // 1. Get values using the NEW UNIQUE IDs
            const nameQuery = document.getElementById("rankNameSearch").value.toLowerCase().trim();
            const teamQuery = document.getElementById("rankTeamFilter").value.toLowerCase();
            
            // 2. Target the NEW TABLE ID
            const table = document.getElementById("rankingsTable"); 
            const rows = table.getElementsByTagName("tr");

            for (let i = 1; i < rows.length; i++) { 
                // Index [1] is Name, Index [2] is Team in THIS table
                const nameCell = rows[i].cells[1].innerText.toLowerCase(); 
                const teamCell = rows[i].cells[2].innerText.toLowerCase(); 
                
                const matchesName = nameCell.includes(nameQuery);
                const matchesTeam = (teamQuery === "all") || teamCell.includes(teamQuery);

                if (matchesName && matchesTeam) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }
        }

        function filterTeamsByLeagueRank() {
            // 1. Get the specific Team Ranking elements
            const leagueSelect = document.getElementById("teamLeagueFilter");
            const table = document.getElementById("teamRankingTable");

            if (!leagueSelect || !table) {
                console.error("Team table or filter not found");
                return;
            }

            const filterValue = leagueSelect.value.toUpperCase();
            const rows = table.querySelectorAll("tbody tr");

            rows.forEach(row => {
                // League is the 4th column (index 3)
                const leagueCell = row.cells[3].textContent.toUpperCase().trim();

                // Logical Check
                if (filterValue === "ALL" || leagueCell === filterValue) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        }

        function openProfile(name, pos, experience, league) {
            const modal = document.getElementById("playerModal");
            
            // Set dynamic content
            document.getElementById("p-name").innerText = name;
            document.getElementById("p-pos").innerText = pos;
            document.getElementById("p-experience").innerText = experience;
            document.getElementById("p-league").innerText = league;

            modal.style.display = "flex";
        }

        function closeProfile() {
            document.getElementById("playerModal").style.display = "none";
        }

        // Close if clicking outside the card
        window.onclick = function(event) {
            const modal = document.getElementById("playerModal");
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        function closeWelcome() {
            const overlay = document.getElementById('welcome-overlay');
            overlay.classList.add('overlay-hidden');
            
            // Optional: Auto-trigger the Transfer Portal tab after welcome
            document.getElementById('tab-transfer').checked = true;
        }

        // Optional: Auto-close after 5 seconds if they don't click
        /*
        setTimeout(() => {
            closeWelcome();
        }, 5000);
        */

        function launchPortal() {
            const portal = document.getElementById('welcome-portal');
            
            // Add exit class
            portal.classList.add('portal-exit');
            
            // After animation, remove from DOM to save performance
            setTimeout(() => {
                portal.style.display = 'none';
                
                // Bonus: Auto-focus the search bar in your actual table
                const searchInput = document.getElementById('portalSearch');
                if(searchInput) searchInput.focus();
            }, 1000);
        }

    function toggleDropdown(id) {
        // Optional: Close all other open dropdowns first
        const allDropdowns = document.querySelectorAll('.dropdown-content');
        allDropdowns.forEach(dd => {
            if (dd.id !== id) dd.classList.remove('show');
        });

        // Toggle the clicked dropdown
        const target = document.getElementById(id);
        target.classList.toggle('show');
    }

// 1. DATA HUB - Input your players here
const playerData = {
    "eya-laure": {
        name: "Eya Laure",
        img: "Tranfer Portal/images (27).jpg",
        stars: 5,
        pos: "OH",
        league: "PVL",
        exp: "3 Yeats",
        video: "https://www.youtube.com/watch?v=Vo1m0lvDT9c",
        report: `<p><strong>Championship:</strong> Explosive vertical, elite court awareness.</p>
                <p><strong>Awards:</strong> </p>
                <p><strong></strong>[Awards]</p>
                <p><strong></strong>[Awards]</p>`,
        probs: [
            { rank: 1, team: "Capital 1", pct: "-" },
            { rank: 2, team: "Chocomucho", pct: "-" }
        ],
        timeline: [
            { date: "UAAP Juniors Season 75 - 80", event: "Played for UST Junior Tigresses" },
            { date: "2017", event: "Played for Youth Team of the of Philippine National Womens Volleyball Team at ASEAN School Games" },
            { date: "UAAP Seniors Season 81-82, 84-85", event: "Played for UST Golden Tigresses" },
            { date: "2019", event: "Played for Senior Team of Philippine National Womens Volleyball Team at Sea Games 2019" },
            { date: "2023", event: "Debuted on 2023 Premier Volleyball League Invitational Conference with Chery Tiggo Crossovers" },
            { date: "2024", event: "She parted ways with Cherry Tiggo Crossovers" },        
        ],
        media: {
            title: "Tug of war looms for PVL star Eya Laure",
            link: "https://www.philstar.com/sports/2024/10/14/2392477/tug-war-looms-pvl-star-eya-laure",
            source: "Philstar.com"
        }
    },
    "angel-canino": {
        name: "Angel Canino",
        img: "Tranfer Portal/canino.webp",
        stars: 5,
        pos: "OH",
        league: "UAAP",
        exp: "Junior",
        video: "https://youtube.com/...",
        report: `<p><strong>Strengths:</strong> Explosive vertical, elite court awareness.</p>
                 <p><strong>Weaknesses:</strong> Consistency on out-of-system sets.</p>`,
        probs: [
            { rank: 1, team: "DLSU", pct: "95%" }
        ],
        timeline: [
            { date: "Dec 20", event: "Season MVP confirmed." }
        ],
        media: { 
            title: "Canino's Choice", 
            link: "#", 
            source: "Sports Hub" 
        }
    }
};

// 2. THE OPEN FUNCTION
function openProfile(playerId) {
    const p = playerData[playerId];
    if (!p) return;

    // Basic Info
    document.getElementById("p-name").innerText = p.name;
    document.getElementById("p-img").src = p.img;
    document.getElementById("p-rating").innerText = "⭐".repeat(p.stars);
    document.getElementById("p-pos").innerText = p.pos;
    document.getElementById("p-league").innerText = p.league;
    document.getElementById("p-experience").innerText = p.exp;
    document.getElementById("p-video-link").href = p.video;
    document.getElementById("p-report").innerHTML = p.report;

    // Probabilities Table
    const probBody = document.getElementById("p-probs-body");
    probBody.innerHTML = p.probs.map(item => `
        <tr>
            <td>${item.rank}</td>
            <td>${item.team}</td>
            <td>${item.pct}</td>
        </tr>
    `).join('');

    // Timeline
    const timelineContainer = document.getElementById("p-timeline");
    timelineContainer.innerHTML = p.timeline.map(item => `
        <div class="timeline-item">
            <div class="time-point"></div>
            <div class="time-info"><strong>${item.date}</strong> - ${item.event}</div>
        </div>
    `).join('');

    // Media
    const mediaContainer = document.getElementById("p-media");
    mediaContainer.innerHTML = `
        <div class="article-item">
            <a href="${p.media.link}" class="article-link">${p.media.title}</a>
            <p>Latest updates on ${p.name}</p>
            <small>Source: ${p.media.source}</small>
        </div>
    `;

    document.getElementById("playerModal").style.display = "flex";
}

function closeProfile() {
    document.getElementById("playerModal").style.display = "none";
}

let currentSlide = 0;
const totalSlides = 3; 

function jumpToSlide(index) {
    currentSlide = index;
    updateSliderUI();
}

function moveSlider(direction) {
    currentSlide += direction;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    updateSliderUI();
}

function updateSliderUI() {
    const track = document.getElementById('sliderTrack');
    const title = document.getElementById('teamDisplayName');
    
    // Move the track
    track.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;

    // Update Titles
    if (currentSlide === 0) title.innerText = "Hampas Pinas: Alas Team";
    else if (currentSlide === 1) title.innerText = "Hampas Pinas: Reserves";
    else if (currentSlide === 2) title.innerText = "Hampas Pinas: Rising Stars";

    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// CRITICAL: Initialize the UI when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateSliderUI();
});
// Support for Swipe (Mobile)
let touchstartX = 0;
let touchendX = 0;

const sliderContainer = document.querySelector('.team-slider-container');

sliderContainer.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

sliderContainer.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    if (touchendX < touchstartX - 50) moveSlider(1); // Swipe Left
    if (touchendX > touchstartX + 50) moveSlider(-1); // Swipe Right
}

function filterPortal() {
    const searchText = document.getElementById("portalSearch").value.toLowerCase();
    const statusFilter = document.getElementById("statusFilter").value.toLowerCase();
    
    const tableBody = document.querySelector(".portal-table tbody");
    const rows = tableBody.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowText = row.textContent.toLowerCase();
        
        // Check if the row matches the text search
        const matchesSearch = rowText.includes(searchText);
        
        // Check if the row matches the selected status
        // If 'all' is selected, it's always true.
        const matchesStatus = (statusFilter === "all" || rowText.includes(statusFilter));

        // Show row only if both conditions are met
        if (matchesSearch && matchesStatus) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}

function switchLineup() {
    const selectedYear = document.getElementById("lineupYearSelect").value;
    const allBodies = document.querySelectorAll(".roster-body");
    const rosterTitle = document.getElementById("rosterTitle");

    // Hide all lineup bodies
    allBodies.forEach(body => {
        body.style.display = "none";
    });

    // Show the selected lineup body
    const activeBody = document.getElementById("lineup-" + selectedYear);
    if (activeBody) {
        activeBody.style.display = "table-row-group";
    }

    // Update the Section Title based on selection
    const titles = {
        "2025": "🇵🇭 Alas Pilipinas Roster | Sea Games Thailand 2025",
        "2025AVC": "🇵🇭 Alas Pilipinas Roster | 2025 AVC Volleyball Nation Cup"
        };
    rosterTitle.innerHTML = titles[selectedYear];
    
    // Clear search and filters when switching years for better UX
    document.getElementById("alasNameSearch").value = "";
    document.getElementById("alasTeamFilter").value = "all";
}

function filterAlasRoster() {
    const nameFilter = document.getElementById("alasNameSearch").value.toLowerCase().trim();
    const posFilter = document.getElementById("alasTeamFilter").value.toLowerCase().trim();
    
    const activeBody = Array.from(document.querySelectorAll(".roster-body"))
                            .find(body => window.getComputedStyle(body).display !== "none") 
                            || document.getElementById("lineup-2025");
                    
    const rows = activeBody.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName("td");
        if (cells.length < 3) continue;

        // .trim() removes hidden spaces that break matching
        const nameValue = cells[1].textContent.toLowerCase().trim();
        const posValue = cells[2].textContent.toLowerCase().trim();

        const matchesName = nameValue.includes(nameFilter);
        
        // Exact match after converting both to lowercase
        const matchesPos = (posFilter === "all" || posValue === posFilter);

        row.style.display = (matchesName && matchesPos) ? "" : "none";
    }
}

function filterByCategory() {
    const selectedCategory = document.getElementById('statusFilter').value;
    const cards = document.querySelectorAll('.watch-glass-frame');

    cards.forEach(card => {
        // Find the tag element inside the card
        const tag = card.querySelector('.tag');
        
        if (selectedCategory === 'all') {
            card.classList.remove('hidden');
        } else {
            // Check if the tag has the matching class (prospect, rising, etc.)
            if (tag.classList.contains(selectedCategory)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });
}