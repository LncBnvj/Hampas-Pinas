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
        img: "Tranfer Portal/1.1.png",
        stars: 5,
        pos: "Outside Hitter",
        league: "PVL / Alas PIlipinas",
        exp: "3 Years",
        video: "https://www.youtube.com/watch?v=Vo1m0lvDT9c",
        report: `<p><strong>Championship:</strong> 5x Champion</p>
                <p><strong>Notable Awards:</strong> </p>
                <p><strong></strong>PVL 2nd All Filipino Conference - Best Outside Spiker</p>
                <p><strong></strong>UAAP Season 81 - 1st Best Spiker</p>
                <p><strong></strong>UAAP Season 81 - Rookie of the Year</p>
                <p><strong></strong>2025 AVC Women's Volleyball Nation Cup Runner Up</p>`
                ,

        probs: [
            { rank: 1, team: "Capital 1", pct: "-" },
            { rank: 2, team: "Chocomucho", pct: "-" }
        ],
        timeline: [
            { date: "2025", event: "Free Agent" },  
            { date: "2024", event: "She parted ways with Cherry Tiggo Crossovers" },  
            { date: "2023", event: "Debuted on 2023 Premier Volleyball League Invitational Conference with Chery Tiggo Crossovers" },
            { date: "UAAP Seniors Season 81-82, 84-85", event: "Played for UST Golden Tigresses" },              
            { date: "2019", event: "Played for Senior Team of Philippine National Womens Volleyball Team at Sea Games 2019" }, 
            { date: "UAAP Juniors Season 75 - 80", event: "Played for UST Junior Tigresses" },
            { date: "2017", event: "Played for Youth Team of the of Philippine National Womens Volleyball Team at ASEAN School Games" }
        ],
    },

    "aiza-pontillas": {
        name: "Aiza Maizo Pontillas",
        img: "Tranfer Portal/5.png",
        stars: 4,
        pos: "Opposite Spiker",
        league: "PVL",
        exp: "15 Years",
        video: "https://www.youtube.com/watch?v=2Dct0G4FvaE",
        report: `<p><strong>Championship:</strong> 21x Champion </p>
                <p><strong>Notable Awards:</strong> </p>
                <p><strong></strong> 2025 PVL Reinforced Conference Champion</p>
                <p><strong></strong> 2025 PVL All-FIlipino Conference Champion</p>
                <p><strong></strong> 2019 ASEAN Grand Prix - First Leg 3rd Place</p>
                <p><strong></strong> 2017 PSL All Filipino Most Valuable Player </p>`
                ,
        probs: [
            { rank: 1, team: "-", pct: "-" },
            { rank: 2, team: "-", pct: "-" }
        ],
        timeline: [
            { date: "2022", event: "Made her PVL with Petro Gazz Angels in the Premier Volleyball League" },
            { date: "2021", event: "Signed with Sta. Lucia Lady Realtors" },

            { date: "2019", event: "Returned to the Philippine National Team for the 2019 SEA Games" },
            { date: "2017", event: "First international medal with the Philippine National Team (Bronze – Princess Maja Chakri Sirindhorn's Cup)" },

            { date: "2016", event: "Transferred to Petron Tri-Activ / Blaze Spikers in the Philippine Super Liga" },
            { date: "2015", event: "Signed with PLDT Home Ultera Fast Hitters" },
            { date: "2013–2015", event: "Played for Cagayan Valley Lady Rising Suns in Shakey’s V-League" },
            { date: "2013", event: "Made her debut with the Philippine National Team at the Asian Women’s Volleyball Championship" },
            { date: "2011", event: "Guest player for Philippine Air Force and Philippine Navy" },
            { date: "2007–2011, 2013", event: "Played collegiate volleyball for UST Golden Tigresses" }
        ],
    },

    "ara-galang": {
        name: "Victonara Galang",
        img: "Tranfer Portal/8.jpg",
        stars: 4,
        pos: "Opposite Spiker",
        league: "PVL",
        exp: "10 Years",
        video: "https://www.youtube.com/watch?v=9yiDe7BX7j8",
        report: `<p><strong>Championship:</strong> 8x Champion </p>
                <p><strong>Notable Awards:</strong> </p>
                <p><strong></strong> 2018 PSL Invitational Most Valuable Player</p>
                <p><strong></strong> UAAP Season 75 Most Valuable PLayer </p>
                <p><strong></strong> 2019 PSL All FIlipino Champion </p>
                <p><strong></strong> 2025 PVL on Tour Runner Up </p>`
                ,
        probs: [
            { rank: 1, team: "-", pct: "-" },
            { rank: 2, team: "-", pct: "-" }
        ],
        timeline: [
            { date: "2024", event: "Signed with Chery Tiggo 7 Pro Crossovers" },
            { date: "2017", event: "Played for F2 Logistics Cargo Movers as an Outside Hitter" },
            { date: "2015", event: "First professional stint with F2 Logistics Cargo Movers" },
            { date: "2011", event: "Played collegiate volleyball for De La Salle University Lady Spikers" }
        ],
    },   
    
        "jen-nierva": {
        name: "Jennifer Nierva",
        img: "Tranfer Portal/9.png",
        stars: 4,
        pos: "Libero",
        league: "PVL",
        exp: "3 Years",
        video: "https://www.youtube.com/watch?v=lBexjDvaLhI",
        report: `<p><strong>Championship:</strong> 2x Champion </p>
                <p><strong>Notable Awards:</strong> </p>
                <p><strong></strong> UAAP Season 84 Indoor Volleyball Champion</p>
                <p><strong></strong> UAAP Season 84 Best Libero </p>`
                ,
        probs: [
            { rank: 1, team: "-", pct: "-" },
            { rank: 2, team: "-", pct: "-" }
        ],
        timeline: [
            { date: "2023", event: "First professional stint with Chery Tiggo 7 Pro Crossovers" },
            { date: "2022", event: "Played for Team PNVF" },
            { date: "2020", event: "Played for Rebisco-Philippines" },
            { date: "2018", event: "Played collegiate volleyball for NU Lady Bulldogs" },
            { date: "2017", event: "Played for BaliPure Purest Water Defenders" }
        ],
    },   

    "imee-hernandez": {
        name: "Imee Kim Hernandez",
        img: "Tranfer Portal/10.png",
        stars: 4,
        pos: "Middle Blocker",
        league: "PVL",
        exp: "3 Years",
        video: "https://www.youtube.com/watch?v=8b2bCp3YF5c",
        report: `<p><strong>Championship:</strong> None </p>
                <p><strong>Notable Awards:</strong> </p>
                <p><strong></strong> 2018 PVL V-League Best Middle Blocker</p>
                <p><strong></strong> 2025 PVL on Tour Runner Up  </p>`
                ,
        probs: [
            { rank: 1, team: "-", pct: "-" },
            { rank: 2, team: "-", pct: "-" }
        ],
        timeline: [
            { date: "2023", event: "Signed with Chery Tiggo 7 Pro Crossovers" },
            { date: "2020", event: "Played for Rebisco Philippines" },
            { date: "2018-2023", event: "Played collegiate volleyball for UST Golden Tigresses" }
        ],
    },   

    "aby-marano": {
        name: "Aby Marano",
        img: "Tranfer Portal/11.png",
        stars: 3,
        pos: "Middle Blocker",
        league: "PVL",
        exp: "11 Years",
        video: "https://www.youtube.com/watch?v=k-M7hO9yd1w",
        report: `<p><strong>Championship:</strong> 10x Champion </p>
                <p><strong>Notable Awards:</strong> </p>
                <p><strong></strong> 2021 PNVF Champions League Champion </p>
                <p><strong></strong> 2025 PVL on Tour Runner Up </p>
                <p><strong></strong> 2017 DLSAA Lasallian Sport Achievement Award </p>
                <p><strong></strong> 2024 PNVF Champions League Best Middle Blocker</p>
                <p><strong></strong> 2021 PNVF Champions League Best Middle Blocker </p>`
                ,
        probs: [
            { rank: 1, team: "-", pct: "-" },
            { rank: 2, team: "-", pct: "-" }
        ],
        timeline: [
            { date: "2024–2025", event: "Signed with Chery Tiggo 7 Pro Crossovers" },
            { date: "2020–2021", event: "Joined Rebisco Philippines" },
            { date: "2016–2017", event: "Suited up for Foton Tornadoes" },
            { date: "2015–2024", event: "Became a long-time mainstay of F2 Logistics Cargo Movers" },
            { date: "2015–2016", event: "Made a stint with RC Cola–Army Lady Troopers" },
            { date: "2014–2015", event: "Signed with Meralco Power Spikers" },
            { date: "2014–2015", event: "Joined Petron Tri-Activ Spikers" },
            { date: "2013–2014", event: "Began her professional career with Generika Ayala Lifesavers" },
            { date: "2013–2014", event: "Had a short stint with AirAsia Flying Spikers" },
            { date: "2013–2014", event: "Also suited up for PayMaya High Flyers" },
            { date: "2010", event: "Started her collegiate career with De La Salle University Lady Spikers" }       
        ],
    },

    "caitlin-viray": {
        name: "Caitlin Viray",
        img: "Tranfer Portal/3.jpg",
        stars: 3,
        pos: "Opposite Spiker",
        league: "PVL",
        exp: "7 Years",
        video: "https://www.youtube.com/watch?v=A35eGTM8Fs0",
        report: `<p><strong>Championship:</strong> 1x Champion </p>
                <p><strong>Notable Awards:</strong> </p>
                <p><strong></strong> 2023 VTV Cup 3rd Place </p>
                <p><strong></strong> PVL 2023 Second All Filipino Runner Up </p>
                <p><strong></strong> UAAP Season 81 Indoor Volleyball Runner Up </p>
                <p><strong></strong> UAAP Season 80 Beach Volleyball Champion </p>
                <p><strong></strong> UAAP Season 79 Beach Volleyball Rookie of the Year</p>`
                ,
        probs: [
            { rank: 1, team: "Chocomucho", pct: "-" },
            { rank: 2, team: "Farm Fresh Foxies", pct: "-" }
        ],
        timeline: [
            { date: "December 2025", event: "Reportedly set for a return to Choco Mucho" },
            { date: "2024", event: "Signed with the Farm Fresh Foxies" },  
            { date: "2020", event: "Made her PVL debut with the Choco Mucho Flying Titans" },   
            { date: "2019", event: "Played for the Marinerang Piipinas Lady Skippers" },  
            { date: "2018", event: "Made her semi-professional debut with the Smart Giga Hitters" },   
            { date: "2017 - 2020", event: "Represented UST Golden Tigresses in indoor and beach volleyball" }       
        ],
    },

    "alina-bicar": {
        name: "Alina Bicar",
        img: "Tranfer Portal/12.png",
        stars: 3,
        pos: "Setter    ",
        league: "PVL",
        exp: "7 Years",
        video: "https://www.youtube.com/watch?v=G5Nb5utmWys",
        report: `<p><strong>Championship:</strong> None </p>
                <p><strong>Notable Awards:</strong> </p>
                <p><strong></strong> UAAP Season 81 Indoor Volleyball Runner Up </p>
                <p><strong></strong> 2024 PVL Champions League 3rd Place </p>
                <p><strong></strong> 2021 PVL Open Conference 3rd Place </p>
                <p><strong></strong> 2019 PVL Reinforeced Conference 3rd Place </p>
                <p><strong></strong> UAAP Season 79 Inddor Volleyball 3rd Place</p>`
                ,
        probs: [
            { rank: 1, team: "-", pct: "-" },
            { rank: 2, team: "-", pct: "-" }
        ],
        timeline: [
            { date: "2022–2025", event: "Signed with Chery Tiggo 7 Pro Crossovers" },
            { date: "2020–2023", event: "Joined BaliPure Purest Water Defenders" },
            { date: "2019–2020", event: "Had a stint with PacificTown–Army Lady Troopers" },
            { date: "2018–2019", event: "Suited up for Tacloban Fighting Warays" },
            { date: "2017–2018", event: "Signed with PLDT High Speed Hitters" },
            { date: "2015–2019", event: "Began her collegiate career with the UST Golden Tigresses" }
        ],

    },

    "camille-victoria": {
        name: "Camille Victoria",
        img: "Tranfer Portal/6.png",
        stars: 3,
        pos: "Middle Blocker / Opposite Spiker",
        league: "PVL",
        exp: "3 Years",
        video: "https://www.youtube.com/watch?v=DzXdn5UpeIw",
        report: `<p><strong>Championship:</strong> None </p>
                <p><strong>Notable Awards:</strong> </p>
                <p><strong></strong> 2024 PVL Reinforced Conference Runner Up</p>
                <p><strong></strong> 2024 PVL All Filipino Conference 3rd Place Up<p>
                <p><strong></strong> UAAP Season 81 Indoor Volleyball Runner Up</p>`              
                ,
        probs: [
            { rank: 1, team: "-", pct: "-" },
            { rank: 2, team: "-", pct: "-" },
            { rank: 3, team: "-", pct: "-" }     
        ],
        timeline: [
            { date: "2025", event: "Rejoined Akari Power Chargers as a Middle Blocker" },
            { date: "2025", event: "Transferred to Nxled Chameleons, converting to Middle Blocker" },
            { date: "2023", event: "Played for Akari Power Chargers as an Opposite Spiker" },
            { date: "2017", event: "Played collegiate volleyball for UST Golden Tigresses as an Opposite Spiker" },
            { date: "2016", event: "Began semi-professional career with Cherrylume Iron Lady Warriors" }
        ],
    },

    "mylene-paat": {
        name: "Mylene Paat",
        img: "Tranfer Portal/13.png",
        stars: 3,
        pos: "Opposite Spiker",
        league: "PVL",
        exp: "9 Years",
        video: "https://www.youtube.com/watch?v=K2UjNJZ1798",
        report: `<p><strong>Championship:</strong> 2x Champion </p>
                <p><strong>Notable Awards:</strong> </p>
                <p><strong></strong> 2021 PVL Open League Champion p</p>
                <p><strong></strong> 2017 PSL Invitational Cup Champion <p>
                <p><strong></strong> 2022 PVL Reinforced Conference Most Valuable Player <p>                
                <p><strong></strong> 2021 Thailand League Top Scorerp</p>`              
                ,
        probs: [
            { rank: 1, team: "-", pct: "-" },
            { rank: 2, team: "-", pct: "-" },
            { rank: 3, team: "-", pct: "-" }     
        ],
        timeline: [
            { date: "2021–2026", event: "Signed with Chery Tiggo 7 Pro Crossovers" },
            { date: "2021–2022", event: "Made an overseas stint with Nakhon Ratchasima Qmin C VC (Thailand)" },
            { date: "2020–2021", event: "Joined Choco Mucho Flying Titans for AVC" },
            { date: "2016–2019", event: "Became part of the Cignal Super Spikers program" },
            { date: "2015–2016", event: "Had a one-season stint with TIP Lady Engineers" },
            { date: "2013–2018", event: "Began her collegiate career with Adamson Lady Falcons" }
        ],

    },
    "pauline-gaston": {
        name: "Pauline Marie Monique Gaston",
        img: "Tranfer Portal/4.png",
        stars: 3,
        pos: "Opposite Spiker/ Middle Blocker",
        league: "PVL",
        exp: "8 Years",
        video: "https://www.youtube.com/watch?v=r8NK-bQnevw",
        report: `<p><strong>Championship:</strong> 1x Champion </p>
                <p><strong>Notable Awards:</strong> </p>
                <p><strong></strong> 2024 PNVF Champions League 3rd Place </p>
                <p><strong></strong> UAAP Season 81 Indoor Volleyball Champion</p>
                <p><strong></strong> 2016 ASEAN University Games 3rd Place</p>                
                <p><strong></strong> UAAP Season 76-77 Junior's Indoor Volleyball Best Blocker</p>`
                ,
        probs: [
            { rank: 1, team: "Capital1", pct: "-" },
            { rank: 2, team: "Choco Mucho", pct: "-" }
        ],
        timeline: [
            { date: "December 2025", event: "Became a free agent following the disbandment of Chery Tiggo" },
            { date: "2024", event: "Signed with the Chery Tiggo Crossovers" },  
            { date: "2020", event: "Made her PVL debut with the Choco Mucho Flying Titans" },     
            { date: "2018", event: "Made her semi-professional debut with the Ateneo-Motolite" },   
            { date: "2014 - 2019", event: "Represented Ateneo Blue Eagles in indoor volleyball" }       
        ],
    },

    "rachel-jorvina": {
        name: "Rachel Jorvina",
        img: "Tranfer Portal/2.png",
        stars: 2,
        pos: "Libero",
        league: "PVL",
        exp: "4 Years",
        video: "https://www.youtube.com/watch?v=0CV9sUqK61w",
        report: `<p><strong>Championship:</strong> None </p>
                <p><strong>Notable Awards:</strong> </p>
                <p><strong></strong> Broke Canada West record for most digs in a regular season match with 63 at Winnipeg on Jan. 25, 2020 </p>
                <p><strong></strong> Broke the program record for most digs in a CW regular season with 374 in 2019-20 (tied for eighth-most in CW history) </p>
                <p><strong></strong>  Also holds the Griffins' record for most digs/set in a CW regular season with 4.45 in 2019-20 (eighth best in CW history), while her 3.05 average in 2018-19 is sixth in MacEwan's record book</p>`
                ,
        probs: [
            { rank: 1, team: "Capital1", pct: "-" },
            { rank: 2, team: "Nxled Chameleons", pct: "-" }
        ],
        timeline: [
            { date: "December 2025", event: "Reportedly linked to a move to Capital1" },
            { date: "2024", event: "Transferred to Akari Sister Team Nxled Chameleon" },               
            { date: "2022", event: "Made her PVL debut with the Akari Power Chargers" },            
            { date: "2020 - 2022", event: "Studied at MacEwan University" }
        ],
    },

    "bia-general": {
        name: "Fatima Bia General",
        img: "Tranfer Portal/7.png",
        stars: 2,
        pos: "Libero",
        league: "PVL",
        exp: "12 Years",
        video: "https://www.youtube.com/watch?v=JXncdhzx6LU",
        report: `<p><strong>Championship:</strong> 4x Champion </p>
                <p><strong>Notable Awards:</strong> </p>
                <p><strong></strong> PVL 2014 V League Best Libero</p>                
                <p><strong></strong> PSL 2014 - 2015 PSL Grand Prix Champion </p>
                <p><strong></strong> 2012, 2014 PVL V League Champion </p>`
                ,
        probs: [
            { rank: 1, team: "Farm Fresh", pct: "-" },
            { rank: 2, team: "Choco Mucho", pct: "-" }
        ],
        timeline: [
            { date: "December 2025", event: "Reportedly linked to a move to Farm Fresh Foxies" },
            { date: "2024", event: "Signed with Choco Mucho Flying Titans (PVL)" },
            { date: "2022", event: "Played for Cignal Super Spikers" },
            { date: "2020", event: "Joined UAC Power Hitters" },
            { date: "2017", event: "Played for Generika Ayala Lifesavers" },
            { date: "2015", event: "Played for Foton Tornadoes" },
            { date: "2014", event: "Played for Shopinas.com Lady Clickers" },
            { date: "2012", event: "First played for NU Lady Bulldogs" }
        ],
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
    // 1. Get the search text from the input
    const input = document.getElementById("portalSearch");
    const filter = input.value.toLowerCase();
    
    // 2. Select the table and its body rows
    const table = document.querySelector(".portal-table");
    const tr = table.getElementsByTagName("tr");

    // 3. Loop through all rows (starting at index 1 to skip the header)
    for (let i = 1; i < tr.length; i++) {
        let rowMatch = false;
        const cells = tr[i].getElementsByTagName("td");

        // Check every cell in the current row
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell) {
                // Check if the cell text contains the search query
                if (cell.textContent.toLowerCase().indexOf(filter) > -1) {
                    rowMatch = true;
                    break; // Stop checking cells if we found a match in this row
                }
            }
        }

        // 4. Show or hide the row based on the match
        if (rowMatch) {
            tr[i].style.display = ""; // Show
        } else {
            tr[i].style.display = "none"; // Hide
        }
    }
}

function syncPortalFilters() {
    // 1. Get current values from both controls
    const searchVal = document.getElementById("portalSearch").value.toLowerCase();
    const statusVal = document.getElementById("statusDropdown").value.toLowerCase();
    
    // 2. Select all rows in the table body
    const tableRows = document.querySelectorAll(".portal-table tbody tr");

    tableRows.forEach(row => {
        // Status is in the 6th column (Index 5)
        const statusText = row.cells[5].textContent.toLowerCase();
        // Entire row text for the search bar
        const rowText = row.textContent.toLowerCase();

        // 3. Evaluate conditions
        const matchesSearch = rowText.includes(searchVal);
        const matchesStatus = (statusVal === "all" || statusText.includes(statusVal));

        // 4. Update visibility
        if (matchesSearch && matchesStatus) {
            row.style.display = ""; // Show row
            row.style.animation = "fadeIn 0.3s ease"; // Optional: adding a smooth entry
        } else {
            row.style.display = "none"; // Hide row
        }
    });
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