import * as Yup from "yup";

export const loginSchema = Yup.object({
  username: Yup.string().required("Campo requerido"),
  password: Yup.string()
    .min(6, "El campo password debe tener al menos 5 caracteres")
    .required("El campo password es obligatorio"),
});
