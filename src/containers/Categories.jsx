import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardNews from "../component/CardNews";
import WidgetTab from "../component/WidgetTab";
import useNewsStore, {
  selectCatNews,
  selectfetchNewsByCat,
} from "../store/NewsStore";
const Categories = () => {
  let param = useParams();
  const fetchNews = useNewsStore(selectfetchNewsByCat);
  const fetchCatNews = useNewsStore(selectCatNews);
  const [Catnews, setCatnews] = useState([]);

  const WidgetNews = ["Sports", "Business", "Politics"];
  useEffect(() => {
    fetchNews(param?.plan.toLowerCase());
  }, [param]);
  useEffect(() => {
    if (fetchCatNews.length > 0) {
      setCatnews(fetchCatNews);
    }
  }, [fetchCatNews]);
  return (
    <Container>
      <Box sx={{ marginTop: "2em" }}>
        <Grid container spacing={2}>
          <Grid container spacing={2} item md={8} xs={12}>
            <Grid item xs={12}>
              <Typography variant="button" display="block" component="div">
                {param?.plan}
              </Typography>
            </Grid>

            {Catnews.map((item) => {
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
export default Categories;
