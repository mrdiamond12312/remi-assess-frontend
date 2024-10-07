declare namespace API {
  interface IVideosPaginationParams {
    page?: number;
    take?: number;
    offset?: number;
  }

  type TVideoRecord = {
    id: number;
    createdAt: string;
    updatedAt: string;
    youtubeUrl: string;
    title: string;
    description: string;
    thumbnail: string;
    user: API.TAuthProfile;
  };
}
