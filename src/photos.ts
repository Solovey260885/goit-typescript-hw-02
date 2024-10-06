import axios from "axios";

const API_KEY: string = "szkocNYbCJr6FeH0jfXxs1gFk0lqDbuCFZ71yPSTQPg";

axios.defaults.baseURL = "https://api.unsplash.com/";

interface IParamsUrl {
  orientation: string;
  per_page: number;
  client_id: string;
}

axios.defaults.params = {
  orientation: "landscape",
  per_page: 15,
  client_id: API_KEY,
} as IParamsUrl;

export interface Photo {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
  likes: number;
}

export interface PhotosResponse {
  results: Photo[];
  total: number;
  total_pages: number;
}

export const getPhotos = async (
  query: string,
  page: number
): Promise<PhotosResponse> => {
  const { data } = await axios.get<PhotosResponse>(
    `search/photos?query=${query}&page=${page}`
  );

  return data;
};
