import minhducPic from "../images/profilepic.jpg";
import { motion } from "framer-motion"
import Animation from "./animation";
export default function MinhDucInfo() {
  
  return (
    <div className="minhduc-info " >
      <div className="container ">
        <div className="row">
          <div className="col-12 col-lg-6">
          <img
            src={minhducPic}
            alt="Minh Duc"
            className="rounded-circle mb-2"/>
          
            
          </div>
          <div  className="col-12 col-lg-6 minhduc-info-body  ">
            <section className=" d-flex justify-content-center flex-column align-items-center">
              <h4>CREATOR</h4>
              <div className="mt-2 mb-2">
                <Animation children={<h2
                  className="minhduc-info-title"
                  
                 
                >LÊ MINH ĐỨC</h2>} animationName="appearFromLeft"/>
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
                
              <Animation children={<q><i>
                  Cung cấp những Websites chất lượng cho khách hàng là sứ mệnh
                  của chúng tôi.
                </i></q>} animationName="appearFromRight"/>
                
              </strong>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
