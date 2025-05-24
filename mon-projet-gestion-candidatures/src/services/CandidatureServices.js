import axios from "axios";

export const handleCreateCandidature = async (data) => {
  console.log(data);
  let result = await axios.post(
    "http://localhost:3000/api/candidatures/createCandidature",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return result.data;
};

export const getAllCandidatures = async () => {
  let result = await axios.get(
    "http://localhost:3000/api/candidatures/getAllCandidatures"
  );
  return result.data;
};

export const getCandidaturesByCandidatId = async (id) => {
  let result = await axios.get(
    "http://localhost:3000/api/candidatures/getCandidaturesByCandidatId/" + id
  );
  return result.data;
};

export const updateCandidatureStatus = async (data) => {
  const { id, status } = data;
  let result = await axios.put(
    "http://localhost:3000/api/candidatures/update_candidature/" + id,
    { status: status }
  );
  return result.data;
};
