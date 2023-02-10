import Post from "./post";
import MyCarousel from "./carousel";
import MinhDucInfo from "./minhducinfo";
import useFetch from "./useFetch";
import { motion } from "framer-motion"

import { useEffect } from "react";
export default function Homepage(props) {
  const url = "http://localhost:5000/api/post";
  const { data, loading, error } = useFetch(url);

  return (
   
      <motion.div
      initial={{ opacity: 0, x: "-100%"}}
      animate={{ opacity: 1,x:0}}
      transition={{ duration: 0.5 }} className="homepage">
        <MyCarousel url="http://localhost:5000/api/post/latest" />

        <MinhDucInfo />
        <Post
          loading={loading}
          data={data}
          tag={props.tag}
          postIdRef={props.postIdRef}
        />
      </motion.div>
    
  );
}
