from flask import Flask, request, jsonify, render_template
from algorithm import select_transport

app = Flask(__name__, template_folder="../frontend/templates", static_folder="../frontend/static")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.json
    mode = data.get("mode")
    weight = float(data.get("weight"))
    distance = float(data.get("distance"))
    result = select_transport(mode, weight, distance)
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True)
