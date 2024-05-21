import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "react-bootstrap/Table"
function ComponetTable({ data, send, viewOrders, open,productList ,handleClose}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button onClick={handleClose}>❌</button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {productList &&
              productList.map((product, index) => (
                <div key={index}>
                  <p>Product Name: {product.nombre}</p>
                  <p>Quantity: {product.precio}</p>
                  <button>Deletd</button>
                </div>
              ))}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>nombre</th>
            <th>fecha</th>
            <th>estado</th>
            <th>total</th>
            <th></th>
            <th>pagado</th>
            <th>cuidad</th>
            <th>direccion</th>
            <th>Celular</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{new Date(+item.cuando_fue_comprado).toLocaleString()}</td>
                <td>
                  {item.estado}
                  <br />
                  <button onClick={() => send(item.id_orden)}>🚗</button>
                </td>
                <td>{item.total}</td>
                <td>
                  <button onClick={() => viewOrders(item.id_orden)}>
                    📚Ver lista de productos
                  </button>
                </td>
                <td>{item.pagado? "pagado":"no pagado"}</td>
                <td>{item.city}</td>
                <td>{item.addres}</td>
                <td>+549{item.phone}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default ComponetTable;
