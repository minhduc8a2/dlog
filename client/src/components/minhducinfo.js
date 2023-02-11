import minhducPic from "../images/profilepic.jpg";
import { motion } from "framer-motion"
import Typed from "react-typed";
export default function MinhDucInfo() {
  const cardVariants= {
    offscreen: {
     opacity: 0, x: "-100%" 
     
    },
    onscreen: {
      opacity: 1,x:0 
      
    }
  };
  const cardVariants2= {
    offscreen: {
     opacity: 0, x: "200px" 
     
    },
    onscreen: {
      opacity: 1,x:0 
      
    }
  };
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
          <div  className="col-12 col-lg-6 minhduc-info-body  ">
            <section className=" d-flex justify-content-center flex-column align-items-center">
              <motion.h4
              initial="offscreen"
              transition={{
                default: {
                  duration: 1,
                  ease: [0, 0.71, 0.2, 1.01]
                },
                // scale: {
                //   type: "spring",
                //   damping: 5,
                //   stiffness: 100,
                //   restDelta: 0.001
                // }
              }}
              whileInView="onscreen"
              viewport={{ once: false, amount: 0.8 }} variants={cardVariants}>CREATOR</motion.h4>
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
                <motion.div
                initial="offscreen"
                transition={{
                  default: {
                    duration: 1,
                    ease: [0, 0.71, 0.2, 1.01]
                  },
                  // scale: {
                  //   type: "spring",
                  //   damping: 5,
                  //   stiffness: 100,
                  //   restDelta: 0.001
                  // }
                }}
                whileInView="onscreen"
                viewport={{ once: false, amount: 0.8 }} variants={cardVariants2}>
                  <q><i>
                  Cung cấp những Websites chất lượng cho khách hàng là sứ mệnh
                  của chúng tôi.
                </i></q>
                </motion.div>
              </strong>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
