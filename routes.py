# routes.py

from flask import render_template, redirect, url_for, request, flash
from models import db, Player, Match
from tournament import Tournament

def init_routes(app):
    tournament = Tournament()

    @app.route('/')
    def index():
        standings = tournament.calculate_standings()
        finals_ready = tournament.all_rounds_completed()
        champion = tournament.get_champion()
        next_round_number = tournament.get_next_round_number()
        return render_template('index.html', standings=standings, finals_ready=finals_ready, champion=champion, tournament=tournament, next_round_number=next_round_number)

    @app.route('/add_player', methods=['GET', 'POST'])
    def add_player():
        if tournament.get_last_started_round() >= 1:
            error = "Cannot add new players after the tournament has started."
            return render_template('add_player.html', error=error)

        if request.method == 'POST':
            players_added = 0
            for i in range(1, 9):
                name = request.form.get(f'name{i}')
                if name and name.strip():
                    player = Player(name=name.strip())
                    db.session.add(player)
                    players_added += 1
            db.session.commit()
            if players_added > 0:
                return redirect(url_for('index'))
            else:
                error = "At least one player name must be provided."
                return render_template('add_player.html', error=error)

        return render_template('add_player.html')

    @app.route('/start_round')
    def start_round():
        next_round_number = tournament.get_next_round_number()
        if not next_round_number:
            # Cannot start next round
            return redirect(url_for('index'))
        success = tournament.start_round(next_round_number)
        return redirect(url_for('view_round', round_number=next_round_number))

    @app.route('/view_round/<int:round_number>', methods=['GET', 'POST'])
    def view_round(round_number):
        matches = Match.query.filter_by(round_number=round_number).all()
        if request.method == 'POST':
            results = {}
            for match in matches:
                if match.completed:
                    continue
                if match.player2_id:
                    p1_score = request.form.get(f'match_{match.id}_p1_score')
                    p2_score = request.form.get(f'match_{match.id}_p2_score')
                    if p1_score is not None and p2_score is not None:
                        results[match.id] = {
                            'player1_score': int(p1_score),
                            'player2_score': int(p2_score)
                        }
                else:
                    # Bye match, already completed
                    continue
            tournament.submit_results(round_number, results)
            return redirect(url_for('index'))
        return render_template('view_round.html', matches=matches, tournament=tournament)

    @app.route('/finals')
    def finals():
        success = tournament.schedule_finals()
        return redirect(url_for('view_round', round_number=tournament.total_rounds + 1))

    @app.route('/reset_tournament', methods=['POST'])
    def reset_tournament():
        tournament.reset()
        flash("Tournament has been reset successfully.", "success")
        return redirect(url_for('index'))
