import sys
import os
import unittest

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.dirname(CURRENT_DIR)
WORKSPACE_DIR = os.path.dirname(BACKEND_DIR)

for path in [BACKEND_DIR, WORKSPACE_DIR]:
    if path not in sys.path:
        sys.path.insert(0, path)

from fastapi.testclient import TestClient

try:
    from backend.main import app, RecommendationResponse
except ImportError:
    from main import app, RecommendationResponse


class ContentPilotApiTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_root_endpoint(self):
        r = self.client.get("/")
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertIn("message", data)
        self.assertIn("ContentPilot API is running", data["message"])

    def test_health_check_endpoint(self):
        r = self.client.get("/api/health")
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertEqual(data["status"], "healthy")
        self.assertTrue(data["model_trained"])
        self.assertIn("Instagram", data["supported_platforms"])
        self.assertIn("Educational", data["allowed_content_types"])

    def test_recommendation_flow(self):
        payload = {
            "content": "5 Python libraries every data scientist should know",
            "content_type": "Educational",
            "goal": "Engagement"
        }
        r = self.client.post("/api/recommend", json=payload)
        self.assertEqual(r.status_code, 200)
        data = r.json()
        validated = RecommendationResponse(**data)
        self.assertTrue(len(validated.platform_recommendations) > 0)
        top_platform = validated.platform_recommendations[0]
        self.assertIn(str(top_platform.score), top_platform.reason)
        self.assertIsNotNone(validated.timing_recommendation.formatted_time)
        self.assertTrue(len(validated.content_optimization.hashtags) > 0)

    def test_platform_aliases(self):
        for alias in ["x", "twitter", "yt", "ig"]:
            r = self.client.post("/api/recommend", json={
                "content": "AI tools for developers",
                "preferred_platform": alias
            })
            self.assertEqual(r.status_code, 200)
            res = r.json()
            self.assertTrue(len(res["platform_recommendations"]) > 0)
            top_plat = res["platform_recommendations"][0]["platform"]
            if alias in ["x", "twitter"]:
                self.assertEqual(top_plat, "X/Twitter")
            elif alias == "yt":
                self.assertEqual(top_plat, "YouTube")
            elif alias == "ig":
                self.assertEqual(top_plat, "Instagram")

    def test_explicit_audience_priority(self):
        r = self.client.post("/api/recommend", json={
            "content": "Deep learning tutorials for research scientists",
            "target_audience": "Quantum Physicists"
        })
        self.assertEqual(r.status_code, 200)
        res = r.json()
        self.assertEqual(res["audience_recommendations"][0]["audience"], "Quantum Physicists")

    def test_empty_and_default_payload(self):
        r = self.client.post("/api/recommend", json={})
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertTrue(len(data["platform_recommendations"]) > 0)
        self.assertIn("content_analysis", data)
        self.assertIn("inferred_parameters", data)

    def test_auto_fill_endpoint(self):
        r = self.client.post("/api/auto-fill", json={
            "content": "Flash sale: 50% discount on summer sneakers today only"
        })
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertEqual(data["content_type"], "Promotional")
        self.assertEqual(data["goal"], "Conversions")
        self.assertIsNotNone(data["target_audience"])
        self.assertNotEqual(data["target_audience"], "AI/DS Students")

    def test_recommend_content_only_autofill(self):
        r = self.client.post("/api/recommend", json={
            "content": "How to make authentic Italian pasta carbonara step by step"
        })
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertEqual(data["content_analysis"]["content_type"], "Tutorial")
        self.assertIn(data["content_analysis"]["topic"], ["Food", "General"])
        self.assertTrue(data["inferred_parameters"]["is_content_type_inferred"])

        # Ensure project is general and no AI/DS Students in output
        audience_names = [a["audience"] for a in data["audience_recommendations"]]
        self.assertNotIn("AI/DS Students", audience_names)
        for exp in data["explanation"]:
            self.assertNotIn("AI/DS Students", exp)

    def test_what_to_know_about_ai_is_general(self):
        r = self.client.post("/api/recommend", json={
            "content": "What to know about AI"
        })
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertEqual(data["content_analysis"]["content_type"], "Educational")
        audience_names = [a["audience"] for a in data["audience_recommendations"]]
        self.assertNotIn("AI/DS Students", audience_names)
        for exp in data["explanation"]:
            self.assertNotIn("AI/DS Students", exp)


    def test_evaluate_test_dataset_endpoint(self):
        r = self.client.get("/api/evaluate-test-dataset?limit=5")
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertEqual(data["status"], "success")
        self.assertGreater(data["test_dataset_total_rows"], 1000)
        self.assertEqual(len(data["samples"]), 5)

    def test_unseen_inputs_compatibility(self):
        payload = {
            "content": "Exploring quantum neural holographic interfaces in biotechnology",
            "content_type": "Holographic",
            "preferred_platform": "Bluesky",
            "target_audience": "Biomedical Engineers",
            "goal": "Virality"
        }
        r = self.client.post("/api/recommend", json=payload)
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertTrue(len(data["platform_recommendations"]) > 0)
        self.assertGreater(data["expected_engagement"], 50.0)
        self.assertEqual(data["audience_recommendations"][0]["audience"], "Biomedical Engineers")


if __name__ == "__main__":
    unittest.main()


