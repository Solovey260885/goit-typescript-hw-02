import React from "react";
import css from "../ErrorMesage/ErrorMesage.module.css";

interface ErrorMesageProps {
  message: string;
}

const ErrorMesage: React.FC<ErrorMesageProps> = ({ message }) => {
  return (
    <div>
      <p className={css.text}>{message}</p>
    </div>
  );
};

export default ErrorMesage;
