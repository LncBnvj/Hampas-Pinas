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
            function showCardRanking(name, pos, award, team, hometown, jerseyno, draft, reason) {
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
                    <div class="info-item"><span>Draft Class</span><strong>${draft}</strong></div>

                `;

                document.getElementById('infoCard').style.display = "flex";
            }

            // PLAYER CARD LOGIC HQ
            function showCardHQ(name, championship, pos, award, team, hometown, year, reason) {
                const grid = document.getElementById('infoGrid');
                const tags = document.getElementById('cardTags');
                
                document.getElementById('cardTitle').innerText = name;
                document.getElementById('cardIcon').className = "fas fa-user-astronaut"; 
                document.getElementById('descTitle').innerText = "Scouting Report";
                document.getElementById('cardDescText').innerText = reason;

                tags.innerHTML = `<span class="tag rising">${pos}</span> <span class="tag prospect">${team}</span>`;
                
                grid.innerHTML = `
                    <div class="info-item"><span>No. of Year With National Team</span><strong>${year}</strong></div>
                    <div class="info-item"><span>Notable Award</span><strong>${award}</strong></div>
                    <div class="info-item"><span>Hometown</span><strong>${hometown}</strong></div>
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
            function showTeamCardHome(teamName, bestplayer, captain, coach, achievement, league) {
                const grid = document.getElementById('infoGrid');
                const tags = document.getElementById('cardTags');

                document.getElementById('cardTitle').innerText = teamName;
                document.getElementById('cardIcon').className = "fas fa-shield-halved";
                document.getElementById('descTitle').innerText = "Season Notes";
                document.getElementById('cardDescText').innerText = "This team has shown consistent growth in the current conference.";

                tags.innerHTML = `<span class="tag underrated">Rank: ${achievement}</span>`;
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

        function filterTable() {
            // Get the search string from the text input
            const nameQuery = document.getElementById("nameSearch").value.toLowerCase();
            
            // Get the value from the dropdown
            const teamQuery = document.getElementById("teamFilter").value.toLowerCase();
            
            const table = document.getElementById("playerTable"); 
            const rows = table.getElementsByTagName("tr");

            // Loop starts at 1 to skip the table header
            for (let i = 1; i < rows.length; i++) { 
                const nameCell = rows[i].cells[1].innerText.toLowerCase(); 
                const teamCell = rows[i].cells[2].innerText.toLowerCase(); 
                
                // Check Name match
                const matchesName = nameCell.includes(nameQuery);
                
                // Check Team match
                // If "all" is selected, it's always true. 
                // Otherwise, it checks if the team name in the table contains the dropdown value.
                const matchesTeam = (teamQuery === "all") || teamCell.includes(teamQuery);

                // Display row only if both conditions are met
                if (matchesName && matchesTeam) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }
        }

        function filterTeamsByLeague() {
            // 1. Get the league selected in the dropdown
            const selectedLeague = document.getElementById("leagueFilter").value.toLowerCase();
            
            // 2. Target the Team Ranking table
            const table = document.getElementById("teamRankingTable");
            const rows = table.getElementsByTagName("tr");

            // 3. Loop through rows (skip header)
            for (let i = 1; i < rows.length; i++) {
                // League is in the 3rd column (index 2)
                const leagueCell = rows[i].cells[2].textContent.toLowerCase();

                // 4. Show if "all" is selected OR if the cell text matches the selection
                if (selectedLeague === "all" || leagueCell.includes(selectedLeague)) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }
        }