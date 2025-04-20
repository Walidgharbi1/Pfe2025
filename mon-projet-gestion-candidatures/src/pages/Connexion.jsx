import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Connexion() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidat'); // Par défaut

  // 🔁 Rediriger si déjà connecté
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      if (user.role === 'admin') navigate('/AdminDashboard');
      else if (user.role === 'chef') navigate('/recruteurDashboard');
      else navigate('/CandidatDashboard');
    }
  }, [navigate]);

  // Obtenir le paramètre "redirect" de l'URL (si présent)
  const redirectUrl = new URLSearchParams(location.search).get('redirect');

  const handleLogin = async (e) => {
    e.preventDefault();

    let url = '';
    if (role === 'admin') url = 'http://localhost:3000/loginAdmin';
    else if (role === 'chef') url = 'http://localhost:3000/loginChef';
    else url = 'http://localhost:3000/loginCandidat';

    try {
      const res = await axios.post(url, { email, password });

      // Stocker le token dans le localStorage
      localStorage.setItem('token', res.data.token);
      
      // Stocker toutes les informations du candidat dans le localStorage
      const userData = {
        _id: res.data.user._id,
        nom: res.data.user.nom,
        email: res.data.user.email,
        telephone: res.data.user.telephone,
        adresse: res.data.user.adresse,
        cin: res.data.user.cin,
        cv: res.data.user.cv,
        competences: res.data.user.competences,
        role: res.data.user.role,
      };
      
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirection après la connexion
      if (redirectUrl) {
        navigate(redirectUrl); // Rediriger vers l'ID de l'offre ou la page de l'offre
      } else {
        // Redirection selon le rôle
        if (role === 'admin') navigate('/AdminDashboard');
        else if (role === 'chef') navigate('/recruteurDashboard');
        else navigate('/CandidatDashboard');  // Candidat
      }
    } catch (err) {
      console.error('Erreur de connexion :', err);
      alert('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Connexion</h2>

        {/* Choix du rôle */}
        <div className="mb-4 flex justify-center gap-2">
          {['candidat', 'chef', 'admin'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`px-3 py-1 rounded-xl border ${
                role === r ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Adresse e-mail</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Pas encore de compte ?{' '}
          <a href="/inscription" className="text-blue-600 hover:underline font-medium">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
}
