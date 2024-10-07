# test_tournament.py

import unittest
from tournament import Tournament
from models import Player, Match, db
from app import create_app  # Import your Flask app factory

class TestTournament(unittest.TestCase):

    def setUp(self):
        self.app = create_app()  # Create an instance of the app
        self.app_context = self.app.app_context()
        self.app_context.push()  # Push the app context
        db.create_all()
        self.players = [
            Player(name="Player 1"),
            Player(name="Player 2"),
            Player(name="Player 3"),
            Player(name="Player 4")
        ]
        for player in self.players:
            db.session.add(player)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()  # Pop the app context

    def test_start_round(self):
        tournament = Tournament(total_rounds=3)
        self.assertTrue(tournament.start_round(1))
        matches = Match.query.filter_by(round_number=1).all()
        self.assertEqual(len(matches), 2)

    def test_submit_results(self):
        tournament = Tournament(total_rounds=3)
        tournament.start_round(1)
        matches = Match.query.filter_by(round_number=1).all()
        results = {match.id: {'player1_score': 2, 'player2_score': 1} for match in matches}
        tournament.submit_results(1, results)
        for match in matches:
            self.assertTrue(match.completed)
            self.assertEqual(match.player1_score, 2)
            self.assertEqual(match.player2_score, 1)

if __name__ == '__main__':
    unittest.main()