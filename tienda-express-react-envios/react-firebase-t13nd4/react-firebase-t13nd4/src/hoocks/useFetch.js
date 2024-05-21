import { useCallback, useEffect, useReducer, useState } from "react";
import { API } from "../API";
import { fechReducer, initialState } from "../reducers/fetch";
import { FETCH_DATA } from "./../action/fetch";
import { fetchUsers } from "./../action/tetchUsers.action";
import axios from "axios";
export const useFetch = (endpoint) => {
  const [state, dispatch] = useReducer(fechReducer, initialState);

  const fetchData = useCallback(async () => {
    try {
      let { data } = await API.get(endpoint);
      dispatch({ type: FETCH_DATA.SET_DATA, payload: data });
      console.log(data);
    } catch (error) {
      dispatch({ type: FETCH_DATA.SET_ERROR });
    }
  }, [endpoint]);

  const fetchPost = async (datos) => {
    console.log("datos.weight", datos.weight);
    try {
      const formData = new FormData();

      formData.append("title", datos.title);
      formData.append("description", datos.descripction);
      formData.append("precio", datos.precio);
      formData.append("category", datos.category);
      formData.append("imageUpLoading", datos.imageUpLoading);
      formData.append("weight", datos.weight);
      formData.append("stock", datos.stock);
      console.log(formData);
      await API.post("/api/productos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(`algo salio mal en  fetchPost`);
      console.error(error);
    }
  };
  const fetchUsers = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  };
  const fetchDeletd = async () => {
    await API.delete(endpoint);
  };
  const getData = async (ruta) => {


    try {
      const data = await API.get(ruta);
      console.log('data fetch', data.data)
      dispatch({ type: FETCH_DATA.SET_DATA, payload: data.data });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  };
  const postDate=async(ruta,data)=>{
    try {
     const res = await  API.post(ruta,data);
      return res
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  }
  // useEffect(() => {
  //   fetchData();
  //   fetchPost()
  // }, [endpoint,fetchData]);

  return { state, fetchData, fetchPost, fetchUsers, fetchDeletd, getData,postDate };
};
