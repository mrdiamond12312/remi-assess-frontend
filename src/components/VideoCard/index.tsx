import { Flex } from "antd/lib";
import React from "react";

export interface IVideoProps {
  title: string;
  user?: string;
  thumbnail: string;
  description: string;
}

const VideoCard: React.FC<IVideoProps> = ({
  title,
  description,
  thumbnail,
  user,
}) => {
  return (
    <Flex className="flex-col md:flex-row gap-4 py-2 px-4">
      <img
        src={thumbnail}
        alt="thumbnail"
        className="flex-grow w-full md:w-96 !aspect-video object-cover rounded shadow-md"
      />
      <Flex className="w-full flex-shrink flex-col gap-2 px-2 md:px-0 md:py-2">
        <span className="font-sans text-body-3-semibold text-sky-800">
          {title}
        </span>
        {user && (
          <span className="inline-block font-sans text-body-3-regular text-gray-700">
            Shared by <span className="italic w-fit">{user}</span>
          </span>
        )}
        <span className="text-body-3-medium line-clamp-4 whitespace-break-spaces">
          {description}
        </span>
      </Flex>
    </Flex>
  );
};

export default VideoCard;
