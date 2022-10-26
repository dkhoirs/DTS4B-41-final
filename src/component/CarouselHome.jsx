import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";

const CarouselHome = ({ option, news }) => {
  let navigate = useNavigate();

  const HandleClick = (uuid) => {
    navigate("/news/" + uuid);
  };

  return (
    <Carousel
      className={option.className}
      autoPlay={option.autoPlay}
      interval={option.interval}
      infiniteLoop={option.infiniteLoop}
      axis={option.axis}
      emulateTouch={true}
      showArrows={false}
    >
      {news.map((news) => (
        <div
          key={news.uuid}
          onClick={(e) => {
            HandleClick(news.uuid);
          }}
        >
          <img src={news.image_url} alt="banner" />
          <p className="legend">{news.title}</p>
        </div>
      ))}
    </Carousel>
  );
};
export default CarouselHome;
