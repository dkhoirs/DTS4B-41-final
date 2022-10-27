import axios from "axios";

//const API_KEY = "pxjZYQIvi4N4ULEUMrQfR2dkblauUROpBT6oA83Z"; //"QwcoV26lXZLQtMBWbnml04ZA68iEkHdVm1PXvZ8L"; //
const API_KEY = process.env.REACT_APP_NEWS_KEY;
const baseUrl = "https://api.thenewsapi.com/v1/news";

const TheNews = axios.create({
  baseURL: baseUrl,
  params: {
    api_token: API_KEY,
    language: "en",
  },
});

export default TheNews;
