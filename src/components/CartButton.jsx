import React from "react";
import styled from "styled-components";

const CartButtonContainer = styled.button`
  background-color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 18px;
  cursor: pointer;
  font-size: 16px;
`;

// Componente de carrito que muestra la cantidad de productos en el carrito
export const CartButton = ({ qty = 0 }) => {
  return <CartButtonContainer>({qty}) Carrito</CartButtonContainer>;
};
