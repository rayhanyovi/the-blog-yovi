import { Modal, Input, Button, Form, message } from "antd";
import { useState, useEffect } from "react";
import { addUser, deleteUsers, setAuthToken } from "@/services/api";
import Cookies from "js-cookie";
import { useUsers } from "@/hooks/useUsers";

function generateUniqueEmail(): string {
  const timestamp = new Date().getTime();
  return `user${timestamp}@example.com`;
}

export default function WelcomeModal() {
  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setAuthToken(token);
    } else {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const onFinishForm = async (values: any) => {
    //so the flow for me to check the token is valid or not is by creating a user and delete it immediately. I know it's a caveman approach but apparently the API doesn't have a way to check if a token is valid or not

    try {
      setAuthToken(values.token);

      //over here, I'm adding dummy user
      const dummyUser = {
        name: "John Doe",
        email: generateUniqueEmail(),
        gender: "male" as "male" | "female",
        status: "active" as "active" | "inactive",
      };

      const response = await addUser(dummyUser);

      if (response.status === 401) {
        throw new Error("Unauthorized");
      }

      await deleteUsers(response.id);
      Cookies.set("authToken", values.token, { expires: 5 });

      message.success(`Token is valid. Welcome, ${values.name}`);
      setIsVisible(false);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized: Invalid token");
      } else {
        message.error("Failed to add or delete user");
        console.error("Error details:", error);
      }
    }
  };

  return (
    <Modal
      open={isVisible}
      onCancel={handleClose}
      footer={null}
      closable={false}
      maskClosable={false}
      title="Welcome to the Blog!"
    >
      <Form form={form} onFinish={onFinishForm} className="p-4 mt-8">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="token"
          label="Token"
          rules={[{ required: true, message: "Please enter your token" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="flex flex-row justify-end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
