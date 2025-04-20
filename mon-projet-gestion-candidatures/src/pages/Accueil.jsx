import { Link } from 'react-router-dom';
import { Briefcase, User, Newspaper } from 'lucide-react';

export default function Accueil() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
   

      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h2 className="text-4xl font-bold text-blue-600 mb-4">
          Bienvenue sur notre plateforme de gestion des candidatures
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Notre application vous permet de gérer efficacement les candidatures, d'analyser les CV et d'attribuer des tests techniques spécifiques.
        </p>
      </section>

      {/* Features */}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 px-4">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2">Offres d'emploi</h3>
          <p className="text-gray-600 mb-4">Consultez nos offres d'emploi et de stage disponibles.</p>
          <Link to="/offres" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">
            Voir les offres
          </Link>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2">Espace candidat</h3>
          <p className="text-gray-600 mb-4">Gérez votre profil, vos candidatures et passez des tests.</p>
          <Link to="/Connexion" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition">
            Se connecter
          </Link>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Newspaper size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2">Actualités</h3>
          <p className="text-gray-600 mb-4">Restez informé des dernières actualités de notre entreprise.</p>
          <Link to="/actualites" className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded transition">
            Voir les actualités
          </Link>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="bg-blue-50 py-12 px-4">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-10">Comment ça marche ?</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          {[
            { step: '1', title: 'Créez votre compte', text: 'Inscrivez-vous et complétez votre profil avec vos compétences.' },
            { step: '2', title: 'Consultez les offres', text: "Parcourez nos offres d'emploi et de stage disponibles." },
            { step: '3', title: 'Postulez en ligne', text: 'Soumettez votre candidature et votre lettre de motivation.' },
            { step: '4', title: 'Passez les tests', text: 'Démontrez vos compétences à travers nos tests techniques.' }
          ].map(({ step, title, text }) => (
            <div key={step}>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                {step}
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
     
    </div>
  );
}
