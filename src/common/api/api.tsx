import axios, { RawAxiosRequestHeaders } from 'axios';
import { API_URL } from './initProperties';

export const API = {
  post : async function (endPoint: string, input: Object) {        
    let headers: RawAxiosRequestHeaders = {};
    let token = localStorage.getItem("token");
    
    if(token !== null)
      headers.Authorization = `Bearer ${token}`;

    return await axios.post(API_URL + endPoint, input, { headers: headers })
    .then(response => {
      return response;
    }).catch(error => {
      throw error.response;
    });
  },

  get : async function (endPoint: string) {        
    let headers: RawAxiosRequestHeaders = {};
    let token = localStorage.getItem("token");
    
    if(token !== null)
      headers.Authorization = `Bearer ${token}`;

    return await axios.get(API_URL + endPoint, { headers: headers })
    .then(response => {
      return response;
    }).catch(error => {
      throw error.response;
    });
  },

  put : async function (endPoint: string, input: Object) {        
    let headers: RawAxiosRequestHeaders = {};
    let token = localStorage.getItem("token");
    
    if(token !== null)
      headers.Authorization = `Bearer ${token}`;

    return await axios.put(API_URL + endPoint, input, { headers: headers })
    .then(response => {
      return response;
    }).catch(error => {
      throw error.response;
    });
  },

  delete : async function (endPoint: string) {        
    let headers: RawAxiosRequestHeaders = {};
    let token = localStorage.getItem("token");
    
    if(token !== null)
      headers.Authorization = `Bearer ${token}`;

    return await axios.delete(API_URL + endPoint, { headers: headers })
    .then(response => {
      return response;
    }).catch(error => {
      throw error.response;
    });
  },
}