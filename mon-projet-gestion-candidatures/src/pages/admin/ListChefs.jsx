import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../composants/SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  resetAuthMessages,
} from "../../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { fetchUsers } from "../../services/AdminServices";

export default function ListeChefs() {
  const [chefs, setChefs] = useState([]);
  const [form, setForm] = useState({
    nom: "",
    email: "",
    mot_de_passe: "",
    role: "chefR",
  });

  const dispatch = useDispatch();
  const ajouterChef = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("nom", form.nom);
    formData.append("email", form.email);
    formData.append("mot_de_passe", form.mot_de_passe);
    formData.append("role", form.role);
    await dispatch(registerUser(formData));
    fetchUsers().then((result) => {
      setChefs(result.filter((el) => el.role == "chefR"));
    });
  };

  const { error, msg } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error || msg) {
      toast.success("chef recrutement ajouté avec succes ! ");
      dispatch(resetAuthMessages());
    }
  }, [error, msg, dispatch]);

  useEffect(() => {
    fetchUsers().then((result) => {
      setChefs(result.filter((el) => el.role == "chefR"));
    });
  }, []);

  const handleDelete = async (id, status) => {
    try {
      if (status == "active") {
        await toggleCandidatStatus(id, "inactive");
      } else {
        await toggleCandidatStatus(id, "active");
      }
      await fetchUsers().then((result) => {
        setChefs(result.filter((el) => el.role == "chefR"));
      });
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">
          Gestion des Chefs de Recrutement
        </h1>

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
            value={form.mot_de_passe}
            onChange={(e) => setForm({ ...form, mot_de_passe: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ajouter Chef
          </button>
        </form>

        {/* Tableau */}
        <table className="w-full border text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Nom</th>
              <th className="p-2">Email</th>
              <th className="p-2">Status</th>

              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {chefs.map((chef) => (
              <tr key={chef._id} className="border-t">
                <td className="p-2">{chef.nom}</td>
                <td className="p-2">{chef.email}</td>
                <td className="p-2">{chef.status}</td>

                <td className="p-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={chef.status === "active"}
                      onChange={() => handleDelete(chef._id, chef.status)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-red-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
