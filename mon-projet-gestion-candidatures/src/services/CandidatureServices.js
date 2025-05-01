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
