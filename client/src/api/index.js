import axios from "axios";

const getData = () => {
  return axios.get("/data");
};

const updateCell = (cellId, value) => {
  const url = "/data/" + cellId;
  return axios.post(url, { value: value });
};

const getDataByCell = cellId => {
  const url = "/data/" + cellId;
  return axios.get(url);
};

export { getData, updateCell, getDataByCell };
