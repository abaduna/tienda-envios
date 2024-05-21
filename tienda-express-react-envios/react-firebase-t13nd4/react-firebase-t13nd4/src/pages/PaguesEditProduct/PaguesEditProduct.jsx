import React, { useEffect, useState } from "react";
import { useFetch } from "../../hoocks/useFetch";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Row, Col } from "react-bootstrap";
import { API } from "../../API";
import NavbarAdmin from "../../componets/NavbarAdmin";
import { useNavigate } from "react-router-dom";
function PaguesEditProduct() {
  const [endpoint, setEndpoint] = useState(`/api/productos`);
  const { state, fetchData } = useFetch(endpoint);
  const { data, loading, error } = state;
  
const navigate = useNavigate();
  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);
  const fetchDeletd = async (id) => {
    try {
      await API.delete(`/api/productos/${id}`);
      console.log(`eliminado coreectamente`);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (id) => {
    fetchDeletd(id);
    fetchData();
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
  const SacarDeAdmin = () => {
    
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
  useEffect(()=>{
    SacarDeAdmin()

  },[])
  const navigateUpdate =(id)=>{
    navigate(`/producto/${id}`)
  }
  return (
    <><NavbarAdmin></NavbarAdmin>
   
      <Container>
        <Row>
          {data.length > 0 &&
            data?.map((product) => (
              <Col xs={6} lg={4}>
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
                    <Button
                      size="small"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Eliminar
                    </Button>
                    <Button
                      size="small"
                      onClick={() => navigateUpdate(product.id)}
                    >
                      Editar
                    </Button>
                  </CardActions>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default PaguesEditProduct;
