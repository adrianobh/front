import axios from "axios";
console.log('api.js');
export const  api = axios.create({
  baseURL: "http://ec2-34-201-133-195.compute-1.amazonaws.com:8000",
  headers: {
    'Content-Type': 'application/json',
  }
});

