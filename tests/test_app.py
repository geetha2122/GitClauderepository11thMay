import unittest
from datetime import date
from app import app, SESSIONS


class TestSessionsAPI(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.today = date.today().isoformat()

    def test_get_sessions_default_date_returns_today(self):
        response = self.client.get("/api/sessions")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["date"], self.today)

    def test_get_sessions_today_explicit_returns_sessions(self):
        response = self.client.get(f"/api/sessions?date={self.today}")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(len(data["sessions"]), 3)

    def test_get_sessions_unknown_date_returns_empty(self):
        response = self.client.get("/api/sessions?date=2000-01-01")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["date"], "2000-01-01")
        self.assertEqual(data["sessions"], [])

    def test_response_has_required_keys(self):
        response = self.client.get("/api/sessions")
        data = response.get_json()
        self.assertIn("date", data)
        self.assertIn("sessions", data)

    def test_sessions_have_required_fields(self):
        response = self.client.get(f"/api/sessions?date={self.today}")
        data = response.get_json()
        for session in data["sessions"]:
            for field in ("id", "title", "time", "type", "description"):
                self.assertIn(field, session)

    def test_sessions_contain_all_types(self):
        response = self.client.get(f"/api/sessions?date={self.today}")
        data = response.get_json()
        types = {s["type"] for s in data["sessions"]}
        self.assertIn("event", types)
        self.assertIn("task", types)
        self.assertIn("reminder", types)

    def test_response_content_type_is_json(self):
        response = self.client.get("/api/sessions")
        self.assertIn("application/json", response.content_type)


if __name__ == "__main__":
    unittest.main()
