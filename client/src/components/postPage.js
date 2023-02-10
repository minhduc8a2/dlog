import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRef, useEffect } from "react";
import MyCard from "./card";
import { motion } from "framer-motion"
export default function PostPage(props) {
  const postPage = useRef();
  const colors = ["#a344ec", "#f3830d", "#4cba31"];
  function getRandomColor() {
    return colors[Math.floor(Math.random() * 3)];
  }
  useEffect(() => {
    window.scrollTo(0,0);
  });
  return (
    <motion.div
    initial={{ opacity: 0, x: "-100%"}}
    animate={{ opacity: 1,x:0}}
    transition={{ duration: 0.5 }} className="post-page" ref={postPage}>
      <div className="container">
        <Link to="/" className="fontawesome ms-1 mb-3 d-block text-start">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1>{props.title}</h1>
        <img src={props.image} alt=""></img>
        <p>{props.content}</p>
        <div className="same-posts ">
          {props.samePosts.length > 1 && (
            <h2 className="text-start mb-5">Các bài viết cùng chủ đề</h2>
          )}
          <div className="row">
            {props.samePosts.map((item) => (
              <div className="col-12 col-lg-4 col-md-6" key={item._id}>
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
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
