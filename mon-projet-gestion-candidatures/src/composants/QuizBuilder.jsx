import React, { useEffect, useState } from "react";
import { fetchOffres } from "../services/OffreServices";

const questionTypes = ["text", "single", "multiple", "select"];

const Question = ({ question, index, handleChange }) => {
  const isCorrect = (optIdx) => {
    if (question.type === "multiple") {
      return question.correctAnswers?.includes(optIdx);
    }
    return question.correctAnswer === optIdx;
  };

  const toggleCorrect = (optIdx) => {
    const updatedCorrect =
      question.type === "multiple"
        ? question.correctAnswers?.includes(optIdx)
          ? question.correctAnswers.filter((i) => i !== optIdx)
          : [...(question.correctAnswers || []), optIdx]
        : optIdx;
    handleChange(
      index,
      question.type === "multiple" ? "correctAnswers" : "correctAnswer",
      updatedCorrect
    );
  };

  return (
    <div className="border border-gray-300 rounded-2xl p-5 mb-6 bg-white shadow-sm">
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="Enter question text"
        value={question.text}
        onChange={(e) => handleChange(index, "text", e.target.value)}
      />

      {question.type === "text" && (
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-2"
          placeholder="Correct answer"
          value={question.correctAnswer}
          onChange={(e) => handleChange(index, "correctAnswer", e.target.value)}
        />
      )}

      {(question.type === "single" ||
        question.type === "multiple" ||
        question.type === "select") && (
        <div className="space-y-3 mt-3">
          {question.options.map((opt, optIdx) => (
            <div key={optIdx} className="flex items-center gap-3">
              <input
                className="flex-1 p-3 border border-gray-300 rounded-lg"
                placeholder={`Option ${optIdx + 1}`}
                value={opt}
                onChange={(e) =>
                  handleChange(index, "option", e.target.value, optIdx)
                }
              />
              <input
                type={question.type === "multiple" ? "checkbox" : "radio"}
                checked={isCorrect(optIdx)}
                onChange={() =>
                  question.type === "select"
                    ? handleChange(index, "correctAnswer", optIdx)
                    : toggleCorrect(optIdx)
                }
              />
              <label className="text-sm text-gray-600">Correct</label>
            </div>
          ))}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => handleChange(index, "addOption")}
          >
            + Add Option
          </button>
        </div>
      )}

      <div className="mt-4">
        <select
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={question.type}
          onChange={(e) => handleChange(index, "type", e.target.value)}
        >
          <option value="">Select question type</option>
          {questionTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


const QuizBuilder = ({ setQuiz, quiz, onExit }) => {
  const [questions, setQuestions] = useState([]);
  const [titre, setTitre] = useState("");
  const [offreId, setOffreId] = useState(null);
  const [offres, setOffres] = useState([]);
  const [description, setDescription] = useState("");

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        type: "text",
        text: "",
        correctAnswer: "",
        correctAnswers: [],
        options: [],
      },
    ]);
  };

  const handleAddQuestions = () => {
    setQuiz({
      offre_id: offreId,
      questions: questions,
      titre: titre,
      description: description,
    });
  };

  const handleChange = (index, field, value, optIdx = null) => {
    const updated = [...questions];
    if (field === "option") {
      updated[index].options[optIdx] = value;
    } else if (field === "addOption") {
      updated[index].options.push("");
    } else {
      updated[index][field] = value;
      if (field === "type") {
        updated[index].options = ["", ""];
        updated[index].correctAnswer = "";
        updated[index].correctAnswers = [];
      }
    }
    setQuestions(updated);
  };

  useEffect(() => {
    fetchOffres().then((result) => {
      setOffres(result);
    });
  }, []);

  return (
    <div className="p-8 bg-gray-50 rounded-xl shadow-xl max-w-4xl mx-auto mt-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Créer un Quiz</h1>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Titre du quiz"
          className="w-full p-3 border border-gray-300 rounded-lg"
          onChange={(e) => setTitre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description du quiz"
          className="w-full p-3 border border-gray-300 rounded-lg"
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-full p-3 border border-gray-300 rounded-lg"
          onChange={(e) => setOffreId(e.target.value)}
        >
          <option defaultChecked>Choisir une offre liée</option>
          {offres.map((el) => (
            <option key={el._id} value={el._id}>
              {el.titre}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {questions.map((q, i) => (
          <Question
            key={i}
            index={i}
            question={q}
            handleChange={handleChange}
          />
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={addQuestion}
        >
          + Ajouter une question
        </button>
        <button
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleAddQuestions}
        >
          ✅ Terminer
        </button>
        <button
          className="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={onExit}
        >
          ✖ Annuler
        </button>
      </div>
    </div>
  );
};


export default QuizBuilder;
