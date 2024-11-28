import React, { useState } from "react";
import { useMutation } from "react-query";
import { Button, Form, Modal, Input, Select, message } from "antd";
import { addUser, getUsers } from "../services/api";
import { usePosts } from "../hooks/usePosts";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const ManagePostModal = ({ edit = false, item }: any) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addPost, editPost } = usePosts({ page: 1 });

  const addUserMutation = useMutation(addUser);

  const handleSubmit = async (values: any) => {
    try {
      if (edit) {
        await editPost({
          title: values.title,
          body: values.body,
          postId: item.id,
        });
        message.success("Post edited successfully!");
      } else {
        const user = await addUserMutation.mutateAsync({
          name: values.name,
          email: values.email,
          gender: values.gender,
          status: "active",
        });

        await addPost({
          title: values.title,
          body: values.body,
          userId: user.id,
        });
        message.success("Post added successfully!");
      }

      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add or edit post:", error);
      message.error("Failed to add or edit post");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    if (edit) {
      getUsers({ userId: item.user_id })
        .then((response) => {
          form.setFieldsValue({
            title: item.title,
            body: item.body,
            name: response.name,
            email: response.email,
            gender: response.gender,
          });
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          message.error("Failed to fetch user data");
        });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        className="w-full"
        icon={edit ? <EditOutlined /> : <PlusOutlined />}
      >
        {edit ? "Edit" : "Add Post"}
      </Button>
      <Modal
        title={edit ? "Edit Post" : "Add Post"}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        maskClosable
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: !edit, message: "Please enter your name" }]}
          >
            <Input disabled={edit} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: !edit, message: "Please enter your email" }]}
          >
            <Input disabled={edit} />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: !edit, message: "Please select your gender" }]}
          >
            <Select disabled={edit}>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="body"
            label="Share your thought with us!"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item className="flex flex-row justify-end">
            <Button
              type="primary"
              htmlType="submit"
              loading={addUserMutation.isLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagePostModal;
