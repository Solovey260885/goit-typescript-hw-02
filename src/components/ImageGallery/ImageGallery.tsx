import ImageCard from "../ImageCard/ImageCard";
import { Photo } from "../../photos";
import css from "../ImageGallery/ImageGallerty.module.css";
import React from "react";

interface ImageGalleryProps {
  images: Photo[];
  openModal: (image: Photo) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <ul className={css.imageGallery}>
      {images.map((image) => (
        <li key={image.id} onClick={() => openModal(image)}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
