import React, { useState } from "react";
import { Button, Modal, Skeleton } from "antd";
import { useComments } from "@/hooks/useComments";
import { useUsers } from "@/hooks/useUsers";

interface ArticleModalProps {
  article: {
    id: number;
    user_id: number;
    title: string;
    body: string;
  };
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: comments,
    isLoading,
    error,
  } = useComments({
    postId: article.id,
    enabled: isModalOpen,
  });

  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useUsers({
    userId: article.user_id,
    enabled: isModalOpen,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="bg-white dark:bg-background pl-8 pr-5 pb-5 text-blue-500 font-bold cursor-pointer"
        onClick={showModal}
      >
        Read More
      </div>
      <Modal
        title={"Article Detail"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<Button onClick={handleCancel}>Close</Button>}
      >
        <div className="flex flex-col gap-4">
          <p className="text-xl font-bold">{article.title}</p>
          <p>{article.body}</p>
          {isLoading ? (
            <Skeleton active paragraph={{ rows: 2 }} />
          ) : (
            <div className="flex flex-col bg-blue-500/20 py-2 px-4 rounded-md">
              <p className="font-bold">Author Information:</p>
              <p>Name: {users?.name}</p>
              <p>Email: {users?.email}</p>
              <p>Gender: {users?.gender}</p>
              <p>Status: {users?.status}</p>
            </div>
          )}
        </div>
        <p className="font-bold mt-8">Comments</p>
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 3 }} />
        ) : (
          <div className="flex flex-col gap-2">
            {comments?.map((item: any) => (
              <div
                key={item.id}
                className="bg-black/5 dark:bg-white/5 p-2 rounded-lg"
              >
                <p className="font-bold">{item.name}</p>
                <p className="text-xs italic">{item.email}</p>
                <p className="mt-2">{item.body}</p>
              </div>
            ))}

            {comments?.length === 0 && (
              <p className="text-text/50">No comments yet</p>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ArticleModal;
