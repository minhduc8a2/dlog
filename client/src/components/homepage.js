import Post from "./post";
import MyCarousel from "./carousel";
import MinhDucInfo from "./minhducinfo";
import useFetch from "./useFetch";

import { useEffect } from "react";
export default function Homepage(props) {
  const url = "http://localhost:5000/api/post";
  const { data, loading, error } = useFetch(url);

  return (
   
      <div className="homepage">
        <MyCarousel url="http://localhost:5000/api/post/latest" />

        <MinhDucInfo />
        <Post
          loading={loading}
          data={data}
          tag={props.tag}
          postIdRef={props.postIdRef}
        />
      </div>
    
  );
}
