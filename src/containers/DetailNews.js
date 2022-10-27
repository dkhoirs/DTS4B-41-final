import React, { useState } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import "../Assets/css/DetailNews.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import WidgetTab from "../component/WidgetTab";
import CategoriesChip from "../component/CategoriesChip";
import useNewsStore, {
  selectDetailNews,
  selectfetchNewsByID,
} from "../store/NewsStore";

const DetailNews = () => {
  let param = useParams();
  const WidgetNews = ["Sports", "Business", "Politics"];
  const WidgetNews2 = ["Entertainment", "Tech", "Travel"];
  const dataDetail = useNewsStore(selectDetailNews);
  const fetchDetail = useNewsStore(selectfetchNewsByID);
  const newsInit = {
    title: "",
    image_url: "",
    published_at: "",
    description: "",
    categories: [],
  };
  const [news, setNews] = useState(newsInit);
  useEffect(() => {
    fetchDetail(param.plan);
    if (dataDetail.title !== undefined) {
      setNews(dataDetail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (dataDetail.title !== undefined) {
      setNews(dataDetail);
    }
  }, [dataDetail]);
  return (
    <Container maxWidth="lg">
      <Box className="section section-header">
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Card sx={{ padding: 1 }}>
              <Typography variant="h5" gutterBottom>
                {news.title}
              </Typography>
              <Grid container>
                {news.categories.map((item) => {
                  return <CategoriesChip key={item} data={item} />;
                })}
                <Typography
                  ml={2}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  {news.published_at}
                </Typography>
              </Grid>

              <img src={news.image_url} className="img-primary" alt="" />
              <Typography variant="body1" gutterBottom>
                {news.description}
              </Typography>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Grid item xs={12}>
              <WidgetTab data={WidgetNews} />
            </Grid>
            <Grid item xs={12}>
              <WidgetTab data={WidgetNews2} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default DetailNews;
