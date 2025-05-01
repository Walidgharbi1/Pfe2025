import { NavLink } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ListeCandidats from "../pages/admin/ListeCandidats";
const Sidebar = () => {
  const liens = [
    { nom: "Tableau de bord", path: "/AdminDashboard", icone: "📊" },
    { nom: "Candidats", path: "/ListeCandidats", icone: "👥" },
    { nom: "Offres", path: "/gestionOffres", icone: "💼" },
    { nom: "Candidatures", path: "/ListCandidatures", icone: "📄" },
    { nom: "Tests", path: "/gestionTest", icone: "🎓" },
    { nom: "Départements", path: "/admin/departements", icone: "🏢" },
    { nom: "Statistiques", path: "/admin/statistiques", icone: "📈" },
    { nom: "Actualités", path: "/gestionActualites", icone: "🔔" },
    { nom: "Recruteurs", path: "/ListeChefs", icone: "🧑‍💼" },
    { nom: "Paramètres", path: "/admin/parametres", icone: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Gestion candidature</h2>
      <nav>
        <ul className="space-y-3">
          {liens.map((lien, index) => (
            <li key={index}>
              <NavLink
                to={lien.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-800" : ""
                  }`
                }
              >
                <span>{lien.icone}</span>
                <span>{lien.nom}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
