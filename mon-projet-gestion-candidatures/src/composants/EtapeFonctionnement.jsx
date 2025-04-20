function EtapeFonctionnement() {
    const etapes = [
      { numero: 1, titre: 'Créez votre compte', texte: 'Inscrivez-vous et complétez votre profil avec vos compétences.' },
      { numero: 2, titre: 'Consultez les offres', texte: 'Parcourez nos offres d\'emploi et de stage disponibles.' },
      { numero: 3, titre: 'Postulez en ligne', texte: 'Soumettez votre candidature en ligne.' },
      { numero: 4, titre: 'Passez les tests', texte: 'Démontrez vos compétences à travers nos tests techniques.' },
    ];
  
    return (
      <section className="fonctionnement">
        <h2>Comment ça marche ?</h2>
        <div className="liste-etapes">
          {etapes.map(etape => (
            <div className="etape" key={etape.numero}>
              <div className="numero-etape">{etape.numero}</div>
              <h4>{etape.titre}</h4>
              <p>{etape.texte}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default EtapeFonctionnement;
  