import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function MyModal({
  fn,
  customMessage,
  customButtonName,
  customHeader,
  customResult,
  customSuccessResult,
  customFailureResult,
  updatePrePageFn,
}) {
  const [show, setShow] = useState(false);
  const [secondShow, setSecondShow] = useState(false);
  const [result, setResult] = useState(false);

  const handleAgree = async () => {
    if (fn) {
      const AsyncFunction = fn.constructor;

      let res;

      if (fn instanceof AsyncFunction === true) res = await fn();
      else res = fn();

      setResult(res);
      handleSecondShow();
    }
    setShow(false);
  };

  const handleSecondClose = () => {
    setSecondShow(false);
    if (result) updatePrePageFn();
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleSecondShow = () => {
    setSecondShow(true);
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        {customButtonName}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{customHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{customMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAgree}>
            {customButtonName}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={secondShow} onHide={handleSecondClose}>
        <Modal.Body>
          {result == true ? customSuccessResult : customFailureResult}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSecondClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
