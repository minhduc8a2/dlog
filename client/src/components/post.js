import MyCard from "./card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"


export default function Post({ loading, data, tag, postIdRef }) {
 
  const colors = ["#a344ec", "#f3830d", "#4cba31"];
  function getRandomColor() {
    return colors[Math.floor(Math.random() * 3)];
  }
  const titleVariants= {
    offscreen: {
     opacity: 0, y: "100px" 
     
    },
    onscreen: {
      opacity: 1, y:0 
      
    }
  };
  return (
    <div className="container  posts" id="posts" ref={postIdRef} >
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
      viewport={{ once: false, amount: 0.8 }} variants={titleVariants} className="text-start"><h2>{tag}</h2></motion.div>
      <div className="row card-list">
        {!loading &&
          data.map((item) => {
            return (
              (tag === "Nổi bật" ||
                tag === "Tất cả bài viết" ||
                item.tag === tag) && (
                <div className="col-lg-4 col-md-6 col-12" key={item._id}>
                  <Link to={`/post/${item._id}`}>
                    <MyCard
                      title={item.title}
                      date={item.created_at}
                      image={item.image}
                      tag={item.tag}
                      color={getRandomColor()}
                    />
                  </Link>
                </div>
              )
            );
          })}
      </div>
    </div>
  );
}
