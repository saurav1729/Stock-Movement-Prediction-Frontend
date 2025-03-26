import axios from 'axios';


export const getMarketOverview = async (token) => {
  const apiUrl = 'http://localhost:5500/api/niftysensex'; // Replace with your actual API URL

  try {
    console.log("Fetching market overview with token:", token); // Log token
    const response = await axios.get(apiUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API Response:", response.data); // Log the entire response
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching market overview data:", error); // Log the error
    throw error; // Re-throw the error for handling in the calling code
  }
};
