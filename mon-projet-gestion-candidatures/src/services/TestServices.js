import axios from "axios";
import { toast } from "react-toastify";
let base_url = "http://localhost:3000/api/tests";
export const ajouterTest = async (data) => {
  let result = await axios.post(base_url + "/ajouter_test", data);
  return result.data;
};

export const getTestById = async (id) => {
  let result = await axios.get(base_url + `/get_test/${id}`);
  return result.data;
};

export const getAllTests = async () => {
  let result = await axios.get(base_url + "/get_all_tests");
  return result.data;
};

export const getTestByOffreId = async (id) => {
  let result = await axios.get(base_url + `/get_test_by_offre_id/${id}`);
  return result.data;
};

export const deleteTest = async (id) => {
  let result = await axios.delete(base_url + `/delete_test/${id}`);

  return result.data;
};

export function calculateTestScore(test, response, warnings_count) {
  if (!test || !response) return 0;

  const questionsMap = new Map();
  test.questions.forEach((q) => questionsMap.set(q._id.toString(), q));

  let score = 0;

  for (const userAnswer of response.reponses) {
    const question = questionsMap.get(userAnswer.questionId.toString());
    if (!question) continue;

    const correctAnswer = question.correctAnswer;
    const correctAnswers = question.correctAnswers || [];

    switch (question.type) {
      case "text":
        if (
          typeof userAnswer.answer === "string" &&
          userAnswer.answer.trim().toLowerCase() ===
            correctAnswer.trim().toLowerCase()
        ) {
          score++;
        }
        break;

      case "single":
      case "select":
        if (userAnswer.answer === correctAnswer) {
          score++;
        }
        break;

      case "multiple":
        const userAnswers = Array.isArray(userAnswer.answer)
          ? userAnswer.answer
          : [];
        const sortedCorrect = [...correctAnswers].sort();
        const sortedUser = [...userAnswers].sort();
        const isCorrect =
          sortedCorrect.length === sortedUser.length &&
          sortedCorrect.every((val, idx) => val === sortedUser[idx]);

        if (isCorrect) {
          score++;
        }
        break;

      default:
        break;
    }
  }

  return score - warnings_count;
}
