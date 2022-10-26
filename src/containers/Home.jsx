import {
  Box,
  Card,
  Divider,
  Grid,
  selectClasses,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import CarouselHome from "../component/CarouselHome";
import "../Assets/css/Home.css";
import WidgetTab from "../component/WidgetTab";
import { useEffect } from "react";
import TheNews from "../apis/TheNews";
import useNewsStore, {
  selectfetchNews,
  selectfetchNewsAll,
  selectNews,
  selectNewsAll,
  selectTopNews,
} from "../store/NewsStore";
import CardNews from "../component/CardNews";
const Home = () => {
  const CarouselMain = {
    className: "carousel-main",
    autoPlay: true,
    infiniteLoop: true,
    interval: 5000,
    axis: "horizontal",
  };
  const CarouselTop = {
    className: "carousel-top",
    autoPlay: true,
    infiniteLoop: true,
    interval: 10000,
    axis: "horizontal",
  };
  const CarouselBottom = {
    className: "carousel-bottom",
    autoPlay: true,
    infiniteLoop: true,
    interval: 10000,
    axis: "horizontal",
  };

  const WidgetNews = ["Sports", "Business", "Politics"];

  const News = useNewsStore(selectNews);
  const TopNews = useNewsStore(selectTopNews);
  const fetchedNews = useNewsStore(selectfetchNews);
  const [dataNews, setdataNews] = useState([]);

  useEffect(() => {
    fetchedNews();
  }, []);
  useEffect(() => {
    console.log(TopNews);
    if (TopNews.length > 0) {
      setdataNews([...TopNews]);
    }
  }, [TopNews]);
  console.log(dataNews);
  return (
    <Container maxWidth="lg">
      <Box className="section section-header">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Card>
              <CarouselHome option={CarouselMain} news={TopNews} />
            </Card>
          </Grid>
          <Grid container item xs={4} className="section-header-widged">
            <Grid item xs={12}>
              <Card>
                <CarouselHome option={CarouselTop} news={News} />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CarouselHome option={CarouselBottom} news={News} />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box className="section section-trending">
        <Grid container spacing={2}>
          <Grid container spacing={2} item md={8} xs={12}>
            <Grid item xs={12}>
              <Typography variant="button" display="block" component="div">
                What's New
              </Typography>
            </Grid>

            {dataNews.map((item) => {
              return <CardNews data={item} />;
            })}
          </Grid>
          <Grid item md={4} xs={12}>
            <WidgetTab data={WidgetNews} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default Home;
