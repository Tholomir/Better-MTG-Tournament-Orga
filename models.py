# models.py

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Player(db.Model):
    __tablename__ = 'player'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    match_points = db.Column(db.Integer, default=0)
    game_wins = db.Column(db.Integer, default=0)
    game_losses = db.Column(db.Integer, default=0)

class Match(db.Model):
    __tablename__ = 'match'
    id = db.Column(db.Integer, primary_key=True)
    round_number = db.Column(db.Integer, nullable=False)
    player1_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    player2_id = db.Column(db.Integer, db.ForeignKey('player.id'))
    player1_score = db.Column(db.Integer, default=0)
    player2_score = db.Column(db.Integer, default=0)
    completed = db.Column(db.Boolean, default=False)

    player1 = db.relationship('Player', foreign_keys=[player1_id], backref='player1_matches')
    player2 = db.relationship('Player', foreign_keys=[player2_id], backref='player2_matches')
