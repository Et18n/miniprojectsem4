from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/process", methods=["POST","GET"])
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
