from flask import Flask,render_template,request
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

app = Flask(__name__) 
english_bot = ChatBot("Chatterbot",storage_adapter="chatterbot.storage.SQLStorageAdapter")
trainer = ChatterBotCorpusTrainer(english_bot)
trainer.train("chatterbot.corpus.english")
trainer.train("data/data.yml")


@app.route("/")
def index():
     return render_template("chat.html") #to send context to html

@app.route("/get")
def get_bot_response():
     userText = request.args.get("msg") #get data from input,we write js  to index.html
     i=0
     resp = []
     while i < 10:
          resp.append(english_bot.get_response(userText))
          i+=1
          #return str(english_bot.get_response(userText))
     new_menu = list(dict.fromkeys(resp))
     return str(new_menu)
     
if __name__ == "__main__":
     app.run(debug = True)


