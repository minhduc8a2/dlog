import MyCard from "./card";
import { Link } from "react-router-dom";


export default function Post({ loading, data, tag, postIdRef }) {
 
  const colors = ["#a344ec", "#f3830d", "#4cba31"];
  function getRandomColor() {
    return colors[Math.floor(Math.random() * 3)];
  }
  return (
    <div className="container  posts" id="posts" ref={postIdRef} >
      <h2 className="text-start">{tag}</h2>
      <div className="row card-list">
        {!loading &&
          data.map((item) => {
            return (
              (tag === "Nổi bật" ||
                tag === "Tất cả bài viết" ||
                item.tag === tag) && (
                <div className="col-lg-4 col-md-6 col-12" key={item._id}>
                  <Link to={`/post/${item._id}`}>
                    <MyCard
                      title={item.title}
                      date={item.created_at}
                      image={item.image}
                      tag={item.tag}
                      color={getRandomColor()}
                    />
                  </Link>
                </div>
              )
            );
          })}
      </div>
    </div>
  );
}
