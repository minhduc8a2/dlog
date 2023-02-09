import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faCar,
  faGlobe,
  faBlog,
} from "@fortawesome/free-solid-svg-icons";
export default function Footer() {
  return (
    <div className="footer text-white bg-dark mt-5 ">
      <div className="container">
        <div className="row py-4">
          <div className="col-12 col-lg-4 text-start ">
            <h4>Contact</h4>
            <p>
              <FontAwesomeIcon icon={faFacebook} className="me-2  fs-5" />
              Facebook:{" "}
              <a href="https://www.facebook.com/minhduc.le.182" target="_blank">
                Lê Minh Đức
              </a>
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="me-2 fs-5" />
              Phone number: <a href="tel:0343920372">0343920372</a>
            </p>
            <p className="mb-0">
              <FontAwesomeIcon icon={faEnvelope} className="me-2 fs-5" />
              Email:{" "}
              <a href="mailto:minhduc8a2.1@gmail.com">minhduc8a2.1@gmail.com</a>
            </p>
          </div>
          <div className="col-12 col-lg-4 text-start">
            <h4 className="mt-3 mt-lg-0">Services</h4>
            <p>
              <FontAwesomeIcon icon={faCar} className="me-2 fs-5" />

              <a href="tel:0343920372">Du lịch gia đình Xpander 7 chỗ</a>
            </p>
            <p className="mb-0">
              <FontAwesomeIcon icon={faGlobe} className="me-2 fs-5" />

              <a href="tel:0343920372">Xây dựng Websites kinh doanh</a>
            </p>
          </div>
          <div className="col-12 col-lg-4 text-start">
            <h4 className="mt-3 mt-lg-0">About</h4>
            <p className="mb-0">
              <FontAwesomeIcon icon={faBlog} className="me-2 fs-5" />
              Đây là nơi chia sẻ suy nghĩ, cảm nhận, kinh nghiệm từng trải của
              tác giả. Hy vọng sẽ mang lại nhiều thông tin hữu ích cho quý vị.
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-black py-3 ">&#169; 2023 Copyright: DLOG</div>
    </div>
  );
}
