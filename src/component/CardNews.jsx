import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardNews = ({ data }) => {
  let navigate = useNavigate();

  const HandleClick = (uuid) => {
    navigate("/news/" + uuid);
  };
  return (
    <Grid
      item
      md={6}
      xs={12}
      key={data.uuid}
      onClick={(e) => {
        HandleClick(data.uuid);
      }}
    >
      <Card>
        <CardMedia
          component="img"
          height="194"
          image={data.image_url}
          alt={data.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default CardNews;
