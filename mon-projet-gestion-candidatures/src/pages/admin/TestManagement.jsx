import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../composants/SideBar';  // Import du Sidebar

export default function TestManagement() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [newTest, setNewTest] = useState({
    titre: '',
    description: '',
    questions: [
      {
        question: '',
        reponses: [
          { text: '', estCorrecte: false },
          { text: '', estCorrecte: false },
        ],
      },
    ],
  });

  const [editingTest, setEditingTest] = useState(null);  // Pour gérer la modification d'un test

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  if (!token || user.role !== 'admin') {
    navigate('/connexion');
  }

  // Charger tous les tests
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTests(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des tests', error);
      }
    };
    fetchTests();
  }, [token]);

  // Créer un nouveau test
  const handleCreateTest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/tests', newTest, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTests([...tests, response.data]);
      setNewTest({
        titre: '',
        description: '',
        questions: [
          {
            question: '',
            reponses: [
              { text: '', estCorrecte: false },
              { text: '', estCorrecte: false },
            ],
          },
        ],
      });
    } catch (error) {
      console.error('Erreur lors de la création du test', error);
    }
  };

  // Modifier un test
  const handleEditTest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/tests/${editingTest._id}`, newTest, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTests(tests.map(test => (test._id === editingTest._id ? response.data : test)));
      setEditingTest(null);  // Réinitialiser l'édition
      setNewTest({
        titre: '',
        description: '',
        questions: [
          {
            question: '',
            reponses: [
              { text: '', estCorrecte: false },
              { text: '', estCorrecte: false },
            ],
          },
        ],
      });
    } catch (error) {
      console.error('Erreur lors de la modification du test', error);
    }
  };

  // Supprimer un test
  const handleDeleteTest = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTests(tests.filter((test) => test._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du test', error);
    }
  };

  // Consulter un test (préparer le formulaire d'édition)
  const handleViewTest = (test) => {
    setEditingTest(test);
    setNewTest({
      titre: test.titre,
      description: test.description,
      questions: test.questions,
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar à gauche */}
      <Sidebar />

      {/* Contenu principal à droite */}
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Gestion des Tests</h2>

        {/* Formulaire pour créer ou modifier un test */}
        <form onSubmit={editingTest ? handleEditTest : handleCreateTest} className="bg-white p-6 rounded shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">{editingTest ? 'Modifier le test' : 'Créer un nouveau test'}</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Titre du test</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={newTest.titre}
              onChange={(e) => setNewTest({ ...newTest, titre: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={newTest.description}
              onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
              required
            />
          </div>
          
          {/* Gestion des questions */}
          <h4 className="text-lg font-semibold mb-2">Questions</h4>
          {newTest.questions.map((question, index) => (
            <div key={index} className="mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Question {index + 1}</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={question.question}
                  onChange={(e) =>
                    setNewTest({
                      ...newTest,
                      questions: newTest.questions.map((q, i) =>
                        i === index ? { ...q, question: e.target.value } : q
                      ),
                    })
                  }
                  required
                />
              </div>
              <div className="mt-2">
                <h5 className="text-sm font-medium">Réponses</h5>
                {question.reponses.map((reponse, rIndex) => (
                  <div key={rIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={reponse.text}
                      onChange={(e) =>
                        setNewTest({
                          ...newTest,
                          questions: newTest.questions.map((q, i) =>
                            i === index
                              ? {
                                  ...q,
                                  reponses: q.reponses.map((r, j) =>
                                    j === rIndex ? { ...r, text: e.target.value } : r
                                  ),
                                }
                              : q
                          ),
                        })
                      }
                      required
                    />
                    <input
                      type="checkbox"
                      checked={reponse.estCorrecte}
                      onChange={(e) =>
                        setNewTest({
                          ...newTest,
                          questions: newTest.questions.map((q, i) =>
                            i === index
                              ? {
                                  ...q,
                                  reponses: q.reponses.map((r, j) =>
                                    j === rIndex ? { ...r, estCorrecte: e.target.checked } : r
                                  ),
                                }
                              : q
                          ),
                        })
                      }
                    />
                    <span className="text-xs">Bonne réponse</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Ajouter une nouvelle question */}
          <button
            type="button"
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() =>
              setNewTest({
                ...newTest,
                questions: [
                  ...newTest.questions,
                  { question: '', reponses: [{ text: '', estCorrecte: false }] },
                ],
              })
            }
          >
            Ajouter une question
          </button>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded"
          >
            {editingTest ? 'Modifier le test' : 'Créer le test'}
          </button>
        </form>

        {/* Liste des tests existants */}
        <h3 className="text-xl font-semibold mb-4">Liste des tests</h3>
        <div className="bg-white p-6 rounded shadow-md">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Titre</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test._id}>
                  <td className="px-4 py-2">{test.titre}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleViewTest(test)}
                      className="bg-blue-600 text-white py-1 px-3 rounded"
                    >
                      Consulter
                    </button>
                    <button
                      onClick={() => handleDeleteTest(test._id)}
                      className="bg-red-600 text-white py-1 px-3 rounded ml-2"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
