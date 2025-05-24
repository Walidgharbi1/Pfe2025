import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../composants/SideBar";
import QuizBuilder from "../../composants/QuizBuilder";
import {
  ajouterTest,
  deleteTest,
  getAllTests,
} from "../../services/TestServices";
import { toast } from "react-toastify";

export default function TestManagement() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [showQuizBuilder, setShowQuizBuilder] = useState(false);
  const fetchTests = async () => {
    try {
      const response = await getAllTests();
      setTests(response);
    } catch (error) {
      console.error("Erreur lors du chargement des tests", error);
    }
  };
  useEffect(() => {
    fetchTests();
  }, []);

  const handleAddTest = async () => {
    await ajouterTest(quiz)
      .then((result) => {
        toast.success("Test ajouté avec succes ! ");
      })
      .then(() => {
        setShowQuizBuilder(false);
        fetchTests();
      });
  };

  const handleViewTest = (test) => {
    console.log("Viewing:", test);
    // navigate to test view or display modal
  };

  const handleDeleteTest = (id) => {
    console.log("Deleting:", id);
    deleteTest(id)
      .then(() => {
        toast.error("Test supprimé");
      })
      .then(() => {
        fetchTests();
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Gestion des Tests
          </h1>
          <button
            onClick={() => setShowQuizBuilder(!showQuizBuilder)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded shadow"
          >
            Ajouter un test
          </button>
        </div>

        {showQuizBuilder && (
          <div className="bg-white border border-gray-300 rounded p-6 mb-8 shadow-lg">
            <QuizBuilder
              onExit={() => setShowQuizBuilder(false)}
              quiz={quiz}
              setQuiz={setQuiz}
            />
            <div className="mt-4 text-right">
              <button
                onClick={handleAddTest}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Sauvegarder le test
              </button>
            </div>
          </div>
        )}

        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Liste des tests
        </h3>
        <div className="overflow-x-auto bg-white p-6 rounded shadow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3 border-b">Titre</th>
                <th className="px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{test.titre}</td>
                  <td className="px-4 py-2 border-b space-x-2">
                    <button
                      onClick={() => handleViewTest(test)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Consulter
                    </button>
                    <button
                      onClick={() => handleDeleteTest(test._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {tests.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center text-gray-500 py-4">
                    Aucun test disponible.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
