import React, { useState, useEffect } from "react";

export default function OffreModal({ isOpen, onClose, offerToEdit, onSave }) {
  const [newOffre, setNewOffre] = useState({
    titre: "",
    description: "",
    dateExpiration: "",
    specialite: "",
    salaire: "",
    type: "emploi", // Default type: "emploi"
  });

  useEffect(() => {
    if (offerToEdit) {
      setNewOffre(offerToEdit);
    }
  }, [offerToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOffre((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newOffre); // Save the offer (either create or update)
    onClose(); // Close the modal after saving
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-md w-96">
          <h3 className="text-xl font-semibold mb-4">
            {offerToEdit ? "Modifier l'offre" : "Créer une nouvelle offre"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Titre de l'offre
              </label>
              <input
                type="text"
                name="titre"
                className="w-full p-2 border border-gray-300 rounded"
                value={newOffre.titre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                className="w-full p-2 border border-gray-300 rounded"
                value={newOffre.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Date d'expiration
              </label>
              <input
                type="date"
                name="dateExpiration"
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-2 border border-gray-300 rounded"
                value={newOffre.dateExpiration.split("T")[0]}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Spécialité
              </label>
              <input
                type="text"
                name="specialite"
                className="w-full p-2 border border-gray-300 rounded"
                value={newOffre.specialite}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Salaire proposé
              </label>
              <input
                type="number"
                name="salaire"
                className="w-full p-2 border border-gray-300 rounded"
                value={newOffre.salaire}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Type d'offre
              </label>
              <select
                name="type"
                className="w-full p-2 border border-gray-300 rounded"
                value={newOffre.type}
                onChange={handleChange}
              >
                <option value="emploi">Emploi</option>
                <option value="stage">Stage</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              {offerToEdit ? "Mettre à jour l'offre" : "Ajouter l'offre"}
            </button>
          </form>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2"
          >
            X
          </button>
        </div>
      </div>
    )
  );
}
