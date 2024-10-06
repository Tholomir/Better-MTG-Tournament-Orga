# Draft Tournament Management System

This is a web-based application for managing a tournament using a Swiss-system format. The application allows users to add players, start rounds, view standings, and manage the tournament lifecycle, including finals and resetting the tournament.

## Features

- **Player Management**: Add up to 8 players before the tournament starts.
- **Round Management**: Automatically generate pairings for each round using a Swiss-system format.
- **Standings**: View current standings with match points, game win percentage, and opponents' match win percentage.
- **Finals**: Automatically schedule finals between the top two players after all rounds are completed.
- **Reset Tournament**: Reset the tournament to start fresh.

## Technologies Used

- **Flask**: A lightweight WSGI web application framework.
- **Flask-SQLAlchemy**: An ORM for managing database operations.
- **SQLite**: A lightweight database for storing tournament data.
- **Jinja2**: A templating engine for rendering HTML pages.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/tournament-management-system.git
   cd tournament-management-system
   ```

2. **Create a virtual environment**:

   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:

   - On Windows:

     ```bash
     venv\Scripts\activate
     ```

   - On macOS and Linux:

     ```bash
     source venv/bin/activate
     ```

4. **Install the dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

5. **Set up the database**:

   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```

## Usage

1. **Run the application**:

   ```bash
   flask run
   ```

2. **Access the application**:
   Open your web browser and go to `http://127.0.0.1:5000`.

3. **Add Players**:
   - Navigate to the "Add New Players" page and enter player names.
   - Ensure all player names are unique.

4. **Start Rounds**:
   - Click "Start Round" to begin a new round.
   - Enter match results after each round.

5. **View Standings**:
   - Check the current standings on the main page.

6. **Proceed to Finals**:
   - Once all rounds are completed, proceed to finals if applicable.

7. **Reset Tournament**:
   - Use the "Reset Tournament" button to clear all data and start over.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [your-email@example.com](mailto:your-email@example.com).
