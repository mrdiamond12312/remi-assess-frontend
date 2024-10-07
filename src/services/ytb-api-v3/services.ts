import API_ENDPOINTS from "@/services/ytb-api-v3/api-path";
import { getVideoInfoFromYtb } from "@/services/ytb-api-v3/api-services";
import { useQuery } from "@tanstack/react-query";

export const useYtbVideoInfoSnippet = (urlString: string) =>
  useQuery({
    queryKey: [API_ENDPOINTS.YTB_API, urlString],
    queryFn: () => getVideoInfoFromYtb(urlString),
  });
