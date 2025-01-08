import axios from 'axios';

export const getMarketOverview = (token) => {
  return axios
    .get("http://localhost:5500/api/overview", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data; // Return the parsed JSON response
    })
    .catch((err) => {
      return err.response?.data || err.message; // Return the error details
    });
};
