# 🧠 Research Agent - Síntesis de Conocimiento Multi-Agente

Este proyecto es un sistema de IA multi-agente diseñado para acelerar la investigación. En lugar de simplemente resumir texto, este sistema utiliza un equipo de agentes de IA especializados que leen, analizan y *debaten* activamente las fuentes de conocimiento (PDFs, arXiv, Wikipedia) para generar insights colectivos.

El resultado final se presenta en un **mapa de conocimiento interactivo** que visualiza las conexiones entre los papers, los conceptos clave y, lo más importante, los fragmentos específicos de la discusión de los agentes, haciendo que su razonamiento sea completamente transparente y verificable.

## 🚀 Características Principales

* **Ingesta de Conocimiento Multi-Fuente:** Procesa automáticamente PDFs subidos, artículos de **arXiv** y páginas de **Wikipedia** para construir una base de conocimiento.
* **Extracción de Conceptos por LLM:** Utiliza **GPT-4o-mini** para analizar cada fuente y extraer conceptos clave, hallazgos principales y puntos de datos.
* **Debate Multi-Agente:** Un equipo de agentes especializados (analista matemático, sociólogo, analista físico y analista general) debate la pregunta del usuario basándose en el conocimiento ingerido.
* **Visualización de Grafo Interactivo:** Genera un mapa conceptual dinámico con **`vis.js`** que muestra las relaciones entre los papers, los conceptos y los hallazgos.
* **Estilo de "Boceto" Orgánico:** El grafo está estilizado para parecer un mapa conceptual "dibujado a mano" en una pizarra, con colores pastel y fuentes manuscritas.
* **Razonamiento Verificable ("Tentáculos"):** ¡Haz clic en un concepto clave en el mapa y aparecerá un "tentáculo" con el fragmento exacto de la discusión donde los agentes hablaron sobre ese tema!
* **Generación de Reportes PDF:** Exporta la discusión completa, el resumen de ingesta y las referencias a un reporte científico formal en PDF usando **ReportLab**.

## 💻 Pila Tecnológica

* **Backend:**
    * **Python 3.10+**
    * **FastAPI:** Para servir la API REST.
    * **OpenAI GPT-4o-mini:** Como el cerebro para los agentes, extracción y análisis.
    * **LangChain:** Para la orquestación de documentos (loaders, splitters).
    * **Hugging Face Embeddings:** Para generar los vectores de `all-MiniLM-L6-v2`.
    * **ChromaDB:** Como la base de datos vectorial en memoria.
    * **ReportLab:** Para la generación de reportes en PDF.
* **Frontend:**
    * **HTML5, CSS3, JavaScript (ES6+)**
    * **Vis.js (vis-network):** Para el renderizado del grafo interactivo.
    * **Kalam (Google Font):** Para el estilo "dibujado a mano".

## 🏗️ Cómo Funciona (Arquitectura)

1.  **Entrada:** El usuario proporciona un *prompt* (pregunta) y/o un archivo PDF a través del frontend (`mapa.html`).
2.  **API Backend:** La solicitud llega al endpoint `/ask` de **FastAPI** (`main.py`).
3.  **Ingesta (`KnowledgeIngestion`):**
    * El sistema procesa el PDF (si se proporcionó).
    * Si `auto_search` está activo, busca en **arXiv** y **Wikipedia** usando el prompt del usuario.
    * Para cada documento, llama a GPT-4o-mini (`_extract_key_concepts`) para obtener un JSON de `key_concepts` y `main_findings`.
4.  **Orquestación (`Orchestrator`):**
    * Todo el texto se vectoriza y se almacena en **ChromaDB**.
    * El `Orchestrator` realiza una búsqueda semántica para encontrar los fragmentos más relevantes para la pregunta del usuario.
    * Los agentes de IA (Brandon, Rodrigo, etc.) reciben este contexto e inician un debate por rondas (`run_discussion`).
5.  **Análisis del Debate:**
    * Una vez que el debate termina, una función (`_analyze_debate_insights`) vuelve a llamar a GPT-4o-mini, pasándole el debate completo y los conceptos clave.
    * La IA extrae los "fragmentos de debate" (`debate_snippet`) que se relacionan con cada concepto.
6.  **Generación del Grafo:**
    * La función `generate_graph_data` crea el JSON para el mapa conceptual, inyectando los `debate_snippet` en los nodos de "concepto" correspondientes.
7.  **Respuesta:**
    * El backend envía el JSON completo (discusión, metadata, `graph_data`) al frontend.
    * El frontend (`mapa.html`) usa `vis.js` para dibujar el mapa con el estilo "Kalam" y activa los *event listeners* para la funcionalidad de "tentáculos" al hacer clic.

## 🛠️ Instalación y Ejecución Local

Sigue estos pasos para correr el proyecto en tu máquina local.

### 1. Backend (FastAPI)

1.  **Clona el repositorio:**
    ```bash
    git clone [URL-DE-TU-REPOSITORIO]
    cd toon_project
    ```

2.  **Crea y activa un entorno virtual:**
    ```bash
    # Windows
    python -m venv .venv
    .\.venv\Scripts\Activate.ps1
    
    # macOS / Linux
    python3 -m venv .venv
    source .venv/bin/activate
    ```

3.  **Instala las dependencias de Python:**
    ```bash
    pip install fastapi "uvicorn[standard]" openai "langchain-community" "langchain-huggingface" \
    langchain-core "unstructured[pdf]" arxiv wikipedia chromadb sentence-transformers reportlab
    ```

4.  **Configura tu API Key:**
    * **Opción A (Recomendada):** Crea una variable de entorno.
        ```bash
        # Windows (PowerShell)
        $env:OPENAI_API_KEY = "sk-..."
        
        # macOS / Linux
        export OPENAI_API_KEY="sk-..."
        ```
    * **Opción B (Fallback):** Abre `main.py` y reemplaza el valor de `api_key` (línea 504 aprox.) con tu llave de OpenAI.

5.  **Ejecuta el servidor:**
    (Asegúrate de que tu archivo se llame `main.py`)
    ```bash
    uvicorn main:app --reload
    ```
    El servidor estará corriendo en `http://127.0.0.1:8000`.

### 2. Frontend (HTML/JS)

1.  **Abre `mapa.html`:** No necesitas instalación. Simplemente abre el archivo `mapa.html` en tu navegador.
2.  **(Recomendado)** Para evitar problemas de CORS, usa una extensión como **"Live Server"** en VS Code. Haz clic derecho en `mapa.html` y selecciona "Open with Live Server".

## 🤝 Equipo y Contribuciones

Este proyecto fue desarrollado por un equipo de analistas e ingenieros:

* **Rodrigo (Ingeniero de Conocimiento y Visualización):** Soy Rodrigo, estoy en tercer semestre de la licenciatura en informática en la UNAM, y participé en este proyecto como Ingeniero de Conocimiento y Visualización. Mi rol fue construir el "cerebro" del sistema: desarrollé el pipeline de Ingestión de Conocimiento que lee y analiza PDFs complejos, transformando el texto para extraer automáticamente los conceptos clave que los agentes necesitan para razonar. Además, diseñé y programé el mapa conceptual interactivo, la interfaz visual principal. Este mapa no solo muestra los hallazgos, sino que también hace "verificable" el razonamiento de los agentes, conectando los fragmentos de sus discusiones directamente a los conceptos en la pantalla.
* **Brandon** (Analista Científico Matemático)
* **Esve** (Analista Científico Físico)
* **Emmanuel** (Analista Científico General)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
