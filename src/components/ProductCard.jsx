import React from "react";
import styled from "styled-components";

const ProductCardBackground = styled.div`
  width: 100%;
  height: auto;
  padding: 18px;
  display: flex;
`;

const ProductInfo = styled.div`
  flex: 1;
  padding-right: 18px;
`;

const ProductName = styled.p`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 18px;
`;

const ProductCTA = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddToCartButton = styled.button`
  border: 1px solid #007bff;
  color: #007bff;
  border-radius: 4px;
  background: white;
  padding: 8px 18px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;

  &:hover {
    background: #007bff;
    color: #fff;
  }
`;

// Renderizamos componente, el boton de carrito ejecuta toggleCart
// cuando se le da click y renderiza dinamicamente el texto dependiendo
// si la instancia del producto esta en el carrito o no.
export const ProductCard = ({ product, toggleCart, isInCart }) => {
  const { name, price, description } = product;
  return (
    <ProductCardBackground>
      <ProductInfo>
        <ProductName>{name}</ProductName>
        <ProductPrice>${price}</ProductPrice>
        <ProductDescription>{description}</ProductDescription>
      </ProductInfo>
      <ProductCTA>
        <AddToCartButton onClick={() => toggleCart(product)}>
          {isInCart ? "Quitar del carrito" : "Agregar al carrito"}
        </AddToCartButton>
      </ProductCTA>
    </ProductCardBackground>
  );
};
