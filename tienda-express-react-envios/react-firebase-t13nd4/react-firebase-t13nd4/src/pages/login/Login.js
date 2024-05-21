import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Container, Grid, TextField, Button, Box } from "@mui/material";
import { loginSchema } from "./schemas";
import { useFetch } from "./../../hoocks/useFetch";
import axios from "axios";
import NavbarAdmin from "../../componets/NavbarAdmin";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [useAdminState,setUserAdminState] = useState(false)
  const [endpoint, setEndpoint] = useState(`/api/productos`);
  const { state, fetchUsers } = useFetch(endpoint);

  const handleLogin = async (values) => {
    console.log(`values ${values.username}`);
    console.log(values.password);
    try {
      console.log(`try`);
      const data = {
        username: values.username,
        password: values.password,
      };
      console.log("data");
      console.log(data);
      const response = await axios.post(
        "http://localhost:3001/api/users",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.token);
  guardarToken(response.data.token)
    } catch (error) {
      console.log(`catch`);
      console.error(error);
      console.error("Error al subir a la api login:", error.message);
    }
  };
  const guardarToken =(token)=>{
    if (token != "") {
      localStorage.setItem("token", token)
    }
    navigate("/panelentrados")
  }
  const formik = useFormik({
    initialValues: {
      username: username,
      password: password,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(`onSubmit`);
      console.log(values);
      handleLogin(values);
    },
  });
useEffect(()=>{
  let token = localStorage.getItem("token");

  if (token) {
    setUserAdminState(true);
  }
},[])
  return (
    <>
    {useAdminState && <NavbarAdmin className="scroll-container"></NavbarAdmin>}
     <Container>
      <Grid container="row" justifyContent={"center"} alignContent={"center"}>
        <Grid item xs={12} md={4}>
          <form onSubmit={formik.handleSubmit}>
            <Box mt={2}>
              <TextField
                type="text"
                name="username"
                label="username"
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                fullWidth
              />
              {formik.touched.username && formik.errors.username && (
                <span>{formik.errors.username}</span>
              )}
            </Box>
            <Box mt={2}>
              <TextField
                type="password"
                name="password"
                label="password"
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                fullWidth
              />
              {formik.touched.password && formik.errors.password && (
                <span>{formik.errors.password}</span>
              )}
            </Box>
            <Box mt={3}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Iniciar Sesión
              </Button>
            </Box>
          </form>
          {wrongPassword && <span> Usuario o Contraseña incorrecta</span>}
        </Grid>
      </Grid>
    </Container>   
    </>

  );
};

export default Login;
