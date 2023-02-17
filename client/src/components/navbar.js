import profilePic from "../images/profilepic.jpg";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { debounce } from "./helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClose, faUser } from "@fortawesome/free-solid-svg-icons";

export default function MyNavbar(props) {
  let tags = [];

  if (!props.loading) tags = props.data.map((item) => item.tag);
  tags = [...new Set(tags)];
  const [expanded, setExpanded] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = debounce(() => {
    const currentPos = window.scrollY;
    if (currentPos > lastScrollY) setShowNav(false);
    else setShowNav(true);
    setLastScrollY(currentPos);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY, showNav]);

  function search(e) {
    let value = e.target.value || "";
    let result = [];
    if (value.length !== 0) {
      let regex = new RegExp(value, "i");
      result = props.data.filter((item) => item.title.search(regex) !== -1);
      console.log("regex", regex, "result", result);
      if (result.length === 0)
        result = [{ title: "No results found", _id: "1" }];
    } else {
      result = [];
    }

    setSearchResults(result);
  }
  return (
    <div className="mynavbar">
      <div
        className="  fixed-top nav-pc shadow-sm "
        style={{
          top: showNav || showSearch ? "0" : "-66px",
          transition: "top 0.6s",
        }}
      >
        <Navbar className="text-light navbar-dark bg-dark " expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Brand className="d-flex align-items-center">
              <Image
                src={profilePic}
                className="profile-pic"
                roundedCircle="true"
              />

              <Link to="/">
                <h4 className="ms-4">{`D L O G`}</h4>
              </Link>
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto" navbarScroll>
                <Nav.Link>
                  <Link to="/">
                    <button
                      className="rounded-pill "
                      onClick={() => props.goToTag("Tất cả bài viết")}
                    >
                      Tất cả bài viết
                    </button>
                  </Link>
                </Nav.Link>
                {tags.map((item) => (
                  <Nav.Link key={item}>
                    <Link to="/">
                      <button
                        className="rounded-pill"
                        onClick={() => props.goToTag(item)}
                      >
                        {item}
                      </button>
                    </Link>
                  </Nav.Link>
                ))}
              </Nav>
              <button
                className="search-icon ms-4 text-danger bg-black rounded-circle "
                onClick={() => {
                  setShowSearch(!showSearch);
                  setSearchResults([]);
                }}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
              {showSearch && (
                <Form className="d-flex search-form bg-dark d-flex flex-column rounded-more">
                  <div className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Tìm kiếm bài viết"
                      className="me-2"
                      aria-label="Search"
                      onChange={search}
                    />
                    <button
                      className="search-icon ms-4 text-danger bg-dark "
                      onClick={() => {
                        setShowSearch(!showSearch);
                        setSearchResults([]);
                      }}
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </button>
                  </div>

                  {searchResults.length !== 0 && (
                    <ul className="search-results">
                      <h5 className="text-start">Bài viết</h5>

                      {searchResults.map((item) => (
                        <Link
                          to={item._id !== "1" && `/post/${item._id}`}
                          onClick={() => {
                            setShowSearch(false);
                            setSearchResults([]);
                          }}
                          key={item._id}
                        >
                          <li className="rounded-more bg-black w-100 d-flex flex-row justify-content-start align-items-center">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt=""
                                className=" rounded-circle"
                              />
                            ) : (
                              ""
                            )}
                            {item.title}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </Form>
              )}
              {props.logined ? (
                <div className="user">
                  <button
                    className="user-avatar ms-4 text-danger bg-black rounded-circle border-0 p-0"
                    onClick={() => {
                      setShowUserOptions(!showUserOptions);
                    }}
                  >
                    {props.user && (
                      <img src={props.user.avatar} alt="" className="rounded-circle user-avatar-img"/>
                    ) }
                  </button>
                  {showUserOptions && (
                    <div className="user-options rounded-more d-flex flex-column align-items-center justify-content-center bg-dark">
                      <div
                        className="btn bg-black text-light w-100 rounded-more "
                        onClick={() => {
                          props.logoutFunction();
                          setShowUserOptions(false);
                        }}
                      >
                        Đăng xuất
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Nav.Link>
                  <Link to="/login">
                    <button className="rounded-pill ms-3 ">Đăng nhập</button>
                  </Link>
                </Nav.Link>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div
        className="fixed-top border-bottom nav-mobile shadow-sm"
        style={{ top: showNav ? "0" : "-66px", transition: "top 0.6s" }}
      >
        <Navbar
          className="text-light navbar-dark bg-dark "
          expand="lg"
          expanded={expanded}
        >
          <Container>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => setExpanded(!expanded)}
            />
            <Link to="/" style={{ color: "inherit" }}>
              <h4>{`D L O G`}</h4>
            </Link>
            <Navbar.Brand>
              <Image
                src={profilePic}
                className="profile-pic"
                roundedCircle="true"
              />
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" navbarScroll>
                <Nav.Link>
                  <Link to="/">
                    <button
                      className="rounded-pill"
                      onClick={() => {
                        setExpanded(false);
                        props.goToTag("Tất cả bài viết");
                      }}
                    >
                      Tất cả bài viết
                    </button>
                  </Link>
                </Nav.Link>
                {tags.map((item) => (
                  <Nav.Link key={item}>
                    <Link to="/">
                      <button
                        className="rounded-pill"
                        onClick={() => {
                          setExpanded(false);
                          setShowNav(false);
                          props.goToTag(item);
                        }}
                      >
                        {item}
                      </button>
                    </Link>
                  </Nav.Link>
                ))}
              </Nav>

              <Form className="d-flex search-form-mobile bg-dark d-flex flex-column rounded-more">
                <Form.Control
                  type="search"
                  placeholder="Tìm kiếm bài viết"
                  className="me-2 rounded-more"
                  aria-label="Search"
                  onChange={search}
                />
                {searchResults.length !== 0 && (
                  <ul className="search-results">
                    <h5 className="text-start">Bài viết</h5>

                    {searchResults.map((item) => (
                      <Link
                        to={item._id !== "1" && `/post/${item._id}`}
                        onClick={() => {
                          setShowSearch(false);
                          setSearchResults([]);

                          setExpanded(false);
                        }}
                        key={item._id}
                      >
                        <li className="rounded-more bg-black w-100 d-flex flex-row justify-content-start align-items-center">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt=""
                              className=" rounded-circle"
                            />
                          ) : (
                            ""
                          )}
                          {item.title}
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}
