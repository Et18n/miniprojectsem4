from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/process", methods=["POST","GET"])
def analyze():
    if request.method == "POST":
        text = request.form.get("text_analyze")
        return "empty"


if __name__ == "__main__":
    app.run(debug=True, port=8080)
