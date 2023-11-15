import styled from "styled-components";
import { ProductCard } from "./components/ProductCard";
import { Separator } from "./components/Separator";
import { Header } from "./components/Header";
import { CartButton } from "./components/CartButton";
import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useCatalog } from "./hooks/useCatalog";

// Declaramos los estilos de los contenedores principales
const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1000px;
  overflow-y: auto;
  background-color: white;
`;

// Mock data para simular datos de API
// const MOCK = Array.from({ length: 30 }, (_, i) => ({
//   id: i + 1,
//   name: "Carburador Vw Sedan Vocho 1.6 1978-1992/113-129-031-k",
//   price: "985",
//   description:
//     "Volkswagen Bus Bus Ghia Beetle Sedan Combi 1.6 74-92 113 129 031K/P E-17272/05 Sin Sistema altimetrico 34PICT",
// }));

const App = () => {
  // hook para autenticar con API
  const { token, resetToken } = useAuth();

  // hook para obtener productos
  const { products } = useCatalog(token?.length > 0, resetToken);

  // Estado del carrito
  const [cartItems, setCartItems] = useState([]);

  // Funcion para agregar o eliminar productos del carrito
  const toggleCart = (producto) => {
    setCartItems((prevItems) => {
      const isProductInCart = prevItems.some((item) => item.id === producto.id);
      if (isProductInCart) {
        return prevItems.filter((item) => item.id !== producto.id);
      } else {
        return [...prevItems, producto];
      }
    });
  };

  // Renderizamos componente, incluyendo un mapeo de los productos
  return (
    <AppContainer>
      <Header>
        <CartButton qty={cartItems.length}>Carrito</CartButton>
      </Header>
      <ContentContainer>
        {products?.length > 0 &&
          products.map((product) => {
            const isInCart = cartItems.some((item) => item.id === product.id);
            return (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  toggleCart={toggleCart}
                  isInCart={isInCart}
                />
                <Separator />
              </div>
            );
          })}
      </ContentContainer>
    </AppContainer>
  );
};

export default App;
