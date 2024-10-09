# routes.py

from flask import render_template, redirect, url_for, request, flash  # Import necessary Flask functions
from models import db, Player, Match  # Import database models
from tournament import Tournament  # Import the Tournament class

def init_routes(app):
    tournament = Tournament()  # Create an instance of the Tournament class

    @app.route('/')  # Define the route for the index page
    def index():
        standings = tournament.calculate_standings()  # Calculate tournament standings
        finals_ready = tournament.all_rounds_completed()  # Check if all rounds are completed
        champion = tournament.get_champion()  # Get the current champion
        next_round_number = tournament.get_next_round_number()  # Get the next round number
        # Render the index template with the calculated data
        return render_template('index.html', standings=standings, finals_ready=finals_ready, champion=champion, tournament=tournament, next_round_number=next_round_number)

    @app.route('/add_player', methods=['GET', 'POST'])  # Define the route for adding a player
    def add_player():
        # Check if the last round has started; if so, prevent adding new players
        if tournament.get_last_started_round() >= 1:
            error = "Cannot add new players after the tournament has started."
            return render_template('add_player.html', error=error)  # Render the add player template with an error

        if request.method == 'POST':  # If the request method is POST, process the form
            players_added, error = tournament.add_players_from_form(request.form)  # Add players from the form data
            if players_added > 0:  # If players were added successfully
                return redirect(url_for('index'))  # Redirect to the index page
            else:
                return render_template('add_player.html', error=error)  # Render the add player template with an error

        return render_template('add_player.html')  # Render the add player template for GET requests

    @app.route('/start_round')  # Define the route to start a new round
    def start_round():
        next_round_number = tournament.get_next_round_number()  # Get the next round number
        if not next_round_number:  # If there is no next round
            return redirect(url_for('index'))  # Redirect to the index page
        success = tournament.start_round(next_round_number)  # Start the next round
        return redirect(url_for('view_round', round_number=next_round_number))  # Redirect to the view round page

    @app.route('/view_round/<int:round_number>', methods=['GET', 'POST'])  # Define the route to view a specific round
    def view_round(round_number):
        matches = Match.query.filter_by(round_number=round_number).all()  # Query matches for the specified round
        if request.method == 'POST':  # If the request method is POST, process the results
            results = {}  # Initialize a dictionary to store match results
            for match in matches:  # Iterate through each match
                if match.completed:  # Skip completed matches
                    continue
                if match.player2_id:  # Check if there is a second player
                    p1_score = request.form.get(f'match_{match.id}_p1_score')  # Get player 1's score from the form
                    p2_score = request.form.get(f'match_{match.id}_p2_score')  # Get player 2's score from the form
                    if p1_score is not None and p2_score is not None:  # If both scores are provided
                        results[match.id] = {  # Store the scores in the results dictionary
                            'player1_score': int(p1_score),
                            'player2_score': int(p2_score)
                        }
                else:
                    # Bye match, already completed
                    continue  # Skip bye matches
            tournament.submit_results(round_number, results)  # Submit the results for the round
            return redirect(url_for('index'))  # Redirect to the index page
        return render_template('view_round.html', matches=matches, tournament=tournament)  # Render the view round template

    @app.route('/finals')  # Define the route for the finals
    def finals():
        success = tournament.schedule_finals()  # Schedule the finals
        return redirect(url_for('view_round', round_number=tournament.total_rounds + 1))  # Redirect to the finals round

    @app.route('/reset_tournament', methods=['POST'])  # Define the route to reset the tournament
    def reset_tournament():
        tournament.reset()  # Reset the tournament
        flash("Tournament has been reset successfully.", "success")  # Flash a success message
        return redirect(url_for('index'))  # Redirect to the index page

    @app.route('/generic', methods=['GET'])  # Define a generic route
    def generic():
        return render_template('generic.html')  # Render the generic template
