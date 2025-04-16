import pymongo as mongo
from dotenv import load_dotenv, find_dotenv
import os
from datetime import datetime
from datetime import timedelta
load_dotenv(find_dotenv())
CONNECTION_URL = os.environ.get("CONNECTION_URL")

class MongoManager:
    def __init__(self):
        self.client = mongo.MongoClient(CONNECTION_URL)
        self.db = self.client['SafeHaven']
        self.debunks = self.db['Debunks']
        self.frontlines = self.db['Frontlines']
        self.voices = self.db['voices']
        self.echoes = self.db['Echoes']

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

    def add_echo(self, echo):
        curr = self.echoes.insert_one(
            {
                **echo,
                "show" : False,
                "postedOn" : datetime.now()
            }
        )
        return curr.inserted_id
    
    def get_echos(self):
        ten_days_ago = datetime.today() - timedelta(days=10)
        curr = self.echoes.find({'postedOn':{ "$gt": ten_days_ago }}).sort({'postedOn':-1})
        res= [] 
        for r in curr:
            r['_id'] = str(r['_id'])
            res.append(r)
        return res
    
    def add_voice(self,voice):
        self.voices.insert_one({
            **voice,
            'postedOn' : datetime.now(),
        })
    
    def get_voices(self):
        curr = self.voices.find().sort({'postedOn':-1})
        res = []
        for c in curr:
            c['_id'] = str(c['_id'])
            res.append(c)
        return res

if __name__ == '__main__':
    m = MongoManager()
    print(m.get_debunks())

   