import minhducPic from "../images/profilepic.jpg";
import Typed from "react-typed";
export default function MinhDucInfo() {
  
  return (
    <div className="minhduc-info " >
      <div className="container ">
        <div className="row">
          <div className="col-12 col-lg-6">
            <img
              src={minhducPic}
              alt="Minh Duc"
              className="rounded-circle mb-2"
            />
          </div>
          <div className="col-12 col-lg-6 minhduc-info-body  ">
            <section className=" d-flex justify-content-center flex-column align-items-center">
              <h4>CREATOR</h4>
              <div className="mt-2 mb-2">
                <Typed
                  className="minhduc-info-title"
                  strings={["LÊ MINH ĐỨC", "FULLSTACK WEB DEVELOPER"]}
                  typeSpeed={150}
                  backSpeed={100}
                  loop
                />
              </div>
            </section>
            <section className=" text-start mx-3" >
              <p>
                Đã từng học tại{" "}
                <b>
                  Trường Đại học Công nghệ thông tin - Đại học Quốc gia TP. Hồ
                  Chí Minh
                </b>
                , hiện đang là sinh viên tại{" "}
                <b>
                  {" "}
                  Trường Công nghệ thông tin & Truyền thông - Đại học Cần Thơ
                </b>{" "}
                .
              </p>
              <p>
                Đang hướng đến mục tiêu trở thành{" "}
                <strong>FullStack Web Developer</strong>, và đây là một Website
                do anh ấy phát triển.
              </p>{" "}
              <strong>
                <q>
                  <i>
                    Cung cấp những Websites chất lượng cho khách hàng là sứ mệnh
                    của chúng tôi.
                  </i>
                </q>
              </strong>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
