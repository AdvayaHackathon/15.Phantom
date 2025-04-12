from flask import Flask, request, jsonify, send_from_directory
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load the .env file
load_dotenv()

# Configure Gemini with API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Create a model instance (this works with v1beta)
# model = genai.GenerativeModel(model_name="gemini-pro")
model = genai.GenerativeModel("models/gemini-1.5-pro-latest")


# Initialize Flask app
app = Flask(__name__, static_folder='../public', static_url_path='')

@app.route("/")
def serve_home():
    return send_from_directory(app.static_folder, "chatbot.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    if not user_input:
        return jsonify({"error": "Empty message"}), 400

    try:
        response = model.generate_content(user_input)
        reply = response.text.strip()
        return jsonify({"reply": reply})
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)