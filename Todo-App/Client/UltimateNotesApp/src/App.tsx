import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Notfound from "./Pages/Notfound";
import ModalBody from "./Components/ModalBody";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import Context from "./Context/Context";
import axios from "axios";
import { message } from "antd";
function App() {
  const context = useContext(Context);
  // const [messageApi, contextHolder] = message.useMessage();
  const { quill, quillRef } = useQuill();
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        console.log(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);
  useEffect(() => {
    // * Getting AuthToken From LC That's Being Saved After Login or signup
    const token = localStorage.getItem("authToken");
    // * if it found update the state
    if (token) {
      context?.setToken(token);
    }

    // * Fetching User-Details From Server Through The Auth-Token
    (async () => {
      if (token) {
        const { data } = await axios.get(
          `http://localhost:8080/fetchuser/${token}`
        );
        // console.log(data.currentUser);

        const { userName, email, profileUrl } = data?.currentUser;
        if (context?.setCurrentUser)
          context?.setCurrentUser({
            id: context.Token as string,
            name: userName,
            email: email,
          });
      }
    })();
  }, []);

  return (
    <>  
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="*"
          element={
            <>
              <Notfound />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
