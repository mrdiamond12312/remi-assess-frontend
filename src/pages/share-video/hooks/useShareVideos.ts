import { VIDEO_FORM_KEYS } from "@/constants/video-sharing-form";
import useVideoResolver, {
  TVideoFields,
  TVideoFormFields,
} from "@/pages/share-video/hooks/useVideoResolver";
import { useVideoSharing } from "@/services/videos/services";
import { useYtbVideoInfoSnippet } from "@/services/ytb-api-v3/services";
import { notification } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const useShareVideos = () => {
  const navigate = useNavigate();

  // Modal Logics and Handlers
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handleCancel = () => {
    navigate("..");
  };

  // URL Field hook form
  const { FormSchema } = useVideoResolver();
  const {
    control,
    // formState,
    getValues,
    watch,
    trigger,
  } = useForm<TVideoFormFields>({
    defaultValues: {},
    resolver: FormSchema,
    mode: "onTouched",
  });

  const checkValidate = async () => {
    return await trigger([VIDEO_FORM_KEYS.youtubeUrl]);
  };

  const { mutate, isPending } = useVideoSharing();

  const { data, isLoading, isError } = useYtbVideoInfoSnippet(
    watch(VIDEO_FORM_KEYS.youtubeUrl)
  );

  const handleSubmit = async (formFields: TVideoFormFields) => {
    const isGoodToForward = (await checkValidate()) && !isError && !isLoading;

    if (isGoodToForward && data && data.items[0]) {
      const submitFields: TVideoFields = {
        ...formFields,
        [VIDEO_FORM_KEYS.description]: data?.items[0]?.snippet.description,
        [VIDEO_FORM_KEYS.thumbnail]:
          data?.items[0]?.snippet.thumbnails.standard?.url ??
          data?.items[0]?.snippet.thumbnails.high?.url ??
          data?.items[0]?.snippet.thumbnails.medium?.url ??
          data?.items[0]?.snippet.thumbnails.default.url,
        [VIDEO_FORM_KEYS.title]: data?.items[0]?.snippet.title,
      };
      mutate(submitFields, {
        onError: (error: TMeta) => {
          notification.error({
            message: [error.statusCode, error.error].join(" - "),
            description: error.message,
          });
        },
        onSuccess: (data) => {
          console.log(data);
          notification.success({
            message: "Success",
            description: "Successfully share your video!",
          });
          navigate("..");
        },
      });
    }
  };

  return {
    isOpen,
    setIsOpen,
    handleCancel,
    control,
    getValues,
    isPending,

    handleSubmit,
    videoInfo: {
      [VIDEO_FORM_KEYS.description]: data?.items[0]?.snippet?.description,
      [VIDEO_FORM_KEYS.thumbnail]:
        data?.items[0]?.snippet.thumbnails.standard?.url ??
        data?.items[0]?.snippet.thumbnails.high?.url ??
        data?.items[0]?.snippet.thumbnails.medium?.url ??
        data?.items[0]?.snippet.thumbnails.default?.url,
      [VIDEO_FORM_KEYS.title]: data?.items[0]?.snippet.title,
    },
  } as const;
};

export default useShareVideos;
