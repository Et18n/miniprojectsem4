from flask import Flask, request, jsonify
from flask_cors import CORS


import string
from collections import Counter
import matplotlib.pyplot as plt
from nltk.corpus import stopwords
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.tokenize import word_tokenize


app = Flask(__name__)
CORS(app)

@app.route("/process", methods=["POST","GET"])
def finalize(text):
    lowercase_text = text.lower()
    cleaned_text = lowercase_text.translate(str.maketrans("", "", string.punctuation))
    tokenized = word_tokenize(cleaned_text, "english")

    final_words = []
    for word in tokenized:
        if word not in stopwords.words("english"):
            final_words.append(word)

    emotion_list = []
    with open("emotions.txt", "r") as file:
        for line in file:
            clear_line = line.replace("\n", "").replace(",", "").replace("'", "").strip()
            word, emotion = clear_line.split(":")
            if word in final_words:
                emotion_list.append(emotion)

    print(emotion_list)


    def Analyszer(sentiment_text):
        score = SentimentIntensityAnalyzer().polarity_scores(sentiment_text)
        negative = score["neg"]
        positve = score["pos"]
        if negative > positve:
            print("Negative")
        elif positve > negative:
            print("Positive")
        else:
            print("Neutral")


        Analyszer(cleaned_text)
        emotion_counter = Counter(emotion_list)
        print(emotion_counter)
        fig, ax1 = plt.subplots()
        ax1.bar(emotion_counter.keys(), emotion_counter.values())
        fig.autofmt_xdate()

        plt.savefig("grph.png")
        plt.show()


def analyze():
        print(request)
        body=request.get_json(force=True)
        if request.method == "POST":
            text = body['text_analyze']
            print(text)
            return text,200
        elif request.method=="GET":
            return "got ",400
        else:
            return "SERVER DIES", 400


if __name__ == "__main__":
    app.run(debug=True, port=8080)


