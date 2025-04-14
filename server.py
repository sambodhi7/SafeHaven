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


@app.route("/api/post/front-line-lens", methods=['POST'])
@cross_origin()
def postFrontLine():
    print(request.form['title'])
    return "hello"

@app.route("/api/debunks", methods=["POST"])
@cross_origin()
def get_debunks():
    offset = request.json['offset']
    res = mongoManager.get_debunks(offset=offset)
    return {
        'success' : True,
        'debunks' : res
    }

@app.route("/api/post/debunk", methods=['POST'])
@cross_origin()
def post_debunk():
    debunk = request.json['debunk']
    debunk.pop('_id')
    debunk.pop('date')
    try:
        mongoManager.add_dbunk(**debunk)
        return {
            "success" : True,
        }
    except Exception as e:
        print(e)
        return {
            "success" : False,

        }


app.run(
    debug=True
)