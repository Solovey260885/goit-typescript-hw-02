import css from "../ImageCard/ImageCard.module.css";

export default function ImageCard({ image }) {
  const { urls, alt_description } = image;

  return (
    <div className={css.imageCard}>
      <img src={urls.small} alt={alt_description} className={css.image} />
    </div>
  );
}
