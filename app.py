from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
from flask import render_template
from flask_cors import CORS

import json
import re
import os


load_dotenv()

app = Flask(__name__)


client = OpenAI(
    api_key=os.getenv("NVIDIA_API_KEY"),
    base_url=os.getenv("NVIDIA_BASE_URL")
)

MODEL_NAME = os.getenv("NVIDIA_MODEL")

@app.route("/")
def home_page():
    return render_template("index.html")


@app.route("/api/status")
def api_status():
    return jsonify({"status": "API running"})

@app.route("/study", methods=["POST"])
def study():
    try:
        data = request.get_json()

        if not data or "topic" not in data:
            return jsonify({"error": "Topic is required"}), 400

        topic = data["topic"]

        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful study assistant. Always respond ONLY in valid JSON."
                },
                {
                    "role": "user",
                    "content": f"""
        Explain {topic}.
        
        Return ONLY valid JSON in this format:
        
        {{
          "simple_explanation": "...",
          "key_points": ["point1", "point2", "point3"],
          "interview_questions": ["q1", "q2", "q3"],
          "real_world_example": "..."
        }}
        """
                }
            ],
            temperature=0.5,
            max_tokens=1200,
        )
        


        ai_content = response.choices[0].message.content.strip()

        # Extract JSON block from response
        json_match = re.search(r"\{.*\}", ai_content, re.DOTALL)

        if not json_match:
            return jsonify({
                "error": "Model did not return valid JSON",
                "raw_output": ai_content
            }), 500

        clean_json = json_match.group(0)

        parsed_response = json.loads(clean_json)

        return jsonify({
            "topic": topic,
            "simple_explanation": parsed_response["simple_explanation"],
            "key_points": parsed_response["key_points"],
            "interview_questions": parsed_response["interview_questions"],
            "real_world_example": parsed_response["real_world_example"]
        })
    except Exception as e:
        print("FULL ERROR:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)