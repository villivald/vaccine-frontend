import axios from "axios";
const baseUrl = "https://polar-basin-63646.herokuapp.com/api/vaccinations";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const exportedObject = {
  getAll,
};

export default exportedObject;
