# backend/utils.py
from collections import Counter
from nltk.tokenize import word_tokenize
import fitz  # PyMuPDF
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
import fitz
import tempfile

# Fonction pour extraire le texte d'un fichier PDF
# Fonction pour extraire le texte d'un PDF
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

# Fonction pour extraire les langages utilisés et les compétences à partir du texte du CV

def extract_languages_and_skills(pdf_path):
    # Liste des compétences
    skills_list = [
    "Python", "JavaScript", "Java", "C#", "TypeScript", "Kotlin", "Swift",
    "Go (Golang)", "SQL", "NoSQL", "MongoDB", "PostgreSQL",
    "MySQL", "SQLite", "Oracle", "Redis", "Elasticsearch", "React", "Angular",
    "Vue.js", "Node.js", "Express.js", "Django", "Flask", "SpringBoot", "Laravel",
    "Ruby on Rails", "ASP.NET", "Next.js", "Nuxt.js", "Svelte", "GraphQL",
    "Docker", "Kubernetes", "Terraform", "Ansible", "Git", "GitHub", "GitLab",
    "CI/CD", "Jenkins", "Travis CI", "CircleCI", "AWS", "Azure", "Google Cloud",
    "Firebase", "Heroku", "Netlify", "Vercel", "Serverless", "Microservices",
    "REST", "WebAssembly", "TensorFlow", "PyTorch", "scikit-learn", "Pandas",
    "NumPy", "Apache Kafka", "RabbitMQ", "Hadoop", "Spark","IA","NLP","C","C++","PHP","HTML","CSS","javascript","scala"
]

    # Charger le fichier PDF
    doc = fitz.open(pdf_path)
    text = ""
    
    # Extraire le texte de chaque page du PDF
    for page in doc:
        text += page.get_text()
    
    # Convertir le texte en minuscules pour une comparaison insensible à la casse
    text = text.lower()
    
    # Liste pour stocker les compétences trouvées dans le CV
    cv_skills = []
    
    # Comparer le texte avec la liste de compétences
    for skill in skills_list:
        if skill.lower() in text:
            cv_skills.append(skill)
    
    return cv_skills



# Fonction pour extraire les compétences du CV
def extract_skills(cv_info):
    skills = []
    for domain, info in cv_info.items():
        skills.extend(info["skills"])
    return skills
from transformers import BertTokenizer, BertModel
import torch

def generate_questions1(text, question_database_file, threshold=0.75):
    # Charger le modèle BERT et le tokenizer
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertModel.from_pretrained('bert-base-uncased')
    
    
    # Suppression des doublons et conversion en liste
    question_database = pd.read_csv(question_database_file)
    questions_corpus = list(set(question_database["Question"]))
    
    # Encodage du texte avec BERT
    inputs = tokenizer(text, padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
    text_vector = outputs.last_hidden_state.mean(dim=1)  # Moyenne des représentations des tokens pour obtenir une seule représentation pour le texte
    
    # Encodage des questions avec BERT
    question_inputs = tokenizer(questions_corpus, padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        question_outputs = model(**question_inputs)
    question_vectors = question_outputs.last_hidden_state.mean(dim=1)  # Moyenne des représentations des tokens pour obtenir une seule représentation pour chaque question
    
    # Calcul de la similarité cosinus entre le texte et les questions
    similarity_scores = torch.nn.functional.cosine_similarity(text_vector, question_vectors, dim=1)
    
    # Ensemble pour stocker les questions uniques
    unique_questions = set()
    
    # Sélection des questions les plus pertinentes (avec une similarité élevée)
    for score, question in zip(similarity_scores, questions_corpus):
        if score > threshold:
            unique_questions.add(question)
    
    return list(unique_questions)

def generate_questions(text, question_database, cv_skills, threshold=0.75):
    try:
        # Charger la base de données de questions
        question_database = pd.read_csv(question_database)
    except FileNotFoundError:
        return {}, {}
    except pd.errors.ParserError:
        return {}, {}

    relevant_questions = {}
    for skill in cv_skills:
        skill_questions = question_database[question_database["Skill"] == skill]
        if not skill_questions.empty:
            relevant_questions[skill] = skill_questions["Question"].tolist()
    
    return relevant_questions
