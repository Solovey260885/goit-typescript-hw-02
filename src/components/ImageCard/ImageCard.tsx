import css from "../ImageCard/ImageCard.module.css";
import { Photo } from "../../photos";
import React from "react";

interface ImageCardProps {
  image: Photo;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const { urls, alt_description } = image;

  return (
    <div className={css.imageCard}>
      <img src={urls.small} alt={alt_description} className={css.image} />
    </div>
  );
};

export default ImageCard;
