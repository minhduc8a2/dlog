import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Animation from "./animation";
import { useRef, useEffect } from "react";
import useFetch from "./useFetch";
import MyCard from "./card";
import apiURL from "./api";
function Comment({ user, post_id }) {
  const {data,loading,error} = useFetch(`${apiURL.commentURL}/some/${post_id}`)
  return (
    <div className="comment mt-5 text-start">
      <h3 className="text-start">Bình luận</h3>
      <div className="input-group">
        <textarea
          className="form-control"
          aria-label="With textarea"
        ></textarea>
      </div>
      <button className="btn comment-btn bg-danger text-light">Bình luận</button>

      <ul className="p-0 mt-4">
        {
          !loading && data.map(item=><li className="d-flex flex-row align-items-center mt-2">
          <div className="comment-icon me-3 ">
            
              <img src={item.avatar} alt="" className="rounded-circle"/>
            
          </div>
          <p className="mb-0">
            <span>
              <b>{item.name}</b>
            </span>
            : {item.content}
          </p>
        </li>)
        }
        
      </ul>
    </div>
  );
}

export default function PostPage(props) {
  const postPage = useRef();
  const colors = ["#a344ec", "#f3830d", "#4cba31"];
  function getRandomColor() {
    return colors[Math.floor(Math.random() * 3)];
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const content = props.content.split("\n");

  return (
    <Animation
      children={
        <div className="post-page" ref={postPage}>
          <div className="container">
            <Link to="/" className="fontawesome ms-1 mb-3 d-block text-start">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <h1>{props.title}</h1>
            <img src={props.image} alt=""></img>
            {content.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
            <h5 className="text-end">Tác giả: {props.author}</h5>
            <Comment user={props.user} post_id={props.id} />
            <div className="same-posts ">
              {props.samePosts.length >= 1 && (
                <div>
                  <h2 className="text-start mb-5">Các bài viết cùng chủ đề</h2>
                </div>
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
        </div>
      }
      animationName="appearFromTransparent"
    />
  );
}
