from flask import Flask , request, session, redirect, url_for, send_from_directory
from mongoManager import MongoManager
from dotenv import load_dotenv, find_dotenv
from flask_cors  import cross_origin, CORS
from datetime import timedelta
import os
load_dotenv(find_dotenv())

app = Flask(
    __name__,
    static_folder="static",
    static_url_path='',
)

CORS(app)

mongoManager = MongoManager()

app.secret_key = os.environ.get("SECRET_KEY")
app.config['SESSION_PERMANENT'] = True
app.permanent_session_lifetime = timedelta(days=30)


@app.route("/api/post/front-line-lens", methods=['POST'])
@cross_origin()
def postFrontLine():
    frontline = {
        "title" : request.form['title'],
        "message" : request.form['message'],
        "lat" : request.form['lat'],
        "long" : request.form['lng'],
        "audioPresent" : request.form['audioPresent']=='true'
    }
    id = mongoManager.add_frontline(frontline)
    image = request.files['image']
    image.save(os.path.join("./static/images", f"{id}.jpeg"))
    if(frontline['audioPresent']):
        audio = request.files['audio']
        audio.save(os.path.join("./static/audios", f"{id}.mp3"))
    print(frontline)
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

@app.get("/api/get/frontlines")
@cross_origin()
def get_frontlines():
    res = mongoManager.get_frontlines()
    for r in res:
        r['image'] = f"{request.url_root}/image/{r['_id']}"
        if(r['audioPresent']):
            r['audio'] = f"{request.url_root}/audio/{r['_id']}"

    return res

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



@app.get("/image/<imageid>")
@cross_origin()
def get_image(imageid):
    return send_from_directory (directory="./static/images", path=f"{imageid}.jpeg")


@app.get("/audio/<audioId>")
@cross_origin()
def get_audio(audioId):
    return send_from_directory (directory="./static/audios", path=f"{audioId}.mp3")


app.run(
    debug=True
)