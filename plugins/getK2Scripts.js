import axios from "axios";

function getK2Scripts() {
  return axios.get("http://localhost:5000/getK2Scripts");
}

export default (context, inject) => {
  inject("getK2Scripts", getK2Scripts);
};
