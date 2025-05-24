import { useEffect, useState } from "react";
import { getCandidaturesByCandidatId } from "../../services/CandidatureServices";
import SidebarCandidat from "../../composants/SideBarCandidat";
import { useSelector } from "react-redux";
import CountdownTimer from "../../composants/CountdownTimer";
import { getTestByOffreId } from "../../services/TestServices";
import QuizDisplay from "./QuizDisplay";
import { verifyHasAnswered } from "../../services/ReponseServices";
import ScoreModal from "./ScoreModal";

const MesCandidatures = () => {
  const [data, setData] = useState([]);
  const [currentTest, setCurrentTest] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [displayQuiz, setDisplayQuiz] = useState(false);
  const [passedTests, setPassedTests] = useState([]);
  const [reponseMap, setReponseMap] = useState({});

  const [displayScoreModal, setDisplayScoreModal] = useState(false);
  const [currentScore, setCurrentScore] = useState(null);

  const handleGetUserCandidatures = async () => {
    const result = await getCandidaturesByCandidatId(user._id);
    setData(result);

    const reponseResults = {};

    for (let candidature of result) {
      const offreId = candidature.offre_id._id;
      const responses = await verifyHasAnswered({
        user_id: user._id,
        offre_id: offreId,
      });

      reponseResults[offreId] = responses.length > 0;
    }

    setReponseMap(reponseResults);
  };

  function isFutureDate(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();

    inputDate.setUTCHours(0, 0, 0, 0);
    today.setUTCHours(0, 0, 0, 0);

    return inputDate >= today;
  }

  useEffect(() => {
    handleGetUserCandidatures();
  }, [displayQuiz]);

  const handleGetTest = async (id) => {
    const result = await getTestByOffreId(id);
    setCurrentTest(result);
    setDisplayQuiz(true);
  };

  function handleOpenScoreModal(data) {
    setCurrentScore(data);
    setDisplayScoreModal(true);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarCandidat />
      <div className="flex-1 p-8">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          Mes candidatures
        </h3>

        {data.length > 0 ? (
          <div className="overflow-x-auto rounded shadow-lg bg-white">
            <table className="w-full table-auto text-center text-sm text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-6 py-4">Titre de l'offre</th>
                  <th className="px-6 py-4">Type de l'offre</th>
                  <th className="px-6 py-4">Date de dépôt</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4">Temps restant</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((candidature, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4">{candidature.offre_id.titre}</td>
                    <td className="px-6 py-4">{candidature.offre_id.type}</td>
                    <td className="px-6 py-4">
                      {candidature.created_at.split("T")[0]}
                    </td>
                    <td className="px-6 py-4 capitalize font-medium text-blue-600">
                      {candidature.status == "interview scheduled"
                        ? "Accepté"
                        : candidature.status == "en_attente"
                        ? "en attente"
                        : "refusé"}
                    </td>
                    <td className="px-6 py-4">
                      <CountdownTimer
                        targetDate={candidature.offre_id.dateExpiration}
                      />
                    </td>

                    <td className="px-6 py-4">
                      {reponseMap[candidature.offre_id._id] ? (
                        <button
                          onClick={() =>
                            handleOpenScoreModal({
                              offre_id: candidature.offre_id._id,
                            })
                          }
                          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-200"
                        >
                          Test déjà passé (voir résultat)
                        </button>
                      ) : isFutureDate(candidature.offre_id.dateExpiration) ? (
                        <button
                          onClick={() =>
                            handleGetTest(candidature.offre_id._id)
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-200"
                        >
                          Passer le test
                        </button>
                      ) : (
                        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-200">
                          Offre expirée
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">Aucune candidature en cours.</p>
        )}
      </div>
      {displayQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
            <QuizDisplay test={currentTest} setDisplayQuiz={setDisplayQuiz} />
          </div>
        </div>
      )}

      {displayScoreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
            <ScoreModal
              data={currentScore}
              setDisplayScoreModal={setDisplayScoreModal}
            />
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default MesCandidatures;
