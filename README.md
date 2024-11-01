# Tournament Management System for 6-Player Draft Events

## ________________________________________

## Project Overview

The Tournament Management System is a web-based application designed to facilitate and streamline the organization of competitive draft tournaments for six participants. Whether you're hosting a local gaming event, a community competition, or an online tournament, this system ensures a fair, efficient, and enjoyable experience for both organizers and players.

## ________________________________________

## Key Features

1. **Player Management**
    * **Registration:** Easily add and manage up to six players for each tournament.
    * **Profiles:** Maintain detailed player profiles, including names and performance statistics.
2. **Tournament Structure**
    * **Three Rounds of Play:** Organize the tournament into three competitive rounds, where each player faces three different opponents.
    * **Match Pairings:** Intelligent pairing algorithms match players with similar performance records while avoiding rematches.
    * **Finals (Optional):** An optional final match between the top two players, when the rankings are identical at the end, determines the tournament champion, ensuring a decisive and exciting conclusion.
3. **Scoring and Ranking**
    * **Match Points:** Assign points based on match outcomes (win, draw, loss) to accurately reflect player performance.
    * **Comprehensive Tiebreakers:** Implement advanced tiebreaker rules, including Opponents' Match-Win Percentage (OMW%), Game-Win Percentage (GW%), and Opponents' Game-Win Percentage (OGW%), ensuring precise and fair player rankings.
    * **Opponents' Match-Win Percentage (OMW%):** This measures the strength of the opponents a player has faced. It is the average win percentage of all the player’s opponents. The idea is that if you played against stronger opponents (who won more of their matches), your OMW% will be higher, reflecting the difficulty of your matchups. This is calculated by dividing the number of matches won by the opponents by the total number of matches they played.
    * **Game-Win Percentage (GW%):** GW% focuses on individual games rather than matches. It is the percentage of games that the player has won out of the total number of games they've played. This shows how dominant a player has been in their games, even if they lost some matches.
    * **Opponents' Game-Win Percentage (OGW%):** Similar to OMW%, OGW% calculates the average game-win percentage of all the player’s opponents. This further refines ranking by considering how well a player's opponents performed at the game level. It helps differentiate between players who faced strong opponents with consistent game performance versus weaker opponents.
4. **Real-Time Standings**
    * **Dynamic Leaderboard:** Display current standings with all relevant statistics, updated in real-time as matches conclude.
    * **Champion Announcement:** Clearly identify and announce the tournament champion upon completion of all rounds and finals.
5. **Reset Functionality**
    * **Tournament Reset:** Easily reset the tournament to clear all existing data, allowing organizers to start fresh for new events without residual information from previous tournaments.
6. **Advanced Features**
    * **Scheduling Tools:** Advanced scheduling options to manage match times, ensuring efficient use of time and resources.
    * **Reporting and Analytics:** Generate detailed reports and visualizations on player performance, match outcomes, and overall tournament statistics.
    * **Mobile-Friendly Design:** Ensure the application is fully responsive, providing an optimal experience on both desktop and mobile devices.
    * **Gamification Elements:** Introduce achievements, badges, and leaderboards to enhance player engagement and motivation.
    * **Secure Data Handling:** Implement robust security measures to protect player data and ensure the integrity of tournament information.

## ________________________________________

Current Functionality:
Frontend:
Tournament Selection: Users can select from a list of tournaments displayed in a dropdown menu.
Player List: The player list for the selected tournament is dynamically generated and displayed.
Player Information: Each player in the list displays their username, icon, and basic statistics (wins, losses, draws).
Add Player Dialog: A dialog box allows users to add new players with username, full name, and icon selection.
Material Design Components: The frontend utilizes Material Design components for a consistent and visually appealing user interface.
Backend:
API Endpoints:
/api/players: Retrieves all player data from Players.JSON.
/api/players: Adds a new player to Players.JSON.
/api/tournaments: Retrieves all tournament data from Tournaments.JSON.
Data Storage: Tournament and player data are stored in JSON files (Tournaments.JSON and Players.JSON).
Data Validation: Basic validation is implemented for new player data to ensure required fields are present.

## ________________________________________

## Benefits

* **Fair Competition:** Ensures that all players compete under the same rules and conditions, promoting a level playing field.
* **Efficiency:** Automates the tedious aspects of tournament management, such as pairings and scoring, saving valuable time for organizers.
* **Transparency:** Clear and detailed standings with comprehensive statistics allow players to track their performance accurately.
* **Flexibility:** Optional finals, multiple tournament support, and customizable rules provide organizers with the tools to tailor the tournament structure as needed.
* **Engagement:** Features like chat, notifications, and gamification elements enhance player interaction and enjoyment.
* **Scalability:** While designed for six players, the system can be adapted to accommodate different numbers of participants and multiple tournaments for future expansions.
* **Accessibility:** Mobile-friendly and multi-language support ensure that the application is usable by a wide range of participants.

## ________________________________________

## Project Structure
Better MTG Tournament Organizer
├── backend
│   ├── server.js
│   ├── tournamentLogic.js
│   └── data
│       ├── Tournaments.JSON
│       └── Players.JSON
└── js
    └── uiLogic.js

## ________________________________________