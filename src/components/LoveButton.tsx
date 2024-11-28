"use client";

import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Button className={`heartButton dark:!text-white`} onClick={toggleLike}>
      {isLiked ? (
        <HeartFilled className={`heartFilled`} />
      ) : (
        <HeartOutlined className={`heartOutlined`} />
      )}
    </Button>
  );
};

export default LikeButton;
