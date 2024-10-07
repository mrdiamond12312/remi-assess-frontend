import VideoCard, { IVideoProps } from "@/components/VideoCard";
import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { Flex, Form } from "antd/lib";

const args = {
  title: 'Caesar EP - "pinKing" | Zenless Zone Zero',
  description:
    "The girl looked up, scattering grains of sand, and the pink silence pulsed endlessly",
  thumbnail:
    "https://i.ytimg.com/vi/FaxI5oNATLE/hq720.jpg?sqp=-oaymwEpCNAFEJQDSFryq4qpAxsIARUAAIhCGAHYAQHiAQwIHhACGAYgATgBQAE=&rs=AOn4CLAgvSyED6A1i8BBURPfEfGPAqrjDA",
  user: "Zenless Zone Zero",
};
const meta: Meta<IVideoProps> = {
  title: "Video Card",
  component: VideoCard,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
};

// Make Type
type TVideoCardStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TVideoCardStory = {
  args: {
    ...args,
  },
  render: (args) => (
    <Flex className="w-7/12 m-auto items-center justify-center">
      <VideoCard {...args} />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(args.description)).toBeInTheDocument();
    await expect(canvas.getByText(args.user)).toBeInTheDocument();
    await expect(canvas.getByText(args.title)).toBeInTheDocument();
  },
};

export default meta;
