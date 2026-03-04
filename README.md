# CodeMind — AI Study Helper

CodeMind is an AI-powered study assistant designed to help developers quickly understand **coding concepts, DSA topics, and interview questions** with structured explanations.

It uses a **Flask backend + NVIDIA LLM API** to generate clean learning material including:

* Simple explanations
* Key points
* Interview questions
* Real-world examples

The project provides a **minimal yet elegant frontend interface** where users can enter any programming topic and instantly receive structured learning content.

---

# 🚀 Features

• Explain any **DSA or coding topic instantly**
• Structured AI responses for better learning
• Clean and modern UI designed for developers
• Key interview questions for each topic
• Real-world examples for deeper understanding
• Quick topic chips (Binary Search, Recursion, etc.)
• Loading animation and error handling

---

# 🧠 Example Output

For a topic like **Binary Search**, the AI returns structured content:

```
{
  "simple_explanation": "...",
  "key_points": ["...", "...", "..."],
  "interview_questions": ["...", "...", "..."],
  "real_world_example": "..."
}
```

This structured format makes learning **faster and interview-focused**.

---

# 🛠 Tech Stack

### Backend

* Python
* Flask
* NVIDIA LLM API
* OpenAI compatible SDK
* dotenv

### Frontend

* HTML
* CSS
* JavaScript
* Responsive UI

### AI

* NVIDIA hosted LLM models

---

# 📂 Project Structure

```
CodeMind/
│
├── app.py
├── .env
├── requirements.txt
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── README.md
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone the Repository

```
git clone https://github.com/yourusername/codemind-ai-study-helper.git
cd codemind-ai-study-helper
```

---

## 2️⃣ Create Virtual Environment

```
python -m venv venv
```

Activate environment

Windows

```
venv\Scripts\activate
```

Mac / Linux

```
source venv/bin/activate
```

---

## 3️⃣ Install Dependencies

```
pip install -r requirements.txt
```

---

## 4️⃣ Create Environment Variables

Create a `.env` file in the root directory.

```
NVIDIA_API_KEY=your_api_key
NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
NVIDIA_MODEL=your_model_name
```

---

## 5️⃣ Run the Application

```
python app.py
```

Server will start at:

```
http://127.0.0.1:5000
```

Open the URL in your browser.

---

# 🔌 API Endpoints

### Check API Status

```
GET /api/status
```

Response

```
{
  "status": "API running"
}
```

---

### Study Topic

```
POST /study
```

Request

```
{
  "topic": "Binary Search"
}
```

Response

```
{
  "topic": "Binary Search",
  "simple_explanation": "...",
  "key_points": [...],
  "interview_questions": [...],
  "real_world_example": "..."
}
```

---

# 🧩 System Workflow

```
User enters topic
        ↓
Frontend sends request to Flask API
        ↓
Flask sends prompt to NVIDIA LLM
        ↓
Model returns structured JSON
        ↓
Backend cleans and validates JSON
        ↓
Frontend renders explanation cards
```

---

# 🎯 Use Cases

• Learning **Data Structures & Algorithms**
• Preparing for **technical interviews**
• Understanding programming concepts quickly
• Generating structured explanations for study

---

# 📌 Future Improvements

* Code generation examples
* Syntax highlighted code blocks
* DSA visualizations
* AI streaming responses
* Chat history
* LeetCode problem suggestions

---

# 👨‍💻 Author

**Abhinav Guntuku**

Computer Science Graduate
Interested in AI, Data Science, and Software Development

---

# ⭐ If you like this project

Consider giving the repository a star.
