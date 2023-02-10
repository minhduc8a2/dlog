import LoginForm from "./loginForm";
import MyModal from "./myModal";
import useFetch from "./useFetch";
import EditPost from "./editPost";
import CreatePost from "./createPost";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyCard from "./card";
import apiURI from "./api";
const apiUrl = apiURI.post;
const apiUserUrl = apiURI.login;
function AdminPage({ verified, goToEditPost }) {
  const [update, setUpdate] = useState(false);

  const { data, loading, error } = useFetch(apiUrl, {}, [update]);
  async function deletePost(id) {
    const deleteUrl = `${apiUrl}/${id}`;
    let res = await fetch(deleteUrl, { method: "DELETE" });
    const { msg } = await res.json();

    return msg;
  }
  function updatePage() {
    setUpdate(!update);
  }
  return (
    <div className="admin container">
      <div className="row">
        <div className="col-12 col-lg-6">
          <h1 className="mt-5 mb-5">Share your thoughts, Sir?</h1>
          <Link to="/admin/create">
            <button className="btn btn-lg btn-info create-post-btn">
              Create Post
            </button>
          </Link>
        </div>
        <div className="col-12 col-lg-6">
          <h1 className="mt-5 mb-5">Your posts, Sir!</h1>

          <ul className="admin-post-list">
            {!loading &&
              verified &&
              data.map((item) => {
                return (
                  <li key={item._id}>
                    <MyCard
                      title={item.title}
                      date={item.created_at}
                      image={item.image}
                    />
                    <div className="edit">
                      <Button
                        onClick={() => goToEditPost(item._id)}
                        variant="danger"
                        className="me-3"
                      >
                        <Link to="/admin/edit">Edit</Link>
                      </Button>

                      <MyModal
                        fn={() => deletePost(item._id)}
                        customButtonName="Delete the post"
                        customMessage="Make sure that you do want to delete the post?"
                        customHeader="Confirm"
                        customSuccessResult="The post has been deleted successfully"
                        customFailureResult="Failed to delete the post"
                        updatePrePageFn={updatePage}
                      />
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [editedPostId, setEditedPostId] = useState("");
  async function login(email, password) {
    const sentData = { email, password };
    const res = await fetch(apiUserUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sentData),
    });
    const { msg } = await res.json();

    if (msg) {
      setVerified(true);
      navigate("/admin/main");
    }
  }
  function goToEditPost(id) {
    setEditedPostId(id);
  }
  return (
    <Routes>
      <Route path="/" element={<LoginForm loginFunction={login} />}></Route>
      <Route
        path="/main"
        element={<AdminPage verified={verified} goToEditPost={goToEditPost} />}
      ></Route>
      <Route path="/edit" element={<EditPost id={editedPostId} />}></Route>
      <Route path="/create" element={<CreatePost />}></Route>
    </Routes>
  );
}
