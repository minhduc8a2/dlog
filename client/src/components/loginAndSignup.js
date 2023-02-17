import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Animation from "./animation";

export default function LoginAndSignup({ loginFunction }) {
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [fullName, setFullName] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const navigate = useNavigate();
  const [toSignup, setToSignup] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Animation
      children={
        <div className="login-signup shadow p-5">
          <Form
            method="post"
            className=""
            onSubmit={async (event) => {
              const form = event.currentTarget;
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                return;
              }
              event.preventDefault();
              if (secondPassword !== password.current.value && toSignup) {
                setErrorMessage(
                  "Mật khẩu không trùng khớp, vui lòng kiểm tra lại!"
                );
                return;
              }

              const loginSuccessfully = await loginFunction(
                !toSignup,
                fullName,
                email.current.value,
                password.current.value
              );

              if (loginSuccessfully) {
                navigate("/");
                setLoginFailed(false);
              } else {
                if (!toSignup) setLoginFailed(true);
                if (toSignup)
                  setErrorMessage(
                    "Email đã được đăng ký, vui lòng chọn Email khác!"
                  );
              }
            }}
          >
            <h1 className="mb-5">{toSignup ? "Đăng ký" : "Đăng nhập"}</h1>
            <Form.Group className="mb-4 text-start" controlId="formBasicName">
              {toSignup && (
                <Form.Control
                  type="name"
                  placeholder="Họ và Tên"
                  className="mb-2 rounded-more"
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  required
                />
              )}
            </Form.Group>
            <Form.Group className="mb-4 text-start" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                ref={email}
                className="mb-2 rounded-more"
                onChange={() => {
                  setLoginFailed(false);
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                ref={password}
                className="rounded-more"
                onChange={() => {
                  setLoginFailed(false);
                }}
                required
              />
            </Form.Group>
            {toSignup && (
              <Form.Group className="mb-4" controlId="formSecondPassword">
                <Form.Control
                  type="password"
                  placeholder="Nhập lại Mật khẩu"
                  onChange={(e) => {
                    setSecondPassword(e.target.value);
                  }}
                  className="rounded-more"
                  required
                />
              </Form.Group>
            )}
            {!toSignup && (
              <Form.Group
                className="mb-5 text-start"
                controlId="formBasicCheckbox"
              >
                <Form.Check type="checkbox" label="Ghi nhớ đăng nhập" />
              </Form.Group>
            )}
            {loginFailed && <p>Sai Email hoặc mật khẩu</p>}
            {errorMessage && <p>{errorMessage}</p>}
            <Button
              variant="success"
              type="submit"
              className="rounded-more w-100"
            >
              {toSignup ? "Đăng ký" : "Đăng nhập"}
            </Button>
            <div
              className="text-start text-primary mt-3"
              onClick={() => {
                setToSignup(!toSignup);
                setErrorMessage("");
                setLoginFailed(false)
              }}
            >
              <u>
                {toSignup
                  ? "Tôi đã có tài khoản"
                  : "Tôi muốn tạo tài khoản mới"}
              </u>
            </div>
          </Form>
        </div>
      }
      animationName="appearFromTransparent"
    />
  );
}
