import { useRef } from "react";
import { useInView } from "framer-motion";




export default function Animation({ children,animationName }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });
    const animationList={
        appearFromLeft:{
            transform: isInView ? "none" : "translateX(-100px)",
            opacity:isInView? "1":"0",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) "
        },
        appearFromRight:{
            transform: isInView ? "none" : "translateX(100px)",
            opacity:isInView? "1":"0",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
        }
        ,
        appearBottomToTop:{
            transform: isInView ? "none" : "translateY(100px)",
            opacity:isInView? "1":"0",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
        },
        appearFromTransparent:{
            opacity:isInView? "1":"0",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
        }
    }
    return (
      <div ref={ref} style={animationList[animationName]}>
        
          
        
          {children}
        
      </div>
    );
  }