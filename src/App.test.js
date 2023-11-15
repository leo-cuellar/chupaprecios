import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductCard } from "./components/ProductCard";
import { fireEvent } from "@testing-library/react";
import App from "./App";

test("renderiza product card", () => {
  const product = {
    name: "Producto de prueba",
    price: 100,
    description: "Descripción de prueba",
  };
  render(<ProductCard product={product} />);
  const nameElement = screen.getByText(/Producto de prueba/i);
  expect(nameElement).toBeInTheDocument();
  const priceElement = screen.getByText(/\$100/i);
  expect(priceElement).toBeInTheDocument();
  const descriptionElement = screen.getByText(/Descripción de prueba/i);
  expect(descriptionElement).toBeInTheDocument();
});

test("agrega un producto al carrito y actualiza correctamente el estado del carrito", () => {
  render(<App />);
  const addToCartButtons = screen.getAllByText(/Agregar al carrito/i);
  fireEvent.click(addToCartButtons[0]);
  const cartButton = screen.getByText(/\(1\) Carrito/i);
  expect(cartButton).toBeInTheDocument();
});
