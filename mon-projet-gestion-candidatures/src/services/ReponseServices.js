import axios from "axios";

let base_url = "http://localhost:3000/api/reponses";

export const AjouterReponse = async (data) => {
  let result = await axios.post(base_url + "/ajouterReponse", data);

  return result.data;
};

export const verifyHasAnswered = async (data) => {
  let result = await axios.get(
    base_url + `/verifyHasAnswered/${data.user_id}/${data.offre_id}`
  );
  return result.data;
};
