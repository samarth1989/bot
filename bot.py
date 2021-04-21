from flask import Flask,render_template,request
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

app = Flask(__name__) 
english_bot = ChatBot("Chatterbot",storage_adapter="chatterbot.storage.SQLStorageAdapter")
trainer = ChatterBotCorpusTrainer(english_bot)
#trainer.train("chatterbot.corpus.english")
trainer.train("data/data.yml")


@app.route("/")
def index():
     return render_template("home.html") #to send context to html

@app.route("/filter")
def filter():
     type_1=request.args.get("typee",default="rent",type=str)
     price=request.args.get("price",default="rent",type=str)
     return render_template("filterhome.html") #to send context to html

@app.route("/get")
def get_bot_response():
     userText = request.args.get("msg") #get data from input,we write js  to index.html
     txt=english_bot.get_response(userText)
     return str(txt)

@app.route("/details")
def detailspage():
     id=request.args.get("id",default="1",type=str)
     return render_template('housedetails.html') 

@app.route("/appointment")
def appointmentpage():
     id=request.args.get("id",default="1",type=str)
     return render_template('appointment.html')           

if __name__ == "__main__":
     app.run()
 