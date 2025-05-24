import React, { useState, useEffect } from "react";
import { AjouterReponse } from "../../services/ReponseServices";
import { useSelector } from "react-redux";
import { calculateTestScore } from "../../services/TestServices";
import { toast } from "react-toastify";
const QuizDisplay = ({ test, setDisplayQuiz }) => {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [warningCount, setWarningCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!started) return;

    const prevent = (e) => e.preventDefault();
    const handleBlur = () => {
      setWarningCount((prev) => {
        const newCount = prev + 1;
        alert(
          `⚠️ You switched tabs or windows (${newCount} time${
            newCount > 1 ? "s" : ""
          }).`
        );
        return newCount;
      });
    };

    document.addEventListener("copy", prevent);
    document.addEventListener("paste", prevent);
    document.addEventListener("cut", prevent);
    document.addEventListener("contextmenu", prevent);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("copy", prevent);
      document.removeEventListener("paste", prevent);
      document.removeEventListener("cut", prevent);
      document.removeEventListener("contextmenu", prevent);
      window.removeEventListener("blur", handleBlur);
    };
  }, [started]);

  const handleChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleMultiChange = (index, option) => {
    const current = answers[index] || [];
    const updated = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];
    setAnswers((prev) => ({
      ...prev,
      [index]: updated,
    }));
  };

  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const payload = {
      candidat_id: user._id,
      id_test: test._id,
      offre_id: test.offre_id,
      warningCount: warningCount,
      reponses: test.questions.map((q, idx) => ({
        questionId: q._id,
        type: q.type,
        answer: answers[idx] || "",
      })),
    };

    let score = calculateTestScore(test, payload, warningCount);

    try {
      await AjouterReponse({ ...payload, score: score });
      toast.success("responses envoyés");
      setTimeout(() => {
        setDisplayQuiz(false);
      }, 3000);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  if (!started) {
    return (
      <div className="p-6 bg-white rounded shadow max-w-xl mx-auto text-center">
        <h2 className="text-xl font-bold mb-4">⚠️ Important Notice</h2>
        <p className="mb-4">
          During this quiz, you cannot copy, paste, or switch tabs. Doing so
          will result in a warning or disqualification.
        </p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setStarted(true)}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{test.titre}</h2>
      <p className="mb-6">{test.description}</p>

      {test.questions.map((q, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2 font-medium">{q.text}</label>

          {q.type === "text" && (
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={answers[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              disabled={submitted}
            />
          )}

          {q.type === "single" &&
            q.options.map((opt, optIdx) => (
              <div key={optIdx} className="flex items-center">
                <input
                  type="radio"
                  id={`q${index}_opt${optIdx}`}
                  name={`q${index}`}
                  value={optIdx}
                  checked={answers[index] === String(optIdx)}
                  onChange={() => handleChange(index, String(optIdx))}
                  disabled={submitted}
                />
                <label htmlFor={`q${index}_opt${optIdx}`} className="ml-2">
                  {opt}
                </label>
              </div>
            ))}

          {q.type === "multiple" &&
            q.options.map((opt, optIdx) => (
              <div key={optIdx} className="flex items-center">
                <input
                  type="checkbox"
                  id={`q${index}_opt${optIdx}`}
                  value={optIdx}
                  checked={(answers[index] || []).includes(String(optIdx))}
                  onChange={() => handleMultiChange(index, String(optIdx))}
                  disabled={submitted}
                />
                <label htmlFor={`q${index}_opt${optIdx}`} className="ml-2">
                  {opt}
                </label>
              </div>
            ))}

          {q.type === "select" && (
            <select
              className="w-full p-2 border rounded"
              value={answers[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              disabled={submitted}
            >
              <option value="">-- Select an option --</option>
              {q.options.map((opt, optIdx) => (
                <option key={optIdx} value={optIdx}>
                  {opt}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}

      {!submitted ? (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleSubmit}
        >
          Submit Quiz
        </button>
      ) : (
        <div className="mt-4 text-green-700 font-bold">
          ✅ Quiz submitted! Thank you.
        </div>
      )}
    </div>
  );
};

export default QuizDisplay;
