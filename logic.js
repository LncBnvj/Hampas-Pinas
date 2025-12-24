            function closeCard() {
                document.getElementById('infoCard').style.display = "none";
            }

            // PLAYER CARD LOGIC HOME
            function showCard(name, almamater, pos, award, team, hometown, jerseyno, reason) {
                const grid = document.getElementById('infoGrid');
                const tags = document.getElementById('cardTags');
                
                document.getElementById('cardTitle').innerText = name;
                document.getElementById('cardIcon').className = "fas fa-user-astronaut"; 
                document.getElementById('descTitle').innerText = "Scouting Report";
                document.getElementById('cardDescText').innerText = reason;

                tags.innerHTML = `<span class="tag rising">${pos}</span> <span class="tag prospect">${team}</span>`;
                
                grid.innerHTML = `
                    <div class="info-item"><span>Jersey Number</span><strong>${jerseyno}</strong></div>
                    <div class="info-item"><span>Notable Award</span><strong>${award}</strong></div>
                    <div class="info-item"><span>Hometown</span><strong>${hometown}</strong></div>
                    <div class="info-item"><span>College</span><strong>${almamater}</strong></div>
                `;

                document.getElementById('infoCard').style.display = "flex";
            }

            // PLAYER CARD LOGIC PLAYER RANKING
            function showCardRanking(name, pos, award, team, hometown, jerseyno, draft, reason, level) {
                const grid = document.getElementById('infoGrid');
                const tags = document.getElementById('cardTags');
                
                document.getElementById('cardTitle').innerText = name;
                document.getElementById('cardIcon').className = "fas fa-user-astronaut"; 
                document.getElementById('descTitle').innerText = "Scouting Report";
                document.getElementById('cardDescText').innerText = reason;

                tags.innerHTML = `<span class="tag rising">${pos}</span> <span class="tag prospect">${team}</span> <span class="tag prospect">${level}</span>`;
                
                grid.innerHTML = `
                    <div class="info-item"><span>Jersey Number</span><strong>${jerseyno}</strong></div>
                    <div class="info-item"><span>Notable Award</span><strong>${award}</strong></div>
                    <div class="info-item"><span>Hometown</span><strong>${hometown}</strong></div>
                    <div class="info-item"><span>Draft Class</span><strong>${draft}</strong></div>

                `;

                document.getElementById('infoCard').style.display = "flex";
            }

            // PLAYER CARD LOGIC HQ
            function showCardHQ(name, championship, pos, award, team, college, year, reason, level) {
                const grid = document.getElementById('infoGrid');
                const tags = document.getElementById('cardTags');
                
                document.getElementById('cardTitle').innerText = name;
                document.getElementById('cardIcon').className = "fas fa-user-astronaut"; 
                document.getElementById('descTitle').innerText = "Scouting Report";
                document.getElementById('cardDescText').innerText = reason;

                tags.innerHTML = `<span class="tag rising">${pos}</span> <span class="tag prospect">${team}</span> <span class="tag level">${level}</span>`;
                
                grid.innerHTML = `
                    <div class="info-item"><span>No. of Year With National Team</span><strong>${year}</strong></div>
                    <div class="info-item"><span>Notable Award</span><strong>${award}</strong></div>
                    <div class="info-item"><span>College</span><strong>${college}</strong></div>
                    <div class="info-item"><span>Championship Ring</span><strong>${championship}</strong></div>
                `;

                document.getElementById('infoCard').style.display = "flex";
            }


            // TEAM CARD LOGIC
            function showTeamCard(teamName, setratio, captain, coach, league, championship) {
                const grid = document.getElementById('infoGrid');
                const tags = document.getElementById('cardTags');

                document.getElementById('cardTitle').innerText = teamName;
                document.getElementById('cardIcon').className = "fas fa-shield-halved";
                document.getElementById('descTitle').innerText = "Season Notes";
                document.getElementById('cardDescText').innerText = "This team has shown consistent growth in the current conference.";

                tags.innerHTML = `<span class="tag underrated">League: ${league}</span>`;

                grid.innerHTML = `
                    <div class="info-item"><span>Head Coach</span><strong>${coach}</strong></div>
                    <div class="info-item"><span>Team Captain</span><strong>${captain}</strong></div>
                    <div class="info-item"><span>Championship</span><strong>${championship}</strong></div>
                    <div class="info-item"><span>Set Ratio</span><strong>${setratio}</strong></div>
                `;

                document.getElementById('infoCard').style.display = "flex";
            }
            // TEAM CARD LOGIC HOME
            function showTeamCardHome(teamName, bestplayer, captain, coach, rank, achievement, league, seasonnote

            ) {
                const grid = document.getElementById('infoGrid');
                const tags = document.getElementById('cardTags');

                document.getElementById('cardTitle').innerText = teamName;
                document.getElementById('cardIcon').className = "fas fa-shield-halved";
                document.getElementById('descTitle').innerText = "Season Notes";
                document.getElementById('cardDescText').innerText = seasonnote;

                tags.innerHTML = `<span class="tag underrated">Rank: ${rank}</span>`;
                tags.innerHTML += `<span class="tag underrated">League: ${league}</span>`;

                grid.innerHTML = `
                    <div class="info-item"><span>Head Coach</span><strong>${coach}</strong></div>
                    <div class="info-item"><span>Team Captain</span><strong>${captain}</strong></div>
                    <div class="info-item"><span>Notable Achievement</span><strong>${achievement}</strong></div>
                    <div class="info-item"><span>Best Player</span><strong>${bestplayer}</strong></div>
                `;

                document.getElementById('infoCard').style.display = "flex";
            }


            // Close if user clicks background
            window.onclick = function(event) {
                if (event.target == document.getElementById('infoCard')) {
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

        function filterAlasRoster() {
            // 1. Get the specific Alas elements
            const nameInput = document.getElementById("alasNameSearch");
            const teamSelect = document.getElementById("alasTeamFilter");
            const table = document.getElementById("alasTable");

            if (!nameInput || !teamSelect || !table) return;

            const nameQuery = nameInput.value.toLowerCase().trim();
            const teamQuery = teamSelect.value.toLowerCase();
            
            // Get all rows in the body
            const rows = table.querySelectorAll("tbody tr");

            rows.forEach(row => {
                // In THIS table: Name is Index 1, Team is Index 3
                const nameCell = row.cells[1].textContent.toLowerCase();
                const teamCell = row.cells[2].textContent.toLowerCase();

                const matchesName = nameCell.includes(nameQuery);
                const matchesTeam = (teamQuery === "all") || teamCell.includes(teamQuery);

                // Update row visibility
                if (matchesName && matchesTeam) {
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

        function filterPortal() {
            // Get the search input
            const input = document.getElementById("portalSearch");
            const filter = input.value.toLowerCase();
            
            // Target only the rows inside the tbody
            const tableBody = document.querySelector(".portal-table tbody");
            const rows = tableBody.getElementsByTagName("tr");

            // Loop through all table rows
            for (let i = 0; i < rows.length; i++) {
                // textContent gets all text inside the row (Name, Pos, Status, etc.)
                const rowText = rows[i].textContent.toLowerCase();
                
                if (rowText.includes(filter)) {
                    rows[i].style.display = ""; // Show the row
                } else {
                    rows[i].style.display = "none"; // Hide the row
                }
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