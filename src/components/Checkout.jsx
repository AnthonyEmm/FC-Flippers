import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Checkout = () => {
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const getLanguagePrefix = () => {
    const language = window.localStorage.getItem("i18nextLng");
    return language ? `/${language}` : ""; // Return the language prefix or an empty string
  };

  useEffect(() => {
    const passedBasket = location.state?.basket || [];
    if (passedBasket.length > 0) {
      setBasket(passedBasket);
    } else {
      const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
      setBasket(storedBasket);
    }
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const calculateTotalPrice = () => {
    return basket
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  const removeFromBasket = (index) => {
    const updatedBasket = basket.filter((_, i) => i !== index);
    setBasket(updatedBasket);
  };

  const validateForm = () => {
    let error = "";
    const namePattern = /^[A-Za-z\s]+$/;

    const currentYear = new Date().getFullYear();
    const currentYearShort = parseInt(currentYear.toString().slice(-2));

    if (!cardName || !namePattern.test(cardName)) {
      error = t("payment.errorName");
    } else if (!/^\d{16}$/.test(cardNumber.replace(/-/g, ""))) {
      error = t("payment.errorCardNumber");
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      error = t("payment.errorExpiryDate");
    } else {
      const expiryYear = parseInt(expiryDate.split("/")[1], 10);
      const expiryMonth = parseInt(expiryDate.split("/")[0], 10);

      if (expiryYear < currentYearShort) {
        error = t("payment.errorInvalidYear");
      } else if (
        expiryYear === currentYearShort &&
        expiryMonth < new Date().getMonth() + 1
      ) {
        error = t("payment.errorExpiredCard");
      } else if (!/^\d{3}$/.test(cvv)) {
        error = t("payment.errorCVV");
      }
    }

    if (error) {
      setFormError(error);
      return false;
    }

    setFormError("");
    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setFormError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setPurchaseSuccess(true);
      setBasket([]);
      localStorage.removeItem("basket");

      setCardNumber("");
      setCardName("");
      setExpiryDate("");
      setCvv("");

      setTimeout(() => {
        navigate(`${getLanguagePrefix()}/store`);
      }, 4000);
    } catch (error) {
      console.error("Checkout failed", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelCheckout = () => {
    navigate(`${getLanguagePrefix()}/store`);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (formError) {
      setFormError("");
      setTimeout(() => {
        setFormError("");
      }, 1000);
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/-/g, "");
    if (value.length > 4) {
      value = value.match(/.{1,4}/g).join("-");
    }
    setCardNumber(value);
  };

  const handleExpiryDateChange = (e) => {
    let input = e.target.value;

    if (input.length === 2 && !input.includes("/")) {
      input = input + "/";
    }

    if (input.length > 5) {
      input = input.slice(0, 5);
    }

    setExpiryDate(input);
  };

  return (
    <div className="w-full p-4 font-custom bg-blue-50 min-h-[64vh] md:min-h-[74vh]">
      <div className="p-4 max-w-4xl mx-auto font-custom">
        <h1 className="text-3xl font-extrabold mb-3 uppercase">
          {t("checkout.checkoutPage")}
        </h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 flex items-center space-x-2 gap-2">
            {t("checkout.basket")}
            <HiMiniShoppingCart className="text-2xl text-yellow-500" />
          </h2>
          <div className="border p-4 rounded-lg">
            {basket.length > 0 ? (
              <>
                {basket.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2 font-custom font-semibold"
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src={item.product.image}
                        alt={t(`products.${item.product.key}`)}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <div>
                        <span>{t(`products.${item.product.key}`)}</span>
                        <span className="text-sm text-gray-800 font-semibold">
                          {" "}
                          x{item.quantity}
                        </span>
                        {/* Displays the selected size */}
                        {item.size && (
                          <div className="text-sm text-gray-500">
                            {t("checkout.size")}: {item.size}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">
                        {item.product.price.toFixed(2)}€ x {item.quantity} =
                      </span>
                      <span>
                        {(item.product.price * item.quantity).toFixed(2)}€
                      </span>
                      <button
                        onClick={() => removeFromBasket(index)}
                        className="text-red-700 font-bold text-4xl"
                        id={t("checkoutCart.remove")}
                      >
                        &times;
                      </button>
                      <ReactTooltip
                        anchorId={t("checkoutCart.remove")}
                        place="top"
                        content={t("checkoutCart.remove")}
                        style={{ backgroundColor: "rgb(31 41 55)" }}
                      />
                    </div>
                  </div>
                ))}
                <div className="flex justify-between font-bold mt-4 text-2xl">
                  <span>{t("checkout.total")}:</span>
                  <span>{calculateTotalPrice()} €</span>
                </div>
              </>
            ) : (
              <p>{t("checkout.empty")}</p>
            )}
          </div>
        </div>

        <div className="border p-4 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase">
            {t("payment.Information")}
          </h2>
          {formError && (
            <p className="text-red-600 font-semibold">{formError}</p>
          )}
          <div className="mb-4 font-semibold">
            <label className="block mb-2">{t("payment.NameOnCard")}</label>
            <input
              type="text"
              name="cardName"
              value={cardName}
              onChange={handleInputChange(setCardName)}
              className="border rounded p-2 w-full outline-none"
              placeholder={t("payment.cardNamePlaceholder")}
              id={t("payment.nameTitle")}
            />
            <ReactTooltip
              anchorId={t("payment.nameTitle")}
              place="top"
              content={t("payment.nameTitle")}
              style={{ backgroundColor: "rgb(31 41 55)" }}
            />
          </div>

          <div className="mb-4 font-semibold">
            <label className="block mb-2">{t("payment.cardNumber")}</label>
            <div className="flex items-center space-x-2">
              <input
                type="tel"
                name="cardNumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="border rounded p-2 outline-none w-[80%] sm:w-full"
                placeholder={t("payment.cardNumberPlaceholder")}
                pattern="[0-9]*"
                id={t("payment.cardNumberTitle")}
                maxLength="19"
              />

              <div className="flex space-x-1 flex-shrink-0">
                <img
                  src="/Visa-Logo.png"
                  alt="Visa"
                  className="h-6 w-6 object-contain sm:h-6 sm:w-auto"
                />
                <img
                  src="/Mastercard-logo.png"
                  alt="MasterCard"
                  className="h-6 w-6 object-contain sm:h-6 sm:w-auto"
                />
                <img
                  src="/amex.png"
                  alt="American Express"
                  className="h-6 w-6 object-contain sm:h-6 sm:w-auto"
                />
                <img
                  src="/PayPal.png"
                  alt="PayPal"
                  className="h-6 w-6 object-contain sm:h-6 sm:w-auto"
                />
                <img
                  src="/Stripe.png"
                  alt="Stripe"
                  className="h-6 w-6 object-contain sm:h-6 sm:w-auto"
                />
              </div>
            </div>
            <ReactTooltip
              anchorId={t("payment.cardNumberTitle")}
              place="top"
              content={t("payment.cardNumberTitle")}
              style={{ backgroundColor: "rgb(31 41 55)" }}
            />
          </div>

          <div className="mb-4 flex justify-between space-x-4 font-medium">
            <div className="w-1/2">
              <label className="block mb-2">{t("payment.expiryDate")}</label>
              <input
                type="text"
                name="expiryDate"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                className="border rounded p-2 w-full outline-none"
                placeholder={t("payment.expiryPlaceholder")}
                maxLength="5"
                id={t("expiry.placeholder")}
              />
              <ReactTooltip
                anchorId={t("expiry.placeholder")}
                place="top"
                content={t("payment.placeholder")}
                style={{ backgroundColor: "rgb(31 41 55)" }}
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 font-medium">CVV/CVC</label>
              <input
                type="tel"
                name="cvv"
                value={cvv}
                onChange={handleInputChange(setCvv)}
                className="border rounded p-2 w-full outline-none"
                placeholder={t("payment.cvvPlaceholder")}
                pattern="[0-9]*"
                maxLength="3"
                id={t("payment.cvvTitle")}
              />
            </div>
          </div>
          <ReactTooltip
            anchorId={t("payment.cvvTitle")}
            place="bottom"
            content={t("payment.cvvTitle")}
            style={{ backgroundColor: "rgb(31 41 55)" }}
          />
        </div>
        <div
          className="flex flex-col sm:flex-row justify-between items-center 
          mt-8 mb-16 space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white py-2 px-4 rounded-md 
            w-full sm:w-auto hover:bg-green-700 transition-all duration-200 font-semibold"
            disabled={loading}
          >
            {loading
              ? t("checkout.processing")
              : t("checkout.completePurchase")}
          </button>
          <button
            onClick={cancelCheckout}
            className="bg-red-500 text-white py-2 px-4 rounded-md 
          w-full sm:w-auto hover:bg-red-600 transition-all duration-200 font-semibold"
          >
            {t("checkout.cancel")}
          </button>
        </div>

        {purchaseSuccess && (
          <div className="mt-8 text-center font-semibold text-green-600">
            {t("checkout.successMessage")}
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
