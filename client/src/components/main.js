import Homepage from "./homepage";
import { Route, Routes, useLocation } from "react-router-dom";
import useFetch from "./useFetch";
import PostPage from "./postPage";
import MyNavbar from "./navbar";
import Admin from "./admin";
import Footer from "./footer";
import { useState, useRef } from "react";

function Main() {
  const url = "http://localhost:5000/api/post";
  const { data, loading, error } = useFetch(url);
  const postIdRef = useRef();

  const [tag, setTag] = useState("Nổi bật");
  const location = useLocation();
  function goToTag(newTag) {
    setTag(newTag);

    setTimeout(() => {
      postIdRef.current.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }

  return (
    <div className="App">
      <MyNavbar data={data} loading={loading} goToTag={goToTag} />
     

      <Routes>
        <Route
          path="/"
          element={<Homepage tag={tag} postIdRef={postIdRef} />}
        ></Route>
        <Route path="/admin/*" element={<Admin />}></Route>
        {!loading &&
          data.map((item) => (
            <Route
              path={`/post/${item._id}`}
              element={
                <PostPage
                  title={item.title}
                  image={item.image}
                  content={item.content}
                  tag={item.tag}
                  samePosts={data.filter(
                    (post) => post.tag === item.tag && post._id !== item._id
                  )}
                />
              }
              key={item._id}
            ></Route>
          ))}
      </Routes>
      <Footer />
    </div>
  );
}

export default Main;
