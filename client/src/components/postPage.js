import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Animation from "./animation";
import { useRef, useEffect, useState } from "react";
import useFetch from "./useFetch";
import MyCard from "./card";
import apiURL from "./api";
import MyModal from "./myModal";

function More(props){
  const [show,setShow] = useState(false);
  async function deleteComment(){
    
    let res = await fetch(`${apiURL.commentURL}/${props.id}`, { method: "DELETE" });
    const { msg } = await res.json();
    console.log(msg)
    return msg;
  }
  return <div className="ms-3 comment-line-more rounded-circle shadow-sm text-center " >
  <b onClick={()=>{setShow(!show)}} >⋯</b>
    {show && <div className="more-options">
      
      <MyModal fn={deleteComment}
      customButtonStyle="btn btn-dark px-5 rounded-more"
      customButtonName="Xóa"
      customMessage="Bạn có chắc chắn muốn xóa bình luận này không?"
      customHeader="Xóa bình luận?"
      customSuccessResult="Bình luận của bạn đã được xóa"
      customFailureResult="Xóa bình luận thất bại, vui lòng thử lại sau!"
      updatePrePageFn={()=>{props.refreshFunction(); setShow(!show)}}/>
    </div>}
  </div>
}
function Comment({ user, post_id }) {
  const [refresh, setRefresh] = useState(false);
  const [showWarning,setShowWarning] = useState(false);
  const { data, loading, error } = useFetch(
    `${apiURL.commentURL}/some/${post_id}`,
    {},
    [refresh]
  );
  const commentTextArea = useRef(null);
  async function submitComment() {
    if (Object.keys(user).length === 0) {
      setShowWarning(true);
      return;
    }
    const sentData = {
      post_id,
      content: commentTextArea.current.value,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
    const res = await fetch(`${apiURL.commentURL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sentData),
    });

    const result = await res.json();

    if (result.msg) setRefresh();
  }
  return (
    <div className="comment mt-5 text-start">
      <h3 className="text-start">Bình luận</h3>
      <div className="input-group">
        <textarea
          className="form-control"
          aria-label="With textarea"
          ref={commentTextArea}
        ></textarea>
      </div>
      <button
        className="btn comment-btn bg-danger text-light"
        onClick={submitComment}
      >
        Bình luận
      </button>
      {showWarning && <div className="p-2 mt-2 h5 "><Link to="/login">Vui lòng <span className="text-info">đăng nhập</span> để sử dụng tính năng này</Link></div>}

      <ul className="p-0 mt-4">
        {!loading &&
          data.map((item, index) => (
            <li
              key={index}
              className="d-flex flex-row align-items-center mt-2 comment-line "
            >
              <div className="comment-icon me-3 ">
                <img src={item.avatar} alt="" className="rounded-circle" />
              </div>
              <div className="comment-line-body shadow-sm rounded-more ">
                <span>
                  <b>{item.name}</b>
                </span>
                <p className="mb-0">{item.content}</p>
              </div>
              {Object.keys(user).length !== 0 && user.email === item.email && <More id={item._id} refreshFunction={()=>{setRefresh(!refresh)}}/>}
            </li>
          ))}
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
