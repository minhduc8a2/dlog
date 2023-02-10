import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef } from "react";

export default function LoginForm({ loginFunction }) {
  const email = useRef(null);
  const password = useRef(null);
  return (
    <Form method="post" className="login">
      <h1 className="mb-5">Authentication</h1>
      <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
        <Form.Control
          type="email"
          placeholder="Enter email"
          ref={email}
          className="mb-2"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" ref={password} />
      </Form.Group>
      <Form.Group className="mb-3 text-start" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>
      <Button
        variant="success"
        type="submit"
        onClick={(e) =>{
          e.preventDefault();
          loginFunction(email.current.value, password.current.value)

        }
        }
      >
        Login
      </Button>
    </Form>
  );
}
