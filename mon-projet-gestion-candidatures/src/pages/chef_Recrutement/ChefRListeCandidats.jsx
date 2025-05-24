import { useEffect, useState } from "react";
import Sidebar from "../../composants/SideBar";
import {
  fetchCandidats,
  supprimerCandidat,
  toggleCandidatStatus,
} from "../../services/AdminServices";
import { toast } from "react-toastify";
import ChefRSidebar from "../../composants/ChefRSidebar";

const ChefRListaCandidat = () => {
  const [candidats, setCandidats] = useState([]);
  const [searchNom, setSearchNom] = useState("");
  const [editCandidat, setEditCandidat] = useState(null);
  const [loading, setLoading] = useState(true);
  const loadCandidats = async () => {
    try {
      const data = await fetchCandidats();
      setCandidats(data);
      setLoading(false);
    } catch (error) {
      toast.error("Erreur lors du chargement des candidats");
      setLoading(false);
    }
  };
  useEffect(() => {
    loadCandidats();
  }, []);

  const handleDelete = async (id, status) => {
    try {
      if (status == "active") {
        await toggleCandidatStatus(id, "inactive");
      } else {
        await toggleCandidatStatus(id, "active");
      }
      await loadCandidats();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleEdit = (candidat) => {
    setEditCandidat({ ...candidat });
  };

  const handleSave = async () => {
    try {
      const updatedCandidat = await updateCandidat(
        editCandidat._id,
        editCandidat
      );
      setCandidats(
        candidats.map((c) =>
          c._id === updatedCandidat._id ? updatedCandidat : c
        )
      );
      setEditCandidat(null);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const filteredCandidats = searchNom
    ? candidats.filter((el) =>
        el.nom.toLowerCase().includes(searchNom.toLowerCase())
      )
    : candidats;

  if (loading) {
    return (
      <div className="flex">
        <ChefRSidebar />
        <div className="flex-1 p-6">
          <h1 className="text-xl font-bold mb-4">Liste des Candidats</h1>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <ChefRSidebar />
      <div className="flex-1 p-6 overflow-x-auto">
        <h1 className="text-xl font-bold mb-4">Liste des Candidats</h1>

        <div className="mb-4 flex">
          <input
            type="text"
            placeholder="Chercher par nom"
            value={searchNom}
            onChange={(e) => setSearchNom(e.target.value)}
            className="border rounded px-3 py-1 flex-grow"
          />
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Nom</th>
              <th className="p-2">CIN</th>
              <th className="p-2">Email</th>
              <th className="p-2">Parcours academique</th>
              <th className="p-2">Expériences</th>
              <th className="p-2">Compétences</th>
              <th className="p-2">status compte</th>

              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidats.length > 0 ? (
              filteredCandidats.map((c) => (
                <tr key={c._id} className="border-t hover:bg-gray-50">
                  <td className="p-2">
                    {editCandidat?._id === c._id ? (
                      <input
                        value={editCandidat.nom}
                        onChange={(e) =>
                          setEditCandidat({
                            ...editCandidat,
                            nom: e.target.value,
                          })
                        }
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      c.nom
                    )}
                  </td>
                  <td className="p-2">{c.cin}</td>
                  <td className="p-2">
                    {editCandidat?._id === c._id ? (
                      <input
                        value={editCandidat.email}
                        onChange={(e) =>
                          setEditCandidat({
                            ...editCandidat,
                            email: e.target.value,
                          })
                        }
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      c.email
                    )}
                  </td>
                  <td className="p-2 text-left">
                    {c?.cv?.academicInfos?.length > 0 ? (
                      <ul className="list-disc pl-4 text-sm">
                        {c.cv.academicInfos.map((acd, index) => (
                          <li key={index}>
                            <span className="font-semibold">{acd.degree}</span>{" "}
                            — {acd.institution}, {acd.startDate} → {acd.endDate}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400 italic">Aucune</span>
                    )}
                  </td>
                  <td className="p-2 text-left">
                    {c?.cv?.profInfos?.length > 0 ? (
                      <ul className="list-disc pl-4 text-sm">
                        {c.cv.profInfos.map((exp, index) => (
                          <li key={index}>
                            <span className="font-semibold">
                              {exp.position}
                            </span>{" "}
                            — {exp.company}, {exp.startDate} → {exp.endDate}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400 italic">Aucune</span>
                    )}
                  </td>
                  <td className="p-2 text-left">
                    {c?.cv?.skills?.length > 0 ? (
                      <ul className="list-disc pl-4 text-sm">
                        {c.cv.skills.map((skill, index) => (
                          <li key={index}>
                            <span className="font-semibold">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400 italic">Aucune</span>
                    )}
                  </td>
                  <td className="p-2 space-x-2">{c.status}</td>
                  <td className="p-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={c.status === "active"}
                        onChange={() => handleDelete(c._id, c.status)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-red-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  Aucun candidat trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChefRListaCandidat;
