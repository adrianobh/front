import axios from "axios";

export const  api = axios.create({
  baseURL: "http://ec2-54-89-103-59.compute-1.amazonaws.com:8000",
  headers: {
    'Content-Type': 'application/json',
  }
});

