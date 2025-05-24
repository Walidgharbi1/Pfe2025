import { useEffect, useState } from "react";
import { verifyHasAnswered } from "../../services/ReponseServices";
import { useSelector } from "react-redux";

function ScoreModal({ data, setDisplayScoreModal }) {
  const [score, setScore] = useState(0);

  const { user } = useSelector((state) => state.auth);

  async function handleVerifyAnswer() {
    await verifyHasAnswered({
      user_id: user._id,
      offre_id: data.offre_id,
    }).then((result) => {
      setScore(result[0].score);
    });
  }
  useEffect(() => {
    handleVerifyAnswer();
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Score Test</h2>
      <p className="mb-4">votre score est {score}</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => setDisplayScoreModal(false)}
      >
        Valider
      </button>
    </div>
  );
}

export default ScoreModal;
