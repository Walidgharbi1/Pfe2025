import axios from "axios";
import { toast } from "react-toastify";

let base_url = "http://localhost:3000/api/";

export const fetchCandidats = async () => {
  try {
    const res = await axios.get(base_url + "candidats/getAllCandidats");
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des candidats", error);
  }
};

export const supprimerCandidat = async (id) => {
  try {
    let res = await axios.delete(
      base_url + `candidats/supprimerCandidate/${id}`
    );
    toast.error(res.data.msg);
    return res.data;
  } catch (err) {
    console.error("Erreur lors de la suppression", err);
  }
};

export const toggleCandidatStatus = async (id, status) => {
  try {
    let res = await axios.put(base_url + `candidats/updateCandidat/${id}`, {
      status: status,
    });
    toast.info(res.data.msg);
    return res.data;
  } catch (err) {
    console.error("Erreur lors de la suppression", err);
  }
};

export const fetchUsers = async () => {
  let data = await axios.get(base_url + "auth/get_all_users");
  return data.data;
};
