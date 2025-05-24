import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Get all interviews
// export const getAllInterviews = async (filters = {}) => {
//   try {
//     const queryParams = new URLSearchParams();

//     for (const key in filters) {
//       if (filters[key]) {
//         queryParams.append(key, filters[key]);
//       }
//     }

//     const response = await axios.get(
//       `${API_URL}/interviews?${queryParams.toString()}`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching interviews:", error);
//     throw error;
//   }
// };

export const getAllInterviews = async () => {
  try {
    const response = await axios.get(`${API_URL}/interviews`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching interviews:", error);
    throw error;
  }
};

// Get available time slots
export const getAvailableSlots = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/interviews/slots`, {
      params: {
        date: date.toISOString(),
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching available slots:", error);
    throw error;
  }
};

// Schedule an interview
export const scheduleInterview = async (interviewData) => {
  console.log(interviewData);
  try {
    const response = await axios.post(`${API_URL}/interviews`, interviewData);
    return response.data.data;
  } catch (error) {
    console.error("Error scheduling interview:", error);
    throw error;
  }
};

// Update an interview
export const updateInterview = async (id, updateData) => {
  try {
    const response = await axios.put(
      `${API_URL}/interviews/${id}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating interview:", error);
    throw error;
  }
};

// Cancel an interview
export const cancelInterview = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/interviews/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error canceling interview:", error);
    throw error;
  }
};

// Get interview by ID
export const getInterviewById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/interviews/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching interview:", error);
    throw error;
  }
};

export const sendRefusalEmail = async (data) => {
  let res = await axios.post(`${API_URL}/interviews/send_refus_email`, data);
  return res.data;
};
