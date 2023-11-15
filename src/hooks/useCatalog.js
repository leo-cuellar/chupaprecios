import { useEffect, useState } from "react";

export const useCatalog = (loggedIn, resetToken) => {
  const [products, setProducts] = useState([]);
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const catalogResponse = await fetch(
          "https://chupaprecios.com.mx/rest/V1/chupaprecios/customcatalog/?search=perro&selected_store=amazon&page_num=1",
          {
            headers: {
              Authorization: `Bearer ${localStorage
                .getItem("authToken")
                .slice(1, -1)}`,
            },
          }
        );
        const catalog = await catalogResponse.json();
        const products = catalog.data.items;

        const productDetails = await Promise.all(
          products.map(async (product) => {
            const productResponse = await fetch(
              `https://chupaprecios.com.mx/rest/V1/chupaprecios/productdetail/?asin=${product.asin}&selected_store=amazon`
            );
            const productJson = await productResponse.json();
            const productDetail = productJson.data.item;

            return {
              id: product.asin,
              name: product.title,
              price: product.details.price,
              description: productDetail.description,
            };
          })
        );

        setProducts(productDetails);
      } catch (error) {
        if (error.response && error.response.status === 401 && !retry) {
          setRetry(true);
          resetToken();
          fetchProducts();
        }
      }
    };
    if (loggedIn) {
      fetchProducts();
    }
  }, [loggedIn, resetToken, retry]);

  return { products };
};
