import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { CaritoComprarContex } from "../../contexts/carito";
import axios from "axios";
import { useFormik } from "formik";
import { loginSchema } from "./schemas";
import Alert from "react-bootstrap/Alert";
import provicias from "./JSON/provincias.json";
import municipio from "./JSON/municipio.json";
const PagesFormulario = () => {
  const [proviciaID, setProvincia] = useState("");
  const [city, setCity] = useState("");
  const { caritoDeCompras } = useContext(CaritoComprarContex);
  let total = caritoDeCompras.reduce(
    (acc, producto) => acc + parseFloat(producto.precio),
    0
  );
  

  const fetchData = async (value) => {
    total = total + 600;
   
    const data = {
      total,
      caritoDeCompras,
      name: value.name,
      phone: value.phone,
      addres: value.addres,
      city: city,
      provincia:proviciaID
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/mercadopago",
        { data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data); // Assuming the relevant data is in response.data

      window.location.href = response.data;
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      addres: "",
      city: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(`onSubmit`);
      fetchData(values);
    },
  });


  return (
    <>
      <h1>Furmalario para pedido</h1>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="nombre"
              aria-label="nombre"
              id="name"
              name="name"
              type="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          {formik.touched.name && formik.errors.name && (
            <Alert variant="danger">{formik.errors.name}</Alert>
          )}

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">+54 9</InputGroup.Text>
            <Form.Control
              placeholder="caracteristica + numero"
              aria-label="phone"
              type="number"
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
          </InputGroup>
          {formik.touched.phone && formik.errors.phone && (
            <Alert variant="danger">{formik.errors.phone}</Alert>
          )}

          <div>
            
            <Form.Select
              aria-label="provincias"
              onChange={(e) => setProvincia(e.target.value)}
            >
              <option>Selecion la provincia</option>
              {provicias.provincias.map((provicia, i) => (
                <option value={provicia.nombre}>{provicia.nombre}</option>
              ))}
            </Form.Select>
            <Form.Select aria-label="ciudades">
              <option>Selecion la ciudad</option>
                {municipio.municipios
                .filter((elemento) => elemento.provincia.nombre == proviciaID)
                .map((elemento) => (
                  <option value={elemento.id}>{elemento.nombre}</option>
                ))}
            </Form.Select>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="addres"
                aria-label="addres"
                id="addres"
                type="addres"
                onChange={formik.handleChange}
                value={formik.values.addres}
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            {formik.touched.addres && formik.errors.addres && (
              <Alert variant="danger">{formik.errors.addres}</Alert>
            )}
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="city"
                aria-label="city"
                id="city"
                type="city"
                onChange={formik.handleChange}
                value={formik.values.city}
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            {formik.touched.city && formik.errors.city && (
              <Alert variant="danger">{formik.errors.city}</Alert>
            )}
          </div>

          <Button type="submit" variant="success">
            Hacer pedido
          </Button>
        </form>
      </div>
    </>
  );
};

export default PagesFormulario;
