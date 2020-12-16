import axios from "axios";

const instance = axios.create({
  baseURL: "https://try-2-tele-heroku.herokuapp.com",
});

export default instance;
