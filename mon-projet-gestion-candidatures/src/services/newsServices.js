import axios from "axios";
let token = "";
let base_url = "http://localhost:3000/api/actualites";
export const handlefetchActualites = async () => {
  try {
    const response = await axios.get(base_url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des actualités", error);
  }
};

export const createActualite = async (newActualite) => {
  let result = await axios.post(base_url, newActualite);
  return result.data;
};

export const updateActualite = async (id, data) => {
  let result = await axios.put(`${base_url}/${id}`, data);
  return result.data;
};
