import Form from "react-bootstrap/Form";
import MyModal from "./myModal";
import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import apiURI from "./api"

export default function EditPost({ id }) {
  const apiUrl = `${apiURI.post}/${id}`;
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tag, setTag] = useState("");
  const { data, loading, error } = useFetch(apiUrl);
  const navigate = useNavigate();
  async function updatePost() {
    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, image, author, tag }),
    });
    const { msg } = await res.json();
    return msg;
  }
  function updatePage() {
    navigate("/admin/main");
  }
  useEffect(() => {
    setTitle(data.title);
    setImage(data.image);
    setContent(data.content);
    setAuthor(data.author);
    setTag(data.tag);
  }, [data]);
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Link"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Tag</Form.Label>
            <Form.Control
              type="text"
              placeholder="Link"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
              rows={20}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <MyModal
            fn={() => updatePost()}
            customButtonName="Update the post"
            customMessage="Make sure that you do want to update the post?"
            customHeader="Confirm"
            customSuccessResult="The post has been updated successfully"
            customFailureResult="Failed to delete the post"
            updatePrePageFn={updatePage}
          />
        </Form>
      </div>
    </div>
  );
}
