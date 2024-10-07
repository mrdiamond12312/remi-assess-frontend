import VideoCard from "@/components/VideoCard";
import { SMALL_PAGINATION } from "@/constants/default-pagination";
import { SHARE_VIDEO } from "@/constants/path";
import { useInfiniteVideosLoad } from "@/services/videos/services";
import { ShareAltOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Spin } from "antd/lib";
import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const VideosFeed: React.FC = () => {
  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteVideosLoad(SMALL_PAGINATION);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (hasNextPage && inView && !isFetchingNextPage) fetchNextPage();
  }, [inView, isFetchingNextPage]);
  console.log(data, isFetchingNextPage, inView);

  return (
    <Flex className="flex-col gap-2 max-w-5xl m-auto">
      {data?.pages.map((page) =>
        page.data.map((video) => (
          <Link
            to={video.youtubeUrl}
            target="_blank"
            className="hover:text-auto"
            key={["video", video.id].join(".")}
          >
            <VideoCard
              description={video.description}
              thumbnail={video.thumbnail}
              title={video.title}
              user={video.user.fullName}
            />
          </Link>
        ))
      )}
      <div ref={ref}>
        <Divider>
          {hasNextPage ? (
            isFetching ? (
              <>
                <Spin /> Loading more Videos!
              </>
            ) : (
              "Scroll to Load more Videos!"
            )
          ) : (
            "No more Videos!"
          )}
        </Divider>
      </div>
      <Link to={SHARE_VIDEO}>
        <Button
          className="fixed z-50 bg-white bottom-4 right-4 xl:right-[calc(50vw-624px)] rounded-full custom-floating-button"
          size="large"
          icon={<ShareAltOutlined />}
        >
          <p className="m-0">Share a Video!</p>
        </Button>
      </Link>
      <Outlet />
    </Flex>
  );
};

export default VideosFeed;
