import os
import sys
from contextlib import asynccontextmanager
from typing import Optional, List, Any

# Ensure backend directory is in sys.path regardless of how/where python is launched
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

try:
    from backend.recommender import (
        RecommendationEngine,
        ALLOWED_CONTENT_TYPES,
        ALLOWED_GOALS,
        SUPPORTED_PLATFORMS,
        AUDIENCE_PROFILES,
        TOPIC_CATEGORIES
    )
except ImportError:
    from recommender import (
        RecommendationEngine,
        ALLOWED_CONTENT_TYPES,
        ALLOWED_GOALS,
        SUPPORTED_PLATFORMS,
        AUDIENCE_PROFILES,
        TOPIC_CATEGORIES
    )

# Initialize RecommendationEngine singleton using train.csv
WORKSPACE_ROOT = os.path.dirname(CURRENT_DIR)
TRAIN_CSV_PATH = os.path.join(WORKSPACE_ROOT, "train.csv")
TEST_CSV_PATH = os.path.join(WORKSPACE_ROOT, "test.csv")
recommender_engine = RecommendationEngine(data_path=TRAIN_CSV_PATH)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.
    Loads data and trains the engagement prediction model once on startup.
    """
    print("[ContentPilot] Initializing recommendation pipeline and training ML model...")
    try:
        recommender_engine.initialize()
        print("[ContentPilot] Model trained successfully! Ready to serve requests.")
    except Exception as e:
        print(f"[ContentPilot] Warning during initialization: {e}. Fallback mode active.")
    yield
    print("[ContentPilot] Shutting down ContentPilot API.")


app = FastAPI(
    title="ContentPilot API",
    description="An Intelligent AI System for Content, Platform, Audience and Timing Recommendation",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS for frontend support
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==============================================================================
# PYDANTIC SCHEMAS (Graceful & resilient validation for any input)
# ==============================================================================

class RecommendRequest(BaseModel):
    content: Optional[str] = Field(
        default="What to know about AI",
        description="The content text, post idea, draft, or any input to evaluate",
        examples=["What to know about AI"]
    )
    content_type: Optional[str] = Field(
        default=None,
        description=f"Type of content (optional - auto-detected from content if null or omitted). Allowed: {ALLOWED_CONTENT_TYPES}",
        examples=[None]
    )
    goal: Optional[str] = Field(
        default=None,
        description=f"Primary objective (optional - auto-detected from content if null or omitted). Allowed: {ALLOWED_GOALS}",
        examples=[None]
    )
    preferred_platform: Optional[str] = Field(
        default=None,
        description=f"Optional preferred platform (auto-selected if null or omitted). Supported: {SUPPORTED_PLATFORMS}",
        examples=[None]
    )
    target_audience: Optional[str] = Field(
        default=None,
        description=f"Optional target audience (auto-detected if null or omitted). Profiles: {AUDIENCE_PROFILES}",
        examples=[None]
    )

    @field_validator("content", mode="before")
    @classmethod
    def sanitize_content(cls, v: Any) -> str:
        if v is None:
            return "General Content Post"
        clean = str(v).strip()
        if not clean:
            return "General Content Post"
        return clean

    @field_validator("content_type", mode="before")
    @classmethod
    def sanitize_content_type(cls, v: Any) -> Optional[str]:
        if v is None:
            return None
        clean = str(v).strip()
        if not clean or clean.lower() in ["none", "null", "auto", "string"]:
            return None
        # Match case-insensitively with standard allowed types
        match = next((item for item in ALLOWED_CONTENT_TYPES if item.lower() == clean.lower()), None)
        return match if match else clean.title()

    @field_validator("goal", mode="before")
    @classmethod
    def sanitize_goal(cls, v: Any) -> Optional[str]:
        if v is None:
            return None
        clean = str(v).strip()
        if not clean or clean.lower() in ["none", "null", "auto", "string"]:
            return None
        # Match case-insensitively with standard allowed goals
        match = next((item for item in ALLOWED_GOALS if item.lower() == clean.lower()), None)
        return match if match else clean.title()

    @field_validator("preferred_platform", mode="before")
    @classmethod
    def sanitize_platform(cls, v: Any) -> Optional[str]:
        if v is None:
            return None
        clean = str(v).strip()
        if not clean or clean.lower() in ["none", "null", "auto", "string"]:
            return None

        clean_lower = clean.lower()
        if clean_lower in ["x", "twitter", "x/twitter"]:
            return "X/Twitter"
        if clean_lower in ["yt", "youtube"]:
            return "YouTube"
        if clean_lower in ["ig", "insta", "instagram"]:
            return "Instagram"
        if clean_lower in ["li", "linkedin"]:
            return "LinkedIn"
        if clean_lower in ["tt", "tiktok"]:
            return "TikTok"
        if clean_lower in ["fb", "facebook"]:
            return "Facebook"
        if clean_lower in ["threads"]:
            return "Threads"

        for plat in SUPPORTED_PLATFORMS:
            if plat.lower() == clean_lower:
                return plat
        return clean.title()

    @field_validator("target_audience", mode="before")
    @classmethod
    def sanitize_audience(cls, v: Any) -> Optional[str]:
        if v is None:
            return None
        clean = str(v).strip()
        if not clean or clean.lower() in ["none", "null", "auto", "string"]:
            return None

        clean_lower = clean.lower()
        for aud in AUDIENCE_PROFILES:
            if aud.lower() == clean_lower:
                return aud
        return clean.title()


class AutoFillRequest(BaseModel):
    content: str = Field(
        default="What to know about AI",
        description="The content text or idea to evaluate and auto-fill parameters for",
        examples=["What to know about AI"]
    )


class AutoFillResponse(BaseModel):
    content: str
    content_type: str
    goal: str
    preferred_platform: Optional[str] = None
    target_audience: str
    topic: str
    keywords: List[str]
    sentiment: str


class ContentAnalysisResponse(BaseModel):
    topic: str
    keywords: List[str]
    sentiment: str
    content_type: str
    goal: Optional[str] = "Engagement"
    content_length: int


class InferredParameters(BaseModel):
    content_type: str
    goal: str
    preferred_platform: Optional[str] = None
    target_audience: str
    is_content_type_inferred: bool
    is_goal_inferred: bool
    is_platform_inferred: bool
    is_audience_inferred: bool


class PlatformRecItem(BaseModel):
    platform: str
    score: float
    reason: str


class AudienceRecItem(BaseModel):
    audience: str
    score: float
    reason: str


class TimingRecResponse(BaseModel):
    day: str
    hour: int
    formatted_time: str
    score: float
    reason: str


class FormatRecResponse(BaseModel):
    format: str
    score: float
    reason: str


class ContentOptResponse(BaseModel):
    hook: str
    caption: str
    cta: str
    suggested_length: str
    hashtags: List[str]


class OverallFactors(BaseModel):
    platform_fit: float
    audience_fit: float
    timing_score: float
    goal_fit: float


class RecommendationResponse(BaseModel):
    content_analysis: ContentAnalysisResponse
    inferred_parameters: Optional[InferredParameters] = None
    platform_recommendations: List[PlatformRecItem]
    audience_recommendations: List[AudienceRecItem]
    timing_recommendation: TimingRecResponse
    format_recommendation: FormatRecResponse
    content_optimization: ContentOptResponse
    expected_engagement: float
    overall_factors: OverallFactors
    explanation: List[str]


# ==============================================================================
# API ENDPOINTS
# ==============================================================================

@app.get("/")
def root():
    """Root endpoint providing service information and link to Swagger docs."""
    return {
        "message": "ContentPilot API is running",
        "documentation": "/docs",
        "health_check": "/api/health"
    }


@app.get("/api/health", summary="Health Check")
def health_check():
    """Health check endpoint confirming API status and model readiness."""
    if hasattr(recommender_engine, "predictor") and not recommender_engine.predictor.is_trained:
        try:
            recommender_engine.initialize()
        except Exception:
            pass
    return {
        "status": "healthy",
        "service": "ContentPilot Recommendation System",
        "model_trained": recommender_engine.predictor.is_trained if hasattr(recommender_engine, "predictor") else True,
        "supported_platforms": SUPPORTED_PLATFORMS,
        "allowed_content_types": ALLOWED_CONTENT_TYPES,
        "allowed_goals": ALLOWED_GOALS,
        "topic_categories": TOPIC_CATEGORIES
    }


@app.post(
    "/api/recommend",
    response_model=RecommendationResponse,
    summary="Generate Intelligent Content Recommendations",
    status_code=status.HTTP_200_OK
)
def recommend(payload: RecommendRequest):
    """
    Main recommendation endpoint.
    Performs NLP Content Analysis, Platform Matching, Audience Matching,
    ML Engagement Prediction, Optimal Posting Time Optimization,
    Format Recommendation, and Content Optimization.

    Guaranteed to return output even for unknown inputs or unindexed topics.
    """
    try:
        results = recommender_engine.recommend(
            content=payload.content,
            content_type=payload.content_type,
            goal=payload.goal,
            preferred_platform=payload.preferred_platform,
            target_audience=payload.target_audience
        )
        return results
    except Exception as e:
        print(f"[ContentPilot] Note: Engine fallback activated due to: {e}")
        return recommender_engine.get_fallback_recommendations(
            content=payload.content,
            content_type=payload.content_type,
            goal=payload.goal,
            preferred_platform=payload.preferred_platform,
            target_audience=payload.target_audience
        )


@app.post(
    "/api/auto-fill",
    response_model=AutoFillResponse,
    summary="Auto-Fill Parameters from Content & Context",
    status_code=status.HTTP_200_OK
)
def auto_fill(payload: AutoFillRequest):
    """
    Given only the content text, analyzes its context and automatically determines:
    - content_type (e.g. Educational, Promotional, Tutorial, News, etc.)
    - goal (e.g. Engagement, Reach, Conversions, Leads, etc.)
    - preferred_platform (e.g. YouTube, Instagram, LinkedIn, X/Twitter, etc.)
    - target_audience (e.g. General Audience, Tech Enthusiasts, etc.)
    - topic category and extracted keywords
    """
    return recommender_engine.auto_fill_parameters(payload.content)


@app.get(
    "/api/evaluate-test-dataset",
    summary="Evaluate Model on test.csv Samples",
    status_code=status.HTTP_200_OK
)
def evaluate_test_dataset(limit: int = 10):
    """
    Evaluates ML predictions and system compatibility against test.csv.
    """
    return recommender_engine.evaluate_test_set(test_path=TEST_CSV_PATH, max_rows=limit)




if __name__ == "__main__":
    import uvicorn
    print("[ContentPilot] Starting server at http://127.0.0.1:8000 ...")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True, app_dir=CURRENT_DIR)
