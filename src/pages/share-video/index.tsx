import InputText from "@/components/Input";
import VideoCard from "@/components/VideoCard";
import { VIDEO_FORM_KEYS } from "@/constants/video-sharing-form";
import useShareVideos from "@/pages/share-video/hooks/useShareVideos";
import { Button, Divider, Empty, Form, Modal, Row } from "antd/lib";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import React from "react";

const { Item } = Form;

const ShareVideoModal: React.FC = () => {
  const size: SizeType = "large";
  const {
    isOpen,
    handleCancel,
    setIsOpen,
    control,
    isPending,
    handleSubmit,
    getValues,
    videoInfo,
  } = useShareVideos();
  return (
    <Modal
      open={isOpen}
      destroyOnClose
      afterClose={handleCancel}
      onCancel={() => setIsOpen(false)}
      width={"fit-content"}
      footer={() => (
        <Row className="flex flex-row justify-end">
          <Divider className="border-sky-400 my-2"></Divider>
          <Button
            type="primary"
            size={size}
            className="bg-sky-400"
            loading={isPending}
            onClick={() => handleSubmit(getValues())}
          >
            Submit!
          </Button>
        </Row>
      )}
    >
      <Form
        layout="horizontal"
        rootClassName="custom-antd-form-small"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <h1 className="text-heading-3">Share your Video!</h1>
        <Item label={"Youtube Link"} required>
          <InputText
            placeholder={"https://www.youtube.com/watch?v=1234567890_"}
            placement="top"
            control={control}
            name={VIDEO_FORM_KEYS.youtubeUrl}
            size={size}
          />
        </Item>

        <Divider orientation="left" className="my-2">
          Video Information
        </Divider>
        {videoInfo.description && videoInfo.thumbnail && videoInfo.title ? (
          <VideoCard
            description={videoInfo.description}
            thumbnail={videoInfo.thumbnail}
            title={videoInfo.title}
          />
        ) : (
          <Empty
          className="mx-32"
            description={
              <p className="text-body-3-regular">
                No video Found from given URL!
              </p>
            }
          />
        )}
      </Form>
    </Modal>
  );
};

export default ShareVideoModal;
