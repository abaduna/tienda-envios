import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hoocks/useFetch";
import { dispatch } from "react";
import { fromProductAction } from "../../action/formProdcut";
import { Input } from "@mui/material";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
const PaguesProducto = () => {
  const [title, setTitle] = useState("");
  const [descripction, setDescripction] = useState("");
  const [precio, setPrecio] = useState("");
  const [stck, setStck] = useState("");
  const [weight, setWeight] = useState("");
  const [messageSuseful, setMessageSuseful] = useState(false);
  const { state, getData, postDate } = useFetch();
  const { data, loading, error } = state;
  const { producto } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const calltoApi = async () => {
      await getData(`/api/producto/${producto}`);
      console.log('state', state)
    };
    calltoApi();
  }, []);
  useEffect(() => {
    if (data[0]) {
       setTitle(data[0].title);
    setDescripction(data[0].descripction);
    setPrecio(data[0].precio);
    setStck(data[0].stck);
    setWeight(data[0].weight);
    }
   
  }, [data]);
  const update = async () => {
    console.log("clicl");
    const dataUpdate = {
      title,
      descripction,
      category: data[0].category,
      imagenurl: data[0].imagenurl,
      precio,
      weight,
      stck,
    };
    const res = await postDate(`/api/producto/${producto}`, dataUpdate);
    console.log("res", res);
    if (res.data.message === "up date exitoso") {
      setMessageSuseful(true);
    }
    setInterval(() => {
      setMessageSuseful(false);
    }, 1000);
  };
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
  useEffect(()=>{
    const SacarDeAdmin = () => {
    
      let token = localStorage.getItem("token");
      const usuers = parseJwt(token);
  
      if (token === null) {

        navigate("/");
      }
  

    };
    SacarDeAdmin()
  },[])
  return (
    <>
      <div>
        <Input
          name="title"
          className="anchoDePantalla"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <img
          src={data[0] ? data[0].imagenurl : ""}
          alt={title}
          width="500"
          height="600"
        />
        <Input
          name="descripction"
          value={descripction}
          onChange={(e) => setDescripction(e.target.value)}
          className="anchoDePantalla"
        />
        <Input
          name="precio"
          onChange={(e) => setPrecio(e.target.value)}
          value={precio}
          className="anchoDePantalla"
        />
        <Input
          name="stck"
          onChange={(e) => setStck(e.target.value)}
          value={stck}
          className="anchoDePantalla"
        />
        <Input
          name="weight"
          onChange={(e) => setWeight(e.target.value)}
          value={weight}
          className="anchoDePantalla"
        />
        {messageSuseful && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Actualizado correctamente
          </Alert>
        )}
        <button className="btn btn-primary mt-3" onClick={update}>
          Actualizar
        </button>
      </div>
    </>
  );
};

export default PaguesProducto;
