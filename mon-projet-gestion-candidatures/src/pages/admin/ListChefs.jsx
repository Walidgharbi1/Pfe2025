import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../composants/SideBar';

export default function ListeChefs() {
  const [chefs, setChefs] = useState([]);
  const [form, setForm] = useState({ nom: '', email: '', password: '' });

  const fetchChefs = async () => {
    try {
      const res = await axios.get('http://localhost:3000/chefs');
      setChefs(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des chefs', err);
    }
  };

  const ajouterChef = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/registerChef', form);
      setForm({ nom: '', email: '', password: '' });
      fetchChefs();
    } catch (err) {
      console.error('Erreur lors de l\'ajout', err);
    }
  };

  const supprimerChef = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/chefs/${id}`);
      fetchChefs();
    } catch (err) {
      console.error('Erreur lors de la suppression', err);
    }
  };

  useEffect(() => {
    fetchChefs();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Gestion des Chefs de Recrutement</h1>

        {/* Formulaire d'ajout */}
        <form onSubmit={ajouterChef} className="mb-6 space-y-3">
          <input
            type="text"
            placeholder="Nom"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Ajouter Chef
          </button>
        </form>

        {/* Tableau */}
        <table className="w-full border text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Nom</th>
              <th className="p-2">Email</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {chefs.map((chef) => (
              <tr key={chef._id} className="border-t">
                <td className="p-2">{chef.nom}</td>
                <td className="p-2">{chef.email}</td>
                <td className="p-2">
                  <button onClick={() => supprimerChef(chef._id)} className="text-red-600 hover:underline">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
