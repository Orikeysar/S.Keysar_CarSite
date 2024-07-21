import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const getCars = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const addCar = async (formData) => {
  const response = await axios.post(apiUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const deleteCar = async (id) => {
  const response = await axios.delete(`${apiUrl}/${id}`);
  return response.data;
};
