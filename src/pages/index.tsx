import { useState } from "react";
import {
  Table,
  Input,
  Button,
  Select,
  Card,
  Skeleton,
  message,
  Modal,
} from "antd";
import { usePosts } from "../hooks/usePosts";
import WelcomeModal from "@/components/WelcomeModal";
import DarkModeSwitch from "@/components/DarkModeSwitch";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import LikeButton from "@/components/LoveButton";
import ArticleModal from "@/components/ArticleDetailModal";
import ManagePostModal from "@/components/ManagePostModal";

export default function Home() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState<"title" | "body">("title");

  const { data, isLoading, deletePost } = usePosts({ page, search, searchBy });

  const handleDelete = async () => {
    if (selectedPostId === null) return;

    try {
      await deletePost(selectedPostId);
      message.success("Post Deleted Successfully");
      setIsModalOpen(false);
    } catch (error) {
      message.error("Failed to delete post");
    }
  };

  const onSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const onChangePage = (type: string) => {
    if (type === "next") {
      setPage((prevPage) => prevPage + 1);
    } else if (type === "prev") {
      setPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
        <Card
          key={item}
          actions={[
            <div key="actions" className="flex flex-row w-full px-4 ">
              <Skeleton.Button active size="small" />
              <div className="w-full flex flex-row gap-2 justify-end">
                <Skeleton.Button active size="small" />
                <Skeleton.Button active size="small" />
              </div>
            </div>,
          ]}
        >
          <Skeleton active avatar={false} paragraph={{ rows: 4 }} />
        </Card>
      ))}
    </div>
  );

  return (
    <div className="p-4 bg-background text-text px-16 flex flex-col min-h-screen">
      <WelcomeModal />
      <div className="mb-4 flex flex-col lg:flex-row gap-4 justify-between items-center ">
        <div className="mb-4">
          <p className="text-4xl font-bold text-center lg:text-left">
            The Blog
          </p>
          <p>A safe place to share your thoughts</p>
        </div>
        <div className="flex flex-col md:flex-row w-fit items-center gap-2">
          <div className="flex flex-row w-fit items-center gap-2">
            <div className="py-4 flex flex-row gap-4 items-center">
              <Button
                icon={<ArrowLeftOutlined />}
                type="text"
                onClick={() => onChangePage("prev")}
                disabled={isLoading || page === 1}
              />
              <p>{page}</p>
              <Button
                icon={<ArrowRightOutlined />}
                type="text"
                onClick={() => onChangePage("next")}
                disabled={isLoading}
              />
            </div>
            <ManagePostModal />
          </div>

          <div className="flex flex-row w-fit items-center gap-2">
            <Select value={searchBy} onChange={setSearchBy} className="w-fit">
              <Select.Option value="title">Title</Select.Option>
              <Select.Option value="body">Description</Select.Option>
            </Select>{" "}
            <Input.Search
              placeholder="Search posts..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full flex-grow"
            />
          </div>

          <DarkModeSwitch />
        </div>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-8">
          {data?.map((item: any) => (
            <Card
              key={item.id}
              title={
                <p className="text-wrap line-clamp-2 overflow-ellipsis">
                  {item.title}
                </p>
              }
              className="flex flex-col"
              classNames={{
                header: "!text-wrap !px-4 !py-2",
                body: "flex-grow relative",
              }}
              actions={[
                <div
                  key="actions"
                  className="flex flex-col sm:flex-row w-full px-4 gap-2"
                >
                  <LikeButton />
                  <div className="w-full flex gap-2 justify-end flex-col sm:flex-row">
                    <ManagePostModal edit={true} item={item} />
                    <Button
                      type="primary"
                      danger
                      key="delete"
                      onClick={() => {
                        setSelectedPostId(item.id);
                        setIsModalOpen(true);
                      }}
                      icon={<DeleteOutlined />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>,
              ]}
            >
              <div className="">
                <p className="line-clamp-4 overflow-ellipsis">{item.body}</p>
                <span className="absolute bottom-0 right-0">
                  <ArticleModal article={item} />
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        classNames={{ body: "flex flex-col items-center" }}
      >
        <div className="pt-10 pb-10 flex flex-col items-center">
          <p className="font-bold text-lg">YOU ARE ABOUT TO DELETE THIS POST</p>
          <p className="text-lg text-center text-text/50">
            This action cannot be undone. Are you sure you want to continue?
          </p>
          <div className="mt-8 flex flex-row w-full justify-center gap-4">
            <Button
              type="primary"
              danger
              onClick={handleDelete}
              className="w-fit"
            >
              Delete
            </Button>
            <Button
              type="primary"
              ghost
              onClick={() => setIsModalOpen(false)}
              className="w-fit"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
