import axios from 'axios';
import https from 'https';

const myAxios = axios.create({
  baseURL: "https://dave-scandiweb.000webhostapp.com/",
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

export default myAxios;
