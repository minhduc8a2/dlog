import Post from "./post";
import MyCarousel from "./carousel";
import MinhDucInfo from "./minhducinfo";

import Animation from "./animation";
import Spinner from 'react-bootstrap/Spinner';

import { useEffect } from "react";
import apiURI from "./api"

export default function Homepage(props) {
  
  
  return (
   
    <Animation children={<div className="homepage">
        {props.loading?  <div><Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" /></div>:<MyCarousel data={props.data.slice(props.data.length>=3?props.data.length-3:props.data.length>=2?props.data.length-2:props.data.length-1,props.data.length)} loading={props.loading} />}

        <MinhDucInfo />
        <Post
          loading={props.loading}
          data={props.data}
          tag={props.tag}
          postIdRef={props.postIdRef}
        />
      </div>} animationName="appearFromTransparent"/>
    
  );
}
