import React from "react";
import { useParams } from "react-router-dom";
import "./congrstulation.css"
function PaguesCongratulation() {
  const { name } = useParams();
  console.log(name);
  return (
    <div className="congratulation-container">
      <p className="congratulation-message">Felicitación {name}</p>
      <p className="success-message">Su pedido fue concretado con éxito</p>
    </div>
  );
}

export default PaguesCongratulation;
