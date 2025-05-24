import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";

const SidebarCandidat = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard Candidat</h2>
      <nav>
        <ul className="space-y-3">
          {/* Lien vers le Profil du candidat */}

          <li>
            <NavLink
              to="/CandidatDashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <LuLayoutDashboard color="#4691A3" />
              {/* Icône simple pour le profil */}
              <span>Tableau de board</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profil"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <span>👤</span> {/* Icône simple pour le profil */}
              <span>Mon Profil</span>
            </NavLink>
          </li>
          {/* Lien vers les Candidatures du candidat */}
          <li>
            <NavLink
              to="/mes_candidatures"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <span>📄</span> {/* Icône simple pour les candidatures */}
              <span>Mes Candidatures</span>
            </NavLink>
          </li>
          {/* Lien vers les Statistiques du candidat */}
          <li>
            <NavLink
              to="/candidat_agenda"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <FaRegCalendarAlt color="#4691A3" />

              <span>Agenda</span>
            </NavLink>
          </li>
          {/* Lien vers les Offres */}
          <li>
            <NavLink
              to="/offres"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <span>💼</span> {/* Icône simple pour les offres */}
              <span>Offres</span>
            </NavLink>
          </li>
          {/* Lien vers la Déconnexion */}
          <li>
            <NavLink
              to="/connexion"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <span>🚪</span> {/* Icône simple pour la déconnexion */}
              <span>Se Déconnecter</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarCandidat;
