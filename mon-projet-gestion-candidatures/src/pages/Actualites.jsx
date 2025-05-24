import { useState, useEffect } from "react";
import axios from "axios";
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { handlefetchActualites } from "../services/newsServices";

const ActualitesVisualization = () => {
  const [actualites, setActualites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);

  const fetchActualites = async () => {
    try {
      const response = await handlefetchActualites();
      setActualites(response.filter((el) => el.status != "inactive"));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching actualités:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActualites();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const isActualiteActive = (expirationDate) => {
    return new Date(expirationDate) > new Date();
  };

  const toggleExpandCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Dernières Actualités
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Restez informé des dernières nouvelles et annonces
          </p>
        </div>

        {actualites.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FiCalendar className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Aucune actualité disponible
            </h3>
            <p className="mt-1 text-gray-500">
              Revenez plus tard pour voir les nouvelles actualités
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {actualites.map((actualite) => (
              <motion.div
                key={actualite._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col rounded-xl shadow-lg overflow-hidden transition-all duration-300
                  ${
                    isActualiteActive(actualite.dateExpiration)
                      ? "bg-white"
                      : "bg-gray-100 opacity-80"
                  }`}
              >
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                        ${
                          isActualiteActive(actualite.dateExpiration)
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {isActualiteActive(actualite.dateExpiration)
                          ? "Active"
                          : "Expirée"}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCalendar className="mr-1" />
                        {formatDate(actualite.dateExpiration)}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {actualite.titre}
                    </h3>

                    <p className="text-gray-500 mb-4">
                      {actualite.description}
                    </p>

                    {expandedCard === actualite._id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="prose prose-sm max-w-none text-gray-500">
                          {actualite.contenu}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => toggleExpandCard(actualite._id)}
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-900 font-medium"
                    >
                      {expandedCard === actualite._id
                        ? "Voir moins"
                        : "Lire la suite"}
                      <FiArrowRight
                        className={`ml-2 transition-transform ${
                          expandedCard === actualite._id ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActualitesVisualization;
