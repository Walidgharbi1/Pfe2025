
from app import extract_text_from_pdf, extract_languages_and_skills
from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz
import tempfile

app = Flask(__name__)
CORS(app)  # Active CORS pour toute l'application

@app.route("/extract_cv", methods=["POST"])
def extract_cv_route():
    cv_file = request.files['cv']  # Récupère le fichier de CV envoyé par le client
    cv_text = extract_text_from_pdf(cv_file)
    
    # Vous devez implémenter extract_languages_and_skills

    cv_info = extract_languages_and_skills(cv_text)
    
    # Afficher l'extraction des mots du CV dans le terminal
    print("Extraction des mots du CV :")
    for domain, info in cv_info.items():
        print(f"Domaine : {domain}")
        print(f"Langues : {info['languages']}")
        print(f"Compétences : {info['skills']}")
    
    return jsonify(cv_info)

def extract_text_from_pdf(pdf_file):
    with tempfile.NamedTemporaryFile(delete=False) as temp_pdf:
        temp_pdf.write(pdf_file.read())
        temp_pdf.seek(0)
        text = ""
        with fitz.open(temp_pdf.name) as pdf_document:
            for page_num in range(len(pdf_document)):
                page = pdf_document.load_page(page_num)
                text += page.get_text()
        return text

if __name__ == "__main__":
    app.run(debug=True, port=5000)
