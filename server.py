from flask import Flask , request, session, redirect, url_for
from mongoManager import MongoManager
from dotenv import load_dotenv, find_dotenv
from flask_cors  import cross_origin, CORS
from datetime import timedelta
import os
load_dotenv(find_dotenv())

app = Flask(
    __name__
)

CORS(app)

mongoManager = MongoManager()

app.secret_key = os.environ.get("SECRET_KEY")
app.config['SESSION_PERMANENT'] = True
app.permanent_session_lifetime = timedelta(days=30)

print(os.environ.get('SECRET_KEY'))