import { NavLink } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";

const ChefRSidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Gestion candidature</h2>
      <nav>
        <ul className="space-y-3">
          <li>
            <NavLink
              to="/chefr_dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <span>📊</span>
              <span>Tableau de bord</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chefRListCandidat"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <span>👥</span>
              <span>Candidats</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chefROffreManagement"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <span>💼</span>
              <span>Offres</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chefRlisteCandidatures"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <span>📄</span>
              <span>Candidatures</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chefRTestManagement"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <span>🎓</span>
              <span>Tests</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/chefRAgenda"
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
        </ul>
      </nav>
    </aside>
  );
};

export default ChefRSidebar;
