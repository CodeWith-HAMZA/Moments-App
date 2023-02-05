import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import { Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Context from "../Context/Context";
import axios from "axios";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const Signup: React.FC = () => {
  const context = useContext(Context);
  const nav = useNavigate();
  const [form] = Form.useForm();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(form.getFieldValue("email"));
    console.log(form.getFieldValue("password"));
    try {
      const { data } = await axios.post("http://localhost:8080/signin", {
        email: form.getFieldValue("email"),
        password: form.getFieldValue("password"),
      });

      if (data?.success) {
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
        console.log(data);
        setTimeout(() => {
          nav("/");
        }, 1000);
      } else {
        context?.messageApi.open({
          type: "error",
          content: data.message,
        });
      }
    } catch (error: any) {
      console.log(error);
      context?.messageApi.open({
        type: "error",
        content: error.message,
      });
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      nav("/");
    } else {
      nav("/signin");
    }
  }, []);
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
          Login
        </Typography.Title>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Invalid Email! ", type: "email" },
          ]}
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
          Don't Have An Account?
          <Link to={"/signup"}>&nbsp;Create One</Link>
        </Typography.Text>
        <Form.Item
          // {...buttonItemLayout}
          style={{ marginTop: "1rem" }}
        >
          <Button type="primary" onClick={handleSubmit}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
