import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import { Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "../Context/Context";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const Signup: React.FC = () => {
  const context = useContext(Context);
  const nav = useNavigate();
  const [form] = Form.useForm();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(form.getFieldValue("username"));
    console.log(form.getFieldValue("email"));
    console.log(form.getFieldValue("password"));

    try {
      const { data } = await axios.post("http://localhost:8080/register", {
        userName: form.getFieldValue("username"),
        email: form.getFieldValue("email"),
        password: form.getFieldValue("password"),
        profileUrl: "Null",
      });

      if (data?.success) {
        // * Setting Recently-Successfully-User State
        context?.setCurrentUser({
          id: data?.authToken,
          name: form.getFieldValue("username"),
          email: form.getFieldValue("email"),
        });
        // * Saving User's Auth-Token In LC To REcognize The User For The Server
        localStorage.setItem("authToken", data?.authToken);
        context?.messageApi.open({
          type: "success",
          content: data.message,
        });
        nav("/");
      } else {
        context?.messageApi.open({
          type: "error",
          content: data.message,
        });
      }
    } catch (error: any) {
      console.log(error);
      context?.messageApi.open({
        type: "success",
        content: error.message,
      });
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      nav("/");
    } else {
      nav("/signup");
    }
  }, []);


const storage = getStorage();

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot: any) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error: any) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
      console.log('File available at', downloadURL);
    });
  }
);
  return (
    <div style={{ marginTop: "2rem" }}>
      <Form
        // {...formItemLayout}
        style={{
          margin: "auto",
          maxWidth: 350,
          padding: "2rem 2rem 1rem 2rem",
          boxShadow: "#dfdfdf 0px 1px 11px -2px",
          borderRadius: "4px",
          border: "1px solid #efefef",
        }}
        layout={"vertical"}
        form={form}
        size={"large"}
      >
        <Typography.Title style={{ fontWeight: "lighter" }}>
          Register
        </Typography.Title>
        <input type={"file"}/>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Username Can't Be Empty!",
              type: "string",
            },
          ]}
        >
          <Input placeholder="Enter User Name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Invalid Email!", type: "email" }]}
        >
          <Input placeholder="Enter Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password Can't Be Empty!",
              type: "string",
            },
          ]}
        >
          <Input.Password placeholder="Enter Strong Password" />
        </Form.Item>
        <Typography.Text style={{}}>
          Already Have An Account?
          <Link to={"/signin"}>&nbsp;Signin</Link>
        </Typography.Text>
        <Form.Item
          // {...buttonItemLayout}
          style={{ marginTop: "1rem" }}
        >
          <Button type="primary" onClick={handleSubmit}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
