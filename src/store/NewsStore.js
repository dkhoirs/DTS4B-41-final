import produce from "immer";
import create from "zustand";
import TheNews from "../apis/TheNews";
const initialNews = [];
const initialAllNews = [];
const initialDetailNews = {};

const useNewsStore = create((set) => ({
  allNews: initialAllNews,
  news: initialNews,
  topnews: initialNews,
  CatNews: initialNews,
  DetailNews: initialDetailNews,

  fetchNews: async () => {
    try {
      const fetchedNews = await TheNews.get("/top");
      set(
        produce((state) => {
          state.news = fetchedNews.data.data;
          state.topnews = fetchedNews.data.data;
          state.allNews = fetchedNews.data.data;
        })
      );
    } catch (err) {
      console.log(err);
    }
  },
  fetchNewsByID: async (uuid) => {
    try {
      const fetchedNews = await TheNews.get("/uuid/" + uuid);
      set(
        produce((state) => {
          state.DetailNews = fetchedNews.data;
        })
      );
    } catch (err) {
      console.log(err);
    }
  },
  fetchNewsByCat: async (categories) => {
    try {
      const fetchedNews = await TheNews.get("/all?categories=" + categories);
      set(
        produce((state) => {
          state.CatNews = fetchedNews.data.data;
        })
      );
    } catch (err) {
      console.log(err);
    }
  },
}));
export const selectfetchNews = (state) => state.fetchNews;
export const selectNews = (state) => state.news;
export const selectTopNews = (state) => state.topnews;
export const selectNewsAll = (state) => state.allNews;
export const selectCatNews = (state) => state.CatNews;
export const selectDetailNews = (state) => state.DetailNews;
export const selectfetchNewsByID = (state) => state.fetchNewsByID;
export const selectfetchNewsByCat = (state) => state.fetchNewsByCat;
export default useNewsStore;
