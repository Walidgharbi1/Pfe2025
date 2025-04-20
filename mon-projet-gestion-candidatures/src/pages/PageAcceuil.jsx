import CarteFonction from '../composants/CarteFonction';
import EtapeFonctionnement from '../composants/EtapeFonctionnement';

function PageAccueil() {
  return (
    <div>
      <header className="en-tete">
        <h1>Gestion des Candidatures</h1>
        <nav className="navigation">
          <a href="#">Offres</a>
          <a href="#">Actualités</a>
          <Link to="/connexion" className="hover:underline">Connexion</Link>
          <Link to="/inscription" className="hover:underline">Inscription</Link>
          </nav>
      </header>

      <main className="contenu-principal">
        <h2 className="titre-principal">Bienvenue sur notre plateforme de gestion des candidatures</h2>
        <p className="sous-titre">
          Notre application vous permet de gérer efficacement les candidatures, d'analyser les CV et d'attribuer des tests techniques spécifiques.
        </p>

        <div className="section-cartes">
          <CarteFonction
            icone="💼"
            titre="Offres d'emploi"
            description="Consultez nos offres d'emploi et de stage disponibles."
            bouton="Voir les offres"
            couleur="bleu"
          />
          <CarteFonction
            icone="👤"
            titre="Espace candidat"
            description="Gérez votre profil, vos candidatures et passez des tests."
            bouton="Se connecter"
            couleur="vert"
          />
          <CarteFonction
            icone="📰"
            titre="Actualités"
            description="Restez informé des dernières actualités de notre entreprise."
            bouton="Voir les actualités"
            couleur="violet"
          />
        </div>

        <EtapeFonctionnement />

      </main>

      <footer className="pied-page">
        <p>© 2025 - Application de Gestion des Candidatures</p>
      </footer>
    </div>
  );
}

export default PageAccueil;
