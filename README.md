# Tournament Organizer

This project is a web application for managing tournaments, players, and matches. It utilizes a simple backend built with Node.js and Express.js to handle data persistence and API requests.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/tournament-organizer.git
   ```

2. **Navigate to the backend directory:**

   ```bash
   cd tournament-organizer/backend
   ```

3. **Install dependencies:** Ensure Node.js is installed on your system.

   ```bash
   npm install
   ```

4. **Start the server:**

   ```bash
   node server.js
   ```

   The server runs on `http://localhost:3000` by default.

5. **Open the application:** Open `index.html` in your browser or use a local server (e.g., Live Server in VSCode).

## Usage Guide

### Player Management

* **Add a Player:** Click the "Add Player" button, enter the required details, and submit.
* **Remove a Player:** Open the "Remove Player" dialog and select the player to delete.

### Tournament Management

* **Create a Tournament:** Use the "Create New Tournament" button to start a tournament.
* **Select Players:** Choose players for the tournament using the "Select Tournament Players" dialog.
* **View Tournament:** Select a tournament from the dropdown to see its details and players.

### Match Management

* **View Matches:** Display matches loaded from the server.
* **Add Matches:** Add new match data using the provided interface.
* **Filter Matches:** Filter match results by tournament ID.

## File Structure
backend/
│
├── data/
│   ├── Matches.JSON
│   ├── Players.JSON
│   └── Tournaments.JSON
│
├── node_modules/
│
├── package-lock.json
├── package.json
├── server.js
│
├── css/
│   ├── dark.css
│   ├── light.css
│   └── styles.css
│
├── js/
│   ├── main.js
│   ├── MatchManager.js
│   ├── PlayerManager.js
│   ├── TournamentManager.js
│   └── UIManager.js
│
├── material/
│
├── .gitignore
├── index.html
├── README.md
├── requirements01.txt
└── TournamentOrgaApp_icon.png


## Backend Data Structure

1. **Players Data (Players.JSON)**

   File path: `/backend/data/Players.JSON`

   Structure:

   ```json
   {
     "players": [
       {
         "player_id": 1,
         "username": "DragonSlayer",
         "full_name": "Alice Johnson",
         "registration_date": "2024-01-15T08:30:00Z",
         "statistics": {
           "total_matches": 15,
           "wins": 9,
           "draws": 3,
           "losses": 3,
           "game_win_percentage": 75
         },
         "achievements": ["First Win", "Sharp Shooter", "Consistent Performer"],
         "icon": "emoji_events"
       },
       ...
     ]
   }
   ```

2. **Tournaments Data (Tournaments.JSON)**

   File path: `/backend/data/Tournaments.JSON`

   Structure:

   ```json
   {
     "tournaments": [
       {
         "tournament_id": 101,
         "name": "Bloomburrow Championship 2024",
         "created_at": "2024-06-25T12:00:00Z",
         "start_date": "2024-07-01T10:00:00Z",
         "end_date": "2024-07-10T18:00:00Z",
         "rounds": 3,
         "status": "Ongoing",
         "current_round": 2,
         "players": [1, 3, 4, 6]
       },
       ...
     ]
   }
   ```

3. **Matches Data (Matches.JSON)**

   File path: `/backend/data/Matches.JSON`

   Structure:

   ```json
   {
     "matches": [
       {
         "match_id": 1001,
         "date": "2024-07-01T10:00:00Z",
         "tournament_id": 101,
         "round": 1,
         "player1_id": 1,
         "player2_id": 4,
         "score_player1": 1,
         "score_player2": 0
       },
       ...
     ]
   }
   ```

## Server API Logic

### Overview

The backend server is built with Node.js and Express.js. It handles data operations such as fetching and modifying player and tournament information.

### Endpoints

1. **Player Management**

   * `GET /api/players`: Retrieve all players.
   * `POST /api/players`: Add a new player.
     Request body:

     ```json
     {
       "username": "FlamingWinner",
       "full_name": "Nurit Andersch",
       "icon": "owl"
     }
     ```
   * `DELETE /api/players/:id`: Delete a player by their id.

2. **Tournament Management**

   * `GET /api/tournaments`: Retrieve all tournaments.
   * `PUT /api/tournaments/:tournamentId/players`: Update players in a specific tournament.
     Request body:

     ```json
     {
       "players": [1, 2, 3, 4]
     }
     ```

### Helper Functions

* `readJSONFile(filePath)`: Reads and returns data from a JSON file.
* `writeJSONFile(filePath, data)`: Writes updated data to a JSON file.

## Running the Server

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Start the server:

   ```bash
   node server.js
   ```

   The server runs on `http://localhost:3000` by default.

## Example API Responses

* `GET /api/players` Response:

   ```json
   {
     "players": [
       {
         "player_id": 1,
         "username": "DragonSlayer",
         "full_name": "Alice Johnson",
         "statistics": { "total_matches": 15, "wins": 9, "draws": 3, "losses": 3 },
         "achievements": ["First Win", "Sharp Shooter"],
         "icon": "emoji_events"
       },
       ...
     ]
   }
   ```

* `POST /api/players` Response:

   ```json
   {
     "message": "Player added successfully",
     "player": {
       "player_id": 9,
       "username": "FlamingWinner",
       "full_name": "Nurit Andersch",
       "registration_date": "2024-11-01T19:59:12.248Z",
       "statistics": { "total_matches": 0, "wins": 0, "draws": 0, "losses": 0 },
       "achievements": [],
       "icon": "owl"
     }
   }
   ```

* `DELETE /api/players/:id` Response:

   ```json
   {
     "message": "Player deleted successfully"
   }
   ```

## Technologies Used

* **Frontend:** HTML, CSS (Bootstrap, custom styles), JavaScript
* **Backend:** Node.js, Express.js
* **Storage:** JSON files for data persistence
* **Libraries:** Material Design Components, Bootstrap, CORS, Body-Parser