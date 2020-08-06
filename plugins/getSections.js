import axios from "axios";

function getSections() {
  return axios.get("http://localhost:5000/getSections");
}

export default (context, inject) => {
  inject("getSections", getSections);
};
