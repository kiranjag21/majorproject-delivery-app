import http from "../components/HTTP/htttp-common";


const create = data => {
  return http.post("/deliveryusers", data);
};

const login = data =>{
    return http.post("/deliveryusers/login", data);
  }

export default {

    create,login

  };