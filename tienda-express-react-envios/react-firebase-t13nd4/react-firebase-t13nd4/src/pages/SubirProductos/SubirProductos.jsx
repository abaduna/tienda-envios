import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hoocks/useFetch";
import NavbarAdmin from "../../componets/NavbarAdmin";
function SubirProductos() {
  const [title, SetTitle] = useState("");
  const [descripcion, SetDescripcion] = useState("");
  const [precio, SetPrecion] = useState("");
  const [url, SetUrl] = useState("");
  const [ShowPoster, SetshowPoster] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [imageUpLoading, setImageUpLoading] = useState(null);
  const [endpoint, setEndpoint] = useState(`/api/productos`);
  const [stock, setStock] = useState(null);
  const [weight, setWeight] = useState(null);
  const { state, fetchPost } = useFetch(endpoint);
  const { data, loading, error } = state;
console.log('weight', weight)
  const empty = () => {
    setImageUpLoading(null);
    SetUrl("");
    SetDescripcion("");
    SetTitle("");
    SetPrecion("");
    SetshowPoster(false);
    setWeight(null)
    setStock(null)
  };

  const handlerMandeDataTotal = (e) => {
    e.preventDefault();
    console.log(`click`);
    let datos = {
      title,
      descripction: descripcion,
      precio,
      category: "perfumes", //ojo que este esta hardcodeado
      imageUpLoading,
      weight,
      stock
    };
    console.log(`handlerMandeDataTotal`);
    console.log(datos);
    fetchPost(datos);
    empty();
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };
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
  return (
    <>
      <NavbarAdmin></NavbarAdmin>
      <label>Titulo </label>
      {showAlert && <Alert severity="success">Subiendo</Alert>}
      <form onSubmit={handlerMandeDataTotal} enctype="multipart/form-data">
        <Input
          placeholder="Titulo"
          value={title}
          name={title}
          onChange={(e) => SetTitle(e.target.value)}
          type="string"
          className="anchoDePantalla"
        ></Input>
        <Input
          placeholder="Descripcion..."
          value={descripcion}
          name={descripcion}
          onChange={(e) => SetDescripcion(e.target.value)}
          type="string"
          className="anchoDePantalla"
        ></Input>
        <input
          type="file"
          name={imageUpLoading}
          className="anchoDePantalla"
          onChange={(e) => setImageUpLoading(e.target.files[0])}
        />
        <Input
          placeholder="Precio"
          value={precio}
          name={precio}
          onChange={(e) => SetPrecion(e.target.value)}
          type="number"
          className="anchoDePantalla"
        ></Input>
        <Input
          placeholder="peso en gramos"
          value={weight}
          name={weight}
          onChange={(e) => setWeight(+e.target.value)}
          type="number"
          className="anchoDePantalla"
        ></Input>
        <Input
          placeholder="stock"
          value={stock}
          name={stock}
          onChange={(e) => setStock(+e.target.value)}
          type="number"
          className="anchoDePantalla"
        ></Input>
        <button type="submit" className="btn btn-primary mt-3">
          enviar data
        </button>
      </form>
    </>
  );
}

export default SubirProductos;
