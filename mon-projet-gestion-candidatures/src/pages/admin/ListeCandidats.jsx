import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../composants/SideBar";
import {
  fetchCandidats,
  supprimerCandidat,
} from "../../services/AdminServices";

const ListeCandidats = () => {
  const [candidats, setCandidats] = useState([]);
  const [searchNom, setSearchNom] = useState("");
  const [editCandidat, setEditCandidat] = useState(null);

  const chercherCandidat = async () => {
    if (searchNom.trim() === "") return fetchCandidats();

    try {
      const res = await axios.get(
        `http://localhost:3000/chercherParNom/${searchNom}`
      );
      setCandidats(res.data);
    } catch (err) {
      setCandidats([]);
      console.error("Candidat non trouvé");
    }
  };

  useEffect(() => {
    fetchCandidats().then((result) => {
      setCandidats(result);
    });
  }, [candidats]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-4">Liste des Candidats</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Chercher par nom"
            value={searchNom}
            onChange={(e) => setSearchNom(e.target.value)}
            className="border rounded px-3 py-1"
          />
          <button
            onClick={chercherCandidat}
            className="ml-2 bg-blue-500 text-white px-4 py-1 rounded"
          >
            Chercher
          </button>
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
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidats
              .filter((el) =>
                el.nom.toLowerCase().includes(searchNom.toLocaleLowerCase())
              )
              .map((c) => (
                <tr key={c._id} className="text-center border-t">
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
                            <span className="font-semibold">{skill}</span>{" "}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400 italic">Aucune</span>
                    )}
                  </td>
                  <td className="p-2">
                    <>
                      <button
                        onClick={() => supprimerCandidat(c._id)}
                        className="text-red-600"
                      >
                        🗑️
                      </button>
                    </>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListeCandidats;
