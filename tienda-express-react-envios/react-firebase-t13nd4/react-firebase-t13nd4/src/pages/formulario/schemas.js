import * as Yup from "yup";

export const loginSchema = Yup.object({
  name: Yup.string().required("Campo requerido"),
  phone: Yup.string().required("Campo obligatorio"),
  addres: Yup.string().required("el campo es obligatorio"),
  city: Yup.string().required("el campo es obligatorio"),
});
/** 
 * <InputGroup className="mb-3">
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
 * 
 * ***/
