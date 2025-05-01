from flask import Flask, request, jsonify, session
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
from transformers import BertTokenizer, BertModel
import torch
import fitz
import os
from collections import defaultdict
import matplotlib
import matplotlib.pyplot as plt

# Modules personnalisés importés depuis app
from app import extract_languages_and_skills, extract_skills, extract_text_from_pdf, generate_questions

app = Flask(__name__)
CORS(app)  # Active CORS pour toute l'application

# Charger la base de données de questions et réponses
base_data = pd.read_csv('questions_reponse.csv')
advice_data = pd.read_csv('skills_advice.csv')  # Charger les conseils pour les compétences

# Initialiser le vectoriseur TF-IDF
vectorizer = TfidfVectorizer()

# Charger le modèle BERT et le tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Définir une fonction pour encoder les réponses en utilisant BERT
def encode_responses(responses):
    inputs = tokenizer(responses, padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1)  # Moyenne des représentations des tokens pour obtenir une seule représentation par réponse

# Variable globale pour stocker skill_averages
global_skill_averages = {}

@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.json  # Récupère les données JSON envoyées dans le corps de la requête

    questions = data.get('questions', [])
    answers = data.get('answers', {})
    
    # Afficher uniquement les réponses
    for question, answer in answers.items():
        print(f" Réponse: {answer}")
    
    # Comparaison avec la base de données de questions et calcul du score
    
    return jsonify({'answers': answers})

@app.route('/compare_responses', methods=['POST'])
def compare_responses():
    data = request.json
    candidate_answers = data.get('answers', {})
    generated_questions = list(candidate_answers.keys())  # Obtenir les questions générées

    # Récupérer les réponses correspondant aux questions générées depuis la base de données
    filtered_base_data = base_data[base_data['Question'].isin(generated_questions)]
    base_answers = filtered_base_data['Reponse'].tolist()
    
    # Prétraiter les réponses du candidat et de la base de données avec BERT
    candidate_vector = encode_responses(list(candidate_answers.values()))
    base_vector = encode_responses(base_answers)
    
    # Calcul de la similarité cosinus entre les représentations des réponses du candidat et de la base de données
    similarity_scores = torch.nn.functional.cosine_similarity(candidate_vector, base_vector)

    # Calcul du score moyen de similarité
    average_similarity_score = (similarity_scores.mean().item() * 100) - 10

    return jsonify({'score': average_similarity_score})

@app.route("/extract_cv", methods=["POST"])
def extract_cv_route():
    if 'cv' not in request.files:
        return jsonify({"error": "No CV file uploaded"}), 400

    cv_file = request.files['cv']  # Récupère le fichier de CV envoyé par le client
    
    # Enregistrer temporairement le fichier sur le serveur
    cv_file_path = "temp_cv.pdf"
    cv_file.save(cv_file_path)

    # Extraire les compétences du texte
    cv_skills = extract_languages_and_skills(cv_file_path)
    
    # Générer les questions pertinentes
    relevant_questions = generate_questions(cv_file_path, "questions_reponse.csv", cv_skills)
    print(relevant_questions)
    # Supprimer le fichier temporaire après utilisation
    os.remove(cv_file_path)
    
    # Retourner les questions générées dans le JSON
    return jsonify({"relevant_questions": relevant_questions})

@app.route("/extract_skills", methods=["POST"])
def extract_skills_route():
    try:
        cv_file = request.files['cv']  # Récupère le fichier de CV envoyé par le client
        cv_file.save("uploaded_cv.pdf")  # Sauvegarder le fichier temporairement
        cv_skills = extract_languages_and_skills("uploaded_cv.pdf")  # Extraire les compétences
        return jsonify({"skills": cv_skills})
    except Exception as e:
        return jsonify({"error": str(e)})
@app.route('/compare_individual_responses', methods=['POST'])
def compare_individual_responses():
    global global_skill_averages

    data = request.json
    candidate_answers = data.get('answers', {})
    
    # Dictionnaire pour stocker les scores agrégés pour chaque compétence
    aggregated_scores = defaultdict(list)
    correct_answers = {}

    # Comparaison de chaque réponse avec la base de données de réponses
    for question, candidate_answer in candidate_answers.items():
        # Trouver la réponse correcte dans la base de données
        correct_answer_row = base_data[base_data['Question'] == question]
        if not correct_answer_row.empty:
            correct_answer = correct_answer_row.iloc[0]['Reponse']
            skill = correct_answer_row.iloc[0]['Skill']
            correct_answers[question] = correct_answer  # Ajouter la réponse correcte au dictionnaire
            # Calcul du score de similarité entre la réponse du candidat et la réponse correcte
            score = calculate_similarity(candidate_answer, correct_answer)
            aggregated_scores[skill].append(score)
    
    # Calculer la moyenne des scores pour chaque compétence
    skill_averages = {skill: np.mean(scores) for skill, scores in aggregated_scores.items()}
    
    # Store the skill_averages in the global variable
    global_skill_averages = skill_averages
    
    # Générer les graphiques
    hist_url, advice = generate_skill_hist(skill_averages)
    generate_skill_chart(skill_averages)
    print(advice)
    
    # Liste pour stocker les scores de chaque réponse
    scores = []
    
    for question, candidate_answer in candidate_answers.items():
        correct_answer_row = base_data[base_data['Question'] == question]
        if not correct_answer_row.empty:
            correct_answer = correct_answer_row.iloc[0]['Reponse']
            score = calculate_similarity(candidate_answer, correct_answer)
            scores.append({"question": question, "score": score})
    
    return jsonify({'scores': scores, 'advice': advice, 'correct_answers': correct_answers})

@app.route('/generate_hist', methods=['GET'])
def generate_hist():
    global global_skill_averages

    if not global_skill_averages:
        return jsonify({'error': 'No skill averages available'}), 400

    image_url1 = "static/hist.png"
    advice = extract_advice_score(global_skill_averages)
    return jsonify({'image_url1': image_url1, 'advice': advice})
import matplotlib.pyplot as plt

def generate_skill_chart(skill_averages):
    skills = list(skill_averages.keys())
    skill_scores = list(skill_averages.values())

    # Create a figure
    plt.figure(figsize=(15, 15))
    
    # Plot the pie chart with enhanced label size
    wedges, texts, autotexts = plt.pie(
        skill_scores, 
        labels=skills, 
        autopct='%1.1f%%', 
        startangle=140,
        labeldistance=1.1,  # Distance of the labels from the center
        textprops={'fontsize': 20}  # Increase the font size of the labels
    )

    # Optional: Customize the appearance of the percentage labels
    for autotext in autotexts:
        autotext.set_fontsize(18)  # You can set a different size for the percentage labels if desired

    # Ensure the pie chart is a circle
    plt.axis('equal')
    
    # Set the title with a larger font size
    plt.title('Répartition des scores moyens par compétence', fontsize=20, pad=32)

    # Save the pie chart as an image file
    plt.savefig('static/pie_chart.png')
    
    # Close the plot to free up memory
    plt.close()


@app.route('/generate_chart', methods=['GET'])
def generate_chart():
    image_url = "static/pie_chart.png"
    return jsonify({'image_url': image_url})

def generate_skill_hist(skill_averages):
    skills = list(skill_averages.keys())
    skill_scores = list(skill_averages.values())

    plt.figure(figsize=(15, 15))
    bars = plt.bar(skills, skill_scores, color='blue', edgecolor='black')  # Assign the bars to a variable

    # Agrandir la taille des noms de compétences (axes x)
    plt.xticks(rotation=45, ha='right', fontsize=19)
    plt.yticks( fontsize=19)
    # Colorer chaque barre individuellement
    colors = plt.cm.viridis(np.linspace(0, 1, len(skills)))  # Viridis est une palette de couleurs

    # Colorer chaque barre individuellement
    for bar, color in zip(bars, colors):
        bar.set_color(color)# Changer la couleur de chaque barre
   
    plt.xlabel('Compétences', fontsize=20)
    plt.ylabel('Scores (%)', fontsize=20)
    plt.title('Répartition des scores moyens par compétence', fontsize=19)
    plt.ylim(0, 100)
    plt.tight_layout()

    # Sauvegarder le graphique en tant qu'image
    plt.savefig('static/hist.png')
    plt.close()
    
    advice = extract_advice_score(skill_averages)
    return 'static/hist.png', advice

def extract_advice_score(skill_averages):
    skills = list(skill_averages.keys())
    skill_scores = list(skill_averages.values())

    advice_dict = {}
    
    for skill, percentage in zip(skills, skill_scores):
        if percentage < 70:
            advice_row = advice_data[advice_data['Skill'] == skill]
            if not advice_row.empty:
                advice = advice_row.iloc[0]['Conseil']
                advice_dict[skill] = advice
    
    return advice_dict

def calculate_similarity(candidate_answer, correct_answer):
    tfidf_matrix = vectorizer.fit_transform([candidate_answer, correct_answer])
    similarity_score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix)
    return similarity_score[0][1] * 100  # Convert to percentage

if __name__ == '__main__':
    app.run()
