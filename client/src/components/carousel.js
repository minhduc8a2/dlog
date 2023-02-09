import Carousel from "react-bootstrap/Carousel";
import useFetch from "./useFetch";
import background from "../images/background.jpg";
import { Link } from "react-router-dom";

export default function MyCarousel(props) {
  const { data, loading, error } = useFetch(props.url);
  console.log(data);
  if (error || data.length === 0) return <div></div>;
  return (
    <Carousel className="carousel " interval={3500}>
      {!loading &&
        data.map((item) => {
          return (
            <Carousel.Item className="carousel-item" key={item._id}>
              <Link to={`/post/${item._id}`} style={{ color: "inherit" }}>
                <img
                  src={item.image || background}
                  alt="First slide"
                  style={{ filter: "brightness(90%)" }}
                />
              </Link>
              <Carousel.Caption className="text-start mb-lg-5 mb-3">
                <Link to={`/post/${item._id}`} style={{ color: "#fff" }}>
                  <h1>{item.title}</h1>
                  <p>
                    {item.content.length > 200
                      ? item.content.slice(0, 200).concat(" ...")
                      : item.content}
                  </p>
                  <div className="btn  btn-lg text-white rounded-more doc-them">
                    <span className="border-animation"></span>
                    Đọc thêm
                  </div>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
}
