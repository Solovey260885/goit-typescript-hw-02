import ImageCard from "../../components/ImageCard/ImageCard";
import css from "../ImageGallery/ImageGallerty.module.css";

export default function ImageGallery({ images, openModal }) {
  return (
    <ul className={css.imageGallery}>
      {images.map((image) => (
        <li key={image.id} onClick={() => openModal(image)}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
}
