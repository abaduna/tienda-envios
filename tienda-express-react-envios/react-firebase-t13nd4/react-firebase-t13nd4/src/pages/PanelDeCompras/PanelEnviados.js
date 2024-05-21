import React, { useEffect } from "react";

import NavbarAdmin from "../../componets/NavbarAdmin";
import { useFetch } from "../../hoocks/useFetch";
import { useState } from "react";
import { API } from "../../API";
import ComponetTable from "./components/ComponetTable";
import { useNavigate } from "react-router-dom";
function PanelEnviados() {
  const [endpoint, setEndpoint] = useState(
    `/api/pedidos/entregados/por entregar`
  );
  const { state, fetchData } = useFetch(endpoint);
  const { data, loading, error } = state;
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState(null);

  const send = async (id_orden) => {
    await API.patch(`/api/pedidos/ModifyStatus/${id_orden}`, {
      estado: "enviado",
    });
    fetchData();
  };
  const viewOrders = async (id_orden) => {
    console.log(`click`);
    console.log(id_orden);
    setOpen(true);
    try {
      const productListData = await API.get(
        `/api/pedidos/productList/${id_orden}`
      );
      console.log(productListData.data);
      setProductList(productListData?.data);
    } catch (error) {}
  };
  const handleClose = () => setOpen(false);
  useEffect(() => {
    fetchData();
  }, []);
  function parseJwt(token) {
    if (token && token !== "") {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    }
  }
  const navigate = useNavigate();
  const sacarDeAdmin = () => {
    let token = localStorage.getItem("token");
    const usuers = parseJwt(token);
    console.log(usuers);

    if (token === null) {
      console.log("sali de aka");
      console.log("anda de aka no se que estas haciendo aka");
      navigate("/");
    }

    console.log("token de sp " + token);
  };
  useEffect(() => {
    sacarDeAdmin();
  }, []);
  return (
    <>
      <NavbarAdmin></NavbarAdmin>
      <div>
        <ComponetTable
          data={data}
          send={send}
          viewOrders={viewOrders}
          open={open}
          productList={productList}
          handleClose={handleClose}
        ></ComponetTable>
      </div>
    </>
  );
}

export default PanelEnviados;
