import axios from "axios";
import { toast } from "react-toastify";

export const fetchOffres = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/offres/offres");
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des offres", error);
  }
};

export const ajouterOffre = async (data) => {
  const response = await axios.post(
    "http://localhost:3000/api/offres/ajouterOffre",
    data
  );
  return response.data;
};

export const deleteOffre = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/offres/supprimerOffre/${id}`);
    toast.error("offre supprimé !");
  } catch (error) {
    console.error("Erreur lors de la suppression de l'offre", error);
  }
};

export const updateOffre = async (data) => {
  try {
    let result = await axios.put(
      `http://localhost:3000/api/offres/updateOffre/${data._id}`,
      data
    );
    toast.info("offre modifié !");
    return result.data;
  } catch (error) {
    console.error("Erreur lors de la modification de l'offre", error);
  }
};
