import Homepage from "./homepage";
import { Route, Routes, useLocation } from "react-router-dom";
import useFetch from "./useFetch";
import PostPage from "./postPage";
import MyNavbar from "./navbar";
import Admin from "./admin";
import Footer from "./footer";
import LoginAndSignup from "./loginAndSignup";
import { useState, useRef, useEffect } from "react";
import apiURI from "./api";

function Main() {
  const url = apiURI.post;
  const loginURL = apiURI.loginURL;
  const { data, loading, error } = useFetch(url);
  const postIdRef = useRef();
  const [logined, setLogined] = useState(false);
  const [user, setUser] = useState({});
  const tokenName = "dlogToken";
  const [tag, setTag] = useState("Nổi bật");
  const location = useLocation();
  function goToTag(newTag) {
    setTag(newTag);

    setTimeout(() => {
      postIdRef.current.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }
  async function login(isLogin, name, email, password) {
    let res;
    if (isLogin) {
      console.log(isLogin, email, password, apiURI.loginURL);
      const sentData = { email, password };
      res = await fetch(apiURI.loginURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sentData),
      });
    } else {
      console.log(isLogin, name, email, password, apiURI.loginURL);
      const sentData = { email, password, name };
      res = await fetch(apiURI.signUpURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sentData),
      });
    }
    const result = await res.json();
    setUser({ ...result.data });

    setLogined(result.msg);

    if (result.frontEndToken)
      localStorage.setItem(tokenName, result.frontEndToken);
    return result.msg;
  }
  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem(tokenName);

      const res = await fetch(apiURI.loginURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frontEndToken: token }),
      });
      const result = await res.json();
      setUser({ ...result.data });
      const status = result.msg;
      setLogined(status);
      console.log(user, result.data);
    }

    checkLogin();
  }, []);
  return (
    <div className="App">
      <MyNavbar
        data={data}
        loading={loading}
        goToTag={goToTag}
        logined={logined}
        logoutFunction={() => {
          setLogined(false);
          localStorage.removeItem(tokenName);
        }}
        user={user}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              tag={tag}
              postIdRef={postIdRef}
              data={data}
              loading={loading}
            />
          }
        ></Route>
        <Route path="/admin/*" element={<Admin />}></Route>
        <Route
          path="/login"
          element={!logined && <LoginAndSignup loginFunction={login} />}
        ></Route>
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
                  author={item.author}
                  id={item._id}
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
