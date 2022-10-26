import { Fragment, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import useNewsStore, {
  selectCatNews,
  selectfetchNewsByCat,
} from "../store/NewsStore";
import { useEffect } from "react";
import "../Assets/css/WidgetTab.css";

const WidgetTab = ({ data }) => {
  if (data == undefined) {
    data = ["Sports", "Business", "Politics"];
  }
  const [tabActive, settabActive] = useState(0);
  const fetchNews = useNewsStore(selectfetchNewsByCat);
  const fetchCatNews = useNewsStore(selectCatNews);
  const [Catnews, setCatnews] = useState([]);
  useEffect(() => {
    fetchNews(data[tabActive].toLowerCase());
  }, [tabActive]);
  useEffect(() => {
    if (fetchCatNews.length > 0) {
      setCatnews(fetchCatNews);
    }
  }, [fetchCatNews]);
  const handleChangeTab = (event, newtabActive) => {
    settabActive(newtabActive);
    //console.log(newtabActive);
  };
  return (
    <Box>
      <Tabs value={tabActive} onChange={handleChangeTab}>
        {data.map((item) => {
          return <Tab key={item} label={item} />;
        })}
      </Tabs>
      {Catnews.map((item) => {
        return (
          <Card key={item.uuid} sx={{ display: "flex", marginTop: "5px" }}>
            <Box sx={{ display: "contents", flexDirection: "column" }}>
              <CardMedia
                component="img"
                sx={{ width: 151, height: 107, objectFit: "cover" }}
                image={item.image_url}
                alt={item.title}
              />
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography
                  component="div"
                  variant="button"
                  className="titleWidget"
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  component="div"
                  className="descWidget"
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
};
export default WidgetTab;
