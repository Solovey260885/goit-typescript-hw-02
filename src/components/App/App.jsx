import { useEffect, useState } from "react";

import { getPhotos } from "../../photos";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMesage from "../ErrorMesage/ErrorMesage";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

import css from "../App/App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [totalPages, setTotalPages] = useState(999);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
        setError(error);
      } finally {
        setIsloading(false);
      }
    };
    fetchData();
  }, [page, query]);

  const onHandleSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setIsEmpty(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
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
          openModal={openModal}
          onRequestClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
}
