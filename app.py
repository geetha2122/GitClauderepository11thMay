from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import date

app = Flask(__name__)
CORS(app)

SESSIONS = {
    date.today().isoformat(): [
        {"id": 1, "title": "Team Standup", "time": "09:00", "type": "event", "description": "Daily team sync"},
        {"id": 2, "title": "Submit Q2 Report", "time": "12:00", "type": "task", "description": "Complete and submit quarterly report"},
        {"id": 3, "title": "Doctor Appointment", "time": "14:00", "type": "reminder", "description": "Annual checkup"},
    ]
}


@app.route("/api/sessions")
def get_sessions():
    date_param = request.args.get("date", date.today().isoformat())
    sessions = SESSIONS.get(date_param, [])
    return jsonify({"date": date_param, "sessions": sessions})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
