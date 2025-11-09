🧠 Research Agent - Multi-Agent Knowledge Synthesis
This project is a multi-agent AI system designed to accelerate research. Instead of just summarizing text, this system uses a team of specialized AI agents that actively read, analyze, and debate knowledge sources (PDFs, arXiv, Wikipedia) to generate collective insights.

The final result is presented in an interactive knowledge map that visualizes the connections between papers, key concepts, and, most importantly, specific snippets from the agents' discussion, making their reasoning completely transparent and verifiable.

🚀 Key Features
Multi-Source Knowledge Ingestion: Automatically processes uploaded PDFs, arXiv articles, and Wikipedia pages to build a knowledge base.

LLM-Powered Concept Extraction: Uses GPT-4o-mini to analyze each source and extract key concepts, main findings, and data points.

Multi-Agent Debate: A specialized team of agents (mathematical analyst, sociologist, physical analyst, and general analyst) debates the user's query based on the ingested knowledge.

Interactive Graph Visualization: Generates a dynamic concept map with vis.js that shows the relationships between papers, concepts, and findings.

Organic "Sketch" Style: The graph is styled to look like a "hand-drawn" concept map on a whiteboard, complete with pastel colors and handwritten fonts.

Verifiable Reasoning ("Tentacles"): Click on a key concept in the map, and a "tentacle" will appear with the exact discussion snippet where the agents talked about that topic!

PDF Report Generation: Exports the complete discussion, ingestion summary, and references into a formal scientific PDF report using ReportLab.

💻 Tech Stack
Backend:

Python 3.10+

FastAPI: To serve the REST API.

OpenAI GPT-4o-mini: As the brain for agents, extraction, and analysis.

LangChain: For document orchestration (loaders, splitters).

Hugging Face Embeddings: To generate all-MiniLM-L6-v2 vectors.

ChromaDB: As the in-memory vector database.

ReportLab: For PDF report generation.

Frontend:

HTML5, CSS3, JavaScript (ES6+)

Vis.js (vis-network): For interactive graph rendering.

Kalam (Google Font): For the "hand-drawn" style.

🏗️ How It Works (Architecture)
Input: The user provides a prompt (question) and/or a PDF file via the frontend (mapa.html).

Backend API: The request hits the /ask endpoint in FastAPI (main.py).

Ingestion (KnowledgeIngestion):

The system processes the PDF (if provided).

If auto_search is active, it searches arXiv and Wikipedia using the user's prompt.

For each document, it calls GPT-4o-mini (_extract_key_concepts) to get a JSON of key_concepts and main_findings.

Orchestration (Orchestrator):

All text is vectorized and stored in ChromaDB.

The Orchestrator performs a semantic search to find the most relevant snippets for the user's question.

The AI agents (Brandon, Rodrigo, etc.) receive this context and begin a round-based debate (run_discussion).

Debate Analysis:

Once the debate ends, a function (_analyze_debate_insights) calls GPT-4o-mini again, feeding it the full debate transcript and the key concepts.

The AI extracts "debate snippets" (debate_snippet) that relate to each concept.

Graph Generation:

The generate_graph_data function creates the JSON for the concept map, injecting the debate_snippet into the corresponding "concept" nodes.

Response:

The backend sends the complete JSON (discussion, metadata, graph_data) to the frontend.

The frontend (mapa.html) uses vis.js to draw the map with the "Kalam" style and activates the event listeners for the "tentacle" click functionality.

🛠️ Installation & Local Setup
Follow these steps to run the project on your local machine.

1. Backend (FastAPI)
Clone the repository:

Bash

git clone [YOUR-REPOSITORY-URL]
cd toon_project
Create and activate a virtual environment:

Bash

# Windows
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# macOS / Linux
python3 -m venv .venv
source .venv/bin/activate
Install the Python dependencies:

Bash

pip install fastapi "uvicorn[standard]" openai "langchain-community" "langchain-huggingface" \
langchain-core "unstructured[pdf]" arxiv wikipedia chromadb sentence-transformers reportlab
Configure your API Key:

Option A (Recommended): Create an environment variable.

Bash

# Windows (PowerShell)
$env:OPENAI_API_KEY = "sk-..."

# macOS / Linux
export OPENAI_API_KEY="sk-..."
Option B (Fallback): Open main.py and replace the api_key value (around line 504) with your OpenAI key.

Run the server: (Ensure your file is named main.py)

Bash

uvicorn main:app --reload
The server will be running at http://127.0.0.1:8000.

2. Frontend (HTML/JS)
Open mapa.html: No installation needed. Simply open the mapa.html file in your browser.

(Recommended) To avoid CORS issues, use an extension like "Live Server" in VS Code. Right-click mapa.html and select "Open with Live Server".

🤝 Team & Contributions
This project was developed by a team of analysts and engineers:

Rodrigo: I participated in this project as the Knowledge and Visualization Engineer. My role was to build the system's "brain": I developed the Knowledge Ingestion pipeline that reads and analyzes complex PDFs, transforming the text to automatically extract the key concepts the agents need to reason. Additionally, I designed and programmed the interactive concept map, the main visual interface. This map not only displays the findings but also makes the agents' reasoning "verifiable" by directly connecting snippets of their discussions to the concepts on the screen.

Brandon: I developed an intelligent system with FastAPI and GPT-4o-mini that enables automatic search, analysis, and synthesis of scientific information. It integrates collaborative agents that discuss and generate conclusions based on sources like arXiv, Wikipedia, or PDFs. The system produces scientific reports in PDF, combining generative AI and advanced semantic analysis.

Esve

Emmanuel

📄 License
This project is licensed under the MIT License.
