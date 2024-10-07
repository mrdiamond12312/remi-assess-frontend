import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { VIDEO_FORM_KEYS } from "@/constants/video-sharing-form";
import { validateString } from "@/utils/regex";
import { REGEX_YTB_URL } from "@/constants/regex";

export type TVideoFormFields = {
  [VIDEO_FORM_KEYS.youtubeUrl]: string;
};

export type TVideoFields = {
  [keys in VIDEO_FORM_KEYS]: string;
};

const useVideoResolver = () => {
  const VideoFormValidationSchema = yup.object().shape({
    [VIDEO_FORM_KEYS.youtubeUrl]: yup
      .string()
      .required("YouTube URL is required")
      .test("isYoutubeUrl", "Invalid YouTube URL", (value) =>
        validateString(REGEX_YTB_URL, value)
      ),
  });

  return {
    FormSchema: yupResolver<TVideoFormFields>(VideoFormValidationSchema),
  };
};

export default useVideoResolver;
