import API_ENDPOINTS from "@/services/videos/api-path";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getVideosList, shareVideo } from "@/services/videos/api-services";
import { TVideoFields } from "@/pages/share-video/hooks/useVideoResolver";

export const useInfiniteVideosLoad = (
  videosPagination: API.IVideosPaginationParams
) => {
  return useInfiniteQuery(
    {
      queryKey: [API_ENDPOINTS.VIDEOS, videosPagination],
      queryFn: ({ pageParam = 1 }) =>
        getVideosList({ ...videosPagination, page: pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        const { hasNextPage } = lastPage.meta;
        return hasNextPage ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
    },
  );
};

export const useVideoSharing = () => {
  const queryClient = useQueryClient();
  return useMutation<API.TVideoRecord, TMeta, TVideoFields>({
    mutationKey: [API_ENDPOINTS.SHARE],
    mutationFn: (body: TVideoFields) => shareVideo(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.VIDEOS] });
    },
  });
};
