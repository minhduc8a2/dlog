import Form from "react-bootstrap/Form";
import MyModal from "./myModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiURI from "./api"
export default function CreatePost() {
  const apiUrl = apiURI.post;
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tag, setTag] = useState("");

  const navigate = useNavigate();
  async function createPost() {
    console.log({ title, content, image });
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ title, content, image, author, tag }),
    });
    const { msg } = await res.json();
    console.log("msg", msg);
    return msg;
  }
  function updatePage() {
    navigate("/admin/main");
  }

  return (
    <div className="container">
      <div className="edit-post">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tiêu đề"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Tag</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Link"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <MyModal
            fn={() => createPost()}
            customButtonName="Create the post"
            customMessage="Make sure that you do want to create the post?"
            customHeader="Confirm"
            customSuccessResult="The post has been created successfully"
            customFailureResult="Failed to create the post"
            updatePrePageFn={updatePage}
          />
        </Form>
      </div>
    </div>
  );
}
