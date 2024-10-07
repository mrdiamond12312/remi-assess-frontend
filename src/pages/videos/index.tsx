import VideoCard from "@/components/VideoCard";
import { SMALL_PAGINATION } from "@/constants/default-pagination";
import { useInfiniteVideosLoad } from "@/services/videos/services";
import { Flex } from "antd/lib";
import React from "react";
import { Link } from "react-router-dom";

const VideosFeed: React.FC = () => {
  const { data, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteVideosLoad(SMALL_PAGINATION);

  console.log(data);
  return (
    <Flex className="flex-col gap-2 max-w-5xl m-auto">
      {data?.pages.map((page) =>
        page.data.map((video) => (
          <Link
            to={video.youtubeUrl}
            target="_blank"
            className="hover:text-auto"
          >
            <VideoCard
              description={video.description}
              thumbnail={video.thumbnail}
              title={video.title}
              user={video.user.fullName}
              key={video.id}
            />
          </Link>
        ))
      )}
    </Flex>
  );
};

export default VideosFeed;
