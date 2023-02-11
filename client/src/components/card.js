
import { motion } from "framer-motion"

export default function MyCard(props) {
  
  let date = props.date.split("-");
  const year = date[0];
  const month = date[1];
  const day = date[2].slice(0, 2);
  date = day + "/" + month + "/" + year;
  const cardVariants= {
    offscreen: {
     opacity: 0, scale: 0.5 
     
    },
    onscreen: {
      opacity: 1, scale: 1 
      
    }
  };
 
  return (
    <motion.div
    initial="offscreen"
    transition={{
      default: {
        duration: 0.5,
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
    viewport={{ once: false, amount: 0.3 }} variants={cardVariants} className="mycard   mt-2 pt-2  px-3 px-lg-0 ">
      <div className="mycard-img rounded-more">
        <img src={props.image} alt=""  />
        <button className="btn bg-white rounded-more d-none">
          Xem bài viết
        </button>
      </div>

      <div className="mycard-body">
        <div className="d-flex align-items-center flex-wrap">
          <h5
            className="mycard-topic text-white rounded-more"
            style={{ backgroundColor: props.color }}
          >
            {props.tag}
          </h5>
          <h6 className="mycard-date ">{date}</h6>
        </div>

        <h4 className="mycard-title">{props.title}</h4>
      </div>
    </motion.div>
  );
}
