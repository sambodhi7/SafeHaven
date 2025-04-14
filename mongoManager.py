import pymongo as mongo
from dotenv import load_dotenv, find_dotenv
import os
from datetime import datetime
load_dotenv(find_dotenv())
CONNECTION_URL = os.environ.get("CONNECTION_URL")

class MongoManager:
    def __init__(self):
        self.client = mongo.MongoClient(CONNECTION_URL)
        self.db = self.client['SafeHaven']
        self.debunks = self.db['Debunks']
        self.frontlines = self.db['Frontlines']

    def add_dbunk(self, title, fakeArticleUrl, reasons, correctInfo, sources, notes="" ):
        new_debunk = {
                'title' : title,
                'fakeArticleUrl': fakeArticleUrl,
                'reasons' : reasons,
                'correctInfo' :correctInfo,
                'sources' : sources,
                'notes' : notes,
                'date' : datetime.now()
            }
        self.debunks.insert_one(
            new_debunk
        )
        print(new_debunk)

    def get_debunks(self, offset=0):
        cur = self.debunks.find().sort({'date':-1}).skip(offset)
        res=[]
        for r in cur:
            r['_id'] = str(r['_id'])
            res.append(r)
        
        return (res)
    def add_frontline(self,fontline):
        res= self.frontlines.insert_one(
            {**fontline,
            "postedOn":datetime.now()}
        )
        return res.inserted_id
    
    def get_frontlines(self):
        curr = self.frontlines.find({}).sort({"postedOn":-1})
        res= []
        for r in curr:
            r['_id'] = str(r['_id'])
            r['lat'] = float(r['lat'])
            r['long'] = float(r['long'])
            res.append(r)
        return res

if __name__ == '__main__':
    m = MongoManager()
    print(m.get_debunks())

   