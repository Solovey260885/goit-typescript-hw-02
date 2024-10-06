import React, { useEffect, useState } from "react";

import { getPhotos, Photo } from "../../photos";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMesage from "../ErrorMesage/ErrorMesage";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

import css from "../App/App.module.css";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<Photo[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(999);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) {
        return;
      }
      setIsloading(true);

      try {
        const { total_pages, results } = await getPhotos(query, page);
        if (!results.length) {
          setIsEmpty(true);
          return;
        }
        setImages((prevImages) => [...prevImages, ...results]);

        setTotalPages(total_pages);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsloading(false);
      }
    };
    fetchData();
  }, [page, query]);

  const onHandleSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setIsEmpty(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: Photo) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={onHandleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {error && <ErrorMesage message={error.message} />}
      {isEmpty && <ErrorMesage message="Nothing found" />}
      {page >= totalPages && <p>END OF COLLECTION!!!!</p>}
      {images.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      {modalIsOpen && selectedImage && (
        <ImageModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default App;
