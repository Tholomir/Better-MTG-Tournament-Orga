# tournament.py

from models import Player, Match, db
import random

class Tournament:
    def __init__(self, total_rounds=3):
        self.total_rounds = total_rounds

    def start_round(self, round_number):
        if Match.query.filter_by(round_number=round_number).first():
            # Round already exists
            return False

        players = Player.query.all()
        if len(players) < 2:
            # Not enough players
            return False

        pairings = self.generate_pairings(round_number, players)
        for p1, p2 in pairings:
            if p2:
                match = Match(round_number=round_number, player1_id=p1.id, player2_id=p2.id)
            else:
                # Assign bye to p1
                p1.match_points += 3  # Award match points for bye
                db.session.add(p1)
                match = Match(
                    round_number=round_number,
                    player1_id=p1.id,
                    player2_id=None,
                    player1_score=2,  # Arbitrary score for bye
                    player2_score=0,
                    completed=True
                )
            db.session.add(match)
        db.session.commit()
        return True

    def generate_pairings(self, round_number, players):
        if round_number == 1:
            # Random pairings for Round 1
            shuffled_players = players[:]
            random.shuffle(shuffled_players)
            pairings = [
                (shuffled_players[i], shuffled_players[i + 1] if i + 1 < len(shuffled_players) else None)
                for i in range(0, len(shuffled_players), 2)
            ]
        else:
            # Swiss-system pairings
            sorted_players = sorted(players, key=lambda x: x.match_points, reverse=True)
            pairings = []
            paired_players = set()
            for player in sorted_players:
                if player in paired_players:
                    continue
                for opponent in sorted_players:
                    if opponent in paired_players or opponent == player:
                        continue
                    if not self.have_played_each_other(player, opponent):
                        pairings.append((player, opponent))
                        paired_players.update([player, opponent])
                        break
                else:
                    # No available opponent, assign bye
                    pairings.append((player, None))
                    paired_players.add(player)
            # Handle any unpaired players (assign byes)
            for player in sorted_players:
                if player not in paired_players:
                    pairings.append((player, None))
            return pairings
        return pairings

    def have_played_each_other(self, player1, player2):
        if not player2:
            return False
        match = Match.query.filter(
            ((Match.player1_id == player1.id) & (Match.player2_id == player2.id)) |
            ((Match.player1_id == player2.id) & (Match.player2_id == player1.id))
        ).first()
        return match is not None

    def submit_results(self, round_number, results):
        matches = Match.query.filter_by(round_number=round_number).all()
        for match in matches:
            if match.completed:
                continue
            match_result = results.get(match.id)
            if match_result:
                match.player1_score = match_result['player1_score']
                match.player2_score = match_result['player2_score']
                match.completed = True
                self.update_player_records(match, is_finals=(round_number == self.total_rounds + 1))
        db.session.commit()

    def update_player_records(self, match, is_finals=False):
        player1 = Player.query.get(match.player1_id)
        player1.game_wins += match.player1_score
        player1.game_losses += match.player2_score

        if match.player2_id:
            player2 = Player.query.get(match.player2_id)
            player2.game_wins += match.player2_score
            player2.game_losses += match.player1_score

            if not is_finals:
                if match.player1_score > match.player2_score:
                    player1.match_points += 3
                elif match.player1_score < match.player2_score:
                    player2.match_points += 3
                else:
                    player1.match_points += 1
                    player2.match_points += 1
        else:
            # Bye: Player 1 already awarded match points during pairing
            pass

        db.session.commit()

    def calculate_standings(self):
        players = Player.query.all()
        standings = []
        for player in players:
            mp = player.match_points
            gwp = self.calculate_gwp(player)
            omwp = self.calculate_omwp(player)
            standings.append({
                'player': player,
                'match_points': mp,
                'game_win_percentage': gwp,
                'opponents_match_win_percentage': omwp
            })
        standings.sort(key=lambda x: (
            x['match_points'],
            x['opponents_match_win_percentage'],
            x['game_win_percentage']
        ), reverse=True)
        return standings

    def calculate_gwp(self, player):
        total_games = player.game_wins + player.game_losses
        if total_games == 0:
            return 0
        return player.game_wins / total_games

    def calculate_omwp(self, player):
        opponents = self.get_opponents(player)
        if not opponents:
            return 0
        total_omwp = sum(opponent.match_points for opponent in opponents)
        max_points = len(opponents) * 3
        return total_omwp / max_points if max_points > 0 else 0

    def get_opponents(self, player):
        matches = Match.query.filter(
            ((Match.player1_id == player.id) | (Match.player2_id == player.id)) &
            (Match.completed == True)
        ).all()
        opponent_ids = []
        for match in matches:
            if match.player1_id == player.id and match.player2_id:
                opponent_ids.append(match.player2_id)
            elif match.player2_id == player.id:
                opponent_ids.append(match.player1_id)
        return Player.query.filter(Player.id.in_(opponent_ids)).all()

    def all_rounds_completed(self):
        completed_rounds = set(match.round_number for match in Match.query.filter_by(completed=True).all())
        return all(round_number in completed_rounds for round_number in range(1, self.total_rounds + 1))

    def get_champion(self):
        final_match = Match.query.filter_by(round_number=self.total_rounds + 1).first()
        if final_match and final_match.completed:
            if final_match.player1_score > final_match.player2_score:
                return Player.query.get(final_match.player1_id)
            elif final_match.player1_score < final_match.player2_score:
                return Player.query.get(final_match.player2_id)
            else:
                return "Tie"
        return None

    def schedule_finals(self):
        if Match.query.filter_by(round_number=self.total_rounds + 1).first():
            # Finals already scheduled
            return False

        standings = self.calculate_standings()
        if len(standings) < 2:
            # Not enough players
            return False

        top_two_players = standings[:2]
        final_match = Match(
            round_number=self.total_rounds + 1,
            player1_id=top_two_players[0]['player'].id,
            player2_id=top_two_players[1]['player'].id
        )
        db.session.add(final_match)
        db.session.commit()
        return True

    def is_round_completed(self, round_number):
        matches = Match.query.filter_by(round_number=round_number).all()
        if not matches:
            return False
        return all(match.completed for match in matches)

    def get_last_completed_round(self):
        completed_rounds = [match.round_number for match in Match.query.filter_by(completed=True).all()]
        return max(completed_rounds) if completed_rounds else 0

    def get_next_round_number(self):
        last_round_completed = self.get_last_completed_round()
        next_round_number = last_round_completed + 1

        if next_round_number > 1 and not self.is_round_completed(next_round_number - 1):
            return None
        if next_round_number > self.total_rounds:
            return None
        return next_round_number

    def get_last_started_round(self):
        started_rounds = [match.round_number for match in Match.query.with_entities(Match.round_number).distinct()]
        return max(started_rounds) if started_rounds else 0