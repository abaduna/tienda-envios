import React, { useContext, useEffect, useState } from "react";

import { CaritoComprarContex } from "../../contexts/carito";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CaritoDeComprasCOmponet from "../../componets/CaritoDeComprasCOmponet";
import { UserNameContext } from "../../contexts/username";
import { useFetch } from "../../hoocks/useFetch";
import NavbarAdmin from "../../componets/NavbarAdmin";
function VerProductos() {
  const [productos, setProductos] = useState([]);
  const { agregarCarritoDeCompras,remove } = useContext(CaritoComprarContex);
  const [endpoint, setEndpoint] = useState(`/api/productos`);
  const { state, fetchData } = useFetch(endpoint);
  const { data, loading, error } = state;
  
  // const { useAdminState ,setUserAdminState} = useContext(UserNameContext)  || { useAdminState: false };
  const [useAdminState,setUserAdminState] = useState(false)
  console.log(useAdminState);
  console.log(data);
  useEffect(() => {
    fetchData();
    let token = localStorage.getItem("token");

    if (token) {
      setUserAdminState(true);
    }
  }, []);

  const agregarACarrito = (product) => {
    console.log(`click`);
    agregarCarritoDeCompras(product);
  };
  const removeCarrito =(product)=>{
   
    console.log(remove(product));
  }
  return (
    <>
      {useAdminState && <NavbarAdmin className="scroll-container"></NavbarAdmin>}
      <CaritoDeComprasCOmponet></CaritoDeComprasCOmponet>

      <div>
        <div className="productos-grid">
          {data.length > 0 &&
            data?.map((product) => (
              <Card sx={{ maxWidth: 500 }} className="productos-grid-item  ">
                <CardMedia
                  sx={{ height: 450 }}
                  image={product.imagenurl}
                  title={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.descripcion}
                  </Typography>
                  <Typography variant="body3" color="text.primary">
                    {product.precio}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => agregarACarrito(product)}>
                    Agregar a carrito
                  </Button>
                  <Button onClick={()=>removeCarrito(product)}>Sacar del carrito</Button>
                </CardActions>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}

export default VerProductos;
