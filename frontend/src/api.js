/**
 * ContentPilot API Client
 * Uses standard Fetch API to communicate with the FastAPI backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          errorMessage = typeof errorData.detail === 'string'
            ? errorData.detail
            : JSON.stringify(errorData.detail);
        }
      } catch {
        // use status text
      }
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error(
        `Unable to reach backend at ${API_BASE_URL}. Ensure the FastAPI server is running on port 8000.`
      );
    }
    throw err;
  }
}

/**
 * Fetch backend health status and metadata
 */
export async function fetchHealth() {
  return request('/api/health');
}

/**
 * Generate intelligent recommendations for content
 */
export async function fetchRecommendations({
  content,
  contentType = null,
  goal = null,
  preferredPlatform = null,
  targetAudience = null,
}) {
  return request('/api/recommend', {
    method: 'POST',
    body: JSON.stringify({
      content,
      content_type: contentType || null,
      goal: goal || null,
      preferred_platform: preferredPlatform || null,
      target_audience: targetAudience || null,
    }),
  });
}

/**
 * Automatically analyze content text to predict optimal parameters
 */
export async function fetchAutoFill(content) {
  return request('/api/auto-fill', {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}

/**
 * Run evaluation against test.csv samples
 */
export async function fetchTestDatasetEvaluation(limit = 5) {
  return request(`/api/evaluate-test-dataset?limit=${limit}`);
}
