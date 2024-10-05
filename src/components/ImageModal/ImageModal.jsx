import Modal from "react-modal";
import css from "../ImageModal/ImageModal.module.css";

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, onRequestClose, image }) {
  if (!image) {
    return null;
  }

  const { urls, alt_description, user, likes } = image;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.reactModalOverlay}
    >
      <div>
        <p className={css.text}>Description: {alt_description}</p>
        <img src={urls.regular} alt={alt_description} className={css.img} />
        <p className={css.text}>Author: {user.name}</p>
        <p className={css.text}>Likes: {likes}</p>

        <button onClick={onRequestClose} className={css.btn}>
          Close
        </button>
      </div>
    </Modal>
  );
}
