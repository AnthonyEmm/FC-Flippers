import React from "react";
import { useTranslation } from "react-i18next";

const Confirmation = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4 max-w-4xl mx-auto font-custom">
      <h1 className="text-2xl font-bold mb-4">{t("thankyou.thanks")}</h1>
      <p>{t("thankyou.orderConfirm")}</p>
    </div>
  );
};

export default Confirmation;
