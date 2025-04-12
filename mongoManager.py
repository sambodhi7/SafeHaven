import pymongo as mongo
from dotenv import load_dotenv, find_dotenv
import os
load_dotenv(find_dotenv())
CONNECTION_URL = os.environ.get("CONNECTION_URL")

class MongoManager:
    def __init__(self):
        self.client = mongo.MongoClient(CONNECTION_URL)