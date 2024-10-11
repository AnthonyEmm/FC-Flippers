import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // If products are passed via state
        const products = location.state?.products || [];
        const foundProduct = products.find((p) => p.id === parseInt(id));

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          // Fetch from API or JSON file if not found in state
          const response = await fetch("/src/ProductsData/products.json");
          const data = await response.json();
          const product = data.products.find((p) => p.id === parseInt(id));
          setProduct(product);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Error fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, location.state?.products]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>{t("productNotFound")}</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto font-custom">
      <button
        onClick={handleBack}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {t("back")}
      </button>
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-auto mb-4 rounded-lg shadow-md"
      />
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">
        {t("price")}: €{product.price.toFixed(2)}
      </p>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <button
          onClick={() => console.log("Add to Cart")} // Implement cart functionality
          className="bg-green-600 text-white px-6 py-2 rounded mb-4 md:mb-0"
        >
          {t("addToCart")}
        </button>
        <button
          onClick={handleBack}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded"
        >
          {t("backToStore")}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
