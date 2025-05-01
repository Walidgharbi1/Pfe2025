import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

function BarreNavigation() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // Charger l'utilisateur au montage
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.warn("vous etes deconnecté");
    setTimeout(() => {
      navigate("/connexion");
    }, 2500);
  };

  // Fonction pour rediriger vers le dashboard en fonction du rôle
  const handleDashboardRedirect = () => {
    if (user) {
      if (user.role === "admin") {
        navigate("/AdminDashboard");
      } else if (user.role === "chef") {
        navigate("/RecruteurDashboard");
      } else if (user.role === "candidat") {
        navigate("/CandidatDashboard");
      }
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Gestion des Candidatures
        </Link>

        <nav className="space-x-4 flex items-center">
          <Link to="/gestionOffres" className="hover:underline">
            Offres
          </Link>
          <Link to="/actualites" className="hover:underline">
            Actualités
          </Link>

          {/* Vérifier si l'utilisateur est connecté */}
          {!user ? (
            <>
              <Link to="/connexion" className="hover:underline">
                Connexion
              </Link>
              <Link to="/inscription" className="hover:underline">
                Inscription
              </Link>
            </>
          ) : (
            <>
              {/* Afficher le lien vers le dashboard correspondant au rôle */}
              <button
                onClick={handleDashboardRedirect}
                className="text-sm bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
              >
                Dashboard
              </button>

              {/* Afficher le nom de l'utilisateur et le bouton de déconnexion */}
              <span className="text-sm italic">Bienvenue, {user.nom}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
              >
                Déconnexion
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default BarreNavigation;
