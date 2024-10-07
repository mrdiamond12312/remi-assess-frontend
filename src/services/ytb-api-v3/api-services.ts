import API_ENDPOINTS from "@/services/ytb-api-v3/api-path";
import request from "umi-request";

export const getVideoInfoFromYtb = async (urlString: string) => {
  const url = new URL(urlString);
  const id = url.searchParams.get("v");
  return request<API.IYtbSimplifySnippet>(API_ENDPOINTS.YTB_API, {
    method: "GET",
    params: {
      part: "snippet",
      id,
      key: import.meta.env.VITE_GG_API_KEY,
    },
  });
};
