import { useEffect, useState } from "react";
import { getAllCandidatures } from "../../services/CandidatureServices";

const ListCandidatures = () => {
  const [data, setData] = useState([]);

  const handleGetAllCandidatures = async () => {
    await getAllCandidatures().then((result) => {
      setData(result);
    });
  };

  useEffect(() => {
    handleGetAllCandidatures();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Mes Candidatures</h3>
      {data.length > 0 ? (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Titre de l'offre</th>
              <th className="px-4 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {data.map((candidature) => (
              <tr key={candidature.user_id._id}>
                {candidature.user_id.nom}
                {/* <td className="px-4 py-2">{candidature.offre.titre}</td>
                <td className="px-4 py-2">{candidature.statut}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune candidature en cours.</p>
      )}
    </div>
  );
};

export default ListCandidatures;
