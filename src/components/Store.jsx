import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import { Tooltip } from "react-tooltip";
import { FiMinimize2 } from "react-icons/fi";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FiSearch, FiX } from "react-icons/fi";
import RelatedNews from "./RelatedNews";
import Sponsors from "./Sponsors";
import ProductReturnInfo from "./ProductReturnInfo";
import FAQReturnRefund from "./FAQReturnRefund";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [isCartExpanded, setIsCartExpanded] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedRegion, setSelectedRegion] = useState(""); // Default to blank
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const getLanguagePrefix = () => {
    const language = window.localStorage.getItem("i18nextLng");
    return language ? `/${language}` : ""; // Return the language prefix or an empty string
  };

  useEffect(() => {
    // Scroll to top when component is mounted
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    fetch("/src/ProductsData/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket"));
    if (storedBasket) {
      setBasket(storedBasket);
    }
  }, []);

  useEffect(() => {
    if (basket.length > 0) {
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }, [basket]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        t(`products.${product.key}`)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, products, t]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const addToBasket = (product) => {
    setBasket((prevBasket) => {
      const existingItem = prevBasket.find(
        (item) =>
          item.product.id === product.id &&
          item.size === selectedSizes[product.id],
      );

      if (existingItem) {
        return prevBasket.map((item) =>
          item.product.id === product.id &&
          item.size === selectedSizes[product.id]
            ? {
                ...item,
                quantity: item.quantity + (quantities[product.id] || 1),
              }
            : item,
        );
      } else {
        return [
          ...prevBasket,
          {
            product,
            quantity: quantities[product.id] || 1,
            size: selectedSizes[product.id],
          },
        ];
      }
    });

    setRecentlyAdded(true);
    setTimeout(() => setRecentlyAdded(false), 2000);
    setQuantities((prevQuantities) => ({ ...prevQuantities, [product.id]: 1 }));
  };

  const removeFromBasket = (index) => {
    setBasket((prevBasket) => prevBasket.filter((_, i) => i !== index));
  };

  const proceedToCheckout = () => {
    navigate(`${getLanguagePrefix()}/checkout`, { state: { basket } });
  };

  const cancelPurchase = () => {
    setBasket([]);
    localStorage.removeItem("basket");
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setQuantities((prevQuantities) => ({ ...prevQuantities, [product.id]: 1 }));
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prevSizes) => ({ ...prevSizes, [productId]: size }));
  };

  const totalItems = basket.reduce((total, item) => total + item.quantity, 0);

  // Handle delivery information based on region
  const getDeliveryInfo = () => {
    switch (selectedRegion) {
      case "USA":
        return t("delivery.usa");
      case "Europe":
        return t("delivery.europe");
      case "Asia":
        return t("delivery.asia");
      case "Rest of the World":
        return t("delivery.restOfTheWorld");
      default:
        return "";
    }
  };

  return (
    <div className="bg-blue-50">
      <div className="relative p-4 max-w-7xl mx-auto font-custom">
        {/* Cart Container */}
        <div
          className={`fixed top-48 right-4 bg-white border shadow-lg
              rounded-lg z-10 overflow-auto transition-all duration-500 ease-in-out ${
                isCartExpanded ? "w-full sm:w-80 md:w-96 h-64" : "w-16 h-16"
              }`}
        >
          {/* Open Cart Button */}
          <button
            onClick={() => setIsCartExpanded(true)}
            className="p-2 bg-cyan-950 text-white rounded-full"
            data-tooltip-id="openCartTooltip" // Tooltip ID
          >
            <HiMiniShoppingCart size={20} color="yellow" />
            {totalItems > 0 && (
              <span
                className="bg-red-500 text-white rounded-full
                px-2 py-1 text-xs absolute top-0 right-0 animate-pulse center"
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Tooltip for Open Cart */}
          <Tooltip
            id="openCartTooltip"
            place="top"
            style={{ backgroundColor: "rgb(31 41 55)" }} // gray-800 background
          >
            {t("openCart")}
          </Tooltip>

          {/* Close Cart Button */}
          {isCartExpanded && (
            <button
              onClick={() => setIsCartExpanded(false)}
              className="absolute top-1 right-6 p-1 hover:text-cyan-950 text-gray-500"
              data-tooltip-id="closeCartTooltip" // Tooltip ID
            >
              <FiMinimize2 size={20} />
            </button>
          )}

          {/* Tooltip for Close Cart */}
          <Tooltip
            id="closeCartTooltip"
            place="top"
            style={{ backgroundColor: "rgb(31 41 55)" }} // gray-800 background
          >
            {t("closeCart")}
          </Tooltip>

          {/* Cart Items */}
          {isCartExpanded && (
            <div className="p-4">
              <h2 className="font-bold text-xl">{t("checkout.basket")}</h2>
              {basket.length > 0 ? (
                <ul>
                  {basket.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center mb-4 font-semibold mt-1"
                    >
                      <div>
                        <img
                          src={item.product.image}
                          alt={t(`products.${item.product.key}`)}
                          className="w-14 h-14 object-cover rounded mt-2 mb-1"
                        />
                        <p>{t(`products.${item.product.key}`)}</p>
                        <p className="text-sm text-gray-700 font-semibold mt-1">
                          {t("modals.size")}: {item.size}
                        </p>
                        <p className="text-sm text-gray-700 font-semibold">
                          {t("modals.quantity")} {item.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromBasket(index)}
                        className="text-red-500 mt-6"
                      >
                        {t("remove")}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{t("checkout.empty")}</p>
              )}
              {basket.length > 0 && (
                <div className="mt-4 flex flex-col md:flex-row md:space-x-4 gap-4 md:gap-0">
                  <button
                    onClick={proceedToCheckout}
                    className="bg-green-700 text-white px-3 py-2 rounded-md w-full
                      md:w-auto inline-flex items-center justify-center"
                  >
                    {t("proceedToCheckout")}
                  </button>
                  <button
                    onClick={cancelPurchase}
                    className="bg-red-500 text-white px-3 py-2 rounded-md
                      w-full md:w-auto inline-flex items-center justify-center"
                  >
                    {t("cancelPurchase")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search Bar icon*/}
        <div className="relative flex justify-end items-center">
          <button onClick={toggleSearch} className="focus:outline-none">
            {isSearchOpen ? (
              <FiX
                className="text-2xl md:text-3xl text-gray-600"
                data-tooltip-id={t("toolTip.close")}
                data-tooltip-content={t("toolTip.close")}
              />
            ) : (
              <FiSearch
                className="text-2xl md:text-3xl text-gray-600"
                data-tooltip-id={t("toolTip.open")}
                data-tooltip-content={t("toolTip.open")}
              />
            )}
            <Tooltip
              id={t("toolTip.open")}
              place="bottom"
              style={{ backgroundColor: "rgb(31 41 55)" }}
            />
            <Tooltip
              id={t("toolTip.close")}
              place="bottom"
              style={{ backgroundColor: "rgb(31 41 55)" }}
            />
          </button>

          {/* Animated Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder={t("searchItem.placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`transition-all duration-1000 ease-in-out border-b-2 border-gray-200
              p-2 md:p-4 ml-2 focus:outline-none ${
                isSearchOpen ? "w-[80vw] sm:w-[80vw] md:w-[500px]" : "w-0"
              }`}
              style={{
                visibility: isSearchOpen ? "visible" : "hidden",
              }}
            />
            {/* Clear Button */}
            {searchTerm && isSearchOpen && (
              <FiX
                className="absolute right-3 top-2 md:top-2 cursor-pointer
               text-gray-700 bg-gray-200 rounded-full"
                onClick={clearSearch}
              />
            )}
          </div>
        </div>

        {/* Product Listing */}
        <h1 className="font-extrabold mb-2 text-3xl md:text-4xl lg:text-4xl text-left uppercase mt-2">
          {t("welcome")}
        </h1>
        <div
          className="grid grid-cols-1 sm:grid-cols-2
       lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-4"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg text-left
               flex flex-col justify-between h-full"
              >
                <div
                  className="w-full h-72 overflow-hidden relative
                 mt-4 cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <img
                    src={product.image}
                    alt={t(`products.${product.key}`)}
                    className="w-full h-full object-cover rounded-lg
                   transform transition-transform 
                  duration-300 ease-in-out hover:scale-105"
                  />
                </div>
                <div className="flex-grow mb-4">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 mt-2 h-12">
                    {t(`products.${product.key}`)}
                  </h3>
                  <p className="text-green-700 text-base md:text-2xl font-bold mt-4">
                    {product.price.toFixed(2)} €{" "}
                    <span className="text-xs text-gray-600 font-bold italic">
                      {t("tax.vatinc")}
                    </span>
                  </p>
                </div>

                {/* Quantity and Size Dropdown */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="font-custom font-semibold text-lg">
                    {t("modals.quantity")}
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() =>
                        setQuantities((prevQuantities) => ({
                          ...prevQuantities,
                          [product.id]: Math.max(
                            (prevQuantities[product.id] || 1) - 1,
                            1,
                          ),
                        }))
                      }
                      className="p-2"
                    >
                      <AiOutlineMinus title={t("qbutton.decrease")} />
                    </button>
                    <span className="px-4">{quantities[product.id] || 1}</span>
                    <button
                      onClick={() =>
                        setQuantities((prevQuantities) => ({
                          ...prevQuantities,
                          [product.id]: (prevQuantities[product.id] || 1) + 1,
                        }))
                      }
                      className="p-2"
                    >
                      <AiOutlinePlus title={t("qbutton.increase")} />
                    </button>
                  </div>
                </div>

                {/* Size Dropdown */}
                <div className="mb-4">
                  <label
                    htmlFor="size-select"
                    name="size"
                    className="block font-semibold mb-2 text-lg"
                  >
                    {t("modals.sizes")}
                  </label>
                  <select
                    id="size-select"
                    className="border border-gray-300 rounded-md p-2 w-full outline-none"
                    value={selectedSizes[product.id] || ""}
                    onChange={(e) =>
                      handleSizeChange(product.id, e.target.value)
                    }
                  >
                    <option
                      value=""
                      disabled
                      className="font-custom font-semibold"
                    >
                      {t("modals.selectSize")}
                    </option>
                    <option value="XS" className="font-custom font-medium">
                      XS
                    </option>
                    <option value="S" className="font-custom font-medium">
                      S
                    </option>
                    <option value="M" className="font-custom font-medium">
                      M
                    </option>
                    <option value="L" className="font-custom font-medium">
                      L
                    </option>
                    <option value="XL" className="font-custom font-medium">
                      XL
                    </option>
                    <option value="XXL" className="font-custom font-medium">
                      XXL
                    </option>
                    <option value="XXXL" className="font-custom font-medium">
                      XXXL
                    </option>
                    <option value="24”" className="font-custom font-medium">
                      {t("modals.ball")}: 24”
                    </option>
                    <option value="26”" className="font-custom font-medium">
                      {t("modals.ball")}: 26”
                    </option>
                    <option value="70”" className="font-custom font-medium">
                      {t("modals.bottle")}: 70”
                    </option>
                    <option value="50”" className="font-custom font-medium">
                      {t("modals.bootbag")}: 50”
                    </option>
                    <option value="12 cm" className="font-custom font-medium">
                      {t("modals.bag")}: 12 cm
                    </option>
                    <option value="18 cm" className="font-custom font-medium">
                      {t("modals.bag")}: 18 cm
                    </option>
                    <option value="106 cm" className="font-custom font-medium">
                      {t("modals.bag")}: 106 cm
                    </option>
                    <option
                      value="6.5” x 4.5”"
                      className="font-custom font-medium"
                    >
                      {t("modals.pouch")}: 6.5” x 4.5”
                    </option>
                    <option
                      value="4.3 x 3.3 x 0.5"
                      className="font-custom font-medium"
                    >
                      {t("modals.wallet")}: 4.3 x 3.3 x 0.5
                    </option>
                    <option
                      value={t("modals.universal")}
                      className="font-custom font-medium"
                    >
                      {t("modals.keyring")}
                    </option>
                  </select>
                </div>
                <button
                  onClick={() => addToBasket(product)}
                  className="bg-cyan-950 text-white px-4 py-2
                 rounded-lg mt-auto uppercase font-bold"
                >
                  {t("addToBasket")}
                </button>
              </div>
            ))
          ) : (
            <p
              className="text-xl text-red-500 font-semibold flex
           justify-center items-center text-center mt-16"
            >
              {t("noProducts")}
            </p>
          )}
        </div>

        {/* Product Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-lg">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl 
            hover:bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full 
            transition-colors duration-300 font-bold"
              >
                <FiX size={24} />
              </button>

              <h2 className="font-bold text-xl mb-4">
                {t(`products.${selectedProduct.key}`)}
              </h2>
              <img
                src={selectedProduct.image}
                alt={t(`products.${selectedProduct.key}`)}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              <p className="text-black mb-4 mt-8 font-bold text-2xl">
                {t("modals.material")}
              </p>
              {/* Quantity in Modal */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="font-custom font-semibold text-lg">
                  {t("modals.quantity")}
                </div>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() =>
                      setQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [selectedProduct.id]: Math.max(
                          (prevQuantities[selectedProduct.id] || 1) - 1,
                          1,
                        ),
                      }))
                    }
                    className="p-2"
                  >
                    <AiOutlineMinus title={t("qbutton.decrease")} />
                  </button>
                  <span className="px-4">
                    {quantities[selectedProduct.id] || 1}
                  </span>
                  <button
                    onClick={() =>
                      setQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [selectedProduct.id]:
                          (prevQuantities[selectedProduct.id] || 1) + 1,
                      }))
                    }
                    className="p-2"
                  >
                    <AiOutlinePlus title={t("qbutton.increase")} />
                  </button>
                </div>
              </div>

              {/* Size Dropdown in Modal */}
              <div className="mb-4">
                <label
                  htmlFor="size-select-modal"
                  name="size"
                  className="block font-semibold mb-2 text-lg"
                >
                  {t("modals.sizes")}
                </label>
                <select
                  id="size-select-modal"
                  className="border border-gray-300 rounded-md p-2 w-full outline-none"
                  value={selectedSizes[selectedProduct.id] || ""}
                  onChange={(e) =>
                    handleSizeChange(selectedProduct.id, e.target.value)
                  }
                >
                  <option
                    value=""
                    disabled
                    className="font-custom font-semibold"
                  >
                    {t("modals.selectSize")}
                  </option>
                  <option value="XS" className="font-custom font-medium">
                    XS
                  </option>
                  <option value="S" className="font-custom font-medium">
                    S
                  </option>
                  <option value="M" className="font-custom font-medium">
                    M
                  </option>
                  <option value="L" className="font-custom font-medium">
                    L
                  </option>
                  <option value="XL" className="font-custom font-medium">
                    XL
                  </option>
                  <option value="XXL" className="font-custom font-medium">
                    XXL
                  </option>
                  <option value="XXXL" className="font-custom font-medium">
                    XXXL
                  </option>
                  <option value="24”" className="font-custom font-medium">
                    {t("modals.ball")}: 24”
                  </option>
                  <option value="26”" className="font-custom font-medium">
                    {t("modals.ball")}: 26”
                  </option>
                  <option value="70”" className="font-custom font-medium">
                    {t("modals.bottle")}: 70”
                  </option>
                  <option value="50”" className="font-custom font-medium">
                    {t("modals.bootbag")}: 50”
                  </option>
                  <option value="12 cm" className="font-custom font-medium">
                    {t("modals.bag")}: 12 cm
                  </option>
                  <option value="18 cm" className="font-custom font-medium">
                    {t("modals.bag")}: 18 cm
                  </option>
                  <option value="106 cm" className="font-custom font-medium">
                    {t("modals.bag")}: 106 cm
                  </option>
                  <option
                    value="6.5” x 4.5”"
                    className="font-custom font-medium"
                  >
                    {t("modals.pouch")}: 6.5” x 4.5”
                  </option>
                  <option
                    value="4.3 x 3.3 x 0.5"
                    className="font-custom font-medium"
                  >
                    {t("modals.wallet")}: 4.3 x 3.3 x 0.5
                  </option>
                  <option
                    value={t("modals.universal")}
                    className="font-custom font-medium"
                  >
                    {t("modals.keyring")}
                  </option>
                </select>
              </div>

              <button
                onClick={() => addToBasket(selectedProduct)}
                className="bg-cyan-950 text-white px-4 py-2 
              rounded mt-auto font-bold uppercase"
              >
                {t("addToBasket")}
              </button>
            </div>
          </div>
        )}

        {/* Alert Message for added items*/}
        {recentlyAdded && !isCartExpanded && (
          <div
            className="fixed bottom-20 right-8 bg-green-100 border border-green-400
           text-green-800 px-4 py-3 rounded font-bold z-50"
          >
            <p className="text-md">{t("checkout.itemAddedToCart")}</p>
          </div>
        )}

        {/* Delivery Section */}
        <div
          className="mt-16 bg-white p-6 rounded-lg shadow-2xl border
       border-gray-200"
        >
          <h2 className="text-3xl font-bold text-black mb-6 uppercase font-custom">
            {t("delivery.title")}
          </h2>
          <p className="font-semibold mt-2 mb-4">{t("delivery.shipping")}</p>

          {/* Delivery Companies */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
            <img
              src="/dhl-bg.png"
              alt="DHL"
              className="w-full h-20 object-contain transition-transform
             hover:scale-105 duration-300"
            />
            <img
              src="/ups.png"
              alt="UPS"
              className="w-full h-20 object-contain transition-transform
             hover:scale-105 duration-300"
            />
            <img
              src="/fedex.png"
              alt="FEDEX"
              className="w-full h-20 object-contain transition-transform
             hover:scale-105 duration-300"
            />
            <img
              src="/dpd.png"
              alt="DPD"
              className="w-full h-20 object-contain transition-transform
             hover:scale-105 duration-300"
            />
            <img
              src="/hermes.png"
              alt="HERMES"
              className="w-full h-20 object-contain transition-transform
             hover:scale-105 duration-300"
            />
          </div>

          {/* Region Dropdown */}
          <div className="mb-6">
            <label
              htmlFor="region-select"
              name="region"
              className="block font-semibold text-gray-700 mb-3"
            >
              {t("delivery.selectRegion")}
            </label>
            <select
              id="region-select"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border border-gray-300 outline-none rounded-lg
             p-3 w-full bg-gray-50"
            >
              <option value="" className="font-medium text-gray-400">
                {t("delivery.selectRegion")}
              </option>
              <option value="USA" className="font-medium">
                {t("delivery.usaRegion")}
              </option>
              <option value="Europe" className="font-medium">
                {t("delivery.europeRegion")}
              </option>
              <option value="Asia" className="font-medium">
                {t("delivery.asiaRegion")}
              </option>
              <option value="Rest of the World" className="font-medium">
                {t("delivery.restOfTheWorldRegion")}
              </option>
            </select>
          </div>

          {/* Display Delivery Information */}
          <div className="bg-blue-50 p-5 rounded-lg shadow-md border border-blue-200">
            <h3 className="text-lg font-bold text-gray-700 mb-2">
              {t("delivery.result")}
            </h3>
            <p className="text-gray-600 font-semibold">{getDeliveryInfo()}</p>
          </div>
          <ProductReturnInfo />
        </div>
        <FAQReturnRefund />
        <RelatedNews />
        <Sponsors />
      </div>
    </div>
  );
};

export default Store;
