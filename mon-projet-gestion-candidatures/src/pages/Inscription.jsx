import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

export default function Inscription() {
  const dispatch = useDispatch();
  const [cvFile, setCvFile] = useState(null);

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    mot_de_passe: "",
    telephone: "",
    adresse: "",
    cin: "",
    cv: "", // Tu peux lier ça à un champ file plus tard
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // pending fullfilled rejected
  const handleSubmit = async (e) => {
    const sendFormData = new FormData();
    sendFormData.append("nom", formData.nom);
    sendFormData.append("email", formData.email);
    sendFormData.append("mot_de_passe", formData.mot_de_passe);
    sendFormData.append("telephone", formData.telephone);
    sendFormData.append("adresse", formData.adresse);
    sendFormData.append("cin", formData.cin);
    if (cvFile) {
      sendFormData.append("cv", cvFile);
    }
    e.preventDefault();
    try {
      dispatch(registerUser(sendFormData));
      // alert("Inscription réussie !");
      // Redirection possible ici
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription");
    }
  };

  // useffect 1 - executer fct ba3d affichage
  // reexcuter une fonction suite a changement d'une valeur quelquonque

  const { error, msg } = useSelector((state) => state.auth);

  useEffect(() => {
    if (msg) {
      toast.success(msg);
    }
    if (error) {
      toast.error(error);
    }
  }, [error, msg]);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Inscription</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="nom"
          onChange={handleChange}
          placeholder="Nom"
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          name="mot_de_passe"
          type="password"
          onChange={handleChange}
          placeholder="Mot de passe"
          className="w-full p-2 border rounded"
        />
        <input
          name="telephone"
          onChange={handleChange}
          placeholder="Téléphone"
          className="w-full p-2 border rounded"
        />
        <input
          name="adresse"
          onChange={handleChange}
          placeholder="Adresse"
          className="w-full p-2 border rounded"
        />
        <input
          name="cin"
          onChange={handleChange}
          placeholder="CIN"
          className="w-full p-2 border rounded"
        />
        <input
          name="cv"
          onChange={(e) => setCvFile(e.target.files[0])}
          placeholder="Lien vers CV (temporaire)"
          className="w-full p-2 border rounded"
          type="file"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}
