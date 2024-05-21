import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const WhatsAppLink = ({ caritoDeCompras }) => {
  const navigate = useNavigate();

  return (
    <>
      <from>
        <Link to="formulario">Realizar compra </Link>
        {/* <Button onClick={fetchData}>Realizar compra</Button> */}
      </from>
    </>
  );
};

export default WhatsAppLink;
