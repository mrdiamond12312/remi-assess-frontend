import API_ENDPOINTS from "@/services/videos/api-path";
import request from "@/services/interceptor";
import { TVideoFields } from "@/pages/share-video/hooks/useVideoResolver";

export const shareVideo = async (body: TVideoFields) => {
  return request<API.TVideoRecord>(API_ENDPOINTS.SHARE, {
    method: "POST",
    data: body,
  });
};

export const getVideosList = async (
  pagination: API.IVideosPaginationParams
) => {
  return request<IPaginationResponse<API.TVideoRecord>>(API_ENDPOINTS.VIDEOS, {
    timeout: 15000,
    params: {
      ...pagination,
      take: pagination.take ?? 12,
    },
  });
};
