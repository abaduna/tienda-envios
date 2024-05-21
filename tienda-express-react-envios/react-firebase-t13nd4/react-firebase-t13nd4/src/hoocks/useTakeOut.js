import { useNavigate } from "react-router-dom";
export const sacarDeAdmin = () => {
  const navigate = useNavigate();
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
