import css from "../ErrorMesage/ErrorMesage.module.css";

export default function ErrorMesage({ message }) {
  return (
    <div>
      <p className={css.text}>{message}</p>
    </div>
  );
}
