import axios from "axios";

export const getCandidatCV = async (id) => {
  try {
    let result = await axios.get(
      `http://localhost:3000/api/cvs/getCandidatCv/${id}`
    );
    return result.data;
  } catch (error) {
    console.log(err);
  }
};
