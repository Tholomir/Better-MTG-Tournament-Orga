# app.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import db
from routes import init_routes

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tournament.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_secret_key'  # Replace with a secure key in production

    db.init_app(app)

    # Add 'enumerate' to Jinja2 globals
    app.jinja_env.globals.update(enumerate=enumerate)

    with app.app_context():
        db.create_all()
        init_routes(app)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
