import React, { useEffect } from "react";
import Notes from "../Components/Notes";
import Sidebar from "./Sidebar";

import { useQuill } from "react-quilljs";
const Home = () => {
  const { quill, quillRef } = useQuill();
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        console.log(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);
  return (
    <> 

      <Sidebar /> 
       
    </>
  );
};

export default Home;
