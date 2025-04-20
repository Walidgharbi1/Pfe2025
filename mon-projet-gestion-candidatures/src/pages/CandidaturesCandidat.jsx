const CandidaturesCandidat = ({ candidatures }) => {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">Mes Candidatures</h3>
        {candidatures.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Titre de l'offre</th>
                <th className="px-4 py-2">Statut</th>
              </tr>
            </thead>
            <tbody>
              {candidatures.map((candidature) => (
                <tr key={candidature._id}>
                  <td className="px-4 py-2">{candidature.offre.titre}</td>
                  <td className="px-4 py-2">{candidature.statut}</td>
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
  
  export default CandidaturesCandidat;
  