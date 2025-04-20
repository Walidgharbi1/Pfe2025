import { useState } from 'react';
import axios from 'axios';

export default function Inscription() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
    telephone: '',
    adresse: '',
    cin: '',
    cv: '' // Tu peux lier ça à un champ file plus tard
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/ajouterCandidat', formData);
      alert('Inscription réussie !');
      // Redirection possible ici
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'inscription');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Inscription</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="nom" onChange={handleChange} placeholder="Nom" className="w-full p-2 border rounded" />
        <input name="email" onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" />
        <input name="password" type="password" onChange={handleChange} placeholder="Mot de passe" className="w-full p-2 border rounded" />
        <input name="telephone" onChange={handleChange} placeholder="Téléphone" className="w-full p-2 border rounded" />
        <input name="adresse" onChange={handleChange} placeholder="Adresse" className="w-full p-2 border rounded" />
        <input name="cin" onChange={handleChange} placeholder="CIN" className="w-full p-2 border rounded" />
        <input name="cv" onChange={handleChange} placeholder="Lien vers CV (temporaire)" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">S'inscrire</button>
      </form>
    </div>
  );
}
