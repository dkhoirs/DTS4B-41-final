import axios from "axios";

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
