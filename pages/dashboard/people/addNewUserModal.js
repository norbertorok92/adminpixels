import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Modal,
  List,
  Progress,
  message,
  Checkbox,
  Form,
  Input,
  Button,
  Select,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const { Option } = Select;

const AddNewUserModal = ({ visible, handleCancel }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleOk = async () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        handleUserCreation(values);
      })
      .catch((info) => {
        console.warn("Validate Failed:", info);
      });
  };

  const handleUserCreation = async (values) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.status === 201) {
      onReload();
      message.success("User succesfully created!");
    } else {
      const message = await res.text()
      message.error(message);
    }
    handleCancel();
  };

  const onReload = () => {
    router.push("/dashboard/people");
  };

  return (
    <Modal
      title="Create New User"
      visible={visible}
      onOk={handleOk}
      okText="Create"
      onCancel={handleCancel}
    >
      <Form
        form={form}
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please enter the users first name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please enter the users last name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Create a password for the user!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Confirm password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Password Missmatch!");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="userRole"
          label="User Role"
          rules={[
            {
              required: true,
              message: "Please select a role for the user",
            },
          ]}
        >
          <Select placeholder="Please select a role for the user">
            <Option value="Employee">Employee</Option>
            <Option value="Manager">Manager</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewUserModal;
