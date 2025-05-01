from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
import fitz
import tempfile
from flask import request
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from app import extract_languages_and_skills,extract_skills,extract_text_from_pdf, generate_questions

app = Flask(__name__)
CORS(app)  # Active CORS pour toute l'application



# Charger la base de données CSV
base_data = pd.read_csv('questions_reponse.csv')
@app.route('/compare_responses', methods=['POST'])
def compare_responses():
    data = request.form
    candidate_answers = data.get('answers', {})
    questions = data.get('questions', [])

    if not questions:
        return jsonify({'error': 'Aucune question générée à comparer'})

    if not all(question in candidate_answers for question in questions):
        return jsonify({'error': 'Réponses manquantes pour certaines questions'})

    # Filtrer les données de la base de données pour les questions concernées
    base_answers = base_data.loc[base_data['Question'].isin(questions)]['Reponse']

    # Vérifier si les questions existent dans la base de données
    if len(base_answers) != len(questions):
        return jsonify({'error': 'Certaines questions ne sont pas dans la base de données'})

    # Vérifier si les réponses du candidat et les réponses de la base de données ne sont pas vides
    if not candidate_answers.values() or not base_answers.values:
        return jsonify({'error': 'Réponses du candidat ou de la base de données vides'})

    # Vectorisation des réponses du candidat et des réponses de la base de données
    vectorizer = CountVectorizer().fit(base_answers)
    candidate_vector = vectorizer.transform(candidate_answers.values())
    base_vector = vectorizer.transform(base_answers)

    # Calcul de la similarité cosinus entre les réponses du candidat et celles de la base de données
    similarity_score = cosine_similarity(candidate_vector, base_vector)

    # Calcul du score moyen
    similarity_score_percentage = (np.mean(similarity_score) * 100)-20

    return jsonify({'score': similarity_score})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
